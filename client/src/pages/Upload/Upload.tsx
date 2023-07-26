import styled from 'styled-components'
import uploadIllu from '../../assets/upload.jpg';
import { useEffect, useState } from 'react';
import { TOKEN, USERNAME, loadSecrets } from '../../secret';
import Api from '../../api/Fetch';
import { upload } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Upload() {

  const [thumbnail, setThumbnail] = useState(uploadIllu);
  const [video, setVideo] = useState<any>();
  const [input, setInput] = useState<{title: string, description: string, tags: string}>({
    title: "",
    description: "",
    tags: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadSecrets();
    if (!TOKEN) {
      navigate('../');
    }
  }, []);

  const getCompressedImage = async (imgString : string) : Promise<string> => {

    // if greated than 1mb compress
    if (imgString.length > 1000000) {
      const canvas = document.createElement('canvas');
      const ctx : any = canvas.getContext('2d');

      // set the canvas dimensions compressed image size
      const maxWidth = 600;
      const maxHeight = 600;

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

  const handelInputChange = (e: any) => {
    setInput({...input, [e.target.name] : e.target.value});
  }

  const handelVideoChange = (e : any) => {
    setVideo(e.target.files[0]);
  }

  const handelSubmit = async () => {
    const { title, description, tags } = input;
    const thumb = await getCompressedImage(thumbnail);
    loadSecrets();
    const formData: FormData = new FormData;
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('username', USERNAME);
    formData.append('thumbnail', thumb);

    const postData = new Api(formData, upload);
    const res = await postData.postAuthFormData();
    if (res.status) {
      alert("Video Has Been Uploaded, We will notify when its ready");
      navigate('../home');
    }
    else alert(res.msg);

  }

  return (
    <StyledDiv>
      <div className="upload-box">

        <div className="upload-wrapper">
          <div className="img-wrapper" onClick={() => handelImage(setThumbnail)}><img src={thumbnail} /></div>
          <input type="file" name="video" accept='video/mp4' onChange={handelVideoChange}/>
        </div>

        <input type="text" name='title' placeholder='Title..' onChange={handelInputChange}/>
        <textarea placeholder='Description...' name='description' onChange={handelInputChange}></textarea>
        <input type="text" placeholder='Tags separated with commas...' name='tags' onChange={handelInputChange}/>
        <button onClick={handelSubmit}> Upload Video </button>

      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  

  .upload-box{
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    .upload-wrapper{
      input[type="file"]{
        all:unset;
        margin-top: 10px;

        color: green;
      }

      .img-wrapper{
        width: 400px;
        height: 250px;
        overflow: hidden;
        border-radius: 10px;
        cursor: pointer;

        img{
          width: inherit;
          height: inherit;
          object-fit: cover;
        }
      }

      p{
        font-size: 11px;
        color: green;
        margin-top: 5px;
      }
    }

    input,textarea{
      border-color: lightgrey;
      font-size: 14px;

      &:focus{
      border-color: grey;
      }
    }
  }
`