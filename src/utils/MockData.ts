import type { Account, Transaction } from '@/utils/Types';

export const mockTransactionData: Transaction[] = [
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 1, date: Date.now(), description: 'My paycheck', category: 'Paycheck', incomeAccount: 'CO Checking', incomeAmount: 3921.74 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
    { id: 2, date: Date.now(), description: 'Moto Ramen', category: 'Restaurants', expenseAccount: 'Quicksilver', expenseAmount: 64.58 },
    { id: 3, date: Date.now(), description: 'Quicksilver bill', category: 'Transfer', expenseAccount: 'CO Checking', expenseAmount: 1309.32, incomeAccount: 'Quicksilver', incomeAmount: 1309.32 },
];

export const mockAccountData: Account[] = [
    { id: 1, name: 'My Splitwise', initialAmount: 0, currentAmount: 2147.32 },
    { id: 2, name: 'Credit Card 1', initialAmount: 0, currentAmount: -232.21 },
];
