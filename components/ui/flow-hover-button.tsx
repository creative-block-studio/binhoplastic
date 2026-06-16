import type { ReactNode } from 'react';

type FlowHoverButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: ReactNode;
};

const baseClassName =
  'group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-md border border-zinc-300/70 bg-zinc-100/85 px-4 py-2 font-semibold text-zinc-800 backdrop-blur-sm transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-zinc-800 before:transition-transform before:duration-1000 before:content-[""] hover:scale-105 hover:text-zinc-100 hover:before:translate-x-0 hover:before:translate-y-0 active:scale-95';

export function FlowHoverButton({
  children,
  className = '',
  href,
  icon,
}: FlowHoverButtonProps) {
  const mergedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  if (href) {
    return (
      <a className={mergedClassName} href={href}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={mergedClassName}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
