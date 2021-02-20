const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "setting",
  args: true,
  permission: "MANAGE_GUILD",
  description: "Set The Prefix Of Bot!",
  usage: "Setprefix <New Prefix>",
  run: async (client, message, args) => {
    
    const NewPrefix = args.join(" ");
    
    let Prefix = await db.set(`Prefix_${message.guild.id}`, NewPrefix);
    if (!Prefix) Prefix = Default_Prefix;
 
    if (!NewPrefix) return message.channel.send("Please Give New Prefix Of Bot!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix.length > 10) return message.channel.send("Too Long Prefix - 10 Limit").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
 //   if (NewPrefix === Prefix) return message.channel.send("Given Prefix Is The Current Prefix!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();
    
    const Embed2 = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Server ${message.guild.name}\nBy ${message.author.username}`)
    .setTimestamp();
    
 //const dm = message.guild.members.get(message.guild.ownerID)
 await db.set(`Prefix_${message.guild.id}`, NewPrefix);
    
    try {
      return message.channel.send(Embed).then(m=>m.delete({timeout:6000}).catch(e=>{}));
     await message.guild.ownerID.send(Embed2);
    } catch (error) {
      return message.channel.send(`New Prefix Has Been Setted - ${NewPrefix}`);
    };
  }
};