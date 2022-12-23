import { useNavigate } from 'react-router-dom'
import Historyobj from '../Historyobj'
// import userhistory from '../userhisrory'

export const History = ()=>{
    let navigate = useNavigate()
   let history = Historyobj
   let openHIstory = (id)=>{
    navigate('/history/'+id )
   }
    return(
       
             <div className="col-lg-6  history ">
            <div className="row  ">
             { history.map(i => 
                <>
                <div onClick={()=>openHIstory(i.id)} className="col-lg-2 text-center mx-3 ">
                   <img   className="historyImg"  src={i.avatar} alt="" width={"100%"}/> 
                    <p>{i.name}</p>

                </div>
                
                </>
                
                ) }

            </div>

        </div>
    
       
    )
}