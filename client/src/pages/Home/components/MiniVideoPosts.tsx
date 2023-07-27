import styled from 'styled-components'
import { Link } from 'react-router-dom';

interface Props {
  thumbnail: string,
  title: string,
  id: string
}

export default function MiniVideoPost({thumbnail, title, id} : Props) {
  return (
    <StyledDiv>
      <Link to={`../video/${id}`} className="img-wrapper">
        <img src={thumbnail} />
      </Link>
      <div className="info">
          <h4><Link to={`../video/${id}`}>{title}</Link></h4>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: white;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.02);
  animation: pop 0.3s ease;
  transition: scale 0.3s ease;

  &:hover{
    scale: 1.03;
  }

  a{
    color: inherit;
  }

  .info{
    h4{
        margin: 10px;
        width: 270px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
  }

  .img-wrapper{
  width: 300px;
  height: 160px;
  overflow: hidden;

  img{
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
}

`