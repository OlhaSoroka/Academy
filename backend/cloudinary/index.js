const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "bshumakov",
  api_key: "496368255258869",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "inventorsoft-vue-2022-users-avatars",
    format: "png",
    public_id: (req, file) => `${req.params.id}`,
  },
});

module.exports = { storage };
