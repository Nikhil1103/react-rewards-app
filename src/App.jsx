import { useEffect, useState } from 'react';
import { fetchTransactions } from './Services/fetchTransaction';
import { groupByCustomerAndMonth } from './utils/pointsCalculator';
import PaginatedCustomerList from './Components/PaginatedCustomerList';
import { MESSAGES } from './constants';
import './App.css';

export default function App() {
  const [rewardsData, setRewardsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const transactions = await fetchTransactions();
        const grouped = groupByCustomerAndMonth(transactions);
        setRewardsData(grouped);
      } catch (err) {
        setError(err.message || MESSAGES.ERROR);
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
          <div className='text-xl text-gray-600'>{MESSAGES.LOADING}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
        <div className='p-6'>
          <div className='text-xl text-red-600 font-semibold'>{error}</div>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 w-32 h-12 text-2xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!rewardsData) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
        <div className='text-center'>
          <div className='text-xl text-gray-600'>No data to display</div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'> Rewards Program</h1>
          <p className='text-gray-600 text-lg'>Customer Points Summary - 3 Month Period</p>
        </div>

        <PaginatedCustomerList rewardsData={rewardsData} />
      </div>
    </div>
  );
}
