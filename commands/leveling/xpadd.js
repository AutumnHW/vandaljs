const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('xpadd')
		.setDescription('Adds a specified amount of XP to a given user, usable by staff only.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to give xp.').setRequired(true))
		.addIntegerOption((option) => option.setName('qty').setDescription('The quantity of XP you would like to give.').setRequired(true) ),
		
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const qty = interaction.options.getInteger('qty');
		if(userData.getUserInfo(interaction.user, 'permissions')){};
		console.log(userData.getUserInfo(interaction.user, 'permissions'));
		console.log('target: ' + target + 'qty: ' + qty);
		userData.xpAdd(target, qty);


		await interaction.reply('Ok!  New XP Value is: ' + userData.getUserData('xp', target));
	},
};