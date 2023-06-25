import { useState } from "react";
import "./App.css";
import LeftNav from "./components/LeftNav";
import TopBar from "./components/TopBar";
import Main from "./components/Main";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="w-screen h-max bg-backgroundLight dark:bg-backgroundDark flex z-0">
        <LeftNav />
        <Main isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
}

export default App;
