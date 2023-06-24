var axios = require('axios');

async function sendConfirmation(phonenumber){

    let response = await axios.request({
        method: 'POST',
        url: 'https://us-central1-befake-623af.cloudfunctions.net/login',
        headers: {
          authority: 'us-central1-befake-623af.cloudfunctions.net',
          accept: '*/*',
          'accept-language': 'fr',
          'cache-control': 'no-cache',
          'content-type': 'text/plain;charset=UTF-8',
          dnt: '1',
          origin: 'http://192.168.1.10:3000',
          pragma: 'no-cache',
          referer: 'http://192.168.1.10:3000/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        },
        data: '{"phoneNumber":"'+phonenumber+'"}'});
    
    return response.data;
}

async function checkCode(sessionInfo, code){

    let response = await axios.request({
        method: 'POST',
        url: 'https://warm-scrubland-06418.herokuapp.com/https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber',
        params: {key: 'AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA'},
        headers: {
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            DNT: '1',
            Origin: 'http://192.168.1.10:3000',
            Pragma: 'no-cache',
            Referer: 'http://192.168.1.10:3000/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            accept: '*/*',
            'accept-language': 'en',
            'content-type': 'application/json',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-client-version': 'iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS',
            'x-firebase-client': 'apple-platform/ios apple-sdk/19F64 appstore/true deploy/cocoapods device/iPhone9,1 fire-abt/8.15.0 fire-analytics/8.15.0 fire-auth/8.15.0 fire-db/8.15.0 fire-dl/8.15.0 fire-fcm/8.15.0 fire-fiam/8.15.0 fire-fst/8.15.0 fire-fun/8.15.0 fire-install/8.15.0 fire-ios/8.15.0 fire-perf/8.15.0 fire-rc/8.15.0 fire-str/8.15.0 firebase-crashlytics/8.15.0 os-version/14.7.1 xcode/13F100',
            'x-firebase-client-log-type': '0',
            'x-firebase-locale': 'en',
            'x-ios-bundle-identifier': 'AlexisBarreyat.BeReal'
        },
        data: {
            sessionInfo: sessionInfo,
            code: code,
            operation: 'SIGN_UP_OR_IN'
        }
    });

    return response.data;
}

async function refreshToken(refreshToken){
    let response = await axios.request({
        method: 'POST',
        url: 'https://warm-scrubland-06418.herokuapp.com/https://securetoken.googleapis.com/v1/token',
        params: {key: 'AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA'},
        headers: {
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            DNT: '1',
            Origin: 'http://192.168.1.10:3000',
            Pragma: 'no-cache',
            Referer: 'http://192.168.1.10:3000/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            accept: '*/*',
            'accept-language': 'en',
            'content-type': 'application/json',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-client-version': 'iOS/FirebaseSDK/8.15.0/FirebaseCore-iOS',
            'x-firebase-client': 'apple-platform/ios apple-sdk/19F64 appstore/true deploy/cocoapods device/iPhone13,2 fire-abt/8.15.0 fire-analytics/8.15.0 fire-auth/8.15.0 fire-db/8.15.0 fire-dl/8.15.0 fire-fcm/8.15.0 fire-fiam/8.15.0 fire-fst/8.15.0 fire-fun/8.15.0 fire-install/8.15.0 fire-ios/8.15.0 fire-perf/8.15.0 fire-rc/8.15.0 fire-str/8.15.0 firebase-crashlytics/8.15.0 os-version/15.5 xcode/13F100',
            'x-firebase-client-log-type': '0',
            'x-firebase-locale': 'en',
            'x-ios-bundle-identifier': 'AlexisBarreyat.BeReal'
        },
        data: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }
    });

    return response.data;
}

async function loadBearer(accessTokenGoogle){
    let response = await axios.request({
        method: 'POST',
        url: 'https://warm-scrubland-06418.herokuapp.com/https://auth.bereal.team/token',
        params: {grant_type: 'firebase'},
        headers: {
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            DNT: '1',
            Origin: 'http://192.168.1.10:3000',
            Pragma: 'no-cache',
            Referer: 'http://192.168.1.10:3000/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        },
        data: {
            grant_type: 'firebase',
            client_id: 'android',
            client_secret: 'F5A71DA-32C7-425C-A3E3-375B4DACA406',
            token: accessTokenGoogle
        }
    });

    return response.data;
}


async function getFriends(bearer){
    let response = await axios.request({
        method: 'GET',
        url: 'https://warm-scrubland-06418.herokuapp.com/https://mobile.bereal.com/api/feeds/friends-v1',
        headers: {
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            DNT: '1',
            Origin: 'http://192.168.1.10:3000',
            Pragma: 'no-cache',
            Referer: 'http://192.168.1.10:3000/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-GPC': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            authorization: 'Bearer ' + bearer,
            'content-type': 'application/json',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    });

    return response.data;
}



module.exports = { sendConfirmation, checkCode, refreshToken, loadBearer, getFriends };