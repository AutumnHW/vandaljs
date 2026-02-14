const fs = require('node:fs');
function getUserData(field, userid) {
    console.log('existsSync returns' + fs.existsSync(parseUserID(userid)));
   // try {
        if (!fs.existsSync(parseUserID(userid))) {
            enrollUserData(userid);
        }
        const userObject = require(parseUserID(userid));
        const data = userObject.data;
        //const { userObject } = 
        console.log('getUserData for: ' + userid + ' requesting data field: ' + field + ' returns: ' + data[field]);

        return (data[field]);
  /*}  catch (err) {
        console.log('An Exception occured at parseUserID(): ' + err.message)
        console.log('Arguments userid: ' + userid);
        throw new Error('An Exception occured' + err.message)
    }
*/
}
function getUserInfo(field, userid) {

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
function xpAdd(){

}
module.exports = {
    getUserData
}
//console.log(parseUserID('template'));

console.log(getUserData('totalxp', 'peenis'));