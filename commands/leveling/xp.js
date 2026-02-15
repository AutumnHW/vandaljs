const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('xp')
		.setDescription('Modifies XP for any given user, usable by staff only.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
		.addIntegerOption((option) => option.setName('qty').setDescription('Quantity, positive number to add, neative number to subtract.').setRequired(true) ),
		
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const qty = interaction.options.getInteger('qty');
		const username = target.username;
		if(!userData.authenticateUser(interaction.member.id)){};
		//console.log(userData.getUserInfo(interaction.user, 'permissions'));
		//console.log('target: ' + target + 'qty: ' + qty);
			if(!userData.authenticateUser(interaction.member.id)){
			await interaction.reply('You do not have permission to execute this command.');

		}else{
		userData.xpAdd(target, qty);
		//reply with new xp value
		await interaction.reply('Ok!  New XP Value for ' + username + ' is: ' + userData.getUserData('xp', target));
		};
	},
};