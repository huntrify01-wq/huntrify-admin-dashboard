import React from 'react';
import PrimaryButton from '../components/button/PrimaryButton';
import BlackPrimaryButton from '../components/button/BlackPrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';
import ButtonWithIcon from '../components/button/ButtonWithIcon';
import OnlyIconButton from '../components/button/OnlyIconButton';
import Input from '../components/form_components/Input';
import EmailInput from '../components/form_components/EmailInput';
import PasswordInput from '../components/form_components/PasswordInput';
import PhoneInput from '../components/form_components/PhoneInput';
import Selector from '../components/form_components/Selector';
import TextArea from '../components/form_components/TextArea';
import ToggleSwitch from '../components/form_components/ToggleSwitch';
import MultiSelect from '../components/form_components/MultiSelect';
// import FeedPostCard from '../components/socialfeed/FeedPostCard';   // TODO: create
// import StoryThumbnail from '../components/socialfeed/StoryThumbnail'; // TODO: create
// import CommentItem from '../components/socialfeed/CommentItem';        // TODO: create
import FileUpload from '../components/form_components/FileUpload';
import RichTextEditor from '../components/form_components/RichTextEditor';
import SearchBar from '../components/form_components/SearchBar';
import SearchSuggestionBox from '../components/form_components/SearchSuggestionBox';
import RangeSelector from '../components/ui/RangeSelector';
import NotificationItem from '../components/ui/NotificationItem';
import ChatBubble from '../components/chat_components/ChatBubble';
import ChatListItem from '../components/chat_components/ChatListItem';
import ChatInput from '../components/chat_components/ChatInput';
import MessageActions from '../components/chat_components/MessageActions';
import OnlineStatusPicker from '../components/chat_components/OnlineStatusPicker';
import AttachmentPreview from '../components/chat_components/AttachmentPreview';
import CheckboxCard from '../components/form_components/CheckboxCard';
import Checkbox from '../components/form_components/Checkbox';
import Radio from '../components/form_components/Radio';
import CheckboxCardWithIcon from '../components/form_components/CheckboxCardWithIcon';
import CheckboxCardWithEmoji from '../components/form_components/CheckboxCardWithEmoji';
import CheckboxCardWithNumber from '../components/form_components/CheckboxCardWithNumber';
import CheckboxCardWithAvatar from '../components/form_components/CheckboxCardWithAvatar';
import OTPBox from '../components/OTPBox';
import MainLoader from '../components/mainloader';
import DottedLinesCard from '../components/card/dottedlinescard';
import ThemeToggle from '../components/themetoggle';
import AnimatedIcon from '../components/animated_icon';

// Dashboard & Analytics
import StatWidget from '../components/dashboard/StatWidget';
import ChartWrapper from '../components/dashboard/ChartWrapper';
import DataTable from '../components/dashboard/DataTable';
import LogViewer from '../components/dashboard/LogViewer';


// New UI Components
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { showToast } from '../components/ui/Toast';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Drawer from '../components/ui/Drawer';
import CodeTag from '../components/ui/CodeTag';
import InfoBanner from '../components/ui/InfoBanner';


const ComponentsPage: React.FC = () => {
  // State for overlay components
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Floating Theme Toggle (Pinned Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[9999] shadow-lg rounded-full">
        <ThemeToggle />
      </div>
      
      <div className="bg-bg p-6 md:p-12 font-sans selection:bg-primary selection:text-white pb-32">
        <div className="max-w-7xl mb-12 border-b border-border-main pb-6">
          <h1 className="text-4xl font-bold font-headingA text-text-main">
            Platform UI Components
          </h1>
          <p className="text-text-sec mt-2 text-sm">Development only. Use file names below to import in your code.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 md:gap-10 items-start">
          
          {/* Left Column: Components */}
          <div className="flex flex-col w-full lg:w-2/3 gap-8 md:gap-10">
          
          {/* Core UI Atoms & Feedback Section */}
          <div className="flex flex-col gap-4 md:gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Core UI Atoms & Feedback</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Avatars */}
              <div>
                <CodeTag className="mb-3">Avatar.tsx</CodeTag>
                <div className="flex items-center gap-4">
                  <Avatar src="https://i.pravatar.cc/150?img=11" size="xl" />
                  <Avatar src="https://i.pravatar.cc/150?img=32" size="lg" shape="square" />
                  <Avatar fallback="KS" size="md" />
                  <Avatar fallback="U" size="sm" />
                </div>
              </div>

              {/* Badges & Tags */}
              <div className="flex flex-col gap-6">
                <div>
                  <CodeTag className="mb-3">Badge.tsx</CodeTag>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="success">Verified</Badge>
                    <Badge variant="warning">Pending</Badge>
                    <Badge variant="danger">Suspended</Badge>
                    <Badge variant="outline">Label</Badge>
                  </div>
                </div>
                <div>
                  <CodeTag className="mb-3">CodeTag.tsx</CodeTag>
                  <div className="flex flex-wrap items-center gap-3">
                    <CodeTag size="sm">v1.2.0</CodeTag>
                    <CodeTag size="md" iconName="ri-code-line">react-router</CodeTag>
                    <CodeTag size="lg" iconName="ri-command-line">npm install</CodeTag>
                  </div>
                </div>
              </div>

              {/* Progress, Tooltip & Banner */}
              <div className="flex flex-col gap-6">
                <div>
                  <CodeTag className="mb-3">ProgressBar.tsx</CodeTag>
                  <div className="mt-2">
                    <ProgressBar progress={85} showLabel />
                  </div>
                </div>
                <div>
                  <CodeTag className="mb-3">InfoBanner.tsx</CodeTag>
                  <div className="mt-2">
                    <InfoBanner icon="ri-lock-2-line">
                      Your data is encrypted and stored securely. We respect your <span className="text-primary dark:text-[#a594fd] font-medium cursor-pointer hover:underline">privacy</span>.
                    </InfoBanner>
                  </div>
                </div>
                <div>
                  <CodeTag className="mb-3">Tooltip.tsx</CodeTag>
                  <div className="mt-2">
                    <Tooltip content="This is a smart AI feature">
                      <div className="inline-flex items-center gap-2 cursor-help text-text-main bg-bg px-4 py-2 rounded-lg border border-border-main">
                        <i className="ri-robot-2-line text-primary" />
                        Hover over me
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Skeletons & Overlays */}
              <div className="flex flex-col gap-6">
                <div>
                  <CodeTag className="mb-3">SkeletonLoader.tsx</CodeTag>
                  <div className="flex items-center gap-3 mt-2">
                    <SkeletonLoader shape="circle" className="w-12 h-12" />
                    <div className="flex flex-col gap-2 flex-1">
                      <SkeletonLoader shape="rect" className="h-4 w-3/4" />
                      <SkeletonLoader shape="rect" className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <CodeTag className="mb-3">Modal, Drawer & Toast.tsx</CodeTag>
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-wrap gap-3">
                      <PrimaryButton onClick={() => setIsModalOpen(true)}>Open Modal</PrimaryButton>
                      <BlackPrimaryButton onClick={() => setIsModalOpen(true)}>Dark Modal</BlackPrimaryButton>
                      <SecondaryButton onClick={() => setIsDrawerOpen(true)}>Open Drawer</SecondaryButton>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-border-main">
                      <SecondaryButton onClick={() => showToast({ title: 'Profile Updated', variant: 'success' })}>Success Toast</SecondaryButton>
                      <SecondaryButton onClick={() => showToast({ title: 'Verification Failed', description: 'Face mismatch detected.', variant: 'error' })}>Error Toast</SecondaryButton>
                      <SecondaryButton onClick={() => showToast({ title: 'New Message Received', variant: 'info' })}>Info Toast</SecondaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Basic Inputs Section */}
        <div className="flex flex-col gap-4 md:gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Basic Inputs</h3>
          
          <div className="flex flex-col gap-6">
            <div>
              <CodeTag className="mb-3">Checkbox.tsx</CodeTag>
              <div className="flex flex-col gap-3">
                <Checkbox label="Remember me" defaultChecked />
                <Checkbox 
                  label="I agree to the Terms and Conditions" 
                  description="By checking this box, you confirm that you have read and agree to our Terms of Service and Privacy Policy."
                />
                <Checkbox label="Subscribe to newsletter" />
              </div>
            </div>

            <div className="border-t border-border-main pt-6">
              <CodeTag className="mb-3">Radio.tsx</CodeTag>
              <div className="flex flex-col gap-3">
                <Radio name="plan" label="Monthly billing" description="$10 per month, billed monthly." defaultChecked />
                <Radio name="plan" label="Annual billing (Save 20%)" description="$96 per year, billed annually." />
                <Radio name="plan" label="Enterprise Custom Plan" />
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox Cards Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Checkbox Cards</h3>
          
          <div className="flex flex-col gap-8">
            <div>
              <CodeTag className="mb-3">CheckboxCard.tsx</CodeTag>
              <CheckboxCard 
                title="Remember my device" 
                description="Skip login for 30 days on this device."
                defaultChecked
              />
            </div>

            <div>
              <CodeTag className="mb-3">CheckboxCardWithIcon.tsx</CodeTag>
              <CheckboxCardWithIcon 
                icon="ri-stack-line"
                title="Basic plan"
                badge="Limited time only"
                price="$10/month"
                description="Includes up to 10 users, 20 GB individual data and access to all features."
                defaultChecked
              />
            </div>

            <div>
              <CodeTag className="mb-3">CheckboxCardWithEmoji.tsx</CodeTag>
              <CheckboxCardWithEmoji 
                emoji="🚀"
                title="Enable Turbo Mode"
                description="Get the fastest performance possible for your builds."
              />
            </div>

            <div>
              <CodeTag className="mb-3">CheckboxCardWithNumber.tsx</CodeTag>
              <CheckboxCardWithNumber 
                number={1}
                title="Connect your account"
                description="Link your Github or Gitlab account to sync repositories."
              />
            </div>

            <div>
              <CodeTag className="mb-3">CheckboxCardWithAvatar.tsx</CodeTag>
              <CheckboxCardWithAvatar 
                avatarUrl="https://i.pravatar.cc/150?img=47"
                title="Olivia Rhye"
                handle="@olivia"
                role="Product Manager, Integrations"
              />
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Cards</h3>
          
          <div className="flex flex-col gap-8">
            <div>
              <CodeTag className="mb-3">dottedlinescard.tsx</CodeTag>
              <DottedLinesCard className="min-h-[160px] flex items-center justify-center text-text-sec">
                <div className="flex flex-col items-center gap-2">
                  <i className="ri-layout-masonry-line text-2xl" />
                  <p>Flexible Content Area</p>
                </div>
              </DottedLinesCard>
            </div>
          </div>
        </div>

        {/* Loaders Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Loaders</h3>
          
          <div>
            <CodeTag className="mb-3">mainloader.tsx</CodeTag>
            <div className="flex items-center justify-center gap-10 py-4">
              <MainLoader size={48} />
              <MainLoader size={32} className="text-[#25D366]" />
              <MainLoader size={24} className="text-text-sec" />
            </div>
          </div>
        </div>

          {/* Authentication & OTP Section */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Authentication & Verification</h3>
            
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
                <div className="flex flex-col gap-4">
                  <CodeTag className="mb-1">OTPBox.tsx (6-digit Email Mode)</CodeTag>
                  <OTPBox 
                    length={6} 
                    method="email" 
                    targetValue="alex@huntrify.com"
                    onComplete={(otp) => console.log('OTP Complete:', otp)} 
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <CodeTag className="mb-1">OTPBox.tsx (4-digit Phone Mode)</CodeTag>
                  <OTPBox 
                    length={4} 
                    method="phone" 
                    targetValue="+91 98765 43210"
                    onComplete={(otp) => console.log('OTP Complete:', otp)} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search & Discovery Section */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Search & Discovery</h3>
            
            <div className="flex flex-col gap-12 w-full max-w-2xl mx-auto py-4">
              
              <div className="flex flex-col gap-4">
                <CodeTag>SearchBar.tsx</CodeTag>
                <div className="flex flex-col gap-6">
                  <SearchBar placeholder="Search jobs, companies, or skills..." />
                  
                  {/* Loading state variant */}
                  <SearchBar 
                    placeholder="Searching..." 
                    value="Senior React"
                    onChange={() => {}}
                    isLoading={true} 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <CodeTag>SearchSuggestionBox.tsx (Dropdown)</CodeTag>
                <p className="text-sm text-text-sec -mt-2">Below is the standalone suggestion box. It's meant to be positioned absolutely below the SearchBar.</p>
                <div className="relative">
                  <SearchBar value="des" onChange={() => {}} />
                  <SearchSuggestionBox 
                    isVisible={true}
                    recentSearches={['Frontend Developer', 'UI/UX Designer', 'React Native']}
                    suggestions={[
                      { id: 1, label: 'Graphic Designer', category: 'Roles', icon: 'ri-palette-line' },
                      { id: 2, label: 'Product Designer', category: 'Roles', icon: 'ri-shape-2-line' },
                      { id: 3, label: 'Design System', category: 'Skills', icon: 'ri-tools-line' },
                    ]}
                    onSelect={(s) => console.log('Selected:', s)}
                    className="relative top-2 shadow-sm border-border-main/50" // overridden absolute positioning for static display in preview
                  />
                </div>
              </div>

            </div>
          </div>

        {/* Social Feed Section — TODO: create FeedPostCard, StoryThumbnail, CommentItem */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-dashed border-border-main rounded-xl bg-surface/50 opacity-60">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Social Feed <span className="text-sm font-normal text-text-sec">(components coming soon)</span></h3>
            <p className="text-sm text-text-sec">FeedPostCard, StoryThumbnail, CommentItem — not yet created.</p>
          </div>

          {/* Form Elements Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Form Elements</h3>
          
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <CodeTag className="mb-3">Input.tsx</CodeTag>
                <Input label="Full Name" placeholder="Enter your name" />
              </div>
              
              <div>
                <CodeTag className="mb-3">EmailInput.tsx</CodeTag>
                <EmailInput placeholder="you@company.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <CodeTag className="mb-3">PasswordInput.tsx</CodeTag>
                <PasswordInput label="New Password" placeholder="Enter password" />
              </div>
              
              <div className="flex flex-col justify-end">
                <PasswordInput label="Confirm Password" placeholder="Repeat password" showStrength={false} />
              </div>
            </div>

            {/* Phone Input Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <CodeTag className="mb-3">PhoneInput.tsx (Live Validation)</CodeTag>
                <PhoneInput label="Mobile Number" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <CodeTag className="mb-3">Selector.tsx</CodeTag>
                <Selector 
                  label="Account Type" 
                  placeholder="Select an account type"
                  options={[
                    { label: 'Candidate', value: 'candidate', icon: 'ri-user-line' },
                    { label: 'Hiring Partner', value: 'partner', icon: 'ri-briefcase-line' },
                    { label: 'Agency', value: 'agency', icon: 'ri-building-line' },
                  ]}
                />
              </div>
              <div className="flex flex-col justify-end">
                <Selector 
                  label="Experience Level" 
                  placeholder="Select experience"
                  options={[
                    { label: 'Entry Level (0-2 Yrs)', value: 'entry', icon: 'ri-seedling-line' },
                    { label: 'Mid Level (3-5 Yrs)', value: 'mid', icon: 'ri-rocket-line' },
                    { label: 'Senior (5+ Yrs)', value: 'senior', icon: 'ri-star-line' },
                  ]}
                />
              </div>
            </div>

            {/* Range Selector */}
            <div className="border-t border-border-main pt-6 mt-2">
              <CodeTag className="mb-3">RangeSelector.tsx</CodeTag>
              <div className="w-full max-w-md">
                <RangeSelector
                  min={0}
                  max={100}
                  step={5}
                  defaultValue={[20, 60]}
                  label="Salary Range"
                  description="Select your desired salary range"
                  iconName="ri-money-dollar-circle-line"
                  formatLabel={(val) => `₹${val} LPA`}
                />
              </div>
            </div>

            {/* Advanced Inputs */}
            <div className="border-t border-border-main pt-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <CodeTag className="mb-3">TextArea.tsx</CodeTag>
                <TextArea 
                  label="Bio / Description" 
                  placeholder="Tell us a little about yourself..."
                  maxLength={500}
                  showCount
                />
              </div>
              <div>
                <CodeTag className="mb-3">RichTextEditor.tsx</CodeTag>
                <RichTextEditor 
                  label="Job Description" 
                  placeholder="Describe the role responsibilities..."
                />
              </div>
            </div>

            <div className="border-t border-border-main pt-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div>
                <CodeTag className="mb-3">MultiSelect.tsx</CodeTag>
                <MultiSelect 
                  label="Required Skills" 
                  placeholder="Select skills..."
                  options={[
                    { label: 'React', value: 'react' },
                    { label: 'TypeScript', value: 'ts' },
                    { label: 'Node.js', value: 'node' },
                    { label: 'Figma', value: 'figma' },
                    { label: 'Python', value: 'python' },
                  ]}
                  selected={[{ label: 'React', value: 'react' }]}
                  onChange={() => {}}
                />
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <CodeTag className="mb-3">ToggleSwitch.tsx</CodeTag>
                  <ToggleSwitch 
                    label="Email Notifications" 
                    description="Receive daily job match alerts."
                    defaultChecked
                  />
                </div>
                <div>
                  <CodeTag className="mb-3">FileUpload.tsx</CodeTag>
                  <FileUpload 
                    label="Resume / CV" 
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Dashboard & Analytics Section */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Dashboard & Analytics</h3>
            
            <div className="flex flex-col gap-8">
              {/* Stat Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <CodeTag className="mb-3">StatWidget.tsx</CodeTag>
                  <StatWidget 
                    title="Total Revenue" 
                    value="$24,500" 
                    icon="ri-wallet-3-line" 
                    trend={12.5} 
                    trendText="vs last month" 
                  />
                </div>
                <div>
                  <CodeTag className="mb-3">StatWidget.tsx</CodeTag>
                  <StatWidget 
                    title="Active Users" 
                    value="1,204" 
                    icon="ri-user-smile-line" 
                    trend={-2.4} 
                    trendText="vs last month" 
                  />
                </div>
                <div>
                  <CodeTag className="mb-3">StatWidget.tsx</CodeTag>
                  <StatWidget 
                    title="Pending Tasks" 
                    value="42" 
                    icon="ri-task-line" 
                    trend={0} 
                  />
                </div>
              </div>

              {/* Data Table */}
              <div>
                <CodeTag className="mb-3">DataTable.tsx</CodeTag>
                <DataTable 
                  columns={[
                    { key: 'name', label: 'User Name', sortable: true },
                    { key: 'role', label: 'Role', sortable: true, render: (row) => <Badge variant={row.role === 'Admin' ? 'primary' : 'outline'}>{row.role}</Badge> },
                    { key: 'status', label: 'Status', sortable: true, render: (row) => (
                      <span className={`font-medium ${row.status === 'Active' ? 'text-success' : 'text-text-sec'}`}>{row.status}</span>
                    )},
                  ]}
                  data={[
                    { name: 'Sarah Jenkins', role: 'Admin', status: 'Active' },
                    { name: 'Mike Ross', role: 'Editor', status: 'Offline' },
                    { name: 'Alex Johnson', role: 'Viewer', status: 'Active' },
                    { name: 'Jessica Pearson', role: 'Admin', status: 'Offline' },
                  ]}
                  itemsPerPage={3}
                />
              </div>

              {/* Charts & Logs Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <CodeTag className="mb-3">ChartWrapper.tsx</CodeTag>
                  <ChartWrapper 
                    title="Revenue Overview" 
                    subtitle="Monthly earning reports"
                    action={<button className="text-primary text-sm hover:underline">View All</button>}
                  >
                    <div className="h-48 w-full border border-dashed border-border-main rounded-lg flex items-center justify-center text-text-sec bg-bg">
                      <div className="flex flex-col items-center gap-2">
                        <i className="ri-bar-chart-2-line text-2xl" />
                        <span>Chart placeholder (e.g., Recharts)</span>
                      </div>
                    </div>
                  </ChartWrapper>
                </div>
                
                <div>
                  <CodeTag className="mb-3">LogViewer.tsx</CodeTag>
                  <LogViewer 
                    height="h-[275px]"
                    logs={[
                      { id: 1, timestamp: '10:45:01', level: 'info', message: 'System startup initiated.' },
                      { id: 2, timestamp: '10:45:05', level: 'debug', message: 'Connecting to database...' },
                      { id: 3, timestamp: '10:45:08', level: 'warn', message: 'High memory usage detected.' },
                      { id: 4, timestamp: '10:45:12', level: 'error', message: 'Failed to sync worker thread.' },
                      { id: 5, timestamp: '10:45:15', level: 'info', message: 'Retrying connection (1/3).' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Display Section */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Data Display</h3>
            
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <div>
                    <CodeTag className="mb-3">NotificationItem.tsx</CodeTag>
                    <div className="flex flex-col border border-border-main rounded-2xl bg-bg overflow-hidden p-2 max-w-md">
                      <NotificationItem 
                        title="New job match for you" 
                        subtitle="Frontend Developer at Acme Inc."
                        time="2m ago"
                        iconName="ri-briefcase-line"
                        variant="primary"
                        isUnread={true}
                        showChevron={true}
                        onClick={() => console.log('clicked')}
                      />
                      <NotificationItem 
                        title="John Doe viewed your profile" 
                        subtitle="Graphic Designer • 2 mutual connections"
                        time="15m ago"
                        iconName="ri-user-line"
                        variant="success"
                        isUnread={true}
                        showChevron={true}
                        onClick={() => console.log('clicked')}
                      />
                      <NotificationItem 
                        title="New message from Sarah" 
                        subtitle="Project discussion"
                        time="1h ago"
                        iconName="ri-message-3-line"
                        variant="warning"
                        isUnread={true}
                        showChevron={true}
                        onClick={() => console.log('clicked')}
                      />
                      <NotificationItem 
                        title="Your proposal was shortlisted" 
                        subtitle="Mobile App Design for FinTech Startup"
                        time="3h ago"
                        iconName="ri-bookmark-line"
                        variant="info"
                        isUnread={false}
                        showChevron={true}
                        onClick={() => console.log('clicked')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Chat System Section */}
          <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Chat System Components</h3>
            
            <div className="flex flex-col gap-10">
              
              {/* Chat List Items */}
              <div className="flex flex-col gap-4">
                <CodeTag>ChatListItem.tsx</CodeTag>
                <div className="flex flex-col gap-1 border border-border-main rounded-2xl bg-bg p-3 w-full max-w-md">
                  <ChatListItem 
                    name="Sarah Jenkins"
                    lastMessage="Hi Sarah! Thank you so much. Yes, I'd love to..."
                    time="10:45 AM"
                    isOnline={true}
                    unreadCount={2}
                    isActive={true}
                  />
                  <ChatListItem 
                    name="Mike Ross"
                    lastMessage="Are we still on for the meeting at 3 PM?"
                    time="Yesterday"
                    isOnline={false}
                    unreadCount={0}
                  />
                </div>
              </div>

              {/* Chat Bubbles & Input */}
              <div className="flex flex-col gap-4">
                <CodeTag>ChatBubble.tsx & ChatInput.tsx</CodeTag>
                <div className="flex flex-col border border-border-main rounded-2xl bg-bg p-4 w-full max-w-md h-full">
                  <div className="flex flex-col gap-4 mb-4 flex-1">
                    <ChatBubble 
                      message="Would you be open to discussing a freelance opportunity?" 
                      time="10:43 AM" 
                      senderName="Sarah Jenkins"
                      avatarUrl="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random"
                    />
                    <ChatBubble 
                      message="Yes, I'd love to hear more about it." 
                      time="10:45 AM" 
                      isSender={true}
                      status="read"
                    />
                  </div>
                  <ChatInput onSend={(msg) => console.log("Sent:", msg)} />
                </div>
              </div>

              {/* Menus & Pickers */}
              <div className="flex flex-col gap-4">
                <CodeTag>Menus & Pickers</CodeTag>
                <div className="flex flex-wrap items-start gap-8 border border-border-main rounded-2xl bg-bg p-6 w-full max-w-2xl">
                  <div className="flex-1 min-w-[250px]">
                    <h4 className="text-[11px] font-medium text-text-sec mb-3 uppercase tracking-wider">Message Actions Dropdown</h4>
                    <div className="relative">
                      <MessageActions 
                        onReply={() => console.log("Reply")}
                        onCopy={() => console.log("Copy")}
                        onReact={() => console.log("React")}
                        onEdit={() => console.log("Edit")}
                        onDelete={() => console.log("Delete")}
                        isSender={true}
                        className="w-64"
                      />
                    </div>
                  </div>
                  <div className="min-w-[200px]">
                    <h4 className="text-[11px] font-medium text-text-sec mb-3 uppercase tracking-wider">Online Status Picker</h4>
                    <div className="relative">
                      <OnlineStatusPicker 
                        currentStatus="online"
                        onChange={(s) => console.log("Status:", s)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="flex flex-col gap-4">
                <CodeTag>AttachmentPreview.tsx</CodeTag>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-border-main rounded-2xl bg-bg p-6 w-full max-w-2xl">
                  <AttachmentPreview 
                    fileName="Project_Proposal_v2.pdf"
                    fileSize="2.4 MB"
                    fileType="pdf"
                    onRemove={() => console.log("Remove")}
                  />
                  <AttachmentPreview 
                    fileName="dashboard_mockup.png"
                    fileSize="1.2 MB"
                    fileType="image"
                    thumbnailUrl="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=150&q=80"
                    progress={60}
                    onRemove={() => console.log("Remove")}
                  />
                </div>
              </div>

            </div>
          </div>
          </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Buttons</h3>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <CodeTag className="mb-3">PrimaryButton.tsx & SecondaryButton.tsx</CodeTag>
              <div className="flex flex-wrap items-center justify-start gap-6">
                <PrimaryButton onClick={() => console.log('Primary Clicked!')}>Primary Action</PrimaryButton>
                <SecondaryButton onClick={() => console.log('Secondary Clicked!')}>Secondary Action</SecondaryButton>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <CodeTag className="mb-3">ButtonWithIcon.tsx</CodeTag>
              <div className="flex flex-wrap items-center justify-start gap-6">
                <ButtonWithIcon iconName="ri-arrow-right-line" iconPosition="right" variant="primary">
                  Get Started
                </ButtonWithIcon>
                <ButtonWithIcon iconName="ri-github-fill" iconPosition="left" variant="secondary">
                  Login with Github
                </ButtonWithIcon>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <CodeTag className="mb-3">OnlyIconButton.tsx</CodeTag>
              <div className="flex flex-wrap items-center justify-start gap-6">
                <OnlyIconButton iconName="ri-whatsapp-fill" className="text-[#25D366]" />
                <OnlyIconButton iconName="ri-google-fill" className="text-[#EA4335]" />
                <OnlyIconButton iconName="ri-apple-fill" className="text-text-main" />
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border-main pt-6">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium text-text-sec">Loading States </h4>
                <span className="text-[10px] bg-border-main px-2 py-0.5 rounded text-text-main">isLoading prop</span>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-6">
                <PrimaryButton isLoading>Saving...</PrimaryButton>
                <SecondaryButton isLoading>Loading...</SecondaryButton>
                <ButtonWithIcon iconName="ri-arrow-right-line" iconPosition="right" variant="primary" isLoading>
                  Processing
                </ButtonWithIcon>
                <OnlyIconButton iconName="ri-whatsapp-fill" className="text-[#25D366]" isLoading />
              </div>
            </div>

          </div>
        </div>

        {/* Premium Animations Section */}
        <div className="flex flex-col gap-6 w-full p-4 md:p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
          <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3">Animated Icons</h3>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <CodeTag className="mb-3">animated_icon.tsx (Lordicon Lazy Load)</CodeTag>
              <p className="text-sm text-text-sec -mt-2">Hover over these icons to see the premium Lottie animation. Themed to our platform.</p>
              <div className="flex flex-wrap items-center justify-start gap-10 py-4">
                {/* Trash Icon */}
                <AnimatedIcon src="https://cdn.lordicon.com/qjuahhae.json" size={48} trigger="hover" primaryColor="var(--text-primary)" secondaryColor="var(--primary-color)" />
                {/* Save/Folder Icon */}
                <AnimatedIcon src="https://cdn.lordicon.com/vixtkkbk.json" size={48} trigger="hover" primaryColor="var(--text-primary)" secondaryColor="var(--primary-color)" />
                {/* Bell/Notification Icon */}
                <AnimatedIcon src="https://cdn.lordicon.com/msetysan.json" size={48} trigger="hover" primaryColor="var(--text-primary)" secondaryColor="var(--primary-color)" />
                {/* User/Avatar Icon */}
                <AnimatedIcon src="https://cdn.lordicon.com/ljvjsnvh.json" size={48} trigger="hover" primaryColor="var(--text-primary)" secondaryColor="var(--primary-color)" />
              </div>
            </div>
          </div>
        </div>
        </div> {/* End of Left Column */}

        {/* Right Column: Installed Libraries */}
        <div className="flex flex-col w-full lg:w-1/3 gap-6 sticky top-8">
          <div className="p-6 border border-border-main rounded-xl bg-surface shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <h3 className="text-xl font-medium font-headingA text-text-main border-b border-border-main pb-3 mb-4">Installed Libraries</h3>
            <ul className="flex flex-col gap-3 text-sm text-text-sec">
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> React 19</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> React Router DOM</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Tailwind CSS v4</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Remix Icon</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> React Icons</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Lenis (Smooth Scroll)</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Framer Motion</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Lordicon & Lottie</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Phone Input (LibPhoneNumber)</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> clsx & tailwind-merge</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Sonner (Toast Manager)</li>
              <li className="flex items-center gap-2"><i className="ri-check-line text-success text-lg" /> Tiptap (Rich Text Editor)</li>
            </ul>
          </div>
        </div> {/* End of Right Column */}

      </div>
    </div>

    <Modal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      title="Platform Identity Check"
      description="Please complete your profile to continue applying for jobs."
      footer={
        <>
          <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton>Verify Now</PrimaryButton>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="text-text-sec text-sm">
          As a security measure and to ensure DPDP Act compliance, we need to verify your identity.
        </p>
        <div className="p-4 rounded-lg bg-bg border border-border-main">
          <Badge variant="warning" className="mb-2">Pending</Badge>
          <h4 className="font-medium text-text-main">Layer 3: Live Selfie Match</h4>
          <p className="text-xs text-text-sec mt-1">Takes roughly 30 seconds.</p>
        </div>
      </div>
    </Modal>

    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="Filter Jobs"
      description="Refine your job feed by skills and roles."
      side="right"
      footer={
        <div className="flex w-full gap-3">
          <SecondaryButton className="flex-1" onClick={() => setIsDrawerOpen(false)}>Clear</SecondaryButton>
          <PrimaryButton className="flex-1">Apply Filters</PrimaryButton>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div>
          <label className="text-sm font-medium text-text-main mb-2 block">Job Type</label>
          <div className="flex flex-col gap-3">
            <Checkbox id="filter-remote" label="Remote Only" />
            <Checkbox id="filter-contract" label="Contract" />
            <Checkbox id="filter-fulltime" label="Full Time" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-text-main mb-2 block">Experience Level</label>
          <div className="flex flex-col gap-3">
            <Radio name="exp" id="exp-entry" label="Entry Level" />
            <Radio name="exp" id="exp-mid" label="Mid Level" />
            <Radio name="exp" id="exp-senior" label="Senior Level" />
          </div>
        </div>
      </div>
    </Drawer>
    </>
  );
};

export default ComponentsPage;
