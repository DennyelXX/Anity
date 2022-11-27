module.exports = {
    name: 'say',
    usage: '[üzenet]',
    description: 'A bot által írsz.!',
   run: async (bot, message, args) => {
        
        if(!args.length) return message.channel.send({ content: `<:2899info:982881605385334884> Mit szeretnél? Mit írjak ki?`, reply: { messageReference: message.id }});
        message.channel.send(`${args.join(' ')}`)

    },
}