import React, { useEffect } from "react";

const Debug = (props) => {
    const hash = '#debug';

    const toggle = (e) => {
        if ((e.key === 'D' && e.shiftKey) || (e.touches && e.touches.length >= 3)) {
            const isDebug = window.location.hash === hash;
            if (isDebug) {
                window.location.hash = '';
                dispatchEvent(new Event('debugClose'));
            } else {
                dispatchEvent(new Event('debug'));
                window.location.hash = hash;
                
            }
        }
    }

    useEffect(() => {
        addEventListener('keydown', toggle);
        addEventListener('touchstart', toggle);

        return () => {
            removeEventListener('keydown', toggle);
            removeEventListener('touchstart', toggle);
        }
    }, [])

    return null;
}

export default Debug;