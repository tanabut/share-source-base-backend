module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["prettier", "import"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "prettier/prettier": "warn", // TODO: Make it error
    "no-shadow": "off", // use @typescript-eslint/no-shadow instead
    "no-underscore-dangle": "off",
    "no-use-before-define": "off", // use @typescript-eslint/no-use-before-define instead - is turn on in airbnb
    "no-param-reassign": "off",
    "object-shorthand": ["error", "always", { avoidQuotes: true }],
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-shadow": [
      "error",
      { ignoreFunctionTypeParameterNameValueShadow: true },
    ],
    "@typescript-eslint/method-signature-style": ["error"],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/default": "off",
    "import/first": "off", // Has conflict with import/order when using import from require('')
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "scripts/*",
          "**/jest.setup.{js,ts}",
          "**/__tests/**/*.{ts,tsx}",
          "**/*.test.{ts,tsx}",
          "**/*.stories.{ts,tsx}",
        ],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    // "sort-imports-es6-autofix/sort-imports-es6": "warn",
    // 'sort-imports': 'error',
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ["packages/*/tsconfig.json", "*/tsconfig.json"],
      },
    },
  },
  overrides: [
    {
      files: [
        "api/**/*",
        "cms-api/**/*",
        "core/**/*",
        "data-etl/**/*",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["cms-api/**/*", "core/**/*", "data-etl/**/*"],
      rules: {
        "prettier/prettier": [
          "warn",
          { ...require.resolve("./.prettierrc"), singleQuote: true },
        ], // TODO: Make it error
        "prefer-template": "warn", // TODO: Make it error
      },
    },
    {
      files: ["core/**/*", "data-etl/**/*"],
      rules: {
        camelcase: "off",
        "class-methods-use-this": "warn", // TODO: Make it error
        "import/no-cycle": "off",
        "import/no-named-as-default": "warn", // TODO: Make it error
        "@typescript-eslint/no-use-before-define": "warn", // TODO: Make it error
      },
    },
    {
      files: ["packages/client/**/*.tsx"], // TODO: Add cms-client
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "react/prop-types": "off",
      },
      globals: {
        React: "writable",
      },
      env: {
        browser: true,
        commonjs: true,
      },
    },
    // {
    //   files: ["cms-client/**/*"],
    //   rules: {
    //     "prettier/prettier": [
    //       "warn",
    //       { ...require.resolve("./.prettierrc"), singleQuote: true },
    //     ], // TODO: Make it error
    //   },
    // },
    {
      files: ["packages/client/**/*"],
      rules: {
        "prettier/prettier": [
          "error",
          { ...require.resolve("./.prettierrc"), semi: false },
        ],
      },
    },
    {
      files: [
        "packages/client/pages/**/*.tsx",
        "**/*.stories.tsx",
        "next-env.d.ts",
      ],
      rules: {
        "import/prefer-default-export": "error",
        "import/no-default-export": "off",
      },
    },
    {
      files: ["packages/types/src/*.ts"],
      rules: {
        "import/no-cycle": "off",
      },
    },
    {
      files: ["**/*.test.*"],
      env: {
        jest: true,
      },
    },
    {
      files: ["**/*.entity.ts"],
      rules: {
        "@typescript-eslint/no-use-before-define": "off",
      },
    },
  ],
  ignorePatterns: [
    "**/dist/",
    "**/build/",
    "**/__migrations/",
    "cms-client/**/*",
    "**/*.css",
    "**/*.scss",
    "**/*.svg",
  ],
};
