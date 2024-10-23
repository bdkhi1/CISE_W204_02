"use client";

import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  const pathname = usePathname();

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

      {pathname == "/moderator-dashboard" && (
        <NavItem route="/moderator-dashboard" end>
          Moderator
        </NavItem>
      )}

      {pathname == "/practitioner" && (
        <NavItem route="/practitioner" end>
          Practitioner
        </NavItem>
      )}

      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown>
        Pages <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/create-article">Submitter</NavItem>
          <NavItem route="/moderator-dashboard">Moderator</NavItem>
          <NavItem route="/analyst">Analyst</NavItem>
          <NavItem route="/admin">Admin</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
