const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('C:/Users/princ/Music/huntrify-web-app/frontend/src/admin');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('truncate')) {
    const oldStr = 'text-[12px] font-bold text-text-sec uppercase tracking-wider truncate';
    const newStr = 'text-[12px] font-bold text-text-sec uppercase tracking-wider leading-tight line-clamp-2';
    if (content.includes(oldStr)) {
      console.log('Replacing in', f);
      content = content.replace(new RegExp(oldStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g'), newStr);
      fs.writeFileSync(f, content, 'utf8');
    }
  }
});
console.log('Done!');
