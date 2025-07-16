import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-lg font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-4 text-lg border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-orange-300 focus:border-orange-500'
        }`}
        required={required}
      />
      {error && (
        <p className="text-red-600 text-base font-medium">{error}</p>
      )}
    </div>
  );
};