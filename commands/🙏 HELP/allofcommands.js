const {
  MessageEmbed,
  Message,
  MessageButton, 
  MessageComponent, 
  MessageActionRow,
  bot
} = require("discord.js");
const botconfig = require('../../botconfig.json');
let botnameoff = botconfig.botname;
const {
  readdirSync
} = require("fs");
const prefix = require("../../botconfig.json").prefix; // this one gets the prefix
const botname = require("../../botconfig.json").botname;
let color = "#ff0000"; // this is the color of the embed

const create_mh = require(`../../functions/menu.js`); // this one gets the dropdown menu

module.exports = {
  name: "help",
  emoji: `📌`, // emoji next to the command name i will show you in a min
  description: "Megmutatja az összes parancsot.",
  /**
   * 
   * @param {bot} bot 
   * @param {Message} message 
   * @param {String} args 
   * @returns 
   */
  run: async (bot, message, args, Discord, db) => {

      let categories = [];
      let cots = [];

      if (!args[0]) {

          //categories to ignore
          let ignored = [
              "test"
          ];

          const emo = {

              games: "🎮",            
              miscellaneous: "🎫",
              image: "📸",
              owner: "📝",
              info: "❓",
              moderator: "⚒️",
              economy: "💰"
// emojis for the categories
          }

          let ccate = [];
          //gets all the folders and commands
          readdirSync("./commands/").forEach((dir) => {
              if (ignored.includes(dir.toLowerCase())) return;
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
              );

              if (ignored.includes(dir.toLowerCase())) return;

              const name = `${dir}`;
              //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
              let nome = dir.toUpperCase();

              let cats = new Object();

              //this is how it will be created as
              cats = {
                  name: name,
                  value: `<:cyansmalldot:1011748992352272454>`,
                  inline: true
              }


              categories.push(cats);
              ccate.push(nome);
          });
          //embed
          const embed = new MessageEmbed()
              .setTitle(`<:anity:1037297768168960033> ${bot.user.username} Parancsok.`)
              .setThumbnail(bot.user.displayAvatarURL())
              .setDescription(`>>> **A prefixem:** \`${prefix}\` \n**Parancsok leírása / használata**\n *\`${prefix}help (Parancs Neve)\`*` + `\n\n<a:wave_animated:1037433159471612004> **Üdvözöllek kedves** *** ${message.author}***. \nBizonyára segítségre lenne szükséged. Nos, nagyon jó helyen jársz, mert a \`${prefix}help\` parancsal tudod kilistázni a parancs kategóríákat. És ha választasz egy kategóríát, akkor láthatod az ott szereplő parancsokat. \nHa a parancs leírására vagy kíváncsi, akkor használd a \`${prefix}help (parancs)\` parancsot. \nAmennyibben további segítségre lenne szükséged. \nKérlek keress fel minket a \`Support\` szervern. Ezt a \`${prefix}support\` parancsal tudod elérni.`)
              .setImage("https://cdn.discordapp.com/attachments/1037414381954289835/1037414573898203247/AnityBanner.png")
              .setFooter(
                  `Ő kérte le: ${message.author.tag}`,
                  message.author.displayAvatarURL({
                      dynamic: true
                  })
              )
              .setTimestamp()
              .setColor("BLUE")


//creating the dropdown menu
          let menus = create_mh(ccate);
          return message.reply({
              embeds: [embed],
              components: menus.smenu
          }).then((msgg) => {

              const menuID = menus.sid;

              const select = async (interaction) => {
                  if (interaction.customId != menuID) return;

                  let {
                      values
                  } = interaction;

                  let value = values[0];

                  let catts = [];

                  readdirSync("./commands/").forEach((dir) => {
                      if (dir.toLowerCase() !== value.toLowerCase()) return;
                      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                          file.endsWith(".js")
                      );


                      const cmds = commands.map((command) => {
                          let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                          if (!file.name) return "Nincs parancs";

                          let name = file.name.replace(".js", "");

                          if (bot.commands.get(name).hidden) return;


                          let des = bot.commands.get(name).description;
                          let emo = bot.commands.get(name).emoji;
                          let emoe = emo ? `${emo} - ` : ``;

                          let obj = {
                              cname: `${emoe}\`${name}\``,
                              des
                          }

                          return obj;
                      });

                      let dota = new Object();

                      cmds.map(co => {
                          if (co == undefined) return;

                          dota = {
                              name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                              value: co.des ? co.des : `*Nincs leírás.*`,
                              inline: true,
                          }
                          catts.push(dota)
                      });

                      cots.push(dir.toLowerCase());
                  });

                  if (cots.includes(value.toLowerCase())) {
                      const combed = new MessageEmbed()
                          .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Parancsok!__`)
                          .setThumbnail(bot.user.displayAvatarURL())
                          .setDescription(`>>> **Használd a  \`${prefix}help\` <parancs neve>, parancsot. Ha több információ érdekel.**\n\n`)
                          .addFields(catts)
                          .setColor("BLUE")

                      await interaction.deferUpdate();

                      return interaction.message.edit({
                          embeds: [combed],
                          components: menus.smenu
                      })
                  };

              };

              const filter = (interaction) => {
                  return !interaction.user.bot && interaction.user.id == message.author.id
              };

              const collector = msgg.createMessageComponentCollector({
                  filter,
                  componentType: "SELECT_MENU"
              });
              collector.on("collect", select);
              collector.on("end", () => null);

          });

      } else {
          let catts = [];

          readdirSync("./commands/").forEach((dir) => {
              if (dir.toLowerCase() !== args[0].toLowerCase()) return;
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
              );


              const cmds = commands.map((command) => {
                  let file = require(`../../commands/${dir}/${command}`);

                  if (!file.name) return "Nincs parancs.";

                  let name = file.name.replace(".js", "");

                  if (client.commands.get(name).hidden) return;


                  let des = client.commands.get(name).description;
                  let emo = client.commands.get(name).emoji;
                  let emoe = emo ? `${emo} - ` : ``;

                  let obj = {
                      cname: `${emoe}\`${name}\``,
                      des
                  }

                  return obj;
              });

              let dota = new Object();

              cmds.map(co => {
                  if (co == undefined) return;

                  dota = {
                      name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                      value: co.des ? co.des : `Nincs leírás.`,
                      inline: true,
                  }
                  catts.push(dota)
              });

              cots.push(dir.toLowerCase());
          });

          const command =
              bot.commands.get(args[0].toLowerCase()) ||
              bot.commands.find(
                  (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
              );

          if (cots.includes(args[0].toLowerCase())) {
              const combed = new MessageEmbed()
                  .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                  .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                  .addFields(catts)
                  .setColor("YELLOW")
                  .setImage("https://cdn.discordapp.com/attachments/889161008998907905/982301542419931216/anibanner.png")

              return message.reply({
                  embeds: [combed]
              })
          };

          if (!command) {
              const embed = new MessageEmbed()
                  .setTitle(`Helytelen parancs! Használat: \`${prefix}help\` és megmutatja az összes parancsot!`)
                  .setColor("BLUE");
              return await message.reply({
                  embeds: [embed],
                  allowedMentions: {
                      repliedUser: false
                  },
              });
          }

          const embed = new MessageEmbed() //this is for commmand help eg. !!help ping
              .setTitle("Parancs leírása")
              .setThumbnail(bot.user.displayAvatarURL())
              .addField(
                  "Parancs:",
                  command.name ? `\`${command.name}\`` : "Nincs parancs."
              )
              .addField(
                  "Használat:",
                  command.usage ?
                  `\`${prefix}${command.name} ${command.usage}\`` :
                  `\`${prefix}${command.name}\``
              )
              .addField(
                  "Parancs leírás:",
                  command.description ?
                  command.description :
                  "Nincs leírás."
              )
              .setFooter(
                  `Ő kérte le: ${message.author.tag}`,
                  message.author.displayAvatarURL({
                      dynamic: true
                  })
              )
              .setTimestamp()
              .setColor("BLUE");
          return await message.reply({
              embeds: [embed]
          });
      }
  },
}; 