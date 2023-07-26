import styled from 'styled-components'
import { Bell } from '../../../assets/icon'
import logo from '../../../assets/kawaii.png';
import { USERNAME, loadSecrets } from '../../../secret';
import Api from '../../../api/Fetch';
import { getchannel, me } from '../../../api/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {

  const [channel, setChannel] = useState<any>();
  const navigate = useNavigate();
  const [username, setUsername] = useState<any>();

  useEffect(() => {
    async function getUsername() {
      const api = new Api({}, me);
      const res = await api.get();
      if (res.status) {
        localStorage.setItem('USERNAME', res.username);
        setUsername(res.username);
      }
      else console.log(res);
    }

    if (!USERNAME){
      loadSecrets();
      getUsername();
    }
  }, [USERNAME]);

  useEffect(() => {
    async function getProfile() {
      loadSecrets();
      const payload = {
        username: USERNAME
      }
      const getData = new Api(payload, getchannel);
      const res = await getData.postJson();
      if (res.status) setChannel(res.channel);
      else console.log(res);
    }
    getProfile();
  }, [username]);

  return (
    <StyledDiv>
      <input type="search" placeholder='Search..' />
      <div className="action">

        <span className='wrapper'>
          <Bell />
          <div className="notif-dropdown">

          </div>
        </span>

        <div className="wrapper">
          <div className="dp-wrapper"><img src={channel ? channel.dp : logo} /></div>
          <menu className="profile-dropdown">
            <li onClick={() => navigate('../upload')}> ⭐ Upload</li>
            <li onClick={() => navigate(`../${USERNAME}`)}> ⭐ Profile</li>
            <li onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            style={{color: 'lightcoral'}}
            > ⭐ Logout</li>
          </menu>
        </div>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  padding-top: 30px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  animation: none;

  .wrapper{
    position: relative;

    &:hover>.profile-dropdown{
      scale: 1;
    }

    .profile-dropdown{
      position: absolute;
      right: 0;
      top: 45px;
      width: fit-content;
      height: fit-content;
      background-color: #ffffff;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      border: 1px solid lightgrey;
      overflow: hidden;
      scale: 0;
      transition: all 0.3s;
      
      li{
        list-style: none;
        padding: 10px 15px;
        width: 150px;
        border-bottom: 1px solid lightgrey;
        font-weight: bold;
        color: #575757;
        cursor: pointer;

        &:hover{
          background-color: #eeeeee;
        }
      }
    }
  }

  input{
    width: 100%;
    border-color: lightgray;
    max-width: 1000px;
  }

  .action{
    display: flex;
    gap: 15px;

    span{
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      
      &:hover{
        background-color: #d4f5ff;
      }
    }
    
    .dp-wrapper{
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 999px;
      outline: 1px solid cyan;
      cursor: pointer;

      img{
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
  }
`