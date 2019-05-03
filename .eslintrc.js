module.exports = {
  parser: "babel-eslint",

  extends: "airbnb",

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "consistent-return": [
      "error",
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    "no-use-before-define": 0,
    "react/no-unescaped-entities": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-confusing-arrow": "off",
    "implicit-arrow-linebreak": "off",
    "arrow-parens": [2, "as-needed"],
    "no-await-in-loop": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": [
      "warn",
      {
        count: 2,
      },
    ],
    quotes: [1, "double"],
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": "off",
    "react/no-did-update-set-state": "off",
    "react/prop-types": 0,
  },
};
