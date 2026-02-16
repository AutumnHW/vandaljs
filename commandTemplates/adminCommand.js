const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminCommand')
        .setDescription('Command template for commands that require authorization')
        .addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
        .addIntegerOption((option) => option.setName('value').setDescription('Placeholder value').setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('user');
        const value = interaction.options.getInteger('value');
        const username = target.username;
        if (!userData.authenticateUser(interaction.member.id)) { };
        //console.log(userData.getUserInfo(interaction.user, 'permissions'));
        //console.log('target: ' + target + 'qty: ' + qty);
        if (!userData.authenticateUser(interaction.member.id)) {
            await interaction.reply('You do not have permission to execute this command.');

        } else {
            await interaction.reply('Ok!  User is Admin');
        };
    },
};