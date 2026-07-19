import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillStar } from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    id:     1,
    name:   'Sophia Laurent',
    role:   'Food & Travel Blogger',
    avatar: '👩‍💼',
    rating: 5,
    text:   `Aromatic Grounds changed the way I think about coffee. Every visit is a ritual — the aromas, the warmth, the flavors. It's a true sensory experience unlike anything I've found anywhere else in the city.`,
    color:  '#D4AF37',
  },
  {
    id:     2,
    name:   'James Chen',
    role:   'Creative Director',
    avatar: '👨‍💻',
    rating: 5,
    text:   `I work remotely from Aromatic Grounds almost every day. The atmosphere is perfectly balanced — productive but relaxing. And the flat white? Absolutely unmatched. It's my daily meditation in a cup.`,
    color:  '#B8920A',
  },
  {
    id:     3,
    name:   'Amara Osei',
    role:   'Chef & Restaurateur',
    avatar: '👩‍🍳',
    rating: 5,
    text:   `As a chef, I'm hyper-critical of flavor. The depth and nuance in their single-origin espresso blew me away. The sourcing is impeccable and you can taste the passion in every single sip.`,
    color:  '#E8C240',
  },
  {
    id:     4,
    name:   'Marco Villanueva',
    role:   'Architect',
    avatar: '👨‍🎨',
    rating: 5,
    text:   `The interior design alone is worth the visit, but the coffee keeps me coming back. There's a precision here — like watching a master craftsman at work. Aromatic Grounds is my happy place.`,
    color:  '#D4AF37',
  },
]

function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="testimonial-card glass rounded-3xl p-8 relative flex flex-col gap-6"
      style={{
        boxShadow: isActive
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${testimonial.color}22`
          : '0 8px 24px rgba(0,0,0,0.3)',
        border: isActive
          ? `1px solid ${testimonial.color}44`
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Quote mark */}
      <div className="absolute top-6 right-8 font-playfair text-7xl font-bold leading-none opacity-10"
        style={{ color: testimonial.color }}>
        "
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <AiFillStar key={i} className="star-filled text-base" />
        ))}
      </div>

      {/* Text */}
      <p className="font-poppins text-cream/75 leading-relaxed text-sm italic relative z-10">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-auto">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${testimonial.color}33, ${testimonial.color}11)`,
            border: `1px solid ${testimonial.color}55`,
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-playfair text-cream font-semibold">{testimonial.name}</p>
          <p className="font-poppins text-xs text-cream/40">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const next = () => setCurrent((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  const resetTimer = (fn) => {
    clearInterval(timerRef.current)
    fn()
    timerRef.current = setInterval(next, 5000)
  }

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            What People Say
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Voices of <span className="text-gold-gradient italic">Satisfaction</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Desktop: 3-column floating cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} isActive={i === current} />
          ))}
        </div>

        {/* Mobile: Single card carousel */}
        <div className="md:hidden relative min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonials[current]} isActive />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-cream hover:text-gold-500 hover:border-gold-500/40 transition-colors"
            onClick={() => resetTimer(prev)}
            data-hover
          >
            <FiChevronLeft />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => resetTimer(() => setCurrent(i))}
                data-hover
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-8 h-2 bg-gold-500' : 'w-2 h-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-cream hover:text-gold-500 hover:border-gold-500/40 transition-colors"
            onClick={() => resetTimer(next)}
            data-hover
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
