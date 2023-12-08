import { useEffect, useState } from "react";
import { editAvatar, getMyProfile } from "../../services/profile";
import LoadingSpinner from "../Shared/Loading";
import Alert from "../Shared/Alert";

const EditAvatar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setUserProfile(res);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refresh]);

  const handleChangeAvatar = () => {
    if (newAvatarUrl) {
      editAvatar(newAvatarUrl)
        .then((res) => {
          setNewAvatarUrl("");
          setRefresh(!refresh);
        })
        .catch((error) => {
          alert("Unable to upload your avatar");
        });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  else if (error)
    return (
      <Alert
        type="error"
        title="Something went wrong"
        text="We were unable to load your bookings. Please refresh the page to try again."
      />
    );
  else
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center space-y-4 md:space-y-0 md:space-x-8 mb-10">
        {userProfile.avatar && userProfile.avatar.length > 0 && (
          <div className="flex flex-col items-center">
            <img
              src={userProfile.avatar}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
            {userProfile.name && (
              <span className="font-bold mt-3 text-lg ">
                {userProfile.name}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            className="border-2 border-gray-300 rounded p-3 text-lg"
            placeholder="New avatar URL"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
          />
          <button
            onClick={handleChangeAvatar}
            className="px-5 py-3 bg-gray-900 text-white text-lg rounded hover:bg-pink-700"
          >
            Change Avatar
          </button>
        </div>
      </div>
    );
};

export default EditAvatar;
