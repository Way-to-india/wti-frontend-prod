import { FormDataType } from '@/types/TourQuery';
import { Shield } from "lucide-react";

interface Step4Props {
  formData: FormDataType;
}

export default function Step4({ formData }: Step4Props) {
  const items: [string, string | number][] = [
    ["Full Name", formData.fullName],
    ["Email", formData.email],
    ["Phone", formData.phone],
    ["Travelers", formData.travelers],
    ["Travel Date", formData.travelDate],
    ["Departure City", formData.departureCity],
  ];

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Review Your Information
        </h3>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between py-2 border-b border-gray-200 last:border-none"
          >
            <span className="text-sm font-semibold text-gray-600">
              {label}:
            </span>
            <span className="text-sm text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
