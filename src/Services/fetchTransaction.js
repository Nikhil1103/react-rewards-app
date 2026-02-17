import { transactions } from "../Data/transaction";
import { MESSAGES } from "../constants";

export const fetchTransactions = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate API call with error handling capability
            try {
                if (!transactions || !Array.isArray(transactions)) {
                    throw new Error('Invalid transaction data received');
                }
                resolve(transactions);
            } catch (error) {
                reject(new Error(MESSAGES.API_ERROR));
            }
        }, 1000);
    });
};       