const amqp = require('amqplib');

module.exports.upload = async (req, res) => {
    try{

        const { username, videoStream, title, description, tags } = req.body;

        // Publish message to queue
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertQueue('videoQueue');
        channel.sendToQueue('videoQueue', Buffer.from(JSON.stringify({
            username, videoStream, title, description, tags
        })));
        console.log("payload publised to videoQueue");
        res.status(200).json({status: true});
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({status: false, msg: "problem uploading video"});
    }
}
