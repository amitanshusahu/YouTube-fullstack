import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../../api/Fetch';
import { login } from '../../api/api';
import { TOKEN, loadSecrets } from '../../secret';

export default function Login() {

  const [username, setusername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    loadSecrets();
    if(TOKEN){
      navigate('../home');
    }
  }, [])

  const handelSubmit = async () => {
    const payload = {
      username,
      password
    };
    const postPayload = new Api(payload, login);
    const res = await postPayload.postJson();
    if ( res.status ) {
      localStorage.setItem('TOKEN', res.token);
      navigate('../home');
    }
    else{
      alert(res.msg);
    }
  }

  return(
    <StyledDiv>
      <div className="wrapper">
        <img src={logo} />
        <input type="text" placeholder='Username' onChange={(e) => setusername(e.target.value)}/>
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handelSubmit}>Let's Go!</button>
        <Link to="../">Don't Have a Account?</Link>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    img{
      width: 550px;
    }

    input, button{
      font-size: 13px;
      width: 300px;
      font-weight: bold;
      outline: none;
    }
    button{
      width: calc(300px + 20px)
    }

    a{
      color: grey;
    }
  }
`