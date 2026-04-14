import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105",
    outline:
      "border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950",
    ghost:
      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
  {...props}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 300 }}
  className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
>
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
