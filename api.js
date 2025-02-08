const express = require("express")
const {initialize, readMarkdown, updateMarkdown} = require("./storage")

const app = express();
const PORT = 3000;

app.use(express.json());

initialize();

app.get("/", async (req, res)=>{
    try{
        const markdown = await readMarkdown();
        res.json({markdown});
    }catch(error){
        res.status(500).json({error: "Unexpected error reading markdown"});
    }
})

app.post("/markdown", async (req, res)=>{
    try{
        const newSentence = req.body.toString();
        if(!newSentence){
            return res.status(400).json({error: "Invalid sentence"})
        }
        const updatedMarkdown = await updateMarkdown(newSentence);
        res.json({markdown: updatedMarkdown});
    }catch{
        res.status(500).json({error: "Unexpected error updating markdown"})
    }
})

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT);
})