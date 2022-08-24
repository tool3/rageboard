import React, { forwardRef } from 'react';
import Link from 'next/link';
import HomeButton from './HomeButton';

function Button({ setStarted, started }) {
  return (
    <div className="welcome">
      {/* <div className="welcome_text--fill">START</div> */}
      <button className="welcome_text" onClick={setStarted} disabled={started}>
        START
      </button>
    </div>
  );
}

const Overlay = forwardRef(({ caption, scroll, started, setStarted }, ref) => {
  return (
    <>
      <Button setStarted={setStarted} started={started} />
      <div
        ref={ref}
        onScroll={(e) => {
          scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
          caption.current.innerText = (scroll.current * 100).toFixed(2) + '%';
          if (scroll.current > 0) {
            document.querySelector('.floating_home').style.display = 'inline-block';
          } else {
            document.querySelector('.floating_home').style.display = 'none';
          }
        }}
        className="scroll">
        <HomeButton scroll={scroll} />
        <div className="menu">
          <Link href={'/#motto'}>
            <a className="glitch" data-before="Motto" role="link">
              Motto
            </a>
          </Link>
          <Link href={'/#music'}>
            <a className="glitch" data-before="Music">
              Music
            </a>
          </Link>
          <Link href={'/#vr'}>
            <a className="glitch" data-before="VR">
              VR
            </a>
          </Link>
          <Link href={'/#3d'}>
            <a className="glitch" data-before="3D">
              3D
            </a>
          </Link>
          <Link href={'/#code'}>
            <a className="glitch" data-before="Code">
              Code
            </a>
          </Link>
          <Link href={'/#links'}>
            <a className="glitch" data-before="Links">
              Links
            </a>
          </Link>
        </div>
        <div style={{ height: '400vh' }} className="section">
          <div className="dot">
            <h1>Welcome</h1>
            I'm Tal Hayut. A software engineer.
            <br />
            Welcome to this short web experience.
            <br />
            scroll on laptop.
            <br />
            swipe on mobile.
            {/* <a href="https://google.com">goog</a> */}
          </div>
        </div>
        <div style={{ height: '200vh' }} className="section rock">
          <div className="dot rock">
            <h1>Rock 'N Roll</h1>
            My Motto for life. Work harder. Play harder.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="section music">
          <div className="dot">
            <h1>Music</h1>
            I play drums since I was in 7th grade. <br />
            An unfortunate accident prevented me from playing further, so I picked up a guitar, and haven't laid it down
            since. <br />
            (I still play the drums too).
          </div>
        </div>
        <div style={{ height: '200vh' }} className="section vr">
          <div className="dot">
            <h1>VR</h1>My latest interest, VR is where I can immerse myself in other worlds completely. <br />
            It's an incredible tool for creating as well, you are right there with your sketch/model/work.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="section ddd">
          <div className="dot">
            <h1>3D</h1>I fell in-love with VFX and 3D. <br />
            I like modeling in Blender and texturing in Blender/Substance Painter. <br />
            I love seeing it come together with THREE.JS, like this experience <br />
            <br />
          </div>
        </div>

        <div style={{ height: '200vh' }} className="section code">
          <div className="dot">
            <h1>Code</h1>I am a self-taught passionate fullstack developer that loves great web experiences.
            <br />
            I code mainly in Node.JS/TypeScript/Javascript/React.
            <br />
            But I am not limited to any stack.
            <br />
            One of my greatest qualities is being able to learn anything.
          </div>
        </div>
        <div style={{ height: '200vh' }} className="section links">
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
        <a className="glitch link" data-before="GITHUB" href="https://github.com/tool3">
          GITHUB
        </a>
        <a className="glitch link" data-before="LINKEDIN" href="https://linkedin.com/in/talhayut">
          LINKEDIN
        </a>
      </div>
    </>
  );
});

export default Overlay;
