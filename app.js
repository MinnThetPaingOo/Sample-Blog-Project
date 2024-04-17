const express=require('express');
const app= express();
app.use(express.urlencoded({extended:true}))
const mongoose=require('mongoose');
const Blog = require('./models/blog')
const expressLayouts = require('express-ejs-layouts');

let mongoUrl="mongodb+srv://thetpaingoo:test123@cluster0.xono3lv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl).then(()=>{
    console.log("connected")
    app.listen(3000,()=>{
        console.log("App is listening");
    })
}).catch((e)=>{
    console.log(e)
})



app.set('views', './views')
app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/default');

app.get('/add-blog',async (req,res)=>{
    let blog = new Blog({
        title : "Blog title 1",
        intro : "Blog intro 1",
        body : "Blog body 1"
    })
   await blog.save();
    res.send("blog saved");
})

app.get('/',async (req,res)=>{
    // let blogs=[
    //     {name:'Blog Title1',
    //      intro:"blog is blah blah..."
    //     },
    //     {name:'Blog Title2',
    //      intro:"blog is blah blah..."
    //     },
    //     {name:'Blog Title3',
    //      intro:"blog is blah blah..."
    //     }
    // ]
    let blogs= await Blog.find().sort({createdAt : -1});
    res.render('home',{
        blogs,
        title:"home"
    });
})

app.post('/blogs',async (req,res)=>{
    let {title,intro,body}=req.body;
    let blog = new Blog({
        title,
        intro,
        body
    })
   await blog.save();
    res.redirect('./');
   console.log(title,intro,body);
})

app.post('/blogs/:id/delete',async(req,res,next)=>{
    try{
        let id = req.params.id;
        await Blog.findByIdAndDelete(id);
        res.redirect('/');
    }
    catch(e){
        next()
    }
})

app.get('/blogs/:id',async (req,res,next)=>{
    try{
        let id = req.params.id;
    let blog=await Blog.findById(id);
    res.render('blogs/show',{
        blog,
        title:'blog detail'
    })
    }
    catch(e){
        console.log(e)
        next()
    }
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about"
    });
})

app.get('/create',(req,res)=>{
    res.render('blogs/create',{
        title:"Blog Create"
    });
})


app.use((req,res)=>{
    res.status(404).render('404',{
        title:"404"
    });
})

