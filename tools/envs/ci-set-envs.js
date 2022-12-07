const { spawnSync } = require('child_process');

console.log('-----CI-SET-ENVS-----');

spawnSync('ls -la', {
  shell: true,
  cwd: './',
  stdio: 'inherit',
});

// exec('ls -la', (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
// });

console.log('-----END CI-SET-ENVS-----');
