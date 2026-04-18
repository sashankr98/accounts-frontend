import type { ParentComponent } from 'solid-js';
import { Navbar } from '@/components/Navbar';

export const App: ParentComponent = (props) => {
    return (
        <div class="p-8 flex flex-col">
            <Navbar />
            {props.children}
        </div>
    );
};
