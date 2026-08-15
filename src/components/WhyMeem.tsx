import { motion } from 'framer-motion';
import Reveal, { RevealStagger, staggerItemBlur } from './Reveal';
import { whyMeem } from '../data/content';
import { iconMap } from '../lib/icons';

export default function WhyMeem() {
  return (
    <section id="why" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Why Meem Arabia</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">ليه تختار ميم العربية؟</h2>
          <p className="mt-4 text-muted leading-relaxed">
            حلول تقنية مصممة لتنمو مع أعمالك، بدلًا من أن تعيد بناء أنظمتك في كل مرحلة.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {whyMeem.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={staggerItemBlur}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6"
              >
                {/* moving radial highlight */}
                <motion.div
                  className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full gradient-brand blur-2xl"
                  variants={{ rest: { opacity: 0, x: 0, y: 0 }, hover: { opacity: 0.22, x: 30, y: 20 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  variants={{ rest: { y: 0, boxShadow: '0 0px 0px rgba(0,0,0,0)' }, hover: { y: -6, boxShadow: '0 16px 30px rgba(10,15,40,0.08)' } }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="relative"
                >
                  <motion.div
                    variants={{
                      rest: { backgroundColor: 'var(--color-paper-2, #ECEFF7)', color: 'var(--color-ink, #0A0F28)', rotate: 0 },
                      hover: { backgroundColor: 'var(--color-ink, #0A0F28)', color: '#fff', rotate: -6 },
                    }}
                    transition={{ duration: 0.35 }}
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl"
                  >
                    <motion.div variants={{ rest: { scale: 1 }, hover: { scale: 1.15 } }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Icon size={20} strokeWidth={1.75} />
                    </motion.div>
                  </motion.div>
                  <h3 className="relative mt-4 text-[15px] font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="relative mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}