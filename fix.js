const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');
fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).forEach(file => {
  const p = path.join(dir, file);
  let c = fs.readFileSync(p, 'utf8');
  let newC = c.replace(/className="py-28 /g, 'className="py-16 md:py-28 ').replace(/className="py-24 /g, 'className="py-16 md:py-24 ');
  if (c !== newC) {
    fs.writeFileSync(p, newC);
    console.log('Fixed ' + file);
  }
});
