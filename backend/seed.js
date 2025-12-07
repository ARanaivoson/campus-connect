const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Notification = require("./models/Notification");
const Discussion = require("./models/Discussion");
const Message = require("./models/Message");

dotenv.config();

const DB_connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");
  } catch (err) {
    console.error("Erreur de connexion: ", err);
    process.exit(1);
  }
};

const seedData = async () => {
  await DB_connection();

  // Suppression des anciennes données
  await User.deleteMany();
  await Notification.deleteMany();
  await Discussion.deleteMany();
  await Message.deleteMany();

  // Création des utilisateurs
  const users = [
    {
      name: "Andréa",
      email: "ranaivoson.i@zurcher.edu.mg",
      userID: "30197",
      password: await bcrypt.hash("123456", 8),
    },
    {
      name: "Smith",
      email: "smith.teacher@zurcher.edu.mg",
      password: await bcrypt.hash("prof123", 8),
    },
    {
      name: "Recteur",
      email: "daniel.k.admin@zurcher.edu.mg",
      password: await bcrypt.hash("admin123", 8),
    },
  ];
  await User.insertMany(users);
  console.log("Utilisateurs enregistrés avec succès !");

  // Récupérer 2 utilisateurs pour notifications et discussions
  const savedUsers = await User.find().limit(2);
  if (savedUsers.length < 2) {
    console.error("Pas assez d'utilisateurs dans la base pour seed Discussions et Notifications");
    process.exit(1);
  }

  // Création des notifications
  const notifications = [
    {
      userId: savedUsers[0]._id,
      content: "Bienvenue sur Campus Connect!",
      isRead: false,
    },
    {
      userId: savedUsers[1]._id,
      content: "Tu as un nouveau message.",
      isRead: false,
    },
  ];
  await Notification.insertMany(notifications);
  console.log("Notifications insérées avec succès !");

  // Création de messages avec champ 'receiver' ajouté
  const message1 = new Message({
    sender: savedUsers[0]._id,
    receiver: savedUsers[1]._id,  // <-- ici
    content: "Salut Smith, comment ça va ?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await message1.save();

  const message2 = new Message({
    sender: savedUsers[1]._id,
    receiver: savedUsers[0]._id,  // <-- ici
    content: "Salut Andréa, ça va bien merci !",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await message2.save();

  // Création d'une discussion avec ces messages
  const discussion = new Discussion({
    participants: [savedUsers[0]._id, savedUsers[1]._id],
    messages: [message1._id, message2._id],
    updatedAt: new Date(),
    type: 'direct', 

  });
  await discussion.save();
  console.log("Discussion insérée avec succès !");

  process.exit();
};

seedData();
