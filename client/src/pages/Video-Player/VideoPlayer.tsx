import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Api from '../../api/Fetch';
import { comment, getchannel, getcomments, getvideo, posthistory } from '../../api/api';
import 'video.js/dist/video-js.css';
import HlsPlayer from './components/HlsPlayer';
import logo from '../../assets/kawaii.png';
import { USERNAME, loadSecrets } from '../../secret';

export default function VideoPlayer() {

  const param = useParams();
  const { vid } = param;
  const [videoMetadata, setVideoMetadata] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [commentInput, setCommentInput] = useState<any>();
  const [dp, setDp] = useState<any>();

  useEffect(() => {
    async function getManifest() {
      const api = new Api({ vid }, getvideo);
      const res = await api.postJson();
      if (res.status) {
        setVideoMetadata(res.metadata);
      }
      else console.log(res);

      const getdp = await getDp();
      setDp(getdp);
    }

    async function pushHistory() {
      const api = new Api({vid}, posthistory);
      const res = await api.postAuthjson();
      console.log(res);
    }
    

    getComments();
    getManifest();
    pushHistory();
  }, []);

  async function getComments() {
    const api = new Api({ vid }, getcomments);
    const res = await api.postJson();
    if (res.status) {
      setComments(res.comments);
    }
  }

  const getDp = async () => {
    loadSecrets();
    const api = new Api({username: USERNAME}, getchannel);
    const res: any = await api.postJson();
    if ( res.status ) return res.channel.dp;
    else return logo;
  }

  const handelCommentSubmit = async () => {
    const payload = {
      vid,
      comment: commentInput,
      dp,
    }

    const api = new Api(payload, comment);
    const res = await api.postAuthjson();
    if (res.status) {
      getComments();
    }
    else alert(res.msg);
  }


  return (
    <StyledDiv>
      <div className="wrapper">

        {videoMetadata ? <HlsPlayer videoMetadata={videoMetadata} vid={vid} /> : " loading ..."}

        <h2>Comments</h2>

        <div className="comments-wrapper">
          <div className="post-comment">
            <div className="dp-wrapper"><img src={dp ? dp : logo} /></div>
            <div className="input-wrapper">
              <input type="text" placeholder='Comment Your Thoughts Here...' onChange={(e) => setCommentInput(e.target.value)}/>
              <button onClick={handelCommentSubmit}>Comment</button>
            </div>
          </div>
          <div className="comments">
            <ul>
              {
                comments
                  ? comments.map((comment : any) => {
                    return (
                      <li>
                        <div className="dp-wrapper"><img src={comment.dp ? comment.dp : logo} /></div>
                        <div className="info">
                          <h3><Link to={`../../${comment.from}`}>{comment.from}</Link></h3>
                          <p>{comment.comment}</p>
                        </div>
                      </li>
                    )
                  })
                  : "No comments yet"
              }
            </ul>
          </div>
        </div>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .wrapper{
    /* background-color: grey; */
    width: calc(100% - 60px);
    max-width: 1444px;
    margin: auto;
    padding: 30px;

    h2{
      margin-top: 30px;
    }

    a{
      color: inherit;
    }

    .comments-wrapper{
      margin-top: 30px;
      background-color: #e0fcff;
      border-radius: 15px;
      padding-top: 30px ;
    }

    .dp-wrapper{
        width: 50px;
        height: 50px;
        border-radius: 999px;
        overflow: hidden;
        outline: 1px solid cyan;
        margin-left: 15px;

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }

    .post-comment{
      display:flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      width: 100%;

      .input-wrapper{
        display: flex;
        width: 100%;
        input {
          width: 100%;
          font-size: 13px;
        }
        button{
          margin-left: 15px;
          margin-right: 15px;
        }
      }
    }

    .comments{
      margin-top: 30px;
      ul{
        background-color: white;
      }
      li{
        list-style: none;
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 15px 0;
        border: 1px solid #b8faff;
      }
    }
  }
`