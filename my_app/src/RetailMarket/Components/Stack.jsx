import React, { useRef, useState } from 'react'
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
  console.log(location.state)
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
        date: path.length === 1 ? location.state.date : stack.stacks[path[1]].section.date,
        sectionName: section
      }
      if (path.length === 1) {
        dispatch(postStackStatement({ statement, email: JSON.parse((localStorage.getItem("user"))).email }));
        dispatch(addAllStackInSection({ section, date: location.state.date, sectionName: section }))
      } else {
        const index = path[1];
        dispatch(putStackStatement({ statement, email: JSON.parse((localStorage.getItem("user"))).email }))
        dispatch(updateStackList({ index, section }));
      }
    }
    dispatch(removeTab({ path: window.location.pathname, navigate, navigationPath: "/stacks" }))
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
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary fw-bold mb-0">
          <i className="bi bi-collection me-2"></i>
          : {section.toUpperCase()}
        </h4>
      </div>

      <div className="card shadow-sm border-0 rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4 form-floating">
              <input
                ref={itemName}
                type="text"
                value={stackItems?.itemName || ""}
                name="itemName"
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                placeholder=" "
                onChange={handlestackItems}
                onKeyDown={(e) => e.key === "Enter" && itemPrice.current.focus()}
              />
              <label className="text-muted">Product ID or Name</label>
            </div>

            <div className="col-md-3 form-floating">
              <input
                type="number"
                ref={itemPrice}
                name="itemPrice"
                value={stackItems?.itemPrice || ""}
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                placeholder=" "
                onChange={handlestackItems}
                onKeyDown={(e) => e.key === "Enter" && itemCount.current.focus()}
              />
              <label className="text-muted">Price (₹)</label>
            </div>

            <div className="col-md-3 form-floating">
              <input
                type="number"
                ref={itemCount}
                name="itemCount"
                value={stackItems?.itemCount || ""}
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                placeholder=" "
                onChange={handlestackItems}
                onKeyDown={(e) => e.key === "Enter" && handleAddStack()}
                min="1"
              />
              <label className="text-muted">Quantity</label>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary btn-lg w-100 rounded-pill"
                onClick={handleAddStack}
                disabled={!stackItems?.itemName || !stackItems?.itemPrice || !stackItems?.itemCount}
              >
                <i className="bi bi-plus-lg me-2"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm border-0 rounded-3 mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">#</th>
                <th>ITEM NAME</th>
                <th className="text-end">PRICE (₹)</th>
                <th className="text-center">QTY</th>
                <th className="text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allStackItems?.length > 0 ? (
                allStackItems.map((val, index) => (
                  <tr key={index} className={stackUpdate[index] ? "bg-light-warning" : ""}>
                    <td className="ps-4 fw-medium">{index + 1}</td>

                    {!stackUpdate[index] ? (
                      <>
                        <td className="text-uppercase">{val?.itemName}</td>
                        <td className="text-end">₹{Number(val?.itemPrice).toFixed(2)}</td>
                        <td className="text-center">{val?.itemCount}</td>
                      </>
                    ) : (
                      <>
                        <td>
                          <input
                            type="text"
                            name="itemName"
                            className="form-control form-control-sm border-primary"
                            value={val?.itemName}
                            onChange={(e) => updateStackItem(e, index)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="itemPrice"
                            className="form-control form-control-sm border-primary text-end"
                            value={val?.itemPrice}
                            onChange={(e) => updateStackItem(e, index)}
                            step="0.01"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="itemCount"
                            className="form-control form-control-sm border-primary text-center"
                            value={val?.itemCount}
                            onChange={(e) => updateStackItem(e, index)}
                            min="1"
                          />
                        </td>
                      </>
                    )}

                    <td className="text-end pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          className={`btn btn-sm ${stackUpdate[index] ? 'btn-success' : 'btn-outline-primary'} rounded-pill`}
                          onClick={() => handleStackUpdateIndex(index)}
                        >
                          {!stackUpdate[index] ? (
                            <i className="bi bi-pencil-fill"></i>
                          ) : (
                            <i className="bi bi-check-lg"></i>
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => handledeleteStackItem(index)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <i className="bi bi-inbox me-2"></i> No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-4">
              <div className="text-center">
                <div className="text-muted small">TOTAL ITEMS</div>
                <div className="h5 mb-0 text-primary">{allStackItems?.reduce((sum) => sum + 1, 0) || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-muted small">TOTAL QUANTITY</div>
                <div className="h5 mb-0 text-success">{allStackItems?.reduce((sum, val) => sum + Number(val?.itemCount), 0) || 0}</div>
              </div>
            </div>
            <button
              className="btn btn-dark btn-lg rounded-pill px-4 d-flex align-items-center"
              onClick={handleAddAllStacks}
              disabled={!allStackItems?.length}
            >
              <i className="bi bi-check-circle-fill me-2"></i> ADD STACK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Stack