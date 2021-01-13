const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

// process.env.npm_lifecycle_event;

module.exports = (_, argv) => ({
  entry: "./src/index",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
  },
  // output: {
  //   publicPath:
  //     argv.mode === "development"
  //       ? "http://localhost:8080/"
  //       : "https://micro-front-end-with-routing.vercel.app/",
  // },

  output: {
    publicPath: "http://localhost:8080/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // test: /\.css$/i,
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1@http://localhost:8081/remoteEntry.js",
        app2: "app2@http://localhost:8082/remoteEntry.js",
      },
      exposes: {},
      // remotes: {
      //   assets: "assets@https://assets-theta.vercel.app/remoteEntry.js",
      //   units: "units@https://units.vercel.app/remoteEntry.js",
      // },
      // remotes: {
      //   assets:
      //     argv.mode === "development"
      //       ? "assets@http://localhost:8081/remoteEntry.js"
      //       : "assets@https://assets-theta.vercel.app/remoteEntry.js",
      //   units:
      //     argv.mode === "development"
      //       ? "units@http://localhost:8082/remoteEntry.js"
      //       : "units@https://units.vercel.app/remoteEntry.js",
      // },
      // exposes: {
      //   "./Navigation": "./src/Navbar",
      //   "./routes": "./src/routes",
      // },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
});
