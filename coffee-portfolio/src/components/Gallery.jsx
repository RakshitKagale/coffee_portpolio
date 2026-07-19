import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gallery1 from '../assets/gallery_1.jpg'
import gallery2 from '../assets/gallery_2.jpg'
import gallery3 from '../assets/gallery_3.jpg'
import gallery4 from '../assets/gallery_4.jpg'

// Gallery items — mix real images with styled CSS placeholders
const galleryItems = [
  {
    id: 1,
    img: gallery1,
    alt: 'Overhead flat lay cappuccino with latte art',
    height: 'h-64',
  },
  {
    id: 2,
    img: gallery2,
    alt: 'Barista pouring latte art into espresso',
    height: 'h-80',
  },
  {
    id: 3,
    img: gallery3,
    alt: 'Close-up of freshly roasted coffee beans',
    height: 'h-56',
  },
  {
    id: 4,
    img: gallery4,
    alt: 'Luxury coffee shop interior at night',
    height: 'h-72',
  },
  {
    id: 5,
    img: null,
    alt: 'Iced cold brew coffee with mint',
    height: 'h-60',
    bg: 'linear-gradient(135deg, #0D1F2D 0%, #1A3A4A 50%, #0D2A35 100%)',
    label: 'Cold Brew',
    emoji: '🧊',
  },
  {
    id: 6,
    img: null,
    alt: 'Morning coffee with golden sunlight',
    height: 'h-72',
    bg: 'linear-gradient(135deg, #2E1F16 0%, #6F4E37 50%, #3D2314 100%)',
    label: 'Morning Ritual',
    emoji: '🌅',
  },
  {
    id: 7,
    img: null,
    alt: 'Espresso machine gleaming in café',
    height: 'h-64',
    bg: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 50%, #111 100%)',
    label: 'The Machine',
    emoji: '⚙️',
  },
  {
    id: 8,
    img: null,
    alt: 'Latte art heart in white foam',
    height: 'h-80',
    bg: 'linear-gradient(135deg, #3D2314 0%, #2E1F16 40%, #1A0F0A 100%)',
    label: 'Latte Art',
    emoji: '❤️',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox  = (item) => setLightbox(item)
  const closeLightbox = () => setLightbox(null)

  return (
    <section id="gallery" className="section-padding relative" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            Visual Story
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Our <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`masonry-item ${item.height} cursor-none`}
              onClick={() => openLightbox(item)}
              data-hover
            >
              {item.img ? (
                <>
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-poppins glass px-4 py-2 rounded-full">
                      View
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className={`w-full ${item.height} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}
                  style={{ background: item.bg }}
                >
                  <div className="text-5xl">{item.emoji}</div>
                  <span className="font-playfair text-cream text-xl font-semibold">{item.label}</span>
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(212,175,55,0.08)' }} />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 flex items-end p-4 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                <p className="font-poppins text-cream text-xs">{item.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.img ? (
                <img src={lightbox.img} alt={lightbox.alt} className="w-full h-full object-contain" />
              ) : (
                <div
                  className="w-full h-[60vh] flex flex-col items-center justify-center gap-4"
                  style={{ background: lightbox.bg }}
                >
                  <div className="text-8xl">{lightbox.emoji}</div>
                  <h3 className="font-playfair text-cream text-3xl font-bold">{lightbox.label}</h3>
                </div>
              )}
              <button
                className="absolute top-4 right-4 w-10 h-10 glass rounded-full text-cream flex items-center justify-center text-xl"
                onClick={closeLightbox}
                data-hover
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
