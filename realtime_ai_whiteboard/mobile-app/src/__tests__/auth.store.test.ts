import { useAuthStore } from "../stores/auth";

describe("whiteboard mobile auth store", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null });
  });

  it("should have null initial state", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it("login should set user and token", () => {
    useAuthStore.getState().login("Jerry", "jerry@test.com", "tok-123");
    const state = useAuthStore.getState();
    expect(state.user).toEqual({ name: "Jerry", email: "jerry@test.com" });
    expect(state.token).toBe("tok-123");
  });

  it("logout should clear user and token", () => {
    useAuthStore.getState().login("Jerry", "jerry@test.com", "tok-123");
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});
