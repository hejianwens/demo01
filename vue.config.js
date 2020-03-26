module.exports = {
    devServer: {
        port: 8081, // 端口
        proxy: {
            '/shop': {     //这里最好有一个 /
                target: 'http://localhost:8001/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    // '^/customer': '',

                }
            },
            '/customer': {     //这里最好有一个 /
                target: 'http://localhost:8001/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    // '^/customer': '',

                }
            },
            '/goods': {
                target: 'http://localhost:8003/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite: {
                //     '^/goods': '',

                // }
            },
            '/recommendGoods': {
                target: 'http://localhost:8003/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite: {
                //     '^/recommendGoods': '',

                // }
            },
            '/buyCar': {
                target: 'http://localhost:8002/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite: {
                //     '^/goods': '',

                // }
            },
            '/order': {
                target: 'http://localhost:8004/',  // 后台接口域名(网关)
                ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                // pathRewrite: {
                //     '^/goods': '',

                // }
            },
        },

    }
}
