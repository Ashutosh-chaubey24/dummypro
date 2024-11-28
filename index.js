const express=require("express")
const app=express();
const path =require("path")
const port=8080
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
const posts=[
    { 
        userid:"3",
        userimg:"https://wallpaperset.com/w/full/c/9/0/522708.jpg",
        username:"ashutosh",
        contant:"hello ashutosh"
    }, 
     { 
        userid:"2",
        userimg:"https://wallpaperset.com/w/full/c/9/0/522708.jpg",
        username:"raman",
        contant:"hello ashutosh"
    }
    , 
     {  userid:"1",
         userimg:"\\img\\shivam.jpg"
    },
    {
        userid:"4",
        userimg: "\\img\\maa.jpeg",
        username:"nishu",
        contant:"hello ashutosh"
    }
]
app.get("/posts",(req,res)=>
    {
        res.render("home",{posts})
    })
    app.get("/posts/new",(req,res)=>{
        res.render("new.ejs")
    })
    app.post("/posts",(req,res)=>{
        let{username ,contant,userimg}=req.body
        console.log(req.body)
        posts.push({username,contant,userimg})
        res.redirect("/posts")
        
    })
app.listen(port,()=>{
    console.log("listen port ",port)
})