import { useEffect } from 'react'

export function useLenis(onScroll) {
  useEffect(() => {
    let lenis
    let rafId

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        })

        if (onScroll) {
          lenis.on('scroll', ({ scroll, progress }) => {
            onScroll({ scroll, progress })
          })
        }

        function raf(time) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)
      } catch (err) {
        console.warn('Lenis not loaded yet:', err)
      }
    }

    initLenis()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])
}
