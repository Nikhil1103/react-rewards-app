import { transactions } from "../Data/transaction";

export const fetchTransactions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(transactions);
        }, 1000); // Simulate a delay of 1 second
    });
}       