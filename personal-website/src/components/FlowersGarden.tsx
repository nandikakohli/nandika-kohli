import { motion } from 'framer-motion';

type FlowersGardenProps = {
  className?: string;
};

export default function FlowersGarden({ className }: FlowersGardenProps) {
  const flowers = [
    { x: 5, h: 110, color: '#da7b91' },
    { x: 14, h: 140, color: '#fca88e' },
    { x: 22, h: 120, color: '#8c5889' },
    { x: 30, h: 160, color: '#f3d46b' },
    { x: 38, h: 130, color: '#da7b91' },
    { x: 46, h: 150, color: '#7bc67b' },
    { x: 54, h: 115, color: '#fca88e' },
    { x: 62, h: 145, color: '#8c5889' },
    { x: 70, h: 135, color: '#f3d46b' },
    { x: 78, h: 155, color: '#da7b91' },
    { x: 86, h: 125, color: '#7bc67b' },
    { x: 94, h: 140, color: '#fca88e' },
  ];

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
            transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            style={{ originX: '50%', originY: '100%' }}
          >
            <g transform={`translate(${f.x}, 200)`}>
              <path d={`M0 0 C -4 -${f.h * 0.3}, 4 -${f.h * 0.6}, 0 -${f.h}`} stroke="url(#stem)" strokeWidth="0.8" fill="none" />
              <motion.g
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                transform={`translate(0, -${f.h})`}
                style={{ originX: '50%', originY: '50%' }}
              >
                <circle cx="0" cy="0" r="2.2" fill="#ffd27a" />
                <ellipse cx="0" cy="-5" rx="2.5" ry="5.5" fill={f.color} />
                <ellipse cx="4.5" cy="-2" rx="2.2" ry="5.0" fill={f.color} transform="rotate(35)" />
                <ellipse cx="-4.5" cy="-2" rx="2.2" ry="5.0" fill={f.color} transform="rotate(-35)" />
                <ellipse cx="0" cy="4.5" rx="2.5" ry="5.5" fill={f.color} />
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
