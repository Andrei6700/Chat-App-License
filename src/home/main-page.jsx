import "./main-page.css";
import { Header } from "./components/header";
import { useTheme } from "../context/dark-mode";

export const MainPage = () => {
  const { theme } = useTheme();
  return (
    <div className="container">
      <Header />

      <div className={`backgroundHome ${theme}`}>2</div>
    </div>
  );
};
