interface Props {
  zoom: number;
}

export const ZoomMeter = ({ zoom }: Props) => (
  <div className="absolute bottom-2 right-2 z-10 bg-white rounded-md shadow-md border border-gray-200 px-2 py-1 text-sm">
    {Math.round(zoom * 100)}%
  </div>
);
