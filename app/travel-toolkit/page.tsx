import Link from 'next/link';

const TravelToolkit: React.FC = () => {

  const toolkitItems = [
    {
      title: 'Indian Embassies (List)',
      path: '/travel-toolkit/indian-embassies',
    },
    {
      title: 'Currency Converter',
      path: '/travel-toolkit/currency-converter',
    },
    {
      title: 'STD Codes',
      path: '/travel-toolkit/std-codes',
    },
    {
      title: 'ISD Codes',
      path: '/travel-toolkit/isd-codes',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <div className="w-full h-2 bg-orange-500"></div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6">
          <p
            className="text-sm text-gray-600"
          >
            <button
              className="hover:text-orange-500 transition-colors"
            >
              Home
            </button>
            {' » '}
            <span className="text-gray-900">Travel Tool Kit</span>
          </p>
        </div>

        
        <h1
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Travel Tool Kit
        </h1>

        
        <ul className="space-y-3">
          {toolkitItems.map((item, index) => (
            <Link href={`${item.path}`} key={index}>
            <li>
              <button
                className="text-blue-600 hover:text-blue-800 hover:underline text-base transition-colors"
              >
                {item.title}
              </button>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelToolkit;
