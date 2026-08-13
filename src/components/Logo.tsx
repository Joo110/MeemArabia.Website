import logoImg from '../assets/Artboard.jpg.jpeg';

export default function Logo({ withText = true, className = '' }: { withText?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-sm">
        <img src={logoImg} alt="ميم العربية" className="h-full w-full object-cover" />
      </div>
      {withText && (
        <div className="leading-tight">
          <div className="font-bold text-[15px] text-ink">ميم العربية</div>
          <div className="text-[10px] tracking-widest text-muted num uppercase">Arabian Meem</div>
        </div>
      )}
    </div>
  );
}