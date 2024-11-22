import { forwardRef, useEffect, useState } from "react";
import { motion } from "motion/react"

const Slider = ({ isOn, toggleSwitch }) => {

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };


    return (
        <div className="switcher" data-isOn={isOn} onClick={() => toggleSwitch(!isOn)}>
            <motion.div className="handle" layout transition={spring} />
        </div>
    );

}

const Tile = forwardRef(({ sound, setSound, backlit, setBacklit }, ref) => {
    const [collapsed, setCollapsed] = useState(false);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        addEventListener('easterEgg', (e) => setChallenges([...challenges, e.detail.name]));

        return () => {
            removeEventListener('easterEgg', (e) => setChallenges([]));
        }
    }, [challenges])

    const contentClassName = collapsed ? 'tile-content' : 'tile-content';
    const headerClassName = collapsed ? 'tile-header' : 'tile-header';
    const tileClassName = collapsed ? 'tile transparent' : 'tile';

    const chals = challenges?.map(name => {
        const className = `challenge ${name}`;
        return <motion.img initial={{ scale: 0 }} whileTap={{ scale: 2 }} whileHover={{ scale: 2 }} animate={{ scale: 1 }} src={`/images/challenges/${name}.png`} className={className} key={name} />
    });

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    return (
        <div className="tile-wrapper">
            <motion.div initial={{ height: '100px' }} animate={{ height: "0px" }} transition={spring} className={tileClassName}>
                <div className={headerClassName} onClick={() => setCollapsed(!collapsed)}>
                    <div>RAGE BOARD</div>
                </div>
                <motion.div layout style={{ overflow: collapsed ? 'hidden' : 'visible' }}>
                    <motion.div layout initial={{ opacity: 0 }} transition={spring} animate={{ opacity: 1 }} style={{ padding: '1rem', pointerEvents: 'all' }} className={contentClassName} >
                        <motion.div transition={{ delay: .25, damping: 200 }} animate={{ opacity: collapsed ? 0 : 1 }} initial={{ opacity: 0 }}  >
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
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
});

export default Tile;