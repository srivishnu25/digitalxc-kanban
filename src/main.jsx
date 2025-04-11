import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import useResizeObserver from "./hooks/useResizeObserver";

const Main = () => {
  const { isMobile, containerRef } = useResizeObserver();
  return (
    <div ref={containerRef}>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <App />
      </DndProvider>
    </div>
  );
};
createRoot(document.getElementById("root")).render(<Main />);
