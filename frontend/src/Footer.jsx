/**
 * Footer component displays a simple footer with attribution to the image source.
 *
 * @component
 * @example
 * // Example usage within another component or file:
 * import Footer from './Footer';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       { Your main content }
 *       <Footer />
 *     </div>
 *   );
 * };
 *
 * @returns {JSX.Element} Rendered Footer component.
 */
const Footer = () => {
  return (
    <footer>
      Image by{" "}
      <a href="https://www.freepik.com/free-vector/cartoon-galaxy-background-with-planets_14121184.htm#query=space&position=3&from_view=search&track=sph&uuid=ef5605c3-db99-43d7-b6d4-5e6a21d40fba">
        Freepik
      </a>
    </footer>
  );
};

export default Footer;
