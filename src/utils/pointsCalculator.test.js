import { describe, it, expect, beforeEach } from 'vitest';
import { calculatePoints, groupByCustomerAndMonth } from '../utils/pointsCalculator';

describe('calculatePoints', () => {
    beforeEach(() => {
        // Clear cache before each test if needed
        // Note: The actual cache is internal to the module
    });

    describe('Positive Test Cases', () => {
        it('should calculate 2 points per dollar for amount over $100 (whole number)', () => {
            const amount = 150;
            const points = calculatePoints(amount);
            // For 150: (150 - 100) * 2 = 100 points
            expect(points).toBe(100);
        });

        it('should calculate 2 points per dollar for amount over $100 (fractional number)', () => {
            const amount = 125.75;
            const points = calculatePoints(amount);
            // For 125.75: (125.75 - 100) * 2 = 51.5 points
            expect(points).toBe(51.5);
        });

        it('should calculate 1 point per dollar for amount between $50-$100 (whole number)', () => {
            const amount = 75;
            const points = calculatePoints(amount);
            // For 75: 75 * 1 = 75 points
            expect(points).toBe(75);
        });

        it('should calculate correct points for amount with decimal between $50-$100', () => {
            const amount = 85.50;
            const points = calculatePoints(amount);
            // For 85.50: 85.50 * 1 = 85.5 points
            expect(points).toBe(85.5);
        });

        it('should calculate 50 points for amount exactly at $100', () => {
            const amount = 100;
            const points = calculatePoints(amount);
            // For 100: 100 * 1 = 100 points
            expect(points).toBe(100);
        });

        it('should handle large amounts with decimals correctly', () => {
            const amount = 250.99;
            const points = calculatePoints(amount);
            // For 250.99: (250.99 - 100) * 2 = 301.98 points
            expect(points).toBe(301.98);
        });
    });

    describe('Negative Test Cases', () => {
        it('should return 0 points for amount less than $50 (whole number)', () => {
            const amount = 30;
            const points = calculatePoints(amount);
            expect(points).toBe(0);
        });

        it('should return 0 points for amount less than $50 (fractional number)', () => {
            const amount = 45.99;
            const points = calculatePoints(amount);
            expect(points).toBe(0);
        });

        it('should return 0 points for zero amount', () => {
            const amount = 0;
            const points = calculatePoints(amount);
            expect(points).toBe(0);
        });

        it('should return 0 points for very small fractional amount', () => {
            const amount = 0.99;
            const points = calculatePoints(amount);
            expect(points).toBe(0);
        });

        it('should handle edge case at $50 threshold (whole number)', () => {
            const amount = 50;
            const points = calculatePoints(amount);
            // For 50: 50 * 1 = 50 points
            expect(points).toBe(50);
        });

        it('should return 0 points for negative amount', () => {
            const amount = -100;
            const points = calculatePoints(amount);
            expect(points).toBe(0);
        });
    });

    describe('Caching Behavior', () => {
        it('should return same result for repeated calls with same amount', () => {
            const amount = 120.50;
            const points1 = calculatePoints(amount);
            const points2 = calculatePoints(amount);
            expect(points1).toBe(points2);
            expect(points1).toBe(41);
        });
    });
});

describe('groupByCustomerAndMonth', () => {
    it('should group transactions by customer and month', () => {
        const transactions = [
            { id: 1, customerId: 'C001', customerName: 'John Doe', amount: 120, date: '2025-12-15' },
            { id: 2, customerId: 'C001', customerName: 'John Doe', amount: 75, date: '2025-12-20' },
            { id: 3, customerId: 'C002', customerName: 'Jane Smith', amount: 150.50, date: '2025-12-05' },
        ];

        const grouped = groupByCustomerAndMonth(transactions);

        expect(Object.keys(grouped).length).toBe(2);
        expect(grouped['C001'].customerId).toBe('C001');
        expect(grouped['C001'].customerName).toBe('John Doe');
        expect(grouped['C001'].total).toBeGreaterThan(0);
        expect(grouped['C002'].customerName).toBe('Jane Smith');
    });

    it('should calculate total points correctly for a customer', () => {
        const transactions = [
            { id: 1, customerId: 'C001', customerName: 'John Doe', amount: 120.75, date: '2025-12-15' },
            { id: 2, customerId: 'C001', customerName: 'John Doe', amount: 85.25, date: '2026-01-10' },
        ];

        const grouped = groupByCustomerAndMonth(transactions);
        const totalPoints = grouped['C001'].total;

        // 120.75: (120.75 - 100) * 2 = 41.5 points
        // 85.25: 85.25 * 1 = 85.25 points
        // Total: 126.75
        expect(totalPoints).toBe(126.75);
    });

    it('should organize transactions by month', () => {
        const transactions = [
            { id: 1, customerId: 'C001', customerName: 'John Doe', amount: 120, date: '2025-12-15' },
            { id: 2, customerId: 'C001', customerName: 'John Doe', amount: 85.50, date: '2026-01-10' },
        ];

        const grouped = groupByCustomerAndMonth(transactions);
        const months = Object.keys(grouped['C001'].months);

        expect(months.length).toBe(2);
        expect(months).toContain('2025-12');
        expect(months).toContain('2026-01');
    });
});
