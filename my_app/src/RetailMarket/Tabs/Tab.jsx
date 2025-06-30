import React from 'react'
import "./Tab.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeTab, setCurrentTab } from '../Redux/tabSlice';
const Tab = ({ sidebarOpen }) => {
  const { tabs, currentTab } = useSelector(store => store.tab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tabHandling = (path) => {
    if (window.location.pathname === path) return;
    dispatch(setCurrentTab({ path }));
    navigate(path);
  }
  const deleteTab = (e, path) => {
    e.stopPropagation();
    let confirmDelete;
    if (path !== "/") { confirmDelete = window.confirm("Are you sure you want to delete?"); }
    if (confirmDelete) {
      dispatch(removeTab({ path, navigate }));
    }
  }
  return (
    <div>
      <div className='button-container' style={{ marginLeft: sidebarOpen ? "0px" : "60px" }}>
        {tabs.map(tabs => (
          <div style={{ position: 'relative' }}>
            <button
              key={tabs.path}
              className={`button rounded-pill px-4`}
              style={{ backgroundColor: tabs.path === currentTab ? "#343a40" : 'gray' }}
              onClick={() => tabHandling(tabs.path)}
              title={tabs?.pathName}
            ><span className='button-text'>{tabs?.pathName}</span><span className='button-close' onClick={(e) => deleteTab(e, tabs.path)}>{"  x"}</span></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tab;