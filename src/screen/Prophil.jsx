
import { useNavigate, useParams } from "react-router-dom"
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Myfollowers from '../Myfolllowers'
import { Header } from "../component/Header"
import { posts } from "../posts"
import ImgItem from "../product/Img_item"
import { user } from "../User"
import axios from "axios";
import { useEffect } from "react";


export const Prophil = () => {
    let [newuser, setnewUser] = useState(null)
    let [posts, setpots] = useState(null)
    let userDetails = async () => {
        let param = {
            'id': localStorage.getItem('token')
        }
        const user = await axios({
            method: "get",
            params: param,
            url: "https://sstss.ru/users/user",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        })

        if (user != null) {
            if (user.status == 200) {
                console.log("data!", user.data.user)
                setnewUser(user.data.user)
            }
        }
    }



    let userposts = async () => {
        let param = {
            'userid': localStorage.getItem('token')
        }
        let posts = await axios({
            params: param,
            method: 'get',
            url: "https://sstss.ru/enter/logins"
        })
        if (posts != null) {
            if (posts.status == 200) {
                setpots(posts.data.logins)
            }
        }
    }
    console.log(posts);
    useEffect(() => {
        userDetails()
        userposts()
    }, [])


    let localToken = localStorage.getItem('token')
    let myfoll = Myfollowers.filter(i => i.user_id == localToken)
    let foll = Myfollowers.filter(i => i.following_id == localToken)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let local = localStorage.getItem('token')
    if (local == null) {
        window.location.href = '/'
    }




    return (
        <div>
             <Header  />
            {newuser != null ?
            <>  
            
              <div className="col-lg-8 mx-auto bg-white p-2  ">
                    <div className="row d-flex align-items-center ">
                        <div className="col-1 col-md-2 col-lg-3 ">
                            <img style={{ "width": "100%", "height": "100%", "borderRadius": "50%" }} src={ 'https://sstss.ru/registrations/uploads/'+newuser.avatar} alt="" />
                        </div>
                        <div className="col-9">
                            <div className="row d-flex align-items-center ">
                                <div className="col-4">

                                    <div className="col-12 my-2 ">
                                        <h2>{newuser.firstname}</h2>
                                    </div>
                                    <div className="col-lg-12"> {posts != null ?posts.length + "  публикаций " :0 + "  публикаций"} 
                                      </div>

                                </div>
                                <div className="col-4  ">
                                    <div className="col-12 my-2 ">
                                       <a href="/edit" className="btn btn-dark" > редактировать </a>   </div>
                                    <div onClick={() => setModal2Open(true)} className="col-lg-12"> <h6>{foll.length} подписчиков </h6> </div>

                                </div>
                                <div className="col-4 my-2 ">
                                    <div className="col-lg-12 my-2 ">настройки</div>
                                    <a className="text-dark" >
                                        <div className="col-lg-12 py-2 " onClick={showModal} > <h6> {myfoll.length} подписок</h6>
                                        </div> </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className=" col-md-11 col-lg-8 mx-auto text-end    mt-5  ">
                        <div className="row">
                            <div className="col-3">
                                <h5 >публикации</h5>
                            </div>
                            <div className="col-3"> <h5> Reals </h5></div>
                            <div className="col-3">   <h5>Сохраненное</h5></div>
                            <div className="col-3">
                                <h5>отметки    </h5>
                            </div>


                        </div>
                    </div>





                </div>
                </>
                : <>loading</>}



            <div className="col-lg-8 mx-auto bg-white ">

                <div className="row  mx-2 my-2 ">
                    {posts ?
                        posts.map((item) =>
                            <ImgItem product={item} />
                        )
                        : <></>}
                </div>

            </div>




            <Modal title="Ваши подписки" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <div className="row  ">
                    <div className="col-6 text-center text-primary ">
                        <b> люди </b>
                    </div>
                    <div className="col-6 text-center text-primary ">
                        <b>Хештеги</b>
                    </div>
                </div>
                <hr />
                <div className="col-md-12 px-2" style={{ "height": "300px", "overflow-y": "scroll", "overflow-x": "hidden" }} >
                    {myfoll.map(i =>

                        <div className="row py-3 " >
                            <div className="col-2">
                                <img src={i.follower_avatar} className='rounded-circle' alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="col-6">
                                <a href={'/userprophill/' + i.id}><b>{i.follower_username}</b></a>
                            </div>
                            <div className="col-4 text-end ">
                                <button className='border border-secondary px-3 py-1 bg-white rounded '> подписки </button>
                            </div>
                        </div>

                    )}
                </div>



            </Modal>

            <Modal
                title="Подписчики"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}>
                <div className="col-md-12 px-2" style={{ "height": "300px", "overflow-y": "scroll", "overflow-x": "hidden" }} >
                    {foll.map(i =>
                        <div className="row py-3 " >
                            <div className="col-2">
                                <img src={i.avatar} className='rounded-circle' alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="col-6">
                                <a href={"/userprophill/" + i.user_id}> <b>{i.username}  </b></a>  <small className="text-primary pb-3 "> подписаться </small>
                            </div>
                            <div className="col-4 text-end ">
                                <button className='border border-secondary px-3 py-1 bg-white rounded '> удалить </button>
                            </div>
                        </div>
                    )}
                </div>


            </Modal>





        </div>
    )
}


