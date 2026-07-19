import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi'

const quickLinks = ['Home', 'About', 'Coffee', 'Menu', 'Gallery', 'Testimonials', 'Contact']
const coffeeLinks = ['Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Americano', 'Cold Brew']

const socials = [
  { Icon: FiInstagram, href: '#' },
  { Icon: FiFacebook,  href: '#' },
  { Icon: FiTwitter,   href: '#' },
  { Icon: FiLinkedin,  href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
      {/* Coffee Bean Divider */}
      <div className="bean-divider px-8 pt-12 pb-0">
        <span className="text-2xl animate-spin-slow select-none">☕</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-dark-500 font-playfair font-bold text-xl">
                A
              </div>
              <span className="font-playfair text-xl font-bold text-gold-gradient">
                Aromatic Grounds
              </span>
            </div>
            <p className="font-poppins text-xs text-cream/40 leading-relaxed mb-6">
              Experience the art of premium coffee. Every cup tells a story, crafted with passion and served with care since 2003.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="social-icon" data-hover>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-cream font-semibold text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-poppins text-sm text-cream/40 hover:text-gold-400 transition-colors duration-300"
                    data-hover
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Coffee */}
          <div>
            <h4 className="font-playfair text-cream font-semibold text-base mb-5">Our Coffee</h4>
            <ul className="space-y-3">
              {coffeeLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#coffee"
                    className="font-poppins text-sm text-cream/40 hover:text-gold-400 transition-colors duration-300"
                    data-hover
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-cream font-semibold text-base mb-5">Contact</h4>
            <ul className="space-y-3 font-poppins text-sm text-cream/40">
              <li>128 Roastery Lane</li>
              <li>Coffee Quarter, NY 10001</li>
              <li className="pt-2">
                <a href="tel:+12125550194" className="hover:text-gold-400 transition-colors" data-hover>
                  +1 (212) 555-0194
                </a>
              </li>
              <li>
                <a href="mailto:hello@aromaticgrounds.com" className="hover:text-gold-400 transition-colors" data-hover>
                  hello@aromaticgrounds.com
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                Mon–Sat: 7am–9pm<br />
                Sunday: 8am–6pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bean-divider mt-12 mb-8">
          <span className="text-lg select-none opacity-30">✦</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-poppins text-xs text-cream/30">
            © {year} Aromatic Grounds. All rights reserved.
          </p>
          <p className="font-poppins text-xs text-cream/20">
            Crafted with ☕ and passion
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a key={t} href="#" className="font-poppins text-xs text-cream/30 hover:text-gold-500 transition-colors" data-hover>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
