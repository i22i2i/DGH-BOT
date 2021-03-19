const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../level-xp/xp.js");
class Util {
  static getLevel(xp, extra = false) {
    let level = 0;

    //WHILE LOOP
    while (xp >= Util.getLevelxp(level)) {
      xp -= Util.getLevelxp(level);
      level++;
    }
    if (extra) return [level, xp];
    else return level;
  }

  static getLevelxp(level) {
    return 5 * Math.pow(level, 2) + 50 * level + 100;
  }

  static getInfo(exp) {
    let [level, remxp] = Util.getLevel(exp, true);
    let levelxp = Util.getLevelxp(level);

    return { level, remxp, levelxp };
  }

  static addexp(message) {
    let toadd = Math.floor(Math.random() * 3 + 3);
    let oldxp = db.get(`xp_${message.author.id}_${message.guild.id}`);
    let oldlvl = Util.getLevel(oldxp);
    let newxp = oldxp + toadd;
    let newlvl = Util.getLevel(newxp);

    const user = message.mentions.users.first() || message.author;
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    const { level, remxp, levelxp } = getInfo(xp);
    let image = db.get(`levelimg_${message.guild.id}`);
    const rank = new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
      .setCurrentXP(remxp)
      .setRequiredXP(levelxp)
      .setLevel(level)
      .setStatus(user.presence.status)
      .setProgressBar("#00FFFF", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setRank(1, "a", false)
      .setBackground(
        "IMAGE",
        image ||
          "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
      );
    rank.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "Rankcard.png");
      const EmbedLevel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(user.username, message.guild.iconURL())
        .setTimestamp()
        .setDescription(
          `**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`
        )
        .setImage("attachment://Rankcard.png")
        .attachFiles(attachment);

    if (newlvl > oldlvl)
      message.channel.send(
        `${message.author}, You just reached level ${newlvl}`
      );

    db.add(`xp_${message.author.id}_${message.guild.id}`, toadd);
  }
}

module.exports = Util;
