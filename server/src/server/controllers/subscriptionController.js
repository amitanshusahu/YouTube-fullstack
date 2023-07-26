const subscriberModel = require('../models/SubscriberModel');
const subscribedModel = require('../models/SubscribedModel');

module.exports.createCollections = async (req, res) => {
  const { username } = req.user;

  {
    // create subscribers collection
    let isSubscriberModel = await subscriberModel.findOne({ username });
    if (!isSubscriberModel) {
      const isCreated = await subscriberModel.create({ username, subscribers: [] });
      if (!isCreated) res.status(500).json({ status: false, msg: "Error createing collections" });
    }
  }

  let isSubscribedModel = await subscribedModel.findOne({ username });
  if (!isSubscribedModel) {
    const isCreated = await subscribedModel.create({ username, subscribed: [] });
    isCreated
      ? res.status(200).json({ status: true })
      : res.status(500).json({ status: false, msg: "Error createing collections" });
  }
  else res.status(500).json({ status: false, msg: "Username Already Exists" });
}

module.exports.getSubscribed = async (req, res) => {
  const subscribed = await subscribedModel.findOne({ username: req.user.username });
  subscribed
    ? res.status(200).json({ status: true, subscribed })
    : res.status(500).json({ status: false, msg: 'Error getting subscribed channels' });
}

module.exports.subscribe = async (req, res) => {
  const { subscribe } = req.body;

  let subscribed = await subscribedModel.findOne({username: req.user.username});
  subscribed = subscribed.subscribed;

  let unique = true;
  for (let i = 0; i < subscribed.length; i++) {
    if (subscribed[i] == subscribe) {
      unique = false;
      break;
    }
  }

  {
    // Updated the subscriber list of one getting subscribed
    let subscribers = await subscriberModel.findOne({username:subscribe});
    if (unique) {
      subscribers = subscribers.subscribers;
      subscribers.push(req.user.username);
      await subscriberModel.findOneAndUpdate({username: subscribe}, {subscribers});
    }
  }

  if (unique) {
    subscribed.push(subscribe);
    const isUpdated = await subscribedModel.findOneAndUpdate({username: req.user.username}, {subscribed});
    isUpdated
    ? res.status(200).json({status: true})
    : res.status(500).json({status: false, msg: 'Failed to update subscribed list'});
  }
  else res.status(400).json({status: false, msg: `You have already subscribed ${subscribe}`});
}


module.exports.unsubscribe = async (req, res) => {
  const { unsubscribe } = req.body;
  let subscribed = await subscribedModel.findOne({ username: req.user.username });
  subscribed = subscribed.subscribed;

  for (let i = 0; i < subscribed.length; i++) {
    if (subscribed[i] == unsubscribe) {
      yo = subscribed.splice(i, 1);
    }
  }

  let updatedsubscribeds = await subscribedModel.findOneAndUpdate({ username: req.user.username }, { subscribed })

  let subscribedListOfUnsubscribe = await subscriberModel.findOne({ username: unsubscribe });
  subscribedListOfUnsubscribe = subscribedListOfUnsubscribe.subscribers;
  if (subscribedListOfUnsubscribe) {
    const index = subscribedListOfUnsubscribe.indexOf(req.user.username);
    if (index > -1) {
      subscribedListOfUnsubscribe.splice(index, 1);
    }

    await subscriberModel.findOneAndUpdate({ username: unsubscribe }, { subscribers: subscribedListOfUnsubscribe });
  }

  // get req.user contacts
  subscribed = await subscribedModel.findOne({ username: req.user.username });
  if (updatedsubscribeds) res.status(200).json({ status: true});
  else res.status(500).json({ status: false, msg: "faied to updateContact" });
}

module.exports.isSubscribed = async (req, res) => {
  const { username } = req.body;

  let subscribed = await subscribedModel.findOne({username: req.user.username});
  subscribed = subscribed.subscribed;
  let isSubscribed = false;

  for (let i = 0; i < subscribed.length; i++){
    if (subscribed[i] == username){
      isSubscribed = true;
    }
  }

  if (isSubscribed) res.status(200).json({ status: true });
  else res.status(200).json({ status: false });

}