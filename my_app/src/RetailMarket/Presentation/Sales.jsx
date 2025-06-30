import React from 'react'

const Sales = (props) => {
    const { sales, updateSales } = props;
    return (
        <div>
            <table class="table table-success table-striped table-hover text-center">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>CUSTOMERNAME</th>
                        <th>TOTAL</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {sales?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.cusName.toUpperCase()}</td>
                            <td>{item.bill.reduce((total, item) => total + (item.itemPrice * item.itemCount), 0)}</td>
                            <td>
                                <button className='btn btn-success rounded-pill '><i class="bi bi-eye view" title="View"></i></button>
                                <button className='btn btn-primary rounded-pill ' onClick={() => updateSales(item)}><i class="bi bi-pencil edit" title="Edit"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Sales