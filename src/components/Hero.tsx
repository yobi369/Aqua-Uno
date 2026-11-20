import React, { useCallback, useEffect, useState } from 'react';
import { COMPANY_INFO, PRODUCTS } from '../data/waterData';
import './home.css';
import cutRefill from '../assets/cutouts/refill.webp';
import cutOneWay from '../assets/cutouts/oneway.webp';
import cut10L from '../assets/cutouts/l10.webp';
import cut5L from '../assets/cutouts/l5.webp';
import cut5LPack from '../assets/cutouts/l5pack.webp';
import cutPack1L from '../assets/cutouts/pack1l.webp';
import cut15L from '../assets/cutouts/l15.webp';
import cutPack500 from '../assets/cutouts/pack500.webp';

interface HeroProps {
  onOrderNowClick: () => void;
}

const SLIDE_INTERVAL_MS = 3000;

export const cutouts = {
  refill: cutRefill,
  oneway: cutOneWay,
  l10: cut10L,
  l5: cut5L,
  l5pack: cut5LPack,
  pack1l: cutPack1L,
  l15: cut15L,
  pack500: cutPack500,
};

interface Slide {
  key: keyof typeof cutouts;
  productId?: string;
  tag: string;
  num: string;
  unit: string;
  title: string;
  text: string;
  bg: string;
}

export const heroSlides: Slide[] = [
  { key: 'refill', productId: 'prod-20l', tag: 'Returnable', num: '18.9', unit: 'L', title: 'The Returnable Bottle', text: 'Heavy-duty and refillable. Made for homes, offices, schools and clinics.', bg: 'linear-gradient(135deg,#b9efff 0%,#e9fbff 55%,#ffffff 100%)' },
  { key: 'oneway', productId: 'prod-18l-disposable', tag: 'One-Way', num: '18.9', unit: 'L', title: 'The One-Way Bottle', text: 'Same big volume, no deposit and no return. Perfect for events and sites.', bg: 'linear-gradient(135deg,#c9e4ff 0%,#eaf4ff 60%,#fff 100%)' },
  { key: 'l10', productId: 'prod-10l', tag: 'Family', num: '10', unit: 'L', title: 'The 10 Litre Container', text: 'Compact enough for the kitchen counter. Sealed with a branded cap.', bg: 'linear-gradient(135deg,#bff3e8 0%,#e8fbf7 60%,#fff 100%)' },
  { key: 'l5pack', productId: 'prod-5l', tag: 'Everyday', num: '2×5', unit: 'L', title: 'The 5 Litre Pack', text: 'Two 5 litre bottles wrapped together, with carry handles for the table, the kitchen and the road.', bg: 'linear-gradient(135deg,#d3ecff 0%,#f0f8ff 60%,#fff 100%)' },
  { key: 'pack1l', productId: 'prod-1l-pack', tag: 'Active', num: '12×1', unit: 'L', title: 'The 1 Litre Pack', text: 'Twelve bottles for the gym bag, the field trip and the desk.', bg: 'linear-gradient(135deg,#aeeaff 0%,#e6faff 60%,#fff 100%)' },
  { key: 'l15', productId: 'prod-1-5l-pack', tag: 'Hydration', num: '12×1.5', unit: 'L', title: 'The 1.5 Litre Pack', text: 'Twelve big bottles for athletes, long drives and all-day workstations.', bg: 'linear-gradient(135deg,#bff3e8 0%,#e8fbf7 60%,#fff 100%)' },
  { key: 'pack500', productId: 'prod-500ml-pack', tag: 'Events', num: '24×500', unit: 'ml', title: 'The 500 ml Case', text: 'Twenty-four compact bottles for boardrooms, weddings and conferences.', bg: 'linear-gradient(135deg,#b7d4ff 0%,#e6efff 60%,#fff 100%)' },
];

const BUBBLES = Array.from({ length: 16 }, (_, i) => {
  const sizes = [10, 14, 18, 26, 34];
  const size = sizes[(i * 7) % sizes.length];
  return { left: (i * 37) % 95 + 2, size, dur: 9 + ((i * 5) % 10), delay: -((i * 3) % 16) };
});

const WAVE = 'M0 60 C 180 10 360 110 540 60 S 900 10 1080 60 S 1260 100 1440 60 V120 H0Z';

export const Hero: React.FC<HeroProps> = ({ onOrderNowClick }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % heroSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(next, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, next, active]);

  const scrollToRange = () => document.getElementById('range')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="aq-home">
      <section
        className={`hero${paused ? ' paused' : ''}`}
        aria-roledescription="carousel"
        aria-label="Aqua Uno products"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {heroSlides.map((slide, i) => {
          const product = PRODUCTS.find((p) => p.id === slide.productId);
          const price = product ? `${COMPANY_INFO.currency} ${product.price.toLocaleString()}` : '';
          return (
            <div
              key={slide.key}
              className={`slide${i === active ? ' on' : ''}`}
              style={{ background: slide.bg }}
              aria-hidden={i !== active}
            >
              <div className="bubbles" aria-hidden="true">
                {BUBBLES.map((b, n) => (
                  <i key={n} style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
                ))}
              </div>
              <div className="bignum" aria-hidden="true">
                {slide.num}
                <small>{slide.unit}</small>
              </div>
              <div className="wrap sc">
                <div className="txt">
                  <span className="chip">{slide.tag}</span>
                  <h1>{slide.title}</h1>
                  <p className="sub">{slide.text}</p>
                  <div className="price">{price}</div>
                  <div className="cta">
                    <button type="button" className="btn fill" onClick={onOrderNowClick} tabIndex={i === active ? 0 : -1}>Order now</button>
                    <button type="button" className="btn" onClick={scrollToRange} tabIndex={i === active ? 0 : -1}>See all sizes</button>
                  </div>
                </div>
                <div className="stage">
                  <div className="glow" />
                  <img className={`prod p-${slide.key}`} src={cutouts[slide.key]} alt={slide.title} />
                  <div className="floor" />
                </div>
              </div>
            </div>
          );
        })}

        <div className="waves" aria-hidden="true">
          <svg className="wv w1" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d={WAVE} />
            <path d={WAVE} transform="translate(1440 0)" />
          </svg>
          <svg className="wv" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d={WAVE} />
            <path d={WAVE} transform="translate(1440 0)" />
          </svg>
        </div>

        <div className="rail">
          <div className="wrap">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`dot${i === active ? ' on' : ''}${i < active ? ' done' : ''}`}
                aria-label={slide.title}
                onClick={() => setActive(i)}
              >
                <i />
                <span>{slide.tag}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
