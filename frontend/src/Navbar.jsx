import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 0;
  max-width: fit-content;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/teacher">Teacher</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
