function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white dark:bg-blue-500 dark:text-white",
    outline:
      "border-2 border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 " +
      "hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 " +
      "focus:ring-blue-300 bg-white dark:bg-gray-800",
  };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
