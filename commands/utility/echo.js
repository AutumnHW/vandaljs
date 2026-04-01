const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos a supplied message to a specified channel')
        .addStringOption((option) => option.setName('input').setDescription('The message you want to send').setRequired(true))
	    .addChannelOption((option) => option.setName('channel').setDescription('The channel you want to send your message to').setRequired(true)),

    async execute(interaction) {
        const message = interaction.options.getString('input');
        const channel = interaction.options.getChannel('channel');
        //const username = target.username;
        if (!userData.authenticateUser(interaction.member.id)) { };
        //console.log(userData.getUserInfo(interaction.user, 'permissions'));
        //console.log('target: ' + target + 'qty: ' + qty);
        if (!userData.authenticateUser(interaction.member.id)) {
            await interaction.reply('You do not have permission to execute this command.');

        } else {
            channel.send(message);
            await interaction.reply('Ok!  Message has been sent.');
        };
    },
};