import React from "react";
import Link from "next/link";

const STDCodes: React.FC = () => {
  const stdCodes = [
    { city: "Ahmadabad", code: "079" },
    { city: "Agra", code: "0562" },
    { city: "Ajmer", code: "0145" },
    { city: "Alwar", code: "0144" },
    { city: "Aurangabad", code: "02432" },
    { city: "Bangalore", code: "080" },
    { city: "Barmer", code: "02982" },
    { city: "Beawar", code: "01462" },
    { city: "Bharatpur", code: "05644" },
    { city: "Bhilwara", code: "01482" },
    { city: "Bhopal", code: "0755" },
    { city: "Bikaner", code: "0151" },
    { city: "Bundi", code: "0747" },
    { city: "Chennai", code: "033" },
    { city: "Chandigarh", code: "0172" },
    { city: "Chittorgarh", code: "01472" },
    { city: "Coimbator", code: "0422" },
    { city: "Dholpur", code: "05642" },
    { city: "Dehradun", code: "0135" },
    { city: "Delhi", code: "011" },
    { city: "Deogarh", code: "06432" },
    { city: "Fathepur Sikri", code: "05619" },
    { city: "Hyderabad", code: "040" },
    { city: "Jaipur", code: "0141" },
    { city: "Jodhpur", code: "0291" },
    { city: "Kolkatta", code: "044" },
    { city: "Lucknow", code: "0522" },
    { city: "Manipal", code: "08252" },
    { city: "Mount Abu", code: "02974" },
    { city: "Mumbai (Bombay)", code: "022" },
    { city: "Mussooree", code: "01362" },
    { city: "Mysore", code: "0821" },
    { city: "Nagaur", code: "01582" },
    { city: "Patna", code: "0612" },
    { city: "Pushkar", code: "0145" },
    { city: "Pune", code: "020" },
    { city: "Rajkot", code: "0281" },
    { city: "Ranthambhore Park", code: "07462" },
    { city: "Sariska", code: "0144" },
    { city: "Shimla", code: "0177" },
    { city: "Srinagar", code: "0194" },
    { city: "Udaipur", code: "0294" },
    { city: "Vadodara", code: "0265" },
    { city: "Vaishno Devi", code: "01991-82" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-2 bg-orange-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>{" "}
            » <span className="text-gray-900">STD Codes</span>
          </p>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">STD Codes</h1>

        {/* Section Title */}
        <h2 className="text-lg font-semibold text-orange-500 mb-6">
          International Country Calling Codes
        </h2>

        {/* Table */}
        <div className="grid grid-cols-2 gap-8">
          {/* First Column */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4 pb-2 border-b border-gray-300">
              <div className="font-semibold text-gray-900">City</div>
              <div className="font-semibold text-gray-900">Code</div>
            </div>

            {stdCodes.slice(0, Math.ceil(stdCodes.length / 2)).map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 py-2">
                <div className="text-gray-900">{item.city}</div>
                <div className="text-gray-900">{item.code}</div>
              </div>
            ))}
          </div>

          {/* Second Column */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4 pb-2 border-b border-gray-300">
              <div className="font-semibold text-gray-900">City</div>
              <div className="font-semibold text-gray-900">Code</div>
            </div>

            {stdCodes.slice(Math.ceil(stdCodes.length / 2)).map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 py-2">
                <div className="text-gray-900">{item.city}</div>
                <div className="text-gray-900">{item.code}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default STDCodes;
