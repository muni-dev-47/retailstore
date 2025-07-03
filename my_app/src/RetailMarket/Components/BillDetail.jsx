import React, { forwardRef, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BillDetails = forwardRef((props, ref) => {
  const { cname } = useParams();
  const cusName = cname.split("&")[0];
  const index = cname.split("&")[1];
  const noRef = useRef();
  const cityRef = useRef();
  const [address, setAddress] = useState(false);  
  const [deliAddress, setDeliAddress] = useState(false);
  const [toAdd, setToAdd] = useState({});
  const [delAdd, setDelAdd] = useState({})
  const bill = useSelector(store => store.bill);
  const items = bill.salesStatements[index].bill;
  const id = bill.salesStatements[index].id;
  const date = bill.salesStatements[index].date;
  const subtotal = items.reduce((acc, item) => acc + item.itemPrice * item.itemCount, 0);
  const taxRate = 0.05;
  const total = subtotal + subtotal * taxRate;

  return (
    <div ref={ref} className="container my-5 p-4 border rounded shadow-sm">
      <div className="row mb-4">
        <div className="col">
          <h5>STORE NAME ? </h5>
          <p>
            14B, XXX XXX XX<br />
            Greater South Avenue<br />
            YYYYY YYYY , U.S.A
          </p>
        </div>
        <div className="col text-end">
          <h1>INVOICE</h1>
          <strong>Invoice# INV-{id}</strong>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <h6>Bill To</h6>
          <strong>{cusName.toUpperCase()},</strong><br />

          {address ? (
            <>
              <input type="text" ref={noRef} name="storeNo" value={toAdd?.storeNo} placeholder="Address" className="form-control " onChange={(e) => setToAdd(val => ({ ...val, [e.target.name]: e.target.value }))} onKeyDown={(e) => e.key === "Enter" ? cityRef.current.focus() : ""} /><br />
              <input type="text" ref={cityRef} name="city" value={toAdd?.city} placeholder="City" className="form-control mb-2" onChange={(e) => setToAdd(val => ({ ...val, [e.target.name]: e.target.value }))} onKeyDown={(e) => e.key === "Enter" ? setAddress(val => !val) : ""} /><br />
            </>
          ) : (
            <>
              {toAdd?.storeNo ? toAdd.storeNo : "XXX XXXX XXXX"},<br />
              {toAdd?.city ? toAdd.city : "YYY YYYY YYYY"}.<br />
            </>
          )}

          {!address ? <i className="bi bi-pencil-square" onClick={() => setAddress(val => !val)}></i> : <i class="bi bi-check-circle" onClick={() => setAddress(val => !val)}></i>}<br />
          India
        </div>

        <div className="col">
          <h6>DELIVERY ADDRESS</h6>
          {deliAddress ? (
            <>
              <input type="text" ref={noRef} name="storeNo" value={delAdd?.storeNo} placeholder="Address" className="form-control " onChange={(e) => setDelAdd(val => ({ ...val, [e.target.name]: e.target.value }))} onKeyDown={(e) => e.key === "Enter" ? cityRef.current.focus() : ""} /><br />
              <input type="text" ref={cityRef} name="city" value={delAdd?.city} placeholder="City" className="form-control mb-2" onChange={(e) => setDelAdd(val => ({ ...val, [e.target.name]: e.target.value }))} onKeyDown={(e) => e.key === "Enter" ? setDeliAddress(val => !val) : ""} /><br />
            </>
          ) : (
            <>
              {delAdd?.storeNo ? delAdd.storeNo : "XXX XXXX XXXX"},<br />
              {delAdd?.city ? delAdd.city : "YYY YYYY YYYY"}.<br />
            </>
          )}
          {!deliAddress ? <i className="bi bi-pencil-square" onClick={() => setDeliAddress(val => !val)}></i> : <i class="bi bi-check-circle" onClick={() => setDeliAddress(val => !val)}></i>}<br />
          India
        </div>
      </div>

      <div className="row mb-3">
        <div className="col"><strong>Invoice Date:</strong>{new Date(date).toLocaleDateString("en-GB")}</div>
      </div>

      <table className="table table-bordered">
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Item & Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <strong>{item.itemName.toUpperCase()}</strong><br />
              </td>
              <td>{item.itemCount}</td>
              <td>₹{Number(item.itemPrice).toFixed(2)}</td>
              <td>₹{(item.itemCount * item.itemPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row justify-content-end">
        <div className="col-md-4">
          <table className="table">
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td>₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax Rate</td>
                <td>5.00%</td>
              </tr>
              <tr className="fw-bold">
                <td>Total</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>
              <tr className="fw-bold text-success">
                <td>Balance Due</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4"><em>Thanks for your business.</em></p>
      <hr />
      <p className="small">
        <strong>Terms & Conditions:</strong> Full payment is due upon receipt of this invoice. Late payments may incur additional charges or interest.
      </p>
    </div>
  );
});

export default BillDetails;
