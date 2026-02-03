import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { ThemedView } from "../themed-view";

// Mock the useThemeColor hook
jest.mock("@/src/shared/hooks/use-theme-color", () => ({
  useThemeColor: jest.fn(() => "#0aa9e7"),
}));

describe("ThemedView", () => {
  it("renders children correctly", () => {
    render(
      <ThemedView>
        <Text>Child Content</Text>
      </ThemedView>
    );
    expect(screen.getByText("Child Content")).toBeTruthy();
  });

  it("accepts testID prop", () => {
    render(<ThemedView testID="test-view" />);
    expect(screen.getByTestId("test-view")).toBeTruthy();
  });

  it("merges custom styles with background color", () => {
    render(
      <ThemedView testID="styled-view" style={{ padding: 20 }}>
        <Text>Styled Content</Text>
      </ThemedView>
    );
    const view = screen.getByTestId("styled-view");
    expect(view).toBeTruthy();
  });

  it("passes additional View props", () => {
    render(
      <ThemedView testID="props-view" accessibilityLabel="Test View">
        <Text>Accessible Content</Text>
      </ThemedView>
    );
    const view = screen.getByTestId("props-view");
    expect(view.props.accessibilityLabel).toBe("Test View");
  });

  it("renders without children", () => {
    render(<ThemedView testID="empty-view" />);
    expect(screen.getByTestId("empty-view")).toBeTruthy();
  });

  it("renders multiple children", () => {
    render(
      <ThemedView>
        <Text>First Child</Text>
        <Text>Second Child</Text>
        <Text>Third Child</Text>
      </ThemedView>
    );
    expect(screen.getByText("First Child")).toBeTruthy();
    expect(screen.getByText("Second Child")).toBeTruthy();
    expect(screen.getByText("Third Child")).toBeTruthy();
  });
});
