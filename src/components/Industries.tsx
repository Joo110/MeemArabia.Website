import Reveal from './Reveal';
import { industries } from '../data/content';

export default function Industries() {
  const loop = [...industries, ...industries];

  return (
    <section className="relative py-20 bg-ink overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Industries We Serve</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">تقنية تتكيف مع قطاعك</h2>
        </Reveal>
      </div>

      <div
        className="industries-marquee-mask relative mt-12 overflow-hidden"
        dir="ltr"
      >
        <div className="industries-marquee-track flex w-max gap-4">
          {loop.map((ind, i) => (
            <span
              key={i}
              dir="rtl"
              className="industries-chip whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition-colors duration-200"
            >
              {ind}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .industries-marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .industries-marquee-track {
          animation: industries-scroll 28s linear infinite;
          will-change: transform;
        }
        .industries-marquee-mask:hover .industries-marquee-track {
          animation-play-state: paused;
        }
        .industries-chip:hover {
          transform: scale(1.08);
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(20, 184, 166, 0.5);
        }
        @keyframes industries-scroll {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .industries-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
