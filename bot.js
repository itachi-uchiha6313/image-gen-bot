const Telegraf = require('telegraf');
const axios = require("axios");

const bot = new Telegraf('5868737604:AAFk-HgVpAloZNBGYO7F4T15eKey6FF_CL8');

const helpMessage= `
Say something to me and I will generate image according to your text
To generate image, use 
/gene <query> 
`

bot.start((ctx)=>{
    ctx.reply("Hii I am Aki Robot");
    ctx.reply(helpMessage);
})

bot.help((ctx)=>{
    ctx.reply(helpMessage);
})

bot.command(["gene","Gene","GENE"],(ctx)=>{
    let input=ctx.message.text;
    let inputArray = input.split(" ");

    let message="";

    if(inputArray.length==1){
        ctx.reply("Please input the text/query!");
    }else{
        console.log(input);
        inputArray.shift();
        message=inputArray.join(" ");
        axios.get(`https://openairestapi.vercel.app/image?text=${message}&api=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`)
        .then(response => {
            bot.telegram.sendPhoto(ctx.chat.id, response.data.image_url)
          })
          .catch(error => {
            ctx.reply(err+"\n\n Please contact t.me/awesome_tofu");
          });
    }
    
})

bot.command("owner",(ctx)=>{
    ctx.reply("my owner is t.me/awesome_tofu. Thanks for using me!");
})

bot.launch()
