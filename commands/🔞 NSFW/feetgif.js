const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "feetgif",
  category: "NSFW",
  usage: "[command]",
  run: async (bot, message, args) => {
  //command

  //Checks channel for nsfw
  var errMessage = "**Ez nem __NSFW__ csatorna.**";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })

  }

        async function work() {
        let owo = (await neko.nsfw.feetGif());

        const cumslut = new Discord.MessageEmbed()
        .setTitle("feetGif")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send({ embeds: [cumslut] });

}

      work();
}
                };
