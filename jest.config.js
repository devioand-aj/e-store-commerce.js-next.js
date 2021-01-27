module.exports = {
   testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
   setupFilesAfterEnv: ["<rootDir>/setupTests.js", './jest.setup.js'],
   transform: {
     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
     "\\.(css|less|scss|sass)$": "identity-obj-proxy", // identity-obj-proxy install it first!
    //  "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
      "^.+\\.svg$": "<rootDir>/svgTransform.js"

   }
 };