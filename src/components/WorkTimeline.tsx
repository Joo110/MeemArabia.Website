import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { workSteps } from '../data/content';

export default function WorkTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="work" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">How We Work</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">من فكرة الأعمال إلى حل جاهز للتشغيل</h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16">
          {/* base line */}
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-line lg:block" />
          {/* animated drawing line */}
          <motion.div
            className="absolute top-6 right-0 left-0 hidden h-[2px] gradient-brand lg:block"
            style={{ scaleX: lineScale, transformOrigin: 'right' }}
          />

          <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
            {workSteps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper num text-xs font-bold leading-none text-ink sm:h-12 sm:w-12"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 + 0.1, type: 'spring', stiffness: 280, damping: 14 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-teal"
                    initial={{ opacity: 0, scale: 1 }}
                    whileInView={{ opacity: [0, 0.6, 0], scale: [1, 1.5, 1.5] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 + 0.2, duration: 0.9, ease: 'easeOut' }}
                  />
                  {s.n}
                </motion.div>
                <motion.h3
                  className="mt-3 text-[13px] font-bold text-ink"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 + 0.2 }}
                >
                  {s.title}
                </motion.h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}