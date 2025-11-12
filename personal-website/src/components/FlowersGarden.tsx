import { motion } from 'framer-motion';

type FlowersGardenProps = {
  className?: string;
};

export default function FlowersGarden({ className }: FlowersGardenProps) {
  type Flower = {
    x: number; // 0-100
    h: number; // stem height
    color: string;
    type?: 'lotus' | 'spike' | 'simple' | 'ghibli';
  };

  // Mixed bed: lotus heads, slender spikes, and simple blooms
  const flowers: Flower[] = [
    { x: 6, h: 122, color: '#eaa0b1', type: 'ghibli' },
    { x: 12, h: 148, color: '#f7c7a0', type: 'spike' },
    { x: 19, h: 128, color: '#9a6aa1', type: 'simple' },
    { x: 26, h: 168, color: '#f3d46b', type: 'spike' },
    { x: 34, h: 138, color: '#e88ea4', type: 'lotus' },
    { x: 41, h: 158, color: '#88d39a', type: 'simple' },
    { x: 49, h: 120, color: '#f7b39a', type: 'ghibli' },
    { x: 57, h: 150, color: '#8c5889', type: 'spike' },
    { x: 65, h: 140, color: '#f3d46b', type: 'simple' },
    { x: 73, h: 162, color: '#da7b91', type: 'ghibli' },
    { x: 81, h: 130, color: '#7bc67b', type: 'simple' },
    { x: 89, h: 144, color: '#fca88e', type: 'lotus' },
    { x: 96, h: 136, color: '#a884c2', type: 'ghibli' },
  ];

  const drawHead = (f: Flower) => {
    if (f.type === 'ghibli') {
      // Soft, painterly bloom: layered petals with subtle stroke and gradient center
      return (
        <g>
          <defs>
            <radialGradient id={`core-${f.x}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffe79a" />
              <stop offset="100%" stopColor="#ffd27a" />
            </radialGradient>
          </defs>
          {/* back halo */}
          <circle cx="0" cy="0" r="6.5" fill={f.color} opacity="0.25" />
          {/* layered petals */}
          <ellipse cx="0" cy="-4" rx="4.8" ry="8.2" fill={f.color} stroke="rgba(0,0,0,0.08)" strokeWidth="0.2" />
          <ellipse cx="4.2" cy="-1.5" rx="4.2" ry="7.0" fill={f.color} stroke="rgba(0,0,0,0.08)" strokeWidth="0.2" transform="rotate(28)" />
          <ellipse cx="-4.2" cy="-1.5" rx="4.2" ry="7.0" fill={f.color} stroke="rgba(0,0,0,0.08)" strokeWidth="0.2" transform="rotate(-28)" />
          <ellipse cx="0" cy="3.8" rx="5.0" ry="7.5" fill={f.color} stroke="rgba(0,0,0,0.08)" strokeWidth="0.2" />
          {/* center */}
          <circle cx="0" cy="0" r="2.6" fill={`url(#core-${f.x})`} />
        </g>
      );
    }
    if (f.type === 'lotus') {
      // Lotus: layered rounded petals around a center
      return (
        <g>
          <circle cx="0" cy="0" r="2.2" fill="#ffd27a" />
          {/* back petals */}
          <ellipse cx="0" cy="3.5" rx="4.8" ry="7.2" fill={f.color} opacity="0.7" />
          <ellipse cx="0" cy="0" rx="6.2" ry="9.2" fill={f.color} opacity="0.9" />
          {/* front petal cluster */}
          <ellipse cx="0" cy="-2.2" rx="5.6" ry="8.6" fill={f.color} />
          {/* side petals */}
          <ellipse cx="-5" cy="0.5" rx="3.4" ry="7" fill={f.color} transform="rotate(-25)" />
          <ellipse cx="5" cy="0.5" rx="3.4" ry="7" fill={f.color} transform="rotate(25)" />
        </g>
      );
    }
    if (f.type === 'spike') {
      // Slender spike flower (like gladiolus/foxglove feel)
      return (
        <g>
          <rect x="-1.2" y="-16" width="2.4" height="18" rx="1.2" fill={f.color} />
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx={i % 2 === 0 ? -2.4 : 2.4}
              cy={-14 + i * 3}
              rx="2.6"
              ry="4.2"
              fill={f.color}
              opacity={0.95 - i * 0.08}
            />
          ))}
        </g>
      );
    }
    // Simple 4-petal bloom
    return (
      <g>
        <circle cx="0" cy="0" r="2.2" fill="#ffd27a" />
        <ellipse cx="0" cy="-5" rx="2.5" ry="5.5" fill={f.color} />
        <ellipse cx="4.5" cy="-2" rx="2.2" ry="5.0" fill={f.color} transform="rotate(35)" />
        <ellipse cx="-4.5" cy="-2" rx="2.2" ry="5.0" fill={f.color} transform="rotate(-35)" />
        <ellipse cx="0" cy="4.5" rx="2.5" ry="5.5" fill={f.color} />
      </g>
    );
  };

  return (
    <div
      className={className}
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      <svg viewBox="0 0 100 200" preserveAspectRatio="none" width="100%" height="280">
        <defs>
          <linearGradient id="stem" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4a9158" />
            <stop offset="100%" stopColor="#2f6b3e" />
          </linearGradient>
        </defs>

        {flowers.map((f, i) => (
          <motion.g
            key={i}
            animate={{ rotate: [0, -2, 0, 2, 0] }}
            transition={{ duration: 6 + (i % 5) * 0.6, delay: (i % 7) * 0.2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            style={{ originX: '50%', originY: '100%' }}
          >
            <g transform={`translate(${f.x}, 200)`}>
              <path d={`M0 0 C -4 -${f.h * 0.3}, 4 -${f.h * 0.6}, 0 -${f.h}`} stroke="url(#stem)" strokeWidth="0.8" fill="none" />
              <motion.g
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 5 + (i % 4) * 0.5, delay: (i % 6) * 0.15, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                transform={`translate(0, -${f.h})`}
                style={{ originX: '50%', originY: '50%' }}
              >
                {drawHead(f)}
              </motion.g>
              <path d={`M0 -${f.h * 0.6} C 6 -${f.h * 0.6 + 10}, 6 -${f.h * 0.6 + 26}, 0 -${f.h * 0.6 + 30}`} fill="#6dbd7a" opacity="0.8" />
              <path d={`M0 -${f.h * 0.35} C -6 -${f.h * 0.35 + 8}, -6 -${f.h * 0.35 + 22}, 0 -${f.h * 0.35 + 26}`} fill="#6dbd7a" opacity="0.75" />
            </g>
          </motion.g>
        ))}

        <rect x="0" y="180" width="100" height="30" fill="#a6d8a8" opacity="0.6" />
        <rect x="0" y="190" width="100" height="20" fill="#8bcf91" opacity="0.8" />
      </svg>
    </div>
  );
}
