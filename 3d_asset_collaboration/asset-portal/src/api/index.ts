import * as mockClient from "./mock-client";
import * as realClient from "./real-client";

const useMock = import.meta.env.VITE_MOCK === "true";

export const api = useMock ? mockClient : realClient;
