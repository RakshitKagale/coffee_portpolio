import { useRef, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import CoffeeScene   from './CoffeeScene'
import HeroParticles from './HeroParticles'
import HeroContent   from './HeroContent'
import heroBg        from '../../assets/hero_bg.jpg'

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, #2E1F16 0%, #1A1A1A 50%, transparent 100%)',
          boxShadow: '0 0 80px rgba(212,175,55,0.3)',
          animation: 'float 4s ease-in-out infinite',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollY  = useRef(0)

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    }
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouse}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #2E1F16 0%, #1A1A1A 40%, #0F0F0F 100%)' }}
    >
      {/* Ambient gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6F4E37, transparent)' }}
        />
      </div>

      {/* Hero background image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Canvas Particles */}
      <HeroParticles />

      {/* Three.js 3D Scene */}
      <div className="absolute inset-0 z-2" style={{ zIndex: 2 }}>
        <ErrorBoundary fallback={<SceneFallback />}>
          <Suspense fallback={<SceneFallback />}>
            <CoffeeScene mouseRef={mouseRef} scrollY={scrollY} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Radial vignette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0F0F0F, transparent)' }}
      />

      {/* Hero Content — top z layer */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-20">
        <HeroContent />
      </div>

      {/* Floating CSS Coffee Beans (decorative) */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bean hidden lg:block"
          style={{
            left:       `${10 + i * 11}%`,
            top:        `${15 + (i % 3) * 25}%`,
            '--duration': `${12 + i * 2}s`,
            '--delay':    `${-i * 1.5}s`,
            opacity:    0.15 + (i % 3) * 0.08,
          }}
        />
      ))}
    </section>
  )
}
