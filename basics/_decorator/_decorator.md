# Decorator

ts 5.x 之前，有如下种类：

- 类装饰器
- 属性装饰器
- 方法装饰器
- 访问器装饰器
- 参数装饰器

```
// 类装饰器
@classDecorator
class Bird {

  // 属性装饰器
  @propertyDecorator
  name: string;
  
  // 方法装饰器
  @methodDecorator
  fly(
    // 参数装饰器
    @parameterDecorator
      meters: number
  ) {}
  
  // 访问器装饰器
  @accessorDecorator
  get egg() {}
}

```

最新 ts 5.x，有如下种类：

- 类装饰器
- 属性装饰器
- 自动访问器装饰器（从 v4.9 引入）
- `getter/setter` 访问器装饰器
- 类方法装饰器

PS：与stage 2 的区别是，stage 3 当前就不支持`参数装饰器`了。`参数 Decorator` 已经从 Decorator 主体的 Proposal 中分离出来，还在讨论中：https://github.com/tc39/proposal-decorators/issues/47



注意事项：

在 TypeScript 5.x 之前，装饰器还只是作为一个实验性功能，使用时需要在`tsconfig.json` 中开启以下配置：

```
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

```

从 v5.0 开始，不需要此设置，默认情况下可以使用 stage 3 的装饰器。