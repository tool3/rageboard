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
        <h1>Tal Hayut</h1>
        Hi i'm Tal
        <br />
        Welcome to this web experience
        <br />
        scroll on laptop
        <br />
        swipe on mobile
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>focus</h1>
        focus on what matters.
        <br />
        focus on shit, shit grows
        <br />
        read that again.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>speed</h1>
        move fast, fail a lot.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>escape</h1>see things from different angles. detach and realign.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>play</h1>play often, laugh often.
      </div>
    </div>

    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>work</h1>devote yourself, work on something for a long time. reap results. repeat.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>ship</h1>create things frequently, faster than you consume.
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00 %
    </span>
  </div>
));

export default Overlay;
