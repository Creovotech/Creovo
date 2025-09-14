import React from "react";
import LiquidEther from "@/app/ui/backgrounds/LiquidEther";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import GlassyButton from "../ui/buttons/GlassyButton";
import { Safari } from "@/components/magicui/safari";

const Herosection = () => {
  return (
    <div className="w-full h-screen relative bg-black overflow-scroll">
      {/* LiquidEther component as the background */}
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={true}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        autoDemo={true}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight md:leading-snug">
          <span className="text-white/90">Your </span>
          {/* The Gemini Gradient Word */}
          <span
            className="
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
              bg-clip-text text-transparent
              drop-shadow-md
            "
          >
            Vision,
          </span>
          <br /> {/* Line break for better composition */}
          <span className="text-white/90">Engineered with Intelligence</span>
        </h1>
        <p className="text-xl mt-4 max-w-xl text-center pointer-events-none">
          We fuse cutting-edge design with robust web development and AI-powered
          agentic frameworks to create digital experiences that think, adapt,
          and deliver results.
        </p>
        <div
          className="mt-8 flex justify-center items-center space-x-4"
          style={{ pointerEvents: "auto" }}
        >
          <RainbowButton variant="default" size="lg">
            Book a Call
          </RainbowButton>
          <GlassyButton size="md">Estimate Cost</GlassyButton>
        </div>
        
      </div>
    </div>
  );
};

export default Herosection;
