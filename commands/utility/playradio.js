// playradio.js
const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

// Station Map
const stations = {
  'ruggedraw94': {
    name: 'Rugged Raw 94',
    url: 'https://radio.projectradio.org/listen/ruggedraw94/radio.mp3'
  },
  'projectfm': {
    name: 'PROJECT FM',
    url: 'https://radio.projectradio.org/listen/projectfm/radio.mp3'
  }
  // Add more stations here
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playradio')
    .setDescription('Play a live radio stream')
    .addSubcommand(sub =>
      sub.setName('ruggedraw94')
        .setDescription('Play Rugged Raw 94 stream'))
    .addSubcommand(sub =>
      sub.setName('projectfm')
        .setDescription('Play PROJECT FM stream')),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const station = stations[subcommand];

    if (!station) {
      return interaction.reply({ content: ' Unknown station.', ephemeral: true });
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: ' You must be in a voice channel.', ephemeral: true });
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    const resource = createAudioResource(station.url, { inlineVolume: true });
    const player = createAudioPlayer();

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Playing, () => {
      //console.log(🔊 Streaming ${station.name});
    });

    player.on('error', error => {
      //console.error(❌ Audio error: ${error.message});
    });

    await interaction.reply("penis");
  }
};