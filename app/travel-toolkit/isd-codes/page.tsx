import Link from 'next/link';

const ISDCodes: React.FC = () => {

  const isdCodes = [
    { country: 'Argentina', code: '0054' },
    { country: 'Australia', code: '0061' },
    { country: 'Austria', code: '0043' },
    { country: 'Bahrain', code: '00973' },
    { country: 'Bangladesh', code: '00880' },
    { country: 'Belgium', code: '0032' },
    { country: 'Bhutan', code: '00975' },
    { country: 'Bulgari', code: '00359' },
    { country: 'Canada', code: '001' },
    { country: 'Chin', code: '0086' },
    { country: 'Colombia', code: '0057' },
    { country: 'Croatia', code: '00385' },
    { country: 'Cyprus', code: '00357' },
    { country: 'Czech', code: '00420' },
    { country: 'Ecuador', code: '00593' },
    { country: 'Egypt', code: '0020' },
    { country: 'Finland', code: '00358' },
    { country: 'France', code: '033' },
    { country: 'Germany', code: '049' },
    { country: 'Hungry', code: '0036' },
    { country: 'Indonesia', code: '0062' },
    { country: 'Iran', code: '0098' },
    { country: 'Israel', code: '00972' },
    { country: 'Italy', code: '0039' },
    { country: 'Japan', code: '0081' },
    { country: 'Kenya', code: '00254' },
    { country: 'Korea (North)', code: '00850' },
    { country: 'Kuwait', code: '00965' },
    { country: 'Lebanon', code: '00961' },
    { country: 'Malaysia', code: '0060' },
    { country: 'Maldives', code: '00960' },
    { country: 'Mauritius', code: '00230' },
    { country: 'Mexico', code: '0052' },
    { country: 'Myanmar', code: '0095' },
    { country: 'Nepal', code: '0097' },
    { country: 'Netherlands', code: '0031' },
    { country: 'New Zealand', code: '0064' },
    { country: 'Norway', code: '0047' },
    { country: 'Pakistan', code: '0097' },
    { country: 'Poland', code: '0048' },
    { country: 'Portugal', code: '00351' },
    { country: 'Romania', code: '0040' },
    { country: 'Russia', code: '007' },
    { country: 'Saudi Arabia', code: '00966' },
    { country: 'Seychelles', code: '00248' },
    { country: 'South Africa', code: '0027' },
    { country: 'Spain', code: '0034' },
    { country: 'Sri Lanka', code: '0094' },
    { country: 'Sweden', code: '0046' },
    { country: 'Taiwan', code: '00886' },
    { country: 'Thailand', code: '0066' },
    { country: 'Turkey', code: '0090' },
    { country: 'U A E', code: '00971' },
    { country: 'U K', code: '0044' },
    { country: 'U S A', code: '001' },
    { country: 'Zimbabwe', code: '00263' },
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="w-full h-2 bg-orange-500"></div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-6">
          <p
            className="text-sm text-gray-600"
          >
            <Link
              href={"/"}
              className="hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            {' » '}
            <span className="text-gray-900">ISD Codes</span>
          </p>
        </div>


        <h1
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          STD Codes
        </h1>


        <h2
          className="text-lg font-semibold text-orange-500 mb-6"
        >
          International Country Calling Codes
        </h2>


        <div className="grid grid-cols-2 gap-8">

          <div>
            <div className="grid grid-cols-2 gap-4 mb-4 pb-2 border-b border-gray-300">
              <div
                className="font-semibold text-gray-900"
              >
                Country
              </div>
              <div
                className="font-semibold text-gray-900"
              >
                Code
              </div>
            </div>
            {isdCodes.slice(0, Math.ceil(isdCodes.length / 2)).map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 py-2">
                <div
                  className="text-gray-900"
                >
                  {item.country}
                </div>
                <div
                  className="text-gray-900"
                >
                  {item.code}
                </div>
              </div>
            ))}
          </div>


          <div>
            <div className="grid grid-cols-2 gap-4 mb-4 pb-2 border-b border-gray-300">
              <div
                className="font-semibold text-gray-900"
              >
                Country
              </div>
              <div
                className="font-semibold text-gray-900"
              >
                Code
              </div>
            </div>
            {isdCodes.slice(Math.ceil(isdCodes.length / 2)).map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 py-2">
                <div
                  className="text-gray-900"
                >
                  {item.country}
                </div>
                <div
                  className="text-gray-900"
                >
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISDCodes;
