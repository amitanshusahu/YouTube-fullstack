import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getchannel, getchannelfeed, getsubscribed } from '../../../api/api';
import Api from '../../../api/Fetch';
import VideoPost from './VideoPost';
import notfound from '../../../assets/not-found.png'
import selecttop from '../../../assets/select-top.avif'

export default function Subscribed() {

  const [accounts, setaccounts] = useState<any>();
  const [feed, setfeed] = useState<any>();

  useEffect(() => {
    async function getSubscribedAcc() {
      const api = new Api({}, getsubscribed);
      const res = await api.get();
      if (res.status) {
        console.log(res.subscribed.subscribed);
        let subscribedArr = res.subscribed.subscribed;
        let subscribedArrWithDp = [];

        for (let i = 0; i < subscribedArr.length; i++) {
          let dp = await getDp(subscribedArr[i]);
          let accobj = {
            username: subscribedArr[i],
            dp: dp,
          };
          subscribedArrWithDp.push(accobj);
        }

        setaccounts(subscribedArrWithDp);
      }
    }

    getSubscribedAcc();
  }, []);

  const getDp = async (username: string) => {
    const api = new Api({ username }, getchannel);
    const res: any = await api.postJson();
    if (res.status) return res.channel.dp;
    else return ""
  }

  async function getFeed(username: string) {
    const api = new Api({ username }, getchannelfeed);
    const res = await api.postJson();
    if (res.status) {
      setfeed(res.feed);
    }
    else console.log(res);
  }

  return (
    <StyledDiv>
      <div className="top-bar">
        <div className="hscroll-wrapper">

          {
            accounts
              ? accounts.map((acc: any) => {
                return (
                  <div className="dp-wrapper" onClick={() => getFeed(acc.username)}><img src={acc.dp} /></div>
                )
              })
              : "You have not Subscribed any Channel"
          }

        </div>
      </div>

      <div className="feed">
        {
          feed
            ? (feed.length > 0)
              ? feed.map((videofeed: any) => {
                return (
                  <VideoPost
                    thumbnail={videofeed.thumbnail}
                    title={videofeed.title}
                    id={videofeed._id}
                    dp={videofeed.dp}
                    channel={videofeed.username}
                  />
                )
              }).reverse()
              : <div className="not-found">
                <div className="img-wrapper"><img src={notfound} /></div>
                <h3>No Videos From This Channel</h3>
              </div>
            : <div className="not-found">
              <div className="select-wrapper"><img src={selecttop} /></div>
              <h3>Select Channel From Top</h3>
            </div>
        }
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
.not-found{
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    margin: auto;
    padding: 30px;
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: none;

    .select-wrapper{
      img{
      width: 500px;
      animation: none;
      }
    }

    img, h3{
      opacity: 0.5;
    }
    }

  .top-bar{
    background-color: white;
    width: 100%;
    overflow-x: auto;
    overflow-y:hidden;

    .hscroll-wrapper{
      width: fit-content;
      padding: 30px;
      display: flex;
      gap: 30px;
      animation: fade 0.3s ease-in-out;

      .dp-wrapper{
        width: 50px;
        min-width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 999px;
        cursor: pointer;
        animation: pop 0.2s ease-in-out;

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }

    }
  }

  .feed{
    width: calc(100% - 60px);
    padding: 30px;
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fill, 400px);
    grid-template-rows: 300px;
    justify-content: center;
  }
`