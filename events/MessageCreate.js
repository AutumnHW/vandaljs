const { Events, MessageFlags, GuildMember} = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
    name: Events.MessageCreate,
    "once": false,

    async execute(message) {
         // Ignore bots (VERY IMPORTANT)
        if (message.author.bot) return;
    userData.xpAdd(message.author, 10);
    
}

}