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

/**
 * Navbar component for navigation within the React application.
 *
 * The Navbar displays links for navigating between different views in the application.
 *
 * @component
 * @name Navbar
 * @returns {JSX.Element} - Returns the Navbar component with navigation links.
 */
const Navbar = () => {
  return (
    /**
     * Container for the navigation bar with styled properties.
     *
     * @kind component
     * @name NavbarContainer
     * @returns {JSX.Element} - Returns the styled navigation bar container.
     */
    <NavbarContainer>
      {/* Container for navigation links with styled properties */}
      <NavLinks>
        {/* Individual navigation link styled as a React Router Link */}
        <NavLink to="/">Home</NavLink>
        {/* Individual navigation link styled as a React Router Link */}
        <NavLink to="/teacher">Teacher</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
