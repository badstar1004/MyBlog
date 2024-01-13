import React from "react";
import { useRouter } from 'next/router';
import CreateOrModifyPost from '../../components/CreateOrModifyPost';


function EditPostPage() {
    const router = useRouter();
    const { id } = router.query;

    return <CreateOrModifyPost postId={id}/>
}

export default EditPostPage;
