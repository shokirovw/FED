"use client";

import Image from "next/image";
import button_img from '../../public/button.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { HiLightningBolt } from "react-icons/hi";
import Scene1 from "./_scenes/scene1";
import Scene2 from "./_scenes/scene2";
import { Howl } from "howler";

export default function Page () {
  const [stageNumber, setStageNumber] = useState(2);

  let mainContainer = useRef();

  let [energyScore, setEnergyScore] = useState(0);
  let [barText, setBarText] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.key === "1") {
            setStageNumber(1);
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, []);

  const bg_sound = new Howl({
    src: ['/bg_music.mp3'], // Add the path to your sound file
    volume: 0.2, // Adjust the volume (0 to 1)
    loop: true, // Whether the sound should loop
    preload: true, // Preload the sound,
    html5: true
  });
  

  const triggerNextStage = () => {
    setStageNumber(stageNumber + 1);
  }

  const changeBarText = (text) => {
    setBarText(text);
  }

  const countRef = useRef(0);
  useEffect(() => {
    countRef.current = energyScore; 
  }, [energyScore]);

  const increase_sound_energy = new Howl({
    src: ['/correct.mp3'], // Add the path to your sound file
    volume: 0.8, // Adjust the volume (0 to 1)
    preload: true, // Preload the sound
    html5: true
  });

  const decrease_sound_energy = new Howl({
    src: ['/incorrect.mp3'], // Add the path to your sound file
    volume: 0.7, // Adjust the volume (0 to 1)
    preload: true, // Preload the sound
    html5: true
  });

  const changeEnergyScore = (change, delay = 0) => {
    // Start the GSAP animation
    let currentEnergyScore = Number(countRef.current);

    let energy = { number: currentEnergyScore };

    let tl = gsap.timeline();

    let color = "#22c55e";

    if (change < 0) {
      color = "#ef4444";
    }

    setTimeout(() => {
      if (change < 0) {
        decrease_sound_energy.play();
      } else {
        increase_sound_energy.play();
      }
      
    }, Math.max((delay * 1000)/2, 0));

    gsap.to(energy, {
      number: currentEnergyScore + change,
      duration: 2,
      delay: delay,
      onUpdate: function () {
          setEnergyScore([Math.round(energy.number)]);
      },
      ease: "power2.out",
    });

    

    tl.to(
        ".aaa",
        { 
            backgroundColor: color,
            color: "white",
            ease: "power2.out",
        },
        `+=${delay}`
    )
    .to(
        ".aaa", 
        { 
          backgroundColor: "white",
          color: color,
          ease: "power2.out" 
        },
        "+=2"
    );
  };

  return (
    <div ref={mainContainer} className="w-full h-screen overflow-x-hidden overflow-y-hidden bg-[#f6f6f6]">
      {stageNumber >= 1 && (
        <OpenSmoothly delay={1} className="bar shadow-xl absolute min-w-[350px] text-white flex items-center justify-between pl-4 pr-2 h-10 rounded-[70px] top-5 bg-zinc-900 left-1/2 -translate-x-1/2">
          <Delay delay={0}>
          <TypeAnimation
              key={barText}
              sequence={[
                "", // First clear the text
                500, // Wait for 500ms
                barText, // The current text from state
                1000, // Wait after typing
              ]}
              wrapper="p"
              className=""
              speed={10}
              cursor={false}
              deleteSpeed={30}
          />
          </Delay>
          <OpenSmoothly delay={6.6} fadeInType="inPlace">
          <div className=" aaa bg-white flex items-center text-green-500 gap-x-1 rounded-full h-[65%] px-2">
            <HiLightningBolt />
            <p className="text-normal font-medium">{energyScore}</p>
          </div>
          </OpenSmoothly>
        </OpenSmoothly>
        
      )}
      
      {stageNumber == 0 && (<Opening playBgSound={ () => { bg_sound.play() } } nextStageTrigger={triggerNextStage} />)}
      {stageNumber == 1 && (<Scene1 nextStageTrigger={triggerNextStage} changeBarText={changeBarText} changeEnergyScore={changeEnergyScore} />)}
      {stageNumber == 2 && (<Scene2 nextStageTrigger={triggerNextStage} changeBarText={changeBarText} changeEnergyScore={changeEnergyScore} />)}
    </div>
  )
}

function Delay ({ children, delay = 1 }) {
  let [isTime, setIsTime] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, delay * 1000);
  }, []);

  return (
    <>
      {isTime ? (children) : <></>}
    </>
  )
}

function OpenSmoothly ({ children, className, delay = 0, fadeInType = "fromtop" }) {
  const containerRef = useRef(null);

    useEffect(() => {
        // Apply fade-in animation on mount
        if (fadeInType == "inPlace") {
          gsap.fromTo(
            containerRef.current,
            { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
            { 
                filter: "blur(0px)", 
                scale: 1, 
                opacity: 1, 
                ease: "power2.out", 
                delay: delay
            }
          );
        } else {
          gsap.fromTo(
              containerRef.current,
              { opacity: 0, y: -20 }, // Initial state
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: delay } // Target state
          );
        }
        
    }, []); // Run only once when the component mounts

    return (
        <div className={className} ref={containerRef} style={{ opacity: 0 }}>
            {children}
        </div>
    );
}

export function Opening ({ playBgSound, nextStageTrigger }) {
  const object = useRef();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  let [goAway, setGoAway] = useState(false);

  useGSAP(() => {
    gsap.to(object.current, {
      translateY: "-300px",
      ease: "back.inOut",
      duration: 3
    });
  });

  const button_click = new Howl({
    src: ['/button2.mp3'], // Add the path to your sound file
    volume: 1, // Adjust the volume (0 to 1)
    preload: true, // Preload the sound
  });

  

  useGSAP(() => {
    if (goAway == true) {

      

      button_click.play();

      playBgSound();

      gsap.to("#container", { 
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            nextStageTrigger();
          }, 500);
        }
      });


    }
  }, [goAway]);

  return (
    <div className="w-full h-full flex justify-center items-center" id="container">
      <div className="text-center">
          <h1 className="text-6xl mt-8">Illusions of Prosperity</h1>
          <h2 className="text-4xl mt-7">Farovonlik illuziyasi</h2>
          <div onClick={() => { if (!isLoading) { setGoAway(true); } }} className="mt-2 group cursor-pointer z-20 relative h-[140px] w-fit mx-auto flex items-center justify-center">
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
                <div className="flex flex-row items-center gap-x-2">
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