import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light' | 'signage';
  showTagline?: boolean;
  showCorporate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  showTagline = true,
  showCorporate = true,
}) => {
  const isLight = variant === 'light' || variant === 'signage';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Aqua Uno Teardrop with Dual Ripple Wave Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          className={
            variant === 'compact'
              ? 'w-9 h-9'
              : variant === 'signage'
              ? 'w-14 h-14'
              : 'w-11 h-11 sm:w-12 sm:h-12'
          }
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ripple Wave Arc */}
          <ellipse
            cx="50"
            cy="79"
            rx="36"
            ry="11"
            stroke={isLight ? '#E0F2FE' : '#0284C7'}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Inner Concentric Ripple Ring */}
          <ellipse
            cx="50"
            cy="71"
            rx="24"
            ry="7.5"
            stroke={isLight ? '#FFFFFF' : '#0B55B8'}
            strokeWidth="5.5"
            fill={isLight ? 'rgba(255,255,255,0.12)' : 'rgba(11,85,184,0.08)'}
          />

          {/* Central Water Teardrop - hovering above the ripples */}
          <path
            d="M50 16C50 16 31 43 31 58C31 68.4934 39.5066 76 50 76C60.4934 76 69 68.4934 69 58C69 43 50 16 50 16Z"
            fill={isLight ? '#FFFFFF' : 'url(#aquaUnoDropGrad)'}
          />

          {/* Glossy Teardrop Highlight Reflection */}
          <path
            d="M44 32C44 32 37 46 37 56C37 60 39 63 41 65C39 63 38 60 38 56C38 48 44 34 44 32Z"
            fill={isLight ? 'rgba(14,165,233,0.35)' : '#FFFFFF'}
            opacity="0.85"
          />

          <defs>
            <linearGradient
              id="aquaUnoDropGrad"
              x1="31"
              y1="16"
              x2="69"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38BDF8" />
              <stop offset="0.35" stopColor="#0EA5E9" />
              <stop offset="0.8" stopColor="#0B55B8" />
              <stop offset="1" stopColor="#083E86" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography & Official Slogan */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-tight font-heading uppercase ${
              isLight ? 'text-white' : 'text-[#0B55B8]'
            } ${
              variant === 'compact'
                ? 'text-lg sm:text-xl'
                : variant === 'signage'
                ? 'text-2xl sm:text-3xl'
                : 'text-xl sm:text-2xl tracking-tight'
            }`}
          >
            AQUA <span className={isLight ? 'text-sky-300' : 'text-sky-500'}>UNO</span>
          </span>
        </div>

        {/* Script Tagline: "Trust in Every Drop" */}
        {showTagline && (
          <span
            className={`font-script text-base sm:text-lg tracking-wide leading-none -mt-0.5 ${
              isLight ? 'text-sky-200' : 'text-sky-700'
            }`}
          >
            Trust in Every Drop
          </span>
        )}

        {/* Ephrone Industries Corporate Identity */}
        {showCorporate && variant !== 'compact' && (
          <span
            className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            By Ephrone Industries Limited
          </span>
        )}
      </div>
    </div>
  );
};
