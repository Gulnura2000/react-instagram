import { useState } from "react"
import axios from "axios"
const Edit = () => {
    const [login, setlogin] = useState()
    const [firstname, setfirstname] = useState()
    const [lastname, setlastname] = useState()
    const [number, setnumber] = useState()
    const [avatar, setavatar] = useState()
    let sendData = async () => {
        // const form = new FormData();
        // form.append('id', localStorage.getItem('token'))
        // form.append("login" , login)
        // form.append('firstname', firstname)
        // form.append('lastname', lastname)
        // form.append('cellnumber',number)
        // form.append('avatar',avatar)
        let param = {
            "login": login,
            "firstname": firstname,
            "lastname": lastname,
            "cellnumber": number,
            "avatar": avatar,
            "id": localStorage.getItem('token')
        }
        let reg = await axios({
            method: "update",
            params: param,
            url: "https://sstss.ru/profile/change",
            config: {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        })
        if (reg != null) {
            if (reg.status == 200) {
                window.location.href = '/prophill'
            }
        }
        }
    return (
        <>
        <div className="row mt-5">
            <div className="col-lg-4 text-center mt-5 "> <a href="/passchange">изменить пароль</a>  </div>
        <div className="col-lg-8 mx-auto" >
            <input type="text" onChange={(e) => { setlogin(e.target.value) }} className="form-control w-50  my-3 " placeholder="login" />
            <input onChange={(e) => { setlastname(e.target.value) }} className="form-control w-50  my-3 " type="text" placeholder="lastname" />
            <input onChange={(e) => { setfirstname(e.target.value) }} className="form-control w-50 my-3 " type="text" placeholder="firstname" />
            <input onChange={(e) => { setnumber(e.target.value) }} className="form-control w-50  my-3 " type="tel" placeholder="number" />


            <input type="text" className="form-control w-50  my-3 " placeholder="avatar" onChange={(e) => { setavatar(e.target.value) }} />


            <button className=" bg-primary text-white form-control w-50 my-3 " onClick={sendData} >отправить</button>
        </div>
        </div>
       
        </>
        
    )
}

export default Edit