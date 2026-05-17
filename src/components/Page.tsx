import type { ParentProps } from 'solid-js';

type PageProps = {
    title: string;
}

export default function Page(props: ParentProps<PageProps>) {
    return (
        <div class='p-8'>
            <h1>{props.title}</h1>
            <div class='
                mt-12
                md:justify-items-center
            '>
                {props.children}
            </div>
        </div>
    );
};
