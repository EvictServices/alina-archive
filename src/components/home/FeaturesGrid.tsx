interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

function FeatureCard({ icon, title, description, size = 'medium' }: FeatureCardProps) {
  const sizeClasses = {
    small: 'md:col-span-1',
    medium: 'md:col-span-1',
    large: 'md:col-span-2',
  };

  const iconClasses = {
    small: 'w-10 h-10',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };

  const titleClasses = {
    small: 'text-lg',
    medium: 'text-lg',
    large: 'text-2xl',
  };

  const paddingClasses = {
    small: 'px-6 py-6',
    medium: 'px-6 py-6',
    large: 'px-8 py-10',
  };

  const rowSpan = size === 'large' ? 'md:row-span-2' : size === 'medium' && description.length > 100 ? 'md:row-span-2' : '';

  return (
    <div className={`${sizeClasses[size]} ${rowSpan} rounded-2xl border border-[#7ba3b4]/20 bg-white/[0.02] backdrop-blur-md ${paddingClasses[size]} hover:border-white transition-all duration-300 flex flex-col justify-center`}>
      <div className={`flex items-center gap-${size === 'large' ? '3' : '2'} mb-${size === 'large' ? '4' : '3'}`}>
        <div className={`${iconClasses[size]} rounded-xl bg-transparent border border-[#7ba3b4]/20 flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className={`${titleClasses[size]} font-semibold text-white`}>{title}</h3>
      </div>
      <p className={`${size === 'large' ? 'text-base' : 'text-sm'} text-white/60 leading-relaxed`}>
        {description}
      </p>
    </div>
  );
}

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="m7 11 2-2-2-2"/>
    <path d="M11 13h4"/>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const UserDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <circle cx="12" cy="8" r="5"/>
    <path d="M20 21a8 8 0 0 0-16 0"/>
    <path d="M12 13v8"/>
    <path d="M8 17l4 4 4-4"/>
  </svg>
);

export function FeaturesGrid() {
  return (
    <div className="mt-12 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard
          size="large"
          icon={<ShieldIcon />}
          title="Advanced Moderation"
          description="Comprehensive moderation tools to keep your server safe and organized with automated actions and custom filters."
        />
        <FeatureCard
          size="small"
          icon={<AnalyticsIcon />}
          title="Server Analytics"
          description="Track member activity and engagement."
        />
        <FeatureCard
          size="medium"
          icon={<UsersIcon />}
          title="System Messages"
          description="Greet new members, thank members for boosting with customizable welcome messages and automated onboarding."
        />
        <FeatureCard
          size="small"
          icon={<CodeIcon />}
          title="Rewards Systems"
          description="Thank users for representing your guild tag as well as vanity in their status with customizable rewards and recognition systems."
        />
        <FeatureCard
          size="large"
          icon={<ShieldCheckIcon />}
          title="Top Tier Protection"
          description="Protect your server from malicious attacks with intelligent security measures, anti-raid systems and instant threat detection."
        />
        <FeatureCard
          size="large"
          icon={<UserDownIcon />}
          title="Automated Roles"
          description="Streamline role management with reaction roles, auto-roles, and role hierarchies for seamless organization."
        />
      </div>
    </div>
  );
}
