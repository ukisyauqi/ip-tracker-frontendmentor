//create theme.jsx
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  fonts: {
    body: "Rubik, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        dark: {
          bg: "#3F3F3F",
          _hover: {
            bg: "#5F5F5F",
          },
          _active: { 
            bg: "#3F3F3F" 
          },
        },
      },
    },
  },
});
export default theme;
