import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Api from '../../../api/Fetch';
import { getchannel, issubscribed, subscribe, unsubscribe } from '../../../api/api';
import logo from '../../../assets/kawaii.png';
import { USERNAME } from '../../../secret';

export default function Profile() {

  const param = useParams();
  const username = param.username;
  const [channel, setChannel] = useState<any>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showButton, setShowButton] =useState<boolean>(true);

  useEffect(() => {
    async function getProfile() {
      const payload = {
        username
      }
      const getData = new Api(payload, getchannel);
      const res = await getData.postJson();
      if (res.status) setChannel(res.channel);
      else { 
        setShowButton(false);
        alert(res.msg);
      }
    }
    async function fetchissubscribed (){
      const api = new Api({username}, issubscribed);
      const res: any = await api.postAuthjson();
      if(res.status){
        setIsSubscribed(true);
      }
    }
    if( username == USERNAME ) setShowButton(false);
    fetchissubscribed();
    getProfile();
  }, []);
  

  const handelUnsubscribe = async () => {
    const api = new Api({unsubscribe:username}, unsubscribe);
    const res: any = await api.postAuthjson();
    if(res.status){
      setIsSubscribed(false);
    }
    else alert(res.msg);
  }

  const handelSubscribe = async () => {
    const api = new Api({subscribe:username}, subscribe);
    const res: any = await api.postAuthjson();
    if(res.status){
      setIsSubscribed(true);
    }
    else alert(res.msg);
  }

  return (
    <StyledDiv>
      <div className="profile-wrapper">
        <div className="banner-wrapper"><img src={channel? channel.banner : ""} /></div>
        <div className="profile">
          <div className="dp-wrapper"><img src={channel? channel.dp : logo} /></div>
          <div className="info">
            <h2>{channel? channel.username : username}</h2>
            <p>{channel? channel.bio : "Make it Yours"}</p>
            {showButton
              ? isSubscribed
              ? <button className='unsubscribe' onClick={handelUnsubscribe}> Subscribed </button> 
              : <button className='subscribe' onClick={handelSubscribe}> Subscribe </button>
              : <button className='unsubscribe'> Subscribed </button>}
          </div>
        </div>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`

  img{
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  .unsubscribe{
    background-color: lightgrey;
    color: grey;
  }

  .profile-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    .banner-wrapper{
    width: 100%;
    height: 250px;

  }

  .profile{
    margin: 30px;
    max-width: 1200px;
    width: calc(100% - 60px);
    display: flex;
    gap: 30px;

    .dp-wrapper{
      width: 250px;
      height: 250px;
      border-radius: 999px;
      overflow: hidden;
      margin-top: -80px;
      outline: 2px solid white;
    }

    .info{
      width: 60%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      button{
        max-width: 150px;
      }
    }
  }
  }
`