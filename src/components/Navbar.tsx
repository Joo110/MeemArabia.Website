import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { nav } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-4 transition-all duration-300 ${
            scrolled ? 'glass-card shadow-lg shadow-ink/5 py-2' : 'py-3'
          }`}
        >
          <a href="#home" aria-label="ميم العربية - الرئيسية">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-ink/80 hover:text-ink rounded-lg hover:bg-ink/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              تواصل معنا
            </a>
            <a
              href="#contact"
              className="relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10">احجز استشارة</span>
              <span className="absolute inset-0 gradient-brand opacity-0 hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-ink/5"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mx-4 mt-2 overflow-hidden rounded-2xl glass-card shadow-xl"
          >
            <div className="flex flex-col p-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm text-ink/85 hover:bg-ink/5 rounded-xl"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-ink text-center"
              >
                احجز استشارة
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
