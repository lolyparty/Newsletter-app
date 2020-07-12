const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')


const app = express()

//parser middleware
app.use(bodyParser.urlencoded({extended: true}))

// static website file path
app.use(express.static(path.join(__dirname, 'public')));

//sign up route
app.post('/signup',(req, res) => {
    const {email} = req.body

    if(!email){
        res.redirect('/error.html');
        return;
    }

    //construct request data- data sent with request
    const data = {
        members:[
            {
            email_address:email,
            status:'pending',
            merge_fields:{
                //if inputs are present
                //FNAME:name
                //LNAME:lastName
                EMAIL:email
            }
    }
]}

    const postData = JSON.stringify(data)

    const options = {
        url: 'https://us10.api.mailchimp.com/3.0/lists/1fb7b29d6c',
        method: 'POST',
        headers:{
            authorization: 'auth 0de931376bc8e648de8106e30b224fce-us10'
        },
        body:postData,

    }

    request(options, (err, response,body) =>{
        if(err){
            res.redirect('/error.html')
        } else{
            if(response.statusCode === 200 ){
                res.redirect('/confirm.html');
            }else{
                res.redirect('/error')
            }
        }
    })

    //check if it returns input value
    // console.log(req.body)
    // res.send('hello')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('server started on ' + PORT))