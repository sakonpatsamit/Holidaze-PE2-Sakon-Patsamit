const VenueCard = ({ id, title, description, image, location }) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div
          className="bg-gray-300 h-40"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background: "url(/placeholder-house.png)",
          }}
        >
          {image && image.length > 0 ? (
            <img src={image} alt={title} className="h-40 w-full object-cover" />
          ) : (
            ""
          )}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <small className="font-bold text-sm">
            {location.city || ""}, {location.country || ""}
          </small>
          <p className="text-gray-700 text-base">
            {description.length > 100
              ? description.substr(0, 100) + "..."
              : description}
          </p>
        </div>
      </div>
    </>
  );
};

export default VenueCard;
