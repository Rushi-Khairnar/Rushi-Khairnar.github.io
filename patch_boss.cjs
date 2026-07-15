const fs = require('fs');
let code = fs.readFileSync('src/components/BossFightModal.tsx', 'utf8');

code = code.replace("animate={{ width: \\`\\${bossHealth}%\\` }}", "animate={{ width: `${bossHealth}%` }}");

fs.writeFileSync('src/components/BossFightModal.tsx', code);
