import React from 'react'
import {Channel,useChatContext} from 'stream-chat-react';

import {ChannelInner,CreateChannel,EditChannel,TeamMessage} from './';

const ChannelContainer = ({isCreating, setisCreating, setisEditing, isEditing, createType}) => {
 const {channel} = useChatContext();

 if(isCreating){
  return(
<div className='channel__container'>
<CreateChannel createType={createType} setisCreating={setisCreating}/>
</div>
  )
 }

 if(isEditing){
  return (
    <div className='channel__container'>
<EditChannel setisEditing={setisEditing}/>
</div>
  )
 }

const EmptyState =()=>{
  <div className='channel-empty__container'>
  <p className='channel-empty__first'>This is beginning of chat</p>
  <p className='channel-empty__second'>Send messages,link,emoji and more</p>
  </div>
}

  return (
    <div className='channel__container'>
     <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps,i)=> <TeamMessage key={i}{...messageProps}/>}
      >
      <ChannelInner setisEditing={isEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer