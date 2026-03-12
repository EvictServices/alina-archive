import type { Command, CommandsData } from '@/types/commands';

export const EXCLUDED_CATEGORIES = ['Developer', 'No Category'];

/**
 * Flatten commands including their subcommands into a single array
 */
export function flattenCommands(commands: Command[]): Command[] {
  const flattened: Command[] = [];
  const seen = new Set<string>();
  
  const addCommand = (cmd: Command) => {
    const key = cmd.qualified_name || cmd.name;
    if (!seen.has(key)) {
      seen.add(key);
      flattened.push(cmd);
    }
    
    if (cmd.subcommands && cmd.subcommands.length > 0) {
      cmd.subcommands.forEach(addCommand);
    }
  };
  
  commands.forEach(addCommand);
  return flattened;
}

/**
 * Get commands for a specific category
 */
export function getCommandsByCategory(
  commands: CommandsData,
  category: string
): Command[] {
  if (category === 'All') {
    return Object.entries(commands)
      .filter(([cat]) => !EXCLUDED_CATEGORIES.includes(cat))
      .flatMap(([_, cmds]) => cmds);
  }
  
  return commands[category] || [];
}

/**
 * Filter commands based on search query
 */
export function filterCommandsBySearch(
  commands: Command[],
  searchQuery: string
): Command[] {
  if (!searchQuery) return commands;
  
  const searchLower = searchQuery.toLowerCase().trim();
  
  return commands.filter(cmd => {
    const name = (cmd.name || '').toLowerCase();
    const qualifiedName = (cmd.qualified_name || '').toLowerCase();
    const description = (cmd.description || '').toLowerCase();
    const aliases = cmd.aliases || [];
    
    return (
      name.includes(searchLower) ||
      qualifiedName.includes(searchLower) ||
      description.includes(searchLower) ||
      (Array.isArray(aliases) && aliases.some(alias => 
        alias.toLowerCase().includes(searchLower)
      ))
    );
  });
}

/**
 * Get total count of commands excluding specific categories
 */
export function getTotalCommandsCount(commands: CommandsData): number {
  return Object.entries(commands)
    .filter(([cat]) => !EXCLUDED_CATEGORIES.includes(cat))
    .reduce((acc, [_, cmds]) => acc + cmds.length, 0);
}

/**
 * Get filtered category list
 */
export function getFilteredCategories(
  commands: CommandsData,
  includeAll: boolean = true,
  error: boolean = false
): string[] {
  const categories = Object.keys(commands)
    .filter(cat => !EXCLUDED_CATEGORIES.includes(cat))
    .sort();
  
  if (error) return categories;
  return includeAll ? ['All', ...categories] : categories;
}

/**
 * Get the display name for a command
 */
export function getCommandDisplayName(command: Command): string {
  return command.is_subcommand ? command.qualified_name : command.name;
}
