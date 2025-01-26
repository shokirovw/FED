import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import { Button } from "./scene1";

export default function Scene1 ({ nextStageTrigger, changeBarText, changeEnergyScore }) {
    useEffect(() => {
        changeBarText('Chapter 2. A New Life');

        pressedNext();
    }, []);

    // useGSAP(() => {
    //   let tl = gsap.timeline();

    //   tl
    //     .to("#rustam", { opacity: 1 }, "+=1")
    //     .to("#malika", { opacity: 1 }, "+=1")
    //     .to("#container", { x: -400 }, "+=1")
    //     .fromTo("#text1", { opacity: 0, filter: "blur(10px)", scale: 0 }, { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power2.out"  }, "+=1")
    //     .to("#anvar", { opacity: 1 }, "+=1")
    //     .to("#button1", { opacity: 1 }, "+=1")
        
    // });

    let [rustamText, setRustamText] = useState("");
    let [schoolText, setSchoolText] = useState("");

    const pressedNext = () => {
        let tl = gsap.timeline();
        
        tl
        .to("#scene1_cont", { opacity: 0, filter: "blur(10px)", scale: 0.8 }, "+=2")
        .to("#scene2_cont", { display: "flex", onComplete: () => { changeBarText("Chapter 3. Situation in kindergarden") } }, "+=1")
        .fromTo("#scene2text", { opacity: 0, filter: "blur(10px)", scale: 0.8 }, { opacity: 1, filter: "blur(0px)", scale: 1 }, "+=1")
        .to("#scene2_cont", { display: "none" }, "+=3")
        .to("#scene3_cont", { display: "flex" })
        .to("#rustam_pic", { opacity: 1, x: "-=176px" }, "+=1")
        .to("#rustam_cloud", { opacity: 1, onComplete: () => { setRustamText("My child Anvar needs to go to kindergarden") } }, "+=2")
        .to("#school_cloud", { opacity: 1, onComplete: () => { setSchoolText("Well, currently we have no places. But there is one way to manage this.") } }, "+=2")
        .to("#action_field", { opacity: 1 }, "+=2");
        
    }
  
    return (
      <div className="w-full h-full relative text-lg">

            <div id="scene2_cont" className="hidden w-full h-full items-center justify-center">
                <p id="scene2text" className="text-xl opacity-0">Some years passed since then, and Anvar was to go to kindergarden</p>
            </div>

            <div id="scene3_cont" className="hidden w-full h-full flex-col items-center justify-center">
                <div className="flex flex-row items-end relative mt-36">
                    <img src="/schoolofficial.svg" className="w-[350px] h-auto" />
                    <img src="/table2.svg" className="w-[220px] h-auto mb-8 -ml-20" />
                    <img src="/rustam.svg" id="rustam_pic" className="w-[350px] h-auto -mb-5 translate-x-44 opacity-0" />
                    <div className="absolute -top-20 -right-48 w-[300px] h-[200px] z-10">
                        <img className="absolute w-full h-full -z-20 opacity-0" id="rustam_cloud" src="/cloud.webp" alt="" width={200} />
                        <div className="z-30 text-sm px-10 py-7">
                            <TypeAnimation
                                key={rustamText}
                                sequence={[
                                    "", // First clear the text
                                    500, // Wait for 500ms
                                    rustamText, // The current text from state
                                    1000, // Wait after typing
                                ]}
                                wrapper="p"
                                className=""
                                speed={10}
                                cursor={false}
                                deleteSpeed={30}
                            />
                        </div>
                    </div>
                    <div className="absolute -top-20 -left-48 w-[300px] h-[200px] z-10">
                        <img className="absolute w-full h-full -z-20 opacity-0" id="school_cloud" src="/cloud2.png" alt="" width={200} />
                        <div className="z-30 text-sm px-10 py-7">
                            <TypeAnimation
                                key={schoolText}
                                sequence={[
                                    "", // First clear the text
                                    500, // Wait for 500ms
                                    schoolText, // The current text from state
                                    1000, // Wait after typing
                                ]}
                                wrapper="p"
                                className=""
                                speed={10}
                                cursor={false}
                                deleteSpeed={30}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-4 opacity-0" id="action_field">
                    <Button text="Bribe" onClick={() => {}} />
                    <Button text="Report" onClick={() => {}} />
                </div>
            </div>


            <div id="scene1_cont" className="top-1/3 relative w-full h-full">

                <div className="absolute right-36 flex flex-col items-center">
                    <p id="text1" className="opacity-0 text-base">Recently Rustam and Malika had a child, Anvar</p>

                    <div id="anvar" className="max-w-[180px] mt-8 opacity-0">
                    <DotLottieReact
                        src="/anvar.json"
                        loop
                        autoplay
                        width={100}
                        height={100}
                    />
                    </div>
                    <div className="opacity-0" id="button1">
                        <Button onClick={pressedNext} />
                    </div>
                </div>
        
                <div id="container" className="absolute left-1/2 -translate-x-1/2 flex gap-x-10">
                    <div id="rustam" className="opacity-0 flex flex-col items-center">
                        <p>Meet this is Rustam</p>
                        <div className="mt-2">
                        <DotLottieReact
                            src="/rustam.json"
                            loop
                            autoplay
                            width={210}
                            height={210}
                        />
                        </div>
                    </div>

                    <div id="malika" className="flex flex-col items-center opacity-0">
                        <p>And this is Malika</p>
                        <div className="mt-2">
                        <DotLottieReact
                            src="/malikaanim.json"
                            loop
                            autoplay
                            width={200}
                            height={200}
                        />
                        </div>
                    </div>
                </div>
            </div>
            
      </div>
    )
  }