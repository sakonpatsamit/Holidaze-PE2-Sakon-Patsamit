const Alert = ({ title, text, type = "info" }) => {
  let background = "bg-pink-200";

  if (type == "error") background = "bg-red-300";
  else if (type == "success") background = "bg-green-300";

  return (
    <div className={`${background} p-6 m-6`}>
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Alert;
