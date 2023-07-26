import styled from 'styled-components';
import logo from '../../../assets/logo.png'
import VideoPost from './VideoPost';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import Api from '../../../api/Fetch';
import { getfeed } from '../../../api/api';
export default function Main({ trending }: { trending: boolean }) {

  const [feed, setfeed] = useState([]);

  useEffect(() => {
    async function getVideoFeed() {
      const api = new Api({}, getfeed);
      const res = await api.get();
      if (res.status) {
        setfeed(res.feed);
        console.log(res.feed);
      }
      else console.log(res);
    }

    getVideoFeed();
  }, []);

  return (
    <>
      <TopBar />
      <StyledDiv>

        {
          (feed.length > 0)
            ? feed.map((videofeed: any) => {
              return (
                <VideoPost
                  thumbnail={videofeed.thumbnail}
                  dp={videofeed.dp}
                  title={videofeed.title}
                  channel={videofeed.username}
                  id={videofeed._id}
                />
              )
            }).reverse()
            : "No Videos"
        }

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