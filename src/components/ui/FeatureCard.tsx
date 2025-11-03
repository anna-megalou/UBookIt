import { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon | ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlighted?: boolean;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  highlighted = false,
  className = '',
}: FeatureCardProps) {
  const baseClasses = 'px-6 py-6 rounded-3xl h-50';
  const variantClasses = highlighted
    ? 'bg-primary-dark text-white'
    : 'border-3 border-secondary-border shadow-sm bg-white-light';

  const iconClasses = highlighted
    ? 'text-white'
    : 'text-primary-dark';

  const textClasses = highlighted
    ? 'text-white'
    : 'text-secondary-dark';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <div className="flex flex-row justify-start items-center mb-4 gap-3">
        <div className="flex items-start justify-start mr-2">
          <Icon className={`w-14 h-14 ${iconClasses}`} />
        </div>
        <h3 className={`text-2xl font-semibold ${textClasses}`}>
          {title}
        </h3>
      </div>
      <p className={`${textClasses} text-sm font-semibold`}>
        {description}
      </p>
    </div>
  );
}

