
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
const Product = ({ product }) => {
    var time = moment(product.data, "YYYYMMDD").fromNow();
    console.log(moment.locale('ru'));
const [allLikes, setAllLikes] = useState();
console.log(product);
    // let heartClick = () => {
    //     if(heartstyle == false){
    //        sethearstyle(true) 
    //        setlikecounter(likecounter+1) 
    //     }else {
    //         sethearstyle(false)
    //         setlikecounter(likecounter-1) 
    //     }
        
    // }

let funckLike = async()=>{
    let param = {
        'user_id': localStorage.getItem('token')
    }
    let likeax = await axios ({
        method:"get",
        params: param,
        url: "https://sstss.ru/likes/like"
    })
    if(likeax != null){
    if(likeax.data.status == 200){
        setAllLikes(likeax.data.post);
        console.log('alllikes',likeax);
    }else{
        setAllLikes([]);
        
    }
}else{
    console.log('fetch error likes');
}
 
}

let funcLike2 =async(postId)=>{
    let param = {
        'postid': postId,
        'user_id': localStorage.getItem('token')
    }
    let axLike2 = await axios ({
        method:"post",
        url:"https://sstss.ru/likes/like",
        params:param
    }) 
    console.log("addlike",axLike2);
}
let checkLike = (postId)=>{
    let like = allLikes.filter(i => i.user_id == localStorage.getItem('token') && i.postid == postId);
    if(like != null){
    if(like.length > 0){
        return true;
    }else{
        return false;
    }
    }
}
useEffect(()=>{
funckLike()
},[])
    return (
        <div className="col-lg-6 my-5 bg-light p-3 rounded ">
            <div className="row">
                <div className="col-2">
                    <img className="historyImg" src={'https://sstss.ru/registrations/uploads/' + product.avatar} alt="" />
                </div>
                <div className="col-6">
                    <b><a href={"/userprophill/" + product.id}>{product.firstname}</a>  </b>
                    <small className="text-secondary d-block" >

                        {product.firstname}  {product.location}</small>
                </div>
                <div className="col-4">

                </div>
            </div>

            <div className="col-lg-12 px-0 py-3 likeImg rounded mx-0 ">

  
<img src={'https://sstss.ru/login/uploads/'+product.photo} alt="" width={'100%'} />
            </div>
            <div className="col-4">
            
            </div>
            <div className="row">
                <div className="col-8 d-flex  ">
                        <>
                        <h3>
                        {checkLike(product.post_id) ? 
                        <i style={{"color":"red"}} class="fa-solid fa-heart"></i> 
                        :
                        <i onClick={()=>funcLike2(product.post_id)}   class="fa-solid fa-heart"></i> }
                        </h3>
                
                    </>
                    <h3><i class=" mx-2 fa-solid fa-comment"></i></h3>
                </div>
                <div className="col-4 text-center ">
                    <h3><i class="fa-solid fa-bookmark"></i></h3>
                </div>
            </div>
            <div className="">
                date{time}
            </div>
        </div>
    )
}
export default Product;