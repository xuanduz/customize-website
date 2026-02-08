const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'extension'),
  entry: {
    contentScript: './src/content/contentScript.ts',
    serviceWorker: './src/background/serviceWorker.ts',
    popup: './src/popup/popup.ts',
    options: './src/options/options.ts'
  },
  output: {
    path: path.resolve(__dirname, 'extension/dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'extension/tsconfig.json')
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' },
        { from: 'src/popup/popup.html', to: 'popup.html' },
        { from: 'src/popup/popup.css', to: 'popup.css' },
        { from: 'src/options/options.html', to: 'options.html' },
        { from: 'src/options/options.css', to: 'options.css' }
      ]
    })
  ]
};