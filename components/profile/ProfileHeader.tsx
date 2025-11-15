import { FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

interface ProfileHeaderProps {
  name: string;
  email: string;
  phone?: string;
}

export default function ProfileHeader({ name, email, phone }: ProfileHeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">{name}</h1>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/90">
          <FiMail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </div>
        
        {phone && (
          <div className="flex items-center gap-2 text-white/90">
            <FiPhone className="w-4 h-4" />
            <span className="text-sm">{phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-white/90">
          <FiCalendar className="w-4 h-4" />
          <span className="text-sm">Member since {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}