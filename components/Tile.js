export default function Tile({ setSoundOn, sound }) {
    const changed = (e) => {
        setSoundOn(e.target.checked);
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
                    <label class="switch">
                        <input type="checkbox" checked={sound} onChange={changed} />
                        <span class="slider" />
                    </label>
                </div>
            </div>
        </div>
    )
}