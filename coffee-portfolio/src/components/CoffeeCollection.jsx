import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { AiFillStar } from 'react-icons/ai'

const coffees = [
  {
    name:        'Espresso',
    description: 'Rich, concentrated shot of pure coffee perfection.',
    price:       '$4.50',
    rating:      5,
    icon:        '☕',
    gradient:    'from-amber-900/40 to-coffee-800/40',
    accent:      '#D4AF37',
  },
  {
    name:        'Cappuccino',
    description: 'Velvety espresso crowned with perfectly steamed milk foam.',
    price:       '$5.50',
    rating:      5,
    icon:        '🍵',
    gradient:    'from-coffee-700/30 to-coffee-900/30',
    accent:      '#B8920A',
  },
  {
    name:        'Latte',
    description: 'Smooth espresso blended with silky steamed milk.',
    price:       '$5.00',
    rating:      4,
    icon:        '☕',
    gradient:    'from-amber-800/30 to-dark-300/40',
    accent:      '#E8C240',
  },
  {
    name:        'Mocha',
    description: 'Indulgent fusion of espresso, chocolate and steamed milk.',
    price:       '$6.00',
    rating:      5,
    icon:        '🍫',
    gradient:    'from-stone-800/40 to-coffee-900/40',
    accent:      '#D4AF37',
  },
  {
    name:        'Americano',
    description: 'Bold espresso diluted to a smooth, full-bodied brew.',
    price:       '$4.00',
    rating:      4,
    icon:        '☕',
    gradient:    'from-coffee-800/30 to-dark-400/40',
    accent:      '#F0D060',
  },
  {
    name:        'Flat White',
    description: 'Micro-foam milk poured over a ristretto shot. Perfection.',
    price:       '$5.50',
    rating:      5,
    icon:        '🥛',
    gradient:    'from-amber-900/30 to-coffee-700/30',
    accent:      '#D4AF37',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        s <= rating
          ? <AiFillStar key={s} className="star-filled text-sm" />
          : <FiStar     key={s} className="star-empty  text-sm" />
      ))}
    </div>
  )
}

function CoffeeCard({ coffee, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{
        y: -12,
        rotateX: -4,
        rotateY: 4,
        scale: 1.02,
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative group cursor-none"
      data-hover
    >
      <div
        className={`glass rounded-3xl p-7 h-full flex flex-col gap-4 bg-gradient-to-br ${coffee.gradient} transition-all duration-500`}
        style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)` }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 40px ${coffee.accent}33, 0 0 80px ${coffee.accent}1A` }}
        />

        {/* Icon badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: `linear-gradient(135deg, ${coffee.accent}22, ${coffee.accent}11)`,
            border: `1px solid ${coffee.accent}44`,
          }}
        >
          {coffee.icon}
        </div>

        {/* Name + Rating */}
        <div>
          <h3 className="font-playfair text-2xl font-bold text-cream mb-1">{coffee.name}</h3>
          <StarRating rating={coffee.rating} />
        </div>

        {/* Description */}
        <p className="font-poppins text-sm text-cream/60 leading-relaxed flex-1">
          {coffee.description}
        </p>

        {/* Price + Order */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="font-playfair text-2xl font-bold text-gold-gradient">
            {coffee.price}
          </span>
          <button
            className="btn-gold text-xs py-2 px-5"
            data-hover
            style={{ boxShadow: `0 0 20px ${coffee.accent}44` }}
          >
            Order
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CoffeeCollection() {
  return (
    <section id="coffee" className="section-padding relative" style={{ background: '#0D0D0D' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            Signature Blends
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Our <span className="text-gold-gradient italic">Coffee</span> Collection
          </h2>
          <p className="font-poppins text-cream/50 max-w-lg mx-auto text-sm leading-relaxed">
            Each variety in our collection is a masterpiece — roasted to perfection and served with care.
          </p>
          <div className="gold-line" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffees.map((coffee, i) => (
            <CoffeeCard key={coffee.name} coffee={coffee} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
