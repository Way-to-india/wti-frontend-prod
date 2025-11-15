'use client';

import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';

export default function EditProfileButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    // TODO: Implement edit profile modal or redirect
    alert('Edit profile feature coming soon!');
  };

  return (
    <button
      onClick={handleEdit}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <FiEdit2 className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
      <span>Edit Profile</span>
    </button>
  );
}