const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const bodyParser                    = require('body-parser');

const models                        = require('./models');

const Member                        = mongoose.model('Member');  

var secure;
var server;

if(process.platform == 'win32') {secure = false} else {secure = true};

if (secure)
{
    console.log('Server now!');
    server = require('http').createServer(app);
    params = {
        transports: ['websocket', 'polling'],
    }
    io          = require("socket.io")(server, params);
} else
{
    console.log('localhost now!');
    params = {
        cors: { 
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    }
    server      = require('http').createServer(app);
    io          = require("socket.io")(server, params);
}

mongoose.connect("mongodb://127.0.0.1:27017/vyberi_store", { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() { 
        console.log(`Mongo Db Connect`);
        server.listen(3000,
            () => {
                console.log(`Занят на сервере 3000 порт...`);
                load_helpers();
            }
        );
    })
    .catch(err => console.error(`Error`, err));


var components_html = null;

var load_helpers = () =>
{
    if(components_html == null) 
    {
        components_html = require('./types/main');
        components_html.init({
            Member: Member,
        });
    }
}

var components_page = function components_page(socket,data,callback)
{
    if(components_html)
    {
        components_html.components_page(socket,data,callback);
    }
}

io.on('connection', function(socket) {
    
    console.log('Conneting, socket: ' + socket.id);

    socket.on('components', function(data, callback) {
        components_page(this, data, callback);
    });
});

app.use(bodyParser.json())

app.post('/add_member', async (req, res) => 
{
    var _data       = req.body;
    var _secret     = "i_opeji";

    var img     = _data.img;
    var rate    = _data.rate;
    var age     = _data.age;
    var money   = _data.money;
    var percent = _data.percent;
    var url     = _data.url;
    var my_rate = _data.my_rate;
    var name    = _data.name;

    if(_secret == _data.secret) 
    {
        await Member.create({
            name: name,
            img: img,
            rate: rate,
            age: age,
            money: money,
            percent: percent,
            url: url,
            my_rate: my_rate,
        }).then(data => {
            console.log(data);
        })

        res.sendStatus(200) 
    } else {
        res.sendStatus(404) 
    }
    
})