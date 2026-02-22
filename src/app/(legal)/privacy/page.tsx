"use client";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl font-light text-white">
            <span className="shimmer-text">Privacy Policy</span>
          </h1>
        </div>

        <div className="mb-6 bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-4 backdrop-blur-md">
          <p className="text-white/60 text-xs">
            Last updated and effective since: 2025-11-11
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-white/80 leading-relaxed">
            Any information we collect is not used in any malicious manner. If
            anything shown seems misleading, please contact us @{" "}
            <a
              href="mailto:legal@azron.net"
              className="text-white hover:text-white/70 transition-colors underline"
            >
              legal@azron.net
            </a>
          </p>

          <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-light text-white mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
            <li>Guild IDs</li>
            <li>Guild Names</li>
            <li>Channel IDs</li>
            <li>Role IDs</li>
            <li>User IDs</li>
            <li>Message Timestamps</li>
            <li>Message IDs</li>
            <li>Past Avatars</li>
            <li>Nicknames and Usernames</li>
            <li>
              Message content when a command is ran (stored for a max of 14
              days) or when arguments are passed for commands
            </li>
            <li>
              Last deleted message content (stored for a max of 2 hours or less)
            </li>
            <li>
              Last message edit history (stored for a max of 2 hours or less)
            </li>
            <li>
              Last Emoji Reaction History (stored for a max of 2 hours or less)
            </li>
          </ul>
          </div>

          <h2 className="text-2xl font-light text-white mt-8 mb-4">
            Why do we need the data and how is it used?
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            When a command is invoked, we store the message content for a maximum
            of 14 days for debugging purposes. We also store a maximum of 18
            entries for edited messages and sniping messages that will expire in
            two hours or less in volatile memory.
          </p>
          <p className="text-white/80 leading-relaxed mb-6">
            Guild IDs, Channel IDs, Role IDs, User IDs and Message IDs are all
            stored for our system to aggregate values to find data.
          </p>
          <p className="text-white/80 leading-relaxed mb-6">
            Nickname, Username and Avatar changes are logged in order for the
            &quot;namehistory&quot; and &quot;avatarhistory&quot; commands to function. Users can
            clear this data themselves at any time.
          </p>
          <p className="text-white/80 leading-relaxed mb-6">
            Guild name changes are logged in order for the &quot;gnames&quot; command to
            function. Server administrators can clear this data themselves at any
            time.
          </p>

          <h2 className="text-2xl font-light text-white mt-8 mb-4">
            Who is your collected information shared with?
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            We do not sell or expose your information to others, and, or third
            parties.
          </p>

          <div className="bg-white/[0.02] border border-[#5f828d]/20 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-light text-white mb-3">Data Removal</h2>
            <p className="text-white/80 leading-relaxed">
              Email{" "}
              <a
                href="mailto:legal@azron.net"
                className="text-white hover:text-white/70 transition-colors underline"
              >
                legal@azron.net
              </a>{" "}
              for all of your data that we are currently storing. Response times
              may vary and could take up to 7 days.
            </p>
          </div>

          <h2 className="text-2xl font-light text-white mt-8 mb-4">
            Data Storage and Backups
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Our primary data storage is located in Ashburn, Virginia. For redundancy
            and disaster recovery, we maintain replicated backups across data
            centers in New Jersey.
          </p>

          <h2 className="text-2xl font-light text-white mt-8 mb-4">
            Changes to the Privacy Policy
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            We can update these terms at any time without notice. Continuing to
            use our services after any changes will mean that you agree with these
            terms and violation of our terms of service could result in a
            permanent ban across all of our services.
          </p>
        </div>
      </div>
    </main>
  );
}