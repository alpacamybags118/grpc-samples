# chat_app

A hacky implementation of grpc's bi-directional streaming in Javascript. A simple chat app where n users can join a chatroom and chat with each other.

The flow of using this app is the following:

1. Someone makes a chatroom
2. n number of users can then join that chatroom
3. A client initiates the chat client and sends messages that others in the chatroom can see.

## Server
To start the server, run `npm start`

## Client
### Step 1 - Creating a chatroom

To create a chatroom, run `npm run start create {chatroomname} {username}`

e.g.: `npm run start mychatroom usera`


### Step 2 - Join the chatroom

Other clients can join a chatroom by running `npm run start join {chatroomname} {username}`

e.g.: `npm run start join mychatroom userb`

### Step 3 - Starting a chat

To start/join a chat, run `npm run start chat {chatroomid} {username}`

Once joined, enter a message and press enter. new messages will appear on the terminal as users send messages.