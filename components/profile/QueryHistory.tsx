'use client';

import { useState } from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

interface QueryHistoryProps {
  userId: string;
}

export default function QueryHistory({ userId }: QueryHistoryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'tours' | 'hotels' | 'transport' | 'contact'>('all');

  // Mock data - replace with actual API call
  const queries = [
    {
      id: '1',
      type: 'tour',
      referenceNumber: 'WT-12345',
      destination: 'Goa Beach Tour',
      date: '2024-11-20',
      travelers: 2,
      status: 'Pending',
      createdAt: '2024-11-15',
    },
    {
      id: '2',
      type: 'hotel',
      referenceNumber: 'HT-67890',
      destination: 'Mumbai Hotel',
      date: '2024-12-01',
      rooms: 1,
      status: 'Processing',
      createdAt: '2024-11-14',
    },
    {
      id: '3',
      type: 'transport',
      referenceNumber: 'TR-11111',
      destination: 'Delhi to Agra',
      date: '2024-11-25',
      status: 'Completed',
      createdAt: '2024-11-10',
    },
  ];

  const filteredQueries = activeTab === 'all' 
    ? queries 
    : queries.filter(q => q.type === activeTab.slice(0, -1));

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <TabButton
          active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
          icon="📋"
          label="All Queries"
          count={queries.length}
        />
        <TabButton
          active={activeTab === 'tours'}
          onClick={() => setActiveTab('tours')}
          icon="🎯"
          label="Tours"
          count={queries.filter(q => q.type === 'tour').length}
        />
        <TabButton
          active={activeTab === 'hotels'}
          onClick={() => setActiveTab('hotels')}
          icon="🏨"
          label="Hotels"
          count={queries.filter(q => q.type === 'hotel').length}
        />
        <TabButton
          active={activeTab === 'transport'}
          onClick={() => setActiveTab('transport')}
          icon="🚗"
          label="Transport"
          count={queries.filter(q => q.type === 'transport').length}
        />
      </div>

      {/* Query Cards */}
      {filteredQueries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Queries Yet</h3>
          <p className="text-gray-600">Start planning your next adventure!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQueries.map((query) => (
            <QueryCard key={query.id} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300
        ${active 
          ? 'bg-orange-600 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      <span className={`
        px-2 py-0.5 rounded-full text-xs font-bold
        ${active ? 'bg-white/20' : 'bg-orange-100 text-orange-600'}
      `}>
        {count}
      </span>
    </button>
  );
}

function QueryCard({ query }: { query: any }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tour': return '🎯';
      case 'hotel': return '🏨';
      case 'transport': return '🚗';
      case 'contact': return '📞';
      default: return '📋';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
            {getTypeIcon(query.type)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{query.destination}</h3>
            <p className="text-sm text-gray-500">Ref: {query.referenceNumber}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FiCalendar className="w-4 h-4 text-orange-500" />
          <span>{new Date(query.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>

        {query.travelers && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiUsers className="w-4 h-4 text-orange-500" />
            <span>{query.travelers} Travelers</span>
          </div>
        )}

        {query.rooms && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FiMapPin className="w-4 h-4 text-orange-500" />
            <span>{query.rooms} Room{query.rooms > 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <FiClock className="w-4 h-4 text-orange-500" />
          <span>Created {new Date(query.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(query.status)}`}>
          {query.status}
        </span>
        <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
          View Details →
        </button>
      </div>
    </div>
  );
}