import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import Reveal, { RevealStagger, staggerItemFadeX } from './Reveal';
import { companySizes, interestedIn, integrationReqs, deploymentPref } from '../data/content';

const WHATSAPP_NUMBER = '966566817575';

function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <motion.button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            whileTap={{ scale: 0.92 }}
            animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`num rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
              active
                ? 'border-transparent gradient-brand text-white shadow-md shadow-blue/20'
                : 'border-line bg-white text-ink/70 hover:border-ink/30'
            }`}
            style={{ direction: /[A-Za-z]/.test(opt) ? 'ltr' : 'rtl' }}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [integrationsSel, setIntegrationsSel] = useState<string[]>([]);
  const [deployment, setDeployment] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('الاسم الكامل') as string;
    const company = formData.get('اسم الشركة') as string;
    const email = formData.get('البريد الإلكتروني') as string;
    const phone = formData.get('رقم الجوال') as string;
    const companySize = formData.get('حجم الشركة') as string;
    const details = formData.get('تفاصيل المشروع') as string;

    const lines = [
      'طلب استشارة جديد من الموقع',
      '',
      `الاسم: ${name || '—'}`,
      `الشركة: ${company || '—'}`,
      `البريد الإلكتروني: ${email || '—'}`,
      `رقم الجوال: ${phone || '—'}`,
      companySize ? `حجم الشركة: ${companySize}` : null,
      `مهتم بـ: ${interests.length ? interests.join('، ') : 'لم يحدد'}`,
      `متطلبات التكامل: ${integrationsSel.length ? integrationsSel.join('، ') : 'لم يحدد'}`,
      deployment ? `تفضيل بيئة التشغيل: ${deployment}` : null,
      details ? `تفاصيل المشروع: ${details}` : null,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    form.reset();
    setInterests([]);
    setIntegrationsSel([]);
    setDeployment('');
  };

  return (
    <section id="contact" className="relative py-24 bg-paper-2/60">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal className="text-center" variant="blurUp">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal">Contact Us</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-ink">لنبني ما تحتاجه منشأتك</h2>
          <p className="mt-4 text-muted leading-relaxed">
            سواء كنت تبحث عن نظام موارد بشرية، أو مالي، أو نقاط بيع، أو حل مخصص، نبدأ بفهم احتياجك.
          </p>
        </Reveal>

        <Reveal delay={0.1} variant="scale" className="mt-12 rounded-3xl border border-line bg-card p-6 shadow-xl shadow-ink/5 sm:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal"
                >
                  <CheckCircle2 size={32} />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-5 text-xl font-bold text-ink"
                >
                  جاري فتح واتساب
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-2 max-w-sm text-sm text-muted"
                >
                  تم تجهيز رسالتك، أكمل الإرسال من واتساب وسيتواصل معك فريق ميم العربية في أقرب وقت.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold text-teal hover:underline"
                >
                  إرسال طلب آخر
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.06} once>
                  <motion.div variants={staggerItemFadeX}>
                    <Field label="الاسم الكامل" required>
                      <input required name="الاسم الكامل" type="text" className="input" placeholder="اسمك الكامل" />
                    </Field>
                  </motion.div>
                  <motion.div variants={staggerItemFadeX}>
                    <Field label="اسم الشركة" required>
                      <input required name="اسم الشركة" type="text" className="input" placeholder="اسم المنشأة" />
                    </Field>
                  </motion.div>
                  <motion.div variants={staggerItemFadeX}>
                    <Field label="البريد الإلكتروني" required>
                      <input
                        required
                        name="البريد الإلكتروني"
                        type="email"
                        className="input"
                        placeholder="you@company.com"
                        style={{ direction: 'ltr' }}
                      />
                    </Field>
                  </motion.div>
                  <motion.div variants={staggerItemFadeX}>
                    <Field label="رقم الجوال" required>
                      <input
                        required
                        name="رقم الجوال"
                        type="tel"
                        className="input"
                        placeholder="05xxxxxxxx"
                        style={{ direction: 'ltr' }}
                      />
                    </Field>
                  </motion.div>
                </RevealStagger>

                <Field label="حجم الشركة">
                  <select name="حجم الشركة" className="input" defaultValue="">
                    <option value="" disabled>اختر حجم الشركة</option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="مهتم بـ">
                  <ChipGroup options={interestedIn} selected={interests} onToggle={(v) => toggle(interests, setInterests, v)} />
                </Field>

                <Field label="متطلبات التكامل">
                  <ChipGroup
                    options={integrationReqs}
                    selected={integrationsSel}
                    onToggle={(v) => toggle(integrationsSel, setIntegrationsSel, v)}
                  />
                </Field>

                <Field label="تفضيل بيئة التشغيل">
                  <div className="flex flex-wrap gap-2">
                    {deploymentPref.map((d) => (
                      <motion.button
                        type="button"
                        key={d}
                        onClick={() => setDeployment(d)}
                        whileTap={{ scale: 0.94 }}
                        animate={deployment === d ? { scale: [1, 1.05, 1] } : {}}
                        className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
                          deployment === d ? 'border-transparent bg-ink text-white' : 'border-line bg-white text-ink/70 hover:border-ink/30'
                        }`}
                      >
                        {d}
                      </motion.button>
                    ))}
                  </div>
                </Field>

                <Field label="تفاصيل المشروع">
                  <textarea
                    name="تفاصيل المشروع"
                    rows={4}
                    className="input resize-none"
                    placeholder="أخبرنا عن التحدي الذي تريد حله والأنظمة التي تستخدمها حاليًا."
                  />
                </Field>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 14px 30px rgba(37,211,102,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg sm:w-auto"
                >
                  إرسال عبر واتساب
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MessageCircle size={16} />
                  </motion.span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--color-line);
          background: white;
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          font-size: 13.5px;
          color: var(--color-ink);
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: var(--color-teal);
          box-shadow: 0 0 0 3px rgba(20,184,166,0.15);
          outline: none;
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-ink/80">
        {label} {required && <span className="text-teal">*</span>}
      </span>
      {children}
    </label>
  );
}