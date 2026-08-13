import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Reveal, { RevealStagger, staggerItemFadeX, magneticProps } from './Reveal';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  reverse?: boolean;
  visual: ReactNode;
  tone?: 'light' | 'tint';
};

export default function FeatureShowcase({
  id,
  eyebrow,
  title,
  desc,
  features,
  cta,
  reverse = false,
  visual,
  tone = 'light',
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className={`relative py-20 ${tone === 'tint' ? 'bg-paper-2/60' : ''}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <Reveal variant={reverse ? 'slideLeft' : 'slideRight'}>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal">{eyebrow}</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug text-ink">{title}</h2>
            <p className="mt-4 text-muted leading-relaxed">{desc}</p>

            <RevealStagger className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5" stagger={0.06}>
              {features.map((f) => (
                <motion.div key={f} variants={staggerItemFadeX} className="flex items-center gap-2 text-[13px] text-ink/80">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                  >
                    <CheckCircle2 size={15} className="shrink-0 text-teal" />
                  </motion.span>
                  <span>{f}</span>
                </motion.div>
              ))}
            </RevealStagger>

            <motion.a
              href="#contact"
              {...(!reduceMotion ? magneticProps(5) : {})}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white"
            >
              {cta}
            </motion.a>
          </Reveal>

          <Reveal delay={0.1} variant={reverse ? 'slideRight' : 'slideLeft'}>
            <motion.div
              whileHover={{ y: -6 }}
              initial={{ y: 0 }}
              whileInView={reduceMotion ? {} : { y: [6, -2, 0] }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              {visual}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}