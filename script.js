const express = require("express");
const mongoose = require("mongoose");
const url = require("url");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const crypto = require("crypto");

var bodyParser = require("body-parser");
const { verify } = require("crypto");

const app = express();

dotenv.config();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname + "/ui")));
app.use("/UserData", express.static(path.join(__dirname + "/UserData")));

app.use(cookieParser());

const dblink = `mongodb+srv://Ayush:B6pQIEJnN78zl74Z@cluster0.sbck0.mongodb.net/Users?retryWrites=true&w=majority`;

mongoose
  .connect(dblink)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log("Server is running.");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database");
  });

const userSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 8,
  },
  UserImage: {
    type: String,
    required: true,
  },
});

const citySchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  LastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  OwnerImage: {
    type: String,
    required: true,
    minLength: 1,
  },
  HomeType: {
    type: String,
    required: true,
  },
  NumberOfBedrooms: {
    type: Number,
    required: true,
  },
  NumberOfBathrooms: {
    type: Number,
    required: true,
  },
  AreaSqft: {
    type: Number,
    required: true,
  },
  RentalInfo: {
    type: String,
    required: true,
  },
  RentPrice: {
    type: Number,
    required: true,
  },
  CityName: {
    type: String,
    required: true,
    minLength: 1,
  },
  Landmark: {
    type: String,
    required: true,
    minLength: 1,
  },
  StreetName: {
    type: String,
    required: true,
    minLength: 1,
  },
  HouseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  Pincode: {
    type: Number,
    required: true,
  },
  Longitude: {
    type: String,
    required: true,
  },
  Latitude: {
    type: String,
    required: true,
  },
  Tenant: {
    type: String,
  },
  Status: {
    type: Boolean,
    required: true,
  },
  Image: [
    {
      type: String,
      required: true,
    },
  ],
});

const requestSchema = mongoose.Schema({
  Listing: {
    type: String,
    required: true,
  },
  ListingId: {
    type: mongoose.ObjectId,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Owner: {
    type: String,
    required: true,
  },
  OwnerFirstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  OwnerLastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  OwnerImage: {
    type: String,
    required: true,
    minLength: 1,
  },
  Tenant: {
    type: String,
    required: true,
  },
  TenantFirstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  TenantLastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  TenantImage: {
    type: String,
    required: true,
    minLength: 1,
  },

  Status: {
    type: String,
    required: true,
  },
});

const citydata = mongoose.model("citydata", citySchema, "citydata");

const userdata = mongoose.model("userdata", userSchema, "userdata");

const requestdata = mongoose.model("requestdata", requestSchema, "requestdata");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/ui/html/index.html"));
});
app.use(express.json());
app.post("/requestadd", function (req, res) {
  //console.log(req.body);
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  requestdata.findOneAndUpdate(
    req.body,
    req.body,
    options,
    function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      //console.log(info);
      return res.json({ status: "successfull" });
    }
  );
});

app.get("/rejectreq/:id", (req, res) => {
  requestdata.findOneAndUpdate(
    { _id: req.params.id },
    { Status: "Rejected" },
    {},
    function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "failure" });
      }
      return res.json({ status: "successfull" });
    }
  );
});

app.get("/acceptreq/:id", (req, res) => {
  requestdata.findOneAndUpdate(
    { _id: req.params.id },
    { Status: "Accepted" },
    {},
    function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "failure" });
      }
      citydata.findOneAndUpdate(
        { _id: info.ListingId },
        { Status: true, Tenant: info.Tenant },
        {},
        function (err, info) {
          if (err) {
            console.log(err);
            return res.status(500).json({ status: "failure" });
          }
          return res.json({ status: "successfull" });
        }
      );
    }
  );
});

app.get("/signinpage", function (req, res) {
  if (validatetoken(req.cookies.userdata)) {
    res.sendFile(path.join(__dirname, "/ui/html/dashboard.html"));
  } else {
    res.sendFile(path.join(__dirname, "/ui/html/signup.html"));
  }
});

app.post("/signin", urlencodedParser, function (req, res) {
  const info = req.body;
  let email = info.email;
  let password = info.password;
  if (checkdata(info)) {
    userdata.findOne({ Email: email }, (err, values) => {
      if (err) {
        console.log("An error occured while signing in.");
        res.send("An error occured while signing in.");
        return;
      }
      if (values == null) {
        console.log("User not found.");
        res.send("User not found.");
        return;
      }
      let flag = bcrypt.compareSync(password, values.Password);
      if (flag) {
        console.log("Passwrod valid");
      } else {
        return res.send("Password not valid.");
      }

      let userval = {
        email: values.Email,
        image: values.UserImage,
        firstname: values.FirstName,
        lastname: values.LastName,
      };

      const token = jwt.sign(userval, process.env.SECRET_KEY);

      res.cookie("userdata", token, {
        httpOnly: false,
        expiresin: new Date(Date.now() + 1000 * 60 * 10),
      });
      res.cookie("city", "new delhi", {
        httpOnly: false,
        expiresin: new Date(Date.now() + 1000 * 60 * 10),
      });
      res.sendFile(path.join(__dirname, "/ui/html/index.html"));
    });
  } else {
    res.send("Credentials not valid");
  }
});

app.get("/userinfo", function (req, res) {
  if (req.cookies.userdata) {
    const data = jwt.verify(req.cookies.userdata, process.env.SECRET_KEY);
    res.json(data);
  } else {
    res.json({ status: "no token was found" });
  }
});

app.get("/signout", function (req, res) {
  if (validatetoken(req.cookies.userdata)) {
    res.clearCookie("userdata");
    console.log("cookie cleared");
  }
  res.sendFile(path.join(__dirname, "/ui/html/index.html"));
});

app.post("/signupcheck", urlencodedParser, function (req, res) {
  const info = req.body;
  console.log(info);
  if (checkdata(info)) {
    if (!info.email || !info.firstname || !info.lastname || !info.password) {
      return res.status(400).json({ status: "All fields were not present" });
    }
    let user = {
      Email: info.email,
      FirstName: info.firstname,
      LastName: info.lastname,
      Password: bcrypt.hashSync(info.password, 10),
      UserImage: "/media/User_Profile_images/default.png",
    };
    userdata.create(user, (err, dbinfo) => {
      if (err) {
        console.log(err);
        console.log("Error creating new user.");
        res.send("Error creating new user.");
        return;
      }
      console.log("New USER created.");
      console.log(dbinfo);
      fs.mkdirSync(path.join(__dirname + `/UserData/${dbinfo.Email}`), {
        recursive: true,
      });
      res.sendFile(path.join(__dirname, "/ui/html/signup.html"));
      return;
    });
  } else {
    console.log("Data not valid");
    res.send("Data not valid");
    return;
  }
});

app.get("/main", function (req, res) {
  let flag = validatetoken(req.cookies.userdata);
  if (flag) {
    res.sendFile(path.join(__dirname, "/ui/html/main.html"));
  } else {
    res.sendFile(path.join(__dirname, "/ui/html/signup.html"));
  }
});

app.get("/searchcity/:city", async (req, res) => {
  const status = await citydata.exists({ CityName: req.params.city });
  if (status) {
    res.cookie("city", req.params.city, {
      httpOnly: false,
    });
    return res.json({ status: "City found" });
  }
  return res.json({ status: "No Listings in this city" });
});

app.get("/citiesdata/", function (req, res) {
  citydata.find(
    { CityName: req.cookies.city, Status: false },
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      if (result.length == 0) {
        console.log("Empty DataBase");
        return res.json(result);
      }
      typeof result;
      res.json(result);
      res.end();
    }
  );
});

app.post("/filters", function (req, res) {
  const filters = req.body;
  let query = {};
  for (const key in filters) {
    if (filters[key] != "default" && filters[key] != 0) {
      if (key === "minPrice") {
        query.RentPrice = {};
        query.RentPrice.$gt = filters[key];
      }
      if (key === "maxPrice") {
        if (!query.RentPrice) {
          query.RentPrice = {};
        }
        query.RentPrice.$lt = filters[key];
      }
      if (key === "numberOfBedrooms") {
        query.NumberOfBedrooms = {};
        query.NumberOfBedrooms.$gt = filters[key];
      }
      if (key === "numberOfBathrooms") {
        query.NumberOfBathrooms = {};
        query.NumberOfBathrooms.$gt = filters[key];
      }
      if (key === "spaceType") {
        query.HomeType = filters[key];
      }
    }
  }
  query.CityName = req.cookies.city;

  citydata.find(query, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(data);
  });
});

app.get("/dashboard", function (req, res) {
  if (validatetoken(req.cookies.userdata)) {
    res.sendFile(path.join(__dirname, "/ui/html/dashboard.html"));
  } else {
    res.sendFile(path.join(__dirname, "/ui/html/signup.html"));
  }
});

app.get("/userdashboarddata", function (req, res) {
  let userobj = {};
  const data = jwt.verify(req.cookies.userdata, process.env.SECRET_KEY);
  //console.log(data);
  citydata.find({ Email: data.email }, function (err, info) {
    if (err) {
      console.log("Cant find user.");
      return;
    }
    userobj.owner = info;

    citydata.find({ Tenant: data.email }, function (err1, info1) {
      if (err1) {
        console.log(err1);
        return;
      }
      //console.log("userobj with tenant");
      //console.log(userobj);
      userobj.tenant = info1;

      requestdata.find({ Tenant: data.email }, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        userobj.requestsSent = info;
        requestdata.find(
          { Owner: data.email, Status: "Pending" },
          function (err, info) {
            if (err) {
              console.log(err);
              return;
            }
            userobj.requestsReceived = info;
            return res.json(userobj);
          }
        );
      });
    });
  });
});

app.get("/addinfo", function (req, res) {
  if (validatetoken(req.cookies.userdata)) {
    return res.sendFile(path.join(__dirname, "/ui/html/addinfo.html"));
  } else {
    return res.sendFile(path.join(__dirname, "/ui/html/signup.html"));
  }
});

app.post("/addinfovalidate", function (req, res) {
  const data = jwt.verify(req.cookies.userdata, process.env.SECRET_KEY);
  //console.log(data);
  var formdata = new formidable.IncomingForm();
  formdata.uploadDir = path.join(__dirname + `/UserData/temp`);
  var imgarr = [];
  let cityvalmap = new Map();
  let filearr = [];
  formdata
    .on("field", function (field, value) {
      cityvalmap.set(field, value);
    })
    .on("file", function (file, value) {
      filearr.push(value);
    })
    .on("end", function () {
      console.log("end run");
      if (
        !cityvalmap.get("rentaltype") ||
        !cityvalmap.get("numberofbeds") ||
        !cityvalmap.get("numberofbathrooms") ||
        !cityvalmap.get("area") ||
        !cityvalmap.get("info") ||
        !cityvalmap.get("price") ||
        !cityvalmap.get("CityName") ||
        !cityvalmap.get("landmark") ||
        !cityvalmap.get("streetname") ||
        !cityvalmap.get("houseno") ||
        !cityvalmap.get("pincode") ||
        !cityvalmap.get("latitude") ||
        !cityvalmap.get("longitude")
      ) {
        res.status(400).json({ status: "All fields were not present" });
        return;
      }
      //console.log(__dirname);
      let npath = path.join(__dirname + `/UserData/${data.email}`);
      for (let i of filearr) {
        let name = crypto.randomBytes(15).toString("hex") + i.originalFilename;
        fs.renameSync(
          i.filepath,
          path.join(npath + `/${name}`),
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
        let imgpath = `./UserData/${data.email}/${name}`;
        imgarr.push(imgpath);
      }
      console.log(`Images uploaded successfully`);

      console.log(imgarr);
      //console.log(cityvalmap);
      let cityobj = {
        Email: data.email,
        FirstName: data.firstname,
        LastName: data.lastname,
        OwnerImage: data.image,
        HomeType: cityvalmap.get("rentaltype"),
        NumberOfBedrooms: cityvalmap.get("numberofbeds"),
        NumberOfBathrooms: cityvalmap.get("numberofbathrooms"),
        AreaSqft: cityvalmap.get("area"),
        RentalInfo: cityvalmap.get("info"),
        RentPrice: cityvalmap.get("price"),
        CityName: cityvalmap.get("CityName"),
        Landmark: cityvalmap.get("landmark"),
        StreetName: cityvalmap.get("streetname"),
        HouseNumber: cityvalmap.get("houseno"),
        Pincode: cityvalmap.get("pincode"),
        Latitude: cityvalmap.get("latitude"),
        Longitude: cityvalmap.get("longitude"),
        Tenant: "",
        Status: false,
        Image: imgarr,
      };

      //console.log(cityobj);

      citydata.create(cityobj, (err, dbinfo) => {
        if (err) {
          console.log("Error in creating city data.");
          console.log(err);
          return;
        }
        console.log("City data created successfully");
        //console.log(dbinfo);

        res.sendFile(path.join(__dirname + "/ui/html/dashboard.html"));
      });
    });
  formdata.parse(req);
});

app.post("/profileEdit", function (req, res) {
  const userdatavalue = jwt.verify(
    req.cookies.userdata,
    process.env.SECRET_KEY
  );
  var formdata = new formidable.IncomingForm();
  let data = {};
  let imgpath;
  formdata
    .on("field", function (field, value) {
      data[field] = value;
    })
    .on("file", function (file, value) {
      imgpath = `./ui/media/User_Profile_images/${
        userdatavalue.email + value.originalFilename
      }`;
      if (fs.existsSync(imgpath)) {
        console.log("same image exists");
      } else {
        if (userdatavalue.image.split("/")[3].toString() == "default.png") {
          console.log("Found default no need to remove");
        } else {
          fs.unlinkSync(`./ui${userdatavalue.image}`);
        }
        fs.renameSync(
          value.filepath,
          `./ui/media/User_Profile_images/${
            userdatavalue.email + value.originalFilename
          }`,
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
      imgpath = `/media/User_Profile_images/${
        userdatavalue.email + value.originalFilename
      }`;
    })
    .on("end", function () {
      console.log(data);
      if (data.Password != data.Confirm_password) {
        console.log("Password and confirm password do not match");
        return res.send("Password and confirm password do not match");
      }
      userdata.updateOne(
        { Email: userdatavalue.email },
        {
          UserImage: imgpath,
          FirstName: data.FirstName,
          LastName: data.LastName,
          Password: bcrypt.hashSync(data.Password, 10),
        },
        function (err, dbdata) {
          if (err) {
            return res.send(err);
          }
          console.log("Data updated successfully.");
          console.log(dbdata);

          citydata.updateMany(
            { Email: userdatavalue.email },
            {
              FirstName: data.FirstName,
              LastName: data.LastName,
              OwnerImage: imgpath,
            },
            function (err1, db1) {
              if (err1) {
                return res.send(err1);
              }
              console.log("Data updated in citydb");
              console.log(db1);

              res.clearCookie("userdata");

              let userval = {
                email: userdatavalue.email,
                image: imgpath,
                firstname: data.FirstName,
                lastname: data.LastName,
              };

              console.log(userval);
              const token2 = jwt.sign(userval, process.env.SECRET_KEY);

              res.cookie("userdata", token2, {
                httpOnly: false,
                expiresin: new Date(Date.now() + 1000 * 60 * 10),
              });

              console.log("User data updated");
              return res.sendFile(
                path.join(__dirname, "/ui/html/dashboard.html")
              );
            }
          );
        }
      );
    });
  formdata.parse(req);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + "/ui/html/404.html"));
});

function validatetoken(cookiedata) {
  if (cookiedata == undefined) {
    return false;
  }
  return true;
}

function checkdata(info) {
  var pattern =
    /^[a-zA-z0-9]{2,}[.]{0,1}[a-zA-z0-9]{1,}@[a-z]{2,}[.]{1}[a-z]{2,3}[.]{0,1}[a-z]{0,3}$/;
  if (pattern.test(info.email)) {
    console.log("Email status ok");
  } else {
    console.log("Email not valid");
    return false;
  }

  if (info.firstname != undefined && info.firstname == "") {
    console.log("FirstName cannot be empty.");
    return false;
  }

  if (info.lastname != undefined && info.lastname == "") {
    console.log("Lastname cannot be empty.");
    return false;
  }

  if (
    info.password == "" ||
    info.password == undefined ||
    info.password.length < 8
  ) {
    console.log("Password not valid.");
    return false;
  }

  return true;
}
