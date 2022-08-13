import React from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

const HomeButton = () => {
  return (
    <div className="floating_home">
      <div onClick={() => document.querySelector('.scroll').scrollTo(0, 0)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          viewBox="0 0 16 16"
          transform="rotate(180)">
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            strokeWidth="2"
            stroke="#ffffff"
            fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
};

export default HomeButton;
