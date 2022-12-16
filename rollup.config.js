import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default {
    input: pkg.source,
    output: [
        {
            file: pkg.main, format: 'cjs',
            compact: false,
            sourcemap: true,
            inputSourceMap: true,
            minifyInternalExports: false,
            sourcemapExcludeSources: false,
      
        },
        { file: pkg.module, format: 'esm',
        compact: false,
        sourcemap: true,
        inputSourceMap: true,
        minifyInternalExports: false,
        sourcemapExcludeSources: false,
  
        }
    ],
    plugins: [
        external(),
        babel({
            minified: false,
            compact: false,
            sourceMaps: true,    
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        del({ targets: ['dist/*'] }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};