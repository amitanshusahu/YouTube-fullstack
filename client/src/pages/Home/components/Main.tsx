import styled from 'styled-components';
import VideoPost from './VideoPost';
import TopBar from './TopBar';
import { useEffect, useState } from 'react';
import Api from '../../../api/Fetch';
import { getfeed, getpublicfeed } from '../../../api/api';
import notfound from '../../../assets/not-found.png'
import { USERNAME, loadSecrets } from '../../../secret';

export default function Main({ trending }: { trending: boolean }) {

  const [feed, setfeed] = useState([]);

  useEffect(() => {
    async function getVideoFeed() {
      const api = new Api({}, getfeed);
      const res = await api.get();
      if (res.status) {
        setfeed(res.feed);
      }
      else console.log(res);
    }

    async function getPublicFeed(){
      const api = new Api({}, getpublicfeed);
      const res = await api.get();
      setfeed(res.feed);
    }

    loadSecrets();
    if(!USERNAME || trending){
      getPublicFeed();
    }

    if(!trending){
      getVideoFeed();
    }
  }, [trending]);

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
            : <div className="not-found">
              <div className="img-wrapper"><img src={notfound} /></div>
              <h3>Server Has No Videos !</h3>
            </div>
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

      .not-found{
      width: calc(100% - 60px);
    max-width: 1000px;
    height: fit-content;
    margin: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: none;


    img, h3{
      opacity: 0.5;
      animation: none;
    }
    }
`