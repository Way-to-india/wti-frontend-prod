import { useState } from 'react';

interface Props {
  rooms: number;
  guests: number;
  onChange: (field: 'rooms' | 'guests', value: number) => void;
  disabled: boolean;
}

export default function RoomsGuestsSelector({
  rooms,
  guests,
  onChange,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-xs text-gray-500 mb-2 font-medium">
        Rooms & Guests 👥
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="w-full text-left px-4 py-3 border border-gray-300 
        rounded-xl bg-white hover:border-orange-400 focus:ring-2 
        focus:ring-orange-500 disabled:opacity-50"
      >
        <div className="flex items-baseline gap-3">
          <div>
            <span className="text-3xl font-bold">{rooms}</span>
            <span className="text-sm ml-1">
              Room{rooms > 1 ? 's' : ''}
            </span>
          </div>

          <div>
            <span className="text-3xl font-bold">{guests}</span>
            <span className="text-sm ml-1">
              Guest{guests > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-white border 
          border-gray-200 rounded-xl shadow-xl p-4 z-50"
        >
          <div className="space-y-4">

            {/* ROOMS */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rooms</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onChange('rooms', Math.max(1, rooms - 1))}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{rooms}</span>
                <button
                  type="button"
                  onClick={() => onChange('rooms', Math.min(10, rooms + 1))}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* GUESTS */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Guests</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onChange('guests', Math.max(1, guests - 1))}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{guests}</span>
                <button
                  type="button"
                  onClick={() => onChange('guests', Math.min(20, guests + 1))}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full mt-4 py-2 bg-orange-600 text-white rounded-lg 
            hover:bg-orange-700 transition"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
