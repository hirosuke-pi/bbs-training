import { LuRotateCcw, LuZoomIn, LuZoomOut } from "react-icons/lu";

interface Props {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

export const Toolbar = ({ zoomIn, zoomOut, reset }: Props) => (
  <div className="absolute top-2 right-2 z-10 flex gap-1 bg-white rounded-md shadow-md border p-1 border-gray-200">
    <button
      onClick={zoomIn}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      <LuZoomIn size={16} />
    </button>
    <button
      onClick={zoomOut}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      <LuZoomOut size={16} />
    </button>
    <button
      onClick={reset}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      <LuRotateCcw size={16} />
    </button>
  </div>
);
