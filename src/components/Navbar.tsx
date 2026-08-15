import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { nav } from '../data/content';

// Routes where the navbar should always render solid (never transparent),
// even before the user scrolls — e.g. dark-hero pages where a see-through
// header over light content at the top would be hard to read.
const ALWAYS_SOLID_ROUTES = ['/hr', '/finance'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  const forceSolid = ALWAYS_SOLID_ROUTES.some((route) => pathname.startsWith(route));
  const isSolid = scrolled || forceSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep a live CSS var with the header's real rendered height (it changes
  // between the scrolled/unscrolled states). Any section can then set
  // `scroll-margin-top: var(--header-h)` so anchor jumps never hide the
  // section title behind the fixed header — fixes the P0 overlap issue.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight + 12}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, [isSolid]);

  return (
    <>
      <style>{`:root{--header-h:88px} #home,#work,#products,#integrations,#why,#faq,#contact,#hr-home,#finance-home,section[id]{scroll-margin-top:var(--header-h)}`}</style>
      <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[999] transition-all duration-300 ${
        isSolid ? 'py-1.5 sm:py-2' : 'py-3 sm:py-4'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-3 sm:px-4 transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-3 sm:px-4 transition-all duration-300 ${
            isSolid ? 'glass-card shadow-lg shadow-ink/5 py-1.5 sm:py-2' : 'py-2.5 sm:py-3'
          }`}
        >
          <Link to="/#home" aria-label="ميم العربية - الرئيسية">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink rounded-lg hover:bg-ink/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/#contact"
              className="px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              تواصل معنا
            </Link>
            <Link
              to="/#contact"
              className="relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10">احجز استشارة</span>
              <span className="absolute inset-0 gradient-brand opacity-0 hover:opacity-100 transition-opacity" />
            </Link>
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
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm text-ink/85 hover:bg-ink/5 rounded-xl"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-ink text-center"
              >
                احجز استشارة
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}