"use client";

import Image from "next/image";
import button_img from '../../public/button.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function Page () {
  const [stageNumber, setStageNumber] = useState(0);
  

  const triggerNextStage = () => {
    setStageNumber(stageNumber + 1);
  }

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-hidden bg-[#f6f6f6]">
      {stageNumber == 0 && (<Opening nextStageTrigger={triggerNextStage} />)}
      {stageNumber == 1 && (<Scene1 />)}
    </div>
  )
}

function Scene1 () {
  return (
    <p>Hello</p>
  )
}

function Opening ({ nextStageTrigger }) {
  const object = useRef();
  let obj2 = useRef();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  let [goAway, setGoAway] = useState(false);

  useGSAP(() => {
    gsap.to(object.current, {
      translateY: "-300px",
      ease: "back.inOut",
      duration: 3
    });
  });

  useGSAP(() => {
    if (goAway == true) {
      gsap.to(obj2.current, {scale:5, transformOrigin:"40% 20%", duration:5, ease:'power3.in'});
    }
  }, [goAway]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      
      <svg className="demo absolute" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100">
        <defs>
          <mask id="theMask02">
            <path id ="circleMaskTWO" ref={obj2} fill="#fff" d="M23,.06c13-1.08,26,12,27,19s0,15-11,21-39,4-39-5S11,1.06,23,.06Z" />
          </mask>
        </defs> 
        <g id="toBeRevealed" mask="url(#theMask02)"> 

        
        </g>
      </svg>

      <div className="text-center">
          <h1 className="text-6xl mt-8">Illusions of Prosperity</h1>
          <h2 className="text-4xl mt-7">Farovonlik illuziyasi</h2>
          <div  className="mt-2 group cursor-pointer z-20 relative h-[140px] w-fit mx-auto flex items-center justify-center">
            <div className="absolute z-10 flex flex-row items-center gap-x-4 text-2xl">
              {isLoading ? (
                <div className="flex flex-row gap-x-0">
                <p>Loading</p>
                <TypeAnimation
                    sequence={[
                      '',
                      200,
                      '.',
                      200,
                      '..',
                      200,
                      '...',
                      200,
                      '....',
                      200
                    ]}
                    wrapper="p"
                    speed={400}
                    repeat={Infinity}
                  />
                </div>
                
              ) : (
                <div onClick={() => { setGoAway(true); }} className="flex flex-row items-center gap-x-2">
                  <p>Boshlash</p>
                  <FaArrowRightLong />
                </div>
              )}
            </div>
            <img src="/button.png" alt=""  className="group-hover:hidden block h-[70px] w-auto" />
            <img src="/button_hover.png" alt="" className="group-hover:block hidden -mt-2 h-[140px] w-auto" />
          </div>
      </div>
      <div ref={object} className="absolute -bottom-[1070px]">
        <DotLottieReact
          src="/earth4.lottie"
          loop
          autoplay
          height={1000}
          width={1000}
        />
      </div>
    </div>
  )
}