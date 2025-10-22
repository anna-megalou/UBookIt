import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  highlighted?: boolean;
}

export default function Card({ children, className = '', highlighted = false }: CardProps) {
  const baseClasses = 'p-8 rounded-2xl shadow-lg';
  const variantClasses = highlighted 
    ? 'bg-blue-900 text-white' 
    : 'bg-white';
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
}
