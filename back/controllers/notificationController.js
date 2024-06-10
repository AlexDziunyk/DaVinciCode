const Notification = require('../models/notification');
const User = require('../models/user');

const getAllNotifications = async (req, res) => {
  const { login } = req.login;

  try {
    const user = await User.findOne({ login: login });

    return res.status(200).json({ result: user.notifications, message: "Notifications were found!" });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message, message: "No Notifications for such user!" });
  }
}

const addNotificationToUser = async (req, res) => {
  const { login } = req.login;
  const { title, text } = req.body;

  try {
    const user = await User.findOneAndUpdate({ login: login },
      { $addToSet: { notifications: { title, text } } },
      { new: true }
    );

    return res.status(201).json({ result: user.notifications, message: "Notification was successfully added" });

  } catch (error) {
    return res.status(500).json({ message: "Something bad happened!" });
  }

}

module.exports = { getAllNotifications, addNotificationToUser };