import styled from 'styled-components'

interface Props {
  thumbnail: string,
  dp: string,
  title: string,
  channel: string
}

export default function VideoPost({thumbnail, dp, title, channel} : Props) {
  return (
    <StyledDiv>
      <div className="img-wrapper">
        <img src={thumbnail} />
      </div>
      <div className="info">
        <div className="dp-wrapper">
          <img src={dp} />
        </div>
        <div className="body">
          <h4>{title}</h4>
          <p id='channelName'>{channel}</p>
        </div>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: white;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.02);
  

  .info{
    display: flex;
    gap: 15px;
    margin: 15px;
    align-items: center;

    .body{
      h4{
        width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .img-wrapper{
  width: 400px;
  height: 230px;
  overflow: hidden;

  img{
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
}

.dp-wrapper{
  width: 40px;
  height: 40px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid black;

  img{
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
}

#channelName{
  color: grey;
}
`