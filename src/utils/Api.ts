import type { Account } from "./Types";

export class Api {
    static async getAccounts(): Promise<Account[]> {
        throw new Error("Not implemented");
    }
}
