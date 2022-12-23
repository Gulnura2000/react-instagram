import { Header } from "../component/Header"
import { MessengerUser } from "../component/MessengerUser"
import { MessMess } from "../component/MessengerMess"
export const Messenger = () => {
    let local = localStorage.getItem('token')
    if( local == null ){
   window.location.href = '/'
    }
    return (
        <div>
            <Header />
            <div className="col-lg-10 mx-auto bg-white rounded my-0 messenger "  >
                <div className="row">
                    <MessengerUser />
                    <MessMess />
                </div>

            </div>
        </div>
    )
}