const {Client, Intents} = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
let user = [];
let group = [];
const client = new Client(
    {
        intents:[
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ]
    }
);

const random_num = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

function randomGroup(num){
    let userRandom = [];
    userRandom.push(...user);
    for(let i=0; i<num; i++){
        group.push([])
    }
    for(let i=0; i<Math.ceil(user.length/num); i++){
        group.forEach(g => {
            let rUser = userRandom[random_num(userRandom)];
            g.push(rUser)
            userRandom = userRandom.filter(e => e !== rUser)
        })
        
    }
}

client.on('ready', () => {
    console.log('your bot is ready');
})

client.on('messageCreate', msg => {
    if(msg.content == '!help'){
        msg.reply('!Random')
    }
})

client.on('messageCreate', msg => {
    if(msg.content.slice(0, 8) == '!Random '){
        groupNum = msg.content.replace('!Random ', '');
        randomGroup(groupNum)
        msg.reply('sus')
        console.log(group);
    }
})

client.on('messageCreate', msg => {
    if(msg.author.bot == false && msg.content.slice(0, 5) == '!add ') {
        let rawText = msg.content.replace('!add ', '');
        rawText.split(' ');
        user.push(...rawText.split(' '))
        msg.reply(msg.content.replace('!add ', ''))

    }
})

client.on('messageCreate', msg => {
    if(msg.author.bot == false && msg.content == 'o/') {
        user.push(msg.author.username)
        msg.reply(msg.author.username)

    }
})

client.on('messageCreate', msg => {
    if(msg.content == '!ShowAll'){
        let text = `มีทั้งหมด ${user.length} คน ได้แก่\n`;
        user.forEach((name, index) => {
            text += `${index+1}. ${name}\n`
        })
        msg.reply(text)
    }
})

client.login(process.env.TOKEN)