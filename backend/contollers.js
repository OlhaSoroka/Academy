const { app, db } = require("./firebase/init");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async registerUser(req, res, next) {
    let mandatoryUserSchemaKeys = ["fullName", "email", "password", "role"],
      user = {
        id: uuidv4(),
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        avatarUrl: {
          path: "https://res.cloudinary.com/bshumakov/image/upload/v1659351830/inventorsoft-vue-2022-users-avatars/default-avatar.png",
          filename: "inventorsoft-vue-2022-users-avatars/default-avatar",
        },
      };
    if (req.body.role === "user") {
      mandatoryUserSchemaKeys.push("course", "initialScore");
      Object.assign(user, {
        course: req.body.course,
        initialScore: req.body.initialScore,
      });
    }
    try {
      if (
        mandatoryUserSchemaKeys.every((key) =>
          Object.keys(req.body).includes(key)
        )
      ) {
        const userResponse = await app.createUser({
          email: req.body.email,
          password: req.body.password,
          emailVerified: false,
          disabled: false,
        });
        await db.collection("users").doc(user.id).set(user);
        res.json(userResponse);
      } else {
        res.status(400).send("Mandatory key missed!");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async updateUser(req, res, next) {
    let updatedUser = {};
    Object.keys(req.body).forEach((key) => {
      if (key !== "password") updatedUser[key] = req.body[key];
    });
    if (req.file) {
      const { path, filename } = req.file;
      updatedUser.avatarUrl = {
        path,
        filename,
      };
    }
    try {
      if (req.body.email || req.body.password) {
        const userRef = db.collection("users").doc(req.params.id),
          userData = await userRef.get(),
          userEmail = userData.data().email,
          userRecord = await app.getUserByEmail(userEmail);
        let updatedUserData = { email: userEmail };
        if (req.body.email) updatedUserData.email = req.body.email;
        if (req.body.password) updatedUserData.password = req.body.password;
        await app.updateUser(userRecord.uid, updatedUserData);
      }
      if (Object.keys(updatedUser).length)
        await db.collection("users").doc(req.params.id).update(updatedUser);
      res.status(200).send("User update - success!");
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async deleteUser(req, res, next) {
    try {
      const userRef = db.collection("users").doc(req.params.id);
      const userData = await userRef.get();
      const userRecord = await app.getUserByEmail(userData.data().email);
      await app.deleteUser(userRecord.uid);
      await db.collection("users").doc(req.params.id).delete();
      res.status(200).send("User delete - success!");
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async getAllUsers(req, res, next) {
    try {
      const usersRef = db.collection("users");
      const response = await usersRef.get();
      let responseArr = [];
      response.forEach((doc) => {
        responseArr.push(doc.data());
      });
      res.status(200).send(responseArr);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async getUser(req, res, next) {
    try {
      const userRef = db.collection("users").doc(req.params.id);
      const response = await userRef.get();
      res.status(200).send(response.data());
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
