const StatCard = ({ label, value }) => {
    return (
      <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 mt-1">{label}</div>
      </div>
    );
  };
  
  export default StatCard;
  