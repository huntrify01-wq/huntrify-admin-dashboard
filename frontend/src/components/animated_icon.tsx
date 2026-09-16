import React, { useEffect, useState, useRef } from 'react';
import { Player } from '@lordicon/react';

interface AnimatedIconProps {
  /** The URL of the Lordicon JSON file (e.g., from their CDN) */
  src: string;
  /** Size of the icon in pixels */
  size?: number;
  /** Trigger mode: 'hover', 'click', 'loop', etc. */
  trigger?: 'hover' | 'click' | 'loop';
  /** Delay in milliseconds between loops (only works if trigger='loop') */
  delay?: number;
  /** Primary color override (hex, rgb, or css var) */
  primaryColor?: string;
  /** Secondary color override */
  secondaryColor?: string;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  src,
  size = 32,
  trigger = 'hover',
  delay = 0,
  primaryColor,
  secondaryColor,
  className
}) => {
  const [iconData, setIconData] = useState<any>(null);
  const playerRef = useRef<Player>(null);
  
  // State for resolved colors
  const [isDark, setIsDark] = useState(false);
  const [resolvedPrimary, setResolvedPrimary] = useState('');
  const [resolvedSecondary, setResolvedSecondary] = useState('');

  // Observe theme changes (dark mode) on the html element
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Resolve CSS variables (like var(--text-primary)) to actual HEX colors
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    
    const resolveColor = (c?: string) => {
      if (!c) return '';
      if (c.startsWith('var(')) {
        const varName = c.match(/var\(([^)]+)\)/)?.[1];
        if (varName) {
          return rootStyles.getPropertyValue(varName).trim();
        }
      }
      return c;
    };

    setResolvedPrimary(resolveColor(primaryColor));
    setResolvedSecondary(resolveColor(secondaryColor));
  }, [primaryColor, secondaryColor, isDark]);

  // Lazy load the icon data from CDN to keep bundle size small
  useEffect(() => {
    fetch(src)
      .then((response) => response.json())
      .then((data) => setIconData(data))
      .catch((error) => console.error("Error loading Lordicon:", error));
  }, [src]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' && playerRef.current) {
      playerRef.current.playFromBeginning();
    }
  };

  const handleClick = () => {
    if (trigger === 'click' && playerRef.current) {
      playerRef.current.playFromBeginning();
    }
  };

  // Start playing automatically if trigger is loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (trigger === 'loop') {
      // Small delay to ensure player is fully initialized
      timeout = setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.playFromBeginning();
        }
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [iconData, trigger]);

  // Construct colors style for Lordicon
  const colorsStyle = [
    resolvedPrimary ? `primary:${resolvedPrimary}` : '',
    resolvedSecondary ? `secondary:${resolvedSecondary}` : ''
  ].filter(Boolean).join(',');

  if (!iconData) {
    // Placeholder while loading
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <div 
      className={`inline-flex items-center justify-center cursor-pointer ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      <Player
        ref={playerRef}
        icon={iconData}
        size={size}
        colors={colorsStyle}
        onComplete={() => {
          if (trigger === 'loop') {
            if (delay > 0) {
              setTimeout(() => playerRef.current?.playFromBeginning(), delay);
            } else {
              playerRef.current?.playFromBeginning();
            }
          }
        }}
      />
    </div>
  );
};

export default AnimatedIcon;
