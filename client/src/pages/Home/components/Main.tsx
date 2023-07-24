import styled from 'styled-components';
import logo from '../../../assets/logo.png'
import VideoPost from './VideoPost';
import TopBar from './TopBar';
export default function Main({ trending }: { trending: boolean }) {
  return (
    <>
    <TopBar />
      <StyledDiv>

        <VideoPost
          thumbnail={logo}
          dp={logo}
          title='This is some title'
          channel='channelName'
        />

      </StyledDiv>
    </>
  )
}

const StyledDiv = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-template-rows: 300px;
  justify-content: center;
`