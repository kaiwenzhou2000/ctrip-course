class RemoveConsolePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('RemoveConsolePlugin', (compilation, callback) => {
      Object.keys(compilation.assets).forEach((asset) => {
        if (asset.endsWith('.js')) {
          const originalSource = compilation.assets[asset].source();
          const modifiedSource = originalSource.replace(/console\.log\(([^)]+)\);?/g, '');

          compilation.assets[asset] = {
            source: () => modifiedSource,
            size: () => modifiedSource.length
          };
        }
      });

      callback();
    });
  }
}

module.exports = RemoveConsolePlugin;