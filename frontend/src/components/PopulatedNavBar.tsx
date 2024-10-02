"use client";

import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>

      {pathname == "/analyst" && (
        <NavItem route="/analyst" end>
          Analyst
        </NavItem>
      )}

      {pathname == "/admin" && (
        <NavItem route="/admin" end>
          Admin
        </NavItem>
      )}

      {pathname == "/moderator" && (
        <NavItem route="/moderator" end>
          Moderator
        </NavItem>
      )}

      {pathname == "/practitioner" && (
        <NavItem route="/practitioner" end>
          Practitioner
        </NavItem>
      )}

      {pathname == "/" && (
        <>
          <NavItem route="/analyst-dashboard" end>
            Analyst
          </NavItem>
          <NavItem route="/moderator-dashboard">Moderator</NavItem>
          <NavItem route="/admin-dashboard">Admin</NavItem>
        </>
      )}

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
