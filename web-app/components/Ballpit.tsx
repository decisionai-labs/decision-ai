'use client';

import { useRef, useEffect } from 'react';
import {
    Clock,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    SRGBColorSpace,
    MathUtils,
    Vector2,
    Vector3,
    MeshPhysicalMaterial,
    ShaderChunk,
    Color,
    Object3D,
    InstancedMesh,
    PMREMGenerator,
    SphereGeometry,
    AmbientLight,
    PointLight,
    ACESFilmicToneMapping,
    Raycaster,
    Plane
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Types
interface Size {
    width: number;
    height: number;
    wWidth: number;
    wHeight: number;
    ratio: number;
    pixelRatio: number;
}

interface TimeInfo {
    elapsed: number;
    delta: number;
}

interface BallpitConfig {
    count: number;
    colors: number[];
    ambientColor: number;
    ambientIntensity: number;
    lightIntensity: number;
    materialParams: {
        metalness: number;
        roughness: number;
        clearcoat: number;
        clearcoatRoughness: number;
    };
    minSize: number;
    maxSize: number;
    size0: number;
    gravity: number;
    friction: number;
    wallBounce: number;
    maxVelocity: number;
    maxX: number;
    maxY: number;
    maxZ: number;
    controlSphere0: boolean;
    followCursor: boolean;
}

// Three.js wrapper class
class ThreeWrapper {
    canvas: HTMLCanvasElement;
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    size: Size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
    cameraFov: number;
    cameraMaxAspect?: number;
    cameraMinAspect?: number;
    maxPixelRatio?: number;
    minPixelRatio?: number;
    onBeforeRender: (time: TimeInfo) => void = () => { };
    onAfterRender: (time: TimeInfo) => void = () => { };
    onAfterResize: (size: Size) => void = () => { };
    isDisposed = false;

    private clock = new Clock();
    private time: TimeInfo = { elapsed: 0, delta: 0 };
    private isVisible = false;
    private isRunning = false;
    private animationId?: number;
    private resizeObserver?: ResizeObserver;
    private intersectionObserver?: IntersectionObserver;
    private resizeTimeout?: ReturnType<typeof setTimeout>;

    constructor(options: { canvas: HTMLCanvasElement; size?: string; rendererOptions?: object }) {
        this.canvas = options.canvas;
        this.canvas.style.display = 'block';

        this.camera = new PerspectiveCamera();
        this.cameraFov = this.camera.fov;
        this.scene = new Scene();

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            powerPreference: 'high-performance',
            antialias: true,
            alpha: true,
            ...options.rendererOptions
        });
        this.renderer.outputColorSpace = SRGBColorSpace;

        this.resize();
        this.setupListeners(options.size);
    }

    private setupListeners(size?: string) {
        window.addEventListener('resize', this.handleResize.bind(this));

        if (size === 'parent' && this.canvas.parentElement) {
            this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
            this.resizeObserver.observe(this.canvas.parentElement);
        }

        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                this.isVisible = entries[0].isIntersecting;
                if (this.isVisible) {
                    this.start();
                } else {
                    this.stop();
                }
            },
            { threshold: 0 }
        );
        this.intersectionObserver.observe(this.canvas);

        document.addEventListener('visibilitychange', () => {
            if (this.isVisible) {
                if (document.hidden) {
                    this.stop();
                } else {
                    this.start();
                }
            }
        });
    }

    private handleResize() {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.resize(), 100);
    }

    resize() {
        const parent = this.canvas.parentElement;
        const width = parent?.offsetWidth || window.innerWidth;
        const height = parent?.offsetHeight || window.innerHeight;

        this.size.width = width;
        this.size.height = height;
        this.size.ratio = width / height;

        this.camera.aspect = this.size.ratio;
        this.camera.updateProjectionMatrix();
        this.updateWorldSize();

        this.renderer.setSize(width, height);
        let pixelRatio = window.devicePixelRatio;
        if (this.maxPixelRatio && pixelRatio > this.maxPixelRatio) pixelRatio = this.maxPixelRatio;
        if (this.minPixelRatio && pixelRatio < this.minPixelRatio) pixelRatio = this.minPixelRatio;
        this.renderer.setPixelRatio(pixelRatio);
        this.size.pixelRatio = pixelRatio;

        this.onAfterResize(this.size);
    }

    updateWorldSize() {
        const fov = (this.camera.fov * Math.PI) / 180;
        this.size.wHeight = 2 * Math.tan(fov / 2) * this.camera.position.length();
        this.size.wWidth = this.size.wHeight * this.camera.aspect;
    }

    private start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.clock.start();

        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.time.delta = this.clock.getDelta();
            this.time.elapsed += this.time.delta;
            this.onBeforeRender(this.time);
            this.renderer.render(this.scene, this.camera);
            this.onAfterRender(this.time);
        };
        animate();
    }

    private stop() {
        if (this.isRunning && this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.isRunning = false;
            this.clock.stop();
        }
    }

    clear() {
        this.scene.traverse((obj: Object3D) => {
            const mesh = obj as import('three').Mesh;
            if (mesh.isMesh) {
                if (mesh.material) {
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((mat) => mat.dispose());
                    } else {
                        mesh.material.dispose();
                    }
                }
                if (mesh.geometry) mesh.geometry.dispose();
            }
        });
        this.scene.clear();
    }

    dispose() {
        window.removeEventListener('resize', this.handleResize.bind(this));
        this.resizeObserver?.disconnect();
        this.intersectionObserver?.disconnect();
        this.stop();
        this.clear();
        this.renderer.dispose();
        this.isDisposed = true;
    }
}

// Physics class for ball simulation
class BallPhysics {
    config: BallpitConfig;
    positionData: Float32Array;
    velocityData: Float32Array;
    sizeData: Float32Array;
    center = new Vector3();

    constructor(config: BallpitConfig) {
        this.config = config;
        this.positionData = new Float32Array(3 * config.count).fill(0);
        this.velocityData = new Float32Array(3 * config.count).fill(0);
        this.sizeData = new Float32Array(config.count).fill(1);
        this.initPositions();
        this.setSizes();
    }

    private initPositions() {
        const { config, positionData } = this;
        this.center.toArray(positionData, 0);
        for (let i = 1; i < config.count; i++) {
            const idx = 3 * i;
            positionData[idx] = MathUtils.randFloatSpread(2 * config.maxX);
            positionData[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY);
            positionData[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
        }
    }

    setSizes() {
        const { config, sizeData } = this;
        sizeData[0] = config.size0;
        for (let i = 1; i < config.count; i++) {
            sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
        }
    }

    update(time: TimeInfo) {
        const { config, center, positionData, sizeData, velocityData } = this;
        const pos = new Vector3();
        const vel = new Vector3();
        const otherPos = new Vector3();
        const otherVel = new Vector3();
        const diff = new Vector3();
        const push = new Vector3();
        const sphere0Pos = new Vector3();

        let startIdx = 0;
        if (config.controlSphere0) {
            startIdx = 1;
            sphere0Pos.fromArray(positionData, 0);
            sphere0Pos.lerp(center, 0.1).toArray(positionData, 0);
            velocityData[0] = velocityData[1] = velocityData[2] = 0;
        }

        // Apply gravity and friction
        for (let i = startIdx; i < config.count; i++) {
            const base = 3 * i;
            vel.fromArray(velocityData, base);
            vel.y -= time.delta * config.gravity * sizeData[i];
            vel.multiplyScalar(config.friction);
            vel.clampLength(0, config.maxVelocity);

            pos.fromArray(positionData, base);
            pos.add(vel);
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }

        // Ball collisions
        for (let i = startIdx; i < config.count; i++) {
            const base = 3 * i;
            pos.fromArray(positionData, base);
            vel.fromArray(velocityData, base);
            const radius = sizeData[i];

            for (let j = i + 1; j < config.count; j++) {
                const otherBase = 3 * j;
                otherPos.fromArray(positionData, otherBase);
                otherVel.fromArray(velocityData, otherBase);
                const otherRadius = sizeData[j];

                diff.copy(otherPos).sub(pos);
                const dist = diff.length();
                const sumRadius = radius + otherRadius;

                if (dist < sumRadius) {
                    const overlap = sumRadius - dist;
                    push.copy(diff).normalize().multiplyScalar(0.5 * overlap);

                    pos.sub(push);
                    vel.sub(push.clone().multiplyScalar(Math.max(vel.length(), 1)));
                    pos.toArray(positionData, base);
                    vel.toArray(velocityData, base);

                    otherPos.add(push);
                    otherVel.add(push.clone().multiplyScalar(Math.max(otherVel.length(), 1)));
                    otherPos.toArray(positionData, otherBase);
                    otherVel.toArray(velocityData, otherBase);
                }
            }

            // Control sphere collision
            if (config.controlSphere0) {
                diff.copy(sphere0Pos).sub(pos);
                const dist = diff.length();
                const sumRadius = radius + sizeData[0];
                if (dist < sumRadius) {
                    push.copy(diff.normalize()).multiplyScalar(sumRadius - dist);
                    pos.sub(push);
                    vel.sub(push.clone().multiplyScalar(Math.max(vel.length(), 2)));
                }
            }

            // Wall collisions
            if (Math.abs(pos.x) + radius > config.maxX) {
                pos.x = Math.sign(pos.x) * (config.maxX - radius);
                vel.x = -vel.x * config.wallBounce;
            }
            if (config.gravity === 0) {
                if (Math.abs(pos.y) + radius > config.maxY) {
                    pos.y = Math.sign(pos.y) * (config.maxY - radius);
                    vel.y = -vel.y * config.wallBounce;
                }
            } else if (pos.y - radius < -config.maxY) {
                pos.y = -config.maxY + radius;
                vel.y = -vel.y * config.wallBounce;
            }
            if (Math.abs(pos.z) + radius > config.maxZ) {
                pos.z = Math.sign(pos.z) * (config.maxZ - radius);
                vel.z = -vel.z * config.wallBounce;
            }

            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
    }
}

// Subsurface scattering material
class SubsurfaceMaterial extends MeshPhysicalMaterial {
    uniforms = {
        thicknessDistortion: { value: 0.1 },
        thicknessAmbient: { value: 0 },
        thicknessAttenuation: { value: 0.1 },
        thicknessPower: { value: 2 },
        thicknessScale: { value: 10 }
    };

    constructor(params: import('three').MeshPhysicalMaterialParameters) {
        super(params);
        this.defines = { ...(this.defines || {}), USE_UV: '' };

        this.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, this.uniforms);
            shader.fragmentShader = `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader;

            shader.fragmentShader = shader.fragmentShader.replace(
                'void main() {',
                `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {
      `
            );

            const lightsFragment = ShaderChunk.lights_fragment_begin.replaceAll(
                'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
                `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
            );
            shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', lightsFragment);
        };
    }
}

const DEFAULT_CONFIG: BallpitConfig = {
    count: 50,
    colors: [0x14B8A6, 0xF472B6, 0x60A5FA], // teal, pink, blue
    ambientColor: 0xffffff,
    ambientIntensity: 1,
    lightIntensity: 200,
    materialParams: {
        metalness: 0.5,
        roughness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.15
    },
    minSize: 0.5,
    maxSize: 1,
    size0: 1,
    gravity: 0,
    friction: 1,
    wallBounce: 0.55,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: false,
    followCursor: true
};

// Spheres instanced mesh
class SpheresInstance extends InstancedMesh {
    config: BallpitConfig;
    physics: BallPhysics;
    ambientLight: AmbientLight;
    light: PointLight;
    private dummy = new Object3D();

    constructor(renderer: WebGLRenderer, options: Partial<BallpitConfig> = {}) {
        const config = { ...DEFAULT_CONFIG, ...options };
        const pmrem = new PMREMGenerator(renderer);
        const envMap = pmrem.fromScene(new RoomEnvironment()).texture;
        const geometry = new SphereGeometry();
        const material = new SubsurfaceMaterial({ envMap, ...config.materialParams });
        material.envMapRotation.set(-Math.PI / 2, 0, 0);

        super(geometry, material, config.count);

        this.config = config;
        this.physics = new BallPhysics(config);

        this.ambientLight = new AmbientLight(config.ambientColor, config.ambientIntensity);
        this.add(this.ambientLight);

        this.light = new PointLight(config.colors[0], config.lightIntensity);
        this.add(this.light);

        this.setColors(config.colors);
    }

    setColors(colors: number[]) {
        if (Array.isArray(colors) && colors.length > 1) {
            const colorObjs = colors.map(c => new Color(c));

            for (let i = 0; i < this.count; i++) {
                const ratio = i / this.count;
                const scaled = ratio * (colors.length - 1);
                const idx = Math.floor(scaled);
                const alpha = scaled - idx;

                const color = new Color();
                if (idx >= colors.length - 1) {
                    color.copy(colorObjs[colorObjs.length - 1]);
                } else {
                    color.r = colorObjs[idx].r + alpha * (colorObjs[idx + 1].r - colorObjs[idx].r);
                    color.g = colorObjs[idx].g + alpha * (colorObjs[idx + 1].g - colorObjs[idx].g);
                    color.b = colorObjs[idx].b + alpha * (colorObjs[idx + 1].b - colorObjs[idx].b);
                }

                this.setColorAt(i, color);
                if (i === 0) this.light.color.copy(color);
            }
            if (this.instanceColor) this.instanceColor.needsUpdate = true;
        }
    }

    update(time: TimeInfo) {
        this.physics.update(time);

        for (let i = 0; i < this.count; i++) {
            this.dummy.position.fromArray(this.physics.positionData, 3 * i);

            if (i === 0 && !this.config.followCursor) {
                this.dummy.scale.setScalar(0);
            } else {
                this.dummy.scale.setScalar(this.physics.sizeData[i]);
            }

            this.dummy.updateMatrix();
            this.setMatrixAt(i, this.dummy.matrix);

            if (i === 0) this.light.position.copy(this.dummy.position);
        }

        this.instanceMatrix.needsUpdate = true;
    }
}

// Pointer tracking
function createPointerTracker(canvas: HTMLCanvasElement, callback: (pos: Vector2, nPos: Vector2) => void, onLeave: () => void) {
    const position = new Vector2();
    const nPosition = new Vector2();
    const globalPos = new Vector2();

    const updatePosition = (rect: DOMRect) => {
        position.x = globalPos.x - rect.left;
        position.y = globalPos.y - rect.top;
        nPosition.x = (position.x / rect.width) * 2 - 1;
        nPosition.y = (-position.y / rect.height) * 2 + 1;
    };

    const isInside = (rect: DOMRect) => {
        return globalPos.x >= rect.left && globalPos.x <= rect.left + rect.width &&
            globalPos.y >= rect.top && globalPos.y <= rect.top + rect.height;
    };

    let isHovering = false;
    let isTouching = false;

    const handleMove = (e: PointerEvent) => {
        globalPos.set(e.clientX, e.clientY);
        const rect = canvas.getBoundingClientRect();
        if (isInside(rect)) {
            updatePosition(rect);
            if (!isHovering) isHovering = true;
            callback(position, nPosition);
        } else if (isHovering && !isTouching) {
            isHovering = false;
            onLeave();
        }
    };

    const handleLeave = () => {
        if (isHovering) {
            isHovering = false;
            onLeave();
        }
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            e.preventDefault();
            isTouching = true;
            globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
            const rect = canvas.getBoundingClientRect();
            if (isInside(rect)) {
                updatePosition(rect);
                isHovering = true;
                callback(position, nPosition);
            }
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            e.preventDefault();
            globalPos.set(e.touches[0].clientX, e.touches[0].clientY);
            const rect = canvas.getBoundingClientRect();
            updatePosition(rect);
            callback(position, nPosition);
        }
    };

    const handleTouchEnd = () => {
        isTouching = false;
        if (isHovering) {
            isHovering = false;
            onLeave();
        }
    };

    document.body.addEventListener('pointermove', handleMove);
    document.body.addEventListener('pointerleave', handleLeave);
    document.body.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.body.addEventListener('touchend', handleTouchEnd);
    document.body.addEventListener('touchcancel', handleTouchEnd);

    return () => {
        document.body.removeEventListener('pointermove', handleMove);
        document.body.removeEventListener('pointerleave', handleLeave);
        document.body.removeEventListener('touchstart', handleTouchStart);
        document.body.removeEventListener('touchmove', handleTouchMove);
        document.body.removeEventListener('touchend', handleTouchEnd);
        document.body.removeEventListener('touchcancel', handleTouchEnd);
    };
}

function createBallpit(canvas: HTMLCanvasElement, options: Partial<BallpitConfig> = {}) {
    const three = new ThreeWrapper({
        canvas,
        size: 'parent',
        rendererOptions: { antialias: true, alpha: true }
    });

    three.renderer.toneMapping = ACESFilmicToneMapping;
    three.camera.position.set(0, 0, 20);
    three.camera.lookAt(0, 0, 0);
    three.cameraMaxAspect = 1.5;
    three.resize();

    const spheres = new SpheresInstance(three.renderer, options);
    three.scene.add(spheres);

    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersection = new Vector3();

    canvas.style.touchAction = 'none';
    canvas.style.userSelect = 'none';
    (canvas.style as CSSStyleDeclaration & { webkitUserSelect?: string }).webkitUserSelect = 'none';

    const disposePointer = createPointerTracker(
        canvas,
        (_pos, nPos) => {
            raycaster.setFromCamera(nPos, three.camera);
            three.camera.getWorldDirection(plane.normal);
            raycaster.ray.intersectPlane(plane, intersection);
            spheres.physics.center.copy(intersection);
            spheres.config.controlSphere0 = true;
        },
        () => {
            spheres.config.controlSphere0 = false;
        }
    );

    const paused = false;

    three.onBeforeRender = (time) => {
        if (!paused) spheres.update(time);
    };

    three.onAfterResize = (size) => {
        spheres.config.maxX = size.wWidth / 2;
        spheres.config.maxY = size.wHeight / 2;
    };

    return {
        three,
        get spheres() { return spheres; },
        dispose() {
            disposePointer();
            three.dispose();
        }
    };
}

interface BallpitProps {
    className?: string;
    followCursor?: boolean;
    count?: number;
    colors?: number[];
    gravity?: number;
    friction?: number;
    wallBounce?: number;
}

export function Ballpit({
    className = '',
    followCursor = true,
    count = 50,
    colors = [0x14B8A6, 0xF472B6, 0x60A5FA],
    gravity = 0,
    friction = 1,
    wallBounce = 0.55
}: BallpitProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceRef = useRef<ReturnType<typeof createBallpit> | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        instanceRef.current = createBallpit(canvas, {
            followCursor,
            count,
            colors,
            gravity,
            friction,
            wallBounce
        });

        return () => {
            instanceRef.current?.dispose();
        };
    }, [followCursor, count, colors, gravity, friction, wallBounce]);

    return <canvas className={`${className} w-full h-full`} ref={canvasRef} />;
}

export default Ballpit;
