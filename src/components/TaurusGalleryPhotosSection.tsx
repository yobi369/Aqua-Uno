import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/waterData';
import { TAURUS_GALLERY_PHOTOS, TaurusGalleryCategory } from '../data/taurusGalleryPhotos';

interface TaurusGalleryPhotosSectionProps {
  compact?: boolean;
}

const categories: Array<'All' | TaurusGalleryCategory> = [
  'All',
  'Products',
  'Facility',
  'Team',
  'Production',
];

export const TaurusGalleryPhotosSection: React.FC<TaurusGalleryPhotosSectionProps> = ({
  compact = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | TaurusGalleryCategory>('All');
  const homePhotos = [
    ...TAURUS_GALLERY_PHOTOS.filter((photo) => photo.category === 'Products').slice(0, 2),
    ...TAURUS_GALLERY_PHOTOS.filter((photo) => photo.category === 'Facility').slice(0, 2),
    ...TAURUS_GALLERY_PHOTOS.filter((photo) => photo.category === 'Team').slice(0, 1),
    ...TAURUS_GALLERY_PHOTOS.filter((photo) => photo.category === 'Production').slice(0, 1),
  ];
  const photos = compact
    ? homePhotos
    : activeCategory === 'All'
      ? TAURUS_GALLERY_PHOTOS
      : TAURUS_GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  return (
    <section
      id={compact ? undefined : 'photo-gallery'}
      className={`py-16 border-b border-slate-200/80 ${compact ? 'bg-white' : 'bg-slate-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
              Photos by Taurus Arts
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              {compact ? 'Aqua Uno, Up Close' : 'Inside Aqua Uno'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {compact
                ? 'A glimpse of our water, our people, and the place where it all comes together.'
                : 'Explore real moments from our products, facility, team, and production floor.'}
            </p>
          </div>
          {compact ? (
            <a
              href="/about#photo-gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              Explore the photo gallery <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <a
              href={COMPANY_INFO.pixiesetGalleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              Open full Taurus Arts gallery <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-2 mb-6" aria-label="Filter photo gallery">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700'
                }`}
              >
                {category === 'All' ? 'All Photos' : category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {photos.map((photo) => (
            <a
              key={photo.image}
              href={COMPANY_INFO.pixiesetGalleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-200 aspect-[4/3]"
              aria-label={`${photo.title} — open the Taurus Arts gallery`}
            >
              <img
                src={photo.image}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2">
                <div>
                  {!compact && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      {photo.category}
                    </span>
                  )}
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    {photo.title}
                  </h3>
                </div>
                <ExternalLink className="w-4 h-4 text-white/80 shrink-0 mb-0.5" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
