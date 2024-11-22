import { forwardRef, useEffect, useState } from "react";

const Tile = forwardRef(({ sound, backlit, setBacklit }, ref) => {
    const [collapsed, setCollapsed] = useState(false);
    const [challenges, setChallenges] = useState([]);

    const changed = (e) => {
        sound.current = e.target.checked;
    }

    const backlitChanged = (e) => {
        setBacklit(e.target.checked)
    }

    useEffect(() => {
        addEventListener('easterEgg', (e) => setChallenges([...challenges, e.detail.name]));

        return () => {
            removeEventListener('easterEgg', (e) => setChallenges([]));
        }
    }, [challenges])


    const contentClassName = collapsed ? 'tile-content' : 'tile-content expanded opac';
    const headerClassName = collapsed ? 'tile-header' : 'tile-header rounded';
    const tileClassName = collapsed ? 'tile transparent' : 'tile';

    const chals = challenges?.map(name => {
        const className = `challenge ${name}` ;
        return <img src={`/images/challenges/${name}.png`}  className={className} key={name} />
    });

    return (
        <div className="tile-wrapper">
            <div className={tileClassName}>
                <div className={headerClassName} onClick={() => setCollapsed(!collapsed)}>
                    <div>RAGE BOARD</div>
                </div>

                <div className={contentClassName} >
                    <div className="instructions">
                        <div><kbd>shift</kbd> <kbd>d</kbd> for debugger</div>
                        <div>click & drag to view model</div>
                        <div>scroll to zoom</div>
                    </div>
                    <div className="instructions-mobile">
                        <div>3 finger tap for debugger</div>
                        <div>tap and drag to view model</div>
                        <div>pinch to zoom </div>
                    </div>

                    <div className="challenges">
                        {chals}
                    </div>

                    <div className="control-set">
                        <div className="control">
                            sounds
                            <label className="switch">
                                <input type="checkbox" defaultChecked={sound.current} ref={ref} onChange={changed} />
                                <span className="slider" />
                            </label>
                        </div>
                        <div className="control">
                            backlit
                            <label className="switch">
                                <input type="checkbox" defaultChecked={backlit} onChange={backlitChanged} />
                                <span className="slider" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Tile;