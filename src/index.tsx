import { render } from 'solid-js/web';
import { App } from '@/App';
import { Router, type RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import '@/index.css';

export type PageDefinition = RouteDefinition & {
    label: string;
}

export const pages: PageDefinition[] = [
    {
        path: '/transactions',
        component: lazy(() => import('./components/Transactions')),
        label: 'Transactions',
    },
    {
        path: '/accounts',
        component: () => <h1>Accounts</h1>,
        label: 'Accounts',
    },
    {
        path: '/categories',
        component: () => <h1>Categories</h1>,
        label: 'Categories',
    },
];

export const DEFAULT_PAGE: PageDefinition = pages[0];

render(
    () => (
        <Router root={App}>{pages}</Router>
    ),
    document.getElementById('root')!,
);
