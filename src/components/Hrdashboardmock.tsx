import { motion } from 'framer-motion';

interface AttendanceDay {
  day: string;
  a: number;
  b: number;
  c: number;
}

interface Department {
  name: string;
  pct: number;
  color: string;
}

const attendanceData: AttendanceDay[] = [
  { day: 'السبت', a: 55, b: 20, c: 10 },
  { day: 'الأحد', a: 60, b: 15, c: 12 },
  { day: 'الاثنين', a: 50, b: 25, c: 8 },
  { day: 'الثلاثاء', a: 65, b: 18, c: 10 },
  { day: 'الأربعاء', a: 58, b: 22, c: 9 },
];

const departments: Department[] = [
  { name: 'الهندسة', pct: 35, color: '#6366F1' },
  { name: 'المبيعات', pct: 25, color: '#22D3EE' },
  { name: 'التسويق', pct: 15, color: '#A78BFA' },
  { name: 'المواد البشرية', pct: 15, color: '#F472B6' },
  { name: 'العمليات', pct: 10, color: '#34D399' },
];

const donutGradient: string = (() => {
  let acc = 0;
  const stops = departments.map((d) => {
    const start = acc;
    acc += d.pct;
    return `${d.color} ${start}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
})();

const salaryPoints: number[] = [30, 45, 38, 55, 48, 65, 60, 78, 70, 90, 82, 100];
const salaryPath: string = (() => {
  const w = 560, h = 140, max = 100;
  const stepX = w / (salaryPoints.length - 1);
  return salaryPoints
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX},${h - (v / max) * h}`)
    .join(' ');
})();

export default function HRDashboardMock() {
  return (
    <div dir="rtl" className="space-y-4 rounded-2xl bg-[#F3F4F8] p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Attendance bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white p-4 shadow-sm"
        >
          <h4 className="text-[13px] font-bold text-ink">نسبة الحضور</h4>
          <p className="text-[10px] text-muted">نظرة شهرية على نسبة الحضور</p>
          <div className="mt-4 flex h-32 items-end justify-between gap-2">
            {attendanceData.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col justify-end overflow-hidden rounded-md" style={{ height: 96 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.c}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    style={{ background: '#F472B6' }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.b}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    style={{ background: '#22D3EE' }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${d.a}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    style={{ background: '#6366F1' }}
                  />
                </div>
                <span className="num text-[9px] text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Departments donut */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-white p-4 shadow-sm"
        >
          <h4 className="text-[13px] font-bold text-ink">توزيع الأقسام</h4>
          <p className="text-[10px] text-muted">الموظفين حسب القسم</p>
          <div className="mt-3 flex items-center gap-3">
            <ul className="flex-1 space-y-1.5">
              {departments.map((d) => (
                <li key={d.name} className="flex items-center gap-1.5 text-[10.5px] text-muted">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-24 w-24 shrink-0 rounded-full"
              style={{ background: donutGradient }}
            >
              <div className="absolute inset-[22%] rounded-full bg-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Salary trends line chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl bg-white p-4 shadow-sm"
      >
        <h4 className="text-[13px] font-bold text-ink">اتجاهات الرواتب</h4>
        <p className="text-[10px] text-muted">نظرة شهرية على مصروفات الرواتب</p>
        <div className="relative mt-4">
          <svg viewBox="0 0 560 140" className="w-full" preserveAspectRatio="none">
            <motion.path
              d={salaryPath}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute right-[38%] top-2 rounded-lg bg-[#0A0F28] px-2 py-1 text-[9px] text-white shadow">
            <div className="num opacity-70">3 يوليو</div>
            <div className="num font-bold text-teal">79K$</div>
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-muted">
            {['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}