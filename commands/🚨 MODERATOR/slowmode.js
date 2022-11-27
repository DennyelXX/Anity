const discord = require("discord.js");

module.exports = {
    name: 'slowmode',
    usage: "(szám)",
    descriptiom: "Egy adott csatorna lassítása.",
    run: async (bot, message, args) => {
  const permission = message.member.permissions.has("MANAGE_CHANNELS");
  const channel = message.channel;
  const slowmodeDuration = args[0];

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Nincs jogod a parancs használatához. \nSzükséges jog: **MANAGE_CHANNELS**"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!slowmodeDuration) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Helytelen használat. \nHelyes használat: **slowmode [másodperc számmal megadva]**"
      );

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (slowmodeDuration > 21600 || slowmodeDuration < 5) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "Minimum slowmode limit **5 másodperc** \nMaximum slowmode limit **21,600 másodperc**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    channel
      .setRateLimitPerUser(slowmodeDuration)
      .then(() => {
        const slowmodeEmbed = new discord.MessageEmbed()
            .setTitle(`Sikeres lassítás <:accepted_correct:982724889087729674>`)
          .setColor("0155b6")
          .setDescription(
            `A csatornára **${slowmodeDuration} másodperces** lassítás került.`
          );

        message.reply({
          embeds: [slowmodeEmbed],
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