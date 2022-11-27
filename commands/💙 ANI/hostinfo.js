const { Client, Message, MessageEmbed } = require('discord.js');
const { mem, cpu } = require("node-os-utils")
let m = require('moment-duration-format')
let os = require('os')
let cpuStat = require('cpu-stat')
let ms = require('ms')
let moment = require('moment')
const version = require("discord.js").version


module.exports = {
    name: 'stat',
    description:'Host Informáációk.',
    run: async (bot, message, args, guildDB) => {
        cpuStat.usagePercent(async function (error, percent, seconds) {
            if (error) {
              return console.error(error)
            }
            const cores = os.cpus().length
            const cpuModel = os.cpus()[0].model
            const guilds = bot.guilds.cache.size.toLocaleString()
            const users = bot.users.cache.size.toLocaleString()
            const channels = bot.channels.cache.size.toLocaleString()
            const node = process.version
            const { totalMemMb, usedMemMb } = await mem.info()
            const latency = (Date.now() - message.createdTimestamp) / 60;
            const uptime = moment.duration(bot.uptime).format(" D[Nap], H[Óra], m[Perc], s [Másodperc]");


            const embed = new MessageEmbed()
                .setTitle(`${bot.user.username} Host Információk`)
                .setColor("#2F3136")
                .addField(`Menet Idő`, `\`${uptime}\``, true)
                .addField(`Üzenet küldási ideje`,`\`${latency}  MS\``, false)
                .addField(`Memoria használat`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 /1024).toFixed(2)} MB\``, false)
                .addField(`Websocket küldási ideje`, `\`${bot.ws.ping}MS\``, false)
                .addField("Felhasználók", `\`${users} Felhasználó\``, false)
                .addField("Készítve ", `\`${bot.user.createdAt}\``,false)
                .addField("Szerverek", `\`${guilds} Szerver\``,false)
                .addField("Csatornák", `\`${channels} Csatorna\``,false)
                .addField("Discord Dev Verzió", `\`v${version}\``, false)
                .addField("Node Verzió",`\`${node}\``,false)
                .addField("CPU", `\`\`\`${os.cpus()[0].model}\`\`\``, false)
                .addField("RAM", `\`\`\`${cores}\`\`\``, false)
                .addField("Windows", `\`\`\`${os.platform()}\`\`\``, false)
                .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            message.channel.send({embeds:[embed]})





        
    }
        )

        function formatBytes (a, b) {
            let c = 1024;
            d = b || 2
            e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
            f = Math.floor(Math.log(a) / Math.log(c));

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f]
        }
    }
}