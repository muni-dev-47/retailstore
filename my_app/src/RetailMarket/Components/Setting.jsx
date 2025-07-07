import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAllTabs } from '../Redux/tabSlice';
import { deleteAllItems } from '../Redux/appSlice';
import { deleteAllStacks } from '../Redux/stackSlice';

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(removeAllTabs());
      dispatch(deleteAllItems());
      dispatch(deleteAllStacks());
      navigate("/login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <button
        className="btn btn-danger px-4 py-3 fw-bold rounded-pill shadow-sm transition-all"
        onClick={handleLogout}
        style={{
          transition: 'all 0.3s ease',
          transform: 'translateY(0)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(1px)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  );
};

export default Setting;