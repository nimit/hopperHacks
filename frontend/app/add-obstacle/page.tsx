// app/add-obstacle/page.tsx
'use client';

import Blank from '@/components/ui/blank';
import dynamic from 'next/dynamic';

const AddObstacle = dynamic(
  () => import('@/components/AddObstacleComponent'),
  { 
    ssr: false,
    loading: () => <Blank />
  }
);

export default function AddObstaclePage() {
  return <AddObstacle />;
}