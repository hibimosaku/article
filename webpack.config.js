//webpack.config.js
const { VueLoaderPlugin } = require('vue-loader');　　　　

module.exports = {
  entry:'./src/index.ts',
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  resolve:{　　　　　　　　　　　　　　　　　　
    extensions: [".vue", ".js", ".ts"],
  },
  module:{
    rules:[
      {　　　　　　　　　　　　　　　　　　　　
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      }, 
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },      
      {　　　　　　　　　　　　　　　　　　　　
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()　　　　　　　　　　
  ],
}