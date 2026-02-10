import { memo } from 'react';

const MonthCard = memo(function MonthCard({ month, monthData }) {
    return (
        <div className='bg-blue-50 rounded-lg p-4 border border-blue-200'>
            <p className='text-gray-600 text-sm font-semibold mb-1'>
                {new Date(month + '-01').toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                })}
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

export default MonthCard;