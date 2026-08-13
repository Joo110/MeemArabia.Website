import { motion } from 'framer-motion';

const donutSegs = [
  { color: '#2F5DFF', pct: 45 },
  { color: '#14B8A6', pct: 30 },
  { color: '#34D399', pct: 25 },
];

export function HRDashboard() {
  const bars = [55, 70, 48, 82, 60, 90];
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-paper-2/70 p-3.5">
          <div className="mb-2 text-[10px] text-muted">نسبة الحضور</div>
          <div className="flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t gradient-brand"
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-paper-2/70 p-3.5">
          <div className="mb-2 text-[10px] text-muted">توزيع الإجازات</div>
          <div className="flex items-center justify-center py-2">
            <svg viewBox="0 0 42 42" className="h-20 w-20 -rotate-90">
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#ECEFF7" strokeWidth="6" />
              {(() => {
                let offset = 0;
                return donutSegs.map((s, i) => {
                  const circumference = 2 * Math.PI * 15.9;
                  const dash = (s.pct / 100) * circumference;
                  const el = (
                    <motion.circle
                      key={i}
                      cx="21"
                      cy="21"
                      r="15.9"
                      fill="transparent"
                      stroke={s.color}
                      strokeWidth="6"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                    />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-paper-2/70 p-3.5">
        <div className="mb-2 text-[10px] text-muted">طلبات الموظفين هذا الشهر</div>
        <svg viewBox="0 0 200 50" className="h-12 w-full">
          <motion.polyline
            points="0,40 30,28 60,34 90,15 120,22 150,10 180,18 200,8"
            fill="none"
            stroke="#14B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </svg>
      </div>
    </div>
  );
}

export function FinanceDashboard() {
  const kpis = [
    { label: 'صافي الربح', value: '13,320$', delta: '+3.9%' },
    { label: 'إجمالي المبيعات', value: '19,110$', delta: '+1.2%' },
    { label: 'إجمالي المصروفات', value: '32,816$', delta: '-1.1%' },
  ];
  const bars = [
    { rev: 60, exp: 30 }, { rev: 45, exp: 55 }, { rev: 80, exp: 40 },
    { rev: 35, exp: 65 }, { rev: 70, exp: 45 }, { rev: 90, exp: 30 },
  ];
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-lg">
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            className="rounded-xl bg-paper-2/70 p-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="text-[9px] text-muted">{k.label}</div>
            <div className="num mt-1 text-[13px] font-bold text-ink">{k.value}</div>
            <div className="num text-[9px] text-teal">{k.delta}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-paper-2/70 p-3.5">
        <div className="mb-2 text-[10px] text-muted">الإيرادات مقابل المصروفات</div>
        <div className="flex h-24 items-end gap-2">
          {bars.map((b, i) => (
            <div key={i} className="flex flex-1 items-end gap-0.5">
              <motion.div
                className="flex-1 rounded-t bg-teal"
                initial={{ height: 0 }}
                whileInView={{ height: `${b.rev}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              />
              <motion.div
                className="flex-1 rounded-t bg-blue/40"
                initial={{ height: 0 }}
                whileInView={{ height: `${b.exp}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 + 0.05 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InvoiceDashboard() {
  const rows = [
    { d: 'ترخيص نظام الموارد البشرية', q: 1, p: '12,500', t: '12,500' },
    { d: 'خدمات التطبيق', q: 2, p: '2,100', t: '4,200' },
  ];
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-ink">فاتورة ضريبية مبسطة</span>
        <div className="h-8 w-8 rounded-md bg-ink/90 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-[1.5px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-[3px] w-[3px] bg-white/80" style={{ opacity: [0,2,4,6,8].includes(i) ? 1 : 0.3 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="-mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[380px] text-[10.5px] sm:min-w-0">
          <colgroup>
            <col className="w-[46%]" />
            <col className="w-[16%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="pb-2 text-right font-medium">الوصف</th>
              <th className="pb-2 text-center font-medium">الكمية</th>
              <th className="pb-2 text-center font-medium">السعر</th>
              <th className="pb-2 text-center font-medium">المجموع</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.d}
                className="border-b border-line/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <td className="py-2 pl-2 text-ink/80">{r.d}</td>
                <td className="num py-2 text-center text-ink/70">{r.q}</td>
                <td className="num py-2 text-center whitespace-nowrap text-ink/70">{r.p}</td>
                <td className="num py-2 text-center whitespace-nowrap font-medium text-ink">{r.t}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-paper-2/70 px-3 py-2.5 text-[11px]">
        <span className="text-muted">الإجمالي شامل الضريبة (15%)</span>
        <span className="num font-bold text-ink">19,035 ر.س</span>
      </div>
    </div>
  );
}
