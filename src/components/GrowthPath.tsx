import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Reveal, { RevealStagger } from './Reveal';
import { growthPath } from '../data/content';

export default function GrowthPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-14 sm:py-24 bg-paper-2/40">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink leading-snug">
            من الشركات الناشئة إلى المؤسسات الكبرى
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            ابدأ بإمكانيات تحتاجها اليوم، ثم وسّع منظومتك مع نمو أعمالك دون الحاجة إلى تغيير
            النظام بالكامل.
          </p>
        </Reveal>

        {/* Cards */}
        <RevealStagger
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 sm:grid-cols-3"
          stagger={0.1}
        >
          {[...growthPath].reverse().map((stage) => (
            <motion.div
              key={stage.n}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.97 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-sm"
            >
              <motion.div
                className="pointer-events-none absolute -inset-1 rounded-2xl gradient-brand opacity-0 blur-xl"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.12 } }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                variants={{ rest: { y: 0 }, hover: { y: -5 } }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="relative"
              >
                <h3 className="text-[16px] font-bold text-ink">{stage.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{stage.desc}</p>

                <ul className="mt-5 space-y-2.5">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12.5px] text-ink/75">
                      <CheckCircle2 size={14} className="shrink-0 text-teal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </RevealStagger>

        {/* Numbered arrow timeline */}
        <div ref={containerRef} className="relative mt-16 flex items-center justify-between">
          {/* base track */}
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-line" />

          {/* animated gradient fill, growing from right (01) to left (03) — RTL flow */}
          <motion.div
            className="absolute inset-y-0 top-1/2 right-0 h-[3px] -translate-y-1/2 rounded-full gradient-brand"
            style={{ scaleX: lineScale, transformOrigin: 'right', width: '100%' }}
          />

          {/* arrowhead at the left end */}
          <motion.div
            className="absolute top-1/2 left-0 -translate-y-1/2"
            style={{ opacity: lineScale }}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M0 8L10 0.5V6H22V10H10V15.5L0 8Z" fill="var(--color-blue, #2F5DFF)" />
            </svg>
          </motion.div>

          {growthPath
            .slice()
            .reverse()
            .map((stage, i) => (
              <motion.div
                key={stage.n}
                className="relative z-10 flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.25,
                  type: 'spring',
                  stiffness: 260,
                  damping: 16,
                }}
              >
                <motion.div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg shadow-ink/20"
                  whileHover={{ scale: 1.08 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-teal"
                    initial={{ opacity: 0, scale: 1 }}
                    whileInView={{ opacity: [0, 0.7, 0], scale: [1, 1.5, 1.5] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.25 + 0.15, duration: 0.9, ease: 'easeOut' }}
                  />
                  <span className="num text-sm font-bold">{stage.n}</span>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}