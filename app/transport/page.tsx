import { Metadata } from 'next';
import Image from 'next/image';
import TransportSearchForm from '@/components/transportation/TransportSearchForm';
import { FiTruck, FiShield, FiClock, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book Transportation - Buses, Cars & Luxury Vehicles | Way to India',
  description: 'Book reliable transportation services across India. Choose from buses, private cars, luxury vehicles and more.',
};

export default function TransportationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000"
            alt="Transportation services background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-800/70 to-gray-900/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-5xl mx-auto border border-gray-100">
            <TransportSearchForm />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-5" />
      </section>

      {/* Explore Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Our Fleet
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of vehicles for a comfortable and safe journey
            </p>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <VehicleCard
              image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800"
              title="Airport Transfer"
              description="Comfortable rides to and from the airport"
              badge="Popular"
              badgeColor="orange"
            />
            <VehicleCard
              image="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800"
              title="Luxury Sedans"
              description="Premium cars for business travel"
              badge="Premium"
              badgeColor="purple"
            />
            <VehicleCard
              image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800"
              title="Tourist Buses"
              description="Spacious buses for group tours"
              badge="Groups"
              badgeColor="blue"
            />
            <VehicleCard
              image="https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=800"
              title="Corporate Fleet"
              description="Professional service for executives"
              badge="Business"
              badgeColor="green"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Transportation Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best in comfort, safety, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FiShield className="w-8 h-8" />}
              title="Safe & Secure"
              description="All vehicles are regularly maintained and drivers are verified"
              color="blue"
            />
            <FeatureCard
              icon={<FiClock className="w-8 h-8" />}
              title="24/7 Available"
              description="Round-the-clock service for your convenience"
              color="orange"
            />
            <FeatureCard
              icon={<FiUsers className="w-8 h-8" />}
              title="Professional Drivers"
              description="Experienced and courteous drivers for your journey"
              color="green"
            />
            <FeatureCard
              icon={<FiTruck className="w-8 h-8" />}
              title="Wide Range"
              description="From sedans to buses, we have it all"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-orange-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Most Booked
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Popular Routes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouteCard
              from="Mumbai"
              to="Pune"
              duration="3.5 hours"
              price="₹2,500"
              image="https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=800"
            />
            <RouteCard
              from="Delhi"
              to="Agra"
              duration="4 hours"
              price="₹3,000"
              image="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800"
            />
            <RouteCard
              from="Bangalore"
              to="Mysore"
              duration="3 hours"
              price="₹2,200"
              image="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Need a Custom Transportation Solution?
          </h2>
          <p className="text-xl mb-8 text-orange-50">
            We offer customized transportation packages for groups, events, and corporate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918527255995"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              📞 Call Us Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transition-all text-lg"
            >
              💬 Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <TrustStat number="10K+" label="Happy Customers" />
            <TrustStat number="500+" label="Vehicles" />
            <TrustStat number="100+" label="Cities Covered" />
            <TrustStat number="4.9★" label="Customer Rating" />
          </div>
        </div>
      </section>
    </main>
  );
}

// Server Component - Vehicle Card
function VehicleCard({
  image,
  title,
  description,
  badge,
  badgeColor
}: {
  image: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
}) {
  const badgeColors = {
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
  }[badgeColor];

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColors}`}>
            {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

// Server Component - Feature Card
function FeatureCard({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  }[color];

  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${colorClasses} text-white shadow-lg mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Server Component - Route Card
function RouteCard({
  from,
  to,
  duration,
  price,
  image
}: {
  from: string;
  to: string;
  duration: string;
  price: string;
  image: string;
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48">
        <Image
          src={image}
          alt={`${from} to ${to}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{from}</span>
            <span className="text-orange-500">→</span>
            <span className="text-lg font-bold text-gray-900">{to}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <FiClock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="text-orange-600 font-bold text-lg">
            Starting {price}
          </div>
        </div>
      </div>
    </div>
  );
}

// Server Component - Trust Stat
function TrustStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-orange-600 mb-2">{number}</div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
    </div>
  );
}