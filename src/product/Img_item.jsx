import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProphModal from "../component/ProphModal"

const ImgItem = ({product}) => {
    let navigate = useNavigate()

    let [prophState, setprophState] = useState(false)
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
        <>
     
         <div className=" col-md-6 col-lg-4" style={{ "height": "300x" }}>
            <img onClick={() => FuncImg(product.post_id)} className="py-2" src={'https://sstss.ru/login/uploads/'+product.photo} alt="" width={"300px"} height={"300px"} />
        </div>
         {prophState ? <ProphModal /> : <></>}
        </>
       
    )
} 

export default ImgItem