import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const logoutBtn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("error during logout : ", error.message);
    }
  };
  return (
    <div>
      <button
        className="bg-black px-4 py-2 w-24 text-white"
        onClick={logoutBtn}
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
