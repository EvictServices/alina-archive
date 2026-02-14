import { Command, RawCommand } from "@/types/commands";

function formatPermissions(
  permissions: Record<string, boolean>[] | string[]
): string[] {
  if (!Array.isArray(permissions)) return [];

  return permissions
    .map((perm) => {
      if (typeof perm === "string") return perm;
      if (typeof perm === "object") {
        const key = Object.keys(perm)[0];
        return key ? key.replace(/_/g, " ") : "";
      }
      return "";
    })
    .filter(Boolean);
}

export function processParams(command: RawCommand): Command {
  const { subcommands, ...rest } = command;
  const baseCommand: Command = {
    ...rest,
    permissions: formatPermissions(command.permissions),
  };

  if (!command.params || command.params.length === 0) return baseCommand;

  return {
    ...baseCommand,
    params: command.params.map((param) => {
      let type = param.type;

      if (type.startsWith("partial")) {
        type = type.substring(7).toLowerCase();
      } else {
        type = type.toLowerCase();
      }

      if (type.toLowerCase().startsWith("range[")) {
        const rangeMatch = type.match(
          /range\[(str|int),\s*(\d+),\s*(none|\d+)\]/i
        );
        if (rangeMatch) {
          const [_, dataType, min, max] = rangeMatch;
          const formattedMax = max.toLowerCase() === "none" ? "∞" : max;
          const friendlyType =
            dataType.toLowerCase() === "str"
              ? "string"
              : dataType.toLowerCase() === "int"
                ? "integer"
                : dataType.toLowerCase();
          type = `${friendlyType} (between ${min} and ${formattedMax})`;
        }
      }

      if (type.includes("object at 0x")) {
        const className = type.split(" ")[0].split(".").pop() || "object";
        type = className.toLowerCase();
      }

      return { ...param, type };
    }),
  };
}

export function processCommands(commands: RawCommand[]): Command[] {
  if (!commands.length) return [];

  const processedMap = new Map<string, Command>();
  const allCommands: Command[] = [];
  const subcommandsByParent = new Map<string, Command[]>();

  for (const cmd of commands) {
    const key = cmd.qualified_name || cmd.name;
    if (processedMap.has(key)) continue;

    const processed: Command = processParams(cmd);
    processedMap.set(key, processed);
    allCommands.push(processed);

    if (cmd.is_subcommand && cmd.parent) {
      if (!subcommandsByParent.has(cmd.parent)) {
        subcommandsByParent.set(cmd.parent, []);
      }
      subcommandsByParent.get(cmd.parent)!.push(processed);
    }
  }

  for (const cmd of allCommands) {
    if (cmd.is_group && subcommandsByParent.has(cmd.name)) {
      cmd.subcommands = subcommandsByParent.get(cmd.name) || [];
    }
  }

  return allCommands;
}
