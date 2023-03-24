import React, { useState, Suspense, useEffect, useMemo } from "react";

import { AudioLoader } from "three";
import { PositionalAudio } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { WorkStation } from "./components/WorkStation/WorkStation";
import Island from "./components/Island/Island";
import Campfire from "./components/Campfire/Campfire";
import Animal from "./components/Animal/Animal";
import Human from "./components/Human/Human";
import Background from "./components/Background/Background";
import Lights from "./components/Lights/Lights";
import { CustomText3D } from "./components/CustomText3D/CustomText3D";
import { Cloud, Sky } from "@react-three/drei";

function RandomClouds() {
  const clouds = useMemo(() => {
    const cloudArray = [];

    for (let i = 0; i < 20; i++) {
      const position = [
        Math.floor(Math.random() * 50) - 25,
        Math.floor(Math.random() * 20) + 5,
        Math.floor(Math.random() * 20) - 80,
      ];

      cloudArray.push(<Cloud key={i} position={position} />);
    }

    return cloudArray;
  }, []);

  return <>{clouds}</>;
}

export function Experience() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // without this, the PositionalAudio causes an error
    setTimeout(() => setReady(true), 2000);
  }, []);

  return (
    <Suspense fallback={null}>
      <RandomClouds />
      {ready && (
        <PositionalAudio autoplay loop url="audio/Wind.mp3" distance={1} />
      )}

      <hemisphereLight
        skyColor={"#ffffff"}
        groundColor={"#44444400"}
        intensity={0.5}
      />

      <CustomText3D text="Portfolio" />
      <group position={[0, -11.9, 0]}>
        <Island />

        {ready && (
          <PositionalAudio
            autoplay
            loop
            url="audio/Crickets.mp3"
            distance={3}
          />
        )}
      </group>
      <group position={[-3, -1, 2]}>
        <Campfire />
        {ready && (
          <PositionalAudio autoplay loop url="audio/Fire.mp3" distance={0.7} />
        )}
      </group>
      <WorkStation />
      <Animal />
      <Human />
      <Lights />
      <Background />
    </Suspense>
  );
}

// without this PositionalAudio generates an error
// need to understand why this is necessary, and it's not in the example https://codesandbox.io/s/gkfhr?file=/src/App.js
useLoader.preload(AudioLoader, "audio/Fire.mp3");
useLoader.preload(AudioLoader, "audio/Crickets.mp3");
useLoader.preload(AudioLoader, "audio/Wind.mp3");
