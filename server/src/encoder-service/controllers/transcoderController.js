const ffmpeg = require('fluent-ffmpeg');
const amqp = require('amqplib');
const path = require('path');
const fs = require('fs');


// @desc : creates connection to rabbitmq
async function connectToRabbitMq() {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  return { connection, channel };
}


// @desc : checks if the queue has msgs
async function isMsgInQueue(queuename) {
  const { connection, channel } = await connectToRabbitMq();
  await channel.assertQueue(queuename);  // assert queue to make sure it exits
  const queueStatus =  await channel.checkQueue(queuename);

  // close connection
  await channel.close();
  await connection.close();

  // return true if queueStatus.messageCount > 0
  return queueStatus.messageCount > 0;
}


// @desc : does video transcoding from the queue
async function processVideos(videoPath) {
  const outputDir = path.join(__dirname, '..', 'public', 'hls');
  const uniqueVal = `${Date.now()}`;
  const masterMenifestFileName = `${uniqueVal}.m3u8`;
  const bitrates = ['800k', '1200k', '2400k'];

  // process in different bitrates
  const ffmpegPromises = bitrates.map( async (bitrate) => {
    const outputFileName = `${bitrate}-${uniqueVal}.m3u8`;
    ffmpeg(videoPath)
      .outputOptions([
        '-profile:v baseline', // H.264 profile for wider devide suppoet
        '-level 3.0',  // H.264 level 
        '-start_number 0', // Segment start number
        '-hls_time 10',  // segnebt duration
        '-hls_list_size 0', // number of segments to keep in playlist (0 means all)
        '-f hls', // output format HLS
      ])
      .output(`${outputDir}/${outputFileName}`)
      .videoBitrate(bitrate)
      .audioCodec('aac')
      .audioBitrate('128k')
      .run();
  });
  
  // wait till all ffmpeg promises are complete
  await Promise.all(ffmpegPromises);
  
  // generate the content of master menifest file
  const masterManifestContent = bitrates.map((bitrate) => {
    const playlistFileName = `${bitrate}-${uniqueVal}.m3u8`;
    const serverUrl = 'http://localhost:3002/public/hls'
    return `#EXT-X-STREAM-INF:BANDWIDTH=${bitrate},RESOLUTION=720X480\n${playlistFileName}`;
  }).join('\n');

  // write the generated content to master manifest file
  fs.writeFileSync(`${outputDir}/${masterMenifestFileName}`,`#EXTM3U
    ${masterManifestContent}`);
  console.log("\n \t Video Transcoding Complete");
  console.log(fs.existsSync(`${outputDir}/${masterMenifestFileName}`));
  console.log(`${outputDir}/${masterMenifestFileName}`);
  
}


// @desc : consumer for the queue
async function startConsumer() {

  const queue = process.env.VIDEO_QUEUE;
  const { channel } =  await connectToRabbitMq();
  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    const content = JSON.parse(msg.content.toString());
    await processVideos(content.videoPath);
    channel.ack(msg);
  });
}

startConsumer();
// Check in a interval if there is msg in queue
//setInterval(() => {

  //if ( isMsgInQueue(process.env.VIDEO_QUEUE) ) {
    //console.log('theres msg in queue');
  //}
  //else {
    //console.log('theres no msg in queue');
  //}

//}, 1000);

module.exports.stream = (req, res) => {
  const manifestFileName = req.params.manifest;
  const manifestPath = path.join(__dirname, '..', 'public', 'hls', manifestFileName);

  if ( !fs.existsSync(manifestPath) ) return res.status(404).json({status: false, msg: 'No Such File Exists'});
  
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  fs.createReadStream(manifestPath).pipe(res);
}
