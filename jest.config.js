module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testPathIgnorePatterns: ["/node_modules/", "/cypress"],
  testMatch: ["<rootDir>/**/*.(spec|test).{js,jsx}"],
};
