import { useRef } from 'react';

interface Props {
  checkIn: string;
  checkOut: string;
  onChange: (field: 'checkIn' | 'checkOut', val: string) => void;
  disable: boolean;
}

export default function DateSelector({
  checkIn,
  checkOut,
  onChange,
  disable,
}: Props) {
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear().toString().slice(-2),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  };

  const inDate = formatDate(checkIn);
  const outDate = formatDate(checkOut);

  return (
    <>
      {/* CHECK-IN */}
      <div>
        <label className="block text-xs text-gray-500 mb-2 font-medium">
          Check-In 📅
        </label>

        <input
          type="date"
          ref={checkInRef}
          value={checkIn}
          onChange={(e) => onChange('checkIn', e.target.value)}
          disabled={disable}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => checkInRef.current?.showPicker?.()}
          disabled={disable}
          className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl 
          bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 
          disabled:opacity-50"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{inDate.day}</span>
            <span className="text-sm">
              {inDate.month}&apos;{inDate.year}
            </span>
          </div>

          <p className="text-xs text-gray-500">{inDate.dayName}</p>
        </button>
      </div>

      {/* CHECK-OUT */}
      <div>
        <label className="block text-xs text-gray-500 mb-2 font-medium">
          Check-Out 📅
        </label>

        <input
          type="date"
          ref={checkOutRef}
          value={checkOut}
          onChange={(e) => onChange('checkOut', e.target.value)}
          disabled={disable}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => checkOutRef.current?.showPicker?.()}
          disabled={disable}
          className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl 
          bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 
          disabled:opacity-50"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{outDate.day}</span>
            <span className="text-sm">
              {outDate.month}&apos;{outDate.year}
            </span>
          </div>

          <p className="text-xs text-gray-500">{outDate.dayName}</p>
        </button>
      </div>
    </>
  );
}
