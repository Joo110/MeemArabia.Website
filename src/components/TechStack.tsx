import { motion } from 'framer-motion';
import Reveal, { RevealStagger, staggerItem, staggerItemFadeX } from './Reveal';
import { techStack } from '../data/content';
import { Cpu } from 'lucide-react';

export default function TechStack() {
  return (
    <section className="relative py-16 sm:py-24 bg-paper-2/60">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Technologies</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">تقنية حديثة، مبنية لتتحمل النمو</h2>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {Object.entries(techStack).map(([category, items]) => (
            <motion.div
              key={category}
              variants={staggerItem}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-6"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                variants={{ rest: { boxShadow: '0 0 0 rgba(47,93,255,0)' }, hover: { boxShadow: '0 14px 28px rgba(47,93,255,0.14)' } }}
                transition={{ duration: 0.35 }}
              />
              <motion.div
                variants={{ rest: { y: 0 }, hover: { y: -5 } }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="relative"
              >
                <motion.div
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white"
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <span className="absolute inset-0 rounded-xl bg-teal/40 animate-ping" style={{ animationDuration: '3s' }} />
                  <Cpu size={18} className="relative" />
                </motion.div>
                <h3 className="mt-3 sm:mt-4 text-sm font-bold text-ink">{category}</h3>
                <motion.div
                  className="mt-3 flex flex-wrap gap-1.5"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.04, delayChildren: 0.15 }}
                >
                  {items.map((it) => (
                    <motion.span
                      key={it}
                      variants={staggerItemFadeX}
                      className="num rounded-md bg-paper-2 px-2 py-1 text-[11px] text-ink/70"
                    >
                      {it}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}