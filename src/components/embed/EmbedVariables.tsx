"use client";

import { FaSquareRootVariable } from "react-icons/fa6";

export const EmbedVariables = () => (
  <div className="bg-white/[0.02] border border-[#ccccff]/20 rounded-2xl shadow-md overflow-hidden mb-16 backdrop-blur-md">
    <div className="border-b border-[#ccccff]/10 px-4 py-3">
      <div className="flex items-center">
        <div className="p-1.5 rounded-md bg-alina-primary/10 mr-2">
          <FaSquareRootVariable className="w-4 h-4 text-alina-primary/80" />
        </div>
        <h2 className="text-lg font-semibold text-white">Variables</h2>
      </div>
    </div>

    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/[0.03] border border-[#ccccff]/20 p-3 rounded-md backdrop-blur-sm">
          <h3 className="font-medium mb-2 text-sm" style={{ color: "#CCCCFF" }}>
            User Variables
          </h3>
          <div className="space-y-1 text-xs" style={{ color: "#CCCCFF" }}>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{user}"}
              </code>{" "}
              - User#Tag
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{user.id}"}
              </code>{" "}
              - User ID
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{user.name}"}
              </code>{" "}
              - Username
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{user.mention}"}
              </code>{" "}
              - User mention
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{user.avatar}"}
              </code>{" "}
              - User avatar URL
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-[#ccccff]/20 p-3 rounded-md backdrop-blur-sm">
          <h3 className="font-medium mb-2 text-sm" style={{ color: "#CCCCFF" }}>
            Server Variables
          </h3>
          <div className="space-y-1 text-xs" style={{ color: "#CCCCFF" }}>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{guild.name}"}
              </code>{" "}
              - Server name
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{guild.id}"}
              </code>{" "}
              - Server ID
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{guild.count}"}
              </code>{" "}
              - Member count
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{guild.icon}"}
              </code>{" "}
              - Server icon URL
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{guild.boost_count}"}
              </code>{" "}
              - Boost count
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-[#ccccff]/20 p-3 rounded-md backdrop-blur-sm">
          <h3 className="font-medium mb-2 text-sm" style={{ color: "#CCCCFF" }}>
            Channel Variables
          </h3>
          <div className="space-y-1 text-xs" style={{ color: "#CCCCFF" }}>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{channel}"}
              </code>{" "}
              - Channel mention
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{channel.name}"}
              </code>{" "}
              - Channel name
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{channel.id}"}
              </code>{" "}
              - Channel ID
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{channel.topic}"}
              </code>{" "}
              - Channel topic
            </div>
            <div>
              <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
                {"{channel.position}"}
              </code>{" "}
              - Channel position
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm bg-white/[0.03] border border-[#ccccff]/20 p-3 rounded-md backdrop-blur-sm" style={{ color: "#CCCCFF" }}>
        <p className="mb-2">
          <strong style={{ color: "#CCCCFF" }}>Syntax Examples:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{content: Hello {user.name}!}"}
            </code>{" "}
            - Set message content with variable
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{embed}"}
            </code>{" "}
            - Start a new embed
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{title: Welcome to {guild.name}!}"}
            </code>{" "}
            - Set embed title with variable
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{field: Stats && Members: {guild.count} && inline}"}
            </code>{" "}
            - Add inline field
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{timestamp}"}
            </code>{" "}
            - Add current timestamp
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{button: link && Visit Site && https://evict.bot}"}
            </code>{" "}
            - Add link button
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              {"{button: primary && Click Me && custom_id && 🎮}"}
            </code>{" "}
            - Add primary button with emoji
          </li>
          <li>
            <code className="bg-alina-400 px-1 py-0.5 rounded" style={{ color: "#CCCCFF" }}>
              $v
            </code>{" "}
            - Separator between commands (or use newlines)
          </li>
        </ul>
      </div>
    </div>
  </div>
);
