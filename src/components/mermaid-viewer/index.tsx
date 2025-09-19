import mermaid from "mermaid";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { Toolbar } from "./toolbar";
import { ZoomMeter } from "./zoom-meter";

export const MermaidViewer = ({ code }: { code: string }) => {
  const id = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const applyTransform = useCallback(() => {
    if (svgRef.current) {
      svgRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(${zoom})`;
    }
  }, [position.x, position.y, zoom]);

  const render = useCallback(async () => {
    if (outputRef.current && code) {
      try {
        const { svg } = await mermaid.render(id, code);
        outputRef.current.innerHTML = svg;

        const svgElement = outputRef.current.querySelector("svg");
        if (svgElement) {
          svgRef.current = svgElement;
          svgElement.style.transition = isDragging
            ? "none"
            : "transform 0.2s ease";
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
        outputRef.current.innerHTML = "";
      }
    }
  }, [code, id]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 5));

  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.1));

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: WheelEvent) => {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.1, Math.min(5, prev * delta)));
  };

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });

      if (svgRef.current) {
        svgRef.current.style.transition = "none";
      }
    },
    [position.x, position.y]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
          });
        });
      }
    },
    [isDragging, dragStart.x, dragStart.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (svgRef.current) {
      svgRef.current.style.transition = "transform 0.2s ease";
    }
  }, []);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    applyTransform();
  }, [position, zoom, applyTransform]);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "forest",
      logLevel: 5,
      suppressErrorRendering: true,
    });
  }, []);

  return code ? (
    <div className="relative w-full h-full overflow-hidden font-geist-sans">
      <Toolbar
        zoomIn={handleZoomIn}
        zoomOut={handleZoomOut}
        reset={handleReset}
      />
      <ZoomMeter zoom={zoom} />
      <div
        className="w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div ref={outputRef} className="w-full h-full" />
      </div>
    </div>
  ) : null;
};
