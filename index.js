//Init readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(question) {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

//create folder ./json if doesn't exists
const fs = require('fs');
const jsonPath = "json/";
if (!fs.existsSync(jsonPath)){
    fs.mkdirSync(jsonPath);
}

//test if creds.json exists
const credPath = "json/cred.json";
var cred = null;
if(fs.existsSync(credPath)){
    try{
        cred = JSON.parse(fs.readFileSync(credPath));
    }catch(e){}
}

//Imports
const { sendConfirmation, checkCode, refreshToken, loadBearer, getFriends } = require("./requests.js");

//Program
async function main(){
    
    if(!cred){
        cred={};
        let phoneNumber = await askQuestion("Type your phone number : ");
        sendConfirmation(phoneNumber).then(async (res)=>{
            cred.sessionInfo = res.sessionInfo;
            cred.phoneNumber = phoneNumber;
            let code = await askQuestion("Type the code you received : ");
            checkCode(cred.sessionInfo, code).then((res)=>{
                cred.idToken = res.idToken;
                cred.refreshToken = res.refreshToken;
                cred.localId = res.localId;
                executeChecks();
            });
        });
    }else{
        executeChecks();
        // try{
        //     downloadFriends(cred.bearer);
        // }catch(e){
        //     executeChecks();
        // }
    }
}
main();

function executeChecks(){
    refreshToken(cred.refreshToken).then((res1)=>{
        cred.accessTokenGoogle = res1.access_token;
        loadBearer(cred.accessTokenGoogle).then((res2)=>{
            cred.bearer = res2.access_token;
            fs.writeFileSync(credPath, JSON.stringify(cred));

            downloadFriends(cred.bearer);

        })
    });
}


const friendFolder = "friends/"
if (!fs.existsSync(friendFolder)){
    fs.mkdirSync(friendFolder);
}
function downloadFriends(bearer){
    getFriends(bearer).then((res)=>{
        res.friendsPosts.forEach((p)=>{
            //create folder for each user
            let folder = friendFolder+p.user.username;
            if (!fs.existsSync(folder)){
                fs.mkdirSync(folder);
            }
            //create file for each post
            fs.writeFileSync(folder+"/"+p.momentId+".json", JSON.stringify(p));
            //download each images
            p.posts.forEach((post)=>{
                //download post.primary.url and post.secondary.url
                download(post.primary.url, folder+"/"+post.id+"_primary.webp", ()=>{
                    console.log("downloaded "+post.id+"_primary.webp")
                });
                download(post.secondary.url, folder+"/"+post.id+"_secondary.webp", ()=>{
                    console.log("downloaded "+post.id+"_secondary.webp")
                });
                fs.writeFileSync(folder+"/"+post.id+".json", JSON.stringify(post));

                //Realmojis
                if(post.realMojis && post.realMojis.length>0){
                    console.log("downloading "+post.realMojis.length+" realmojis")
                    post.realMojis.forEach((realmoji)=>{
                        let userFolder = friendFolder+realmoji.user.username;
                        if (!fs.existsSync(userFolder)){
                            fs.mkdirSync(userFolder);
                        }
                        download(realmoji.media.url, userFolder+"/realmoji_"+realmoji.type+"_"+realmoji.id+".webp", ()=>{
                            console.log("downloaded "+realmoji.user.username+"_"+realmoji.type+" realmoji")
                        });
                        //downaldo file with extension in url
                        let url = realmoji.user.profilePicture.url;
                        let ext = url.substring(url.lastIndexOf("."));
                        download(url, userFolder+"/pfp"+ext, ()=>{
                            console.log("downloaded "+userFolder+"/pfp"+ext)
                        });
                        
                    });
                }
                
            });
            console.log("downloaded "+p.user.username);
        })
        console.log("done");
    });
}

const https = require('https');
function download(url, path, cb){
    var file = fs.createWriteStream(path);
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb); 
        });
    }).on('error', function(err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
}