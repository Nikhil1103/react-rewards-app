import { memo } from 'react';

const TransactionTable = memo(function TransactionTable({ customer, months }) {
    return (
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
    );
});

export default TransactionTable;