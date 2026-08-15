import { motion } from 'framer-motion';
import { useState } from 'react';
import Reveal from './Reveal';
import { industries } from '../data/content';

export default function Industries() {
  const loop = [...industries, ...industries];
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative py-20 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Industries We Serve</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">تقنية تتكيف مع قطاعك</h2>
        </Reveal>
      </div>

      <div
        className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        dir="ltr"
      >
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
          whileHover={{ transition: { duration: 0 } }}
        >
          {loop.map((ind, i) => (
            <motion.span
              key={i}
              dir="rtl"
              onHoverStart={() => setPaused(true)}
              onHoverEnd={() => setPaused(false)}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(20,184,166,0.5)' }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80"
            >
              {ind}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}