import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(45, 58, 71);
  }

  *:focus {
    outline: none;
  }

  /**
   * Using a "standard" blue / purple scheme for unvisited / visited hyperlinks.
   */
  a {
    color: #1a0dab;
    text-decoration: none;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: #660099;
  }
`;

export default GlobalStyle;
