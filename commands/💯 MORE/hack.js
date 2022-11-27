const ms = module.require("ms");

module.exports = {
  name: "hack",
  usage: "<@felhasználó>",
  description: "Fel tudsz törni valakit. ( POÉN )",
  run: async (bot, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        "Várjunk csak... Kit szeretnél feltörni? Jelöld meg kérlek."
      );
    }
    const tohack = message.mentions.members.first();
    let msg = await message.channel.send(`Hacking ${tohack.displayName}....`);

    let time = "1s";
    setTimeout(function () {
      msg.edit(`Keresem ${tohack.displayName} Email címét és annak a kódját.....`);
    }, ms(time));

    let time1 = "6s";
    setTimeout(function () {
      msg.edit(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: •••••••••••••••••`);
    }, ms(time1));

    let time2 = "9s";
    setTimeout(function () {
      msg.edit("Keresek még fiókokat.....");
    }, ms(time2));

    let time3 = "15s";
    setTimeout(function () {
      msg.edit("Epic Games fiók találta.....");
    }, ms(time3));

    let time4 = "21s";
    setTimeout(function () {
      msg.edit("Hacking Epic Games fiók......");
    }, ms(time4));

    let time5 = "28s";
    setTimeout(function () {
      msg.edit("Hacked Epic Games fiók!!");
    }, ms(time5));

    let time6 = "31s";
    setTimeout(function () {
      msg.edit("Ip Cím lekérése.....");
    }, ms(time6));

    let time66 = "38s";
    setTimeout(function () {
      msg.edit("Ip cím találat: 221.65.149.124");
    }, ms(time66));

    let time7 = "38s";
    setTimeout(function () {
      msg.edit("Adatok eladása a DarkWeb-en.");
    }, ms(time7));

    let time8 = "41s";
    setTimeout(function () {
      msg.edit(`A feltörés sikeres volt, ${tohack.displayName} ellen.`);
    }, ms(time8));
  },
};
