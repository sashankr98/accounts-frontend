import { useEffect, useState } from "react"
import type { Account } from "../utils/Types"
import { Api } from "../utils/Api";

export const useAccounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    const addAccount = async (account: Omit<Account, "currentAmount">) => {
        const addedAccount = await Api.addAccount(account);
        setAccounts((oldAccounts) => [...oldAccounts, addedAccount]);
    }

    useEffect(() => {
        let cancelled: boolean = false;

        Api.getAccounts().then(accounts => {
            if (!cancelled) {
                setAccounts(accounts);
            }
        }).catch((e) => {
            console.error("Error fetching accounts", e);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        accounts,
        addAccount,
    };
}
