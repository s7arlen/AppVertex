import React from 'react';

export default function BackgroundLayer() {
  return (
    <div id="fixedBackgroundLayer" className="fixed-background-system" aria-hidden="true">
      {/* Solid Base Foundation */}
      <div className="fixed-bg-base"></div>

      {/* Technical Architectural Micro-Grid, Fluted Louvers & Precision Ticks */}
      <svg className="fixed-bg-grid" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          {/* Fluted Louvers (Vertical Pinstripes) */}
          <pattern id="appv-fluted-louvers" width="8" height="24" patternUnits="userSpaceOnUse">
            <line x1="4" y1="0" x2="4" y2="24" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25"></line>
          </pattern>
          {/* 24px Micro Grid */}
          <pattern id="appv-micro-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.35"></path>
          </pattern>
          {/* 72px Macro Crosshair Ticks */}
          <pattern id="appv-macro-ticks" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55"></path>
            <path d="M -3 0 L 3 0 M 0 -3 L 0 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8"></path>
            <path d="M 69 0 L 75 0 M 72 -3 L 72 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8"></path>
            <path d="M -3 72 L 3 72 M 0 69 L 0 75" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8"></path>
            <path d="M 69 72 L 75 72 M 72 69 L 72 75" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#appv-fluted-louvers)"></rect>
        <rect width="100%" height="100%" fill="url(#appv-micro-grid)"></rect>
        <rect width="100%" height="100%" fill="url(#appv-macro-ticks)"></rect>
      </svg>

      {/* Preserved Fine Grain Texture Layer */}
      <div className="fixed-bg-grain"></div>

      {/* Ambient Atmospheric Glows */}
      <div className="fixed-bg-ambient-top"></div>
      <div className="fixed-bg-ambient-bottom"></div>

      {/* Stationary Organic Curved Ribbon Layer */}
      <div className="fixed-bg-ribbon-curves" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fixedGlowBase" x1="100%" y1="20%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF870D" stopOpacity="0.32"/>
              <stop offset="50%" stopColor="#FF5722" stopOpacity="0.16"/>
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0"/>
            </linearGradient>

            <linearGradient id="fixedWaveBurgundy" x1="100%" y1="10%" x2="15%" y2="90%">
              <stop offset="0%" stopColor="#EF870D" stopOpacity="0.75"/>
              <stop offset="45%" stopColor="#F76020" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#EA321D" stopOpacity="0.20"/>
            </linearGradient>

            <linearGradient id="fixedWaveCyan" x1="100%" y1="10%" x2="15%" y2="90%">
              <stop offset="0%" stopColor="#EF870D" stopOpacity="0.75"/>
              <stop offset="45%" stopColor="#F76020" stopOpacity="0.55"/>
              <stop offset="100%" stopColor="#EA321D" stopOpacity="0.20"/>
            </linearGradient>

            <linearGradient id="fixedWaveFrosted" x1="100%" y1="20%" x2="0%" y2="85%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92"/>
              <stop offset="40%" stopColor="#FDFBF9" stopOpacity="0.72"/>
              <stop offset="100%" stopColor="#FEF5EC" stopOpacity="0.35"/>
            </linearGradient>

            <linearGradient id="fixedWaveDeepBurgundy" x1="100%" y1="35%" x2="25%" y2="100%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.45"/>
              <stop offset="55%" stopColor="#EF870D" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0"/>
            </linearGradient>

            <linearGradient id="fixedWaveRosewood" x1="100%" y1="35%" x2="25%" y2="100%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.45"/>
              <stop offset="55%" stopColor="#EF870D" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0"/>
            </linearGradient>
          </defs>

          <circle cx="1200" cy="550" r="460" fill="url(#fixedGlowBase)"/>

          <path d="M 1440 220 C 1220 320 1060 460 1100 620 C 1140 760 920 860 680 900 L 1440 900 Z" 
                fill="url(#fixedWaveBurgundy)"/>

          <path d="M 1440 360 C 1200 460 1020 580 980 720 C 950 820 820 880 620 900 L 1440 900 Z" 
                fill="url(#fixedWaveFrosted)" 
                stroke="rgba(255, 255, 255, 0.95)" 
                strokeWidth="2"/>

          <path d="M 1440 540 C 1260 620 1120 740 1060 840 C 1030 890 980 900 880 900 L 1440 900 Z" 
                fill="url(#fixedWaveDeepBurgundy)"/>
        </svg>
      </div>
    </div>
  );
}
