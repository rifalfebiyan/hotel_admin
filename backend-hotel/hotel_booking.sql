-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 04:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `id_room` int(11) NOT NULL,
  `number_of_guests` int(11) NOT NULL,
  `description_booking` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `customer_name`, `check_in_date`, `check_out_date`, `id_room`, `number_of_guests`, `description_booking`, `created_at`) VALUES
(11, 'Dika', '2024-11-28', '2024-11-29', 2, 2, 'DP 200 Ketapang Jelai hulu', '2024-11-29 14:00:30'),
(12, 'Dika', '2024-11-28', '2024-11-29', 4, 2, 'DP 150 Air Hitam', '2024-11-29 14:05:35'),
(13, 'Arif Muhammad', '2024-11-29', '2024-11-30', 4, 2, 'DP 100k ketapang', '2024-11-29 15:34:11'),
(14, 'Sasori', '2024-11-29', '2024-11-30', 1, 2, 'Kalimantan', '2024-11-29 17:01:04'),
(15, 'Aziz', '2024-11-27', '2024-11-28', 5, 1, 'AYam', '2024-11-30 06:40:25'),
(16, 'Fufufafa', '2024-11-30', '2024-12-01', 5, 1, 'asdas', '2024-11-30 07:32:15'),
(17, 'Fufufafa', '2024-11-30', '2024-12-01', 5, 1, '', '2024-11-30 07:32:45');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id_room` int(11) NOT NULL,
  `room_number` varchar(10) NOT NULL,
  `room_type` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price_per_night` int(110) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id_room`, `room_number`, `room_type`, `description`, `price_per_night`, `created_at`) VALUES
(1, '201', 'Kelas I', 'Fasilitas AC, Kamar Mandi Dalam, DoubleBed', 140000, '2024-11-30 05:34:18'),
(2, '213', 'VIP', 'Fasilitas, TV, AC, Kamar Mandi Dalam, Shower, Kingsize', 220000, '2024-11-28 19:46:05'),
(3, '226', 'Ekonomi I', 'Fasilitas Kipas Angin, SingleBed Double, Kamar Mandi Dalam', 75000, '2024-11-30 06:24:04'),
(4, '227', 'Ekonomi II', 'Fasilitas Kipas Angin, SingleBed Double, WC Luar', 75000, '2024-11-30 07:42:18'),
(5, '225', 'Economy I', 'Fasiltias Kipas Angin, Double SingleBed, Kamar Mandi Dalam', 75000, '2024-11-29 15:03:13'),
(7, '214', 'VIP', 'Fasilitas', 220000, '2024-11-30 05:04:42'),
(8, '202', 'Family', '22', 120000, '2024-11-30 07:42:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(1, 'gerhana', '201201'),
(2, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_room` (`id_room`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id_room`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id_room`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
