import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./style.css";
import theme from "./theme.jsx";
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
