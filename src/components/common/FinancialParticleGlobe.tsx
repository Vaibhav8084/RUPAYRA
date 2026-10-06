import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ParticleMode } from '../../context/AppContext';

interface FinancialParticleGlobeProps {
  mode?: ParticleMode;
  className?: string;
  height?: string;
  interactive?: boolean;
}

export const FinancialParticleGlobe: React.FC<FinancialParticleGlobeProps> = ({
  mode = 'normal',
  className = '',
  height = '420px',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalMode, setInternalMode] = useState<ParticleMode>(mode);
  const [nodeCount] = useState(240);

  useEffect(() => {
    setInternalMode(mode);
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Color definitions (Strict: ABSOLUTELY NO BLUE)
    const colorYellow = new THREE.Color(0xFFD43B);
    const colorRed = new THREE.Color(0xE53935);
    const colorOffwhite = new THREE.Color(0xF5F1E8);
    const colorOrange = new THREE.Color(0xD9822B);

    // Generate Points on a Sphere / Financial Network
    const radius = 70;
    const positions = new Float32Array(nodeCount * 3);
    const originalPositions = new Float32Array(nodeCount * 3);
    const velocities = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for harmonious network nodes
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const r = radius + (Math.random() - 0.5) * 8;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.08;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

      // Initial color: mix of warm gold, offwhite and muted amber
      const pickColor = Math.random() > 0.4 ? colorYellow : (Math.random() > 0.5 ? colorOffwhite : colorOrange);
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular particle texture for sumi ink dot look
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: 4.8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pointsMaterial);
    globeGroup.add(particles);

    // Line connections between nearby particles (Financial Network)
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const maxConnections = 480;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    globeGroup.add(lines);

    // Core pulsing glowing ring
    const ringGeo = new THREE.RingGeometry(69, 70.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorYellow,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    if (interactive) {
      container.addEventListener('mousemove', onMouseMove);
    }

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentMode = internalMode;

      // Handle Color and Target Behavior by Mode
      let targetColor = colorYellow;
      let lineAlpha = 0.22;
      let rotSpeed = 0.0035;

      if (currentMode === 'suspicious') {
        targetColor = colorRed;
        lineAlpha = 0.45;
        rotSpeed = 0.007; // faster erratic rotation under threat
        ringMat.color.set(colorRed);
        ringMat.opacity = 0.35 + Math.sin(elapsedTime * 6) * 0.15;
      } else if (currentMode === 'safe') {
        targetColor = colorYellow;
        lineAlpha = 0.35;
        rotSpeed = 0.0025;
        ringMat.color.set(colorYellow);
        ringMat.opacity = 0.25;
      } else if (currentMode === 'held') {
        targetColor = colorOrange;
        rotSpeed = 0.0005; // frozen/held
        ringMat.color.set(colorOrange);
        ringMat.opacity = 0.4;
      } else {
        targetColor = colorYellow;
        ringMat.color.set(colorYellow);
        ringMat.opacity = 0.15;
      }

      // Smooth mouse rotation
      targetRotationY += (mouseX * 0.6 - targetRotationY) * 0.05;
      targetRotationX += (mouseY * 0.4 - targetRotationX) * 0.05;

      globeGroup.rotation.y += rotSpeed + targetRotationY * 0.02;
      globeGroup.rotation.x = targetRotationX * 0.4;

      // Update positions
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const colAttr = geometry.getAttribute('color') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colArray = colAttr.array as Float32Array;

      let connectionCount = 0;
      const connectDistance = currentMode === 'suspicious' ? 24 : 20;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;

        // Particle dynamics based on mode
        if (currentMode === 'suspicious') {
          // Outward ink splash & jitter
          posArray[i3] += velocities[i3] * 2 + (Math.random() - 0.5) * 0.4;
          posArray[i3 + 1] += velocities[i3 + 1] * 2 + (Math.random() - 0.5) * 0.4;
          posArray[i3 + 2] += velocities[i3 + 2] * 2 + (Math.random() - 0.5) * 0.4;
          
          // Color shift to deep crimson & scarlet
          colArray[i3] += (colorRed.r - colArray[i3]) * 0.08;
          colArray[i3 + 1] += (colorRed.g - colArray[i3 + 1]) * 0.08;
          colArray[i3 + 2] += (colorRed.b - colArray[i3 + 2]) * 0.08;
        } else if (currentMode === 'held') {
          // Locked in place with faint jitter
          posArray[i3] += (originalPositions[i3] - posArray[i3]) * 0.1;
          posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.1;
          posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.1;

          colArray[i3] += (colorOrange.r - colArray[i3]) * 0.05;
          colArray[i3 + 1] += (colorOrange.g - colArray[i3 + 1]) * 0.05;
          colArray[i3 + 2] += (colorOrange.b - colArray[i3 + 2]) * 0.05;
        } else if (currentMode === 'dispersed') {
          // Disperse outward during page transitions
          posArray[i3] += velocities[i3] * 6;
          posArray[i3 + 1] += velocities[i3 + 1] * 6;
          posArray[i3 + 2] += velocities[i3 + 2] * 6;
        } else {
          // Smooth orbital drift back to original sphere
          posArray[i3] += velocities[i3] + (originalPositions[i3] - posArray[i3]) * 0.02;
          posArray[i3 + 1] += velocities[i3 + 1] + (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.02;
          posArray[i3 + 2] += velocities[i3 + 2] + (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.02;

          colArray[i3] += (targetColor.r - colArray[i3]) * 0.05;
          colArray[i3 + 1] += (targetColor.g - colArray[i3 + 1]) * 0.05;
          colArray[i3 + 2] += (targetColor.b - colArray[i3 + 2]) * 0.05;
        }

        // Calculate connections with nearby points
        for (let j = i + 1; j < nodeCount; j++) {
          if (connectionCount >= maxConnections) break;
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDistance) {
            const lineIdx = connectionCount * 6;
            linePositions[lineIdx] = posArray[i3];
            linePositions[lineIdx + 1] = posArray[i3 + 1];
            linePositions[lineIdx + 2] = posArray[i3 + 2];
            linePositions[lineIdx + 3] = posArray[j3];
            linePositions[lineIdx + 4] = posArray[j3 + 1];
            linePositions[lineIdx + 5] = posArray[j3 + 2];

            const alphaFactor = 1 - (dist / connectDistance);
            lineColors[lineIdx] = colArray[i3] * alphaFactor;
            lineColors[lineIdx + 1] = colArray[i3 + 1] * alphaFactor;
            lineColors[lineIdx + 2] = colArray[i3 + 2] * alphaFactor;
            lineColors[lineIdx + 3] = colArray[j3] * alphaFactor;
            lineColors[lineIdx + 4] = colArray[j3 + 1] * alphaFactor;
            lineColors[lineIdx + 5] = colArray[j3 + 2] * alphaFactor;

            connectionCount++;
          }
        }
      }

      lineMaterial.opacity = lineAlpha;
      lineGeometry.setDrawRange(0, connectionCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        container.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [internalMode, interactive, nodeCount]);

  return (
    <div className={`relative overflow-hidden rounded-xl border border-[#222222] bg-[#0c0c0c] ${className}`} style={{ height }}>
      {/* Background Japanese sumi-e watercolor subtle wash */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          internalMode === 'suspicious' 
            ? 'opacity-80 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.18)_0%,transparent_75%)]' 
            : 'opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,212,59,0.08)_0%,transparent_70%)]'
        }`} 
      />

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Network HUD Overlay */}
      <div className="absolute top-3 left-4 pointer-events-none flex flex-col gap-0.5 z-10">
        <div className="flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-full animate-ping ${
              internalMode === 'suspicious' ? 'bg-[#E53935]' : 'bg-[#FFD43B]'
            }`} 
          />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#F5F1E8]">
            {internalMode === 'suspicious' 
              ? 'ALERT: ANOMALY SWARM DETECTED' 
              : internalMode === 'held'
              ? 'STATUS: TRANSACTION FROZEN IN ESCROW'
              : 'LIVE TRANSACTION GRAPH • 240 NODES'}
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#A59E92] pl-4">
          LATENCY: 12ms • THREAT VECTOR ENGINE: ACTIVE
        </span>
      </div>

      {/* Interactive Mode Switcher for demo/presentation */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 bg-[#151515]/90 border border-[#262626] rounded-md px-2 py-1 backdrop-blur-sm">
        <button
          onClick={() => setInternalMode('normal')}
          className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
            internalMode === 'normal' ? 'bg-[#FFD43B] text-[#090909] font-bold' : 'text-[#A59E92] hover:text-[#F5F1E8]'
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => setInternalMode('suspicious')}
          className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
            internalMode === 'suspicious' ? 'bg-[#E53935] text-white font-bold' : 'text-[#A59E92] hover:text-[#E53935]'
          }`}
        >
          Threat
        </button>
        <button
          onClick={() => setInternalMode('held')}
          className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
            internalMode === 'held' ? 'bg-[#D9822B] text-black font-bold' : 'text-[#A59E92] hover:text-[#D9822B]'
          }`}
        >
          Freeze
        </button>
      </div>
    </div>
  );
};
