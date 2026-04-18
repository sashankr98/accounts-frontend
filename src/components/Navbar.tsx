import { A, useLocation, useNavigate } from '@solidjs/router';
import { createSignal, For } from 'solid-js';
import { DEFAULT_PAGE, pages, type PageDefinition } from '@/index';

export function Navbar() {
    const [isOpen, setIsOpen] = createSignal(false);

    const location = useLocation();
    const navigate = useNavigate();
    const activePage = (): PageDefinition => {
        let activePage = pages.find(p => p.path === location.pathname);
        if (!activePage) {
            navigate(DEFAULT_PAGE.path, { replace: true });
            activePage = DEFAULT_PAGE;
        }
        return activePage;
    };
    const inactivePages = (): PageDefinition[] => pages.filter(p => p.path !== location.pathname);

    return (
        <div class="
            absolute inset-x-0 bottom-0
            m-8 flex gap-4
            justify-center items-baseline-last
        ">
            <nav class="rounded-2xl bg-zinc-600 px-8 py-4"
            >
                {/* Desktop view*/}
                <div class="
                    hidden md:flex flex-row gap-8
                ">
                    <For each={pages}>
                        {
                            page => {
                                return (
                                    <A
                                        href={page.path}
                                        activeClass='text-pink-500'
                                        class='md:block transition-colors duration-150 ease-in-out'
                                    >
                                        {page.label}
                                    </A>
                                );
                            }
                        }
                    </For>
                </div>
                {/* Mobile view*/}
                <div class="w-full md:hidden text-center"
                    onClick={() => setIsOpen(false)}
                >
                    <div class={`
                        grid w-full transition-all duration-300 ease-in-out overflow-hidden
                        ${isOpen() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                    `}>
                        <div class='min-h-0 flex flex-col'>
                            <For each={inactivePages()}>
                                {
                                    inactivePage => {
                                        return (
                                            <A
                                                href={inactivePage.path}
                                                class='transition-colors duration-150 ease-in-out mb-2'
                                            >
                                                {inactivePage.label}
                                            </A>

                                        );
                                    }
                                }
                            </For>
                        </div>
                    </div>
                    <A
                        href={activePage().path}
                        class='text-pink-500 order-2'
                    >
                        {activePage().label}
                    </A>
                </div>
            </nav>
            {/* show only on mobile */}
            <button
                class={`
                    md:hidden bg-zinc-600/50 h-12 w-12 text-center rounded-full flex-none
                    transition ease-in-out duration-300 ${isOpen() ? 'rotate-180' : 'rotate-0'}
                `}
                onClick={() => {
                    setIsOpen(!isOpen());
                }}
            >
                ▲
            </button>
        </div>
    );
}
