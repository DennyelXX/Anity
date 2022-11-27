const discord = require("discord.js");

module.exports = {
    name: 'nick',
    usage: "<@felhasználó> [becenév]",
    description: "Becenevet tudsz beálítani a szerveren.",
    run: async (bot, message, args) => {
  const permission = message.member.permissions.has("MANAGE_NICKNAMES");
  const user = message.mentions.users.first();
  const nickname = args.slice(1).join(" ");

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod a parancs használatára. \nSzükséges jog: **MANAGE_NICKNAMES**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **nickname [felhasználó] [becenév]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!nickname) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **nickname [felhasználó] [becenév]**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    const member = message.guild.members.cache.get(user.id);

    await member
      .setNickname(nickname)
      .then(() => {
        const nicknameEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle(`Sikeres átnevezve <:accepted_correct:982724889087729674>`)
          .setThumbnail(user.user.avatarURL({ dynamic: true }))
          .setDescription(
            `**${user.username}** erre lett átnevezve **${nickname}**`
          );

        message.reply({
          embeds: [nicknameEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "Valami hiba történt.",
        });
      });
  }
}
}