import logoIcon from '../assets/logo-icon.png';

export default function Logo({ withText = true, className = '' }: { withText?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoIcon} alt="ميم العربية" width={36} height={36} decoding="async" className="h-9 w-auto object-contain" />
      {withText && (
        <div className="leading-tight">
          <div className="font-bold text-[15px] text-ink">ميم العربية</div>
          <div className="text-[10px] tracking-widest text-muted num uppercase">Meem Arabian</div>
        </div>
      )}
    </div>
  );
}