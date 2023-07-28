<h1 align = "center"> 

![qute-tube-logo-ghb-removebg-preview](https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/6e80619d-998c-42e6-aa76-089bc75ec9a1)

</h1>


---

<div align="center">
    
![Blue Modern Benefits of Running Youtube Thumbnail](https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/8ca90bc6-c4b3-4d53-8f49-fc0b028c34c2)

[🔴 watch demo on youtube](https://youtu.be/4zdD7xFHhM0)

</div>

---
## 🛠️ Tech Stack / packages used
- client: React, Typescript, hls.js, video.js, styled-components.
- backend: nodejs, express, multer, mongoose, fluent-ffmpeg, cors, dotenv, jwt

## 💻 Machine Requirements
- nodjs 19+
- docker
- ffmpeg
- mongodb

## 📌 Set up project
- clone the repo and go into it
```bash
git clone https://github.com/amitanshusahu/YouTube-fullstack & cd YouTube-fullstack
```
- run rabbitmq docker image and make sure it is accessible on port 5672
```bash
docker run -p 5672:5672 rabbitmq
```
- run services in different terminal instances
```bash
# auth service
cd server/src/auth-service & npm start

# server
cd server/src/server & npm start

# upload service
cd server/src/upload-service & npm start

# encoder-service
cd server/src/encoder-service & npm start

```
- run the client
```bash
cd client & npm run dev
```

## 📌 Explanation of the core feature (video upload/transcode)
<div align = "center"> 
    
![Page 1(1)](https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/49185393-df05-4f26-bbae-443789ce0a6e)

[🔴 watch this system design video](https://www.youtube.com/watch?v=l3AOubKFB1U)

</div>

#### Adaptive bitrate streaming HLS VOD service
- we send the payload (video, tags, title..etc) '/upload' with a `POST` request, the **upload service** stores the original video ( disk in the case, could be any object storage which gives the url to the video)
- the **upload service** then sends the video url along with title, tags..etc to a **Queue** (RabbitMq in this case)
- the encoder service consumes the messages from the queue and transcodes the video into different bitrates and generates a master m3u8 playlist for `Adaptive bitrate streaming` ( ffmpeg does the encoding part )
- a m3u8 playlist is generated for each bitrate, an m3u8 file is simply an index of all the video chunks url and the master m3u8 file has the absolute urls of m3u8's of different bitrates.
- then the uls to these m3u8 files and the video metadata is stored in the database (mongodb)
- the client can request the master m3u8 file or a m3u8 of desired bitrate by explicitly selecting from Auto, 144p, 360p etc..

> NOTE: hls is native in safari but not firefox and chrome, you will need hls.js to use the m3u8 files
> 
<div align = "center"> 
    
<img width="400" alt="manifest" src="https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/485a563d-a527-41e4-a312-96837bc75208">

</div>

## 📓 References
- Articles
    - [How HLS URLs work with adaptive streaming short overview](https://www.linkedin.com/pulse/how-hls-urls-work-adaptive-streaming-ios-abhinav-jha/)
    - [Hls vod service in node js](https://medium.com/sharma02gaurav/adaptive-bitrate-streaming-hls-vod-service-in-nodejs-8df0d91d2eb4)
    - [ffmpeg docs](https://www.ffmpeg.org/)
- videos
    - [youtube system design](https://www.youtube.com/watch?v=l3AOubKFB1U)
    - [All about Digital Video - format , codecs & containers](https://youtu.be/-4NXxY4maYc)
    - [ffmpeg in 100sec](https://youtu.be/26Mayv5JPz0)
- Othes
    - [Hls player to test your backend](https://hlsjs.video-dev.org/demo/)
    - [Hls demo source code](https://github.com/amitanshusahu/HLS-demo)

---

<h1 align="center"> Star the Repo ⭐ </h1>
