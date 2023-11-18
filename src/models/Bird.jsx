import React, { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);
  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  //Move around
  useFrame(({ clock, camera }) => {
    //Update y position
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
    //check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      //change direction to forward
      birdRef.current.rotation.y = 0;
    }
    //update the x and z position based on the direction
    if (birdRef.current.rotation.y == 0) {
      //forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      //backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
    //update y position to simulate flight
  });
  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
