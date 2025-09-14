import React from "react";
import LiquidEther from "@/app/ui/LiquidEther";

const Herosection = () => {
  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      {/* LiquidEther component as the background */}
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={true}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        autoDemo={false} // 1. Turn OFF auto-demo to enable mouse tracking
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto' // 2. Override internal style to enable mouse events
        }}
      />
      
      {/* Content layer positioned on top of the background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // Ensures this content is above the LiquidEther component
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        // Make this content layer transparent to mouse events...
        pointerEvents: 'none' 
      }}>
        {/* ...but make individual elements like text and buttons interactive again */}
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', pointerEvents: 'auto' }}>
          Creovo
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem', maxWidth: '600px', textAlign: 'center', pointerEvents: 'auto' }}>
          Where ideas take life
        </p>
        <button style={{
            marginTop: '2rem',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            pointerEvents: 'auto' // Crucial for making the button clickable
        }}>
            Discover More
        </button>
      </div>
    </div>
  );
};

export default Herosection;