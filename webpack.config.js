const nodeExternals = require('webpack-node-externals')
const { join, resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  watch: true,
  entry: ['webpack/hot/poll?1000', './src/main.ts'],
  target: 'node',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: 'ts-loader',
        test: /.tsx?$/
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  resolve: {
    alias: {
      '@graphql': resolve(__dirname, 'src/modules/graphql'),
      '@interceptors': resolve(__dirname, 'src/interceptors'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@modules': resolve(__dirname, 'src/modules'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@entities': resolve(__dirname, 'src/entities'),
      '@src': resolve(__dirname, 'src/')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  output: {
    filename: 'server.js',
    path: join(__dirname, '.hot')
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
