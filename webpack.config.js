module.exports = {
  name: 'index',
  entry: __dirname + '/src/index.js',
	output: {
		filename: 'index.js'
	},
  devServer: {
    contentBase: __dirname + "/src/",
    port: 9010
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(css|scss)$/,    
      loaders: ["css-loader","sass-loader"]
    }]
  }
}