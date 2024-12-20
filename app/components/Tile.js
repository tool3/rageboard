import React from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Slider = ({ isOn, toggleSwitch }) => {
    const spring = {
        type: "spring",
        stiffness: 1000,
        damping: 40,
    };

    return (
        <div className="switcher" data-ison={isOn} onClick={() => toggleSwitch(!isOn)}>
            <motion.div className="handle" layout transition={spring} />
        </div>
    );
}

const Tile = ({ sound, setSound, backlit, setBacklit }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [clickedOnce, setClickedOnce] = useState(false);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        addEventListener('easterEgg', (e) => setChallenges([...challenges, e.detail.name]));

        return () => {
            removeEventListener('easterEgg', (e) => setChallenges([]));
        }
    }, [challenges])

    const contentClassName = collapsed ? 'tile-content' : 'tile-content';
    const headerClassName = collapsed ? 'tile-header' : 'tile-header'
    const tileClassName = collapsed ? 'tile transparent' : 'tile';

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    const onClick = () => {
        setCollapsed(!collapsed);
        setClickedOnce(true);
    }

    const chals = challenges?.map(name => {
        const className = `challenge ${name}`;
        return <motion.img initial={{ scale: 0 }} whileTap={{ scale: 2 }} whileHover={{ scale: 2 }} animate={{ scale: 1 }} src={`/images/challenges/${name}.png`} className={className} key={name} />
    });

    useEffect(() => {
        addEventListener('challengesCompleted', () => { setCollapsed(true) });

        return () => {
            removeEventListener('challengesCompleted', () => { setCollapsed(true) });
        }
    }, [])

    return (
        <div className="tile-wrapper">
            <motion.div initial={{ height: '0px' }} animate={{ height: collapsed ? "0px" : "250px" }} transition={spring} className={tileClassName}>
                <div className={headerClassName + (clickedOnce ? '' : ' pulse')} onClick={onClick}>
                    <div>RAGEBOARD</div>
                    {/* <div>レイジボード</div> */}
                </div>
                <motion.div style={{ overflow: collapsed ? 'hidden' : 'visible' }}>
                    <motion.div style={{ padding: '1.5rem', pointerEvents: 'all' }} className={contentClassName} >
                        <motion.div className={'tile-content-inner'} animate={{ opacity: collapsed ? 0 : 1 }} initial={{ opacity: 0 }}>
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
                                    <Slider collapsed={collapsed} toggleSwitch={setSound} isOn={sound} />
                                </div>
                                <div className="control">
                                    backlit
                                    <label className="switch">
                                        <Slider collapsed={collapsed} toggleSwitch={setBacklit} isOn={backlit} />
                                    </label>
                                </div>
                                {/* <div className="control">
                                    theme
                                    <label className="switch select">
                                        {themeOptions}
                                    </label>
                                </div> */}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Tile;