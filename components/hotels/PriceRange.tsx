interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export default function PriceRange({ value, onChange, disabled }: Props) {
  return (
    <div className="flex justify-end items-center">
      <label className="text-sm mr-3 text-gray-700">
        Price Per Night
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm 
        focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
      >
        <option value="all">All Prices</option>
        <option value="budget">Under ₹2,000</option>
        <option value="mid">₹2,000 - ₹5,000</option>
        <option value="luxury">₹5,000+</option>
      </select>
    </div>
  );
}
