import { FormDataType, HandleChangeType } from '@/types/TourQuery';

interface Step3Props {
    formData: FormDataType;
    handleChange: HandleChangeType;
}

export default function Step3({ formData, handleChange }: Step3Props) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          Additional Information
        </h3>
        <p className="text-sm text-gray-600">Any special requirements?</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Special Requests or Questions (Optional)
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Tell us about any special requirements..."
          rows={6}
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
        />
        <p className="text-xs text-gray-500 mt-1 text-right">
          {formData.specialRequests.length}/500 characters
        </p>
      </div>
    </div>
  );
}
