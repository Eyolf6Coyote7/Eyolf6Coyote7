import { mockClient } from "../api/mock-client";

describe("whiteboard mobile mockClient", () => {
  it("getBoards should return 5 boards", async () => {
    const boards = await mockClient.getBoards();
    expect(boards).toHaveLength(5);
    expect(boards[0].title).toBe("Sprint Planning");
  });

  it("boards should have collaborators", async () => {
    const boards = await mockClient.getBoards();
    boards.forEach((b) => {
      expect(b.collaborators.length).toBeGreaterThan(0);
      b.collaborators.forEach((c) => {
        expect(c.initials).toBeDefined();
        expect(c.color).toBeDefined();
      });
    });
  });

  it("getChatHistory should return messages", async () => {
    const messages = await mockClient.getChatHistory();
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].role).toBe("assistant");
  });

  it("login should return token and user", async () => {
    const result = await mockClient.login("test@test.com", "pass");
    expect(result.token).toBe("mock-token");
    expect(result.user.name).toBe("Jerry Wolf");
  });
});
