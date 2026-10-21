const fs = require('fs');
const path = require('path');

const config = {
  'admin/users_management/reports_flags.jsx': { title: 'Reports & Flags', desc: 'Manage user reports and flagged content.', icon: 'ri-flag-2-line', isSimple: true },
  'admin/users_management/user_segments.jsx': { title: 'User Segments', desc: 'Manage user cohorts and behavioral segments.', icon: 'ri-bubble-chart-line', isSimple: true },
  'admin/users_management/user_details.jsx': { title: 'User Details', desc: 'View and edit specific user information.', icon: 'ri-id-card-line', isSimple: true },
  'admin/users_management/data_export.jsx': { title: 'Data Export', desc: 'Create custom data exports and view your export history.', icon: 'ri-download-cloud-line', isSimple: false },
  'admin/users_management/overview.jsx': { title: 'Users Overview', desc: 'View key metrics and growth of your user base.', icon: 'ri-dashboard-2-line', isSimple: false },
  'admin/users_management/all_users.jsx': { title: 'All Users', desc: 'Manage all users across the platform.', icon: 'ri-group-line', isSimple: false },
  'admin/users_management/verification_kyc.jsx': { title: 'Verification & KYC', desc: 'Manage user identity verification and KYC requests.', icon: 'ri-id-card-line', isSimple: false },
  'admin/users_management/suspended_restricted.jsx': { title: 'Suspended & Restricted', desc: 'Manage accounts with restricted access or suspensions.', icon: 'ri-user-unfollow-line', isSimple: false },
  'admin/administration/team_members.jsx': { title: 'Team Management', desc: 'Manage your admin team, roles, permissions and activity.', icon: 'ri-user-settings-line', isSimple: false }
};

const headerTemplate = (info) => `      {/* Top Header */}
      <div className="flex items-center gap-4 mb-2 mt-0">
        <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm">
          <i className="${info.icon}" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headingA text-text-main">${info.title}</h1>
          <p className="text-sm text-text-sec mt-0.5">${info.desc}</p>
        </div>
      </div>`;

for (const [relPath, info] of Object.entries(config)) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  if (info.isSimple) {
    const compName = info.title.replace(/ & | /g, '');
    const content = `import React from 'react';

const ${compName} = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full flex flex-col gap-4 min-h-screen bg-transparent">
${headerTemplate(info)}
      <p className="text-text-sec mt-4">${info.title} content coming soon...</p>
    </div>
  );
};

export default ${compName};
`;
    fs.writeFileSync(fullPath, content);
    console.log('Updated simple page: ' + relPath);
  } else {
    // For complex pages, we need to read and replace the top part
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace the main wrapper div
    content = content.replace(
      /<div className="p-[^"]*">/i, 
      '<div className="p-4 md:p-6 lg:p-8 w-full flex flex-col gap-4 min-h-screen bg-transparent">'
    );
    
    // Data export special replace
    if (relPath.includes('data_export')) {
        content = content.replace(
            /<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">[\s\S]*?<p className="text-sm text-text-sec">Create custom data exports and view your export history\.<\/p>\s*<\/div>/,
            headerTemplate(info)
        );
        content = content.replace(
          /<div className="p-6 md:p-8 max-w-\[1600px\] mx-auto flex flex-col gap-6 min-h-screen">/,
          '<div className="p-4 md:p-6 lg:p-8 w-full flex flex-col gap-4 min-h-screen bg-transparent">'
        );
    } else if (relPath.includes('team_members')) {
        content = content.replace(
            /<div>\s*<div className="text-sm text-text-sec font-medium">[\s\S]*?<\/p>\s*<\/div>/,
            headerTemplate(info)
        );
    } else {
        // generic replace for others
        // typically they have:
        // <div>
        //   <div className="text-sm ... breadcrumbs ...</div>
        //   <div className="flex items-end justify-between ...
        //     <div>
        //       <h1...
        //       <p...
        //     </div>
        //     ... buttons ...
        content = content.replace(
            /<div>\s*<div className="text-sm text-text-sec font-medium">.*?<\/div>\s*<div className="flex flex-wrap md:flex-nowrap items-start md:items-end justify-between gap-4">.*?<h1.*?<\/h1>.*?<p.*?>.*?<\/p>\s*<\/div>/s,
            headerTemplate(info) + '\n      <div className="flex items-center justify-end gap-3 w-full">'
        );
        // Wait, the above regex might break the buttons if they are inside the flex wrap.
        // Let's use a more targeted replacement per file later if this fails.
    }
    
    fs.writeFileSync(fullPath, content);
    console.log('Processed ' + relPath);
  }
}
