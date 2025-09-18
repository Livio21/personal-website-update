import { ProjectModal } from './project-modal';

export default function ProjectsPage() {
  return (
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">My Projects</h1>
        <p className="text-lg text-muted-foreground">A selection of my work. Click on a project to see more.</p>
      </header>

      <ProjectModal />
    </div>
  );
}
