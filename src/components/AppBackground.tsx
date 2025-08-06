"use client";

import { useRef, useEffect, Fragment } from "react";
import * as THREE from "three";
import { useAppRef } from "@/context/AppRefContext";
import { bgVertexShader, bgFragmentShader } from "@/shaders/BackgroundShaders";

export default function AppBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { appBackgroundRef } = useAppRef();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = window.innerHeight - e.clientY; // Flip Y
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime() * 0.3;

      // Inertia effect: smoothly move actual mouse towards target
      mouse.current.lerp(targetMouse.current, 0.005);
      uniforms.iMouse.value.copy(mouse.current);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Fragment>
      <div
        ref={containerRef}
        className="fixed inset-0 top-0 w-screen h-screen overflow-hidden pointer-events-none opacity-60 -z-10"
      />
      <div
        ref={appBackgroundRef}
        className="fixed inset-0 top-0 w-screen h-screen overflow-hidden pointer-events-none -z-9 will-change-[backdrop-filter] backdrop-blur-[100px]"
      />
    </Fragment>
  );
}
