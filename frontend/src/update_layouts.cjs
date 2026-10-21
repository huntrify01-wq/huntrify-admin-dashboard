const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/princ/Music/huntrify-web-app/frontend/src/admin/users_management',
  'C:/Users/princ/Music/huntrify-web-app/frontend/src/admin/administration'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace root container
    content = content.replace(
      /className="p-4 md:p-6 lg:p-8 w-full max-w-\[1600px\] mx-auto flex flex-col gap-4 min-h-screen bg-transparent"/g,
      'className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent"'
    );
    content = content.replace(
      /className="p-4 md:p-6 lg:p-8 w-full max-w-\[1600px\] mx-auto flex flex-col gap-6 min-h-screen bg-transparent"/g,
      'className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent"'
    );
    content = content.replace(
      /className="p-4 pt-6 md:p-6 lg:p-8 w-full max-w-\[1600px\] mx-auto flex flex-col gap-6 min-h-screen bg-transparent"/g,
      'className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent"'
    );

    // Replace Top Header container
    content = content.replace(
      /<div className="flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4 mb-2 mt-0">/g,
      '<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">'
    );
    content = content.replace(
      /<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2 mt-0">/g,
      '<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">'
    );

    // Replace Buttons Container
    content = content.replace(
      /<div className="flex items-center gap-3 shrink-0">/g,
      '<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">'
    );

    // Make buttons span full width on mobile within the header
    content = content.replace(
      /<SecondaryButton onClick=\{([^\}]+)\}>/g,
      '<SecondaryButton onClick={$1} className="w-full sm:w-auto">'
    );
    content = content.replace(
      /<PrimaryButton onClick=\{([^\}]+)\}>/g,
      '<PrimaryButton onClick={$1} className="w-full sm:w-auto">'
    );

    fs.writeFileSync(fullPath, content, 'utf8');
  });
});
console.log('Update complete!');
