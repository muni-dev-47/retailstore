import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addAllStackInSection, addStack, updateStack, addStackInStore, deleteStackItem, updateStackList, postStackStatement, putStackStatement } from '../Redux/stackSlice';
import { removeTab } from '../Redux/tabSlice';

const Stack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemName = useRef();
  const itemPrice = useRef();
  const itemCount = useRef();
  const stack = useSelector(store => store.stack);
  const sectionItems = useSelector(store => store.stack.section.section);
  const [stackUpdate, setStackUpdate] = useState({});
  const { sname } = useParams()
  const section = sname.split("&")[0];
  const stackItems = stack?.stack?.[section];
  const allStackItems = stack?.section?.section?.[section];
  const handleStackUpdateIndex = (index) => {
    setStackUpdate(val => ({ ...val, [index]: !val[index] }));
  }
  const handledeleteStackItem = (index) => {
    dispatch(deleteStackItem({ section, index }));
  }
  const updateStackItem = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateStack({ index, key: name, value, section }))
  }
  const handlestackItems = (e) => {
    const { name, value, type } = e.target;
    dispatch(addStack({ section, key: name, value: type === "number" ? Number(value) : value }));
  }
  const handleAddAllStacks = () => {
    if (allStackItems?.length) {
      const path = sname.split("&");
      const statement = {
        stacks: sectionItems[section],
        date: path.length == 1 ? location.state.date : stack.stacks[path[1]].section.date,
        sectionName: section
      }
      if (path.length == 1) {
        dispatch(postStackStatement(statement));
        dispatch(addAllStackInSection({ section, date: location.state.date, sectionName: section }))
      } else {
        const index = path[1];
        dispatch(putStackStatement(statement))
        dispatch(updateStackList({ index, section }));
      }
    }
    dispatch(removeTab({ path: window.location.pathname, navigate ,navigationPath:"/stacks"}))
  }
  const handleAddStack = () => {
    if (itemName.current.value !== "" && itemCount.current.value !== "" && itemPrice.current.value !== "") {
      dispatch(addStackInStore({ section }))
      itemName.current.focus();
    } else {
      alert("Please enter the stack")
    }
  }
  return (
    <div>
      <div className='p-3'>
        <h4>SECTION: {section.toUpperCase()} </h4>

      </div>
      <div className='row  g-4 align-items-center mb-2'>
        <div className='col'><input ref={itemName} type="text" value={stackItems?.itemName || ""} name="itemName" className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Enter Product ID or Name' onChange={handlestackItems} onKeyDown={(e) => e.key === "Enter" ? itemPrice.current.focus() : ""} /></div>
        <div className='col'><input type="number" ref={itemPrice} name="itemPrice" value={stackItems?.itemPrice || ""} className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Enter Product Price' onChange={handlestackItems} onKeyDown={(e) => e.key === "Enter" ? itemCount.current.focus() : ""} /></div>
        <div className='col'><input type="number" ref={itemCount} name="itemCount" value={stackItems?.itemCount || ""} className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Enter Product Quantity' onChange={handlestackItems} onKeyDown={(e) => e.key === "Enter" ? handleAddStack() : ""} /></div>
        <div className='col-3 col-sm-2'><button className='btn btn-primary rounded-2 px-5 p-2' onClick={handleAddStack}>Add Stack</button></div>
      </div>
      <div className='mt-3'>
        <table className='table table-bordered table-hover text-center'>
          <thead>
            <tr>
              <th>NO</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              allStackItems?.map((val, index) => (
                <tr key={index} class="fs-6">
                  <td>{index + 1}</td>
                  {!stackUpdate[index] ?
                    (<><td>{val?.itemName}</td>
                      <td>{val?.itemPrice}</td>
                      <td>{val?.itemCount}</td></>) : (
                      <>
                        <td><input type="text" name='itemName' className="form-control rounded-2" value={val?.itemName} placeholder='Enter Product ID or Name' onChange={(e) => updateStackItem(e, index)} /></td>
                        <td><input type="number" name='itemPrice' className='form-control rounded-2' value={val?.itemPrice} placeholder='Enter Product Price' onChange={(e) => updateStackItem(e, index)} /></td>
                        <td><input type="number" name='itemCount' className='form-control rounded-2' value={val?.itemCount} placeholder='Enter Product Quantity' onChange={(e) => updateStackItem(e, index)} /></td>
                      </>
                    )}
                  <td><button className='btn btn-primary rounded-pill' onClick={() => handleStackUpdateIndex(index)}>{!stackUpdate[index] ? <i class="bi bi-pencil-square"></i> : <i class="bi bi-check-circle text-white" ></i>}
                  </button>
                    <button className='btn btn-danger rounded-pill' onClick={() => handledeleteStackItem(index)}><i class="bi bi-trash" title="Edit"></i></button>
                  </td>


                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr class="table table-bordered">
              <td colSpan={3}>Total Items : {allStackItems?.reduce((sum) => (sum + 1 || 0), 0) || 0}</td>
              <td colSpan={3}>Total Counts : {allStackItems?.reduce((sum, val) => sum + Number(val?.itemCount), 0) || 0}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="d-flex justify-content-center">
        <button className='btn btn-dark addbillbutton1 rounded-pill rounded-2 px-4 p-3' onClick={handleAddAllStacks}><i class="bi bi-check-circle-fill text-white"></i>  ADD STACK</button>
      </div>
    </div>
  )
}


export default Stack