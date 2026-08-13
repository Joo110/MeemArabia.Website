import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Reveal, { RevealStagger, staggerItemScale } from './Reveal';
import { businessModules, posFlow } from '../data/content';

export default function BusinessAndPOS() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal variant="slideRight">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">MEEM Business</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink">منظومة واحدة لإدارة أعمالك</h2>
              <p className="mt-4 max-w-lg text-muted leading-relaxed">
                الطبقة الإدارية التي تجمع العمليات المختلفة داخل المنشأة وتمنح الإدارة رؤية موحدة
                للأعمال، من الطلبات والموافقات إلى الفروع والتقارير.
              </p>
            </Reveal>

            <RevealStagger className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3" stagger={0.06}>
              {businessModules.map((m) => (
                <motion.div
                  key={m}
                  variants={staggerItemScale}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative overflow-hidden rounded-xl border border-line bg-card px-3.5 py-3 text-center text-[12.5px] font-medium text-ink/80 shadow-sm"
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-xl border border-teal/0"
                    variants={{ rest: { borderColor: 'rgba(20,184,166,0)' }, hover: { borderColor: 'rgba(20,184,166,0.45)' } }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    className="relative"
                    variants={{ rest: { y: 0 }, hover: { y: -2, scale: 1.04 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  >
                    {m}
                  </motion.span>
                </motion.div>
              ))}
            </RevealStagger>
          </div>

          <div className="lg:col-span-2">
            <Reveal variant="slideLeft">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">MEEM POS</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink">من نقطة البيع إلى الحسابات والمخزون</h2>
              <p className="mt-4 text-muted leading-relaxed">
                عند تفعيل التكامل بين منتجات ميم، تنعكس عملية البيع الواحدة على الأنظمة ذات العلاقة
                دون الحاجة لإدخال نفس البيانات عدة مرات.
              </p>

              <div className="mt-8 flex flex-col gap-0">
                {posFlow.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-xs font-bold text-white shadow-md"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.25, type: 'spring', stiffness: 260, damping: 16 }}
                      >
                        <motion.span
                          className="absolute inset-0 rounded-xl bg-white/40"
                          initial={{ opacity: 0.6, scale: 1 }}
                          whileInView={{ opacity: 0, scale: 1.6 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.25 + 0.15, duration: 0.7 }}
                        />
                        {i + 1}
                      </motion.div>
                      {i < posFlow.length - 1 && (
                        <motion.div
                          className="my-1 h-8 w-px bg-gradient-to-b from-teal to-line"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.25 + 0.2, duration: 0.4 }}
                          style={{ transformOrigin: 'top' }}
                        />
                      )}
                    </div>
                    <motion.div
                      className="pb-8 text-[14px] font-semibold text-ink"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.25 + 0.15, duration: 0.4 }}
                    >
                      {step}
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={{ x: -3 }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-teal"
              >
                اكتشف ميم لنقاط البيع
                <ArrowLeft size={15} />
              </motion.a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}