import { useState } from "react";
import CreateOrModifyPost from "../components/CreateOrModifyPost";


function CreatePostPage() {
    // 초기 상태에 임시 데이터를 설정합니다.
    const [postData, setPostData] = useState({
        postId: '',
        userId: '',
        title: '',
        content: '',
        status: '',
        viewCount: '',
        imageUrl: '',
    });


    return <CreateOrModifyPost mode="new" initialData={postData}/>;
}

export default CreatePostPage;