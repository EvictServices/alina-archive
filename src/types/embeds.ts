export interface EmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export interface EmbedButton {
  style: "link" | "primary" | "secondary" | "success" | "danger";
  label: string;
  url: string;
  emoji: string;
  disabled: boolean;
}

export interface EmbedData {
  title: string;
  description: string;
  url: string;
  color: string;
  timestamp: boolean;
  thumbnail: string;
  image: string;
  author: {
    name: string;
    icon_url: string;
    url: string;
  };
  footer: {
    text: string;
    icon_url: string;
  };
  fields: EmbedField[];
  buttons: EmbedButton[];
}

export const defaultVariables: Record<string, string> = {
  "user.id": "123456789012345678",
  "user.username": "Username",
  "user.mention": "@Username",
  "user.avatar": "https://cdn.discordapp.com/embed/avatars/0.png",
  "user.discriminator": "0",
  "user.tag": "Username#0",
  "user.bot": "false",
  "user.created_at": "2024-01-01",
  "guild.id": "987654321098765432",
  "guild.name": "alina Server",
  "guild.member_count": "1000",
  "guild.icon": "https://cdn.discordapp.com/icons/server/icon.png",
  "guild.owner_id": "123456789012345678",
  "guild.created_at": "2024-01-01",
  "channel.id": "111222333444555666",
  "channel.name": "general",
  "channel.mention": "#general",
  "channel.type": "text",
  "channel.created_at": "2024-01-01",
};

export const initialEmbed: EmbedData = {
  title: "alina",
  description: "Welcome to the alina embed builder! Create beautiful embeds with ease.",
  url: "",
  color: "#ccccff",
  timestamp: false,
  thumbnail: "",
  image: "",
  author: {
    name: "",
    icon_url: "",
    url: "",
  },
  footer: {
    text: "",
    icon_url: "",
  },
  fields: [],
  buttons: [],
};
