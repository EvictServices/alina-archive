export interface CommandParam {
  name: string
  type: string
  default: string | null
  required: boolean
  description: string | null
  displayed_name: string | null
  displayed_default: string | null
}

export interface Command {
  name: string
  qualified_name: string
  description: string
  params: CommandParam[]
  aliases: string[]
  signature: string
  help: string
  brief: string | null
  hidden: boolean
  permissions: string[]
  is_subcommand?: boolean
  parent?: string
  is_group?: boolean
  category?: string
  subcommands?: Command[]
}

export interface CommandsData {
  [category: string]: Command[]
}
