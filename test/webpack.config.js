module.exports = {
    entry : `${__dirname}/desktop.bundles/index/index.tsx`,
    output : {
        path : `${__dirname}/desktop.bundles/index/`,
        publicPath : `/desktop.bundles/index/`,
        filename : '_index.js'
    },
    module : {
        loaders: [
            {
                test : /\.ts|tsx$/,
                exclude : /node_modules/,
                loaders : ['webpack-bem', 'babel', 'ts']
            },
            {
                test : /\.css$/,
                loaders : ['style', 'css']
            }
        ]
    },
    resolve: {
        alias: {
            'snabbdom-bem' : require.resolve('../')
        }
    },
    bemLoader : {
        techs : ['ts', 'tsx', 'css'], // NOTE: order is very important! JS first!!
        levels : [
            `${__dirname}/common.blocks`,
            `${__dirname}/desktop.blocks`
        ]
    }
};
