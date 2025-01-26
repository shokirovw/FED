import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Scene1 ({ nextStageTrigger, changeBarText, changeEnergyScore }) {

    useEffect(() => {
        changeBarText('Chapter 2. A New Life');
    })

//     useGSAP(() => {
//       let tl = gsap.timeline();
  
//       tl.fromTo(
//           "#text1", 
//           { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
//           { 
//               filter: "blur(0px)", 
//               scale: 1, 
//               opacity: 1, 
//               ease: "power2.out" 
//           },
//           "+=5" // Wait 2 seconds before this animation starts
//       )
//       .to(
//           "#text1", 
//           { 
//               filter: "blur(10px)", 
//               scale: 1.2, 
//               opacity: 0, 
//               ease: "power2.in",
//           },
//           "+=3"
//       ).fromTo(
//         "#text2", 
//         { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
//         { 
//             filter: "blur(0px)", 
//             scale: 1, 
//             opacity: 1, 
//             ease: "power2.out",
//             onComplete: () => {
//                 changeEnergyScore(20, 0.2);
//             }
//         },
//         "+=0.4" // Wait 2 seconds before this animation starts
//     ).fromTo(
//         "#text3", 
//         { filter: "blur(10px)", scale: 0.8, opacity: 0 }, 
//         { 
//             filter: "blur(0px)", 
//             scale: 1, 
//             opacity: 1, 
//             ease: "power2.out",
//             onComplete: () => {
//                 changeEnergyScore(-20, 0.2);
//             } 
//         },
//         "+=4" // Wait 2 seconds before this animation starts
//     ).to(
//         "#container1",
//         { y: -40, },
//         "+=2"
//     ).to(
//         "#button1",
//         { opacity: 1 },
//         "+=1"
//     )
//   });
  
    return (
      <div id="top_cont" className="w-full h-full relative text-lg">

            <div>

            </div>
        
            <div className="absolute left-1/2 -translate-x-1/2 top-1/3 flex gap-x-10">
                <div className="flex flex-col items-center">
                    <p>Meet this is Rustam</p>
                    <div className="-mt-8">
                    <DotLottieReact
                        src="/rustam.lottie"
                        loop
                        autoplay
                        width={250}
                        height={250}
                    />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p>And this is Malika</p>
                    <div className="mt-2">
                    <DotLottieReact
                        src="/malikaanim.lottie"
                        loop
                        autoplay
                        width={200}
                        height={200}
                    />
                    </div>
                </div>
            </div>

            
      </div>
    )
  }