var grpc = require('grpc');

var catsProto = grpc.load('../cats.proto');

var client = new catsProto.CatService('127.0.0.1:50051', 
  grpc.credentials.createInsecure());

const action = process.argv.slice(2);

switch(action[0]) {
  case 'add':
    client.addCat({name: action[1], type: action[2]}, function(error, empty) {
      console.log('added cat');
    });
    break;
  case 'get':
    client.getCat(action[1], function(error, cats) {
      if (error)
        console.log(error.message);
      else
        console.log(cats);
    });
    break;
  case 'list':
    client.getCats({}, function(error, cats) {
      if (error)
        console.log(error.message);
      else
        console.log(cats);
    });
    break;
}


