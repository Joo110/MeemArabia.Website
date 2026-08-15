import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Reveal, { RevealStagger, staggerItemScale } from './Reveal';
import { products } from '../data/content';
import { iconMap } from '../lib/icons';

const productHref: Record<string, string> = {
  hr: '/hr',
  finance: '/finance',
};

export default function ProductsGrid() {
  return (
    <section id="products" className="relative py-16 sm:py-24 bg-paper-2/60">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Our Products</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">نظاما ميم: الموارد البشرية والحسابات المالية</h2>
          <p className="mt-4 text-muted leading-relaxed">
            اختر النظام المناسب لاحتياج منشأتك، أو اجمعهما معًا للحصول على منظومة أعمال متكاملة.
          </p>
        </Reveal>

        <RevealStagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.09}>
          {products.map((p) => {
            const Icon = iconMap[p.icon];
            return (
              <motion.div
                key={p.key}
                variants={staggerItemScale}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm"
              >
                <motion.div
                  className="pointer-events-none absolute -inset-1 rounded-2xl gradient-brand opacity-0 blur-xl"
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 0.15 } }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  variants={{
                    rest: { y: 0, boxShadow: '0 4px 14px rgba(47,93,255,0.15)' },
                    hover: { y: -8, boxShadow: '0 12px 28px rgba(47,93,255,0.28)' },
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-white"
                >
                  <motion.div
                    variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 8, scale: 1.12 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </motion.div>
                </motion.div>

                <h3 className="relative z-10 mt-5 text-[17px] font-bold text-ink">{p.name}</h3>
                <div className="relative z-10 num text-[11px] text-muted">{p.tag}</div>
                <p className="relative z-10 mt-3 flex-1 text-[13px] leading-relaxed text-muted">{p.desc}</p>

                <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-paper-2 px-2 py-1 text-[10.5px] text-ink/70">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={productHref[p.key] ?? '/#contact'}
                  className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors group-hover:text-teal"
                >
                  استكشف الحل
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}