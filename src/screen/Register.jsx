import axios from "axios"
import { useState } from "react"
import { Alert, Space } from 'antd';
const Register = () => {
    const [error, seterror] = useState()
    const [login, setlogin] = useState()
    const [pass, setpass] = useState()
    const [firstname, setfirstname] = useState()
    const [lastname, setlastname] = useState()
    const [number, setnumber] = useState()
    const [avatar, setavatar] = useState([])




    let sendData = async () => {
        if (pass != null && login != null && firstname !=null && lastname != null && number != null && avatar != null  ) {
            if (pass.length > 5) {
                const form = new FormData();
                form.append("login", login)
                form.append('pass', pass)
                form.append('firstname', firstname)
                form.append('lastname', lastname)
                form.append('cellnumber', number)
                form.append('avatar', avatar)
                let reg = await axios({
                    method: "post",
                    data: form,
                    url: "https://sstss.ru/registrations/registrade",
                    config: {
                        headers: {
                            "Content-type": "multipart/form-data"
                        }
                    }
                })
                if (reg != null) {
                    if (reg.status == 200) {
                        window.location.href = '/'
                    }
                }
            } else {
                seterror(
                    <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Alert message=" пароли должен содержать не менее 5 символов " type="error" />
                </Space>
                )
            }
        } else {
            seterror(
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Alert message="пожалуйста, заполните все поля " type="error" />
                </Space>
            )

        }

    }

    return (
        <div>


            <div className=" col-md-10 col-lg-4 mx-auto ">

                <div className="col-lg-12 text-center ">
                    <img className="w-50" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo-2010-2013.png" alt="" /> <br />
                    <b>Зарегистрируйтесь, чтобы <br /> смотреть фото и видео ваших <br /> друзей.</b>
                    <div className="col-lg-5 mx-auto my-auto ">
                        {error}
                    </div>
                    <input type="text" onChange={(e) => { setlogin(e.target.value) }} className="form-control w-50 mx-auto my-3 " placeholder="login" />


                    <input onChange={(e) => { setpass(e.target.value) }} className="form-control w-50 mx-auto my-3 " type="password" placeholder="pass" />


                    <input onChange={(e) => { setlastname(e.target.value) }} className="form-control w-50 mx-auto my-3 " type="text" placeholder="lastname" />


                    <input onChange={(e) => { setfirstname(e.target.value) }} className="form-control w-50 mx-auto my-3 " type="text" placeholder="firstname" />


                    <input onChange={(e) => { setnumber(e.target.value) }} className="form-control w-50 mx-auto my-3 " type="tel" placeholder="number" />


                    <input type="file" onChange={(e) => { setavatar(e.target.files[0]) }} />


                    <button className=" bg-primary text-white form-control w-50 mx-auto my-3 " onClick={sendData} >отправить</button>
                </div>
            </div>


        </div>
    )
}

export default Register