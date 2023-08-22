'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteProject, fetchToken } from "@/lib/actions";


const ProjectActions = ({ projectId}: {projectId: string}) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteProject = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            
            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

  return (
    <>
        <Link
            href={`/edit-project/${projectId}`}
            className='flexCenter edit-action_btn'
        >
            <Image
                src='/pencile.svg'
                width={15}
                height={15}
                alt='edit'
            />
        </Link>

        <button 
            type='button'
            className={`flexCenter  delete-action_btn bg-gray ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
            onClick={handleDeleteProject}
        >
            <Image
                src='/trash.svg'
                width={15}
                height={15}
                alt='delete'
            />
        </button>
    </>
  )
}

export default ProjectActions