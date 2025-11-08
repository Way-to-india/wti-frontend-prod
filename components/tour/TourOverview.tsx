
type Props = {
  overview?: string;
  highlights?: string[];
  description?: string;
};

export default function TourOverview({ overview, highlights, description }: Props) {
  return (
    <div className="space-y-6">
      {overview && <p className="text-gray-700 leading-relaxed">{overview}</p>}

      {highlights && highlights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {description && (
        <div>
          <h3 className="text-lg font-semibold mb-2">About This Tour</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
