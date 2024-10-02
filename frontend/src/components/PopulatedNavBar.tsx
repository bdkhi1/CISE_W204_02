"use client";

import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown>
        Pages <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/">View Articles</NavItem>
          <NavItem route="/general-dashboard">General</NavItem>
          <NavItem route="/moderator-dashboard">Moderator</NavItem>
          <NavItem route="/analyst">Analyst</NavItem>
          <NavItem route="/admin">Admin</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
