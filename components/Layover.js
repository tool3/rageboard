import { useControls } from "leva";
import { useEffect, useState } from "react";

const Layover = () => {
    const [loading, setLoading] = useState(true);
    const sendEvent = (e, type) => {
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

    return !loading ? (
        <div className="keyboard" pointerEvents='none'>
            <div className="keyboard-row">
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>f</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>u</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>c</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>k</button>
            </div>
            <div className="keyboard-row">
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>o</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>y</button>
                <button onTouchStart={sendEvent} onTouchEnd={sendEvent}>m</button>
                <button onTouchStart={(e) => sendEvent(e, 'touchstart')} onTouchEnd={(e) => sendEvent(e, 'touchend')}>t</button>
            </div>

            <div className="keyboard-row">
                <button className="space" onTouchStart={sendEvent} onTouchEnd={sendEvent}>space</button>
            </div>
        </div>
    ) : null;
}

export default Layover;
