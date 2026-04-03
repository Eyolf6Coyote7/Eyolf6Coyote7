import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { DemoTooltip } from "./DemoTooltip";

describe("Component render tests", () => {
  it("ThemeToggle renders", () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeToggle />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it("LanguageToggle renders", () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageToggle />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it("DemoTooltip renders children", () => {
    const { getByText } = render(
      <MemoryRouter>
        <DemoTooltip>
          <span>child content</span>
        </DemoTooltip>
      </MemoryRouter>,
    );
    expect(getByText("child content")).toBeTruthy();
  });
});
