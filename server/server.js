const express = require("express")
const cors = require("cors")

const User = require("./models/User")
const Apartment = require("./models/Apartment")
const Message = require("./models/Message")
const Payment = require("./models/Payment")
const Maintenance = require("./models/Maintenance")

User.hasOne(Apartment)
Apartment.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

Apartment.hasMany(Maintenance)
Maintenance.belongsTo(Apartment)

User.hasMany(Payment)
Payment.belongsTo(User)



const port = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.listen(port,() => {
    console.log(`Server running on port :${port}`)
})

// Authentication
app.post('/sign-up',async (req,res) => {
    try {
        const {name,email,phone,password} = req.body
        await User.create({
            name,
            email,
            phone,
            password
        })
        res.json({message:"Successful sign up"})
    } catch (error) {
        console.log(error.message)      
        res.json({error:error.message})
    }
})

app.post('/log-in',async (req,res) => {
    try {
        const {email,password} = req.body
        const userFound = await User.findOne({where:{email}})
        if (userFound.password == password){
            res.json({message:userFound})
        }
        else res.json({error:"User details are wrong"})
    } catch (error) {
        console.log(error.message)      
        res.json({error:error.message})
    }
})


// Apartment
app.get('/aparment',async (req,res) => {
    try {
        const aparments = await Apartment.findAll()
        res.json({message:aparments})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/apartments',async (req,res) => {
    try {
        const {title,description,type,price} = req.body
        await Listing.create({
            title,
            description,
            type,
            price
        })
        res.json({message:"Successful apartment created"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.put('/apartment/:id',async (req,res) => {
    try {
        const {title,description,type,price} = req.body
        const {id} = req.params
        const listingFound = await Apartment.findOne({where:{id}})
        
        const updatedListing = {
            description:description == null ? listingFound.description : description,
            type:type == null ? listingFound.type : type,
            price:price == null ? listingFound.price : price,
            title:title == null ? listingFound.title : title
        }

        await Apartment.update(updatedListing,{where:{id}})
        res.json({message:"Successful apartment updated"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.delete('/apartment/:id',async (req,res) => {
    try {
        const {id} = req.params
        
        await Apartment.destroy({where:{id}})
        res.json({message:"Successful listing deleted"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

// Tenant
app.get('/users',async (req,res) => {
    try {
        const users = await User.findAll()
        res.json({message:users})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/users',async (req,res) => {
    try {
        const {name,email,phone,password,role} = req.body
        
        await User.create({
            name,
            email,
            phone,
            password,
            role
        })
        res.json({message:"User created"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.delete('/users/:id',async (req,res) => {
    try {
        const {id} = req.params
        await User.destroy({id})
        res.json({message:"User deleted"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

// Payments
app.get('/payment',async (req,res) => {
    try {
        const payments = await Payment.findAll()
        res.json({message:payments})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

app.post('/payment',async (req,res) => {
    try {
        const {email,title} = req.body
        const userFound = User.findOne({where:{email}})
        const listingFound = Listing.findOne({where:{title}})
        await Booking.create({
            UserId:userFound,
            ListingId:listingFound
        })
        res.json({message:"Booking created"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})



// Maintenance
app.get("/maintenance",async(req,res) => {
    try {
        const maintenance = await Maintenance.findAll()
        res.json({message:maintenance})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})
app.post("/maintenance",async(req,res) => {
    try {
        const {message,date,title} = req.body
        const aparmentFound = Apartment.findOne({where:{title}})
        await Maintenance.create({
            message,
            date,
            ApartmentId:aparmentFound,
        })
        res.json({message:"Maintenance request created"})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})


// Message
app.post("/message",async(req,res) => {
    try {
        const {body,date,email} = req.body
        const userFound = await User.findOne({where:{email}})
        await Listing.update({UserId:userFound},{where:{title}})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
})

const createToken = async (req, res, next) => {
    const secret = "dRFgIsOAUaiaN5NK";
    const consumer = "4MKhZD24b0ibxPw12SYtorvGEwjFcZOU";
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    await axios
      .get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: {
            authorization: `Basic ${auth}`,
          },
        }
      )
      .then((data) => {
        token = data.data.access_token;
        console.log(data.data);
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
      });
  };

const stkPush = async (req, res) => {
};

app.post('/pay' ,async (req,res) => {
    const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey ="bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: 174379,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
})