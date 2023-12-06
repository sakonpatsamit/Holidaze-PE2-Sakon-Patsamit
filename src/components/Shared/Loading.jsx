const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin-slow h-12 w-12 border-4 border-pink-200 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
