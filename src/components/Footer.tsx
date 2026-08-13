import { motion } from 'framer-motion';
import Logo from './Logo';
import Reveal from './Reveal';
import { nav } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card py-12">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal variant="fade" amount={0.1}>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
                أنظمة أعمال مترابطة، مرنة، ومصممة لبيئة الأعمال في المملكة العربية السعودية.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px] text-ink/70 sm:grid-cols-1">
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

            <div className="text-[13px] text-ink/70">
              <motion.div
                className="num w-fit"
                style={{ direction: 'ltr' }}
                whileHover={{ color: 'var(--color-teal)', x: -2 }}
                transition={{ duration: 0.2 }}
              >
                hello@meemarabia.sa
              </motion.div>
              <motion.div
                className="num mt-1 w-fit"
                style={{ direction: 'ltr' }}
                whileHover={{ color: 'var(--color-teal)', x: -2 }}
                transition={{ duration: 0.2 }}
              >
                +966 5x xxx xxxx
              </motion.div>
              <div className="mt-1">المملكة العربية السعودية</div>
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