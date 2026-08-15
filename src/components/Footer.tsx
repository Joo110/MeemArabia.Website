import { motion} from 'framer-motion';
import { Mail, Globe } from 'lucide-react';
import Logo from './Logo';
import Reveal from './Reveal';

const companyLinks = [
  { label: 'من نحن', href: '#why' },
  { label: 'لماذا ميم؟', href: '#why' },
  { label: 'المنتجات', href: '#products' },
  { label: 'مشاريعنا', href: '#work' },
  { label: 'تواصل معنا', href: '#contact' },
];

const solutionLinks = [
  { label: 'الموارد البشرية', href: '#hr' },
  { label: 'المالية والمحاسبة', href: '#products' },
  { label: 'تكامل الأنظمة', href: '#integrations' },
];

const resourceLinks = [
  { label: 'الأسئلة الشائعة', href: '#faq' },
  { label: 'مركز المساعدة', href: '#contact' },
  { label: 'الدعم الفني', href: '#contact' },
  { label: 'التكاملات', href: '#integrations' },
];

const contactLinks = [
  { label: 'info@meemarabia.sa', href: 'mailto:info@meemarabia.sa' },
  { label: 'sales@meemarabia.sa', href: 'mailto:sales@meemarabia.sa' },
  { label: '056 681 7575', href: 'tel:+966566817575' },
  { label: 'المملكة العربية السعودية', href: '#contact' },
];

// NOTE on alignment: Tailwind's `items-end` maps to CSS `align-items: flex-end`,
// which follows the *logical* inline-end — on an RTL page that is the LEFT edge,
// not the right. That's what was pushing the contact numbers/emails to the left.
// Fixing this properly for RTL means using explicit `text-right` on full-width
// block links instead of flex cross-axis alignment.
function FooterLinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="text-center sm:text-right">
      <span className="text-xs font-semibold uppercase tracking-widest text-teal">{title}</span>
      <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-white/65">
        {links.map((l) => (
          <motion.a
            key={l.label}
            href={l.href}
            className="relative block w-full text-center transition-colors hover:text-white sm:text-right"
            whileHover="hover"
            initial="rest"
          >
            {l.label}
            <motion.span
              className="absolute -bottom-0.5 right-0 hidden h-px w-full bg-white sm:block"
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              style={{ transformOrigin: 'right' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function ContactCol() {
  return (
    <div className="text-center sm:text-right">
      <span className="text-xs font-semibold uppercase tracking-widest text-teal">التواصل</span>
      <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-white/65">
        {contactLinks.map((l) => {
          const isLatin = /^[a-zA-Z0-9@.\s+]+$/.test(l.label);
          return (
            <motion.a
              key={l.label}
              href={l.href}
              className="num block w-full text-center transition-colors hover:text-white sm:text-right"
              style={isLatin ? { direction: 'ltr', unicodeBidi: 'plaintext' } : undefined}
              whileHover={{ color: '#14B8A6' }}
              transition={{ duration: 0.2 }}
            >
              {l.label}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(120%_140%_at_15%_0%,#232a5c_0%,#171b3c_38%,#0c0e22_100%)]">
     

      {/* link columns */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <Reveal variant="fade" amount={0.1}>
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:gap-8 sm:text-right lg:grid-cols-5">
            <div className="flex flex-col items-center sm:items-end lg:col-span-1">
              <div className="[&_.font-bold]:text-white [&_.text-muted]:text-white/50">
                <Logo />
              </div>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
                حلول تقنية متكاملة تساعد منشأتك على النمو، من الموارد البشرية والمالية — أنظمة مترابطة، مرنة، ومصممة لبيئة الأعمال في المملكة.
              </p>
            </div>

            <FooterLinkCol title="الشركة" links={companyLinks} />
            <FooterLinkCol title="الحلول" links={solutionLinks} />
            <FooterLinkCol title="الموارد" links={resourceLinks} />
            <ContactCol />
          </div>
        </Reveal>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-3 px-4 py-5 text-[12px] text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} ميم العربية — جميع الحقوق محفوظة</span>
          <div className="flex items-center gap-2">
            <motion.a
              href="mailto:info@meemarabia.sa"
              aria-label="البريد الإلكتروني"
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.12)' }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70"
            >
              <Mail size={14} strokeWidth={1.75} />
            </motion.a>
            <motion.a
              href="#home"
              aria-label="الموقع الإلكتروني"
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.12)' }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70"
            >
              <Globe size={14} strokeWidth={1.75} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}