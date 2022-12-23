import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeUser } from "../LikeUser";
import user from "../User";
import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import axios from "axios";
import { Select } from 'antd';

export const Header = () => {
 

  let [searchState, setSearchState] = useState(false)

  let LikeUserArr = LikeUser
  const [likeState, setLikeState] = useState(false)
  const [inpheader, setinpheader] = useState()
   let [newuser, setnewUser] = useState(null)
 

  
    
    
  
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
let searchiuser = [
  ...obj
]
// let map = user.map(i =>   i.userName)
 let obj = {
  value:"sdf",
  label:"sdfdsf"
 }
console.log(map);
let navigate = useNavigate()
  let searchuser = user.filter(i => i.userName == inpheader)
  let goOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/prophill">
         <h6> профиль </h6>
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
         <h6> настройки </h6>
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        <h6> переключится между аккаунтами </h6>
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={goOut}>
        <h6> выйти </h6>
        </a>
      ),
    },
  ]
  let inpSearch = (event) => {
    setinpheader(event.target.value)

    if (searchState == false) {
      setSearchState(true)
    } else {
      setSearchState(false)
    }



  }

  let Funclikeblock = () => {
    if (likeState == false) {
      setLikeState(true)
    } else {
      setLikeState(false)
    }

  }
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
  // let FuncProphblock = () => {
  //   if (ProphState == false) {
  //     setProphState(true)
  //   } else {
  //     setProphState(false)
  //   }
  // }
useEffect(()=>{
userDetails()
},[])
  return (
    <div className=" col-md-11 col-lg-11 fixed-header bg-white w-100 ">
      <div className="col-lg-10 header mx-auto  ">
        <div className="row py-3 align-items-center   ">
          <div className=" col-4 logo">
         
            <select name="" id="">
              <option value="1"> инстаграм </option>
              <option value="1"> Подписки </option>
              <option value="1"> Избранное   </option>
            </select>
          </div>
          {/* <div className="col-4 search mx-auto "  >
            <input onInput={inpSearch} type="text" className="form-control px-2" placeholder="search" />

            {searchState ? <div className="col-3 border border-secondary rounded bg-white  position-fixed " style={{ "height": "200px" }} >


              {searchuser.map(i =>
                <div className="row d-flex align-items-center py-2 border-bottom border-secondary mx-0  ">
                  <div className="col-3 text-end  ">
                    <img className="rounded-circle  " src={i.avatar} alt="" width={"50px"} height={"50px"} />
                  </div>
                  <div className="col-6 text-center">
                    <a className="text-dark" href={" /userprophill/" + i.user_id}> <b> {i.userName}</b></a>
                  </div>

                </div>
              )}

            </div> : <></>}







          </div> */}
          <div className="col-4">
          <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
 
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
 obj
    
    ]}

  
  />
          </div>
          <div className="col-4 icon">
            <a href="/home"> <i class="fa-solid fa-house px-2 "></i></a>
            <a href="/messenger"><i class="fa-brands fa-facebook-messenger px-2"></i></a>
          <a href="/addpost"><i  class="fa-solid fa-square-plus px-2"></i></a>  

            <i onClick={Funclikeblock} class="fa-solid fa-heart px-2"></i>
            {likeState ?
              <div className="col-lg-5  bg-white like-block  position-absolute "  >
                <b className="p-3">На этой неделе</b>
                {LikeUserArr.map(i =>
                  <>
                    <div className="row py-3 ">
                      <div className="col-lg-2 text-end">
                        {i.img}
                      </div>
                      <div className="col-lg-7">
                        <b>{i.name}</b> {i.desc}<br />
                        <small>
                          {i.time}
                        </small>
                      </div>
                      <div className="col-lg-3">
                        {i.followbtn}
                      </div>
                    </div></>
                )}
              </div> : <></>
            }
{ newuser != null ?
 <Dropdown    menu={{  items ,  }}   placement="bottom"  >

         <img className="headerimg"
          src={"https://sstss.ru/registrations/uploads/"+ newuser.avatar }alt="" width={'50px'} height={"50px"} />
      
      </Dropdown> : <></>
}
       

           

          
             

           

          </div>
        </div>




      </div>
    </div>

  )
}