import { motion } from 'framer-motion';

const AnimatedOutlineButton = ({
  children,
  onClick,
  borderColor = 'border-blue-600',
  textColor = 'text-blue-600',
  hoverBgColor = 'bg-blue-50',
  className = '',
  size,           // 'sm' | 'md' | 'lg' (optional; when provided, overrides default px/py)
  fullWidth = false
}) => {
  const sizeClasses = size === 'sm'
    ? 'px-4 py-2 text-sm'
    : size === 'lg'
      ? 'px-8 py-4 text-lg'
      : size === 'md'
        ? 'px-6 py-3 text-base'
        : ''; // if not provided, keep component's original default paddings

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`border ${borderColor} ${textColor} ${widthClass} ${size ? sizeClasses : 'px-6 py-3'} w-[150px] h-[47px] rounded-lg cursor-pointer flex justify-center items-center font-medium ${className}`}
      whileHover={{
        backgroundColor: hoverBgColor,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        backgroundColor: 'transparent',
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedOutlineButton;