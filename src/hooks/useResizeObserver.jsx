import { useState, useEffect, useRef } from "react";

function useResizeObserver() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setIsMobile(width <= 640);
      }
    });

    if (containerRef.current) {
      // Observe the container ref (which can be the body or a div)
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { isMobile, containerRef };
}

export default useResizeObserver;
