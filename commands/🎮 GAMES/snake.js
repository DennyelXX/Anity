const discord = require("discord.js");
const weky = require("weky");

module.exports = {
    name: 'snake',
    description: 'Eredeti snake game, discord-ra megoldva.',
    run: async (bot, message, args) => {

  await weky.Snake({
    message: message,
    embed: {
      color: "#0155b6",
      title: "Snake Game",
      description: `Remek voltál ${message.author}, az eredményed **{{score}}** pont`,
      footer: "Snake Game 🐍",
      timestamp: true,
    },
    emojis: {
      empty: "⬛",
      snakeBody: "🟩",
      food: "🍉",
      up: "⬆️",
      right: "⬅️",
      down: "⬇️",
      left: "➡️",
    },
    othersMessage: `Csak ${message.author} tudja megnyomni a gombot!`,
    buttonText: "Stop",
  });
}
}