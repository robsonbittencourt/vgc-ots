import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = {
  entry: './src/scripts/content.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        options: {
          precompile: true
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js']
  },
}

export default config