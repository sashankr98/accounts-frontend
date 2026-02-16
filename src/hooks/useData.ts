import { useEffect, useState } from "react"
import { type Account, Endpoint, type InputType, type Transaction, type Category } from "../utils/Types";

export const useData = <T>(apiEndpoint: string): [
    T[],
    (entry: InputType<T>) => Promise<T>,
    () => Promise<void>,
    boolean,
    string | null,
] => {

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (params?: Record<string, string>) => {
        setLoading(true);
        setError(null);
        try {
            const url = new URL(apiEndpoint);
            if (params) {
                Object.entries(params)
                    .forEach(([key, value]) => url.searchParams.append(key, value));
            }

            const response = await fetch(apiEndpoint);
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const addEntry = async (newEntry: InputType<T>) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEntry)
            });
            const savedEntry = await response.json();
            setData(prev => [...prev, savedEntry]);
            return savedEntry;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiEndpoint]);

    return [
        data,
        addEntry,
        fetchData,
        loading,
        error,
    ];
};

export const useAccounts = () => useData<Account>(Endpoint.ACCOUNTS);
export const useTransactions = () => useData<Transaction>(Endpoint.TRANSACTIONS);
export const useCategories = () => useData<Category>(Endpoint.CATEGORIES);
