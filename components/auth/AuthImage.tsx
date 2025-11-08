'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AuthImage() {
  const pathname = usePathname();
  const mode = pathname.includes('/signup') || pathname.includes('/sign-up') ? 'signup' : 'login';
  
  const LoginImage = 'https://dbagut2mvh0lo.cloudfront.net/auth/login.jpg';
  const signUpPage = 'https://dbagut2mvh0lo.cloudfront.net/auth/signup_1.jpg';

  return (
    <Image
      src={mode === 'signup' ? signUpPage : LoginImage}
      alt={mode === 'signup' ? 'Sign up illustration' : 'Login illustration'}
      fill
      className="object-cover"
      priority
      sizes="50vw"
    />
  );
}