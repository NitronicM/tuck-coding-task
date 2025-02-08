function parseGptOutput(json){
    try{
        const data = JSON.parse(json);
        return data.gptOutput || "";
    }catch(error){
        console.error("Error parsing GPT output: ", error);
    }
}

module.exports = parseGptOutput;