/**
 * @author huang
 * @date 2023-10-26
 *
 * 特别注意：ts4.x 与 ts5.x 对装饰器支持的语法不同 ！！！
 * ts5.x 兼容了 ts4.x 语法，但需要指定开启
 */

// 本文件采用 ts5.x 版本的装饰器语法，安装的是 ts 5.x 默认支持
// 无需在 tsconfig.json 中开启 experimentalDecorators = true 等额外配置

function withParam2(path: string) {
    console.log(`outer withParam ${path}`);
    return (target: Function) => {
        console.log(`inner withParam ${path}`);
    };
}

@withParam2('first')
@withParam2('middle')
@withParam2('last')
class ExampleClass2 {
    // ...
}

