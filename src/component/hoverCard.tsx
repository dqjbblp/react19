const HoverCard = () => {
  return (
    <div className="group relative flex justify-center flex-col items-center">
      <div
        className={
          "absolute w-25 h-25 border rounded-xl p-1 border-amber-500 bg-red-700 items-center justify-center hidden -top-25 group-hover:flex"
        }
      >
        is hover
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        hover card
      </button>
    </div>
  );
};

export default HoverCard;
