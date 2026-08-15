import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Reveal, { RevealStagger, staggerItemFadeX, magneticProps } from './Reveal';
import { financeCategories } from '../data/content';
import { iconMap } from '../lib/icons';
import FinanceDashboardMock from './Financedashboardmock';

/**
 * شاشة مستقلة لنظام "ميم للمالية" — تصميم مطابق للمرجع:
 * هيرو داكن متدرّج مع العنوان التسويقي على اليمين ولوحة بيانات حية على اليسار،
 * يليه قسم "إدارة مالية شاملة من منصة واحدة" بأربع فئات.
 * يظهر فيها التوب بار (Navbar) والفوتر (Footer) كاملين.
 */
export default function MeemFinancePage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="finance-home"
          className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
          style={{
            background:
              'radial-gradient(120% 100% at 100% 0%, #241a45 0%, #171233 35%, #0A0F28 75%)',
          }}
        >
          {/* subtle animated glow accents like the reference */}
          <motion.div
            className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-blue/25 blur-3xl"
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grid" />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* text — right side */}
              <Reveal delay={0.12} variant="slideRight" className="order-2 lg:order-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  MEEM Finance
                </span>
                <h1 className="mt-3 text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-[2.6rem]">
                  إدارة مالية أكثر وضوحًا
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                  نظام مالي متكامل يمنحك رؤية واضحة وآنية لكل تفاصيل حساباتك المالية، من الفواتير
                  والمبيعات إلى المشتريات والتقارير والمحاسبة.
                </p>
                <motion.div {...(!reduceMotion ? magneticProps(6) : {})} className="mt-8 inline-block">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    تواصل معنا
                    <ArrowLeft size={16} />
                  </Link>
                </motion.div>
              </Reveal>

              {/* live dashboard mock — left side */}
              <Reveal variant="blurUp" y={30} className="order-1 lg:order-2">
                <div
                  className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
                  style={{ perspective: 1200 }}
                >
                  <FinanceDashboardMock />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Feature categories */}
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                MEEM Finance
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">
                إدارة مالية شاملة من منصة واحدة
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                من الفاتورة الأولى إلى التقرير المالي الشامل، كل ما تحتاجه لإدارة الجانب المالي
                لمنشأتك في نظام واحد مترابط.
              </p>
            </Reveal>

            <RevealStagger
              className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              stagger={0.09}
            >
              {financeCategories.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <motion.div
                    key={cat.title}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.97 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="relative overflow-hidden rounded-2xl border border-line bg-card p-5"
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-1 rounded-2xl gradient-brand opacity-0 blur-xl"
                      variants={{ rest: { opacity: 0 }, hover: { opacity: 0.12 } }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -5 },
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      className="relative"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white">
                        {Icon && <Icon size={18} strokeWidth={1.75} />}
                      </div>
                      <h3 className="mt-4 text-[15px] font-bold text-ink">{cat.title}</h3>
                      <RevealStagger className="mt-3 space-y-2" stagger={0.05}>
                        {cat.items.map((it) => (
                          <motion.div
                            key={it}
                            variants={staggerItemFadeX}
                            className="text-[12.5px] text-muted"
                          >
                            {it}
                          </motion.div>
                        ))}
                      </RevealStagger>
                    </motion.div>
                  </motion.div>
                );
              })}
            </RevealStagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}