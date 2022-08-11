import React, { forwardRef } from 'react';

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      caption.current.innerText = (scroll.current * 100).toFixed(2) + '%';
    }}
    className="scroll">
    <div style={{ height: '400vh' }}>
      <div className="dot">
        <h1>Welcome</h1>
        I'm Tal Hayut. A software engineer.
        <br />
        Welcome to this web experience
        <br />
        scroll on laptop
        <br />
        swipe up on mobile
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Rock 'N Roll</h1>
        focus on what matters.
        <br />
        focus on shit, shit grows
        <br />
        read that again.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Music</h1>
        move fast, fail a lot.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>VR</h1>see things from different angles. detach and realign.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>3D</h1>play often, laugh often.
      </div>
    </div>

    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Code</h1>devote yourself, work on something for a long time. reap results. repeat.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>End</h1>Hope you enjoyed this short experience. <br />
        If you didn't, please make sure to leave a complaint <br />
        at i.dont.care@blackhole.com
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00 %
    </span>
  </div>
));

export default Overlay;
