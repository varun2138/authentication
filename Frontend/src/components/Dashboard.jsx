import React from "react";
import Logout from "./Logout";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-row h-8 text-center bg-primary-900 text-white">
      <h1>Dashboard</h1>
      <Logout />
    </div>
  );
};

export default Dashboard;
