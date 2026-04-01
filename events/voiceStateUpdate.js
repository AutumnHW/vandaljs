const { Events, ActivityType } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
const voiceSessions = new Map();
module.exports = {
    name: Events.VoiceStateUpdate,
    execute(oldState, newState) {
        const userId = newState.id;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;

        // USER JOINS VC
        if (!oldChannel && newChannel) {
            voiceSessions.set(userId, Date.now());
        }

        // USER LEAVES VC
        if (oldChannel && !newChannel) {

            const joinTime = voiceSessions.get(userId);

            if (!joinTime) return;

            const timeSpent = Date.now() - joinTime;

            console.log(`${newState.member.user.tag} spent ${Math.floor(timeSpent/1000)} seconds in VC`);

            userData.addVoiceChatTime(userId, timeSpent)


        }

        // USER SWITCHES CHANNEL
        if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {

            const joinTime = voiceSessions.get(userId);

            if (!joinTime) return;

            const timeSpent = Date.now() - joinTime;

            console.log(`${newState.member.user.tag} spent ${Math.floor(timeSpent/1000)} seconds in ${oldChannel.name}`);

    

        }

    },
};