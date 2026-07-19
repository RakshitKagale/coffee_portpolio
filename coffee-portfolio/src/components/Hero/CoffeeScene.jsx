import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Coffee Cup Mesh ── */
function CoffeeCup({ mouseRef }) {
  const groupRef = useRef()
  const steamRef = useRef([])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.3

    // Mouse parallax
    if (mouseRef?.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseRef.current.y * 0.12,
        0.05
      )
      groupRef.current.rotation.y += mouseRef.current.x * 0.002
    }

    // Bob
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08
  })

  return (
    <group ref={groupRef} scale={1.4}>
      {/* Cup body */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.3, 0.7, 64, 1, false]} />
        <meshStandardMaterial
          color="#2E1F16"
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Cup rim */}
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.45, 0.025, 16, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.65, 0.08, 64]} />
        <meshStandardMaterial color="#1A0F0A" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Saucer rim gold */}
      <mesh position={[0, -0.46, 0]}>
        <torusGeometry args={[0.75, 0.015, 12, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.55, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.04, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#2E1F16" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Coffee liquid surface */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.01, 64]} />
        <meshStandardMaterial color="#1A0A05" roughness={0.05} metalness={0} />
      </mesh>

      {/* Steam particles */}
      {[...Array(6)].map((_, i) => (
        <SteamParticle key={i} index={i} />
      ))}
    </group>
  )
}

function SteamParticle({ index }) {
  const ref = useRef()
  const offset = index * (Math.PI * 2) / 6
  const speed  = 0.6 + index * 0.1

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.getElapsedTime() * speed + offset) % 2
    ref.current.position.y = 0.35 + t * 0.8
    ref.current.position.x = Math.sin(offset + t * 2) * 0.12
    ref.current.material.opacity = Math.max(0, 0.7 - t * 0.5)
    const s = 0.03 + t * 0.04
    ref.current.scale.setScalar(s)
  })

  return (
    <mesh ref={ref} position={[0, 0.35, 0]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#F5E6D3"
        transparent
        opacity={0.5}
        roughness={1}
      />
    </mesh>
  )
}

/* ── Floating Coffee Beans ── */
function CoffeeBean({ position, rotationSpeed, amplitude }) {
  const ref = useRef()
  const initY = position[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x += rotationSpeed * 0.6
    ref.current.rotation.y += rotationSpeed
    ref.current.rotation.z += rotationSpeed * 0.4
    ref.current.position.y = initY + Math.sin(t * 0.8 + amplitude) * 0.3
    ref.current.position.x = position[0] + Math.cos(t * 0.5 + amplitude) * 0.15
  })

  return (
    <group ref={ref} position={position}>
      <mesh scale={[0.18, 0.1, 0.3]} castShadow>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#3D2314" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Bean crease */}
      <mesh scale={[0.02, 0.08, 0.28]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#1A0A05" />
      </mesh>
    </group>
  )
}

/* ── Ambient Glow Sphere ── */
function GlowSphere({ color, position, intensity }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  )
}

/* ── Particle Field ── */
function ParticleField() {
  const ref   = useRef()
  const count = 120

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        color="#D4AF37"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Camera Scroll Zoom ── */
function ScrollCamera({ scrollY }) {
  const { camera } = useThree()

  useFrame(() => {
    const t = Math.min(scrollY.current / 600, 1)
    camera.position.z = THREE.MathUtils.lerp(5, 7, t)
    camera.position.y = THREE.MathUtils.lerp(0, 0.5, t)
  })

  return null
}

/* ── Main Scene ── */
const beanData = [
  { position: [-1.8, 0.6, -0.5],  rot: 0.008, amp: 0 },
  { position: [ 2.0, 0.4,  0.3],  rot: 0.006, amp: 1 },
  { position: [-1.4, -0.8, 0.8],  rot: 0.010, amp: 2 },
  { position: [ 1.6, -0.6, -0.4], rot: 0.007, amp: 3 },
  { position: [-2.2, 1.2, -0.2],  rot: 0.009, amp: 4 },
  { position: [ 1.2, 1.5,  0.6],  rot: 0.005, amp: 5 },
  { position: [-0.8, -1.6, -0.6], rot: 0.011, amp: 6 },
  { position: [ 2.4, 1.0,  -0.8], rot: 0.008, amp: 7 },
]

export default function CoffeeScene({ mouseRef, scrollY }) {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 4, 3]}  intensity={2}   color="#D4AF37" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#6F4E37" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#2E1F16" />
      <spotLight
        position={[0, 5, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#F0D060"
        castShadow
      />

      <ScrollCamera scrollY={scrollY} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <CoffeeCup mouseRef={mouseRef} />
      </Float>

      {beanData.map((b, i) => (
        <CoffeeBean
          key={i}
          position={b.position}
          rotationSpeed={b.rot}
          amplitude={b.amp}
        />
      ))}

      <GlowSphere color="#D4AF37" position={[2, 1, -2]}  intensity={1} />
      <GlowSphere color="#6F4E37" position={[-2, -1, -2]} intensity={0.8} />

      <ParticleField />

      <fog attach="fog" args={['#0F0F0F', 8, 20]} />
    </Canvas>
  )
}
