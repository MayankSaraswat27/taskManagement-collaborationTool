import PropTypes from "prop-types";

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />

      <label
        className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
        peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-blue-500 
        bg-white dark:bg-gray-900 px-1"
      >
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};