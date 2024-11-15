import { forwardRef } from "react";

const Tile = forwardRef(({ sound }) => {
    
    const changed = (e) => {
        sound.current = e.target.checked;
    }

    return (
        <div className="tile">
            <div className="tile-header">
                <div>RAGE BOARD</div>
            </div>

            <div className="tile-content">
                <div className="instructions">
                    <div><kbd>shift</kbd> <kbd>d</kbd> for debugger</div>
                    <div>click & drag to view model</div>
                </div>
                <div className="instructions-mobile">
                    <div>3 finger tap for debugger</div>
                    <div>tap and drag to view model</div>
                </div>

                <div className="sound-control">
                    sounds
                    <label className="switch">
                        <input type="checkbox" defaultChecked={sound.current} ref={sound} onChange={changed} />
                        <span className="slider" />
                    </label>
                </div>
            </div>
        </div>
    )
});

export default Tile;