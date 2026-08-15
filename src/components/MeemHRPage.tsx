import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Reveal, { RevealStagger, magneticProps } from './Reveal';
import { hrFeatureCards, integrations } from '../data/content';
import { iconMap } from '../lib/icons';
import HRDashboardMock from './Hrdashboardmock';

/**
 * شاشة مستقلة لنظام "ميم للموارد البشرية" — تصميم مطابق للمرجع:
 * هيرو داكن متدرّج مع العنوان التسويقي على اليمين ولوحة بيانات حية على اليسار،
 * يليه قسم "كل ما تحتاجه لإدارة موظفيك" ببطاقات مرقّمة،
 * ثم قسم التوافق مع البيئة التنظيمية السعودية.
 * يظهر فيها التوب بار (Navbar) والفوتر (Footer) كاملين.
 */
export default function MeemHRPage() {
  const reduceMotion = useReducedMotion();
  const saudiIntegrations = integrations.filter((i) => i.en === 'Qiwa' || i.en === 'GOSI');

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="hr-home"
          className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
          style={{
            background:
              'radial-gradient(120% 100% at 100% 0%, #241a45 0%, #171233 35%, #0A0F28 75%)',
          }}
        >
          <motion.div
            className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-teal/25 blur-3xl"
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grid" />

          <div className="relative mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* text — right side */}
              <Reveal delay={0.12} variant="slideRight" className="order-2 lg:order-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  MEEM HR
                </span>
                <h1 className="mt-3 text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-[2.6rem]">
                  إدارة مواردك البشرية من مكان واحد
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                  من أول يوم للموظف حتى إدارة عمليات الرواتب والطلبات، اجمع كل عمليات الموارد
                  البشرية في منصة واحدة مصممة لبيئة الأعمال السعودية.
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
                <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
                  <HRDashboardMock />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="mx-auto max-w-2xl text-center" variant="blurUp">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                MEEM HR
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">
                كل ما تحتاجه لإدارة موظفيك
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                من ملف الموظف إلى مسير الرواتب، منظومة متكاملة تغطي دورة حياة الموظف بالكامل.
              </p>
            </Reveal>

            <RevealStagger
              className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
              stagger={0.06}
            >
              {hrFeatureCards.map((f) => {
                const Icon = iconMap[f.icon];
                return (
                  <motion.div
                    key={f.n}
                    variants={{
                      hidden: { opacity: 0, y: 18, scale: 0.96 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="relative overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-5"
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-1 rounded-2xl gradient-brand opacity-0 blur-xl"
                      variants={{ rest: { opacity: 0 }, hover: { opacity: 0.12 } }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      variants={{ rest: { y: 0 }, hover: { y: -4 } }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      className="relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-paper-2 text-ink">
                          {Icon && <Icon size={16} strokeWidth={1.75} />}
                        </div>
                        <span className="num text-[11px] text-muted">{f.n}</span>
                      </div>
                      <h3 className="mt-3 text-[13.5px] font-bold text-ink">{f.title}</h3>
                      <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{f.desc}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </RevealStagger>
          </div>
        </section>

        {/* Compliance / trust section */}
        <section className="relative py-16 sm:py-20 bg-paper-2/60">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal className="text-center" variant="blurUp">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                Compliance
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink">
                متوافق مع البيئة التنظيمية السعودية
              </h2>
            </Reveal>

            <RevealStagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.1}>
              {saudiIntegrations.map((it) => (
                <motion.div
                  key={it.en}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  className="rounded-2xl border border-line bg-card p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[15px] font-bold text-ink">{it.name}</div>
                      <div className="num text-[11px] text-muted">{it.en}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-medium text-teal">
                      <CheckCircle2 size={12} />
                      {it.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{it.desc}</p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}