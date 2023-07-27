import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Api from '../../../api/Fetch';
import { gethistory } from '../../../api/api';
import { Link } from 'react-router-dom';
import notfound from '../../../assets/not-found.png'

export default function History() {

  const [history, setHistory] = useState<any>();

  useEffect(() => {
    async function getHistory() {
      const api = new Api({}, gethistory);
      const res = await api.get();
      if (res.status) {
        setHistory(res.history);
      }
    }
    getHistory();
  }, []);

  return (
    <StyledDiv>
      <div className="wrapper">
        {
          history
            ? (history.length > 0)
              ? history.map((video: any) => {
                return (
                  <div className="history">
                    <Link className="thumbnail-wrapper" to={`../video/${video._id}`}><img src={video.thumbnail} /></Link>
                    <div className="info">
                      <div className="dp-wrapper"><img src={video.dp} /></div>
                      <div className="desc">
                        <h4><Link to={`../${video.username}`}>{video.username}</Link></h4>
                        <h3>{video.title}</h3>
                      </div>
                    </div>
                  </div>
                )
              })
              : <div className="not-found">
                <div className="img-wrapper"><img src={notfound} /></div>
                <h3>No History</h3>
              </div>
            : <div className="not-found">
              <div className="img-wrapper"><img src={notfound} /></div>
                <h3>No History</h3>
            </div>
        }
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .wrapper{
    width: calc(100% - 60px);
    max-width: 1000px;
    height: fit-content;
    margin: auto;
    padding: 30px;

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

    img{
      width: inherit;
      height: inherit;
      object-fit: cover;
    }

    a{
      color: inherit;
    }

    .info{
        max-width: 45%;
        display: flex;
        gap: 15px;

        .desc{
          width: 80%;
        }
    }

    .history{
      display: flex;
      background-color: white;
      padding: 30px;
      border-radius: 15px;
      gap: 30px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
      margin-bottom: 30px;
      animation: pop 0.2s ease-in-out;

      .thumbnail-wrapper{
        width: 300px;
        
        height: 200px;
        overflow: hidden;
        border-radius: 15px;
      }

      .dp-wrapper{
        width: 50px;
        min-width: 50px;
        flex-shrink: 0;
        height: 50px;
        overflow: hidden;
        border-radius: 999px;
        outline: 1px solid cyan;
        margin-bottom: 15px;
      }
    }
  }
`