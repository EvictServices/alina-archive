import { Doc } from '@/types/docs'

export async function getDocs(): Promise<Doc[]> {
  const docs = [
    // Introduction
    {
      slug: 'getting-started',
      metadata: {
        title: 'Getting Started',
        description: 'Learn how to set up and use Evict in your Discord server',
        category: 'Introduction',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'commands-overview',
      metadata: {
        title: 'Commands Overview',
        description: 'Understanding Evict\'s command structure and usage',
        category: 'Introduction',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Configuration - Subcogs
    {
      slug: 'cfg-roles',
      metadata: {
        title: 'Role Management',
        description: 'Autoroles, booster roles, reaction roles, and button roles',
        category: 'Configuration',
        order: 10,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'cfg-automation',
      metadata: {
        title: 'Server Automation',
        description: 'Aliases, anti-nuke, threads, vanity tracking, and ping on join',
        category: 'Configuration',
        order: 11,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'cfg-messages',
      metadata: {
        title: 'Messages & Communication',
        description: 'Confessions, bump reminders, invoke messages, and tags',
        category: 'Configuration',
        order: 12,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'cfg-customization',
      metadata: {
        title: 'Customization & Context',
        description: 'Customize Evict\'s profile and response colors/emojis',
        category: 'Configuration',
        order: 13,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'configuration',
      metadata: {
        title: 'Configuration Overview',
        description: 'Server configuration and customization commands',
        category: 'Configuration',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Commands
    {
      slug: 'fun',
      metadata: {
        title: 'Fun Commands',
        description: 'Entertainment, roleplay, and game commands',
        category: 'Commands',
        order: 2,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'information',
      metadata: {
        title: 'Information',
        description: 'User, server, and general information commands',
        category: 'Commands',
        order: 3,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'social',
      metadata: {
        title: 'Social Integrations',
        description: 'Connect with GitHub, Roblox, and other platforms',
        category: 'Commands',
        order: 4,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'utility',
      metadata: {
        title: 'Utility Commands',
        description: 'Helpful utility commands for everyday use',
        category: 'Commands',
        order: 5,
        lastUpdated: '2026-02-14'
      }
    },
    
    // Utilities - Subcogs
    {
      slug: 'util-snipes-afk',
      metadata: {
        title: 'Snipes & AFK',
        description: 'Message snipes and AFK status system',
        category: 'Utilities',
        order: 20,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'util-giveaways',
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
      slug: 'embed-builder',
      metadata: {
        title: 'Embed Builder',
        description: 'Create custom embeds with the embed builder',
        category: 'Features',
        order: 1,
        lastUpdated: '2026-02-14'
      }
    },
    {
      slug: 'lastfm-integration',
      metadata: {
        title: 'Last.fm Integration',
        description: 'Connect and use Last.fm features with Evict',
        category: 'Features',
        order: 2,
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
