import { Command } from "@/types/commands";

export function processParams(command: Command): Command {
  if (!command.params || command.params.length === 0) return command;

  return {
    ...command,
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

export function processCommands(commands: Command[]): Command[] {
  if (!commands.length) return [];

  const processedMap = new Map<string, Command>();
  const allCommands: Command[] = [];
  const subcommandsByParent = new Map<string, Command[]>();

  for (const cmd of commands) {
    const key = cmd.qualified_name || cmd.name;
    if (processedMap.has(key)) continue;

    const processed = processParams(cmd);
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
