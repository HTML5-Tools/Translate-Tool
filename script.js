const resultText = document.getElementById('resultText');
const toJaBtn = document.getElementById('toJaBtn');
const toEnBtn = document.getElementById('toEnBtn');
const inputText = document.getElementById('inputText');
const iframe = document.querySelector("#TransSys");
const loading = document.querySelector("#loading");

function enableInputs(){
    resultText.removeAttribute("hidden");
    toJaBtn.removeAttribute("hidden");
    toEnBtn.removeAttribute("hidden");
    inputText.removeAttribute("hidden");
    loading.setAttribute("hidden", true);
}

window.addEventListener('message', function(event) {
    console.log('メッセージを受け取りました:');
    console.log(event.data);
    console.log(JSON.stringify(event.data));
    if ((event.origin == 'http://127.0.0.1:3000' || event.origin === 'https://translate-tool.netlify.app') && event.data.type == "translatedText") {
        console.log('翻訳結果:', event.data.message);
        resultText.value = event.data.message;
    }
    if ((event.origin == 'http://127.0.0.1:3000' || event.origin === 'https://translate-tool.netlify.app') && event.data.type == "TSstat"){
        console.log("翻訳システムステータス:", event.data.message);
        enableInputs();
    }
});
function translate(text, lang) {
    const message = {
        message: text,
        lang: lang
    };
    iframe.contentWindow.postMessage(message, "*");
}

toJaBtn.addEventListener('click', function() {
    translate(inputText.value, 'ja');
    resultText.value = 'お待ちください...';
});
toEnBtn.addEventListener('click', function() {
    translate(inputText.value, 'en');
    resultText.value = 'お待ちください...';
});