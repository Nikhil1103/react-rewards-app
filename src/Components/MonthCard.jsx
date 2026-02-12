import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

const MonthCard = memo(function MonthCard({ month, monthData }) {
    // Memoize date string to avoid recreation
    const monthDisplay = useMemo(() => {
        try {
            return new Date(month + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
            });
        } catch (e) {
            return month;
        }
    }, [month]);

    return (
        <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
            <p className='text-gray-600 text-sm font-semibold mb-1'>
                {monthDisplay}
            </p>
            <p className='text-2xl font-bold text-blue-600'>
                {monthData.points}
            </p>
            <p className='text-xs text-gray-500 mt-2'>
                {monthData.transactions.length} transaction(s)
            </p>
        </div>
    );
});

MonthCard.propTypes = {
    month: PropTypes.string.isRequired,
    monthData: PropTypes.shape({
        month: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        transactions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                customerName: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
                date: PropTypes.string.isRequired,
                points: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default MonthCard;