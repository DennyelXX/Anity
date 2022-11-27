const discord = require("discord.js");

module.exports = {
    name: 'unban',
    usage: "<felhasználló ID> [indok]",
    descriptiom: "Egy adott felhasználót tudsz feloldani a kitíltás alol a szerveren.",
    run: async (bot, message, args) => {

  const permission = message.member.permissions.has("BAN_MEMBERS");
  const userId = args[0];
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod ehez a parancshoz. \nSzükséges jog: **BAN_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!userId) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat a kitíltás feloldásához. \nHelyes használat: **unban [felhasználó ID] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else {
    const totalBans = await message.guild.bans.fetch();
    const member = totalBans.find((x) => x.user.id === userId);

    if (!member) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription("<:otuage:1036683612441030657> **A felhasználó nincs a kitíltás listáján.**");

      message.reply({
        embeds: [errEmbed3],
      });
    } else {
      message.guild.members
        .unban(userId, reason)
        .then(() => {
          const unbanEmbed = new discord.MessageEmbed()
            .setColor("0155b6")
            .setTitle(`Sikeres kitíltás feloldás. <:unban_hammer:1036683557017501747>`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
              `<:cyansmalldot:1036683427782594630> **Kitíltott Felhasználó:** <@${userId}> \n<:cyansmalldot:1036683427782594630> **Moderátor:** <@${message.author.id}> \n<:cyansmalldot:1036683427782594630> **Indok:** **${reason}**`
            )
            .setTimestamp();

          message.reply({
            embeds: [unbanEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
          message.reply({
            content: "Valami hiba történt. Lehet hogy nagyobb rangja van mint az enyém. Vagy pedig az a rang az enyém felett van.",
          });
        });
    }
  }
}
}