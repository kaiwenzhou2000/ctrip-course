// plugins/removeConsole.ts

import { Plugin } from 'vite';

export default function removeConsole(): Plugin {
    return {
        name: 'remove-console',
        enforce: 'post', // 确保在代码转换的最后阶段应用此插件
        transform(code, id) {
            // 只对 JavaScript 或 TypeScript 文件应用
            if (!/\.[jt]sx?$/.test(id)) return null;

            // 使用正则表达式移除所有 console.log 语句
            // 请注意，这个正则可能不会匹配所有情况，特别是跨多行或包含复杂表达式的 console.log
            const newCode = code.replace(/console\.log\((.*?)\);?/g, '');

            return {
                code: newCode,
                map: null, // 如果不需要 source map，可以返回 null
            };
        },
    };
}
