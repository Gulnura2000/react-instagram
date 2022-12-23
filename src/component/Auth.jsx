import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { user } from "../User";
import { notification} from 'antd';
import React from 'react';
import axios from "axios";

const Auth = () => {


    const [login, setLogin] = useState();
const [ password, setPassword] = useState()

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
            
                
        });
    };

    let AuthFunc = async () => {
        if ((login != "" && password != "") && (login != null && password != null )) {
            const form = new FormData();
            form.append('login', login)
            form.append('pass', password)
    
            let authAxios = await axios({
                method: 'post',
                data: form,
                url: "https://sstss.ru/enter/login",
                config: {
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                }
            })
            console.log( authAxios );
            if (authAxios != null) {
               
                if (authAxios.data.status == 200) {
                    console.log('data', authAxios.data);
                    localStorage.setItem('token', authAxios.data.user.id)
    
                    window.location.href = '/home'
                    
                } else {
                    openNotificationWithIcon('error', "неверный пароль или логин1")
                }
            }
      } else {
          openNotificationWithIcon('error', 'заполните поля')
        }
      }
       
       
      
// let js = async()=>{
//     let mybd = await axios({
//         method:'get',
//         url:""
//     })
// }


    return (
        <div>
            <div className="col-lg-4 mx-auto mt-5  bg-white rounded text-center py-3 ">
                <div className="col-lg-12 text-center ">
                    <img className="w-50" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo-2010-2013.png" alt="" />
                </div>
                <div className="col-lg-12  ">
                    <input type="text" onChange={(event) => setLogin(event.target.value)} placeholder="username" className="form-control w-50 mx-auto my-3 " />
                    <input type="pass" onChange={(event) => setPassword(event.target.value)} placeholder="password" className="form-control w-50 mx-auto  my-3 " />
                    <button className="w-50 bg-primary text-white py-1 border-0 rounded " >
                        <b onClick={AuthFunc}> Войти </b> </button>
                    <div className="col-6 mx-auto  my-3 ">
                        <div className="row">


                            <div className="col-5"> <hr /> </div>
                            <div className="col-2">
                                <b>или </b>  </div>
                            <div className="col-5"> <hr /> </div>

                        </div>
                        <div className="row text-center ">
                            <b className="text-primary"> войти через Facebook </b> <br />
                            <small className="text-primary py-2 " >забыли пароль</small>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-lg-4 mx-auto mt-5  bg-white rounded text-center py-4 ">
                У вас ещё нет аккаунта? <b onClick={()=>{window.location.href = '/register'}} className="text-primary"> Зарегистрироваться</b> <br />

            </div>




        </div>
    )


}
export default Auth