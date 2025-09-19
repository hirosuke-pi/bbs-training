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

type Props = {
  code: string;
  children?: React.ReactNode;
  onClickSvgElement?: (event: PointerEvent) => void;
};

export const MermaidViewer = ({ code, onClickSvgElement, children }: Props) => {
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
      outputRef.current.innerHTML = "";
      try {
        mermaid.initialize({
          startOnLoad: true,
          securityLevel: "loose",
          htmlLabels: true,
          theme: "forest",
          logLevel: 5,
          suppressErrorRendering: true,
        });
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code); // 再レンダーされるたびに要素が増えていくので考え直す
        outputRef.current.innerHTML = svg;

        const svgElement = outputRef.current.querySelector("svg");
        if (svgElement) {
          svgRef.current = svgElement;
          svgRef.current.style.transformOrigin = "0 0";
          svgElement.style.transition = isDragging
            ? "none"
            : "transform 0.2s ease";
        }
        applyTransform();

        console.log(svgElement);

        if (isDragging) return;

        svgElement?.addEventListener("click", (event) => {
          onClickSvgElement?.(event);
        });

        return () => {
          svgElement?.removeEventListener("click", (event) => {
            onClickSvgElement?.(event);
          });
        };
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
    setPosition((prev) => ({
      x: prev.x - (e.clientX - prev.x) * (delta - 1),
      y: prev.y - (e.clientY - prev.y) * (delta - 1),
    }));
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
      <div>{children}</div>
    </div>
  ) : null;
};
