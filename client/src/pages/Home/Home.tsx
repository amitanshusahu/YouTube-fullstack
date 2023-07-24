import styled from 'styled-components';
import Nav from './components/Nav';

export default function Home({ component }: { component: JSX.Element }) {
  return (
    <StyledDiv>
      <Nav />
      <div className='content-wrapper'>
        {component}
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  /* overflow: hidden; */
  display: grid;
  grid-template-columns: 1fr 5fr;

  .content-wrapper{
    width: 100%;
    height: 100vh;
    background-color: #dce7ec;
    overflow-x: hidden;
    overflow-y: auto;
  }
`