import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import CreateOrModifyPost from '../../components/CreateOrModifyPost';
import { postsService } from "../../../service/postService";


function EditPostPage() {
    const router = useRouter();
    const { id } = router.query;
    // 초기 상태에 임시 데이터를 설정합니다.
    const [postData, setPostData] = useState({
        postId: '',
        userId: '',
        title: '',
        status: '',
        viewCount: '',
        content: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await postsService.getPost(id);
                setPostData(response.data);

            } catch(error) {
                console.log('게시글을 불러오는데 실패했습니다.');
                console.error(error);
            }
        };

        if(router.isReady) {
            fetchPost()
        }
    }, [id, router.isReady]);


    return <CreateOrModifyPost postId={id} mode="edit" initialData={postData}/>
}

export default EditPostPage;
