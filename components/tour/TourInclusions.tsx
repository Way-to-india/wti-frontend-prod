import { Check, X } from "lucide-react";

interface Item {
  title: string;
  description: string;
}

type Props = {
  inclusions?: Item[];
  exclusions?: Item[];
};

export default function TourInclusions({ inclusions, exclusions }: Props) {
  return (
    <div className="flex flex-col gap-8">

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-5">Inclusions</h3>

        {inclusions?.length ? (
          <ul className="space-y-5">
            {inclusions.map((inc, i) => (
              <li
                key={i}
                className="flex items-start gap-3 transition hover:bg-green-50 p-2 rounded-lg"
              >
                <Check className="text-green-600 w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    {inc.title}
                  </p>
                  {/* <p className="text-gray-600 text-sm mt-0.5">
                    {inc.description}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No inclusions listed.</p>
        )}
      </div>


      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-red-600 mb-5">Exclusions</h3>

        {exclusions?.length ? (
          <ul className="space-y-5">
            {exclusions.map((exc, i) => (
              <li
                key={i}
                className="flex items-start gap-3 transition hover:bg-red-50 p-2 rounded-lg"
              >
                <X className="text-red-600 w-5 h-5 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 leading-snug">
                    {exc.title}
                  </p>
                  {/* <p className="text-gray-600 text-sm mt-0.5">
                    {exc.description}
                  </p> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No exclusions listed.</p>
        )}
      </div>
    </div>
  );
}
