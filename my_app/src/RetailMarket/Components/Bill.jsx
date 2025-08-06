import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addItem, setCustomer, setDate, addBillItem, setUpdateBillItems, deleteItem, setPaymentType, setSalesStatement, postSalesStatement, setUpdateBill, putSalesStatement, clearBillItems } from '../Redux/appSlice';
import { removeTab } from '../Redux/tabSlice';

const Bill = () => {
  const [update, setUpdate] = useState({});
  const itemPrice = useRef();
  const itemName = useRef();
  const itemCount = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const inde = id.split("&")[0];
  const billItem = useSelector(store => store.bill);
  const billDetails = useSelector((state) => state.bill.billDetails);
  const dispatch = useDispatch();
  const paymentType = billItem?.billDetails?.paymentType[inde]?.paymentType || "Credit";
  const customer = billItem?.billDetails?.cusName[inde] || "";
  const date = billItem?.billDetails?.date[inde] || "";
  const items = billItem?.billDetails?.billItems[inde] || [];
  const bill = billItem?.billItem?.[inde] || {};

  const handleUpdate = (index) => {
    setUpdate(prev => ({ ...prev, [index]: !prev[index] }));
  }
  const updateValueHandleing = (e, index) => {
    const { name, value } = e.target;
    dispatch(setUpdateBillItems({ id: inde, index: index, key: name, value: value }));
  }

  const updateSale = () => {
    const statement = {
      statement: {
        id: inde,
        bill: billDetails.billItems[inde],
        cusName: billDetails.cusName[inde]?.customer || "retailer",
        date: billDetails.date[inde]?.date || new Date().toISOString().split("T")[0],
        paymentType: billDetails.paymentType[inde]?.paymentType || "Credit",
        email: JSON.parse((localStorage.getItem("user"))).email
      }
    };
    dispatch(putSalesStatement(statement));
    dispatch(setUpdateBill({ id: inde }));
    dispatch(removeTab({ path: window.location.pathname, navigate, navigationPath: "/" }));

  }

  const billhandleing = (e) => {
    const { name, value } = e.target;

    if (name === "customer") {
      dispatch(setCustomer({ id: inde, [name]: value }));
    } else if (name === 'date') {
      dispatch(setDate({ id: inde, [name]: value }));
    } else if (name === "paymentType") {
      dispatch(setPaymentType({ id: inde, [name]: value }));
    }
    else
      dispatch(addItem({ item: { id: inde, key: name, value: value } }));
  }
  const addItemInBill = () => {
    itemName.current.focus();
    if (!bill?.itemName || !bill?.itemPrice || !bill?.itemCount) {
      alert("Please enter the itemDetails");
    } else
      dispatch(addBillItem({ id: inde }));
  }
  const handleDelete = (index) => {
    dispatch(deleteItem({ id: inde, index }));
  }
  const addSales = () => {
    const statement = {
      id: inde,
      bill: billDetails.billItems[inde],
      cusName: billDetails.cusName[inde]?.customer || "retailer",
      date: billDetails.date[inde]?.date || new Date().toISOString().split("T")[0],
      paymentType: billDetails.paymentType[inde]?.paymentType || "Credit",
    };
    dispatch(setSalesStatement({ id: inde }));
    dispatch(postSalesStatement({ statement, email: JSON.parse((localStorage.getItem("user"))).email }));
    dispatch(removeTab({ path: window.location.pathname, navigate, navigationPath: "/" }));
  }
  return (
    // <div>
    //   <div className="card shadow border-0 rounded-4 mb-4">
    //     <div className="card-body p-4">
    //       <div className="row g-3">
    //         <div className="col-md-4 form-floating">
    //           <input
    //             type="text"
    //             name="customer"
    //             className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
    //             id="customerInput"
    //             value={customer?.customer || ""}
    //             placeholder=" "
    //             onChange={(e) => billhandleing(e)}
    //           />
    //           <label htmlFor="customerInput" className="text-muted">Customer Name</label>
    //         </div>

    //         <div className="col-md-4 form-floating">
    //           <input
    //             type="date"
    //             className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
    //             id="dateInput"
    //             name="date"
    //             value={date?.date ? date.date : new Date().toISOString().split("T")[0]}
    //             onChange={(e) => billhandleing(e)}
    //           />
    //           <label htmlFor="dateInput" className="text-muted">Date</label>
    //         </div>

    //         <div className="col-md-4 form-floating">
    //           <select
    //             className="form-select form-select-lg border-0 border-bottom rounded-0 shadow-none"
    //             id="paymentInput"
    //             name="paymentType"
    //             value={paymentType}
    //             onChange={billhandleing}
    //           >
    //             <option value="Debit">Debit</option>
    //             <option value="Credit">Credit</option>
    //           </select>
    //           <label htmlFor="paymentInput" className="text-muted">Payment Type</label>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="card shadow border-0 rounded-4 mb-4">
    //     <div className="card-body p-4">
    //       <div className="row g-3 align-items-end">
    //         <div className="col-md-4 form-floating">
    //           <input
    //             type="text"
    //             name="itemName"
    //             id="itemNameInput"
    //             ref={itemName}
    //             className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
    //             value={bill?.itemName || ""}
    //             placeholder=" "
    //             onKeyDown={(e) => e.key === "Enter" && itemPrice.current.focus()}
    //             onChange={(e) => billhandleing(e)}
    //             autoFocus
    //           />
    //           <label htmlFor="itemNameInput" className="text-muted">Item Name</label>
    //         </div>

    //         <div className="col-md-2 form-floating">
    //           <input
    //             type="number"
    //             name="itemPrice"
    //             id="priceInput"
    //             ref={itemPrice}
    //             className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
    //             value={bill?.itemPrice || ""}
    //             placeholder=" "
    //             min="0"
    //             step="0.01"
    //             onKeyDown={(e) => e.key === "Enter" && itemCount.current.focus()}
    //             onChange={(e) => billhandleing(e)}
    //           />
    //           <label htmlFor="priceInput" className="text-muted">Price (₹)</label>
    //         </div>

    //         <div className="col-md-2 form-floating">
    //           <input
    //             type="number"
    //             id="quantityInput"
    //             ref={itemCount}
    //             name="itemCount"
    //             className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
    //             value={bill?.itemCount || ""}
    //             placeholder=" "
    //             min="1"
    //             onKeyDown={(e) => e.key === "Enter" && addItemInBill()}
    //             onChange={(e) => billhandleing(e)}
    //           />
    //           <label htmlFor="quantityInput" className="text-muted">Quantity</label>
    //         </div>

    //         <div className="col-md-4 d-flex gap-2">
    //           <button
    //             className="btn btn-primary btn-lg rounded-pill px-4 flex-grow-1"
    //             onClick={addItemInBill}
    //           >
    //             <i className="bi bi-plus-circle-fill me-2"></i> Add Item
    //           </button>
    //           <button
    //             className="btn btn-outline-danger btn-lg rounded-pill px-4"
    //             onClick={() => { /* Clear form */ }}
    //           >
    //             <i className="bi bi-x-circle-fill me-2"></i> Clear
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
    //     <div className="table-responsive">
    //       <table className="table align-middle mb-0">
    //         <thead className="bg-light-success">
    //           <tr>
    //             <th className="ps-4">#</th>
    //             <th>ITEM NAME</th>
    //             <th>PRICE (₹)</th>
    //             <th>QTY</th>
    //             <th>TOTAL</th>
    //             <th className="text-end pe-4">ACTIONS</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {items?.map((item, index) => (
    //             <tr key={index} className={update[index] ? "bg-light-warning" : ""}>
    //               <td className="ps-4 fw-semibold">{index + 1}</td>

    //               {!update[index] ? (
    //                 <>
    //                   <td className="text-uppercase fw-semibold">{item.itemName}</td>
    //                   <td>₹{Number(item.itemPrice).toFixed(2)}</td>
    //                   <td>{item.itemCount}</td>
    //                   <td className="fw-bold text-success">₹{(item.itemCount * item.itemPrice).toFixed(2)}</td>
    //                 </>
    //               ) : (
    //                 <>
    //                   <td>
    //                     <input
    //                       type="text"
    //                       className="form-control form-control-sm border-success"
    //                       name="itemName"
    //                       value={item.itemName}
    //                       onChange={(e) => updateValueHandleing(e, index)}
    //                     />
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="number"
    //                       className="form-control form-control-sm border-success"
    //                       name="itemPrice"
    //                       value={item.itemPrice}
    //                       onChange={(e) => updateValueHandleing(e, index)}
    //                       step="0.01"
    //                       min="0"
    //                     />
    //                   </td>
    //                   <td>
    //                     <input
    //                       type="number"
    //                       className="form-control form-control-sm border-success"
    //                       name="itemCount"
    //                       value={item.itemCount}
    //                       onChange={(e) => updateValueHandleing(e, index)}
    //                       min="1"
    //                     />
    //                   </td>
    //                   <td className="fw-bold text-success">₹{(item.itemCount * item.itemPrice).toFixed(2)}</td>
    //                 </>
    //               )}

    //               <td className="text-end pe-4">
    //                 <div className="d-flex gap-2 justify-content-end">
    //                   <button
    //                     className={`btn btn-sm ${update[index] ? 'btn-success' : 'btn-outline-primary'} rounded-pill`}
    //                     onClick={() => handleUpdate(index)}
    //                   >
    //                     {!update[index] ? (
    //                       <i className="bi bi-pencil-fill"></i>
    //                     ) : (
    //                       <i className="bi bi-check-lg"></i>
    //                     )}
    //                   </button>
    //                   <button
    //                     className="btn btn-sm btn-outline-danger rounded-pill"
    //                     onClick={() => handleDelete(index)}
    //                   >
    //                     <i className="bi bi-trash-fill"></i>
    //                   </button>
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    //   {items.length !== 0 && (
    //     <div className="card-footer bg-light p-3 border-0 rounded-bottom-3">
    //       <div className="d-flex justify-content-between align-items-center">
    //         <div className="d-flex align-items-center">
    //           <span className="badge bg-success-subtle text-success fs-5 p-3">
    //             TOTAL: ₹{items.reduce((acc, item) => acc + (item.itemCount * item.itemPrice), 0).toFixed(2)}
    //           </span>
    //         </div>
    //         <button
    //           className="btn btn-success btn-lg rounded-pill px-4 fw-bold d-flex align-items-center"
    //           onClick={id.split("&").length === 1 ? addSales : updateSale}
    //         >
    //           FINISH SALE <i className="bi bi-check-circle-fill ms-2"></i>
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="container-fluid p-3">
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-3">
          <div className="row g-3">
            <div className="col-md-4 form-floating">
              <input
                type="text"
                name="customer"
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                id="customerInput"
                value={customer?.customer || ""}
                placeholder=" "
                onChange={(e) => billhandleing(e)}
              />
              <label htmlFor="customerInput" className="text-muted">Customer Name</label>
            </div>

            <div className="col-md-4 form-floating">
              <input
                type="date"
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                id="dateInput"
                name="date"
                value={date?.date ? date.date : new Date().toISOString().split("T")[0]}
                onChange={(e) => billhandleing(e)}
              />
              <label htmlFor="dateInput" className="text-muted">Date</label>
            </div>

            <div className="col-md-4 form-floating">
              <select
                className="form-select form-select-lg border-0 border-bottom rounded-0 shadow-none"
                id="paymentInput"
                name="paymentType"
                value={paymentType || "Debit"}
                onChange={billhandleing}
              >
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
              <label htmlFor="paymentInput" className="text-muted">Payment Type</label>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-4 form-floating">
              <input
                type="text"
                name="itemName"
                id="itemNameInput"
                ref={itemName}
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                value={bill?.itemName || ""}
                placeholder=" "
                onKeyDown={(e) => e.key === "Enter" && itemPrice.current?.focus()}
                onChange={(e) => billhandleing(e)}
                autoFocus
              />
              <label htmlFor="itemNameInput" className="text-muted">Item Name</label>
            </div>

            <div className="col-md-2 form-floating">
              <input
                type="number"
                name="itemPrice"
                id="priceInput"
                ref={itemPrice}
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                value={bill?.itemPrice || ""}
                placeholder=" "
                min="0"
                step="0.01"
                onKeyDown={(e) => e.key === "Enter" && itemCount.current?.focus()}
                onChange={(e) => billhandleing(e)}
              />
              <label htmlFor="priceInput" className="text-muted">Price (₹)</label>
            </div>

            <div className="col-md-2 form-floating">
              <input
                type="number"
                id="quantityInput"
                ref={itemCount}
                name="itemCount"
                className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                value={bill?.itemCount || ""}
                placeholder=" "
                min="1"
                onKeyDown={(e) => e.key === "Enter" && addItemInBill()}
                onChange={(e) => billhandleing(e)}
              />
              <label htmlFor="quantityInput" className="text-muted">Quantity</label>
            </div>

            <div className="col-md-4 d-flex gap-2">
              <button
                className="btn btn-primary btn-lg rounded-pill px-3 flex-grow-1"
                onClick={addItemInBill}
                disabled={!bill?.itemName || !bill?.itemPrice || !bill?.itemCount}
              >
                <i className="bi bi-plus-circle-fill me-2"></i> Add Item
              </button>
              <button
                className="btn btn-outline-danger btn-lg rounded-pill px-4 flex-grow-1"
                onClick={() => {
                  itemName.current?.focus();
                  dispatch(clearBillItems({ id: inde }))
                }}
              >
                <i className="bi bi-x-circle-fill me-2"></i> Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      {items?.length > 0 &&
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden mb-4">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="bg-light-success">
                <tr>
                  <th className="ps-4">#</th>
                  <th>ITEM NAME</th>
                  <th>PRICE (₹)</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                  <th className="text-end pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item, index) => (
                    <tr key={index} className={update[index] ? "bg-light-warning" : ""}>
                      <td className="ps-4 fw-semibold">{index + 1}</td>

                      {!update[index] ? (
                        <>
                          <td className="text-uppercase fw-semibold">{item.itemName}</td>
                          <td>₹{Number(item.itemPrice).toFixed(2)}</td>
                          <td>{item.itemCount}</td>
                          <td className="fw-bold text-success">₹{(item.itemCount * item.itemPrice).toFixed(2)}</td>
                        </>
                      ) : (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm border-success"
                              name="itemName"
                              value={item.itemName}
                              onChange={(e) => updateValueHandleing(e, index)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm border-success"
                              name="itemPrice"
                              value={item.itemPrice}
                              onChange={(e) => updateValueHandleing(e, index)}
                              step="0.01"
                              min="0"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm border-success"
                              name="itemCount"
                              value={item.itemCount}
                              onChange={(e) => updateValueHandleing(e, index)}
                              min="1"
                            />
                          </td>
                          <td className="fw-bold text-success">₹{(item.itemCount * item.itemPrice).toFixed(2)}</td>
                        </>
                      )}

                      <td className="text-end pe-4">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className={`btn btn-sm ${update[index] ? 'btn-success' : 'btn-outline-primary'} rounded-pill`}
                            onClick={() => handleUpdate(index)}
                          >
                            {!update[index] ? (
                              <i className="bi bi-pencil-fill"></i>
                            ) : (
                              <i className="bi bi-check-lg"></i>
                            )}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      }

      {items.length > 0 && (
        <div className="card-footer bg-white p-3 border-top border-light rounded-bottom-3 sticky-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-light text-success fs-5 p-2 border border-success border-opacity-10">
                <i className="bi bi-currency-rupee me-2"></i> TOTAL: ₹{items.reduce((acc, item) => acc + (item.itemCount * item.itemPrice), 0).toFixed(2)}
              </span>
            </div>
            <button
              className="btn btn-outline-success btn-lg rounded-pill px-4 fw-bold d-flex align-items-center shadow-sm"
              onClick={id.split("&").length === 1 ? addSales : updateSale}
              disabled={items.length === 0}
            >
              <i className="bi bi-check-circle me-2"></i> FINISH SALE
            </button>
          </div>
        </div>
      )}
    </div>

  )
}

export default Bill;