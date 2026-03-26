export interface Asset {
  id: string;
  name: string;
  format: string;
  tags: string[];
  thumbnailUrl: string | null;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Sci-Fi Helmet",
    format: "glb",
    tags: ["sci-fi", "armor"],
    thumbnailUrl: null,
  },
  {
    id: "2",
    name: "Medieval Sword",
    format: "fbx",
    tags: ["medieval", "weapon"],
    thumbnailUrl: null,
  },
  {
    id: "3",
    name: "Office Chair",
    format: "obj",
    tags: ["furniture", "modern"],
    thumbnailUrl: null,
  },
  {
    id: "4",
    name: "Sports Car",
    format: "glb",
    tags: ["vehicle", "racing"],
    thumbnailUrl: null,
  },
  {
    id: "5",
    name: "Pine Tree",
    format: "usdz",
    tags: ["nature", "foliage"],
    thumbnailUrl: null,
  },
  {
    id: "6",
    name: "Robot Arm",
    format: "fbx",
    tags: ["mech", "industrial"],
    thumbnailUrl: null,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New comment on Sci-Fi Helmet",
    body: "Alex left feedback on the visor mesh.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    title: "Asset approved",
    body: "Medieval Sword was approved by the lead.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n3",
    title: "Version uploaded",
    body: "Sports Car v3 has been uploaded.",
    time: "3 hrs ago",
    read: true,
  },
  {
    id: "n4",
    title: "Team invitation",
    body: "You were invited to Project Nebula.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n5",
    title: "Export complete",
    body: "Pine Tree USDZ export is ready to download.",
    time: "2 days ago",
    read: true,
  },
];
