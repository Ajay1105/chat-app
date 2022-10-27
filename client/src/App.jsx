import React,{useState} from 'react'
import {StreamChat, streamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import {ChannelContainer, ChannelListContainer,Auth} from './components/index'

import 'stream-chat-react/dist/css/index.css'
import './App.css'

const cookies = new Cookies();

const apiKey = 'revnz26cf8qj';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id:cookies.get('userId'),
    name:cookies.get('username'),
    fullName:cookies.get('fullName'),
    image:cookies.get('avatarURL'),
    phoneNumber:cookies.get('phoneNumber'),
    hashedPassword:cookies.get('hashedPassword'),
  },authToken)
}

const App = () => {
 const [createType, setCreateType] = useState('');
 const [isCreating, setisCreating] = useState(false);
 const [isEditing, setisEditing] = useState(false);

 if(!authToken) return <Auth/>

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme="team light">
        <ChannelListContainer 
        isCreating = {isCreating}
        setisCreating = {setisCreating}
        setCreateType = {setCreateType}
        setisEditing = {setisEditing}
        />
        <ChannelContainer 
        isCreating = {isCreating}
        setisCreating = {setisCreating}
        setisEditing = {setisEditing}
        isEditing = {isEditing}
        createType = {createType}
        />
      </Chat>
    </div>
  )
}

export default App