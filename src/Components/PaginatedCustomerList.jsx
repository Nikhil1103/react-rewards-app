import { useState, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_CONFIG } from '../constants';
import CustomerRewards from './CustomerRewards';

const PaginatedCustomerList = memo(function PaginatedCustomerList({ rewardsData = {} }) {
    const [currentPage, setCurrentPage] = useState(1);

    const { customersPerPage } = PAGINATION_CONFIG;

    // Memoize processed data
    const processedData = useMemo(() => {
        if (!rewardsData) {
            return {
                customers: [],
                totalPages: 0,
                currentCustomers: [],
                totalCustomers: 0,
            };
        }

        const customers = Object.values(rewardsData);
        const totalPages = Math.ceil(customers.length / customersPerPage);

        const startIndex = (currentPage - 1) * customersPerPage;
        const endIndex = startIndex + customersPerPage;
        const currentCustomers = customers.slice(startIndex, endIndex);

        return {
            customers,
            totalPages,
            currentCustomers,
            totalCustomers: customers.length,
        };
    }, [rewardsData, currentPage, customersPerPage]);

    // Memoize page numbers array
    const pageNumbers = useMemo(() => {
        const numbers = [];
        for (let i = 1; i <= processedData.totalPages; i++) {
            numbers.push(i);
        }
        return numbers;
    }, [processedData.totalPages]);

    // Memoize scroll behavior
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Memoize handlers
    const handleNextPage = useCallback(() => {
        if (currentPage < processedData.totalPages) {
            setCurrentPage(prev => prev + 1);
            scrollToTop();
        }
    }, [currentPage, processedData.totalPages, scrollToTop]);

    const handlePrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            scrollToTop();
        }
    }, [currentPage, scrollToTop]);

    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= processedData.totalPages) {
            setCurrentPage(page);
            scrollToTop();
        }
    }, [processedData.totalPages, scrollToTop]);

    return (
        <div>
            {/* Customers Grid */}
            <div className='grid gap-6 mb-8'>
                {processedData.currentCustomers.map((customer) => (
                    <CustomerRewards key={customer.customerId} customer={customer} />
                ))}
            </div>

            {/* Pagination */}
            {processedData.totalPages > 1 && (
                <div className='flex items-center justify-center gap-2 mt-8 flex-wrap'>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className='px-3 py-2 rounded-lg border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition'
                    >
                        ← Previous
                    </button>

                    <div className='flex gap-1 flex-wrap justify-center'>
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg font-semibold transition ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 bg-white hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === processedData.totalPages}
                        className='px-3 py-2 rounded-lg border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition'
                    >
                        Next →
                    </button>

                    <div className='text-gray-600 text-sm ml-4'>
                        Page {currentPage} of {processedData.totalPages} | Total: {processedData.totalCustomers} customers
                    </div>
                </div>
            )}
        </div>
    );
});

PaginatedCustomerList.propTypes = {
    rewardsData: PropTypes.objectOf(
        PropTypes.shape({
            customerId: PropTypes.string.isRequired,
            customerName: PropTypes.string.isRequired,
            months: PropTypes.object.isRequired,
            total: PropTypes.number.isRequired,
        })
    ),
};

export default PaginatedCustomerList;
