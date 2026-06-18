import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showText?: boolean;
  textColorClass?: string;
  iconOnly?: boolean;
}

export default function AestheticTanguaLogo({
  className = '',
  size = 'md',
  showText = true,
  textColorClass = 'text-gray-950',
  iconOnly = false,
}: LogoProps) {
  // Dimensions based on size preset
  const dimensions = {
    sm: { iconWidth: 40, iconHeight: 40, textClass: 'text-lg', subTextClass: 'text-[8px]' },
    md: { iconWidth: 52, iconHeight: 52, textClass: 'text-xl', subTextClass: 'text-[9px]' },
    lg: { iconWidth: 80, iconHeight: 80, textClass: 'text-2xl', subTextClass: 'text-[11px]' },
    xl: { iconWidth: 160, iconHeight: 160, textClass: 'text-4xl', subTextClass: 'text-sm' },
    custom: { iconWidth: undefined, iconHeight: undefined, textClass: '', subTextClass: '' },
  }[size];

  const iconSvg = (
    <svg
      viewBox="0 0 100 100"
      width={dimensions.iconWidth}
      height={dimensions.iconHeight}
      className={`shrink-0 ${className}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Flag pointing left at the top */}
      <path
        d="M 45.5 12 
           C 41.5 12, 38 14.5, 34.5 13.5
           C 37 16, 41.5 17.5, 45.5 18
           Z"
      />
      
      {/* 2. Thin mast (negative space divider or actual slim path, we will trace mast) */}
      <rect x="44.8" y="16" width="1.2" height="52" rx="0.5" className="opacity-90" />

      {/* 3. Left Sail (Jib) - elegant curve pointing left */}
      <path
        d="M 43.5 21 
           C 39 34, 30.5 47, 26.5 58 
           Q 36 62, 43.5 63 
           Z"
      />

      {/* 4. Right Sail (Main) - divided by an aerodynamic negative-space swoop */}
      {/* Top half of Main sail */}
      <path
        d="M 47 19.5
           C 54 25, 66 35, 78.5 45
           C 67.5 48.5, 57 49.5, 47 49
           Z"
      />
      {/* Bottom half of Main sail */}
      <path
        d="M 47 51.5
           C 57 52.5, 66 52, 79 48.5
           C 76.5 52.5, 70.5 56.5, 60 59.5
           C 55 60.5, 50 61, 47 61
           Z"
      />

      {/* 5. Hull/Boat - curved top, wavy custom bottom scallops */}
      <path
        d="M 28 64
           C 40 68, 55 68, 70 64
           C 70.8 65, 71.3 66.2, 70.5 67.5
           C 65.5 73, 56 73, 49 68
           C 42 73, 33 73, 28 67.5
           Z"
      />

      {/* 6. Multi-tier premium waves underneath */}
      {/* Top waves row */}
      <path
        d="M 16 71
           Q 24 76, 32 71
           Q 40 76, 48 71
           Q 56 76, 64 71
           Q 72 76, 80 71
           "
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      
      {/* Middle waves row */}
      <path
        d="M 20 76
           Q 28 81, 36 76
           Q 44 81, 52 76
           Q 60 81, 68 76
           Q 76 81, 84 76
           "
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Bottom waves row */}
      <path
        d="M 24 81
           Q 32 86, 40 81
           Q 48 86, 56 81
           Q 64 86, 72 81
           Q 80 86, 88 81
           "
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );

  if (iconOnly) {
    return iconSvg;
  }

  return (
    <div className={`flex items-center space-x-3 select-none`}>
      {/* Logo Emblem Icon */}
      {iconSvg}

      {/* Gorgeous typography pairing */}
      {showText && (
        <div id="logo-text-block" className="flex flex-col">
          <span 
            className={`font-script tracking-wide ${dimensions.textClass} leading-none ${textColorClass}`}
            style={{ fontFamily: '"Alex Brush", cursive' }}
          >
            Aesthetic Tangua
          </span>
          <span className={`font-mono ${dimensions.subTextClass} tracking-widest uppercase text-gray-500 leading-none mt-1`}>
            Serene Haor Lodging
          </span>
        </div>
      )}
    </div>
  );
}
