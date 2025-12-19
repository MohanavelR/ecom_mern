import React from 'react'
import NotAvailable from '../common/NotAvailable'

const AdminOrderView = ({ OpenDetailOrderMethod, totalOrders }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* <!-- Header --> */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                    </div>
                </header>
                <div className="overflow-x-auto">
                    {
                        (totalOrders && totalOrders.length > 0) ?
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Items
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        totalOrders.map((order) => (
                                            <tr className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">#{order?._id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{(order?.orderDate).split("T")[0]}</div>
                                                    {/* <div className="text-sm text-gray-500">{(order?.orderDate).split("T")[1]} AM</div> */}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">

                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${order?.orderStatus === 'delivered' ? "bg-green-400" : order?.orderStatus === 'rejected' ? "bg-red-600" : order?.orderStatus === 'pending' ? "bg-amber-400 " : "bg-blue-800"}`}>
                                                        {order?.orderStatus === 'delivered' ? <i className="fas fa-check-circle mr-1"></i> : order?.orderStatus === 'rejected' ? <i className="fas fa-times-circle mr-1 text-danger"></i> : order?.orderStatus === 'pending' ? <i className="fas fa-hourglass-start mr-1 text-info"></i> : <i className="fas fa-clock mr-1 text-warning"></i>}
                                                        {order.orderStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <i className="fa-solid fa-indian-rupee-sign"></i>  {order?.totalAmount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order?.cartItems?.length} {order?.cartItems?.length > 1 ? 'Items' : 'Item'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => OpenDetailOrderMethod(order?._id)} className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                                                        <i className="fas fa-eye mr-1"></i> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table> : <NotAvailable />
                    }
                </div>
            </div>
        </>
    )
}

export default AdminOrderView