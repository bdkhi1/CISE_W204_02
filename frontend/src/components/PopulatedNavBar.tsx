"use client";

import { usePathname } from "next/navigation";
import NavBar from "./nav/NavBar";
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
    </NavBar>
  );
};

export default PopulatedNavBar;
