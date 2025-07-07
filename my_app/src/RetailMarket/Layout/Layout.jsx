import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Tab from '../Tabs/Tab'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addTab, resetTabs } from '../Redux/tabSlice';
import { getPath } from './getPath';
import axios from 'axios';
import { setInitialState } from '../Redux/appSlice';
import { setStackForBackend } from '../Redux/stackSlice';

const Layout = () => {
  const [sidebar, setSidbar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id, sname, cname } = useParams();
  useEffect(() => {
    dispatch(resetTabs());
    navigate("/");
  }, []);
  useEffect(() => {
    const pathName = getPath(id, sname, cname);
    dispatch(addTab({ path: { pathName, path: window.location.pathname } }))
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getSales", { params: { email: JSON.parse(localStorage.getItem("user")).email } });
        const data = response.data;
        dispatch(setInitialState({ initialState: data }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getStack = async () => {
      try {
        const data = await axios.get("http://localhost:5000/api/getStacks", { params: { email: JSON.parse(localStorage.getItem("user")).email } });
        dispatch(setStackForBackend({ stacks: data.data }));
      } catch (error) {
        console.error("Error fetching data:", error);

      }

    }

    getStack();
    fetchData();

  }, [])

  return (
    <div className="container-fluid p-0">
      <button
        onClick={() => setSidbar(prev => !prev)}
        className="btn position-fixed top-0 start-0 m-2"
        style={{ zIndex: 1000 }}
      >
        <i
          className="bi bi-list"
          style={{ fontSize: '28px', color: sidebar ? 'white' : 'black' }}
        ></i>
      </button>
      {sidebar && (
        <div
          className="bg-dark text-white position-fixed top-0 start-0 h-100 p-3"
          style={{ width: '200px', zIndex: 999 }}
        >
          <Sidebar />
        </div>
      )}
      <div
        className=""
        style={{
          marginLeft: sidebar ? '200px' : '0px',
          transition: '0.3s ease',
        }}
      >
        <Tab sidebarOpen={sidebar} />
        <div className="flex-grow-1 overflow-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
