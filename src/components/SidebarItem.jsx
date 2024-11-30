// src/components/SidebarItem.jsx
import { Link } from "react-router-dom";

const SidebarItem = ({ href, label, isCollapsed, icon }) => {
  return (
    <li className="flex items-center">
      <Link to={href} className={`flex items-center p-2 text-white hover:bg-gray-700 ${isCollapsed ? "justify-center" : ""}`}>
        {icon}
        {!isCollapsed && <span className="ml-2">{label}</span>}
      </Link>
    </li>
  );
};

export default SidebarItem;