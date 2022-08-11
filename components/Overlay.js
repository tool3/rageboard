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
      <div className="dot rock">
        <h1>Rock 'N Roll</h1>
        My Motto for life. Work harder. Play harder.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Music</h1>
        I play drums since I was in 7th grade. An unfortunate event prevented me from playing, so I picked up a guitar,
        and have been playing it ever since. <br />
        (I still play the drums too).
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>VR</h1>My latest love, VR is where I can immerse myself in other worlds completely. <br />
        It's an incredible tool for creation as well, you are right there with your sketch/model/work.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>3D</h1>I love VFX and 3D. <br />
        I like modeling in Blender and texturing in Blender/Substance Painter. <br />
        I love seeing it come together with THREE.JS, like this experience <br />
        <br />
      </div>
    </div>

    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Code</h1>I am a self-taught passionate fullstack developer that loves great web experiences. <br />
        I code mainly in Node.JS/TypeScript/Javascript/React. <br />
        But I am not limited to any stack. <br />
        One of my greatest qualities is being able to learn anything.
      </div>
    </div>
    <div style={{ height: '200vh' }}>
      <div className="dot">
        <h1>Thanks</h1>You made it to the end. <br />
        If you didn't, that's okay. <br />
        Checkout my github <button href="https://github.com/tool3" target={"_blank"}>here</button>
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00 %
    </span>
  </div>
));

export default Overlay;
