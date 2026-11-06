import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  productName?: string;
  colorScheme?: string;
  accentColor?: string;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  productName = 'AXOLYT',
  accentColor = '#10b981',
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate fallback URL candidates based on productName and current src
  const getFallbackUrls = (): string[] => {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    
    // Map product name or ID to clean name
    let cleanAlias = 'can_green_spring.jpg';
    const lowerName = (productName + ' ' + filename).toLowerCase();
    if (lowerName.includes('wild') || lowerName.includes('berry')) cleanAlias = 'can_wild_berry.jpg';
    else if (lowerName.includes('tropic') || lowerName.includes('rush')) cleanAlias = 'can_tropic_rush.jpg';
    else if (lowerName.includes('glacier') || lowerName.includes('frost')) cleanAlias = 'can_glacier_frost.jpg';
    else if (lowerName.includes('crimson') || lowerName.includes('zen')) cleanAlias = 'can_crimson_zen.jpg';
    else if (lowerName.includes('golden') || lowerName.includes('dawn')) cleanAlias = 'can_golden_dawn.jpg';
    else if (lowerName.includes('green') || lowerName.includes('spring')) cleanAlias = 'can_green_spring.jpg';

    return [
      src,
      `/images/${cleanAlias}`,
      `./images/${cleanAlias}`,
      `/assets/images/${cleanAlias}`,
      `./assets/images/${cleanAlias}`,
    ];
  };

  const fallbacks = getFallbackUrls();
  const currentSrc = fallbacks[retryIndex] || src;

  const handleError = () => {
    if (retryIndex < fallbacks.length - 1) {
      setRetryIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Elegant procedural SVG Can fallback with realistic metallic styling and droplets
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#06150a] to-[#020703] ${className}`}
        style={{ minHeight: '120px' }}
      >
        <svg
          viewBox="0 0 200 280"
          className="w-3/4 h-3/4 max-h-56 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`canGrad-${productName}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a201c" />
              <stop offset="25%" stopColor={accentColor} stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="75%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#08100b" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="50%" stopColor="#f4f4f5" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>
          </defs>

          {/* Can Rim Top */}
          <ellipse cx="100" cy="30" rx="48" ry="12" fill="url(#lidGrad)" />
          <ellipse cx="100" cy="30" rx="42" ry="9" fill="#18181b" />
          <ellipse cx="100" cy="28" rx="20" ry="5" fill="#a1a1aa" opacity="0.6" />

          {/* Can Body */}
          <path
            d="M52 30 C52 38, 56 46, 56 55 L56 240 C56 252, 64 260, 100 260 C136 260, 144 252, 144 240 L144 55 C144 46, 148 38, 148 30 Z"
            fill={`url(#canGrad-${productName})`}
          />

          {/* Can Highlights */}
          <line x1="90" y1="55" x2="90" y2="245" stroke="#ffffff" strokeWidth="6" opacity="0.25" strokeLinecap="round" />
          <line x1="98" y1="55" x2="98" y2="245" stroke="#ffffff" strokeWidth="2" opacity="0.4" strokeLinecap="round" />

          {/* Brand Logo & Text on Can */}
          <text
            x="100"
            y="110"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="15"
            fontWeight="900"
            letterSpacing="2.5"
            fontFamily="sans-serif"
          >
            AXOLYT
          </text>
          <text
            x="100"
            y="126"
            textAnchor="middle"
            fill={accentColor}
            fontSize="8"
            fontWeight="700"
            letterSpacing="1.5"
            fontFamily="sans-serif"
          >
            ORGANIC ENERGY
          </text>

          {/* Product Name on Can */}
          <rect x="68" y="145" width="64" height="20" rx="4" fill="#000000" opacity="0.4" />
          <text
            x="100"
            y="158"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {productName.toUpperCase()}
          </text>

          {/* Plant Icon & Badge */}
          <circle cx="100" cy="188" r="10" fill={accentColor} opacity="0.2" />
          <path d="M100 182 C96 186 96 192 100 194 C104 192 104 186 100 182 Z" fill={accentColor} />

          {/* Can Rim Bottom */}
          <ellipse cx="100" cy="254" rx="44" ry="8" fill="url(#lidGrad)" opacity="0.7" />
        </svg>

        {/* Subtle glow behind can */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 blur-xl"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-emerald-950/40 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  );
};
