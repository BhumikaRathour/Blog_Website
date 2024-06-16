const express = require('express')
const articleRouter = require("./routes/articles");
const { default: mongoose } = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/bharatInternDatabase')

app.get('/favicon.ico', (req, res) => res.status(204));
app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render("articles/index", {articles:articles});
})


app.use('/articles',articleRouter)



app.listen(4000)