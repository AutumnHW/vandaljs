const fs = require('node:fs');
function getUserData(field, userid) {
    console.log('existsSync returns' + fs.existsSync(parseUserID(userid)));
   // try {
        if (!fs.existsSync(parseUserID(userid))) {
            enrollUserData(userid);
        }
        const raw = fs.readFileSync(parseUserID(userid));
        const userObject = JSON.parse(raw);
        const data = userObject.data;
        const xp = parseInt(data.xp);
        data.level = levelCalculator(xp);
        
        //const { userObject } = 
        console.log('getUserData for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
        fs.writeFileSync(parseUserID(userid), JSON.stringify(userObject, null, 2));
        return (data[field]);
  /*}  catch (err) {
        console.log('An Exception occured at parseUserID(): ' + err.message)
        console.log('Arguments userid: ' + userid);
        throw new Error('An Exception occured' + err.message)
    }
*/
}
function getUserInfo(field, userid) {
     console.log('existsSync returns' + fs.existsSync(parseUserID(userid)));
   // try {
        if (!fs.existsSync(parseUserID(userid))) {
            enrollUserData(userid);
        }
        const raw = fs.readFileSync(parseUserID(userid));
        const userObject = JSON.parse(raw);
        const data = userObject.attributes;
        const permissions = parseInt(data.permissions);
       
        
        //const { userObject } = 
        console.log('getUserData for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);
        fs.writeFileSync(parseUserID(userid), JSON.stringify(userObject, null, 2));
        return (data[field]);
  /*}  catch (err) {
        console.log('An Exception occured at parseUserID(): ' + err.message)
        console.log('Arguments userid: ' + userid);
        throw new Error('An Exception occured' + err.message)
    }
*/

}

function parseUserID(userid) {
    //const 

    return (process.cwd() + '/modules/userdata/' + userid + '.json')



}
function enrollUserData(userid) {
    
    fs.copyFileSync(parseUserID('template'), parseUserID(userid));
    const newDataFileRaw = fs.readFileSync(parseUserID(userid));
    const newDataFile = JSON.parse(newDataFileRaw);
    console.log('new user onboarding with userid ' + userid);
    newDataFile.attributes.userid = userid;
    console.log('wrote userid ' + userid + ' to file ' + parseUserID(userid));
    console.log('reading back from file: ' + newDataFile.attributes.userid);
    fs.writeFileSync(parseUserID(userid), JSON.stringify(newDataFile, null, 2));
}
function xpAdd(userid, xptoadd){
    //xp declaration must go above file handles, as a condition is possible where
    //user runs command but is not yet enrolled in the data structure
    //todo handle recieving undefined!!!!
    xp =  getUserData('xp', userid);
    const DataFileRaw = fs.readFileSync(parseUserID(userid));
    const DataFile = JSON.parse(DataFileRaw);
    DataFile.data.xp = xp + xptoadd;
    fs.writeFileSync(parseUserID(userid), JSON.stringify(DataFile, null, 2));
    console.log('wrote userid ' + userid + ' to file ' + parseUserID(userid));
    console.log('reading back from file: ' + DataFile.data.xp);
}
function levelCalculator(xp){
    const level = Math.ceil(xp / 300);
    console.log('levelCalculator returned ' + level + "xp paramater equals " + xp);
    return level;
}
module.exports = {
    getUserData,
    getUserInfo,
    xpAdd
}
//these were here for debugging purposes, leaving them commented here bc why not, might help you
//learn how this works.

//console.log(parseUserID('template'));

