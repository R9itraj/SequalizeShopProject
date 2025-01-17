const path = require('path');
const sequelize=require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
sequelize.sync().then(res=>{
    app.listen(3000, () => {
        console.log(`Server running on port `);
    });
}).catch(err=>{
    console.log(err);
});

