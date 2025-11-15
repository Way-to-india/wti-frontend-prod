'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { endPoints } from '@/constants/endpoints';
import axios from 'axios';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import QueryHistory from '@/components/profile/QueryHistory';
import LogoutButton from '@/components/profile/LogoutButton';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isHydrated, isLoading } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(endPoints.user.profile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data.payload || response.data.user || response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If unauthorized, redirect to login
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, token, isHydrated, router]);

  // Show loading while hydrating or fetching
  if (!isHydrated || isLoading || loading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </main>
    );
  }

  // If not authenticated after hydration, don't render (will redirect)
  if (!isAuthenticated || !user) {
    return null;
  }

  const userData = profileData || user;

  // Mock query stats - you can fetch real data from your backend
  const stats = {
    tourQueries: 5,
    hotelQueries: 3,
    transportQueries: 2,
    contactQueries: 1,
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-orange-50 to-white">

      <section className="relative bg-linear-to-r from-orange-600 to-orange-500 text-white py-16 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-2xl flex items-center justify-center text-6xl font-bold">
                {userData.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>


            <div className="flex-1 text-center md:text-left">
              <ProfileHeader name={userData.name} email={userData.email} phone={userData.phone} />
            </div>


            <div className="flex flex-col sm:flex-row gap-3">
              {/* <EditProfileButton /> */}
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <ProfileStats stats={stats} />
        </div>
      </section>


      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📋</span>
            <h2 className="text-3xl font-bold text-gray-900">Your Travel Queries</h2>
          </div>
          <QueryHistory userId={userData.id} />
        </div>
      </section>


      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">⚡</span>
            <h2 className="text-3xl font-bold text-gray-900">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QuickActionCard
              href="/tours"
              icon="🎯"
              title="Book a Tour"
              description="Explore amazing destinations"
            />
            <QuickActionCard
              href="/hotels"
              icon="🏨"
              title="Find Hotels"
              description="Book your perfect stay"
            />
            <QuickActionCard
              href="/transport"
              icon="🚗"
              title="Book Transport"
              description="Travel in comfort"
            />
            <QuickActionCard
              href="/contact"
              icon="📞"
              title="Contact Us"
              description="We're here to help"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Quick Action Card Component
function QuickActionCard({
  href,
  icon,
  title,
  description
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </a>
  );
}