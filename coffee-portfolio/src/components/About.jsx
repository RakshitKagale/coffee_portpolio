import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import aboutImg from '../assets/about_coffee.jpg'

const stats = [
  { value: 20,   suffix: '+', label: 'Years Experience' },
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 100,  suffix: '+', label: 'Coffee Varieties' },
]

function CounterNumber({ value, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const step = value / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span className="counter-number">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: '#0F0F0F' }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            Our Story
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
            Crafted with <span className="text-gold-gradient italic">Passion</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
              <img
                src={aboutImg}
                alt="Premium coffee craftsmanship at Aromatic Grounds roastery"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top right, rgba(46,31,22,0.6), transparent)' }} />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass p-5 rounded-2xl"
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
              <div className="text-gold-500 text-3xl mb-1">☕</div>
              <p className="font-playfair text-cream font-semibold text-sm">Master Roaster</p>
              <p className="font-poppins text-cream/50 text-xs">Single-origin beans</p>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border border-gold-500/20 pointer-events-none animate-spin-slow" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-poppins text-coffee-100/70 leading-relaxed text-lg mb-6">
              Since 2003, Aromatic Grounds has been at the forefront of the specialty coffee movement.
              We source our beans directly from the world's finest coffee-growing regions — from the
              misty highlands of Ethiopia to the volcanic slopes of Guatemala.
            </p>
            <p className="font-poppins text-coffee-100/70 leading-relaxed mb-10">
              Every step of our process is meticulously crafted. Our master roasters coax out the unique
              character of each bean — its terroir, its sweetness, its complexity — to deliver a cup that
              transcends the ordinary and becomes an experience unto itself.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-12">
              {['Direct-trade single origin beans', 'Small-batch roasting for peak freshness', 'Ethically sourced, sustainably grown'].map((item) => (
                <li key={item} className="flex items-center gap-3 font-poppins text-cream/80 text-sm">
                  <span className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-500 text-xs flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div ref={ref} className="grid grid-cols-3 gap-6">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="text-center">
                  <CounterNumber value={value} suffix={suffix} inView={inView} />
                  <p className="font-poppins text-xs text-cream/50 mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
