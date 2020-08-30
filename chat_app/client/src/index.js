const grpc = require('grpc');
const readline = require("readline");

const chatProto = grpc.load('../chat.proto');
const client = new chatProto.ChatService('localhost:50051',
                                        grpc.credentials.createInsecure());

const action = process.argv[2];

switch(action) {
    case 'create':
        client.startChatRoom({chatroomname: process.argv[3], username: process.argv[4]}, function(error, empty) {
            if(error) {
                console.log(error.message);
            }
            else {
                console.log("joined chat");
            }
        });
        break;
    case 'join':
        client.joinChatRoom({chatroomid: process.argv[3], username: process.argv[4]}, function(error, empty) {
            if(error) {
                console.log(error.message);
            }
            else {
                console.log("joined chat");
            }
        });
        break;
    case 'chat':
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        const chatroomid = process.argv[3];
        const name = process.argv[4];
        var metadata = new grpc.Metadata();
        metadata.add('name', name);
        const call = client.ChatStream(metadata);
    
        call.on('data', function(ChatMessage) {
            console.log(`${ChatMessage.name}: ${ChatMessage.message}`);
        });
        call.on('end', function() {
        console.log('Server ended call');
        });
        call.on('error', function(e) {
            console.log(e);
        });
    
        rl.on("line", function(line) {
        if (line === "quit") {
            call.end();
            rl.close();
        } else {
            call.write({
            chatroomid: chatroomid,
            name: name,
            message : line
        });
        }
        });
}






console.log('Enter your messages below:');