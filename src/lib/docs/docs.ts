import { Doc } from '@/types/docs'

export async function getDocs(): Promise<Doc[]> {
  const docs = [
    // Introduction
    {
      slug: 'introduction/getting-started',
      metadata: {
        title: 'Getting Started',
        description: 'Learn how to set up and use Evict in your Discord server',
        category: 'Introduction',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'introduction/commands-overview',
      metadata: {
        title: 'Commands Overview',
        description: 'Understanding Evict\'s command structure and usage',
        category: 'Introduction',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Configuration
    {
      slug: 'configuration/configuration',
      metadata: {
        title: 'Configuration Overview',
        description: 'Server configuration and customization commands',
        category: 'Configuration',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/roles',
      metadata: {
        title: 'Role Management',
        description: 'Autoroles, booster roles, reaction roles, and button roles',
        category: 'Configuration',
        order: 10,
        lastUpdated: '2026-02-14'
      }
    },

    {
      slug: 'configuration/messages',
      metadata: {
        title: 'Messages & Communication',
        description: 'Confessions, bump reminders, invoke messages, and tags',
        category: 'Configuration',
        order: 12,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/customization',
      metadata: {
        title: 'Customization & Context',
        description: 'Customize Evict\'s profile and response colors/emojis',
        category: 'Configuration',
        order: 13,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/prefix',
      metadata: {
        title: 'Prefix Management',
        description: 'Configure server and personal command prefixes',
        category: 'Configuration',
        order: 14,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/aliases',
      metadata: {
        title: 'Command Aliases',
        description: 'Create shortcuts for frequently used commands',
        category: 'Configuration',
        order: 15,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/antinuke',
      metadata: {
        title: 'Anti-Nuke Protection',
        description: 'Protect your server from malicious admins and raids',
        category: 'Configuration',
        order: 16,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/thread-watcher',
      metadata: {
        title: 'Thread Watcher',
        description: 'Prevent important threads from being archived',
        category: 'Configuration',
        order: 17,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/vanity-tracking',
      metadata: {
        title: 'Vanity Tracking',
        description: 'Reward members who advertise your server\'s vanity URL',
        category: 'Configuration',
        order: 18,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/guild-tag-tracking',
      metadata: {
        title: 'Guild Tag Tracking',
        description: 'Reward members who add your server name as a tag',
        category: 'Configuration',
        order: 19,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/ping-on-join',
      metadata: {
        title: 'Ping on Join',
        description: 'Automatically mention new members when they join',
        category: 'Configuration',
        order: 20,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration/quoter',
      metadata: {
        title: 'Message Quoter',
        description: 'Repost messages using reactions or commands',
        category: 'Configuration',
        order: 21,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Commands
    {
      slug: 'commands/fun',
      metadata: {
        title: 'Fun Commands',
        description: 'Entertainment, roleplay, and game commands',
        category: 'Commands',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'commands/information',
      metadata: {
        title: 'Information',
        description: 'User, server, and general information commands',
        category: 'Commands',
        order: 3,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'commands/social',
      metadata: {
        title: 'Social Integrations',
        description: 'Connect with GitHub, Roblox, and other platforms',
        category: 'Commands',
        order: 4,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Utilities
    {
      slug: 'utilities/snipes-afk',
      metadata: {
        title: 'Snipes & AFK',
        description: 'Message snipes and AFK status system',
        category: 'Utilities',
        order: 20,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'utilities/giveaways',
      metadata: {
        title: 'Giveaways',
        description: 'Host and manage server giveaways',
        category: 'Utilities',
        order: 21,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Features
    {
      slug: 'features/embed-builder',
      metadata: {
        title: 'Embed Builder',
        description: 'Create custom embeds with the embed builder',
        category: 'Features',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'features/lastfm-integration',
      metadata: {
        title: 'Last.fm Integration',
        description: 'Connect and use Last.fm features with Evict',
        category: 'Features',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'features/variables',
      metadata: {
        title: 'Variables & Placeholders',
        description: 'Complete guide to using variables in embeds and messages',
        category: 'Features',
        order: 30,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Guides
    {
      slug: 'guides/server-setup',
      metadata: {
        title: 'Server Setup Guide',
        description: 'Step-by-step guide to setting up Evict in your server',
        category: 'Guides',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'guides/troubleshooting',
      metadata: {
        title: 'Troubleshooting',
        description: 'Common issues and solutions for Evict',
        category: 'Guides',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'guides/permissions-guide',
      metadata: {
        title: 'Permissions Guide',
        description: 'Understanding permissions and role hierarchy in Evict',
        category: 'Guides',
        order: 3,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'guides/faq',
      metadata: {
        title: 'FAQ',
        description: 'Frequently asked questions about Evict',
        category: 'Guides',
        order: 4,
        lastUpdated: '2026-02-14'
      }
    }
  ]

  return docs.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0))
}

export function getDocsByCategory(docs: Doc[]): Record<string, Doc[]> {
  return docs.reduce((acc, doc) => {
    const category = doc.metadata.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, Doc[]>)
}
