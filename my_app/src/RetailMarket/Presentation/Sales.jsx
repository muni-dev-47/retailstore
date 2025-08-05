import React from 'react'

const Sales = (props) => {
    const { sales, updateSales, billDetails } = props;
    return (
        <div className="card shadow-sm border-0 rounded-3">
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                    <thead className="bg-light-primary">
                        <tr>
                            <th className="ps-4">#</th>
                            <th className="text-start">CUSTOMER</th>
                            <th className="text-end">TOTAL (₹)</th>
                            <th className="text-end pe-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.length > 0 && (
                            sales.map((item, index) => (
                                <tr key={index} className="hover-shadow">
                                    <td className="ps-4 fw-medium">{index + 1}</td>
                                    <td className="text-start">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                                <i className="bi bi-person-fill text-primary"></i>
                                            </div>
                                            <div>
                                                <div className="fw-semibold">{item.cusName.toUpperCase()}</div>
                                                <small className="text-muted">{item.date?.split('T')[0] || 'No date'}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-end fw-bold text-success">
                                        ₹{item.bill.reduce((total, item) => total + (item.itemPrice * item.itemCount), 0).toFixed(2)}
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button
                                                className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center"
                                                onClick={() => billDetails(item, index)}
                                                title="View Details"
                                            >
                                                <i className="bi bi-eye-fill me-1"></i> View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-flex align-items-center"
                                                onClick={() => updateSales(item)}
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil-fill me-1"></i> Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sales