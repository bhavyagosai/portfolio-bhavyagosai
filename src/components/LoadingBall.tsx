"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { ballFragmentShader, ballVertexShader } from "@/shaders/BallShaders";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";

type LoadingBallProps = {
  loadValue: number;
};

export default function LoadingBall(props: LoadingBallProps) {
  const isTouchScreen = useIsTouchScreen();
  const { isMobile } = useResponsiveBreakpoints();

  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const loadValueRef = useRef(props.loadValue);
  const smoothSize = useRef(200); // Ref to track smooth size
  const smoothGlow = useRef(400); // Ref to track smooth glow

  useEffect(() => {
    loadValueRef.current = props.loadValue; // update the ref with the latest value in order to use it in animate()
  }, [props.loadValue]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { value: new THREE.Vector2(centerX, centerY) },
      size: { value: 200 },
      glowNumber: { value: 400 },
    };

    mouse.current.set(centerX, centerY);
    targetMouse.current.set(centerX, centerY);

    const material = new THREE.ShaderMaterial({
      vertexShader: ballVertexShader,
      fragmentShader: ballFragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchScreen || isMobile) return;
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = window.innerHeight - e.clientY; // Flip Y
    };

    if (!isTouchScreen && !isMobile)
      window.addEventListener("pointermove", onMouseMove);

    const onResize = () => {
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();

      // Smooth follow the cursor
      mouse.current.lerp(targetMouse.current, 0.05);
      uniforms.iMouse.value.copy(mouse.current);

      // Target values calculated from loadValue
      const targetSize = 200 - 200 * (loadValueRef.current / 100);
      const targetGlow = 400 - 400 * (loadValueRef.current / 100);

      // Smooth the transition using lerp
      smoothSize.current = THREE.MathUtils.lerp(
        smoothSize.current,
        targetSize,
        0.05
      );
      smoothGlow.current = THREE.MathUtils.lerp(
        smoothGlow.current,
        targetGlow,
        0.05
      );

      uniforms.size.value = smoothSize.current;
      uniforms.glowNumber.value = smoothGlow.current;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (!isTouchScreen && !isMobile)
        window.removeEventListener("pointermove", onMouseMove);

      window.removeEventListener("resize", onResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <div ref={containerRef} className="inset-0" />
    </div>
  );
}
