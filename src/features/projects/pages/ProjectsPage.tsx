import { SEOHead } from '@/components/seo/SEOHead';
import { ProjectGrid } from '@/components/sections/ProjectGrid';

export default function ProjectsPage() {
  return (
    <>
      <SEOHead title="项目" description="我的项目作品集" path="/projects" />
      <ProjectGrid />
    </>
  );
}
