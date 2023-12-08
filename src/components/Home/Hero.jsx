function Hero({ image }) {
  return (
    <div className="relative text-center p-8">
      <img
        src={image}
        alt="Scenic view"
        className="w-full h-96 rounded-lg object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-bold text-gray-900 my-4 bg-pink-200 bg-opacity-50 p-2 rounded">
          Every day, a getaway
        </h2>
      </div>
    </div>
  );
}

export default Hero;
