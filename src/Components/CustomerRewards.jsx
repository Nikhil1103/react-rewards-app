import { memo } from 'react';
import PropTypes from 'prop-types';
import MonthCard from './MonthCard.jsx';
import TransactionTable from './TransactionTable.jsx';

const CustomerRewards = memo(function CustomerRewards({ customer }) {
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
            <MonthCard
              key={month}
              month={month}
              monthData={customer.months[month]}
            />
          ))}

          {/* Total Points Card */}
          <div className='bg-green-50 rounded-lg p-4 border-2 border-green-200'>
            <p className='text-gray-600 text-sm font-semibold mb-1'>Total Points</p>
            <p className='text-2xl font-bold text-green-600'>{customer.total}</p>
          </div>
        </div>

        {/* Transaction Details */}
        <TransactionTable customer={customer} months={months} />
      </div>
    </div>
  );
});

CustomerRewards.propTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    months: PropTypes.objectOf(
      PropTypes.shape({
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
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default CustomerRewards;