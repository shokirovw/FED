import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Scene1 ({ nextStageTrigger, changeBarText, changeEnergyScore }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            changeBarText('Chapter 1. Introduction');
          }, 1500);
        return () => clearTimeout(timer);
    })

    useGSAP(() => {
      let tl = gsap.timeline();
  
      tl.fromTo(
          "#text1", 
          { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
          { 
              filter: "blur(0px)", 
              scale: 1, 
              opacity: 1, 
              ease: "power2.out" 
          },
          "+=5" // Wait 2 seconds before this animation starts
      )
      .to(
          "#text1", 
          { 
              filter: "blur(10px)", 
              scale: 1.2, 
              opacity: 0, 
              ease: "power2.in",
          },
          "+=3"
      ).fromTo(
        "#text2", 
        { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
        { 
            filter: "blur(0px)", 
            scale: 1, 
            opacity: 1, 
            ease: "power2.out",
            onComplete: () => {
                changeEnergyScore(20, 0.2);
            }
        },
        "+=0.4" // Wait 2 seconds before this animation starts
    ).fromTo(
        "#text3", 
        { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
        { 
            filter: "blur(0px)", 
            scale: 1, 
            opacity: 1, 
            ease: "power2.out",
            onComplete: () => {
                changeEnergyScore(-20, 0.2);
            } 
        },
        "+=4" // Wait 2 seconds before this animation starts
    ).to(
        "#container1",
        { y: -40, },
        "+=2"
    ).to(
        "#button1",
        { opacity: 1 },
        "+=1"
    )
  });

  const clearScene = () => {
    

    gsap.to("#top_cont", { 
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
  
    return (
      <div id="top_cont" className="w-full h-full relative flex items-center flex-col gap-y-5 justify-center text-lg">
        
            <p id="text1" className="absolute opacity-0">On top-right corner of your screen is your energy score</p>

            <div id="container1" className="text-center space-y-5">
                <p id="text2" className="opacity-0">The better decisions you make the higher is your score</p>
                <p id="text3" className="opacity-0">Individually worse actions make you lose the score</p>
            </div>

            <div id="button1" className="absolute opacity-0 mt-28">
                <Button onClick={clearScene}  />
            </div>

            
      </div>
    )
  }

  export function Button ({ onClick, text = "Next" }) {

    // const button_click = new Howl({
    //     src: ['/button2.mp3'], // Add the path to your sound file
    //     volume: 2, // Adjust the volume (0 to 1)
    //     preload: true, // Preload the sound
    // });    


    const action = () => {
        //button_click.play();
        onClick();
    }

    return (
        <div onClick={action} className="group cursor-pointer z-20 h-[140px] w-fit mx-auto flex items-center justify-center">
            <div className="absolute z-10 flex flex-row items-center gap-x-4 text-xl">
                <div className="flex flex-row items-center gap-x-2">
                    <p>{text}</p>
                    <FaArrowRightLong />
                </div>
            </div>
            <img src="/button.png" alt=""  className="group-hover:hidden block h-[55px] w-auto" />
            <img src="/button_hover.png" alt="" className="group-hover:block hidden -mt-1.5 h-[110px] w-auto" />
        </div>
    )
  }