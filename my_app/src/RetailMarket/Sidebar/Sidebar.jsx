import React from 'react'
import "./sidebar.css";
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  const routehandleing = (path) => {
    navigate(path);
  }
  return (
    <div className="sidebar-main bg-dark text-white p-3" style={{ height: '100vh', width: '200px', marginTop: '54px' }}>
      <h5 className="sidebar-title text-center mb-4 pb-2 pt-2 border-bottom border-top">
        {JSON.parse(localStorage.getItem("user")).shopName.toUpperCase()}
      </h5>    <ul className="nav flex-column">
        <li className="nav-item mb-2" onClick={() => routehandleing("/")}>
          <i className="bi bi-house-door me-2" ></i> Home
        </li>
        <li className="nav-item mb-2" onClick={() => routehandleing("/stacks")}>
          <i className="bi bi-stack me-2"></i> Stacks
        </li>
        <li className="nav-item mb-2" onClick={() => routehandleing("/dashboard")}>
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </li>
        <li className="nav-item mb-2" onClick={() => routehandleing("/settings")}>
          <i className="bi bi-gear me-2"></i> Settings
        </li>
      </ul>
    </div>

  )
}

export default Sidebar