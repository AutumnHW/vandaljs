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
        const levelUpStringSentinel = ' | Congratulations, you are now a SENTINEL '
        const member = message.member;
        const sentinelRole = message.guild.roles.cache.get('1328727053859815439')
        //userData.xpAdd(message.author, 10);
        userData.msgAdd(message.author, 1);
        console.log('checking for level up');
        newLevel = userData.getUserData('level', message.author)
        console.log(newLevel);
        if (newLevel > currentLevel && newLevel == 10) {
            await member.roles.add(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel + levelUpStringSentinel);
        } else if (newLevel > currentLevel) {
            await member.roles.remove(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }
    }

}