import React, { useCallback, useEffect, useState } from 'react';
import { COMPANY_INFO } from '../data/waterData';
import './home.css';
import imgRange from '../assets/slides/range.jpg';
import imgRefill from '../assets/slides/refill.jpg';
import imgOneWay from '../assets/slides/oneway.jpg';
import img10L from '../assets/slides/l10.jpg';
import img5L from '../assets/slides/l5.jpg';
import img5LPack from '../assets/slides/l5pack.jpg';
import img1LPack from '../assets/slides/pack1l.jpg';
import img500Pack from '../assets/slides/pack500.jpg';
import img500ml from '../assets/slides/ml500.jpg';

interface HeroProps {
  onOrderNowClick: () => void;
}

const SLIDE_INTERVAL_MS = 3000;

export const heroSlides = [
  { key: 'range', src: imgRange, tag: 'The Range', size: '5 – 18.9 L', title: 'Every size, one source', text: 'From the 500 ml bottle to the 18.9 litre dispenser, all filled and sealed at our plant in Yatta.' },
  { key: 'refill', src: imgRefill, tag: 'Returnable', size: '18.9 L', title: 'The returnable bottle', text: 'Heavy-duty polycarbonate for homes, offices, schools and clinics. Fits every standard dispenser.' },
  { key: 'oneway', src: imgOneWay, tag: 'One-Way', size: '18.9 L', title: 'The one-way bottle', text: 'The same generous volume with no deposit and no return. Made for events and sites.' },
  { key: 'l10', src: img10L, tag: 'Family', size: '10 L', title: 'The 10 litre container', text: 'Compact enough for the kitchen counter, with a sealed, branded cap.' },
  { key: 'l5', src: img5L, tag: 'Everyday', size: '5 L', title: 'The 5 litre bottle', text: 'A carry handle for the dining table, the kitchen and the road.' },
  { key: 'l5pack', src: img5LPack, tag: 'Multipack', size: '5 L × 2', title: 'The 5 litre twin pack', text: 'Two 5 litre bottles shrink-wrapped together for bigger households.' },
  { key: 'pack1l', src: img1LPack, tag: 'Active', size: '1 L × 12', title: 'The 1 litre pack', text: 'Twelve bottles for the gym bag, the field trip and the desk.' },
  { key: 'pack500', src: img500Pack, tag: 'Events', size: '500 ml × 24', title: 'The 500 ml case', text: 'Twenty-four compact bottles for boardrooms, weddings and conferences.' },
  { key: 'ml500', src: img500ml, tag: 'Grab & go', size: '500 ml', title: 'The 500 ml bottle', text: 'The one you carry. Premium purified water in a bottle that fits any bag.' },
];

export const Hero: React.FC<HeroProps> = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const scrollToRange = useCallback(() => {
    document.getElementById('range')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleWhatsApp = useCallback(() => {
    const text = encodeURIComponent('Hi Aqua Uno! I saw your website and would like to order premium purified water.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  }, []);

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
        {heroSlides.map((slide, index) => (
          <div
            key={slide.key}
            className={`slide${index === active ? ' on' : ''}`}
            aria-hidden={index !== active}
          >
            <div className="blur" style={{ backgroundImage: `url(${slide.src})` }} />
            <div className="shade" />
            <div className="wrap sc">
              <div className="txt">
                <p className="eyebrow">{slide.tag}</p>
                <div className="size">{slide.size}</div>
                <h1>{slide.title}</h1>
                <p className="sub">{slide.text}</p>
                <div className="cta">
                  <button type="button" className="btn fill" onClick={scrollToRange}>See every size</button>
                  <button type="button" className="btn" onClick={handleWhatsApp}>Order on WhatsApp</button>
                </div>
              </div>
              <div className="frame">
                <div className="arch">
                  <img src={slide.src} alt={slide.title} fetchPriority={index === 0 ? 'high' : 'auto'} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="rail">
          <div className="wrap">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                className={`dot${index === active ? ' on' : index < active ? ' done' : ''}`}
                aria-label={`Show ${slide.title}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <em>{slide.tag}</em>
                <i />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
