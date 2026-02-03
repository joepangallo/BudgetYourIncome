// Mock expo winter runtime globals before anything else
global.__ExpoImportMetaRegistry = new Map();

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

// Mock expo-web-browser
jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: "automatic",
  },
}));

// Mock expo-symbols
jest.mock("expo-symbols", () => ({
  SymbolView: "SymbolView",
}));

// Mock useColorScheme from react-native
jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  default: jest.fn(() => "light"),
}));

// Silence the warning about reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});
