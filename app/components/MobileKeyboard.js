import React from "react";
import { useEffect, useState } from "react";

const MobileKeyboard = ({ theme, backlit }) => {
    const [loading, setLoading] = useState(true);

    const sendEvent = (e, type = 'touchstart') => {
        const element = e.target;
        const event = new TouchEvent(type, { key: e.target.innerText });
        element.dispatchEvent(event);
    }

    useEffect(() => {
        addEventListener('rendered', (e) => { setLoading(false) });

        return () => {
            removeEventListener('rendered', (e) => { setLoading(true) });
        }
    }, [])

    const isBackLit = backlit === true;

    return !loading ? (
        <div className="keyboard" pointerEvents='none'>

            <div className={`keyboard-row first ${theme} ${isBackLit ? 'backlit' : ''}`}>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>f</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>u</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>c</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>k</button>
            </div>
            <div className={`keyboard-row second ${theme} ${isBackLit ? 'backlit' : ''}`}>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>o</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>y</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>m</button>
                <button onTouchStart={(e) => sendEvent(e, 'touchstart')} onTouchEnd={(e) => sendEvent(e, 'touchend')}>t</button>
            </div>

            <div className={`keyboard-row third ${theme} ${isBackLit ? 'backlit' : ''}`}>
                <button className="space" onTouchStart={sendEvent} onTouchEnd={sendEvent}>space</button>
            </div>
        </div>
    ) : null;
}

export default MobileKeyboard;
