import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import kawaii from '../../assets/kawaii.png';
import { useEffect, useState } from 'react';
import Api from '../../api/Fetch';
import { createchannel } from '../../api/api';
import { USERNAME, loadSecrets } from '../../secret';

export default function UserProfile() {

  const params = useParams();
  const username: any = params.username;
  const [bio, setBio] = useState();
  const [userImg, setUserImg] = useState(kawaii);
  const [bannerImg, setBannerImg] = useState("https://static.vecteezy.com/system/resources/thumbnails/021/689/530/small/banner-background-colorful-fresh-blue-gradient-geometric-waves-eps-10-vector.jpg");
  const navigate = useNavigate();


  useEffect(() => {
    loadSecrets();
    if (USERNAME) {
      navigate('../home')
    }
  }, []);

  const getCompressedImage = async (imgString : string) : Promise<string> => {

    // if greated than 200kb compress
    if (imgString.length > 200000) {
      const canvas = document.createElement('canvas');
      const ctx : any = canvas.getContext('2d');

      // set the canvas dimensions compressed image size
      const maxWidth = 400;
      const maxHeight = 400;

      const image = new Image();
      image.src = imgString;

      // wait for the image to load
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // calculate the new dimensions based on the maximum size while maintaining the aspect ratio
      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = newHeight * ratio;
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight;
        newHeight = maxHeight;
        newWidth = newWidth * ratio;
      }

      // set the canvas dimensions to the new dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw the image onto the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      // get the compressed image as a base64-encoded data URL
      // quality range => 1 >= quality >= 0  
      const compressedImage = canvas.toDataURL('image/jpg', 1);

      return compressedImage;
    }

    return imgString;
  }

  const handelImage = (setImg: Function): void => {
    //create a file input dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpg';

    // define a onchange to read and show the file
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImg(reader.result);
        }
      }
    };

    // sumulate a click event
    fileInput.click();
  }

  const handelSubmit = async (): Promise<void> => {
    const dp: string = await getCompressedImage(userImg);
    const banner: string = await getCompressedImage(bannerImg);
    const payload = {
      username,
      dp,
      banner,
      bio,
    }

    const api = new Api(payload, createchannel);
    const res = await api.postAuthjson();
    if (res.status){
      navigate('../home');
      localStorage.setItem('USERNAME', username);
    }
    else alert(res.msg);
  }

  const handelInput = (e : any): void => {
    setBio(e.target.value);
  }

  return (
    <StyledDiv>
      <div className="wrapper">

        <div className="header">
          <div className="banner-wrapper" onClick={() => handelImage(setBannerImg)}>
            <img src={bannerImg}/>
          </div>
          <div className="dp-wrapper" onClick={() => handelImage(setUserImg)}>
            <img src={userImg} />
          </div>
        </div>

        <h2>@{username}</h2>

        <div className="bio-wrapper">
          <textarea placeholder="Write something about you..." id="bio-box" onChange={handelInput}></textarea>
        </div>

        <button onClick={handelSubmit}>Done</button>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
    width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding-bottom: 60px;
    overflow: hidden;
    height: fit-content;

    .header{
      display: flex;
      align-items: center;
      flex-direction: column;

      .banner-wrapper{
        width: 500px;
        height: 130px;

        &:hover{
          outline: 1px solid cyan;
        }

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }

      .dp-wrapper{
        width: 100px;
        height: 100px;
        overflow: hidden;
        border: 2px solid white;
        border-radius: 999px;
        margin-top: -50px;
        cursor: pointer;
        transition: all 0.2s;
        outline: 1px solid white;

        &:hover{
          opacity: 0.8;
          outline: 1px solid cyan;
        }

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }
    }

    textarea{
      min-width: 300px;
      min-height: 100px;
    }

    button {
      width: 330px;
    }
  }
`