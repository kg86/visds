const path = require('path')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  // devtool: 'cheap-eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  entry: {
    vis_suffix_tree: './src/vis_suffix_tree.ts',
    vis_dag: './src/vis_dag.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: ['node_modules', 'color-convert', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  performance: { hints: false },
  serve: {
    host: '127.0.0.1',
    port: 8080,
    open: true,
    content: 'dist/',
  },
  plugins: [
    new TypedocWebpackPlugin(
      {
        out: '../docs',
        name: 'VisDS API',
        mode: 'file',
        target: 'es6',
        includeDeclarations: false,
        ignoreCompilerErrors: true,
        excludePrivate: true,
      },
      ['./src/'],
    ),
  ],
}
