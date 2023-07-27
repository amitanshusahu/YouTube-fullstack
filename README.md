<h1 align = "center"> 

![qute-tube-logo-ghb-removebg-preview](https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/6e80619d-998c-42e6-aa76-089bc75ec9a1)

</h1>


---

<div align="center">
    
![Blue Modern Benefits of Running Youtube Thumbnail](https://github.com/amitanshusahu/YouTube-fullstack/assets/83657737/8ca90bc6-c4b3-4d53-8f49-fc0b028c34c2)

  [🔴 watch demo on youtube](https://youtu.be/4zdD7xFHhM0)

</div>

---
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
cd server/src/upload-service

```


## 📓 References
  - video
    - [All about Digital Video - format , codecs & containers](https://youtu.be/-4NXxY4maYc)
    - [ffmpeg in 100sec](https://youtu.be/26Mayv5JPz0)

---

<h1 align="center"> Star the Repo ⭐ </h1>
