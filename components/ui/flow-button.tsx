import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

type FlowButtonProps = {
  buttonType?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  href?: string;
  style?: CSSProperties;
  text: string;
};

const baseClassName =
  'group relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] hover:border-transparent hover:text-white active:scale-[0.95]';

export function FlowButton({
  buttonType = 'button',
  text,
  href,
  className = '',
  disabled = false,
  style,
}: FlowButtonProps) {
  const stateClassName = disabled ? 'pointer-events-none opacity-60' : '';
  const mergedClassName = [baseClassName, className, stateClassName].filter(Boolean).join(' ');

  const content = (
    <>
      <ArrowRight className="absolute left-[-25%] z-[9] h-4 w-4 fill-none stroke-[#111111] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4 group-hover:stroke-white" />

      <span className="relative z-[1] -translate-x-3 transition-all duration-[800ms] ease-out group-hover:translate-x-3">
        {text}
      </span>

      <span className="absolute inset-0 z-0 scale-x-[0.28] rounded-[100px] bg-[#222B58] opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-hover:rounded-[12px] group-hover:opacity-100" />

      <ArrowRight className="absolute right-4 z-[9] h-4 w-4 fill-none stroke-[#111111] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%] group-hover:stroke-white" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={mergedClassName} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button type={buttonType} className={mergedClassName} style={style} disabled={disabled}>
      {content}
    </button>
  );
}
