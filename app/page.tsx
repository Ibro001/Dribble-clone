import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

type ProjectSearch = {
    projectSearch: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    },
}

type searchParams = {
  category?: string; 
  endCursor?: string;
}
type Props = {
  searchParams: searchParams;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endCursor}}: Props) => {

    const data = await fetchAllProjects(category, endCursor) as ProjectSearch;

    const projectsToDisplay = data?.projectSearch?.edges || [];

    if(projectsToDisplay.length === 0) {
        return (
            <section className='flexStart flex-col paddings'>
                <Categories />

                <p className='no-result-text text-center'>No project found, go create some project first</p>
            </section>
        )
    }

    const pagination = data?.projectSearch?.pageInfo;

    return(
        <section className='flex-start flex-col paddings mb-16'>
            <Categories />

           <section className='projects-grid'>
            {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                <ProjectCard 
                    key={node?.id}
                    id={node?.id}
                    image={node?.image}
                    title={node?.title}
                    name={node?.createdBy?.name}
                    avatarUrl={node?.createdBy?.avatarUrl}
                    userId={node?.createdBy?.id}
                />
            ))}
           </section>

            <LoadMore
                startCursor={pagination.startCursor}
                endCursor={pagination.endCursor}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}
            />
        </section>
    )
};

export default Home;