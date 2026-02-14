const fs = require('node:fs');
function getUserData(field, userid) {
    console.log('existsSync returns' + fs.existsSync(getUserDataPath(userid)));
    // try {
    if (!fs.existsSync(getUserDataPath(userid))) {
        enrollUserData(userid);
    }
    const raw = fs.readFileSync(getUserDataPath(userid));
    const userObject = JSON.parse(raw);
    const data = userObject.data;
    const xp = parseInt(data.xp);
    const oldLevel = parseInt(data.level);
    data.level = levelCalculator(xp, oldLevel);
    if (data.level > 9) {
        data.sentinel = 1;
    } else { data.sentinel = 0 }

    //const { userObject } = 
    console.log('getUserData for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(userObject, null, 2));
    return (data[field]);
    /*}  catch (err) {
          console.log('An Exception occured at getUserDataPath(): ' + err.message)
          console.log('Arguments userid: ' + userid);
          throw new Error('An Exception occured' + err.message)
      }
  */
}
function getUserInfo(field, userid) {
    console.log('existsSync returns' + fs.existsSync(getUserDataPath(userid)));
    // try {
    if (!fs.existsSync(getUserDataPath(userid))) {
        enrollUserData(userid);
    }
    const raw = fs.readFileSync(getUserDataPath(userid));
    const userObject = JSON.parse(raw);
    const data = userObject.attributes;
    const permissions = parseInt(data.permissions);


    //const { userObject } = 
    console.log('getUserInfo for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(userObject, null, 2));
    return (data[field]);
    /*}  catch (err) {
          console.log('An Exception occured at getUserDataPath(): ' + err.message)
          console.log('Arguments userid: ' + userid);
          throw new Error('An Exception occured' + err.message)
      }
  */

}

function getUserDataPath(userid) {
    //const 

    return (process.cwd() + '/modules/userdata/' + userid + '.json')



}
function enrollUserData(userid) {

    fs.copyFileSync(getUserDataPath('template'), getUserDataPath(userid));
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
    DataFile.data.xp = xp + xptoadd;
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
    DataFile.data.xp = calculateXPByLevel(targetLevel);
    DataFile.data.level = targetLevel;
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.xp);
}
//xpClear(userid): userid: id of the user you would like to clear xp for.
function xpClear(userid) {
    //xp declaration must go above file handles, as a condition is possible where
    //user runs command but is not yet enrolled in the data structure
    //todo handle recieving undefined!!!!
    xp = getUserData('xp', userid);
    const DataFileRaw = fs.readFileSync(getUserDataPath(userid));
    const DataFile = JSON.parse(DataFileRaw);
    DataFile.data.xp = 0
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.xp);
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
    fs.writeFileSync(getUserDataPath(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + getUserDataPath(userid));
    console.log('reading back from file: ' + DataFile.data.totalmsgs);
}
function levelCalculator(xp, oldlevel) {
        const level = Math.floor(xp / (300 * (1 + (0.04 * oldlevel))));
        console.log('levelCalculator returned ' + level + "xp paramater equals " + xp);
        return level;
    }
function calculateXPByLevel(levelToSet){
        return Math.floor(levelToSet * (300 * (1 + (0.04 * levelToSet))));;
}
module.exports = {
    getUserData,
    getUserInfo,
    msgAdd,
    authenticateUser,
    setLevel,
    xpClear,
    xpAdd
}
//these were here for debugging purposes, leaving them commented here bc why not, might help you
//learn how this works.



