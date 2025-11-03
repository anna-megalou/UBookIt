import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', inputClassName = '', id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`flex flex-col justify-start items-start gap-1 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-primary-dark text-lg font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-6 py-4 rounded-full border-2 border-secondary-typography text-secondary-dark text-lg focus:border-secondary-dark focus:outline-none not-placeholder-shown:border-secondary-dark bg-white ${inputClassName}`}
          {...props}
        />
        {error && (
          <span className="text-accents-red text-sm mt-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

