
import { Header } from "../component/Header";
import { History } from "../component/History";
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import $, { event } from "jquery";
import { useEffect } from 'react';
import { posts } from "../posts";
function Lenta() {
  const [post, setPost] = useState(null);
  const [counter, setcounter] = useState(null)
  const fetchPosts = async () => {
    const publics = await axios({
      url: "https://sstss.ru/login/posts",
      method: "get"
    });

    if (publics.data.status == 200) {
      console.table('posts', publics);
      setPost(Object.values(publics.data.posts));
    }
  }
  let local = localStorage.getItem('token')
  if (local == null) {
    window.location.href = '/'
  }

  // var time = moment(product.data, "YYYYMMDD").fromNow();
  console.log(moment.locale('ru'));
  const [allLikes, setAllLikes] = useState();
 
let animateheart = (photo)=>{
  function F2(){
    $('#'+photo).css({"z-index":"1", "top":"40%","left":"42%","transition":".5s", "font-size":"80px"})
  }
  F2()
  function F3(){
    $('#'+photo).css({"z-index":"-3","top":"40%","left":"42%", "transition":".5s", "font-size":"0px"})
  }
  setTimeout( F3, 700)
 
}

  let funckLike = async () => {
    let param = {
      'user_id': localStorage.getItem('token')
    }
    let likeax = await axios({
      method: "get",
      params: param,
      url: "https://sstss.ru/likes/like"
    })
    if (likeax != null) {
      if (likeax.data.status == 200) {
        setAllLikes(likeax.data.post);
        console.log('alllikes', likeax);
      } else {
        setAllLikes([]);

      }
    } else {
      console.log('fetch error likes');
    }

  }

  let funcLike2 = async (postId) => {
    let param = {
      'postid': postId,
      'user_id': localStorage.getItem('token')
    }
    let axLike2 = await axios({
      method: "post",
      url: "https://sstss.ru/likes/like",
      params: param
    })
    console.log("addlike", axLike2);
    funclikecounter();
    fetchPosts();

    funckLike();

  }
  let deletelike = async (postId) => {
    let param = {
      'postid': postId,
      'user_id': localStorage.getItem('token')
    }
    let axLike2 = await axios({
      method: "delete",
      url: "https://sstss.ru/likes/like",
      params: param
    })
    console.log("delete", axLike2);
    funclikecounter()
    fetchPosts();
    funckLike();
  }
  let checkLike = (postId) => {
    let like = allLikes.filter(i => i.user_id == localStorage.getItem('token') && i.postid == postId);
    if (like != null) {
      if (like.length > 0) {

        return true;

      } else {

        return false;
      }
    }
    console.log(like, "!!");
  }
  let chekcounter = (postid) => {
    const count = counter.filter(i => i.postid == postid);
    if (count.length > 0) {
      return count.length;
    } else {
      return 0;
    }
  }
  let funclikecounter = async () => {
    let counterData = await axios({
      method: 'get',
      url: "https://sstss.ru/likes/likez"
    })
    console.log('counetrt', counterData);
    if (counterData != null) {
      if (counterData.data.status == 200) {
        setcounter(counterData.data.likes)
      }
    }
  }



  useEffect(() => {
 
    fetchPosts();
    funckLike()
    funclikecounter()
  }, [])
  return (
    <div>

      <Header />
      <div className="col-lg-10 mx-auto ">
        <History />
        <div>
          {post != null ?
            <>
              {post.map(i =>
                <>
                  <div className="col-lg-6 my-5 bg-light p-3 rounded ">
                    <div className="row">
                      <div className="col-2">
                        <img className="historyImg" src={'https://sstss.ru/registrations/uploads/' + i.avatar} alt="" />
                      </div>
                      <div className="col-6">
                        <b><a href={"/userprophill/" + i.id}>{i.firstname}</a>  </b>
                        <small className="text-secondary d-block" >

                          {i.firstname}  {i.location}</small>
                      </div>
                      <div className="col-4">

                      </div>
                    </div>

                    <div className="col-lg-12 px-0 py-3 likeImg rounded mx-0 ">


                      <img src={'https://sstss.ru/login/uploads/' + i.photo} alt="" width={'100%'} />
                    </div>
                    <div className="col-4">
                      {chekcounter(i.post_id)}
                    </div>
                    <div className="row">
                      <div className="col-8 d-flex  ">
                        <>
                          <h3>
                            {checkLike(i.post_id) ?
                              <i style={{ "color": "red" }} onClick={() => deletelike(i.post_id)} class="fa-solid fa-heart"></i>
                              :
                              <i onClick={() => funcLike2(i.post_id)} class="fa-solid fa-heart"></i>}
                          </h3>

                        </>
                        <h3><i class=" mx-2 fa-solid fa-comment"></i></h3>
                      </div>
                      <div className="col-4 text-center ">
                        <h3><i class="fa-solid fa-bookmark"></i></h3>
                      </div>
                    </div>
                    <div className="">
                      {/* date{time} */}
                    </div>
                  </div>
                </>

              )}
            </> : <>
              Loading
            {posts.map(i=><>
             <div style={{"position":"relative"}} className="col-lg-4 px-0 py-3 likeImg rounded mx-0 ">

             <i style={{ "position":"absolute" ,"color":"white","top":"45%","left":"45%","z-index":"-3"}}  class="fa-solid fa-heart" id={"photo"+i.id}></i>
                <img  onDoubleClick={()=>animateheart("photo"+i.id)}  
                className ="likeImg5" src={i.images} alt="" width={'100%'} />
              </div>
            
            </>)}
             
            </>
          }
        </div>

      </div>



    </div>
  )


}

export default Lenta;