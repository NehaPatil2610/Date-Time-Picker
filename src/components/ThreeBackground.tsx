import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 1. Setup Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // 2. Add Geometry (Premium Crystalline Knot)
        const geometry = new THREE.TorusKnotGeometry(2.5, 0.7, 100, 16);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x8b5cf6,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.4,
            wireframe: true,
            emissive: 0x06b6d4,
            emissiveIntensity: 0.5
        });

        const crystal = new THREE.Mesh(geometry, material);
        scene.add(crystal);

        // Add dense glowing dust
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 250;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 25;
            colorArray[i] = Math.random();
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // 3. Add Vivid Lights
        const mainLight = new THREE.PointLight(0x8b5cf6, 2, 50);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        const secondaryLight = new THREE.PointLight(0xd946ef, 2, 50);
        secondaryLight.position.set(-5, -5, 5);
        scene.add(secondaryLight);

        scene.add(new THREE.AmbientLight(0xffffff, 0.2));

        // 4. Interaction & Movement
        camera.position.z = 10;
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let baseRotation = 0;
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            
            baseRotation += 0.005;

            // Smoothly move towards target rotation
            crystal.rotation.y += (baseRotation + mouse.x * 0.8 - crystal.rotation.y) * 0.05;
            crystal.rotation.x += (baseRotation * 0.5 - mouse.y * 0.8 - crystal.rotation.x) * 0.05;
            
            particles.rotation.y -= 0.0002;
            particles.rotation.z += 0.0001;

            const time = Date.now() * 0.001;
            crystal.position.y = Math.sin(time * 0.5) * 0.8;
            crystal.position.x = Math.cos(time * 0.3) * 0.5;

            renderer.render(scene, camera);
        };


        animate();

        // 5. Cleanup & Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

