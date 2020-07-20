const exec = require('child_process').exec

const child = exec('deploy.bat', (error, stdout, stderr) => {
  console.log(`${stdout}`)
  console.log(`${stderr}`)
  if (error !== null) {
    console.log(`exec error: ${error}`)
  }
})

function onExit () {
  console.log('Process Exit')
  child.kill('SIGINT')
  process.exit(0)
}

process.on('exit', onExit)
