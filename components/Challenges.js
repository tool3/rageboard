import { useEffect, useState } from "react";

export default function Challenges() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        addEventListener('easterEgg', (e) => setChallenges([...challenges, e.detail.name]));

        return () => {
            removeEventListener('easterEgg', (e) => setChallenges([]));
        }
    }, [challenges])


    const chals = challenges?.map(name => {
        const className = `challenge ${name}`;
        return <img src={`/images/challenges/${name}.png`} className={className} key={name} />
    });

    return (
        <div className="challenges">
            {chals}
        </div>
    )
}