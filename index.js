import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


let posts = [
  {
    id: 1,
    title: "Bitcoin ETFs Have Arrived.",
    content:
    "A selection of financial institutions, including household names like BlackRock and Fidelity, have been given permission by the US Securities and Exchange Commission (SEC) to launch spot bitcoin exchange-traded funds (ETFs), whose value tracks the price of bitcoin. The approval comes after a peculiar incident on January 9, in which a hijacker used the agency's X account to announce the ETFs prematurely, leading to market chaos and forcing the SEC to publish a retraction.",
    author: "Joel Khalili",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "No, The great 2023 layoffs aren't happening again",
    content:
      "So far, 2024 is off to a start that looks a lot like 2023—with a week full of job cuts from tech companies.Duolingo cut 10 percent of its contractors earlier this week, citing artificial intelligence as part of the reason. Twitch announced a cut of 500 people, and its parent company, Amazon, also made moves to lay off hundreds of employees across Prime Video and MGM Studios on Wednesday.",
    author: "Amanda Hoover",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get( "/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id",(req,res)=>{
  const pid= req.params.id;
   let foundPost = posts.find((post)=>post.id==pid);
   if(foundPost){
    res.json(foundPost);
   }
   else{
  return res.status(404).json({ message: "Post not found" });
    
   }
   
})

app.post("/posts", (req, res) => {
  const newPost = { ...req.body, id: ++lastId };
  posts.push(newPost);
  res.json(newPost);
  res.status(201).send();
});

app.patch('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
  });

app.delete("/posts/:id",(req,res)=>{
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
