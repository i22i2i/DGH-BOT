const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "welcomer",
  category: "moderation",
  description: "Set the welcome",
  run: (client, message, args) => {
    const channel = message.mentions.channels.first()
    const [key, ...value] = args;
    switch (key) {
    case "welcomechannel":
        {
    if(!channel) {
    return message.channel.send(`${client.emojis.error} Invalid channel... Try again...`)
    db.set(`welchannel_${message.guild.id}`, channel.id)
    const welcome = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send welcome message in ${channel} when someone joins the server`)
    message.channel.send(welcome)
   };
        };
    break;
    case "welcomemessage":
        {
    const msg = args.slice(1).join(" ")
    db.set(`message_${message.guild.id}`, msg)
    const message = new Discord.MessageEmbed()
    .setDescription (`**Done** From now on I will send\n\`${msg}\``)
    message.channel.send(message)
  };
    break;
    case "testmessage":
        {
    const test = new Discord.MessageEmbed()
    .setTitle (`**Testing Member Join**`)
    message.channel.send(test)
    let chx = db.get(`welchannel_${message.guild.id}`)
    let ms =  db.get(`message_${message.guild.id}`)
   if (ms === null) {
       let ms =  db.set(`message_${message.guild.id}`,`Welcomer To server ${message.author}`)
  }
    const sender = client.channels.cache.get(chx);
    sender.send(ms)
  
   }};
}};
  
    /* 
  Now we gonna use quick.db*/
    