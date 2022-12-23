import Chats from "../Chats"
import { user } from "../User"

export const MessengerUser = () => {
    let usermess = user
    let chats = Chats.filter(i => i.first_user_id == localStorage.getItem('token') || i.second_user_id == localStorage.getItem('token'));
    return (
        
            <div className="col-lg-4  border-end border-secondary  ">
                <div className="row border-bottom border-secondary mx-0  p-3">
                    <div className="col-lg-8 text-center ">
                      <b> gu1n.ura</b> 
                    </div>
                    <div className="col-lg-3 text-end ">
                    <i class="fa-solid fa-comment"></i>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-lg-5 px-4 ">
                        <b>Сообщение</b>
                    
                    </div>
                    <div className="col-lg-6 text-primary text-end ">
                    <b>запросы : 12</b>
                    </div>
                </div>
                <div className="col-lg-12 messUser  "  >
                {chats.map(i => 
                    <>
                    <div className="row my-3 "   >
                        <div className="col-lg-3 text-center ">
                        <img className="messImg" src={i.first_user_avatar} alt="" />
                        </div>
                        <div className="col-lg-9">
                            {i.userName}
                        </div>
                    </div>
                    
                    </>
                    ) }
                </div>
                
            </div>


       
    )
} 