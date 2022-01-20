const pathModule = require("path")
const htmlwebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "production",
  output: {
    filename: "bundle.min.js"
    , path: pathModule.resolve(__dirname, "dist"),
    assetModuleFilename: 'images/[name][ext]'
  },
  entry: "./src/index.js",
  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use:  [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader","sass-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
  , plugins: [
    new htmlwebpackPlugin({template:"src/index.html"}),
    new MiniCssExtractPlugin({ filename: "styles.css" }),    
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin()
      
  ],
  optimization:{
    minimize:true,
    minimizer:[
      
      "...",
      new ImageMinimizerPlugin({
        minimizerOptions: {
            // Lossless and lossy optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg",{quality:50}],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
             ['svgo']
            ],
        },
      }),
    ]
  }
}