const { EmbedBuilder } = require('discord.js');
function build(){
const exampleEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Some title')
      .setDescription('This is a message reply with an embed.');
return { embeds: [exampleEmbed] };
}

module.exports = {
    build
}
