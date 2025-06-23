import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ locomotiveScrollRef }) => {
    const location = useLocation();

    useEffect(() => {
        const scrollInstance = locomotiveScrollRef?.current;

        if (scrollInstance?.scrollTo) {
            scrollInstance.scrollTo(0, {
                duration: 0,
                disableLerp: true,
            });
        } else {
            window.scrollTo(0, 0); // fallback
        }

        if (scrollInstance?.update) {
            scrollInstance.update();
        }
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;
