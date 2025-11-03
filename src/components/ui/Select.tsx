'use client';

import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Select({
  id,
  required = false,
  options,
  placeholder = 'Choose an option',
  className = '',
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 rounded-full border-2 text-lg focus:border-secondary-dark focus:outline-none appearance-none cursor-pointer bg-white flex items-center justify-between ${
          selectedValue
            ? 'border-secondary-dark text-primary-dark'
            : 'border-secondary-typography text-secondary-typography'
        }`}
      >
        <span className={selectedValue ? 'text-primary-dark' : 'text-secondary-typography'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-secondary-border rounded-2xl shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (option.value !== '') {
                  handleSelect(option.value);
                }
              }}
              disabled={option.value === ''}
              className={`w-full px-6 py-3 text-left text-lg hover:bg-primary-light transition-colors ${
                selectedValue === option.value
                  ? 'bg-primary-light font-semibold text-primary-dark'
                  : option.value === ''
                  ? 'text-secondary-typography cursor-not-allowed'
                  : 'text-primary-dark cursor-pointer'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {required && (
        <input
          type="hidden"
          name={id}
          value={selectedValue}
          required={required}
        />
      )}
    </div>
  );
}

