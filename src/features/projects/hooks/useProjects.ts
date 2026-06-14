import { useMemo } from 'react';
import { getAllProjects } from '@/lib/mdx';

export function useProjects() {
  return useMemo(() => getAllProjects(), []);
}
