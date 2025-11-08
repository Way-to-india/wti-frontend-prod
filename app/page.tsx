import { Suspense } from 'react'
import { LandingSkeleton } from '@/components/skeleton';
import Home from '@/components/Home/Home';

export default function RootPage() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <Home />
    </Suspense>
  );
}
