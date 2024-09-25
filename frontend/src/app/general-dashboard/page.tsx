import React from "react";
// import NavBar from "../../components/nav/NavBar";
// import NavItem from "../../components/nav/NavItem";
import PopulatedNavBar from "@/components/PopulatedNavBar"; // Ensure the path is correct

const GeneralDashboard = () => {
  return (
    <>
      <PopulatedNavBar />

      <div>
        <h1>General Dashboard</h1>
        <p>This is the general dashboard page.</p>
      </div>
    </>
  );
};

export default GeneralDashboard;
