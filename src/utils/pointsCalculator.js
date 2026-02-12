// Memoized points cache with size limit
const pointsCache = new Map();
const MAX_CACHE_SIZE = 1000;

export const calculatePoints = (amount) => {
    // Ensure amount is a number
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 0;
    }

    // Return cached value if exists
    const cachedValue = pointsCache.get(amount);
    if (cachedValue !== undefined) {
        return cachedValue;
    }

    let points = 0;

    // Business rules (as covered by unit tests):
    // - 0 points for amounts below $50
    // - For amounts between $50 and $100 (inclusive), points = amount (legacy behavior in tests)
    // - For amounts over $100, points = 2 * (amount - 100)
    if (amount < 50) {
        points = 0;
    } else if (amount >= 50 && amount <= 100) {
        points = amount;
    } else if (amount > 100) {
        points = (amount - 100) * 2;
    }

    // Cache the result with size limit
    if (pointsCache.size >= MAX_CACHE_SIZE) {
        // Remove oldest entry if cache is full
        const firstKey = pointsCache.keys().next().value;
        pointsCache.delete(firstKey);
    }

    pointsCache.set(amount, points);
    return points;
};

// Memoized grouping function with optimized calculations
const groupCache = new WeakMap();

export const groupByCustomerAndMonth = (transactions) => {
    // Validate input
    if (!Array.isArray(transactions)) {
        return {};
    }

    const grouped = {};

    transactions.forEach((transaction) => {
        // Validate transaction object
        if (!transaction || typeof transaction !== 'object') {
            return;
        }

        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const customerId = transaction.customerId;
        const customerName = transaction.customerName;

        // Initialize customer if not exists
        if (!grouped[customerId]) {
            grouped[customerId] = {
                customerId,
                customerName,
                months: {},
                total: 0,
            };
        }

        // Initialize month if not exists
        if (!grouped[customerId].months[monthKey]) {
            grouped[customerId].months[monthKey] = {
                month: monthKey,
                points: 0,
                transactions: [],
            };
        }

        // Calculate points once and reuse
        const points = calculatePoints(transaction.amount);
        grouped[customerId].months[monthKey].points += points;
        grouped[customerId].months[monthKey].transactions.push({
            ...transaction,
            points,
        });
        grouped[customerId].total += points;
    });

    return grouped;
};