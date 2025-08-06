"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFlare } from "@/context/CursorFlareContext";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function LaptopMockup() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const isTouchScreen = useIsTouchScreen();
  const {
    SecHeroContainerRef,
    aboutContainerRef,
    marqueeContainerRef,
    projectsContainerRef,
    minorProjectsContainerRef,
  } = useAppRef();
  const { flareRef, pauseBreathing, playBreathing } = useFlare();
  const { isDesktop } = useResponsiveBreakpoints();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded && containerRef.current && isDesktop) startAnimation();
  }, [loaded, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      10,
      500
    );
    camera.position.z = 75;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);
    const light = new THREE.PointLight(0xfff5e1, 0.8);
    const lightHolder = new THREE.Group();
    lightHolder.add(light);
    scene.add(lightHolder);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.minDistance = 45;
    orbit.maxDistance = 120;
    orbit.enablePan = false;
    orbit.enableDamping = true;
    orbit.enableZoom = false;
    orbit.enableRotate = false;

    const macGroup = new THREE.Group();
    const pivotGroup = new THREE.Group();
    pivotGroup.add(macGroup);
    scene.add(pivotGroup);

    const lidGroup = new THREE.Group();
    const bottomGroup = new THREE.Group();

    // Materials
    const texLoader = new THREE.TextureLoader();
    const screenTex = texLoader.load("/macbook-screen-texture.png", (tex) => {
      tex.flipY = false;
      tex.wrapS = THREE.RepeatWrapping;
      tex.repeat.y = (tex.image.width / tex.image.height / 29.4) * 20;
    });
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTex,
      transparent: true,
      opacity: 1,
      side: THREE.BackSide,
    });
    const darkPlastic = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.9,
      metalness: 0.9,
    });
    const baseMetal = new THREE.MeshStandardMaterial({ color: 0xcecfd3 });
    const logoMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cameraMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const keyboardTex = texLoader.load("/keyboard-overlay.png");
    const keyboardMat = new THREE.MeshBasicMaterial({
      alphaMap: keyboardTex,
      transparent: true,
      color: 0xffffff,
    });

    let screenMesh: THREE.Mesh;

    // GLTF loader
    const loader = new GLTFLoader();
    loader.load("/mac-noUv.glb", (glb: any) => {
      glb.scene.traverse((obj: any) => {
        if (obj.isMesh) {
          const name = obj.name.toLowerCase();
          if (name.includes("lid")) obj.material = baseMetal;
          else if (name.includes("logo")) obj.material = logoMat;
          else if (name.includes("screen-frame")) obj.material = darkPlastic;
          else if (name.includes("camera")) obj.material = cameraMat;
          else if (
            name.includes("base") ||
            name.includes("legs") ||
            name.includes("keyboard") ||
            name.includes("inner")
          )
            obj.material = name.includes("keyboard") ? darkPlastic : baseMetal;
        }
      });
      glb.scene.getObjectByName("_top") &&
        lidGroup.add(glb.scene.getObjectByName("_top")!);
      glb.scene.getObjectByName("_bottom") &&
        bottomGroup.add(glb.scene.getObjectByName("_bottom")!);

      // Add screen
      screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(29.4, 20), screenMat);
      screenMesh.position.set(0, 10.5, -0.11);
      screenMesh.rotation.set(Math.PI, 0, 0);
      lidGroup.add(screenMesh);

      const screenLight = new THREE.RectAreaLight(0xffffff, 1.5, 29.4, 20);
      screenLight.position.set(0, 10.5, 0);
      screenLight.rotation.set(Math.PI, 0, 0);
      lidGroup.add(screenLight);

      // Add keyboard overlay
      const kb = new THREE.Mesh(
        new THREE.PlaneGeometry(27.7, 11.6),
        keyboardMat
      );
      kb.rotation.set(-0.5 * Math.PI, 0, 0);
      kb.position.set(0, 0.045, 7.21);
      bottomGroup.add(kb);

      macGroup.add(lidGroup, bottomGroup);

      // Center the macGroup pivot
      setTimeout(() => {
        const bbox = new THREE.Box3().setFromObject(macGroup);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        macGroup.position.sub(center);
      }, 0);

      macGroup.rotation.set(Math.PI / 2, Math.PI / 3.5, 0); // initial tilt
      lidGroup.position.set(0, 0, 0.5); // initial lid position

      const isSmallLaptop = window.innerWidth < 1280;

      // Axis Rotation Animation
      const laptopRotateTl = gsap.to(pivotGroup.rotation, {
        y: "-=" + Math.PI * 2,
        repeat: -1,
        duration: 6,
        ease: "none",
      });

      // Z float loop
      const zFloatTl = gsap.to([lidGroup.position, bottomGroup.position], {
        z: "+=3",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Y float loop
      const yFloatTl = gsap.to([lidGroup.position, bottomGroup.position], {
        y: "+=3",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      yFloatTl.pause().timeScale(0); // freezed initially

      const screenOnTl = gsap
        .timeline({
          paused: true,
        })
        .to(
          screenMesh.material,
          {
            opacity: 1,
            ease: "none",
          },
          0
        )
        .to(
          screenLight,
          {
            intensity: 1.5,
            ease: "none",
          },
          0
        );

      const laptopOpeningTl = gsap
        .timeline({ paused: true, defaults: { ease: "none" } })
        .fromTo(
          lidGroup.rotation,
          {
            x: 0.5 * Math.PI,
          },
          {
            x: -0.2 * Math.PI,
          },
          0
        )
        .to(
          screenOnTl,
          {
            progress: 1,
          },
          0.05
        );

      const textureScrollTl = gsap
        .timeline({
          paused: true,
        })
        .fromTo(
          screenTex.offset,
          {
            y: 0,
          },
          {
            y: 0.34,
            ease: "power2.inOut",
          }
        );

      const projectTextureScrollTl = gsap
        .timeline({
          paused: true,
        })
        .fromTo(
          screenTex.offset,
          {
            y: 0.42,
          },
          {
            y: 0.85,
            ease: "none",
          }
        );

      const containerMoveTl = gsap.timeline({ paused: true }).to(
        containerRef.current,
        {
          xPercent: isSmallLaptop ? -75 : -110,
          yPercent: 10,
          ease: "none",
        },
        0
      );

      const laptopProgress = { value: 0 };
      const containerProgress = { value: 0 };

      const mainTl = gsap
        .timeline({ paused: true })
        .set(screenTex.offset, {
          y: 0,
        })
        .to(
          laptopProgress,
          {
            value: 0.7,
            ease: "none",
            onUpdate: () => {
              laptopOpeningTl.progress(laptopProgress.value);
            },
          },
          0
        )
        .to(
          containerProgress,
          {
            value: 1,
            ease: "none",
            onUpdate: () => {
              containerMoveTl.progress(containerProgress.value);
            },
          },
          0
        )
        .to(
          macGroup.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          camera.position,
          {
            y: 40,
            z: 65,
            ease: "power1.inOut",
          },
          0
        );

      const containerMoveBackTl = gsap.timeline({ paused: true }).to(
        containerRef.current,
        {
          xPercent: 10,
          ease: "none",
        },
        0
      );

      const laptopRotateOppTl = gsap.timeline({ paused: true }).to(
        macGroup.rotation,
        {
          y: (-1.5 * Math.PI) / 5,
        },
        0
      );

      const cameraMoveTl = gsap.timeline({ paused: true }).to(
        camera.position,
        {
          z: 68,
          ease: "power1.inOut",
        },
        0
      );

      const containerMoveProgress = { value: 0 };
      const laptopRotateProgress = { value: 0 };
      const cameraMoveProgress = { value: 0 };

      const laptopClosingTl = gsap
        .timeline({ paused: true })
        .to(
          containerMoveProgress,
          {
            value: 1,
            ease: "none",
            onUpdate: () => {
              containerMoveBackTl.progress(containerMoveProgress.value);
            },
          },
          0
        )
        .to(
          laptopRotateProgress,
          {
            value: 1,
            ease: "none",
            onUpdate: () => {
              laptopRotateOppTl.progress(laptopRotateProgress.value);
            },
          },
          0
        )
        .to(
          cameraMoveProgress,
          {
            value: 1,
            ease: "none",
            onUpdate: () => {
              cameraMoveTl.progress(cameraMoveProgress.value);
            },
          },
          0
        );

      let laptopResetRotationTl = gsap.timeline();

      const containerHideTl = gsap.timeline({ paused: true }).to(
        containerRef.current,
        {
          yPercent: -100,
          ease: "none",
        },
        0
      );

      const containerHideProgress = { value: 0 };

      const laptopHideTl = gsap.timeline({ paused: true }).to(
        containerHideProgress,
        {
          value: 1,
          ease: "none",
          onUpdate: () => {
            containerHideTl.progress(containerHideProgress.value);
          },
        },
        0
      );

      ScrollTrigger.create({
        trigger: SecHeroContainerRef?.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.3,
        animation: mainTl,
        onEnter: () => {
          if (laptopResetRotationTl.isActive()) laptopResetRotationTl.kill();
          laptopRotateTl.pause(); // pause rotation

          const currentY = pivotGroup.rotation.y;

          const finalY = Math.PI / 5; // Target rotational position
          const delta =
            ((finalY - currentY + Math.PI) % (2 * Math.PI)) - Math.PI;
          const targetY = currentY + delta;

          gsap.to(pivotGroup.rotation, {
            y: targetY,
            duration: 2,
            ease: "power3.out",
            onComplete: () => {
              yFloatTl.timeScale(1); // enable Y float
              zFloatTl.timeScale(0); // disable Z float
            },
          });
        },
        onLeaveBack: () => {
          laptopResetRotationTl = gsap.timeline().to(pivotGroup.rotation, {
            y: 0, // always reset back to 0 as rotateTl is made to restart
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
              laptopRotateTl.restart();
              yFloatTl.timeScale(0); // disable Y float
              zFloatTl.timeScale(1); // enable Z float
            },
          });
        },
        onUpdate: (self) => {
          const progress = self.progress;

          zFloatTl.timeScale(1 - progress); // fades out
          yFloatTl.timeScale(progress); // fades in

          if (!zFloatTl.isActive()) zFloatTl.play();
          if (!yFloatTl.isActive()) yFloatTl.play();
        },
      });

      ScrollTrigger.create({
        trigger: aboutContainerRef?.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.3,
        animation: textureScrollTl,
      });

      ScrollTrigger.create({
        trigger: projectsContainerRef?.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.3,
        animation: projectTextureScrollTl,
      });

      const laptopLidProgress = { value: 0.7 };

      ScrollTrigger.create({
        trigger: marqueeContainerRef?.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 0.3,
        animation: laptopClosingTl,
        onEnter: () => {
          gsap.to(laptopLidProgress, {
            value: 0,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onEnterBack: () => {
          gsap.to(laptopLidProgress, {
            value: 0,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onLeaveBack: () => {
          gsap.set(screenTex.offset, {
            y: 0.34,
          });
          gsap.to(laptopLidProgress, {
            value: 0.7,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onLeave: () => {
          gsap.set(screenTex.offset, {
            y: 0.42,
          });
          gsap.to(laptopLidProgress, {
            value: 0.7,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onUpdate: (self) => {
          const progress = self.progress;
          yFloatTl.timeScale(1 - progress); // fades out
          if (!yFloatTl.isActive()) yFloatTl.play();
        },
      });

      ScrollTrigger.create({
        trigger: minorProjectsContainerRef?.current,
        start: "top bottom",
        end: "bottom 50%",
        scrub: 0.3,
        animation: laptopHideTl,
        onEnter: () => {
          gsap.to(laptopLidProgress, {
            value: 0,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onEnterBack: () => {
          gsap.to(laptopLidProgress, {
            value: 0.7,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(laptopLidProgress, {
            value: 0.7,
            ease: "power1.inOut",
            duration: 0.5,
            onUpdate: () => {
              laptopOpeningTl.progress(laptopLidProgress.value);
            },
          });
        },
      });
    });

    // detect hover for 3D object (laptop)
    let hovered = false;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let onLaptopEnterTl = gsap.timeline();
    let onLaptopLeaveTl = gsap.timeline();

    const onLaptopEnter = contextSafe(() => {
      if (isTouchScreen) return;

      if (onLaptopLeaveTl.isActive()) onLaptopLeaveTl.kill();
      if (flareRef.current) {
        pauseBreathing();
        onLaptopEnterTl = gsap.timeline().to(flareRef.current, {
          scale: 6,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    });

    const onLaptopLeave = contextSafe(() => {
      if (isTouchScreen) return;

      if (onLaptopEnterTl.isActive()) onLaptopEnterTl.kill();
      if (flareRef.current) {
        onLaptopLeaveTl = gsap.timeline().to(flareRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => playBreathing(),
        });
      }
    });

    const checkHover = (event: MouseEvent) => {
      if (isTouchScreen) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // General hover detection for full laptop (macGroup)
      const laptopIntersects = raycaster.intersectObject(macGroup, true);
      if (laptopIntersects.length > 0) {
        if (!hovered) {
          hovered = true;
          onLaptopEnter();
        }
      } else {
        if (hovered) {
          hovered = false;
          onLaptopLeave();
        }
      }

      // Specific cursor pointer only when hovering screenMesh
      const screenIntersects = screenMesh
        ? raycaster.intersectObject(screenMesh, true)
        : [];
      renderer.domElement.style.cursor =
        screenIntersects.length > 0 ? "pointer" : "default";
    };

    const onClick = (event: MouseEvent) => {
      if (!screenMesh || !camera || !renderer) return;

      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(screenMesh, true);

      if (intersects.length > 0) {
        openLinkInNewTab("/resume");
      }
    };

    // Render
    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const tick = () => {
      orbit.update();
      camera.lookAt(0, 0, 0);
      lightHolder.quaternion.copy(camera.quaternion);
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    renderer.domElement.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    if (!isTouchScreen && isDesktop)
      renderer.domElement.addEventListener("pointermove", checkHover);

    renderer.domElement.style.touchAction = "manipulation";
    renderer.domElement.style.pointerEvents = "auto";

    return () => {
      if (!isTouchScreen && isDesktop)
        renderer.domElement.removeEventListener("pointermove", checkHover);

      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  function openLinkInNewTab(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  const startAnimation = contextSafe(() => {
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.from(containerRef.current, {
      xPercent: 100,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.8,
    });
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "hidden laptop-mockup lg:block fixed top-0 right-[-15rem] xl:right-[-5rem] opacity-0 w-3/4 xl:w-1/2 h-screen z-10"
      )}
    />
  );
}
