# VANDAL: JS
```text
⠀⠀⣀⣄
⠐⡗⠂⢸⡇⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⡀
⠀⡇⠀⢸⣇⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣀
⠀⡇⠀⣤⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡄
⢀⣇⣿⣧⠤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣭⣭⣭⣭⣀⣼⣿⣿
⠀⠋⣿⡿⠽⣿⣿⡿⠟⠛⠿⣿⣿⣿⣿⡇⠛⠛⢐⣶⣷⣶⣷⡾
⠀⠀⠠⢿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣯⠀⠀⠀⠀⢨⣭⣭⡍
⠀⠀⠀⠈⠻⣿⣿⣶⣤⣤⣴⣾⣿⢿⣿⠆⢤⣤⠰⠿⠿⠟
⠀⠀⠀ ⠀⠿⣿⣿⣿⣿⣿⣿⠋⠈⣿⣿⣿⣿⣿⣿⠟
⠀⠀ ⠀   ⢨⣍⡿⣿⣿⣿⣿⣿⣿⢛⣉⡁
⠀⠀ ⠀   ⠘⠻⢧⣿⣽⣽⣯⣿⣽⡼⠟⠃
⠀ ⠀⠀  ⠀   ⠻⢿⣿⣿⡿⠏
```


---

This codebase contains the JavaScript behind our Discord bot Vandal. There are two Branches:

### ```main``` Branch

The main branch contains the code that runs the Vandal discord bot.

### ```projectradioplayer``` Branch

The projectradiplayer branch contains the code that runs the Project Radio Player discord bot. The reason this code is on a
separate branch is because it relies on the npm package <code>@Discord.js/Opus</code>, which is a horribly written package we're having trouble
even getting to work properly. It only builds properly on Windows, hence the split in the codebase.

## Configuration

Both branches relies on one configuration file in the root of the project directory called <code>config.json</code> with the following structure:

```
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "vandalAdminRole": ""
}
```
<ul>
<li><code>token</code>: Contains your bot's token</li>
<li><code>clientId</code>: Contains your bot's client ID</li>
<li><code>guildId</code>: Contains the ID of a guild that you wish to use as the development guild. In the <code>main</code> branch this option will also
establish the server leveling and other rich data functions operate in.</li>
<li><code>vandalAdminRole</code>: Contains the ID of the role you would like to set as Vandal's admin role. This will eventually be compatible with onboarding through commands.</li>
</ul>
