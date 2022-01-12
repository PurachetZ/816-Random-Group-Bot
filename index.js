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

const random_num = (max) => {
    return Math.floor(Math.random() * max);
}

function showAll(msg){
    let text = `มีทั้งหมด ${user.length} คน ได้แก่\n`;
        user.forEach((name, index) => {
            text += `${index+1}. ${name}\n`
        })
    return text;
}

function randomGroup(num){
    let userRandom = [];
    group = [];
    userRandom.push(...user);

    // สร้างกลุ่มตามจำนวน
    for(let i=0; i<num; i++){
        group.push([])
    }

    // สุ่มคนโดยแต่ละกลุ่มจะสุ่มคนขึ้นมาทีละคน วนรอบจนไม่เหลือคนที่ยังไม่มีกลุ่มแล้ว
    for(let i = 0; userRandom.length > 0; i++){
        let rUser = userRandom[random_num(userRandom.length)];
        group[i%num].push(rUser)
        userRandom = userRandom.filter(e => e !== rUser);
    }

    let text = `จำนวนกลุ่มทั้งหมด ${group.length} กลุ่ม แต่ละกลุ่มมีสมาชิกได้แก่\n`;
    group.forEach((u, index) => {
        text += `กลุ่มที่ ${index + 1} มีสมาชิก ${u.length} คน\n`
        u.forEach(u2 => {
            text += u2 + '\n';
        })
        text += '-----------------\n';
    })
    return text;
}


client.on('ready', () => {
    console.log('your bot is ready');
    client.user.setActivity('!!help');
})

// คำสั่ง Help ใช้แสดงคำสั่งทั้งหมด
client.on('messageCreate', msg => {
    if(msg.content == '!!help'){
        msg.reply(
`!add เพิ่มรายชื่อที่ต้องการสุ่ม ตัวอย่าง !add นายA นายB นายC
!addme เพิ่มรายตัวเองลงในรายชื่อที่ต้องการสุ่ม
!show แสดงรายชื่อที่ต้องการสุ่ม
!random ทำการสุ่มกลุ่ม ตัวอย่าง !random 4 จะทำการสุ่มทั้งหมด 4 กลุ่ม`)
    }
})

// คำสั่ง add เพิ่มรายชื่อคน
client.on('messageCreate', msg => {
    if(msg.author.bot == false && msg.content.slice(0, 6) == '!!add ') {
        let rawText = msg.content.replace('!!add ', '');
        rawText.split(' ');
        user.push(...rawText.split(' '))
        msg.reply(msg.content.replace('!!add ', ''))

    }
})

// ทำการสุ่ม
client.on('messageCreate', msg => {
    if(msg.content.slice(0, 9) == '!!random '){
        groupNum = msg.content.replace('!!random ', '');
        msg.reply(randomGroup(groupNum))
    }
})


// เพิ่มตนเองเข้าไปอยู่ใน user pool อาจทำเพิ่ม
client.on('messageCreate', msg => {
    if(msg.author.bot == false && msg.content.slice(0, 8) == '!!addme ' || msg.content.slice(0, 7) == '!!addme') {
        // let rawText = msg.content.replace('!!addme ', '');
        user.push(msg.author.username)
        msg.reply(`เพิ่ม ${msg.author.username} ลงใน user pool แล้ว`)
    }
})

client.on('messageCreate', msg => {
    if(msg.content == '!!show'){
        msg.reply(showAll(msg));
    }
})

client.login(process.env.TOKEN)