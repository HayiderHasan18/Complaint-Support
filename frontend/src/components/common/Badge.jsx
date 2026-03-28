function Badge({ label, type = "default" }) {
  const styles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",

    open: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
    closed: "bg-gray-200 text-gray-600",

  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[type.toLowerCase()]}`}>
      {label}
    </span>
  );
}

export default Badge;
