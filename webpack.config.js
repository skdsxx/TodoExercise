const path=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //引入这行
const webpack=require('webpack');
const isDev=process.env.NODE_ENV === 'development';
const HTMLPligin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config={
    target:'web',
    mode:'none',
    entry:'./src/index.js',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
        },
   
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.(jpg|gif|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit:6000,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.svg/,
                loader:'svg-url-loader'
                    
            }
        ]
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[       
        new VueLoaderPlugin(), //new一个实例
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPligin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          }),
    ]
};  

if(isDev){
    config.module.rules.push({
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    });
    config.devtool='#cheap-module-eval-source-map';
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true
        //open:true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
}
else{

}

module.exports=config;