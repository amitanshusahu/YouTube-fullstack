const amqp = require('amqplib');
const multer = require('multer');
const path = require('path');



// Multer Disk Storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({storage: storage});




module.exports.upload = (req, res) => {
  try{
    upload.single('video')(req, res, async (er) => {
      if(er) return res.status(400).json({status: false, msg:'Error uploding file'});

      const { username, title, description, tags, thumbnail } = req.body;
      const { file } = req;
      const videoPath = path.join(__dirname, '..', file.path);

      // Publish message to queue
      const connection = await amqp.connect('amqp://localhost:5672');
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.VIDEO_QUEUE);
      channel.sendToQueue(process.env.VIDEO_QUEUE, Buffer.from(JSON.stringify({
        username, videoPath, title, description, tags, thumbnail
      })));
      console.log("payload publised to videoQueue");
      res.status(200).json({status: true});

    });
  }
  catch (ex) {
    console.log(ex);
    res.status(500).json({status: false, msg: "problem uploading video"});
  }
}
