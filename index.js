// backend
// npm init
// npm i express cors, means install express and cors
// ---------------------------------------------------------------------------------------------------------------------------

// import express and cors which you installed now 
const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const app = express();

app.use(express.json()); // using becouse we use req.body
app.use(cors()); // to connect with frontend

let db;
// const credList=[];
MongoClient.connect('mongodb+srv://ankitkumar:asdf@cluster0.uugtjq0.mongodb.net/?retryWrites=true&w=majority').then((client)=>{
db = client.db('food-delivery-db');    
console.log("DB server is connected");
}).catch((err)=>{
    console.log(err);
})



// ------------------------------------------------------- API for signup :- --------------------------------------------- 

app.post('/signup', async (req,res) =>{

    const{fullname,email,phone,pass,address} = req.body; // taking these things through req.body

    // checking nothings should be empty
    if(!fullname || !email || !phone || !pass || !address )
    {
        res.json({message:"Please enter all the credentials"});
        return;
    }
    else
    {
        const result = await db.collection('user-cred').find({email}).toArray();
        console.log(result);
        if(result.length)
        {
            res.json({message:'user already exists'});
            return;
        }
        const user = { fullname,email,phone,pass,address};
        await db.collection('user-cred').insertOne(user);
        res.json({message:"Account created successfully"});
    }
    
});

//---------------------------------------------------- API for Login :-  ---------------------------------------------------

app.post('/login',async(req,res)=>{
    // req.body => accept all the values
    const{email , pass} = req.body;
    if(email && pass)
    {
        const result = await db.collection('user-cred').find({email}).toArray();
        if(result.length)
        {
            if(result[0].pass == pass)
            {
                res.json({message:'login successfull',details:result});
            }
            else
            {
                res.json({message:'invalid password'});
            }
        }
        else
        {
            res.json({message:'user doesnt exist'});
        }
    }
    else
    {
        res.json({message:'invalid email or password'});
    }
});

//------------------------------------------------- API for forgot password :- -----------------------------------------------

app.post('/forgotpass', async(req,res)=>{

    const {forgot_email, forgot_phone, new_pass} =req.body;
    // email -> exist in cred.json ?, phonenumber == that existing user
    // then only , old pass = new pass

    if(forgot_email && forgot_phone && new_pass)
    {
        const result = await db.collection('user-cred').find({email}).toArray();
        if(result.length)
        {
            if(result[0].phone == forgot_phone)
            {
                await db.collection('user-cred').updateOne({email},{ $Set: {pass: new_pass}});
                res.jsdon({message:'Password updated successfully'});
            }
            else
            {
                res.json({ message:'Inavlid Contact'});
            }
        }
        else
        {
            res.json({message:'user does not exst'});
        }
    }
    else
    {
        res.json({message:'invalied phone number or email id or password'});
    }
    res.json({message:"Invalid phone number / Email id"});
});

//-----------------------------------------Restaurants---------------

app.post('/addRestaurant',async(req,res)=>{
    const restroDetails = req.body;
    if(restroDetails)
    {
        await db.collection('restaurant').insertOne(restroDetails);
        res.json({message:"Restaurant added successfully"});
    }
    else
    {
        res.json({message:"Restaurant details empty"});
    }
})

app.get('/getRestaurant',async(req,res)=>{
    const {food, location, restro_id} = req.body;
    let data = [];
    const reslist = await db.collection('restaurant').find({}).toArray();
    if(location)
    {
        reslist.forEach(eachRestro => {
            if(eachRestro.details.address == location)
            {
                data.push(eachRestro);
            }
        });
    }

    // yha ka reList mam ka result hai 
    res.json({message:"All the restaurants", reslist});
})

// search by food , search by restaurant , search by address
// fetch these details by query -> req.query


//------------------------------------------------ Listen port address --------------------------------------------------------

const port = 3001;
app.listen(port , ()=>{
    console.log(`server is listening in port address ${port}`);
});
