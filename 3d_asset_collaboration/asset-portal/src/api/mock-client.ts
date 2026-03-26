import type { Asset } from "../store/assetSlice";

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Industrial Robot Arm",
    format: "GLB",
    size: "12.4 MB",
    tags: ["robotics", "industrial", "automation"],
    thumbnail: "",
    author: "Jerry W.",
    createdAt: "2026-03-10",
    description: "High-poly industrial robot arm model with PBR materials.",
  },
  {
    id: "2",
    name: "Warehouse Shelf Unit",
    format: "FBX",
    size: "3.8 MB",
    tags: ["warehouse", "furniture", "logistics"],
    thumbnail: "",
    author: "Alice K.",
    createdAt: "2026-03-12",
    description: "Modular warehouse shelf unit, configurable rows and columns.",
  },
  {
    id: "3",
    name: "IoT Sensor Module",
    format: "OBJ",
    size: "1.2 MB",
    tags: ["IoT", "sensor", "electronics"],
    thumbnail: "",
    author: "Bob L.",
    createdAt: "2026-03-15",
    description: "Compact IoT sensor housing with mounting brackets.",
  },
  {
    id: "4",
    name: "Conveyor Belt Section",
    format: "GLB",
    size: "8.7 MB",
    tags: ["conveyor", "factory", "mechanical"],
    thumbnail: "",
    author: "Carol M.",
    createdAt: "2026-03-18",
    description: "Animated conveyor belt section with configurable speed.",
  },
  {
    id: "5",
    name: "Safety Helmet",
    format: "FBX",
    size: "2.1 MB",
    tags: ["safety", "PPE", "wearable"],
    thumbnail: "",
    author: "Dave N.",
    createdAt: "2026-03-20",
    description: "Safety helmet with adjustable straps and visor attachment.",
  },
  {
    id: "6",
    name: "Control Panel",
    format: "OBJ",
    size: "5.3 MB",
    tags: ["controls", "electronics", "HMI"],
    thumbnail: "",
    author: "Eve O.",
    createdAt: "2026-03-22",
    description: "Industrial control panel with buttons, switches, and LCD screen.",
  },
];

export interface SensorData {
  id: string;
  name: string;
  type: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  history: number[];
}

export const mockSensors: SensorData[] = [
  {
    id: "s1",
    name: "Temperature A",
    type: "temperature",
    value: 42.3,
    unit: "C",
    status: "normal",
    history: [38, 39, 41, 42, 42.3, 41, 40, 42, 43, 42.3],
  },
  {
    id: "s2",
    name: "Humidity B",
    type: "humidity",
    value: 67,
    unit: "%",
    status: "warning",
    history: [60, 62, 63, 65, 67, 68, 67, 66, 67, 67],
  },
  {
    id: "s3",
    name: "Pressure C",
    type: "pressure",
    value: 1013,
    unit: "hPa",
    status: "normal",
    history: [1010, 1011, 1012, 1013, 1013, 1012, 1013, 1014, 1013, 1013],
  },
  {
    id: "s4",
    name: "Vibration D",
    type: "vibration",
    value: 4.7,
    unit: "mm/s",
    status: "critical",
    history: [2.1, 2.5, 3.0, 3.8, 4.2, 4.5, 4.7, 4.6, 4.7, 4.7],
  },
];

export async function fetchAssets(): Promise<Asset[]> {
  await delay(300);
  return mockAssets;
}

export async function fetchAssetById(id: string): Promise<Asset | undefined> {
  await delay(200);
  return mockAssets.find((a) => a.id === id);
}

export async function fetchSensors(): Promise<SensorData[]> {
  await delay(250);
  return mockSensors;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
