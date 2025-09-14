import React from 'react';

type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
}


const GlassyButton: React.FC<ButtonProps> = ({ children, className, size = 'md', ...props }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-4 py-2 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-12 py-5 text-xl';
      break;
    case 'md':
    default:
      sizeClasses = 'px-8 py-4 text-lg';
      break;
  }

  const baseClasses = `
    relative overflow-hidden rounded-2xl font-bold italic text-white
    border border-green-900/70
    bg-gradient-to-br from-green-900 via-green-800 to-green-700/80
    backdrop-blur-xl
    shadow-[0_8px_32px_rgba(0,64,0,0.25),_inset_0_1px_0_rgba(0,128,0,0.18)]
    transition-all duration-300 ease-in-out
    animate-pulse-custom
    font-sans
  `;

  const shineClasses = `
    before:content-[''] before:absolute before:top-0 before:w-3/4 before:h-full
    before:-skew-x-[30deg] before:transition-all before:duration-700 before:ease-in-out
    before:bg-gradient-to-r before:from-transparent before:via-green-200/20 before:to-transparent
    before:-left-full hover:before:left-[125%]
  `;

  const interactionClasses = `
    hover:-translate-y-1 
    hover:shadow-[0_12px_32px_rgba(0,0,0,0.25),_inset_0_1px_0_rgba(255,255,255,0.2)]
    active:translate-y-0.5 active:shadow-[0_4px_12px_rgba(0,0,0,0.3),_inset_0_1px_0_rgba(255,255,255,0.2)]
    active:duration-150
  `;

  
  const combinedClasses = `${baseClasses} ${sizeClasses} ${shineClasses} ${interactionClasses} ${className || ''}`;

  return (
    <button className={combinedClasses} {...props}>
      <span className="font-bold italic tracking-wide" style={{fontFamily: 'cursive, sans-serif'}}>
        {children}
      </span>
    </button>
  );
};

export default GlassyButton;