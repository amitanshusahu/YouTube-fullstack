import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Api from '../../api/Fetch';
import { getvideo} from '../../api/api';
import 'video.js/dist/video-js.css';
import HlsPlayer from './components/HlsPlayer';

export default function VideoPlayer() {

  const param = useParams();
  const { vid } = param;
  const [ videoMetadata , setVideoMetadata] = useState<any>();

  useEffect(() => {
    async function getManifest() {
      const api = new Api({ vid }, getvideo);
      const res = await api.postJson();
      if ( res.status ) {
        setVideoMetadata(res.metadata);
      }
      else console.log(res);
    }

    getManifest();
  }, []);

  

  return (
    <StyledDiv>
      <div className="wrapper">

        {videoMetadata ? <HlsPlayer videoMetadata = {videoMetadata} vid={vid}/> : " loading ..."}

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

  }
`