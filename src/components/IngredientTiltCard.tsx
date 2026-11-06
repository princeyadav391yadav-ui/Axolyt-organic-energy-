import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Leaf, Zap, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { IngredientDetail } from '../types';

interface IngredientTiltCardProps {
  ingredient: IngredientDetail;
  onSelect: (ingredient: IngredientDetail) => void;
  index: number;
}

export const IngredientTiltCard: React.FC<IngredientTiltCardProps> = ({
  ingredient,
  onSelect,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates normalized from -0.5 (left/top) to +0.5 (right/bottom)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Organic spring physics for smooth, natural tilt
  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D tilt rotations (-9deg to 9deg for an elegant, non-disorienting feel)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  // Parallax offsets for background decorative botanical layers (inverted movement for deep parallax)
  const bgShiftX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const bgShiftY = useTransform(smoothY, [-0.5, 0.5], [18, -18]);
  const ambientGlowX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const ambientGlowY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  // Specular light sheen gradient position
  const sheenX = useTransform(smoothX, [-0.5, 0.5], [20, 80]);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], [20, 80]);
  const sheenBackground = useMotionTemplate`radial-gradient(circle 280px at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.15), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const getIcon = () => {
    switch (ingredient.iconName) {
      case 'Leaf':
        return Leaf;
      case 'Zap':
        return Zap;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  const Icon = getIcon();

  // Natural theme motifs based on card index
  const themeAccent =
    index === 0
      ? { glow: 'rgba(16, 185, 129, 0.25)', border: 'border-emerald-500/30', badgeBg: 'bg-emerald-950/70', textAccent: 'text-emerald-400' }
      : index === 1
      ? { glow: 'rgba(234, 179, 8, 0.22)', border: 'border-amber-500/30', badgeBg: 'bg-amber-950/70', textAccent: 'text-amber-400' }
      : { glow: 'rgba(6, 182, 212, 0.22)', border: 'border-teal-500/30', badgeBg: 'bg-teal-950/70', textAccent: 'text-teal-300' };

  return (
    <div
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-emerald-500/20 hover:border-emerald-400/40 transition-[border-color,box-shadow] duration-300 flex flex-col justify-between text-left shadow-xl shadow-black/40 overflow-hidden cursor-default select-none"
      >
        {/* Layer 1: Ambient Parallax Botanical Depth Backdrop */}
        <motion.div
          style={{
            x: ambientGlowX,
            y: ambientGlowY,
            transform: 'translateZ(-20px)',
          }}
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.45 : 0.15,
            scale: isHovered ? 1.2 : 1.0,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: themeAccent.glow }}
          />
        </motion.div>

        {/* Layer 2: Tilt-Shift Natural Botanical Graphic Motif (Shifts opposite cursor) */}
        <motion.div
          style={{
            x: bgShiftX,
            y: bgShiftY,
            transform: 'translateZ(-10px)',
          }}
          className="absolute -bottom-8 -right-8 w-44 h-44 pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500"
        >
          {index === 0 && (
            // Organic Leaf Silhouette Motif
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-400">
              <path
                d="M85 15 C45 15, 20 40, 15 85 C55 85, 80 60, 85 15 Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
              <path d="M15 85 C45 60, 60 45, 85 15" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            </svg>
          )}

          {index === 1 && (
            // Clean Kinetic Adaptogen Rings Motif
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-amber-300">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="2" />
              <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          )}

          {index === 2 && (
            // Bioactive Crystal / Molecular Cluster Motif
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-teal-300">
              <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="15" r="4" fill="currentColor" />
              <circle cx="85" cy="35" r="4" fill="currentColor" />
              <circle cx="85" cy="75" r="4" fill="currentColor" />
              <circle cx="50" cy="95" r="4" fill="currentColor" />
              <circle cx="15" cy="75" r="4" fill="currentColor" />
              <circle cx="15" cy="35" r="4" fill="currentColor" />
              <circle cx="50" cy="55" r="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </motion.div>

        {/* Layer 3: Interactive Glass Specular Glare / Sheen that follows mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            transform: 'translateZ(10px)',
            background: sheenBackground,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />

        {/* Foreground Content Stack with 3D Depth Layers */}
        <div className="relative z-10">
          {/* Layer 4: Floating Icon & Highlight Tag (Highest Z for pop) */}
          <div
            style={{ transform: 'translateZ(36px)' }}
            className="flex items-center justify-between mb-5 transition-transform duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 6 }}
              className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40"
            >
              <Icon className="w-6 h-6" />
            </motion.div>

            <span
              className={`text-[11px] font-semibold text-emerald-300/90 ${themeAccent.badgeBg} px-2.5 py-1 rounded-md border border-emerald-500/25 shadow-sm`}
            >
              {ingredient.highlightTag}
            </span>
          </div>

          {/* Layer 5: Card Title & Subtitle with Tilt-Shift 3D separation */}
          <div style={{ transform: 'translateZ(26px)' }} className="transition-transform duration-300">
            <h3 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
              {ingredient.title}
            </h3>
            <p className={`text-xs ${themeAccent.textAccent} font-medium mt-1 mb-3`}>
              {ingredient.subtitle}
            </p>
          </div>

          {/* Layer 6: Main Botanical Description */}
          <div style={{ transform: 'translateZ(18px)' }} className="transition-transform duration-300">
            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
              {ingredient.description}
            </p>
          </div>

          {/* Layer 7: Detailed Botanical Bullets Preview */}
          <div
            style={{ transform: 'translateZ(22px)' }}
            className="mt-4 space-y-1.5 pt-4 border-t border-emerald-500/15 transition-transform duration-300"
          >
            {ingredient.detailedPoints.slice(0, 2).map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-emerald-200/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 8: Interactive Action Button (Floats forward on hover) */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="mt-6 pt-4 relative z-10 transition-transform duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(ingredient)}
            className="w-full py-2.5 px-4 rounded-xl glass-panel text-emerald-200 group-hover:text-emerald-950 group-hover:bg-emerald-400 font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 border border-emerald-400/30 shadow-md group-hover:shadow-emerald-500/30"
          >
            <span>Learn More &amp; Science</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
