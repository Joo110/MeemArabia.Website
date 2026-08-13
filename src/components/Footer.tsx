import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import Reveal from './Reveal';
import { nav } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-card pt-14 pb-10">
      <div className="absolute inset-x-0 top-0 h-[3px] gradient-brand" />

      <div className="mx-auto max-w-7xl px-4">
        <Reveal variant="fade" amount={0.1}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
                أنظمة أعمال مترابطة، مرنة، ومصممة لبيئة الأعمال في المملكة العربية السعودية.
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                روابط سريعة
              </span>
              <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-ink/70">
                {nav.map((n) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    className="relative w-fit text-ink/70 transition-colors hover:text-ink"
                    whileHover="hover"
                    initial="rest"
                  >
                    {n.label}
                    <motion.span
                      className="absolute -bottom-0.5 right-0 h-px w-full bg-ink"
                      variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                      style={{ transformOrigin: 'right' }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                تواصل معنا
              </span>
              <div className="mt-4 flex flex-col gap-3 text-[13px] text-ink/70">
                <motion.a
                  href="mailto:info@meemarabia.sa"
                  className="num flex items-center gap-2 w-fit"
                  style={{ direction: 'ltr' }}
                  whileHover={{ color: 'var(--color-teal)', x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={15} strokeWidth={1.75} />
                  info@meemarabia.sa
                </motion.a>
                <motion.a
                  href="mailto:sales@meemarabia.sa"
                  className="num flex items-center gap-2 w-fit"
                  style={{ direction: 'ltr' }}
                  whileHover={{ color: 'var(--color-teal)', x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={15} strokeWidth={1.75} />
                  sales@meemarabia.sa
                </motion.a>
                <motion.a
                  href="tel:+966566817575"
                  className="num flex items-center gap-2 w-fit"
                  style={{ direction: 'ltr' }}
                  whileHover={{ color: 'var(--color-teal)', x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={15} strokeWidth={1.75} />
                  056 681 7575
                </motion.a>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                الموقع
              </span>
              <div className="mt-4 flex items-start gap-2 text-[13px] text-ink/70">
                <MapPin size={15} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} ميم العربية. جميع الحقوق محفوظة.</span>
          <span className="num tracking-wide">Saudi Business Ready · Configurable · Integrated · Scalable</span>
        </div>
      </div>
    </footer>
  );
}