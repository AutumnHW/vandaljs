const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Play tic tac toe against the bot. Gain XP for winning, loose XP for loosing.'),

    async execute(interaction) {
        const author = interaction.user;
        let board = [null, null, null, null, null, null, null, null, null];
        let xpAtHand = Math.ceil(Math.random()*100);
        const player = '❌';
        const bot = '⭕';

        function checkWinner(b) {
            const wins = [
                [0,1,2],[3,4,5],[6,7,8],
                [0,3,6],[1,4,7],[2,5,8],
                [0,4,8],[2,4,6]
            ];

            for (const [a,b1,c] of wins) {
                if (b[a] && b[a] === b[b1] && b[b1] === b[c]) {
                    return b[a];
                }
            }

            if (b.every(cell => cell)) return 'draw';
            return null;
        }

        function botMove() {
            const free = board
                .map((v,i) => v === null ? i : null)
                .filter(v => v !== null);

            if (free.length === 0) return;
            const choice = free[Math.floor(Math.random() * free.length)];
            board[choice] = bot;
        }

        function renderBoard(disabled = false) {
            const rows = [];

            for (let i = 0; i < 3; i++) {
                const row = new ActionRowBuilder();

                for (let j = 0; j < 3; j++) {
                    const index = i * 3 + j;

                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(index.toString())
                            .setLabel(board[index] ?? '.')
                            .setStyle(
                                board[index] === player
                                    ? ButtonStyle.Danger
                                    : board[index] === bot
                                        ? ButtonStyle.Primary
                                        : ButtonStyle.Secondary
                            )
                            .setDisabled(disabled || board[index] !== null)
                    );
                }

                rows.push(row);
            }

            return rows;
        }

        const embed = new EmbedBuilder()
            .setTitle('Tic Tac Toe')
            .setDescription(`You are ${player}`)
            .setColor(0xE67E22);

        await interaction.reply({
            embeds: [embed],
            components: renderBoard()
        });

        const message = await interaction.fetchReply();

        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 300000
        });

        collector.on('collect', async i => {

            if (i.user.id !== interaction.user.id) {
                return i.reply({ content: "This isn't your game.", ephemeral: true });
            }

            const index = parseInt(i.customId);

            if (board[index] !== null) return;

            board[index] = player;

            let result = checkWinner(board);

            if (!result) {
                botMove();
                result = checkWinner(board);
            }

            if (result) {
                collector.stop();
                console.log(result);
                if(result == 'draw'){
                    userData.xpAdd(author, xpAtHand);
                }
                 if(result == '❌'){
                    userData.xpAdd(author, xpAtHand);
                }
                if(result == '⭕'){
                    userData.xpAdd(author, -(xpAtHand));
                }


                const endEmbed = EmbedBuilder.from(embed)
                    .setTitle('Game Complete')
                    .setDescription(
                        result === 'draw'
                            ? 'It’s a draw! You gained ' + xpAtHand + ' xp!'
                            : result === player
                                ? 'You win! You gained ' + xpAtHand + ' xp!'
                                : 'I win! You loose ' + xpAtHand + ' xp for this blunder! For shame...'
                    );

                return i.update({

                    embeds: [endEmbed],
                    components: renderBoard(true)
                });
            }

            await i.update({
                embeds: [embed],
                components: renderBoard()
            });
        });

        collector.on('end', async () => {
            await message.edit({
                components: renderBoard(true)
                
            }).catch(() => {});
        });
    }
};
