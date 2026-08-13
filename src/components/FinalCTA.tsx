import { motion } from 'framer-motion';
import Reveal, { magneticProps } from './Reveal';
import { useReducedMotion } from 'framer-motion';

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:px-16">
            <motion.div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full gradient-brand opacity-20 blur-3xl"
              animate={{ scale: [1, 1.25, 1], x: [0, -20, 0], y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue/30 opacity-20 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], x: [0, 20, 0], y: [0, -15, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            {!reduceMotion && (
              <motion.div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            )}

            <motion.h2
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-3xl font-bold leading-snug text-white sm:text-4xl"
            >
              جاهز لبناء أعمال أكثر ذكاءً؟
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative mx-auto mt-4 max-w-xl text-white/70 leading-relaxed"
            >
              نظام يتكيف مع أعمالك اليوم، ويتوسع معك غدًا. من الموارد البشرية إلى نقاط البيع
              والتكاملات، نبني منظومة تساعدك على العمل بكفاءة أكبر.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.35 }}
              className="relative mt-8 flex flex-wrap justify-center gap-3"
            >
              <motion.a
                href="#products"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                {...(!reduceMotion ? magneticProps(6) : {})}
                whileHover={{ scale: 1.04, boxShadow: '0 12px 30px rgba(47,93,255,0.45)' }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg"
              >
                اكتشف منتجاتنا
              </motion.a>
              <motion.a
                href="#contact"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.96 }}
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white"
              >
                تحدث مع فريقنا
              </motion.a>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}