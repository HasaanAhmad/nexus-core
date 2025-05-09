import { getProjects } from "@/actions/ProjectActions";
import ProjectList from "./_components/ProjectList";
import { auth } from "@/server/auth";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  
  const {slug} = await params;

 
  try {
    const projectsResponse = await getProjects();
    console.log(projectsResponse);
    // Handle error case
    if ('error' in projectsResponse) {
      console.error("Error fetching projects:", projectsResponse.error);
      // Return an empty array when there's an error
      return <ProjectList projects={[]} slug={slug} />;
    }

    // Format projects for the client component if needed
    const formattedProjects = projectsResponse.map(project => ({
      id: project.id,
      name: project.name,
      status: project.status,
      dueDate: project.dueDate ? project.dueDate.toISOString() : null,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      organizationId: project.organizationId,
    }));

    return <ProjectList projects={formattedProjects} slug={slug} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    // If there's an unexpected error, still render the component with empty projects
    return <ProjectList projects={[]} slug={slug} />;
  }
}