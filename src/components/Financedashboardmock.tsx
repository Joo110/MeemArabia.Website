import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  delta: string;
  up: boolean;
}

const statsRow1: Stat[] = [
  { label: 'صافي الربح', value: '$13.320', delta: '33%', up: true },
  { label: 'اجمالي المصروفات', value: '$19.110', delta: '1.5%', up: false },
  { label: 'اجمالي الايردات', value: '$32.816', delta: '11.5%', up: true },
];
const statsRow2: Stat[] = [
  { label: 'رصيد الحسابات والبنوك', value: '$8.920', delta: '12.5%', up: true },
  { label: 'مستحقات الموردين', value: '$2.600', delta: '12.5%', up: true },
  { label: 'مستحقات العملاء', value: '$4.816', delta: '7.2%', up: false },
];

const months: string[] = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
const revenue: number[] = [55, 70, 40, 60, 75, 50, 90, 100, 45, 65, 80, 60];
const expenses: number[] = [40, 50, 30, 45, 55, 35, 60, 65, 35, 45, 55, 40];

interface StatCardProps {
  s: Stat;
  i: number;
}

function StatCard({ s, i }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.4 }}
      className="rounded-2xl bg-white p-4 shadow-sm"
    >
      <p className="text-[10.5px] text-muted">{s.label}</p>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="num text-[17px] font-bold text-ink">{s.value}</span>
        <span
          className="num rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
          style={{
            color: s.up ? '#16A34A' : '#DC2626',
            background: s.up ? '#DCFCE7' : '#FEE2E2',
          }}
        >
          {s.up ? '▲' : '▼'} {s.delta}
        </span>
      </div>
    </motion.div>
  );
}

export default function FinanceDashboardMock() {
  return (
    <div dir="rtl" className="space-y-4 rounded-2xl bg-[#F3F4F8] p-4">
      <div className="grid grid-cols-3 gap-3">
        {statsRow1.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
        {statsRow2.map((s, i) => <StatCard key={s.label} s={s} i={i + 3} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl bg-white p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[13px] font-bold text-ink">الإيرادات مقابل المصروفات</h4>
          </div>
          <div className="flex gap-3 text-[10px] text-muted">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#F59E0B]" />المصروفات</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#EF4444]" />الإيرادات</span>
          </div>
        </div>

        <div className="relative mt-4 flex h-40 items-end gap-2">
          {months.map((m, i) => (
            <div key={m} className="flex flex-1 flex-col items-center gap-0.5">
              <div className="flex w-full items-end justify-center gap-0.5" style={{ height: 128 }}>
                <motion.div
                  className="w-2 rounded-t"
                  style={{ background: '#EF4444' }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${revenue[i]}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                />
                <motion.div
                  className="w-2 rounded-t"
                  style={{ background: '#F59E0B' }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${expenses[i]}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + 0.02, duration: 0.4 }}
                />
              </div>
              <span className="num text-[8px] text-muted">{m}</span>
            </div>
          ))}
          <div className="absolute right-[8%] top-0 space-y-1 rounded-lg bg-[#0A0F28] px-2.5 py-1.5 text-[9px] text-white shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <span className="opacity-70">الإيرادات</span>
              <span className="num font-bold text-[#4ADE80]">$12,890.00 ▲15%</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="opacity-70">المصروفات</span>
              <span className="num font-bold text-[#F87171]">$4,120.00 ▲15%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}