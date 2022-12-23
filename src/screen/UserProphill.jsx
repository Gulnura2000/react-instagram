import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Modal } from 'antd'

import { Header } from "../component/Header"
import ProphModal from "../component/ProphModal"
import { posts } from "../posts"
import { user } from "../User"
import Myfollowers from "../Myfolllowers"

const UserProphill = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    let local = localStorage.getItem('token')
    if (local == null) {
        window.location.href = '/'
    }
    let navigate = useNavigate()
    let params = useParams()
    let foll = Myfollowers.filter(i => i.following_id == params.id)
    let myfoll = Myfollowers.filter(i => i.user_id == params.id)

    let userPosts = posts.filter(i => i.id == params.id)
    let userProphil = user.filter(i => i.user_id == params.id)
    let [prophState, setprophState] = useState(false)
console.log(foll);
    let FuncImg = (id) => {

        navigate('/prophmodal/' + id)
        if (prophState == false) {
            setprophState(true)
        }
        else {
            setprophState(true)
        }
    }

    

    return (
        <div>
            <Header />
            {userProphil.map(i =>
                <> <div className="col-md-8 mx-auto bg-white p-2  ">
                    <div className="row d-flex align-items-center ">
                        <div className="col-lg-3">
                            <img style={{ "width": "200px", "height": "200px", "borderRadius": "50%" }} src={i.avatar} alt="" />
                        </div>
                        <div className="col-lg-9">
                            <div className="row d-flex align-items-center ">
                                <div className="col-lg-4">
                                    <div className="col-lg-12"> <h2>{i.userName}</h2>  </div>
                                    <div className="col-lg-12"> {userPosts.length} публикаций </div>

                                </div>
                                <div className="col-lg-4">
                                    <div className="col-lg-12"> <h2
                                        className="border border-secondary " > Редактировать </h2>  </div>
                                    <div className="col-lg-12" onClick={()=>setModal3Open(true)} > {foll.length} подписчиков</div>

                                </div>
                                <div className="col-lg-4">
                                    <div className="col-lg-12">настройки</div>
                                    <div onClick={() => setModal2Open(true)} className="col-lg-12">  {myfoll.length}  подписки </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="col-lg-8 mx-auto text-end    mt-5  ">
                        <div className="row">
                            <div className="col-lg-3">
                                <h5 >публикации</h5>
                            </div>
                            <div className="col-lg-3"> <h5> Reals </h5></div>
                            <div className="col-lg-3">   <h5>Сохраненное</h5></div>
                            <div className="col-lg-3">
                                <h5>отметки    </h5>
                            </div>


                        </div>
                    </div>





                </div>
                </>
            )}


            <div className="col-lg-8 mx-auto bg-white ">

                <div className="row  mx-2 my-2 ">
                    {userPosts.map(i => <>
                        <div className="col-lg-4" style={{ "height": "300x" }}>
                            <img onClick={() => FuncImg(i.id)} className="py-2" src={i.images} alt="" width={"100%"} height={"100%"} />
                        </div>

                    </>)}
                </div>

            </div>

            <Modal
                title="Подписки"
                centered
                visible={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)} >
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
                visible={modal3Open}
                onOk={() => setModal3Open(false)}
                onCancel={() => setModal3Open(false)} >
                <div className="col-md-12 px-2" style={{ "height": "300px", "overflow-y": "scroll", "overflow-x": "hidden" }} >
                    {foll.map(i =>

                        <div className="row py-3 " >
                            <div className="col-2">
                                <img src={i.follower_avatar} className='rounded-circle' alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="col-6">
                                <a href={'/userprophill/' + i.id}><b>{i.follower_username}</b></a>
                            </div>
                            <div className="col-4 text-end ">
                                <button className='border border-secondary px-3 py-1 bg-white rounded '> удалить </button>
                            </div>
                        </div>

                    )}
                </div>
            </Modal>
     
            {prophState ? <ProphModal /> : <></>}








        </div>
    )
}
export default UserProphill