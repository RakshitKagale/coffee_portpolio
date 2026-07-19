import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible:  { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } },
}

export default function HeroContent() {
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      style={{ pointerEvents: 'none' }}
    >
      {/* Pre-badge */}
      <motion.div variants={itemVariants} className="mb-6">
        <span className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-gold-400 text-xs font-poppins font-medium tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
          Est. 2003 · Premium Roastery
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
      >
        <span className="block text-cream">Experience the</span>
        <span className="block text-shimmer">Art of Premium</span>
        <span className="block text-cream italic">Coffee</span>
      </motion.h1>

      {/* Divider */}
      <motion.div variants={itemVariants} className="gold-line w-20 h-0.5 mb-6" />

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="font-poppins text-base sm:text-lg text-coffee-100/70 max-w-xl leading-relaxed mb-10"
      >
        Every cup tells a story. Freshly roasted beans crafted with passion,
        brought to life by the hands of master artisans.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
        style={{ pointerEvents: 'all' }}
      >
        <button
          className="btn-gold text-base animate-glow-pulse"
          data-hover
          onClick={() => handleScroll('coffee')}
        >
          Explore Menu
        </button>
        <button
          className="btn-ghost text-base"
          data-hover
          onClick={() => handleScroll('contact')}
        >
          Order Now
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-16 flex flex-col items-center gap-2 opacity-60"
        style={{ pointerEvents: 'all' }}
      >
        <span className="font-poppins text-xs tracking-widest uppercase text-cream/50">Scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent animate-pulse" />
      </motion.div>
    </motion.div>
  )
}
