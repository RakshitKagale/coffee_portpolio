import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fallbackMenu = {
  'Hot Coffee': [
    { name: 'Espresso',       desc: 'Double ristretto shot',              price: '$4.50' },
    { name: 'Americano',      desc: 'Espresso with hot water',            price: '$4.00' },
    { name: 'Flat White',     desc: 'Ristretto with micro-foam milk',     price: '$5.50' },
    { name: 'Cappuccino',     desc: 'Equal parts espresso, milk, foam',   price: '$5.50' },
    { name: 'Latte',          desc: 'Espresso with steamed milk',         price: '$5.00' },
    { name: 'Mocha',          desc: 'Espresso with chocolate sauce',      price: '$6.00' },
    { name: 'Macchiato',      desc: 'Espresso "stained" with foam',       price: '$5.00' },
    { name: 'Cortado',        desc: 'Equal parts espresso and warm milk', price: '$5.00' },
  ],
  'Cold Coffee': [
    { name: 'Cold Brew',        desc: '20-hour slow brewed concentrate',   price: '$5.50' },
    { name: 'Iced Latte',       desc: 'Espresso over ice with cold milk',  price: '$5.50' },
    { name: 'Nitro Cold Brew',  desc: 'Nitrogen-infused cold brew',        price: '$6.50' },
    { name: 'Iced Mocha',       desc: 'Cold espresso with chocolate',      price: '$6.50' },
    { name: 'Frappuccino',      desc: 'Blended ice coffee delight',        price: '$7.00' },
    { name: 'Iced Cappuccino',  desc: 'Cold espresso and foam over ice',   price: '$6.00' },
  ],
  Desserts: [
    { name: 'Tiramisu',          desc: 'Classic Italian coffee dessert',    price: '$8.00' },
    { name: 'Chocolate Mousse',  desc: 'Airy dark chocolate delight',       price: '$7.50' },
    { name: 'Crème Brûlée',      desc: 'Vanilla custard, caramelized top',  price: '$9.00' },
    { name: 'Opera Cake',        desc: 'French coffee & almond layered cake', price: '$8.50' },
    { name: 'Panna Cotta',       desc: 'Silky Italian cream pudding',       price: '$7.00' },
    { name: 'Coffee Macarons',   desc: 'Delicate French almond cookies',    price: '$5.00' },
  ],
  Snacks: [
    { name: 'Almond Croissant',    desc: 'Buttery, flaky, filled with almond cream', price: '$4.50' },
    { name: 'Avocado Toast',       desc: 'Sourdough with smashed avocado',           price: '$7.00' },
    { name: 'Cheese Board',        desc: 'Artisan cheeses with nuts and honey',      price: '$14.00' },
    { name: 'Bruschetta',          desc: 'Grilled bread with tomato and basil',      price: '$6.00' },
    { name: 'Granola Parfait',     desc: 'Greek yogurt with seasonal berries',       price: '$7.50' },
    { name: 'Dark Chocolate Bar',  desc: '70% single-origin cacao',                 price: '$4.00' },
  ],
}

export default function Menu() {
  const [menuData, setMenuData] = useState(fallbackMenu)
  const [categories, setCategories] = useState(Object.keys(fallbackMenu))
  const [activeTab, setActiveTab] = useState(categories[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/menu')
      .then((res) => {
        if (!res.ok) throw new Error('API failed')
        return res.json()
      })
      .then((data) => {
        setMenuData(data)
        const cats = Object.keys(data)
        setCategories(cats)
        setActiveTab(cats[0])
        setLoading(false)
      })
      .catch((err) => {
        console.warn('Backend API offline. Using premium fallback menu data.', err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="menu" className="section-padding relative overflow-hidden" style={{ background: '#111111' }}>
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6F4E37, transparent)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="font-poppins text-xs tracking-[0.3em] uppercase text-gold-500 mb-4 block">
            Full Menu
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Explore Our <span className="text-gold-gradient italic">Offerings</span>
          </h2>
          <div className="gold-line" />
        </motion.div>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`menu-tab ${activeTab === cat ? 'active' : ''}`}
              data-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {menuData[activeTab] && menuData[activeTab].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group flex items-start gap-4 p-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-300 cursor-none"
                data-hover
              >
                {/* Dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-playfair text-cream font-semibold text-lg group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-playfair text-gold-500 font-bold text-lg flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-poppins text-xs text-cream/40 mt-0.5">{item.desc}</p>

                  {/* Animated underline */}
                  <div className="h-px bg-gradient-to-r from-gold-500/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 mt-2" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-gold" data-hover>View Full Menu</button>
        </div>
      </div>
    </section>
  )
}

