import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Reveal, { RevealStagger, staggerItem, magneticProps } from './Reveal';
import { integrations } from '../data/content';
import { useReducedMotion } from 'framer-motion';

export default function Integrations() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="integrations" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
              {integrations.map((it) => (
                <motion.div
                  key={it.en}
                  variants={staggerItem}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 shadow-sm"
                >
                  <motion.div
                    className="pointer-events-none absolute -inset-1 rounded-2xl gradient-brand blur-xl"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 0.12 } }}
                    transition={{ duration: 0.35 }}
                  />
                  <motion.div
                    className="relative"
                    variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[15px] font-bold text-ink">{it.name}</div>
                        <div className="num text-[11px] text-muted">{it.en}</div>
                      </div>
                      <span className="relative inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-medium text-teal">
                        <span className="relative flex h-2 w-2">
                          {!reduceMotion && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/60" />
                          )}
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                        </span>
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                        >
                          <CheckCircle2 size={12} />
                        </motion.span>
                        {it.status}
                      </span>
                    </div>
                    <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{it.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>

          <Reveal variant="slideLeft">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal">
              Saudi Business Integrations
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-snug text-ink">
              أعمالك داخل المنظومة السعودية
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              نطوّر حلول ميم مع مراعاة المتطلبات التشغيلية والتنظيمية ذات العلاقة ببيئة الأعمال في
              المملكة، مع بنية قابلة للتكامل مع الجهات والمنصات التي توفر وسائل الربط الرسمية.
            </p>
            <div className="mt-6 rounded-xl border border-line bg-paper-2/60 p-4 text-[12.5px] leading-relaxed text-muted">
              لا يعني إدراج جهة ضمن خارطة التكامل وجود ربط مباشر معها تلقائيًا. يتم تفعيل كل تكامل
              وفق توفر الخدمة والمتطلبات الفنية والاعتمادات الخاصة بالجهة المعنية.
            </div>
            <motion.a
              href="#contact"
              {...(!reduceMotion ? magneticProps(5) : {})}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white"
            >
              اكتشف إمكانيات التكامل
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}