# Meem Arabia — Landing Page

React + TypeScript + Tailwind CSS v4 + Framer Motion. RTL-first Arabic site.

## Run
```
npm install
npm run dev
```

## Build
```
npm run build
```

## Structure
- `src/data/content.ts` — كل نصوص الموقع (يسهل تعديلها من مكان واحد)
- `src/components/` — كل قسم في ملف مستقل (Hero, WhyMeem, ProductsGrid, EcosystemHub, Integrations, FeatureShowcase, BusinessAndPOS, Industries, WorkTimeline, TechStack, FAQ, ContactForm, FinalCTA, Footer)
- `src/components/MiniDashboard.tsx` — الرسوم التوضيحية المتحركة (dashboards) لأقسام HR/Finance/Invoice
- `src/components/Reveal.tsx` — helper موحّد لأنيميشن الظهور عند السكرول
- `src/lib/icons.ts` — خريطة الأيقونات (lucide-react)

## Notes
- التصميم مبني على Design tokens في `src/index.css` (`@theme`): ألوان `ink/blue/teal/green/paper`, وخطين: IBM Plex Sans Arabic (نصوص) + Space Grotesk (أرقام/إحصائيات).
- العنصر المميز (signature): `EcosystemHub.tsx` — رسم مداري متحرك يوضح ترابط أنظمة ميم حول الشعار المركزي.
- كل الأنيميشن يحترم `prefers-reduced-motion`.
