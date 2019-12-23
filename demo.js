MsgElem = document.getElementById("msg");
TokenElem = document.getElementById("token");
NotisElem = document.getElementById("notis");
ErrElem = document.getElementById("err");
var config = {
    apiKey: "AIzaSyCwin0aInuEYBvx_LMeCGGJ67xsCm42p18",
    authDomain: "fir-99341.firebaseapp.com",
    databaseURL: "https://fir-99341.firebaseio.com",
    storageBucket: "fir-99341.appspot.com",
    messagingSenderId: "672839583901",
    projectId:"fir-99341",
    measurementId: "G-W4XBYZY7GP",
    appId: "1:672839583901:web:0b2ab737e14e3e4e446c74"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function () {
        MsgElem.innerHTML = "Notification permission granted."
        console.log("Notification permission granted.");
        console.log(messaging.getToken());
        return messaging.getToken()
    })
    .then(function(token) {
        TokenElem.innerHTML = "token is : " + token
    })
    .catch(function (err) {
        ErrElem.innerHTML =  ErrElem.innerHTML + "; " + err
        console.log( err);
    });

messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload);
    const {title, ...options} = payload.notification;
    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
    });
});
