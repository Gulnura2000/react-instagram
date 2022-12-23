
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { user } from '../User'
import axios from "axios";
import { useEffect } from "react";

const ProphModal = () => {
    let local = localStorage.getItem('token')
    let userfillter = user.filter(i => i.user_id == local)
    let [btnstyle, setbtnstyle] = useState({ "color": "grey" })
    const [coment, setcoment] = useState([])
    const [inp, setInp] = useState()
    const [commetInner, setCommentInner] = useState()
    let [posts, setpots] = useState(null)
    let navigate = useNavigate()
    let FuncCloseModal = () => {
        navigate('/prophill')
    }


    let showinp = (event) => {
        setInp(event.target.value)
        setbtnstyle({ "color": "blue" })

    }

    let addcomment = () => {
        setcoment([
            ...coment,
            {
                author: userfillter[0].userName,
                avatar: userfillter[0].avatar,
                inpvalue: inp,
                datetime: moment('2016-11-22').fromNow(),
            },
        ]);



        console.log("this comment", coment)

        setCommentInner(
            coment.map(i =>
                <div className="row">
                    <div className="col-2">
                        <img src={i.avatar} alt="" width={"40px"} className="rounded-circle" height={"40px"} />
                    </div>
                    <div className="col-4">
                        {i.author}
                    </div> <br />
                    <p> {i.inpvalue} </p>
                </div>
            ))


    }

    let param = useParams();
    let MyImg = param.img

    let userpost = async () => {
        let param = {
            'userid': MyImg
        }
        let posts = await axios({
            params: param,
            method: 'get',
            url: "https://sstss.ru/enter/login"
        })
        if (posts != null) {
            if (posts.status == 200) {
                setpots(posts.data.logins)
            }
        }
    }
    let deletePost = async (photo) => {
        
        let param = {
            'post_id':parseInt(MyImg) ,
            'image': photo
        }
        let deletes = await axios({
            method: "delete",
            params: param,
            url: "https://sstss.ru/login/post",
        })
       console.log(deletes)
        if (deletes != null) {
            if (deletes.data.status == 200) {
                window.location.href = '/prophill'
                console.log(deletes.data)
                userpost()
            }else {
                alert('errorrr!!')
            }
        }else{
            console.log("error2");
        }

    }


    useEffect(() => {

        userpost()
       
    }, [])
    return (
        <div>

            <div className="proph-modal"  >
                <div onClick={FuncCloseModal} className="closeProphModal  text-end mx-5 ">

                    <h1  ><i class=" text-white fa-sharp fa-solid fa-xmark"></i></h1>
                </div>
                <div className="body-proph-modal">

                    <div className="row  ">
                        <div className="col-lg-6">
                            {posts != null ?
                                posts.map(i =>
                                    <img src={'https://sstss.ru/login/uploads/' + i.photo} width={"98%"} height={"400px"} />)
                                : <></>}




                        </div>
                        <div className="col-lg-6 py-3 px-0 ">
                            <div className="row comment-avatar-block ">
                                <div className=" mx-0 px-0 myprophimg col-lg-2 text-left ">
                                    {/* <img className="circle-image rounded-circle " src={i.avatar} alt="" /> */}
                                    {posts != null ?
                                    <button onClick={()=>deletePost(posts[0].photo)} className='border-0 border border-primary rounded px-3 py-2 bg-danger'>удалить</button>
                                    :<></>
}
                                </div>
                                <div className="col-lg-7">
                                    {/* <b> {i.userName} </b> */}

                                </div>
                                <div className="col-lg-2">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </div> <br />
                                <hr />
                            </div>
                            <div className="row comment-comment-block ">
                                {commetInner}
                            </div>
                            <hr />
                            <div className="row comment-like-block">
                                <div className="col-sm-8" >
                                    <div className="row">
                                        <div className="col-lg-1 ">
                                            <h1><i style={{ "font-size": "25px" }} class="fa-solid fa-heart"></i></h1>
                                        </div>

                                        <div className="col-lg-1">
                                            <h1><i style={{ "font-size": "25px" }} class="fa-solid fa-comment"></i></h1>
                                        </div>
                                        <div className="col-lg-1">
                                            <h1><i style={{ "font-size": "25px" }} class="fa-solid fa-paper-plane"></i></h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 text-end  ">

                                    <h1  ><i style={{ "font-size": "25px" }} class="fa-regular   fa-bookmark"></i></h1>
                                </div>
                            </div>

                            <div className="comment-write-block">
                                <div className="row">
                                    <div className="col-7  ">

                                        <textarea placeholder='comment' onInput={showinp} className='form-control' name="" id="" cols="30" rows="1"></textarea>
                                    </div>
                                    <div className="col-4 text-end ">
                                        <button onClick={addcomment} style={btnstyle} className="bg-light border border-primary px-3 py-1  " > отправить </button>
                                    </div></div>


                            </div>







                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default ProphModal 