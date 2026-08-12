"use client";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

// Paleta real de marca Del Carpio (ver tailwind.config.ts / AGENTS.md).
// No se introduce ningún color fuera de esta paleta + neutros de tinta.
const BRAND = {
  terracota: 0xd6532b,
  oliva: 0x53843a,
  amarillo: 0xfbe369,
  ink: 0x4a5560,
};

type SceneRefs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
};

// Copy real, sin superlativos inventados — reutiliza terminología y hechos
// ya establecidos en src/content/site.ts (metrics, industries).
const TITLE = "SOLUCIONES";
const LINE_1 = "Instrumentación analítica HPLC y GC organizada por industria.";
const LINE_2 = "Seleccione su sector y acceda al equipo y soporte técnico adecuado.";

/**
 * Hero ambiental para /soluciones: escena WebGL fija (sin scroll-jacking)
 * con los colores reales de marca. Excepción documentada y aprobada por el
 * cliente el 2026-08-12 a las reglas "sin parallax / sin motion decorativo"
 * de DESIGN.md — ver Sección 8. Respeta prefers-reduced-motion mostrando un
 * fondo estático en su lugar.
 */
export function HorizonHeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const threeRefs = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Three.js scene — ambiental, cámara fija con leve flotación, sin scroll.
  useEffect(() => {
    if (reducedMotion) return;
    if (!canvasRef.current) return;

    const refs = threeRefs.current;

    const createParticleField = () => {
      const count = 4200;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let j = 0; j < count; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const choice = Math.random();
          if (choice < 0.55) {
            color.setHex(0xf5f5f5); // neutro claro — mayoría, discreto
          } else if (choice < 0.75) {
            color.setHex(BRAND.terracota);
          } else if (choice < 0.9) {
            color.setHex(BRAND.oliva);
          } else {
            color.setHex(BRAND.amarillo);
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: i } },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.03 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        refs.scene!.add(points);
        refs.stars.push(points);
      }
    };

    // "Bruma técnica": gradiente terracota → tinta, sin azul/morado. Se
    // ubica detrás del horizonte, lejos de la cámara en todo momento.
    const createNebula = () => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 60, 60);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(BRAND.terracota) },
          color2: { value: new THREE.Color(BRAND.ink) },
          opacity: { value: 0.22 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          void main() {
            float mixFactor = sin(vUv.x * 8.0 + time) * cos(vUv.y * 8.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            gl_FragColor = vec4(color, max(alpha, 0.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -900;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    // Capas de horizonte en neutros de tinta, siempre delante de la cámara.
    const createLayers = () => {
      const layers = [
        { distance: -180, height: 60, color: 0x333333, opacity: 1 },
        { distance: -230, height: 80, color: BRAND.ink, opacity: 0.75 },
        { distance: -280, height: 100, color: 0x707e83, opacity: 0.5 },
        { distance: -330, height: 120, color: 0x9aa5a9, opacity: 0.32 },
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = layer.distance;
        mesh.position.y = 40;
        mesh.userData = { baseZ: layer.distance, index };
        refs.scene!.add(mesh);
        refs.mountains.push(mesh);
      });
    };

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.84, 0.33, 0.17) * intensity;
            float pulse = sin(time * 1.5) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.18);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      refs.scene!.add(new THREE.Mesh(geometry, material));
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((points) => {
        const material = points.material as THREE.ShaderMaterial;
        if (material.uniforms) material.uniforms.time.value = time;
      });

      if (refs.nebula) {
        const material = refs.nebula.material as THREE.ShaderMaterial;
        if (material.uniforms) material.uniforms.time.value = time * 0.5;
      }

      // Flotación sutil de cámara — sin desplazamiento por scroll.
      if (refs.camera) {
        refs.camera.position.x = Math.sin(time * 0.08) * 4;
        refs.camera.position.y = 20 + Math.cos(time * 0.1) * 2;
        refs.camera.lookAt(0, 0, -600);
      }

      refs.mountains.forEach((mesh, i) => {
        const drift = 1 + i * 0.4;
        mesh.position.x = Math.sin(time * 0.08) * 2 * drift;
      });

      refs.composer?.render();
    };

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(BRAND.ink, 0.00028);

    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.5,
        0.4,
        0.85,
      ),
    );

    createParticleField();
    createNebula();
    createLayers();
    createAtmosphere();
    animate();
    setIsReady(true);

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);

      refs.stars.forEach((points) => {
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
      });
      refs.mountains.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      refs.renderer?.dispose();
      refs.stars = [];
      refs.mountains = [];
    };
  }, [reducedMotion]);

  // Entrada (GSAP) — corre una sola vez, sin depender de estado de scroll.
  useEffect(() => {
    if (reducedMotion) return;
    if (!isReady) return;

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -80, opacity: 0, duration: 0.9, ease: "power3.out" });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      tl.from(
        chars,
        { y: 160, opacity: 0, duration: 1.2, stagger: 0.04, ease: "power4.out" },
        "-=0.5",
      );
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        lines,
        { y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" },
        "-=0.7",
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReady, reducedMotion]);

  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block">
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#131C24]">
      {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
      {reducedMotion && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#131C24] via-[#1a2530] to-[#131C24]" />
      )}

      {/* Ficha lateral */}
      <div
        ref={menuRef}
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
      >
        <div className="flex flex-col gap-1.5">
          <span className="h-[2px] w-5 bg-white/70" />
          <span className="h-[2px] w-5 bg-white/70" />
          <span className="h-[2px] w-5 bg-white/70" />
        </div>
        <div className="[writing-mode:vertical-lr] font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
          Soluciones
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="font-display text-5xl font-black uppercase tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {splitTitle(TITLE)}
        </h1>

        <div ref={subtitleRef} className="mt-6 max-w-2xl">
          <p className="subtitle-line text-base leading-7 text-white/80 md:text-lg">{LINE_1}</p>
          <p className="subtitle-line mt-1 text-base leading-7 text-white/80 md:text-lg">
            {LINE_2}
          </p>
        </div>
      </div>

      {/* Cue de scroll */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          Descubra su industria
        </span>
        <span className="h-6 w-[1px] animate-pulse bg-white/40 motion-reduce:animate-none" />
      </div>
    </section>
  );
}

export default HorizonHeroSection;
