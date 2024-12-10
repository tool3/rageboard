import React, { useEffect } from "react";

export default function Debug(props) {
    const { setActive } = props;
    const hash = '#debug';

    const toggle = (e) => {
        if ((e.key === 'D' && e.shiftKey) || (e.touches && e.touches.length >= 3)) {
            const isDebug = window.location.hash === hash;
            if (isDebug) {
                window.location.hash = '';
                setActive(false)
            } else {
                window.location.hash = hash;
                setActive(true);
            }
        }
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        window.addEventListener('keydown', toggle);
        window.addEventListener('touchstart', toggle);

        return () => {
            window.removeEventListener('keydown', toggle);
            window.removeEventListener('touchstart', toggle);
        }
    }, [])

    return null;
}
