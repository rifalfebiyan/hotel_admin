import React, { useEffect, useState } from "react";
import RoomCards from '../components/RoomCards';
import { FaUser , FaBed, FaUsers, FaDollarSign } from "react-icons/fa";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [roomPopularity, setRoomPopularity] = useState({ labels: [], data: [] }); // State untuk diagram pie

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
        setTotalRooms(data.length);
        fetchBookings(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBookings = async (roomsData) => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setTotalBookings(data.length);

        // Menghitung total revenue
        const revenue = data.reduce((acc, booking) => {
          const room = roomsData.find(r => r.id_room === booking.id_room);
          const pricePerNight = room ? parseFloat(room.price_per_night) : 0;
          return !isNaN(pricePerNight) ? acc + pricePerNight : acc;
        }, 0);
        setTotalRevenue(revenue);

        // Menghitung jumlah booking per bulan
        const bookingsPerMonth = Array(12).fill(0);
        data.forEach(booking => {
          const month = new Date(booking.check_in_date).getMonth();
          bookingsPerMonth[month] += 1;
        });
        setMonthlyBookings(bookingsPerMonth);

        // Menghitung popularitas kamar
        const roomCount = {};
        data.forEach(booking => {
          const room = roomsData.find(r => r.id_room === booking.id_room);
          if (room) {
            roomCount[room.room_type] = (roomCount[room.room_type] || 0) + 1;
          }
        });

        // Siapkan data untuk diagram pie
        const labels = Object.keys(roomCount);
        const chartData = Object.values(roomCount);
        setRoomPopularity({ labels, data: chartData });
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Jumlah Booking',
        data: monthlyBookings,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="container-fluid" style={{ padding: "20px" }}>
      <div className="row">
        {/* Statistics Cards */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUser  size={30} className="text-primary mb-2" />
              <h5 className="card-title">Total Tamu</h5>
              <h3>{totalBookings}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaBed size={30} className="text-warning mb-2" />
              <h5 className="card-title">Kamar Tersedia</h5>
              <h3>{totalRooms}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUsers size={30} className="text-success mb-2" />
              <h5 className="card-title">New Customers</h5>
              <h3>1,532</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaDollarSign size={30} className="text-info mb-2" />
              <h5 className="card-title">Total Pendapatan</h5>
              <h3>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Tamu Hotel/Bulan</h5>
              <Bar data={chartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Ruangan Favorit</h5>
              <Pie data={{
                labels: roomPopularity.labels,
                datasets: [{
                  data: roomPopularity.data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                  ],
                }],
              }} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <h1 className="mb-4">Daftar Room</h1>
        <RoomCards />
      </div> */}
    </div>
  );
};

export default Home;