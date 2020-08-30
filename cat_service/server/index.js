const grpc = require('grpc');

let cats = [{
    id: 1,
    name: 'grayson',
    type: 'short-hair',
}, {
    id: 2,
    name: 'shikitty',
    type: 'savannah',
}];


function getCats(call, callback) {
    callback(null, cats);
}

function getCat(call, callback) {
    const cat = cats.find(x => x.name == call.request.name);

    if(!cat) {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    }
    else {
        callback(null, cat);
    }
    
}

function addCat(call, callback) {
    cats.push({
        id: cats.slice(-1)[0].id,
        name: call.request.name,
        type: call.request.type,
    });

    callback(null, {});
}

function main() {
    const catsProto = grpc.load('../cats.proto');
    const server = new grpc.Server();

    server.addService(catsProto.CatService.service, {
        getCats: getCats,
        getCat: getCat,
        addCat: addCat,
    });
    
    server.bind('0.0.0.0:50051',
        grpc.ServerCredentials.createInsecure());

    server.start();
}

main();