export const Switch = ({ checked, onCheckedChange, ...props }) => (
    <button
      type="button"
      className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
  