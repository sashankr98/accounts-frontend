import { useEffect, useState } from "react";

const WINDOW_SIZE_BREAK_POINT = "500px";

export const WindowSize = {
    MOBILE: "Mobile",
    DESKTOP: "Desktop",
};

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(WindowSize.DESKTOP);

    useEffect(() => {
        const mediaChangeListener = (event: MediaQueryListEvent) =>
            setWindowSize(event.matches ? WindowSize.MOBILE : WindowSize.DESKTOP);

        const media = window.matchMedia(`(max-width: ${WINDOW_SIZE_BREAK_POINT})`);
        mediaChangeListener(media as unknown as MediaQueryListEvent);

        media.addEventListener("change", mediaChangeListener);

        return () => media.removeEventListener("change", mediaChangeListener);
    }, []);

    return windowSize;
}
