import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter  , Routes, Route } from 'react-router-dom'
import Lenta from './screen/lenta';

import { Messenger } from './screen/Messenger';
import { Prophil } from './screen/Prophil';
import ProphModal from './component/ProphModal';
import HistoryUser from './screen/HistoryUser'
import Auth from './component/Auth';
import UserProphill from './screen/UserProphill';
import 'antd/dist/antd.css';
import Myfollow from './screen/Myfollow';
import AddPost from './screen/AddPost';
import Register from './screen/Register';
import Edit from './screen/Edit';
import PassChange from './screen/PassChange';
import './css/style.css';
function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element = {<Auth/>}/>
      <Route path='/home' element = {<Lenta/>}/>
      <Route path='/messenger' element = {<Messenger/>} />
      <Route path='/prophill' element = {<Prophil/>} />
      <Route path='/prophmodal/:img' element = {<ProphModal/>} />
      <Route path='history/:id' element = {<HistoryUser/>} />
      <Route path='/userprophill/:id' element = { <UserProphill/> } />
      <Route path='/myfollow' element = {<Myfollow/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path = "/addpost" element = {<AddPost/>}/>
      <Route path='/edit' element = {<Edit/>}/>
      <Route path='/passchange' element = { <PassChange/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
