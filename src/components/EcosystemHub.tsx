import { motion } from 'framer-motion';
import { useState } from 'react';
import Reveal from './Reveal';
import { ecosystemNodes } from '../data/content';
import { iconMap } from '../lib/icons';
import logoImg from '../assets/Artboard.jpg.jpeg';

const RADIUS = 190;

export default function EcosystemHub() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">One Connected Ecosystem</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">كل أنظمتك تعمل معًا</h2>
          <p className="mt-4 text-muted leading-relaxed">
            بدلًا من بيانات متفرقة بين أنظمة متعددة، تربط ميم العمليات الأساسية داخل منشأتك في منظومة واحدة.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 flex h-[460px] max-w-3xl items-center justify-center sm:h-[520px]">
          <motion.div
            className="absolute rounded-full border border-dashed border-ink/15"
            style={{ width: RADIUS * 2, height: RADIUS * 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute rounded-full border border-line/70"
            style={{ width: RADIUS * 2 - 40, height: RADIUS * 2 - 40 }}
          />

          <svg
            className="absolute"
            width={RADIUS * 2 + 60}
            height={RADIUS * 2 + 60}
            viewBox={`0 0 ${RADIUS * 2 + 60} ${RADIUS * 2 + 60}`}
          >
            {ecosystemNodes.map((n, i) => {
              const cx = RADIUS + 30;
              const cy = RADIUS + 30;
              const rad = (n.angle * Math.PI) / 180;
              const x = cx + RADIUS * Math.cos(rad);
              const y = cy + RADIUS * Math.sin(rad);
              const isHovered = hovered === n.key;
              return (
                <g key={n.key}>
                  <motion.line
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={isHovered ? '#14B8A6' : '#C7CCDE'}
                    strokeWidth={isHovered ? 2 : 1.5}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    animate={isHovered ? { strokeWidth: 2 } : { strokeWidth: 1.5 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                  {/* moving particle along the line */}
                  <motion.circle
                    r={2.2}
                    fill="#14B8A6"
                    initial={{ opacity: 0 }}
                    animate={{
                      cx: [cx, x],
                      cy: [cy, y],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: 1 + i * 0.35,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* center node — breathing */}
          {/* center node */}
<motion.div
  className="relative z-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl gradient-brand shadow-xl shadow-blue/30"
  animate={{ scale: [1, 1.06, 1] }}
  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
>
  <img src={logoImg} alt="ميم العربية" className="h-full w-full object-cover" />
</motion.div>

          {ecosystemNodes.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = RADIUS * Math.cos(rad);
            const y = RADIUS * Math.sin(rad);
            const Icon = iconMap[n.icon] ?? iconMap.grid;
            const isHovered = hovered === n.key;
            return (
              <motion.div
                key={n.key}
                className="absolute flex flex-col items-center gap-2"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, translate: '-50% -50%' }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200, damping: 14 }}
                whileHover={{ scale: 1.14 }}
                onHoverStart={() => setHovered(n.key)}
                onHoverEnd={() => setHovered(null)}
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-card text-ink shadow-md"
                  animate={isHovered ? { boxShadow: '0 0 0 6px rgba(20,184,166,0.15)', borderColor: '#14B8A6' } : { boxShadow: '0 4px 10px rgba(10,15,40,0.06)' }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </motion.div>
                <motion.span
                  className="whitespace-nowrap rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-ink/80 shadow-sm"
                  animate={isHovered ? { color: '#14B8A6' } : { color: 'var(--color-ink)' }}
                >
                  {n.label}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-sm text-muted">بيانات مترابطة. عمليات أسرع. رؤية أوضح.</p>
        </Reveal>
      </div>
    </section>
  );
}