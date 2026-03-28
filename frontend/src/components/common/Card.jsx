function Card({ title, children, className = "" }) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-5 space-y-3
        border border-gray-200 dark:border-gray-700
        bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        shadow-sm hover:shadow-md transition-all duration-300
        ${className}
      `}
    >
      {title && (
        <h3 className="font-semibold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-200 dark:to-gray-400">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
