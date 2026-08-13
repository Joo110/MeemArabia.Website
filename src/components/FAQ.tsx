import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';
import { faqs } from '../data/content';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold text-ink">الأسئلة الشائعة</h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 0.04} variant="slideUp" y={14}>
                <motion.div
                  animate={{
                    borderColor: isOpen ? 'rgba(20,184,166,0.4)' : 'var(--color-line)',
                    boxShadow: isOpen ? '0 8px 24px rgba(20,184,166,0.08)' : '0 0px 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border bg-card"
                >
                  <motion.button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    whileTap={{ scale: 0.995 }}
                  >
                    <motion.span
                      className="text-[14.5px] font-semibold text-ink"
                      animate={{ x: isOpen ? -2 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {f.q}
                    </motion.span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? '#14B8A6' : 'var(--color-muted)' }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
                        style={{ overflow: 'hidden' }}
                      >
                        <motion.p
                          initial={{ y: -6, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -6, opacity: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                          className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted"
                        >
                          {f.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}