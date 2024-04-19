const bcrypt = require('bcrypt')

function login(req, res){
    res.render('login/index');
}

function auth(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.Email], (err, userdata) => {
            if(userdata.length > 0){
                bcrypt.compare(data.Password, userdata.Password, (err, isMatch) =>{
                    userdata.forEach(element => {
                        console.log(element.Password)
                    });
                    if(!isMatch){
                        res.render('login/index', { error: 'Error: Contra incorrecta'})
                    } else{
                        console.log("Bienvenido")
                    }
                })
            } else {
                res.render('login/index', { error: 'Error: El usuario no existe'})
            }
        })
    });

 }

function register(req, res){
    res.render('login/register');
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE email = ?', [data.Email], (err, userdata) => {
            if(userdata.length > 0){
                res.render('login/register', { error: 'Error: El usuario ya existe!'})
            } else {
                bcrypt.hash(data.Password, 12).then(hash => {
                    data.Password = hash;
                    console.log(data);
            
                    req.getConnection((err, conn) =>{
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                            res.redirect('/')
                        });
                    });
                });
            }
        });
    });


}

module.exports = {
    login,
    register,
    storeUser,
    auth,
}