import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Stacks = () => {

  const stack = useSelector(store => store.stack.stack);
  const [sectionInput, setSectionInput] = useState({ section: "", date: new Date().toISOString().split("T")[0] })
  const [search, setSearch] = useState(false);
  const [section, setSection] = useState(false);
  const [select, setselect] = useState("section");
  const id = new Date().getTime();
  const navigate = useNavigate();
  const handleClick = () => setSection(val => !val);
  return (
    <div>
      {search &&

        <div className='row' style={{ filter: section ? 'blur(5px)' : "" }}>
          <div className='col'><input type="text" name="" className='form-control form-control-lg rounded-2 shadow-sm' placeholder="Section..." /></div>
          {select === "section" ? <div className='col'><input type="text" name='' className='form-control form-control-lg rounded-2 shadow-sm' placeholder="Search by name or ID" /></div> :
            <div className='col'><input type="date" name="" className='form-control form-control-lg rounded-2 shadow-sm' value={new Date().toISOString().split("T")[0]} /></div>}
          <div className='col'><select className="form-select form-select-lg rounded-2 shadow-sm" onChange={(e) => setselect(e.target.value)} >
            <option value={"section"}>Section</option>
            <option value={"date"}>Date</option>
          </select></div>
        </div>
      }
      <div className='d-flex justify-content-center'>
        <div class="d-flex  addbillbutton">
          <div style={{ padding: '10px' }}><button className={`btn  ${section ? `btn-danger` : `btn-primary`}   rounded-circle rounded-circle px-4 p-3`} onClick={() => handleClick()}>{section ? <i class="bi bi-x-circle fs-4  text-white"></i> : <i class="bi bi-plus-circle fs-4 text-white"></i>}</button></div>
          <div style={{ padding: '10px' }}><button className={`btn  ${search ? `btn-danger` : `btn-primary`} rounded-circle  px-4 p-3`} onClick={() => setSearch(val => !val)}>{search ? <i class="bi bi-x-circle fs-4  text-white"></i> : <i class="bi bi-search  fs-4 text-white"></i>}</button></div>
        </div>
      </div>
      <div>
        <table className='table table-success table-striped table-hover text-center mt-3'>
          <thead>
            <tr>
              <th>NO</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
      {section &&
        <div class="d-flex justify-content-center">
          <div class="position-fixed  w-50 h-auto  bg-white text-white p-3 shadow rounded-4">
            <div className='my-3'><input type="text" name="section" value={sectionInput.section} className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Section ID Or Name' onChange={(e) => setSectionInput(val => ({ ...val, [e.target.name]: e.target.value }))} /></div>
            <div className='my-5'><input type="date" name="date" value={sectionInput.date} className='form-control form-control-lg rounded-2 shadow-sm' onChange={(e) => setSectionInput(val => ({ ...val, [e.target.name]: e.target.value }))} /></div>
            <div class="d-flex justify-content-center">
              <button className='btn my-4 w-50 btn-primary' onClick={() => sectionInput.section ? navigate(`/stack/${sectionInput.section}`, { state: { ...sectionInput } }) : alert("Pleace enter the section")}>buttom</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Stacks

