import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold rounded-full transition-colors focus:outline-none';

  const variantClasses = {
    primary: 'bg-primary-dark text-white hover:bg-secondary-dark',
    secondary: 'bg-white text-primary-dark border border-primary-dark hover:bg-primary-light',
    outline: 'bg-transparent text-primary-dark border-2 border-primary-dark hover:bg-primary-light',
  };

  const sizeClasses = {
    sm: 'px-6 py-2 text-sm h-10',
    md: 'px-10 py-3 text-md h-12',
    lg: 'px-12 py-4 text-lg h-15',
  };

  const widthClass = fullWidth ? 'w-full' : 'w-fit';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
