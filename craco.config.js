module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // if (process.env.NODE_ENV === "production") {
            //     const TerserPlugin = webpackConfig.optimization.minimizer.find(
            //         (i) => i.constructor.name === "TerserPlugin"
            //     );
            //     if (TerserPlugin) {
            //         TerserPlugin.options.minimizer.options.compress[
            //             "drop_console"
            //         ] = true;
            //     }
            // }

            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === "development" &&
                            require.resolve(
                                "react-dev-utils/webpackHotDevClient"
                            ),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    content: ["./src/chrome-content/content.ts"],
                },
                output: {
                    ...webpackConfig.output,
                    filename: "static/js/[name].js",
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
            };
        },
    },
};
