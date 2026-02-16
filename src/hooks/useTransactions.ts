import { useEffect, useState } from "react"
import type { InputType, Transaction } from "../utils/Types"
import { Api } from "../utils/Api";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = async (transaction: InputType<Transaction>): Promise<void> => {
        const addedTransaction = await Api.addTransaction(transaction);
        setTransactions(oldTransactions => [...oldTransactions, addedTransaction]);
    }

    useEffect(() => {
        let cancelled: boolean = false;

        Api.getTransactions().then(transactions => {
            if (!cancelled) {
                setTransactions(transactions);
            }
        }).catch((e) => {
            console.error("Error fetching transactions", e);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        transactions,
        addTransaction,
    };
}
