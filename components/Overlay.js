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
        <h1>headphone</h1>
        Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>rocket</h1>A rocket (from Italian: rocchetto, lit. 'bobbin/spool')[nb 1][1] is a projectile that spacecraft,
        aircraft or other vehicle use to obtain thrust from a rocket engine.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>metaverse</h1>live in VR and experience the amazing metaverse where people connect, play, and do business.
        <br />
        but mostly play.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>suzanne</h1>suzanne represents usage and love of blender, where suzanne is one of the primitive mesh types
        you can add to any scene.
        <br />i love suzanne.
      </div>
    </div>

    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>laptop</h1>A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with
        a screen and alphanumeric keyboard.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>zeppelin</h1>A Zeppelin is a type of rigid airship named after the German inventor Count Ferdinand von
        Zeppelin (German pronunciation: [ˈt͡sɛpəliːn]) who pioneered rigid airship development at the beginning of the
        20th century.
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00 %
    </span>
  </div>
));

export default Overlay;
