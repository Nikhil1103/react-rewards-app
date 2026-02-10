import { useEffect, useState } from 'react';
import { fetchTransactions } from './Services/fetchTransaction';
import { groupByCustomerAndMonth } from './utils/pointsCalculator';
import CustomerRewards from './components/CustomerRewards';
import './App.css';

export default function App() {
  const [rewardsData, setRewardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const transactions = await fetchTransactions();
        const grouped = groupByCustomerAndMonth(transactions);
        setRewardsData(grouped);
      } catch (err) {
        setError('Failed to load transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <div className='text-xl text-gray-600'>Loading rewards data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='text-xl text-red-600 font-semibold'>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>🎁 Rewards Program</h1>
          <p className='text-gray-600 text-lg'>Customer Points Summary - 3 Month Period</p>
        </div>

        <div className='grid gap-6'>
          {Object.values(rewardsData).map((customer) => (
            <CustomerRewards key={customer.customerId} customer={customer} />
          ))}
        </div>
      </div>
    </div>
  );
}
