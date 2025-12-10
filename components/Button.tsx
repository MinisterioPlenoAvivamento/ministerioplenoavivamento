import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-church-black uppercase tracking-wider transform hover:-translate-y-1';
  
  const variants = {
    // Red Gradient
    primary: 'border-transparent text-white bg-gradient-to-r from-church-red to-red-800 hover:from-red-500 hover:to-church-red focus:ring-church-red shadow-lg shadow-red-900/30 hover:shadow-red-600/50',
    
    // Dark Gray/Black
    secondary: 'border border-gray-700 text-white bg-church-dark hover:bg-gray-800 focus:ring-gray-700 hover:border-gray-500',
    
    // Outline White
    outline: 'border-2 border-white/20 text-white bg-transparent hover:bg-white/5 hover:border-church-red hover:text-church-red focus:ring-church-red',
    
    // Clean White
    white: 'border-transparent text-church-black bg-white hover:bg-gray-200 focus:ring-white',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;