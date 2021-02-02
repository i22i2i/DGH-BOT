const { discord, Discord } = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
//const Default_Prefix = require("../../config.json");

module.exports = {
  name: "settings",
  description: "set message commands",
  usage: "set <key> <#channel>",
  category: "Help",
  owner: true,
  run: async (client, message, args) => {
    //OWNER ONLY COMMAND
    const channel = message.mentions.channels.first();
    message.delete();
    if (!message.author.id === `${message.guild.ownerID}`) {
      return message.channel
        .send("This command can only be used by owner")
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));
    }
    let e = new MessageEmbed()
      .setTitle("Setting MSG")
      .setColor("GREEN")
      .addField("Set <key>", "\ninbot, level")
      .setTimestamp()
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true }) ||
          client.user.displayAvatarURL({ dynamic: true })
      );
    const w = args.join(" ");
    if (!w) return message.channel.send(e);

    const [key, ...value] = args;
    switch (key) {
      case "inbot":
        {
          //ARGUMENT
          let channel = message.mentions.channels.first();

          if (!channel) {
            const wwww = new MessageEmbed()
              .setTitle("Settings Message")
              .setDescription(
                "<a:failed:798526823976796161> Please Mention the channel first"
              )
              .setColor("GREEN")
              .setTimestamp();
            return message.channel
              .send(wwww)
              .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
          }

          //Now we gonna use quick.db
          db.set(`inbot_${message.guild.id}`, channel.id);
          const www = new MessageEmbed()
            .setTitle("Settings Message")
            .setDescription(
              `<a:success:798526789114134548> message has been set channel ${channel}`
            )
            .setColor("GREEN")
            .setTimestamp();
          await message.channel
            .send(www)
            .then(m => m.delete({ timeout: 10000 }).catch(e => {}));
        }
        break;
      case "help":
        {
          return message.channel.send(
            e
            /*    new MessageEmbed()
              .setTitle("Setting MSG")
              .setColor("GREEN")
              .addField("Set <key>", "\ninbot, level, utime")
              .setTimestamp()
              .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true }) ||
                  client.user.displayAvatarURL({ dynamic: true })
              )*/
          );
        }
        break;
      case "level":
        {
          //ARGUMENT

          if (!channel) {
            const wwww = new MessageEmbed()
              .setTitle("Settings Message")
              .setDescription(
                "<a:failed:798526823976796161> Please Mention the channel first"
              )
              .setColor("GREEN")
              .setTimestamp();
            return message.channel
              .send(wwww)
              .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
          }

          //Now we gonna use quick.db
          db.set(`level_${message.guild.id}`, channel.id);
          const www = new MessageEmbed()
            .setTitle("Settings Message")
            .setDescription(
              `<a:success:798526789114134548> message has been set channel ${channel}`
            )
            .setColor("GREEN")
            .setTimestamp();
          await message.channel
            .send(www)
            .then(m => m.delete({ timeout: 10000 }).catch(e => {}));
        }
        break;
      case "welcome":
        {
          if (!channel) {
            return message.channel.send(
              new MessageEmbed().setDescription(
                "wchannel <ChannelMention>\nwmessage <...Message>\n`^(Must include ${message.author}, member count :message.guild.memberCount for this to work!)"
              )
            );
          }
        }
        break;
      case "wchannel":
        {
          await db.set(`welchannel_${message.guild.id}`, channel.id);
          return message.channel.send(`Welcome Channel is seted as ${channel}`);
        }
        break;
      case "wmessage":
        {
          let say = args.slice(1).join(" ");
          await db.set(`message_${message.guild.id}`, say);
          message.channel.send(`Welcome message is seted as ${say}`);
        }
        break;
      case "wmention": {
        const toggle = db.get(true);
        toggle.tags = !toggle.tags;
        await toggle.save();
        message.channel.send(
          `wmention has been ${
            toggle.tags ? "enabled" : "disabled"
          }`
        );
      }
    }
  }
};
