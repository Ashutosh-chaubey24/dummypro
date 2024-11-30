const express=require("express")
const app=express();
const path =require("path")
const port=8080
app.set("view engine","ejs")
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    { 
        userid:uuidv4(),
        userimg:"https://wallpaperset.com/w/full/c/9/0/522708.jpg",
        username:"ashutosh",
        contant:"hello ashutosh"
    }, 
     { 
        userid:uuidv4(),
        userimg:"https://wallpaperset.com/w/full/c/9/0/522708.jpg",
        username:"raman",
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
        let userid =uuidv4();
        console.log(userid);
        posts.push({userid,username,contant,userimg})
        console.log(req.body)
        res.redirect("/posts")
    })
    app.get("/posts/:userid",(req,res)=>{
        let {userid}=req.params;
        console.log(userid);
        let post=posts.find((p)=> userid === p.userid)
        console.log(post)
        res.render("show.ejs",{post})
    })
    app.patch("/posts/:userid",(req,res)=>{
        let{userid}=req.params;
        console.log(userid)
        let {contant,userimg}=req.body
        console.log(contant);
        console.log(userimg);
        let post=posts.find((p)=> userid === p.userid);
        post.contant=contant;
        post.userimg=userimg;
        console.log(post)
        // res.send("patch req is working")
        res.redirect("/posts")
    })
    app.get("/posts/:userid/edit",(req,res)=>{
        let { userid } = req.params;
        //console.log(id)
        let post = posts.find((p) => userid === p.userid)
        res.render("edit.ejs",{post})
    })
    app.delete("/posts/:userid",(req,res)=>{
        let{userid}=req.params;
        posts=posts.filter((p)=>userid!==p.userid)
        console.log(posts);
        // res.send("delete req is working")'
        res.redirect("/posts")
    })
app.listen(port,()=>{
    console.log("listen port ",port)
})