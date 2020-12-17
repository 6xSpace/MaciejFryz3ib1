var express = require('express')
var app = express()
var path = require('path')
const PORT = 3000

var users = [
    { id: 1, log: 'login', pass: 'haslo', wiek: 99, uczen: "", plec: 'm' },
    { id: 2, log: 'Maciej', pass: 'Fryz', wiek: 18, uczen: 'checked', plec: 'm' },
    { id: 3, log: 'sample', pass: 'sample', wiek: 44, uczen: "", plec: 'k' },
    { id: 4, log: 'przyklad', pass: 'przyklad', wiek: 3, uczen: 'checked', plec: 'm' },
    { id: 5, log: 'beispiel', pass: 'beispiel', wiek: 8, uczen: '', plec: 'm' },
]
//wszystko pomiędzy tym...


//ważne zmienne

var logged = false
var adminPages = '<head><title>Sort</title><link rel="stylesheet" href="css/style.css"><style>body {background-color: darkgray;}</style></head><body></body><div id = "AdminNavdiv"><ul id = "navbar"><li id = "navli"><a href="sort" id="nava">Sort</a></li><li id = "navli"><a href="gender" id="nava">Gender</a></li><li id = "navli"><a href="show" id="nava">Show</a></li></ul></div><br>'


//statyczne linki:

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/main.html'))
})
app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/main.html'))
})
app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/register.html'))
})
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/login.html'))
})
/*
app.get('/adminUnlogged', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/adminUnlogged.html'))
})
app.get('/adminLogged', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/adminLogged.html'))
})
*/
app.get('/admin', function(req, res) {
if(logged == false){
    res.sendFile(path.join(__dirname + '/static/adminUnlogged.html'))
    
} else {
    res.sendFile(path.join(__dirname + '/static/adminLogged.html'))
    }
})



//rejestracja
//var zajete = false
app.get("/registerData", function(req, res){
    let zajete = false
    for(let n=0; n<users.length; n++){
        if(users[n].log == req.query.log){
            zajete = true
        }
        
    }
    if (zajete == false){
        let swierzak = {id: users.length+1, log: req.query.log, pass: req.query.pass, wiek: req.query.wiek, uczen: req.query.uczen, plec: req.query.plec}
        users.push(swierzak)
        res.send('Witaj, ' + req.query.log + '! Zostałeś poprawnie dodany do bazy!')
        console.log(users)
    } else {
        res.send("nazwa użytkownika jest zajęta")
    }
    
})

//logowanie

app.get("/LoginAttempt", function(req, res){
    logged = false
    let istniejesz = false
    let nJestWazne = 0
    let odpowiedz
    for(let n=0; n<users.length; n++){
        if(users[n].log == req.query.log){
            istniejesz = true
            nJestWazne = n
        } else {
            odpowiedz = 'zły login'
        }
    }
    if (istniejesz==true){
        if(users[nJestWazne].pass == req.query.pass){
            logged = true
            
        }else {
            odpowiedz = 'złe hasło'
        }
    }
    if (logged == true){
        res.redirect("/admin")
    } else (
        res.send(odpowiedz + ', spróbuj ponownie')
    )
})

//wylogowywanie

app.get("/logout", function(req, res){
    logged = false
    res.send("wylogowano. Możesz zalogować się ponownie: <br><a href='login'>Strona logowania</a>")
})


//stringowe strony

app.get("/sort", function(req, res){
    let tempString = adminPages
    
    res.send(tempString+"</body>")
})
app.get("/gender", function(req, res){
    let tempString = adminPages
    let tableK = "<table>"
    let tableM = "<table>"
    for (n=0; n<users.length;n++){
        if (users[n].plec=="k"){
            tableK += "<tr><td id='adminTab'>id: "+users[n].id+"</td><td id='adminTab'>płeć: k</td></tr>"
        } else {
            tableM += "<tr><td id='adminTab'>id: "+users[n].id+"</td><td id='adminTab'>płeć: m</td></tr>"
        }
    }
    tableK += "</table><br>"
    tableM += "</table>"
    tempString +=tableK
    tempString +=tableM
    res.send(tempString+"</body>")
})
app.get("/show", function(req, res){
    let tempString = adminPages
    tempString += "<table>"
    for (n=0; n<users.length;n++){
        tempString += "<tr><td id='adminTab'>id: "+users[n].id+"</td><td id='adminTab'>login: "+users[n].log+"</td><td id='adminTab'>uczeń: "+users[n].uczen+"</td><td id='adminTab'>wiek "+users[n].wiek+"</td><td id='adminTab'>płeć: "+users[n].plec+"</td></tr>"
        
    }
    tempString += "</table>"
    res.send(tempString+"</body>")
})

//...a tym
app.use(express.static('static'))

app.listen(PORT, function () {
    console.log('start serwera na porcie ' + PORT);
})