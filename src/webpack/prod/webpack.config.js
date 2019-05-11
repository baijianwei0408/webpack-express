const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 根据模板生成html插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css从js中分离插件
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin'); // 清空输出路径插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩插件

module.exports = ({
    entry: './src/pages/index.js',
    output: {
        filename: '[name].bundle.[hash:6].js', // 入口文件名
        chunkFilename: '[name].bundle.[hash:6].js', // 非入口文件名
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            //css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            //sass
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //png|svg|jpg|gif
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: '10240',
                        name: 'images/[name].[hash:6].[ext]',
                    }
                }],
            },
            //woff|woff2|eot|ttf|otf
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        //清空输入目录
        new CleanWebpackPlugin(),
        //从js中抽离css
        new ExtractTextPlugin("[name].[hash:6].css"),
        //根据模版自动生成html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
        }),
        //环境变量
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //压缩css文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'common',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        noEmitOnErrors: true
    },
})