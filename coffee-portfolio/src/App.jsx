import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis }        from './hooks/useLenis'
import Cursor             from './components/Cursor'
import Navbar             from './components/Navbar'
import Hero               from './components/Hero/Hero'
import About              from './components/About'
import CoffeeCollection   from './components/CoffeeCollection'
import Menu               from './components/Menu'
import Gallery            from './components/Gallery'
import Testimonials       from './components/Testimonials'
import Contact            from './components/Contact'
import Footer             from './components/Footer'

/* ─── Loading Screen ─── */
function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return p + Math.random() * 8 + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-6xl animate-float">☕</div>
        <p className="font-playfair text-2xl font-bold text-gold-gradient">
          Aromatic Grounds
        </p>
        <p className="font-poppins text-xs tracking-[0.3em] text-cream/40 uppercase">
          Brewing your experience...
        </p>
        <div className="loader-ring mt-4" />
        <div className="w-48 h-0.5 bg-dark-100 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <span className="font-poppins text-xs text-cream/30 tabular-nums">
          {Math.min(100, Math.floor(progress))}%
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Mouse Glow ─── */
function MouseGlow() {
  useEffect(() => {
    let rafId
    const glow = document.getElementById('mouse-glow')
    if (!glow) return

    let mx = 0, my = 0, cx = 0, cy = 0

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      cx += (mx - cx) * 0.08
      cy += (my - cy) * 0.08
      glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      id="mouse-glow"
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full z-0"
      style={{
        background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        transition: 'none',
      }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useLenis()

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Cursor />
          <MouseGlow />
          <Navbar />
          <main>
            <Hero />
            <About />
            <CoffeeCollection />
            <Menu />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
