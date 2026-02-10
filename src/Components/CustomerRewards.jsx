import React from "react";

const CustomerRewards = ({ customer }) => {
    const months = Object.keys(customer.months).sort();
    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            {/* Customer Header */}
            <div className='bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white'>
                <h2 className='text-2xl font-bold'>{customer.customerName}</h2>
                <p className='text-blue-100 text-sm'>ID: {customer.customerId}</p>
            </div>

            {/* Main Content */}
            <div className='p-6'>
                {/* Monthly Points Cards */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                    {months.map((month) => (
                        <div key={month} className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
                            <p className='text-gray-600 text-sm font-semibold mb-1'>
                                {new Date(month + '-01').toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                            <p className='text-2xl font-bold text-blue-600'>
                                {customer.months[month].points}
                            </p>
                            <p className='text-xs text-gray-500 mt-2'>
                                {customer.months[month].transactions.length} transaction(s)
                            </p>
                        </div>
                    ))}

                    {/* Total Points Card */}
                    <div className='bg-green-50 rounded-lg p-4 border-2 border-green-200'>
                        <p className='text-gray-600 text-sm font-semibold mb-1'>Total Points</p>
                        <p className='text-2xl font-bold text-green-600'>{customer.total}</p>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className='border-t pt-6'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Transaction Details</h3>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='px-4 py-2 text-left text-gray-600 font-semibold'>Date</th>
                                    <th className='px-4 py-2 text-left text-gray-600 font-semibold'>Amount</th>
                                    <th className='px-4 py-2 text-left text-gray-600 font-semibold'>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {months.map((month) =>
                                    customer.months[month].transactions.map((transaction) => (
                                        <tr key={transaction.id} className='border-b hover:bg-gray-50 transition'>
                                            <td className='px-4 py-2 text-gray-700'>
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </td>
                                            <td className='px-4 py-2 text-gray-700 font-medium'>
                                                ${transaction.amount.toFixed(2)}
                                            </td>
                                            <td className='px-4 py-2 font-semibold text-blue-600'>
                                                {transaction.points}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerRewards;