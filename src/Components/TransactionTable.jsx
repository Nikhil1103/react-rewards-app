import { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const TransactionTable = memo(function TransactionTable({ customer, months }) {
    // Memoize transactions list
    const allTransactions = useMemo(() => {
        return months.flatMap(month => {
            const monthData = customer.months[month];
            if (!monthData || !monthData.transactions) return [];
            return monthData.transactions.map(transaction => ({
                ...transaction,
                month,
            }));
        });
    }, [customer, months]);


    // Memoize date formatter
    const formatDate = useCallback((dateString) => {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return dateString;
        }
    }, []);

    return (
        <div className='border-t pt-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Transaction Details</h3>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm m-20'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-4 py-2 text-center text-gray-600 font-semibold'>Transaction ID</th>
                            <th className='px-4 py-2 text-center text-gray-600 font-semibold'>Date</th>
                            <th className='px-4 py-2 text-center text-gray-600 font-semibold'>Amount</th>
                            <th className='px-4 py-2 text-center text-gray-600 font-semibold'>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactions.map((transaction) => (
                            <tr key={transaction.transactionId} className='border-b hover:bg-gray-50 transition'>
                                <td className='px-4 py-2 text-xs font-medium text-gray-500'>
                                    {transaction.transactionId}
                                </td>
                                <td className='px-4 py-2 text-gray-700'>
                                    {formatDate(transaction.date)}
                                </td>
                                <td className='px-4 py-2 text-gray-700 font-medium'>
                                    ${transaction.amount.toFixed(2)}
                                </td>
                                <td className='px-4 py-2 font-semibold text-blue-600'>
                                    {transaction.points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

TransactionTable.propTypes = {
    customer: PropTypes.shape({
        customerId: PropTypes.string.isRequired,
        customerName: PropTypes.string.isRequired,
        months: PropTypes.objectOf(
            PropTypes.shape({
                points: PropTypes.number.isRequired,
                transactions: PropTypes.arrayOf(
                    PropTypes.shape({
                        transactionId: PropTypes.string.isRequired,
                        customerId: PropTypes.string.isRequired,
                        customerName: PropTypes.string.isRequired,
                        amount: PropTypes.number.isRequired,
                        date: PropTypes.string.isRequired,
                        points: PropTypes.number.isRequired,
                    })
                ).isRequired,
            })
        ).isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
    months: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TransactionTable;