import React, { useEffect, useRef } from 'react';
import { COMPANY_INFO, PRODUCTS } from '../data/waterData';
import './home.css';
import { cutouts } from './Hero';
import aerial from '../assets/images/ephrone_plant_aerial.jpg';
import pallets from '../assets/images/aqua_uno_warehouse_pallets.jpg';
import gate from '../assets/images/ephrone_gate_entrance.jpg';

const TILES: { id: string; key: keyof typeof cutouts; badge: string }[] = [
  { id: 'prod-20l', key: 'refill', badge: '18.9 L' },
  { id: 'prod-18l-disposable', key: 'oneway', badge: '18.9 L' },
  { id: 'prod-10l', key: 'l10', badge: '10 L' },
  { id: 'prod-5l', key: 'l5', badge: '5 L' },
  { id: 'prod-1l-pack', key: 'pack1l', badge: '12 × 1 L' },
  { id: 'prod-500ml-pack', key: 'pack500', badge: '24 × 500 ml' },
];

const LINEUP: { key: keyof typeof cutouts; label: string; h: number }[] = [
  { key: 'ml500', label: '500 ml', h: 0.4 },
  { key: 'l5', label: '5 L', h: 0.58 },
  { key: 'l10', label: '10 L', h: 0.78 },
  { key: 'oneway', label: '18.9 L one-way', h: 1 },
  { key: 'refill', label: '18.9 L refill', h: 1 },
];

const STORY_PHOTOS = [
  { src: aerial, label: 'The plant', alt: 'Aerial view of the Ephron Industries plant' },
  { src: pallets, label: 'The warehouse', alt: 'Pallets of Aqua Uno water in the warehouse' },
  { src: gate, label: 'The gate', alt: 'The Aqua Uno entrance gate' },
];

const WAVE = 'M0 60 C 180 10 360 110 540 60 S 900 10 1080 60 S 1260 100 1440 60 V120 H0Z';

export const HomeShowcase: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('[data-par]'));
    const update = () => {
      const h = window.innerHeight;
      images.forEach((img) => {
        const box = img.parentElement?.getBoundingClientRect();
        if (!box) return;
        const progress = (box.top + box.height / 2 - h / 2) / h;
        img.style.transform = `translateY(${(progress * -9).toFixed(2)}%)`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: MouseEvent) => {
      down = true;
      startX = e.pageX;
      startLeft = gallery.scrollLeft;
      gallery.style.scrollSnapType = 'none';
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      gallery.style.scrollSnapType = '';
    };
    const onMove = (e: MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      gallery.scrollLeft = startLeft - (e.pageX - startX);
    };
    gallery.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    gallery.addEventListener('mousemove', onMove);
    return () => {
      gallery.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      gallery.removeEventListener('mousemove', onMove);
    };
  }, []);

  const scrollGallery = (direction: 1 | -1) => {
    galleryRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Aqua Uno! I would like to place an order for water delivery.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="aq-home" ref={rootRef}>
      <section className="sec" id="range">
        <div className="head reveal">
          <p className="eyebrow">What we sell</p>
          <h2>Pure water in every size</h2>
          <p>From a pocket-sized 500&nbsp;ml to the 18.9&nbsp;litre dispenser bottle. Swipe or use the arrows.</p>
        </div>
        <div className="gal" ref={galleryRef}>
          {TILES.map((tile) => {
            const product = PRODUCTS.find((p) => p.id === tile.id);
            if (!product) return null;
            return (
              <article key={tile.id} className="card reveal">
                <div className="cimg">
                  <span className="cb">{tile.badge}</span>
                  <img src={cutouts[tile.key]} alt={product.name} loading="lazy" draggable={false} />
                </div>
                <h3>{product.name}</h3>
                <div className="row">
                  <b>
                    {COMPANY_INFO.currency} {product.price.toLocaleString()}
                  </b>
                  <a href="/products">Order &rarr;</a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="arrows">
          <button type="button" aria-label="Previous sizes" onClick={() => scrollGallery(-1)}>&larr;</button>
          <button type="button" aria-label="Next sizes" onClick={() => scrollGallery(1)}>&rarr;</button>
        </div>
      </section>

      <section className="scale" id="scale">
        <div className="wrap">
          <div className="head reveal">
            <p className="eyebrow">The range, to scale</p>
            <h2>Find the size that fits your day</h2>
          </div>
          <div className="lineup reveal">
            {LINEUP.map((item) => (
              <a key={item.label} className="lu" href="/products" style={{ '--h': item.h } as React.CSSProperties}>
                <img src={cutouts[item.key]} alt={item.label} draggable={false} />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="facts reveal">
          <div>
            <h3>Bottled at source</h3>
            <p>Filled and sealed at our own plant in Yatta, Machakos.</p>
          </div>
          <div>
            <h3>Sealed for safety</h3>
            <p>Every bottle carries a branded tamper-evident seal.</p>
          </div>
          <div>
            <h3>Delivered to you</h3>
            <p>Homes, offices, schools and events. Order on WhatsApp.</p>
          </div>
        </div>
      </div>

      <section className="sec story" id="source">
        <div className="wrap">
          <div className="stick reveal">
            <p className="eyebrow">From source to door</p>
            <h2>Made here. Delivered to you.</h2>
            <ul>
              <li><b>1</b><span>Sourced and purified at Ephron Industries, Yatta.</span></li>
              <li><b>2</b><span>Filled by contactless machines and sealed.</span></li>
              <li><b>3</b><span>Stored on pallets, then delivered to your door.</span></li>
            </ul>
            <div className="zones">
              <i>Nairobi</i>
              <i>Kiambu</i>
              <i>Central</i>
              <i>Rift Valley</i>
            </div>
          </div>
          <div className="stack">
            {STORY_PHOTOS.map((photo) => (
              <div key={photo.label} className="ph reveal">
                <img data-par src={photo.src} alt={photo.alt} loading="lazy" />
                <span>{photo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="order" id="order">
        <div className="waves" aria-hidden="true">
          <svg className="wv" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d={WAVE} />
            <path d={WAVE} transform="translate(1440 0)" />
          </svg>
        </div>
        <div className="wrap reveal">
          <p className="eyebrow" style={{ color: '#bff0ff' }}>Order now</p>
          <h2>Fresh water at your door</h2>
          <p>Message us on WhatsApp with your size and location. Free delivery on 2 or more 18.9&nbsp;L bottles.</p>
          <div className="cta">
            <button type="button" className="btn fill" onClick={handleWhatsApp}>
              WhatsApp {COMPANY_INFO.phoneDisplay}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
