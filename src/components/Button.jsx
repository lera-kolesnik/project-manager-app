export default function Button({ children, ...props }) {
  return (
    <button
      className="px-5 py-2 text-sm md: text-base rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-100"
      {...props}
    >
      {children}
    </button>
  );
}
