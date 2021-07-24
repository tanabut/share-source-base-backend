module.exports = {
  plugins: [
    "stylelint-prettier",
    "stylelint-order",
    "stylelint-declaration-use-variable",
    "stylelint-scss",
  ],
  extends: ["stylelint-config-prettier"],
  rules: {
    "prettier/prettier": true,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "unit-allowed-list": [
      ["px", "vw", "vh", "%", "s", "deg", "fr"],
      { ignoreProperties: { rem: ["background-size"] } },
    ],
    "no-descending-specificity": null,
    "sh-waqar/declaration-use-variable": [
      [
        "/color/",
        "z-index",
        "font-size",
        { ignoreValues: ["transparent", "inherit"] },
      ],
    ],
  },
  ignoreFiles: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
};
