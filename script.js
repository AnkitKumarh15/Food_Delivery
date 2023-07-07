// for sign up :-

const fn = document.getElementById('fullname');
const email = document.getElementById('mail');
const ph = document.getElementById('phone');
const crpass = document.getElementById('createpass');
const address = document.getElementById('add');

// for log in :-
const uname = document.getElementById('login-email');
const pass = document.getElementById('login-pass');


// for forgot pass :-
const forgot_email = document.getElementById('forgot-email');
const forgot_phone = document.getElementById('forgot-phone');
const new_pass = document.getElementById('new-pass');
// --------------------------------------------------- login ----------------------------

function login()
{
    console.log(uname.value , pass.value);

    const data  = 
    {
        email : uname.value,
        pass : pass.value
    }
    
    axios.post('http://localhost:3001/login',data).then((result) =>{
    console.log(result);
    alert(result.data.message);
    document.getElementById('login-email').value = '';
    document.getElementById('login-pass').value = '';


   }).catch((err) =>{
    console.log(err);
   });
}


// ------------------------------------------------- signup ----------------------------------------

function signup()
{
    console.log(fn.value , email.value, ph.value, crpass.value, address.value);

    // we are sending data to backend here in json format
    const data = {
        fullname : fn.value,
        email : email.value,
        phone : ph.value,
        pass : crpass.value,
        address : address.value
    }

    axios.post('http://localhost:3001/signup',data ).then((result) => {
        console.log(result);
        alert(result.data.message);

        // after clicking on alert ok button, all credentials should be empty
        document.getElementById('fullname').value = '';
        document.getElementById('mail').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('createpass').value = '';
        document.getElementById('add').value = '';

    }).catch((err) => {
        console.log(err);
    });
}
// --------------------------------------------- Forgot paassword  -------------------------------------------------------------------

function forgotpass()
{
    console.log(forgot_email.value, forgot_phone.value, new_pass.value);
    const data = {
        forgot_email : forgot_email.value,
        forgot_phone : forgot_phone.value,
        new_pass : new_pass.value
    }
    
    axios.post('http://localhost:3001/forgotpass',data).then((result)=>{
        console.log(result);
        alert("Password reset successfully");

        // after clicking on alert ok button, all credentials should be empty
        document.getElementById('forgot-email').value='';
        document.getElementById('forgot-phone').value='';
        document.getElementById('new-pass').value='';
    }).catch((err)=>{
        console.log(err);
    });

    
}