import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiInstagram, FiFacebook, FiTwitter, FiLinkedin,
  FiMapPin, FiPhone, FiMail, FiClock,
} from 'react-icons/fi'

const socials = [
  { Icon: FiInstagram, href: '#', label: 'Instagram' },
  { Icon: FiFacebook,  href: '#', label: 'Facebook' },
  { Icon: FiTwitter,   href: '#', label: 'Twitter' },
  { Icon: FiLinkedin,  href: '#', label: 'LinkedIn' },
]

const contactInfo = [
  { Icon: FiMapPin, text: '128 Roastery Lane, Coffee Quarter, NY 10001' },
  { Icon: FiPhone,  text: '+1 (212) 555-0194' },
  { Icon: FiMail,   text: 'hello@aromaticgrounds.com' },
  { Icon: FiClock,  text: 'Mon–Sat: 7am–9pm · Sun: 8am–6pm' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [sent, setSent]     = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Attempt backend call
    fetch('http://localhost:8080/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => {
      if (!res.ok) throw new Error('API failed')
      return res.json()
    })
    .then(data => {
      console.log('Java Backend response:', data)
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    })
    .catch(err => {
      console.warn('Backend offline, using local submission simulation.', err)
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    })

    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: '#111111' }}>
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Visit Us or <span className="text-gold-gradient italic">Say Hello</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="font-playfair text-2xl font-bold text-cream mb-6">Send a Message</h3>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12"
              >
                <div className="text-5xl">☕</div>
                <p className="font-playfair text-gold-500 text-xl font-semibold">Message Sent!</p>
                <p className="font-poppins text-cream/50 text-sm text-center">
                  We'll brew a fresh response and get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-xs text-cream/50 mb-2 tracking-wide">Name</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      placeholder="Your full name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block font-poppins text-xs text-cream/50 mb-2 tracking-wide">Email</label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required
                      placeholder="your@email.com"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-poppins text-xs text-cream/50 mb-2 tracking-wide">Message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="form-input resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full mt-2" data-hover>
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-8"
          >
            {/* Contact info */}
            <div className="glass rounded-3xl p-8">
              <h3 className="font-playfair text-2xl font-bold text-cream mb-6">Find Us</h3>
              <ul className="space-y-5">
                {contactInfo.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}>
                      <Icon className="text-gold-500 text-sm" />
                    </div>
                    <p className="font-poppins text-sm text-cream/70 leading-relaxed pt-2">{text}</p>
                  </li>
                ))}
              </ul>

              {/* Social links */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
                {socials.map(({ Icon, href, label }) => (
                  <a key={label} href={href} className="social-icon" aria-label={label} data-hover>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Embedded Map (styled iframe) */}
            <div className="rounded-3xl overflow-hidden" style={{ height: '240px' }}>
              <iframe
                title="Aromatic Grounds Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0100%2C40.7050%2C-73.9900%2C40.7150&layer=mapnik"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
