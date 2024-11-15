export default function Tile() {
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
            </div>
        </div>
    )
}