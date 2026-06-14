import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { useAppContext } from '../context/AppContext';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "Andhra Pradesh", coordinates: [79.74, 15.91] },
];

export default function WorldMap() {
  const { theme } = useAppContext();
  const baseFill = theme === 'light' ? "#EDEDED" : "#2a2a2a";
  const hoverFill = theme === 'light' ? "#E6E6E6" : "#5a5a5a";
  const pressedFill = theme === 'light' ? "#D9D9D9" : "#4a4a4a";
  const strokeColor = theme === 'light' ? "#22C55E" : "#1a1a1a";

  return (
    <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] flex flex-col items-center border-t border-white/5 bg-transparent overflow-hidden">
      
      {/* Absolute Header Content over map */}
      <div className="absolute top-12 left-4 md:left-12 lg:left-24 z-10 pointer-events-none max-w-2xl px-4 md:px-0 lg:pt-8">
         <h3 className="text-4xl md:text-5xl lg:text-[72px] font-black font-display uppercase tracking-tight text-white leading-[1.0] mb-6">
           RE-DEFINING <br />
           <span className="text-nomad-green">LIVE EVENTS</span> <br />
           WORLD-WIDE.
         </h3>
         <p className="text-white/60 text-[15px] md:text-lg font-medium max-w-2xl">
           Built in India, For the world! We're looking to connect nomads across 50+ countries.
         </p>
      </div>

      {/* Map Container */}
      <div className="w-full max-w-[1920px] mx-auto flex items-center justify-end overflow-hidden pb-12 pt-40 md:pt-16">
        <div className="w-[150%] sm:w-[130%] md:w-[110%] lg:w-[90%] xl:w-[85%] origin-right flex justify-end shrink-0 opacity-80 md:opacity-100">
          <ComposableMap 
            projection="geoMercator" 
            width={1000}
            height={460}
            className="w-full h-auto block"
            style={{ width: "100%", height: "auto" }}
            projectionConfig={{
              scale: 195,
              center: [25, 20]
            }}
          >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties.name === "India";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isIndia ? "#00FF66" : baseFill}
                    stroke={strokeColor}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "fill 0.2s" },
                      hover: { fill: isIndia ? "#33FF88" : hoverFill, outline: "none", cursor: "pointer", transition: "fill 0.2s" },
                      pressed: { fill: isIndia ? "#00CC55" : pressedFill, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker 
              key={name} 
              coordinates={coordinates as any} 
              className="pointer-events-none"
            >
              <circle r={8} fill="#00FF66" stroke={strokeColor} strokeWidth={2} />
              <circle r={18} fill="#00FF66" opacity={0.3} className="animate-ping" />
            </Marker>
          ))}
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
