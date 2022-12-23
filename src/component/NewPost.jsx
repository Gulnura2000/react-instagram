import { posts } from "../posts"
import { $ } from 'jquery'
import { useState } from "react";
import Product from "../product/product_item"
import { useEffect } from "react";
import axios from "axios";
export const NewPost = () => {
    const [post, setPost] = useState(null);
        // const post = posts
        const fetchPosts = async () =>{
            const publics = await axios({
                url:"https://sstss.ru/login/posts",
                method:"get"
            });
            
            if(publics.data.status == 200){
                console.table('posts', publics);
                setPost(Object.values(publics.data.posts));
            }
        }
        useEffect(()=>{
            fetchPosts();
        },[])
        return (
            <div>
                {post != null ?
                <>
                {post.map(i =>
                    <> 
                    <Product product={i} />
                    </>

                )}
                </>:<>Loading</>
}
            </div>
        )
    }