import React, { useEffect, useRef } from 'react';
import { COMPANY_INFO, PRODUCTS } from '../data/waterData';
import './home.css';
import facade from '../assets/images/aqua_uno_factory_facade.jpg';
import aerial from '../assets/images/ephrone_plant_aerial.jpg';
import pallets from '../assets/images/aqua_uno_warehouse_pallets.jpg';
import gate from '../assets/images/ephrone_gate_entrance.jpg';
import imgRefill from '../assets/slides/refill.jpg';
import imgOneWay from '../assets/slides/oneway.jpg';
import img10L from '../assets/slides/l10.jpg';
import img5L from '../assets/slides/l5.jpg';
import img1LPack from '../assets/slides/pack1l.jpg';
import img500Pack from '../assets/slides/pack500.jpg';

const TICKER = ['500 ML', '1 L', '5 L', '10 L', '18.9 L', 'RETURNABLE', 'ONE-WAY', 'DELIVERED'];

const TILES = [
  { id: 'prod-20l', src: imgRefill, badge: '18.9 L' },
  { id: 'prod-18l-disposable', src: imgOneWay, badge: '18.9 L' },
  { id: 'prod-10l', src: img10L, badge: '10 L' },
  { id: 'prod-5l', src: img5L, badge: '5 L' },
  { id: 'prod-1l-pack', src: img1LPack, badge: '12 × 1 L' },
  { id: 'prod-500ml-pack', src: img500Pack, badge: '24 × 500 ml' },
];

const STORY_PHOTOS = [
  { src: aerial, label: 'The plant', alt: 'Aerial view of the Ephron Industries plant' },
  { src: pallets, label: 'The warehouse', alt: 'Pallets of Aqua Uno water in the warehouse' },
  { src: gate, label: 'The gate', alt: 'The Aqua Uno entrance gate' },
];

export const HomeShowcase: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Reveal on scroll
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

  // Gentle parallax on the story photos
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

  // Drag to scroll the gallery
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
    galleryRef.current?.scrollBy({ left: direction * 330, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hello Aqua Uno! I would like to place an order for water delivery.');
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="aq-home" ref={rootRef}>
      <div className="ticker" aria-hidden="true">
        <div>
          {[0, 1, 2, 3].map((n) => (
            <React.Fragment key={n}>
              {TICKER.map((word) => (
                <React.Fragment key={word}>
                  <span>{word}</span>
                  <em>◆</em>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className="sec" id="range">
        <div className="head reveal">
          <p className="eyebrow">What we sell</p>
          <h2>One source. Six sizes.</h2>
          <p>Premium purified drinking water in every size your day needs. Swipe or use the arrows.</p>
        </div>
        <div className="gal" ref={galleryRef}>
          {TILES.map((tile) => {
            const product = PRODUCTS.find((p) => p.id === tile.id);
            if (!product) return null;
            return (
              <article key={tile.id} className="tile reveal">
                <div className="arch">
                  <span className="badge">{tile.badge}</span>
                  <img src={tile.src} alt={product.name} loading="lazy" draggable={false} />
                </div>
                <h3>{product.name}</h3>
                <div className="row">
                  <b>
                    {COMPANY_INFO.currency} {product.price.toLocaleString()}
                  </b>
                  <a href="/products">Order →</a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="arrows">
          <button type="button" aria-label="Previous sizes" onClick={() => scrollGallery(-1)}>←</button>
          <button type="button" aria-label="Next sizes" onClick={() => scrollGallery(1)}>→</button>
        </div>
      </section>

      <div className="wrap reveal">
        <div className="facts">
          <div>
            <h3>Bottled at source</h3>
            <p>Filled and sealed at our own plant in Yatta, Machakos.</p>
          </div>
          <div>
            <h3>Sealed and tamper-evident</h3>
            <p>Every bottle carries a branded safety seal.</p>
          </div>
          <div>
            <h3>Delivered to your door</h3>
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
              <li><b>I</b><span>Sourced and purified at Ephron Industries, Yatta.</span></li>
              <li><b>II</b><span>Filled by contactless machines and sealed.</span></li>
              <li><b>III</b><span>Stored on pallets, then delivered to your door.</span></li>
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

      <section className="order" id="order" style={{ ['--order-bg' as string]: `url(${facade})` }}>
        <div className="wrap reveal">
          <p className="eyebrow">Order now</p>
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
