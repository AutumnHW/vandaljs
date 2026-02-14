const { Events, MessageFlags, GuildMember } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
    name: Events.MessageCreate,
    "once": false,

    async execute(message) {
        // Ignore bots (VERY IMPORTANT)
        const { client } = message
        if (message.author.bot) return;
        const outputChannel = client.channels.cache.get('1327755122960236636');
        const currentLevel = userData.getUserData('level', message.author);
        const pingObject = "<@" + message.author + ">"
        const levelUpString = ' has reached terminal operator access level '
        //userData.xpAdd(message.author, 10);
        userData.msgAdd(message.author, 1);
        console.log('checking for level up');
        newLevel = userData.getUserData('level', message.author)
        if(newLevel > currentLevel){
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }


    }

}