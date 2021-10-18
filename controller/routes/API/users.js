
const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let users = require("../../../model/users");

 

router.get("/", (req, res) => {

  res.json(users);

});

router.get("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));

 

  if (found) {

    res.json(users.filter(user => user.id === parseInt(req.params.id)));

  } else {

    res.sendStatus(400);

  }

});

 
router.post("/", (req, res) => {

  const newUser = {

    id: uuid.v4(),

    name: req.body.name,

    email: req.body.email

  };

 

  if (!newUser.name || !newUser.email) {

    return res.sendStatus(400);

  }

 

  users.push(newUser);

  res.json(users);

});

 

//Update User

router.put("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));

 

  if (found) {

    const updateUser = req.body;

    users.forEach(user => {

      if (user.id === parseInt(req.params.id)) {

        user.name = updateUser.name ? updateUser.name : user.name;

        user.email = updateUser.email ? updateUser.email : user.email;

        res.json({ msg: "User updated", user });

      }

    });

  } else {

    res.sendStatus(400);

  }

});

 // Image Upload
const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
});

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
});


//Delete User

router.delete("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));

 

  if (found) {

    users = users.filter(user => user.id !== parseInt(req.params.id))

    res.json({

      msg: "User deleted",

      users

    });

  } else {

    res.sendStatus(400);

  }

});

 

module.exports = router;