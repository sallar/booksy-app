module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: [
          '.tsx',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.js',
          '.ios.js',
          '.android.js',
        ],
        root: ['./src'],
        alias: {
          '@navigation': './src/navigation',
          '@navigation': './src/navigation',
          '@api': './src/api',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ],
  ],
};
