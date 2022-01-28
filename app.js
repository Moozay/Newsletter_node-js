const express = require('express')
const request = require('request')
const https = require('https')


const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    
    res.sendFile('./signup.html', {root: __dirname})
})

app.post('/', (req, res)=>{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    console.log(`${fname} ${lname} ${email}`)

    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data)

    const url = "https://us20.api.mailchimp.com/3.0/lists/6a87ab83c1"

    const options = {
        method: "POST",
        auth: "moozay:45aa0a8b4847d457edacf58ab6723a6f-us20"

    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode === 200){
            res.sendFile("./success.html", {root: __dirname});
        }else{
            res.sendFile("./failure.html", {root: __dirname})
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", (req, res)=>{
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000")

})

//45aa0a8b4847d457edacf58ab6723a6f-us20

//6a87ab83c1