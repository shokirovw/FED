"use client";

import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useState } from "react";


export default function Page () {
    let [back, setBack] = useState(false);

    useGSAP(() => {
        if (back) {
            console.log("aaa");

            gsap.set("#circleMask,#circleMaskTWO", { willChange: "transform" });

            gsap.to("#circleMask", {immediateRender: true, scale:0, transformOrigin:"center center", duration:2, ease:'power3.in'});

            gsap.to("#circleMaskTWO", {immediateRender: true, scale:0, transformOrigin:"40% 20%", duration:2, ease:'power3.in'});
        } else {
            gsap.set("#circleMask,#circleMaskTWO", {scale:0, transformOrigin:"center center"});

gsap.to("#circleMask", {scale:5, transformOrigin:"center center", duration:5, ease:'power3.in'});

gsap.to("#circleMaskTWO", {scale:5, transformOrigin:"40% 20%", duration:5, ease:'power3.in'});
        }   
    }, [back]);

    return (
        <>
        
        <svg className="demo" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
<defs>
<mask id="theMask">
<path id ="circleMask" fill="#fff" d="M 25 20 Q 45 0 70 10 Q 110 20 85 50 Q 80 75 50 60 C 50 90 15 115 10 45 Z" />
</mask>
</defs> 
 
<g id="toBeRevealed" mask="url(#theMask)"> 
<rect id="theSquare" x="0" y="0" width="100" height="100" fill="black" />
<foreignObject x="10" y="10" width="80" height="80">
  <div xmlns="http://www.w3.org/1999/xhtml" style={{ color: 'white', fontSize: '14px' }}>
    <p>HTML Text Inside SVG</p>
    <button className="bg-white text-black" onClick={() => { setBack(true) }}>Go back</button>
  </div>
</foreignObject>
</g>
</svg>


<svg className="demo" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
  <defs>
    <mask id="theMask02">
      <path id ="circleMaskTWO" fill="#fff" d="M23,.06c13-1.08,26,12,27,19s0,15-11,21-39,4-39-5S11,1.06,23,.06Z" />
    </mask>
  </defs> 

  <g id="toBeRevealed" mask="url(#theMask02)"> 
    <rect id="theSquare" x="0" y="0" width="100" height="100" fill="black" />
    <text textAnchor="middle" x="50" y="50" fill="#4e9815" fontSize="24" >TEXT</text>
    <text textAnchor="middle" x="50" y="64" fill="white" fontSize="14" >REVEAL</text>
  </g>
</svg>
        
        </>
    )
}