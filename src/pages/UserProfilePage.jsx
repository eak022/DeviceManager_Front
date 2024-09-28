import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";

const UserProfilePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const maskingString = (str, start, end) => {
    if (
      !str ||
      start < 0 ||
      start > str.length ||
      end < 0 ||
      end > str.length ||
      start > end
    ) {
      return str;
    }
    const maskedStr =
      str.substring(0, start) + "*".repeat(20) + str.substring(end);
    return maskedStr;
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="User"
            className="w-40 h-40 rounded-full border-4 border-blue-500"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xl">
            <span className="font-semibold text-lg">User ID:</span> {user?.id}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-lg">Username:</span> {user?.username}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-lg">Email:</span> {user?.email}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-lg">Role:</span> {user?.roles?.join(", ")}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-lg">Token:</span>{" "}
            {user?.accessToken
              ? maskingString(user.accessToken, 3, user.accessToken.length - 3)
              : "No token available"}
          </p>
          <p className="text-xl">
            <span className="font-semibold text-lg">Address:</span>{" "}
            {user?.address || "No address provided"}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
