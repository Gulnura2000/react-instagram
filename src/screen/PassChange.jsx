import axios from "axios"
// import { data } from "jquery"
// import { useEffect } from "react"
import { useState } from "react"
import { Alert, Space } from 'antd';
const PassChange  = ()=>{
    let [error, seterror] = useState()
const [ pass, setpass ] = useState()

   let newpass = async()=>{
    if(pass !=null){
        if (pass.length > 5) {
             let param = {
        'id':localStorage.getItem('token'),
        'newpass':pass
    }
    let passData = await axios({
        method:"update",
        params:param,
        url:"https://sstss.ru/passchange/pchange"
    })
    if(passData != null){
        if(passData.data.status == 200){
            window.location.href = '/'
        }
    } 
        }  else{
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
       



    }  else{
        seterror(
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
            >
                <Alert message="пожалуйста, заполните поля " type="error" />
            </Space>
        )

    }
   
    
}




    return(
        <div>
            <div className="col-md-3 mx-auto my-5 ">
                <p> {error} </p>
                <p>новый пароль</p>
            <input type="text" onChange={(e)=>{setpass(e.target.value)}} className="form-control"  placeholder="enter password " /> <br /> <br />
            <button className="form-control" onClick={newpass} >изменить</button>
            </div>
           
        </div>
    )
}

export default PassChange