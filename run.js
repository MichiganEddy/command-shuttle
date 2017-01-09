var readline = require('readline');
var fs = require('fs');
var execSync = require('child_process').execSync;

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '~>'
});

var Intro = function(next){
  rl.question("Want to run some functions?\n", function(ret){
  rl.prompt();
  if(ret.trim() !== 'n'){
    next();
  }else {
      rl.close();
      process.exit(0);
  }
  });
}



var run_c = function(cmd){
  execSync(cmd, { stdio: 'inherit', shell: '/bin/bash', encoding: 'utf8' });
}

var c_handler = function(commands)
{
    while(commands.length >= 0)
    {
      var cmd = commands.shift();
      console.log("Running " + cmd + ".\n");
      run_c(cmd);
    }
      console.log("Thanks, let me know if I can help again later.");
      rl.close();
      process.exit(0);

}

var f_confirm = function(contents)
{
  console.log("The file you selected contains: \n");
  console.log(contents);
  rl.question("Should I run these commands for you?", function(resp){
    if(resp.trim() !== 'n')
    {
      console.log("Okay Running Commands now. Please wait. \n");
      c_handler(contents.split('\n'));
    }
    else{
      Intro(FileN());
    }
  });
}

var getF = function(filename){
  if(fs.existsSync(filename))
  {
    console.log("The file " + filename + " exists.");
    var f_stream = fs.readFile(filename, function(err, data){
      if(err)
      {
        console.log("Error Opening File " + filename + ".\n");
        console.console.error(err.toString());
        rl.close();
        process.exit(1);
      }
      f_confirm(data.toString());
    });
  }
  else{
    console.log("Whoops, I couldn't find " + filename + ". \n");
    FileN();
  }
}


var FileN = function(next) {
    rl.question("What's the name of the file you want to use?", function(ret){
    rl.prompt();
    if(ret)
    {
    console.log("Okay, Fetching " + ret + " now");
    getF(ret);
    }
    else{
      console.log("Okay, next time");
      rl.close();
      process.exit(0);
    }

  });
}


Intro(FileN);
