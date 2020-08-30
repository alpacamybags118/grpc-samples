const grpc = require('grpc');
const events = require('events');

function StartChatRoom(call, callback) {
    chatrooms = {
        id: call.request.chatroomname,
        users: [call.request.username],
        streams: [],
    };

    callback(null, {});
}

function JoinChatRoom(call, callback) {
    console.log(chatrooms);
    chatrooms.users.push(call.request.username);

    console.log(chatrooms);
    callback(null, {});
}

function ChatStream(stream) {
    const name =stream.metadata.get('name');
    if(chatrooms.users.find(x => x == name)) {
        chatrooms.streams.push(stream);
    }

    stream.on('data', function(message){
        const senderName = stream.metadata.get('name');
        console.log(chatrooms);
        chatrooms.streams.forEach(messageStream => {
            const receiverName = messageStream.metadata.get('name');
            console.log(receiverName);
            console.log(senderName);
            if(receiverName != senderName) {
                messageStream.write({
                    chatroomid: message.chatroomid,
                    name: message.name,
                    message : message.message
                });
            }
        });
    });
}

let chatrooms;
let streams = [];

const chatProto = grpc.load('../chat.proto');

var server = new grpc.Server();
server.addService(chatProto.ChatService.service, {
    StartChatRoom: StartChatRoom,
    ChatStream: ChatStream,
    JoinChatRoom: JoinChatRoom,
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();