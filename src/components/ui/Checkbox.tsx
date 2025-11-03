import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', labelClassName = '', id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="accent-primary-dark w-4 h-4"
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={`text-primary-dark text-lg ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

