// app/hotels/page.tsx (Server Component - 95%)
import { Metadata } from 'next';
import Image from 'next/image';
import HotelSearchForm from '@/components/hotels/HotelSearchForm';
import { FiCoffee, FiActivity, FiSun, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book Hotels - Domestic & International Properties | Way to India',
  description: 'Book the best hotels across India and worldwide. Get exclusive deals on luxury and budget accommodations.',
};

export default function HotelsPage() {
  return (
    <main className="min-h-screen">
      
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000"
            alt="Luxury hotel background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-linear-to-b from-blue-900/70 via-blue-800/60 to-blue-900/80" />
        </div>

        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6 shadow-lg">
              <span className="text-lg">🏨</span>
              <span>Book Domestic and International Property Online. To list your property</span>
              <Link
                href="/list-property"
                className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-2 transition"
                aria-label="Click here to list your property"
              >
                Click Here
              </Link>
            </div>
          </div>

          
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-5xl mx-auto border border-gray-100">
            <HotelSearchForm />
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-5" />
      </section>

      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Experience Luxury
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Introducing Premium Amenities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover world-class facilities and services designed to make your stay unforgettable
            </p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AmenityCard
              image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800"
              icon={<FiCoffee className="w-6 h-6" />}
              title="Fine Dining"
              description="Experience culinary excellence with our world-class restaurants"
              color="orange"
            />
            <AmenityCard
              image="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=800"
              icon={<FiActivity className="w-6 h-6" />}
              title="Spa & Wellness"
              description="Relax and rejuvenate with premium spa treatments"
              color="blue"
            />
            <AmenityCard
              image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800"
              icon={<FiSun className="w-6 h-6" />}
              title="Breakfast Included"
              description="Start your day with a complimentary gourmet breakfast"
              color="yellow"
            />
            <AmenityCard
              image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800"
              icon={<FiHeart className="w-6 h-6" />}
              title="Premium Comfort"
              description="Luxury amenities and personalized service for your comfort"
              color="pink"
            />
          </div>
        </div>
      </section>

      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Popular Destinations
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Explore Top Hotels Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800"
              city="Goa"
              country="India"
              properties={245}
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800"
              city="Jaipur"
              country="India"
              properties={189}
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800"
              city="Kerala"
              country="India"
              properties={167}
            />
          </div>
        </div>
      </section>

      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Book With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💰"
              title="Best Price Guarantee"
              description="We guarantee you won't find lower prices anywhere else"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Booking"
              description="Your information is protected with industry-leading security"
            />
            <FeatureCard
              icon="🎯"
              title="24/7 Support"
              description="Our travel experts are available round the clock to assist you"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Server Component - Amenity Card
function AmenityCard({
  image,
  icon,
  title,
  description,
  color
}: {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses = {
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    pink: 'from-pink-500 to-pink-600',
  }[color];

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[400px]">
      
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br ${colorClasses} shadow-lg mb-4`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </div>
  );
}

// Server Component - Destination Card
function DestinationCard({
  image,
  city,
  country,
  properties
}: {
  image: string;
  city: string;
  country: string;
  properties: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-[350px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={`${city}, ${country}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-3xl font-bold mb-1">{city}</h3>
        <p className="text-gray-200 mb-2">{country}</p>
        <p className="text-sm text-orange-300 font-medium">
          {properties}+ Properties Available
        </p>
      </div>
    </div>
  );
}

// Server Component - Feature Card
function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}