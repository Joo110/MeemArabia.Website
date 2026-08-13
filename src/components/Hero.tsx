import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Reveal, { magneticProps } from './Reveal';
import { heroStats } from '../data/content';

const bars = [40, 62, 48, 70, 58, 75];
const bubbles = [
  { left: 5, top: 10, size: 32, baseOpacity: 0.6, duration: 7, delay: 0, drift: 22 },
  { left: 13, top: 30, size: 20, baseOpacity: 0.5, duration: 9, delay: 1.2, drift: 26 },
  { left: 22, top: 6, size: 44, baseOpacity: 0.45, duration: 8, delay: 0.5, drift: 18 },
  { left: 33, top: 18, size: 16, baseOpacity: 0.55, duration: 6.5, delay: 2, drift: 24 },
  { left: 47, top: 4, size: 26, baseOpacity: 0.5, duration: 10, delay: 0.8, drift: 16 },
  { left: 59, top: 13, size: 36, baseOpacity: 0.5, duration: 7.5, delay: 1.6, drift: 24 },
  { left: 71, top: 26, size: 22, baseOpacity: 0.55, duration: 9.5, delay: 0.3, drift: 20 },
  { left: 81, top: 8, size: 28, baseOpacity: 0.5, duration: 8.5, delay: 2.4, drift: 18 },
  { left: 90, top: 20, size: 18, baseOpacity: 0.6, duration: 6, delay: 1, drift: 28 },
  { left: 39, top: 32, size: 14, baseOpacity: 0.55, duration: 7, delay: 1.8, drift: 22 },
  { left: 7, top: 36, size: 24, baseOpacity: 0.45, duration: 9, delay: 0.6, drift: 17 },
  { left: 54, top: 32, size: 20, baseOpacity: 0.5, duration: 8, delay: 2.2, drift: 21 },
  { left: 16, top: 5, size: 12, baseOpacity: 0.55, duration: 6, delay: 0.9, drift: 20 },
  { left: 65, top: 5, size: 16, baseOpacity: 0.5, duration: 8.8, delay: 1.4, drift: 19 },
  { left: 96, top: 34, size: 12, baseOpacity: 0.6, duration: 7.2, delay: 0.4, drift: 23 },
];
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const orbSlowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40]);
  const orbFastY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-grid"
    >
  {/* floating bubbles */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {bubbles.map((b, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full"
      style={{
        left: `${b.left}%`,
        top: `${b.top}%`,
        width: b.size,
        height: b.size,
        border: '1.5px solid rgba(20,184,166,0.5)',
      }}
      animate={
        reduceMotion
          ? { opacity: b.baseOpacity }
          : {
              y: [0, -b.drift, 0],
              x: [0, b.drift / 2, 0],
              opacity: [b.baseOpacity * 0.6, b.baseOpacity, b.baseOpacity * 0.6],
            }
      }
      transition={{
        duration: b.duration,
        repeat: reduceMotion ? 0 : Infinity,
        ease: 'easeInOut',
        delay: b.delay,
      }}
    />
  ))}
</div>
      {/* ambient orbs — different scroll speeds for gentle parallax */}
      <motion.div
        style={{ y: orbSlowY }}
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full border border-teal/20"
      >
        <motion.div
          className="h-full w-full rounded-full border border-teal/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.div
        style={{ y: orbFastY }}
        className="pointer-events-none absolute top-1/3 -right-16 h-56 w-56 rounded-full border border-blue/15"
      >
        <motion.div
          className="h-full w-full rounded-full border border-blue/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.div
        style={{ y: orbSlowY }}
        className="pointer-events-none absolute top-40 right-10 h-64 w-64 rounded-full bg-teal/10 blur-3xl"
      />
      <motion.div
        style={{ y: orbFastY }}
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-blue/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="scale" duration={0.5}>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-medium text-ink/70 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full gradient-brand animate-pulse" />
              Technology Built Around Your Business
            </motion.span>
          </Reveal>

          <div className="mt-6 overflow-hidden">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.25] text-ink"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
            >
              <motion.span
                className="inline-block"
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                أنظمة أعمال مترابطة، مرنة، ومصممة
              </motion.span>
              <br className="hidden sm:block" />
              <motion.span
                className="inline-block bg-[length:200%_auto] bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--color-blue, #2F5DFF) 0%, var(--color-teal, #14B8A6) 50%, var(--color-blue, #2F5DFF) 100%)',
                }}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                animate={
                  reduceMotion
                    ? undefined
                    : { backgroundPosition: ['0% center', '200% center'] }
                }
                {...(!reduceMotion && {
                  transition: { backgroundPosition: { duration: 6, repeat: Infinity, ease: 'linear' } },
                })}
              >
                {' '}لبيئة الأعمال في المملكة
              </motion.span>
            </motion.h1>
          </div>

          <Reveal delay={0.3} variant="fade">
            <p className="mt-6 text-base lg:text-lg text-muted leading-relaxed">
              نبني حلولًا لإدارة الموارد البشرية، والعمليات المالية، والمبيعات، والفروع، والمخزون،
              وقابلية التكامل مع الجهات والمنصات ذات العلاقة وفق المتطلبات الفنية والتنظيمية
              والاعتمادات المتاحة لكل خدمة.
            </p>
          </Reveal>

          <Reveal delay={0.42} variant="spring">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="#products"
                {...(!reduceMotion ? magneticProps(6) : {})}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition-shadow hover:shadow-xl hover:shadow-blue/30"
              >
                <motion.span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20"
                  whileHover={{ translateX: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
                <span className="relative z-10">اكتشف منتجاتنا</span>
                <ArrowLeft size={16} className="relative z-10 transition-transform group-hover:-translate-x-1" />
              </motion.a>
              <motion.a
                href="#contact"
                {...(!reduceMotion ? magneticProps(6) : {})}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,1)' }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border border-ink/15 bg-white/70 px-6 py-3.5 text-sm font-semibold text-ink"
              >
                تواصل معنا
              </motion.a>
            </div>
          </Reveal>
        </div>

        {/* dashboard mock */}
        <Reveal delay={0.3} variant="blurUp" y={40} className="mt-16" amount={0.15}>
          <motion.div
            style={{ y: dashboardY }}
            className="relative mx-auto max-w-4xl rounded-2xl border border-line bg-ink shadow-2xl shadow-ink/20"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="flex items-center gap-1.5 rounded-t-2xl border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="mx-auto num text-[11px] text-white/40">app.meemarabia.sa</span>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-4 sm:p-6">
              <div className="sm:col-span-3 grid grid-cols-3 gap-3">
                {[
                  { label: 'الأرباح', value: '4.2م', delta: '+2.5%', up: true },
                  { label: 'العاملون', value: '32', delta: '+1.3%', up: true },
                  { label: 'إجمالي الموظفين', value: '360', delta: '-0.4%', up: false },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="rounded-xl bg-white/5 p-3.5"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    transition={{ delay: 0.5 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-[11px] text-white/50">{s.label}</div>
                    <div className="mt-1 num text-lg font-semibold text-white">{s.value}</div>
                    <div className={`mt-1 flex items-center gap-1 text-[10px] num ${s.up ? 'text-green-400' : 'text-red-400'}`}>
                      {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {s.delta}
                    </div>
                  </motion.div>
                ))}

                <div className="col-span-3 rounded-xl bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between text-[11px] text-white/50">
                    <span>نسبة الحضور</span>
                    <span className="num">2026</span>
                  </div>
                  <div className="flex h-28 items-end gap-3">
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-md gradient-brand"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        whileHover={{ filter: 'brightness(1.15)' }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] num text-white/40">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white/5 p-3.5 text-[11px] text-white/70">
                <div className="mb-2 font-medium text-white">القائمة الرئيسية</div>
                <div className="space-y-1.5">
                  {['الوظائف', 'الحضور والانصراف', 'إدارة الإجازات', 'الرواتب', 'الأقسام', 'الرواتب التالية'].map((it, i) => (
                    <motion.div
                      key={it}
                      className="rounded-lg px-2.5 py-2"
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', x: -2 }}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                    >
                      {it}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.2} variant="fade" className="mt-14">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-6 text-center">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="num text-3xl sm:text-4xl font-bold text-gradient-brand">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-ink">{s.label}</div>
                <div className="text-xs text-muted">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}