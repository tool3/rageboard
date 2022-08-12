import React, { forwardRef } from 'react';
import Link from 'next/link';

const Overlay = forwardRef(({ caption, scroll, started, setStarted }, ref) => {
  // const [route, setRoute] = useState('/');

  return (
    <>
      {started ? (
        setTimeout(() => null, 220)
      ) : (
        <div className="welcome">
          <div className="welcome_text" onClick={setStarted}>
            START
          </div>
        </div>
      )}

      <div
        ref={ref}
        onScroll={(e) => {
          scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
          caption.current.innerText = (scroll.current * 100).toFixed(2) + '%';
        }}
        className="scroll">
        <div className="menu">
          <Link href={'/#motto'}>Motto</Link>
          <Link href={'/#music'}>Music</Link>
          <Link href={'/#vr'}>VR</Link>
          <Link href={'/#3d'}>3D</Link>
          <Link href={'/#code'}>Code</Link>
          <Link href={'/#links'}>LNKS</Link>
        </div>
        <div style={{ height: '400vh' }}>
          <div className="dot">
            <h1>Welcome</h1>
            I'm Tal Hayut. A software engineer.
            <br />
            Welcome to this short web experience.
            <br />
            scroll on laptop.
            <br />
            swipe on mobile.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="rock">
          <div className="dot rock">
            <h1>Rock 'N Roll</h1>
            My Motto for life. Work harder. Play harder.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="music">
          <div className="dot">
            <h1>Music</h1>
            I play drums since I was in 7th grade. <br />
            An unfortunate accident prevented me from playing further, so I picked up a guitar, and haven't laid it down
            since. <br />
            (I still play the drums too).
          </div>
        </div>
        <div style={{ height: '200vh' }} className="vr">
          <div className="dot">
            <h1>VR</h1>My latest interest, VR is where I can immerse myself in other worlds completely. <br />
            It's an incredible tool for creating as well, you are right there with your sketch/model/work.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="ddd">
          <div className="dot">
            <h1>3D</h1>I fell in-love with VFX and 3D. <br />
            I like modeling in Blender and texturing in Blender/Substance Painter. <br />
            I love seeing it come together with THREE.JS, like this experience <br />
            <br />
          </div>
        </div>

        <div style={{ height: '200vh' }} className="code">
          <div className="dot">
            <h1>Code</h1>I am a self-taught passionate fullstack developer that loves great web experiences. <br />
            I code mainly in Node.JS/TypeScript/Javascript/React. <br />
            But I am not limited to any stack. <br />
            One of my greatest qualities is being able to learn anything.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="links">
          <div className="dot">
            <h1>Thank You</h1>You made it to the end. Thanks!
            <br />
            If you didn't, that's okay. <br />
            You won't see this anyway. <br />
            Check out my links at the bottom.
          </div>
        </div>
        <span className="caption" ref={caption}>
          0.00 %
        </span>
        <a className="link" href="https://github.com/tool3">
          GITHUB
        </a>
        <a className="link" href="https://linkedin.com/in/talhayut">
          LINKEDIN
        </a>
      </div>
    </>
  );
});

export default Overlay;
