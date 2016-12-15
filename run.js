var rl = require('readline');
var fs = require('fs');
var spawn = require('child_process').spawn;

rl.setPrompt('~>');


var greeter = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
var cmdFile;
var get_file = function(){

}

greeter.on('badFile', function(){
  greeter.resume();
  console.log('did you want to enter the fileName in again?  \(enter \'y\' to try it again. Any other key to quit.\)');

});


greeter.on('line', function(resp){
    if(resp !== 'y')
    {
      console.log("Bye");
      process.exit(0);
    }
    greeter.pause();
});

var librarian = rl.createInterface({

})

librarian.on('goodfile', function(fileName)
{


});

var welcome = rl.question("Welcome, want to run some commands?", function(auth){
  console.log(auth);
});

var fileGetter = rl.question("What file should I use?", function(lrl){
    if(fs.existsSync(lrl))
    {
      confCommands(lrl);
    }
    Console.log("The file " + lrl + "does not exist");
});


wecome();
