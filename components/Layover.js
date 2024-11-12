import { Html, useGLTF } from "@react-three/drei";

const Layover = (props) => {
    const { keyboard } = props;

    const sendEvent = (e, type) => {
        const element = e.target;

        // const event = new CustomEvent("mobile-key-press", { bubbles: false, detail: { key, code: `Key_${key}` } });
        // setTimeout(() => {
            const event = new TouchEvent(type, { key: e.target.innerText });
            element.dispatchEvent(event);
        
    }

    return keyboard ? (
        <Html className="keyboard" pointerEvents='none'>
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
        </Html>
    ) : null;
}

export default Layover;
