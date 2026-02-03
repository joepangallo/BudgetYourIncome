import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Collapsible } from "../ui/collapsible";

// Mock the dependencies
jest.mock("@/src/shared/hooks/use-theme-color", () => ({
  useThemeColor: jest.fn(() => "#0c08f8"),
}));

jest.mock("@/src/shared/hooks/use-color-scheme", () => ({
  useColorScheme: jest.fn(() => "light"),
}));

jest.mock("@/src/shared/components/ui/icon-symbol", () => {
  const { Text } = require("react-native");
  return {
    IconSymbol: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

describe("Collapsible", () => {
  it("renders the title", () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden Content</Text>
      </Collapsible>
    );
    expect(screen.getByText("Test Section")).toBeTruthy();
  });

  it("does not show children by default (collapsed)", () => {
    render(
      <Collapsible title="Collapsed Section">
        <Text>Hidden Content</Text>
      </Collapsible>
    );
    expect(screen.queryByText("Hidden Content")).toBeNull();
  });

  it("shows children when expanded", () => {
    render(
      <Collapsible title="Expandable Section">
        <Text>Visible Content</Text>
      </Collapsible>
    );

    const header = screen.getByText("Expandable Section");
    fireEvent.press(header);

    expect(screen.getByText("Visible Content")).toBeTruthy();
  });

  it("hides children when collapsed after being expanded", () => {
    render(
      <Collapsible title="Toggle Section">
        <Text>Toggled Content</Text>
      </Collapsible>
    );

    const header = screen.getByText("Toggle Section");

    // Expand
    fireEvent.press(header);
    expect(screen.getByText("Toggled Content")).toBeTruthy();

    // Collapse
    fireEvent.press(header);
    expect(screen.queryByText("Toggled Content")).toBeNull();
  });

  it("renders the chevron icon", () => {
    render(
      <Collapsible title="Icon Section">
        <Text>Content</Text>
      </Collapsible>
    );
    expect(screen.getByText("chevron.right")).toBeTruthy();
  });

  it("renders multiple children when expanded", () => {
    render(
      <Collapsible title="Multi-child Section">
        <Text>First Item</Text>
        <Text>Second Item</Text>
        <Text>Third Item</Text>
      </Collapsible>
    );

    const header = screen.getByText("Multi-child Section");
    fireEvent.press(header);

    expect(screen.getByText("First Item")).toBeTruthy();
    expect(screen.getByText("Second Item")).toBeTruthy();
    expect(screen.getByText("Third Item")).toBeTruthy();
  });
});
