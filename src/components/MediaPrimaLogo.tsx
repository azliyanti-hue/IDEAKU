import React from 'react';

interface LogoProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const MediaPrimaLogo: React.FC<LogoProps> = ({
  theme = 'light',
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const isDark = theme === 'dark';
  
  // Sizing tokens
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 42 : 34;
  const titleSize = size === 'sm' ? 'text-[15px]' : size === 'lg' ? 'text-[20px]' : 'text-[17px]';
  const subSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-[13px]' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Media Prima Distinctive Icon Mark */}
      <div 
        className="relative shrink-0 flex items-center justify-center rounded-[9px] shadow-sm overflow-hidden"
        style={{
          width: iconSize,
          height: iconSize,
          background: isDark ? '#0b1626' : '#0e1c2f'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[78%] h-[78%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized M Ribbon in Coral Red */}
          <path
            d="M24 74V38C24 31 30 25 37 25C44 25 48 30 50 35C52 30 56 25 63 25C70 25 76 31 76 38V74"
            stroke="#DB313F"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner accent dip */}
          <path
            d="M32 54L50 67L68 54"
            stroke="#DB313F"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Distinctive Orange/Amber Dot Accent */}
          <circle cx="78" cy="24" r="9" fill="#F59E0B" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[-0.015em] ${titleSize} ${
            isDark ? 'text-white' : 'text-[#0E1C2F]'
          }`}
        >
          MEDIA PRIMA
        </span>
        {showSubtitle && (
          <span
            className={`font-headline font-bold uppercase tracking-[0.14em] mt-0.5 text-[#DB313F] ${subSize}`}
          >
            DECK STUDIO AI
          </span>
        )}
      </div>
    </div>
  );
};
