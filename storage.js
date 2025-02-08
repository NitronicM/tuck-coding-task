const fs = require("fs").promises;
const parseGptOutput = require("./parser");
const STORAGE = "markdown-storage.txt";

async function initialize(json){
    try{
        const currentData = await fs.readFile(STORAGE, "utf-8")
                                            .catch(()=>"Error");

        if(!currentData){
            const initialMarkdown = parseGptOutput(json);
            await fs.writeFile(STORAGE, initialMarkdown, "utf-8");
            console.log("Initialized storage");
            return initialMarkdown;
        }
        return currentData;
    }catch(error){
        console.error("Error initializing storage", error);
    }
}

async function readMarkdown(){
    try{
        return await fs.readFile(STORAGE, "utf-8");
    }catch(error){
        console.error("Error reading storage", error);
    }
}

async function updateMarkdown(newSentence){
    try{
        const currentData = await readMarkdown();
        const updatedMarkdown = currentData
        ? `${currentData.trim()} ${newSentence.trim()}`
        : newSentence.trim();
        await fs.writeFile(STORAGE, updateMarkdown, "utf-8");
        return updateMarkdown;
    }catch(error){
        console.error("Error updating storage", error)
    }
}

module.exports = {initialize, readMarkdown, updateMarkdown};