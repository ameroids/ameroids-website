import { brands } from '../data/content.js'
import {
  HeartPulse,
  GraduationCap,
  Store,
  Factory,
  Landmark,
  Utensils,
  Hotel,
  Building,
  Truck,
  Rocket,
  Globe2,
  ShoppingCart
} from 'lucide-react'

const iconMap = {
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Retail: Store,
  Manufacturing: Factory,
  Finance: Landmark,
  Restaurants: Utensils,
  Hospitality: Hotel,
  'Real Estate': Building,
  Logistics: Truck,
  Startups: Rocket,
  NGOs: Globe2,
  'E-Commerce': ShoppingCart,
}

export default function Brands() {
  const loop = [...brands, ...brands]
  return (
    <section className="brands" id="brands" aria-label="Brands and companies we serve">
      <div className="container brands__head">
        <p>Trusted Carrying &amp; Forwarding partner for</p>
      </div>
      <div className="brands__marquee" role="presentation">
        <div className="brands__track">
          {loop.map((b, i) => {
            const IconComponent = iconMap[b.name] || Globe2
            return (
              <span className="brands__chip" key={`${b.short}-${i}`} aria-hidden={i >= brands.length}>
                <div style={{ background: 'var(--brand-950)', color: 'var(--brand-400)', padding: '4px', borderRadius: '5px', display: 'flex' }}>
                  <IconComponent size={14} strokeWidth={2.5} />
                </div>
                {b.name}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
