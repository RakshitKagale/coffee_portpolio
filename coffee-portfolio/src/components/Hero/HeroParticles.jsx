import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 80 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 2 + 0.5,
      dx:    (Math.random() - 0.5) * 0.3,
      dy:    -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      hue:   Math.random() > 0.6 ? 43 : 25,   // gold or coffee
    }))

    let rafId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.alpha})`
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        p.alpha -= 0.0008

        if (p.y < 0 || p.alpha <= 0) {
          p.x     = Math.random() * canvas.width
          p.y     = canvas.height + 10
          p.alpha = Math.random() * 0.5 + 0.1
        }
      })
      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  )
}
