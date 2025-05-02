export const Textarea = ({ rows = 3, ...props }) => (
    <textarea
      rows={rows}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );