import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 4px;

    font-family: monospace;
  }

  // toastr
  #toast-container > div {
    opacity:1;
  }
`;
