import "@fontsource/roboto/700.css";
import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
