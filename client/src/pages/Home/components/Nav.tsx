import styled from 'styled-components'
import logo from '../../../assets/logo.png';
import { Home, Zap, Film, Share } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom';

export default function Nav() {

  const navigate = useNavigate();

  return (
    <StyledDiv>
      <img src={logo} />
      <button onClick={() => navigate('../home')}><Home /> Home</button>
      <button onClick={() => navigate('../trending')}><Zap /> Trending</button>
      <button onClick={() => navigate('../subscribed')}><Film /> Subscribed</button>
      <button onClick={() => navigate('../history')}><Share />  History</button>
    </StyledDiv>
  )
}

const StyledDiv = styled.menu`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 2px solid #f0f0f0;

  img{
    width: 200px;
    margin: 15px 0 15px;
  }

  button{
    all: unset;
    padding: 15px;
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    color: grey;
    
    &:hover{
      background-color: #d2f6ff;
      color: black;
    }

  }
  button[class="active"]{
    background-color: #d2f6ff;
    color: black;
  }
`