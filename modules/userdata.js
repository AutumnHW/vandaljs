const fs = require('node:fs');
/*getUserData and getUserInfo are separated for one reason, getUserInfo is for attributes about a user.
 Username, join date, permissions level, etc. getUserData is for actively updated leveling attributes like XP and Level.
*/
function getUserData(field, userid) {
    //console.log('existsSync returns' + fs.existsSync(getUserDataPath(userid)));
    if (!fs.existsSync(getUserDataPath(userid))) {
        enrollUserData(userid);
    }
    const raw = fs.readFileSync(getUserDataPath(userid));
    const userObject = JSON.parse(raw);
    const data = userObject.data;
    console.log('getUserData for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(userObject, null, 2));
    return (data[field]);
}
function getUserInfo(field, userid) {
    //console.log('existsSync returns' + fs.existsSync(getUserDataPath(userid)));
    if (!fs.existsSync(getUserDataPath(userid))) {
        enrollUserData(userid);
    }
    const raw = fs.readFileSync(getUserDataPath(userid));
    const userObject = JSON.parse(raw);
    const data = userObject.attributes;
    console.log('getUserInfo for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(userObject, null, 2));
    return (data[field]);
}
//hardcoding this FOR NOW! Eventually this will either be read from a config file or happen during guild onboarding when the bot is setup.
function getUserDataPath(userid) {
    const guildDataPath = process.cwd() + '/modules/userdata/servers/' + '1273225452915396670' + '/'
    if (!fs.existsSync(guildDataPath)) {
        fs.mkdirSync(guildDataPath);
    }
    return (guildDataPath + userid + '.json')
}
function enrollUserData(userid) {
    fs.copyFileSync(process.cwd() + '/modules/userdata/template.json', getUserDataPath(userid));
    const newDataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const newDataFile = JSON.parse(newDataFileRaw);
    console.log('new user onboarding with userid ' + userid);
    newDataFile.attributes.userid = userid;
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + newDataFile.attributes.userid);
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(newDataFile, null, 2));
}
function xpAdd(userid, xptoadd) {
    //xp declaration must go above file handles, as a condition is possible where
    //user runs command but is not yet enrolled in the data structure
    //todo handle recieving undefined!!!!
    xp = getUserData('xp', userid);
    const DataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const DataFile = JSON.parse(DataFileRaw);
    const level = DataFile.data.level;
    DataFile.data.xp = xp + xptoadd;
    DataFile.data.level = levelFromXP(xp + xptoadd);
    if (levelFromXP(xp + xptoadd) < 10) {
        DataFile.data.sentinel = 0

    } else {
        DataFile.data.sentinel = 1
    }
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));

    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.xp);
}
function setLevel(userid, levelToSet) {
    //xp declaration must go above file handles, as a condition is possible where
    //user runs command but is not yet enrolled in the data structure
    //todo handle recieving undefined!!!!
    //todo make enrollment not jank
    xp = getUserData('xp', userid);
    const targetLevel = parseInt(levelToSet);
    const DataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const DataFile = JSON.parse(DataFileRaw);
    DataFile.data.xp = xpRequiredForLevel(targetLevel);
    DataFile.data.level = targetLevel;
    if (levelToSet < 10) {
        DataFile.data.sentinel = 0

    } else {
        DataFile.data.sentinel = 1
    }
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.xp);
}
//xpClear(userid): userid: id of the user you would like to clear xp for.
function xpClear(userid) {
    const xp = getUserData('xp', userid)
    xpAdd(userid, -(xp))
}

function authenticateUser(userid) {
    if (getUserInfo('permissions', userid) >= 1) {
        return true;
    } else {
        return false;
    }
}
function msgAdd(userid, msgtoadd) {
    msgs = getUserData('totalmsgs', userid);
    xp = getUserData('xp', userid);
    xptoadd = Math.ceil(Math.random() * 10)
    const DataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const DataFile = JSON.parse(DataFileRaw);
    DataFile.data.totalmsgs = msgs + msgtoadd;
    DataFile.data.xp = xp + xptoadd;
    DataFile.data.level = levelFromXP(xp + xptoadd);
    if (levelFromXP(xp + xptoadd) < 10) {
        DataFile.data.sentinel = 0

    } else {
        DataFile.data.sentinel = 1
    }
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.totalmsgs);
}
//todo: im tired of working on this today, remove this..!
/* 02-15: done!
function levelCalculator(xp, oldlevel) {
        return levelFromXP(xp);
    }
*/
function calculateXPByLevel(levelToSet) {
    return Math.ceil(levelToSet * (300 * (1 + (0.04 * levelToSet))));;
}
function newSuperUser(userid) {
    const DataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const DataFile = JSON.parse(DataFileRaw);
    DataFile.attributes.permissions = 2
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));

}
function levelFromXP(totalXP) {
    let level = 0;
    while (totalXP >= xpRequiredForLevel(level + 1)) {
        level++;
    }
    return level;
}
function xpRequiredForLevel(level) {
    const baseXP = 300;
    const growthFactor = 1.04; // 4% more XP per level
    let xpNeeded = 0;

    for (let i = 1; i <= level; i++) {
        xpNeeded += Math.floor(baseXP * Math.pow(growthFactor, i - 1));
    }

    return xpNeeded;
}
module.exports = {
    getUserData,
    getUserInfo,
    msgAdd,
    authenticateUser,
    setLevel,
    xpClear,
    xpAdd,
    newSuperUser
}
//these were here for debugging purposes, leaving them commented here bc why not, might help you
//learn how this works.



