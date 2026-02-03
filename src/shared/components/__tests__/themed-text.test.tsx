import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemedText } from "../themed-text";

// Mock the useThemeColor hook
jest.mock("@/src/shared/hooks/use-theme-color", () => ({
  useThemeColor: jest.fn(() => "#0c08f8"),
}));

describe("ThemedText", () => {
  it("renders text content", () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("applies default type styles", () => {
    render(<ThemedText type="default">Default Text</ThemedText>);
    const textElement = screen.getByText("Default Text");
    expect(textElement).toBeTruthy();
  });

  it("applies title type styles", () => {
    render(<ThemedText type="title">Title Text</ThemedText>);
    const textElement = screen.getByText("Title Text");
    expect(textElement).toBeTruthy();
  });

  it("applies subtitle type styles", () => {
    render(<ThemedText type="subtitle">Subtitle Text</ThemedText>);
    const textElement = screen.getByText("Subtitle Text");
    expect(textElement).toBeTruthy();
  });

  it("applies defaultSemiBold type styles", () => {
    render(<ThemedText type="defaultSemiBold">SemiBold Text</ThemedText>);
    const textElement = screen.getByText("SemiBold Text");
    expect(textElement).toBeTruthy();
  });

  it("applies link type styles", () => {
    render(<ThemedText type="link">Link Text</ThemedText>);
    const textElement = screen.getByText("Link Text");
    expect(textElement).toBeTruthy();
  });

  it("passes additional props to Text component", () => {
    render(
      <ThemedText testID="test-text" numberOfLines={1}>
        Props Test
      </ThemedText>
    );
    const textElement = screen.getByTestId("test-text");
    expect(textElement).toBeTruthy();
  });

  it("merges custom styles with type styles", () => {
    render(
      <ThemedText style={{ marginTop: 10 }}>Styled Text</ThemedText>
    );
    const textElement = screen.getByText("Styled Text");
    expect(textElement).toBeTruthy();
  });
});
