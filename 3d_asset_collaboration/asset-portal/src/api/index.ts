const useMock = import.meta.env.VITE_MOCK === "true";

export const api = useMock ? await import("./mock-client") : await import("./real-client");
