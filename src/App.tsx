import type { ParentComponent } from 'solid-js';
import { Navbar } from '@/components/Navbar';

export const App: ParentComponent = (props) => {
    return (
        <div class="flex flex-col max-w-full overflow-x-hidden">
            {props.children}
            <Navbar />
        </div>
    );
};
