const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stopradio')
        .setDescription('stops playing the radio and disconnects the bot from vc'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        connection.destroy();
        interaction.reply(' Radio stopped.');
    },
};