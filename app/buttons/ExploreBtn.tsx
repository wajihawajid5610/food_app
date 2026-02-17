

const ExploreBtn = ({ category }: { category: { color: string } }) => {
  
    const colorMap: Record<string, string> = {
    black: "bg-black text-white",
    white: "bg-white text-black",
  };

  return (
    <div>
      <button
        className={`hidden md:block ${colorMap[category.color] || 'bg-gray-200 text-black'} py-2 px-4 rounded-md`}
      >
        Explore
      </button>
    </div>
  );
};

export default ExploreBtn;
