import type { Account } from "./Types";

// TODO: Invoke API when backend service is ready
export class Api {
    static async getAccounts(): Promise<Account[]> {
        return [
            { name: "My Splitwise", initialAmount: 0, currentAmount: 2147.32 },
            { name: "Credit Card 1", initialAmount: 0, currentAmount: -232.21 },
        ];
    }

    static async addAccount(account: Omit<Account, "currentAmount">): Promise<Account> {
        throw new Error(`Cannot add ${account.name}. Not implemented API call`);
    }
}
