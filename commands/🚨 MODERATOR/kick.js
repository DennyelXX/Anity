const discord = require("discord.js");

module.exports = {
    name: 'kick',
    usage: "<@felhasználló> [indok]",
    descriptiom: "Egy adott felhasználót tudsz kirúgni a szerverről.",
    run: async (bot, message, args) => {

  const permission = message.member.permissions.has("KICK_MEMBERS");
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "Nincs indok megadva.";

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod ehez a parancshoz. \nSzükséges jog: **KICK_MEMBERS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **kick [felhasználó] [indok]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Magadat nem tudod kirúgni.");

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .kick(reason)
      .then(() => {
        const kickEmbed = new discord.MessageEmbed()
          .setColor("0155b6")
          .setTitle(`Sikeres kirúgás <:accepted_correct:982724889087729674>`)
          .setThumbnail(user.user.avatarURL({ dynamic: true }))
          .setDescription(
            `<:rightarrow:982724933048229888> **Kirúgott felhasználó:** <@${user.id}> \n<:rightarrow:982724933048229888> **Moderátor:** <@${message.author.id}> \n<:rightarrow:982724933048229888> **Indok:** **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [kickEmbed],
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