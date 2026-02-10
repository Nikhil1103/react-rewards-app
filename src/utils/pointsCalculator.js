const pointsCache = new Map();

export const calculatePoints = (amount) => {
    // Return cached value if exists
    if (pointsCache.has(amount)) {
        return pointsCache.get(amount);
    }

    let points = 0;

    // 2 points for every dollar spent over $100
    if (amount > 100) {
        points += (amount - 100) * 2;
    }

    // 1 point for every dollar spent between $50 and $100
    if (amount >= 50 && amount <= 100) {
        points += amount * 1;
    } else if (amount > 100) {
        points += 50 * 1;
    }

    // Cache the result
    pointsCache.set(amount, points);
    return points;
};

export const groupByCustomerAndMonth = (transactions) => {
    const grouped = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const customerId = transaction.customerId;
        const customerName = transaction.customerName;

        if (!grouped[customerId]) {
            grouped[customerId] = {
                customerId,
                customerName,
                months: {},
                total: 0,
            };
        }

        if (!grouped[customerId].months[monthKey]) {
            grouped[customerId].months[monthKey] = {
                month: monthKey,
                points: 0,
                transactions: [],
            };
        }

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