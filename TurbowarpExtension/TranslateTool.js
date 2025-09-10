// Translate Tool System Extension for TurboWarp
// by HTML5 Tools
// License: Apache License 2.0

let lastReceivedMessage;
let lastReceivedLang;

class TransLateTool{
    getInfo(){
        return {
            id: "TranslateTool",
            name: "Translate Tool System Extension",
            blocks: [
                {
                    opcode: "whenMessageReceived",
                    blockType: Scratch.BlockType.EVENT,
                    text: "メッセージが受信されたとき",
                    isEdgeActivated: false,
                },
                {
                    opcode: "getLastReceivedMessage",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "最後に受信したメッセージ",
                    disableMonitor: true
                },
                {
                    opcode: "getLastReceivedLang",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "最後に受信した言語",
                    disableMonitor: true
                },
                {
                    opcode: "splitText",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "[TEXT] を改行文字で分割",
                    disableMonitor: true,
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                        }
                    }
                },
                {
                    opcode: "sendMessage",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "メッセージ [MESSAGE] を [TYPE] で送信",
                    arguments: {
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "Hello, world!"
                        },
                        TYPE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "translatedText"
                        }
                    }
                }
            ]
        };
    }
    getLastReceivedMessage() {
        return lastReceivedMessage;
    }
    getLastReceivedLang() {
        return lastReceivedLang;
    }
    sendMessage(args){
        window.parent.postMessage({
            message: args.MESSAGE,
            type: args.TYPE
        }, '*')
    }
    splitText(args){
        return JSON.stringify(String(args.TEXT).split("\n"));
    }
}
window.addEventListener("message", function(event) {
    console.log(event.data);
    if ((event.origin === "http://127.0.0.1:3000" || event.origin == "https://translate-tool.netlify.app")) {
        lastReceivedMessage = event.data.message;
        lastReceivedLang = event.data.lang;
        Scratch.vm.runtime.startHats('TranslateTool_whenMessageReceived');
    }
});

Scratch.extensions.register(new TransLateTool());