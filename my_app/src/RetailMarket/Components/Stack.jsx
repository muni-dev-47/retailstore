import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { addStack } from '../Redux/stackSlice';

const Stack = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const stack = useSelector(store => store.stack);
  const section = location.state.section;
  const stackItems = stack?.stack?.[section];
  const handlestackItems = (e) => {
    const { name, value } = e.target;
    dispatch(addStack({ section, key: name, value }));
  }

  return (
    <div>
      <div className='row  g-2 align-items-center mb-2'>
        <div className='col'><input type="text" value={stackItems?.itemName} name="itemName" className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Protect ID Or Name' onChange={handlestackItems} /></div>
        <div className='col'><input type="number" name="itemPrice" value={stackItems?.itemPrice} className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Protect Price' onChange={handlestackItems} /></div>
        <div className='col'><input type="number" name="itemCount" value={stackItems?.itemCount} className='form-control form-control-lg rounded-2 shadow-sm' placeholder='Protect Count' onChange={handlestackItems} /></div>
        <div className='col'><button className='btn btn-primary rounded-pill px-5'>Add Stack</button></div>
      </div>
    </div>
  )
}


export default Stack