import { Link, useNavigate, useParams } from 'react-router-dom'
import Historyobj from '../Historyobj'
const HistoryUser = () => {
    let local = localStorage.getItem('token')
    if( local == null ){
   window.location.href = '/'
    }
    let params = useParams()
    let myid = params.id
    let historyobjmap = Historyobj.filter(i => i.id == myid)
    let allhistory = Historyobj.filter(i => i.id != myid)
    console.log(allhistory);
    let navigate = useNavigate()
    let closeProphModal = () => {
        navigate('/home')
    }
    return (
        <div>
            <div className="proph-modal">
                <div onClick={closeProphModal} className="closeProphModal  text-end mx-5 ">
                    <h1><i class=" text-white fa-sharp fa-solid fa-xmark"></i></h1></div>

                <div className="row  historyslider ">
                    {
                        allhistory.map(i => <>
                            <div className="col-2   historymodal-img ">
                               <Link to = {'/history/'+i.id}><img src={i.history} alt="" width={"100%"} height={"100%"} /></Link>
                            </div>
                        </>)
                    }






                </div>
                {historyobjmap.map(i => <>

                    <div className="col-lg-4 historymodal-img-big ">
                        <img src={i.history} alt="" height={'80%'} width={'100%'} />
                    </div>
                </>)}
            </div>
        </div>
    )
}
export default HistoryUser