import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
  onClick,
  bgColor = 'bg-blue-600',
  hoverBgColor = 'bg-blue-700',
  textColor = 'text-white',
  className = '',
  size,            // 'sm' | 'md' | 'lg' (optional; when provided, overrides default px/py)
  fullWidth = false
}) => {
  const sizeClasses = size === 'sm'
    ? 'px-4 py-2 text-sm'
    : size === 'lg'
      ? 'px-8 py-4 text-lg'
      : size === 'md'
        ? 'px-6 py-3 text-base'
        : ''; // if not provided, keep component's default paddings

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`${bgColor} ${textColor} ${widthClass} ${size ? sizeClasses : 'px-6 py-3'} rounded-lg cursor-pointer font-medium ${className}`}
      whileHover={{
        backgroundColor: hoverBgColor,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;