import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { isliked, issubscribed, likecount, likevideo, stream, subscribe, unlikevideo, unsubscribe } from '../../../api/api';
import Hls from 'hls.js'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import logo from '../../../assets/kawaii.png';
import { Dislike, Like } from '../../../assets/icon';
import Api from '../../../api/Fetch';
import { USERNAME, loadSecrets } from '../../../secret';
import { Link } from 'react-router-dom';

export default function HlsPlayer({ videoMetadata, vid }: any) {

  const videoRef: any = useRef();
  const selectRef: any = useRef();
  const [like, setLike] = useState<number>(0);
  const [manifest, setManifest] = useState<string>(videoMetadata.m3u8);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (videoMetadata) {

      const videoElement = videoRef.current;

      // Check if HLS is supported by the browser
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(`${stream}${manifest}`);
        hls.attachMedia(videoElement);
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari, use the native HLS support
        videoElement.src = manifest;
      } else {
        console.error('HLS is not supported in this browser.');
      }

      const player = videojs(videoElement, {
        controls: true,
      });

    }
  }, [videoMetadata, manifest]);

  useEffect(() => {
    async function fetchissubscribed() {
      const api = new Api({ username: videoMetadata.username }, issubscribed);
      const res: any = await api.postAuthjson();
      if (res.status) {
        setIsSubscribed(true);
      }
    }
    async function getLike() {
      const api = new Api({ vid }, likecount);
      const res: any = await api.postJson();
      if (res.status) {
        setLike(res.likecount);
      }
      else console.log(res);
    }
    async function getIsLiked() {
      const api = new Api({ vid }, isliked);
      const res: any = await api.postAuthjson();
      setIsLiked(res.status);
    }

    getIsLiked();
    getLike();
    fetchissubscribed();

    loadSecrets();
    if (videoMetadata.username == USERNAME ) {
      setShowButton(false);
    }
  })

  const selectManifest = (): void => {
    let selected = selectRef.current.value;

    switch (selected) {
      case '100k':
        setManifest(`100k-${videoMetadata.m3u8}`);
        break;
      case '800k':
        setManifest(`800k-${videoMetadata.m3u8}`);
        break;
      case '1200k':
        setManifest(`1200k-${videoMetadata.m3u8}`);
        break;
      case '2400k':
        setManifest(`2400k-${videoMetadata.m3u8}`);
        break;
      case '3000k':
        setManifest(`3000k-${videoMetadata.m3u8}`);
        break;

      default:
        break;
    }

  }

  const handelUnsubscribe = async () => {
    const api = new Api({ unsubscribe: videoMetadata.username }, unsubscribe);
    const res: any = await api.postAuthjson();
    if (res.status) {
      setIsSubscribed(false);
    }
    else alert(res.msg);
  }

  const handelSubscribe = async () => {
    const api = new Api({ subscribe: videoMetadata.username }, subscribe);
    const res: any = await api.postAuthjson();
    if (res.status) {
      setIsSubscribed(true);
    }
    else alert(res.msg);
  }

  const handelUnlike = async () => {
    const api = new Api({vid}, unlikevideo)
    const res: any = await api.postAuthjson();
    if ( res.status) {
      setLike(res.like);
    }else console.log(res);
  }
  
  const handelLike = async () => {
    const api = new Api({vid}, likevideo)
    const res: any = await api.postAuthjson();
    if ( res.status) {
      setLike(res.like);
    }else console.log(res);
  }

  return (
    <StyledDiv>
      <div className="video-player">
        <div className="hls-player">
          <video ref={videoRef} poster={videoMetadata.thumbnail} className='video-js vjs-default-skin vjs-16-9 vjs-matrix' />
          <select name="bitrate" id='bitrate' ref={selectRef} onChange={selectManifest}>
            <option value={videoMetadata.m3u8}>Auto</option>
            <option value="100k">144p</option>
            <option value="800k">360p</option>
            <option value="1200k">480p</option>
            <option value="2400k">720p</option>
            <option value="3000k">1080p</option>
          </select>
        </div>

        <div className="details-wrapper">

          <div className="details">
            <div className="channel">
              <div className="dp-wrapper"><img src={videoMetadata.dp ? videoMetadata.dp : logo} /></div>
              <div className="info">
                <h3>{videoMetadata.title}</h3>
                <p><Link to={`../${videoMetadata.username}`}>{videoMetadata.username}</Link></p>
              </div>
            </div>
            <div className="action">
              <div className="like-wrapper">
                {
                  isLiked
                    ? <button onClick={handelUnlike}><Like fill="cyan" /></button>
                    : <button onClick={handelLike}><Like fill="none" /></button>
                }
                <span>{like}</span>
              </div>

              {showButton
                ? isSubscribed
                  ? <button className='unsubscribe' onClick={handelUnsubscribe}> Subscribed </button>
                  : <button className='subscribe' onClick={handelSubscribe}> Subscribe </button>
                : <button className='unsubscribe'> Subscribed </button>
              }
            </div>
          </div>

          <div className="desc">
            <h4>Description - </h4>
            <p>{videoMetadata.description}</p>
            <br />
            <h4>Tags -</h4>
            <p>{videoMetadata.tags}</p>
          </div>
        </div>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .video-player{
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e0fcff;

    a{
      color: grey;
    }

    .hls-player{
      width: 100%;
      position: relative;
      
      &:hover > #bitrate{
        opacity: 1;
      }
      
      #bitrate{
        transition: opacity 0.3s;
        border-radius: 5px;
        border: 1px solid cyan;
        background-color: #94f8ff5c;
        color: white;
        font-weight: bold;
        padding: 5px;
        opacity: 0;
        width: 70px;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 999 !important;
      }
    }

    .details-wrapper{
      width: calc(100% - 60px);  
      padding: 30px;
      .details{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 60px;
      }
      .desc{
        margin-top: 30px;
        background-color: white;
        border-radius: 15px;
        padding: 30px;
        border: 1px solid cyan;
      }
    }

    .channel, .action{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }

    .channel{
      .info{
        max-width: 85%;
      }
      .dp-wrapper{
        width: 70px;
        height: 70px;
        border-radius: 999px;
        overflow: hidden;

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }
    }

    .like-wrapper, .dislike-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 7px;

      button{
        all: unset;
        margin-top: 3px;
        cursor: pointer;
      }
    }

    .unsubscribe{
    background-color: lightgrey;
    color: grey;
  }


    .vjs-default-skin{
      width: 100%;
      border-radius: 15px;
      overflow: hidden;
    }
    .vjs-matrix .vjs-big-play-button {
      border-color: cyan;
      border-radius: 15px;
      background-color: #7dffff5e;
    }
    .vjs-matrix .vjs-volume-level{
      background: #00aeff;
    }
    .vjs-matrix .vjs-play-progress,
    .vjs-matrix .vjs-slider-bar {
      background: cyan;
    }
  }
`