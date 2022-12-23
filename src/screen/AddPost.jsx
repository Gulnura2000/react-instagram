import axios from "axios"
import { useState } from 'react';
import { notification} from 'antd';
import { Header } from "../component/Header";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React from 'react';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  
const AddPost = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([

   
   
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
    const openNotificationWithIcon = (type, messege) => {
        notification[type]({
            message: messege,
        });
    };
    const [photo, setPhoto] = useState([])
    let [AddInp, setAddInp] = useState()
    let [location, setLocation] = useState()
    const postData = async () => {
        if (photo != null) {
            const form = new FormData();
            form.append('photo', photo);
            form.append('comment', AddInp);
            form.append('location', location)
            form.append('userid', localStorage.getItem('token'));
            const Public = await axios({
                method: "post",
                data: form,
                url: "https://sstss.ru/login/post",
                config: {
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                }
            })

            if (Public != null) {

                if (Public.status == 200) {
                    openNotificationWithIcon('success', "успешно")

                    window.location.href = "/home"
                    console.log(Public);
                } else {
                    openNotificationWithIcon('error', "error")

                }
            }
        } else {
            openNotificationWithIcon('error', 'Произошла ошибка!');
        }
    }

    return (
        <div>
          <Header/>
                <h4 className='text-center' >Перетащите сюда фото и видео</h4>
                <div className="col-md-4 mx-auto text-center ">
                    <input type="file" name='photo' onChange={(e) => { setFileList(e.target.files[0]) }} /> <br /> <br />
                    <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // onChange = {(e)=>{setPhoto(e.target.files[0])}}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
                    <textarea className='form-control' placeholder='description' name="" id="" cols="30" onChange={(e) => { setAddInp(e.target.value) }} rows="1"></textarea> <br />
                    <input className='form-control' type="text" onChange={(e) => { setLocation(e.target.value) }} placeholder="location" />   <br />
                    <button className='form-control  w-50 mx-auto border border-primary bg-success text-white ' onClick={postData}>add post</button>

                    <>
   
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
                </div>

                
           
                




        </div>
    )
}
export default AddPost