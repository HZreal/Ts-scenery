/**
 * @author huang
 * @date 2023-10-26
 * 装饰器：不改变原函数/类的条件下，对原函数/类进行扩充功能。 可以理解成 hook,
 * 装饰器会在代码加载阶段执行，而不是在运行时执行，而且只会执行一次。由于 TypeScript 存在编译阶段，所以装饰器对类的行为的改变，实际上发生在编译阶段。
 * 特别注意：ts4.x 与 ts5.x 对装饰器支持的语法不同 ！！！
 * ts5.x 兼容了 ts4.x 语法，但需要指定开启
 *
 * 参考：https://wangdoc.com/typescript/decorator-legacy
 */

// 本文件采用 ts4.x 版本的装饰器语法，若安装的是 ts 5.x
// 则需要在 tsconfig.json 中开启 experimentalDecorators = true 以支持 4.x 语法

// 种类有五种：
// 类装饰器（Class Decorators）：用于类。
// 属性装饰器（Property Decorators）：用于属性。
// 方法装饰器（Method Decorators）：用于方法。
// 存取器装饰器（Accessor Decorators）：用于类的 set 或 get 方法。
// 参数装饰器（Parameter Decorators）：用于方法的参数。
//
// @classDecorator // 类装饰器，实际上是应用于类的构造方法
// class Bird {
//
//     constructor() { // 构造方法没有方法装饰器，只有参数装饰器。类装饰器其实就是在装饰构造方法
//     }
//
//     @propertyDecorator // 属性装饰器
//     name: string;
//
//     @methodDecorator // 方法装饰器
//     fly(
//         @parameterDecorator // 参数装饰器
//         meters: number
//     ) {
//     }
//
//     @accessorDecorator // 访问器装饰器
//     get egg() {
//     }
// }

// 装饰器只能用于类，要么应用于类的整体，要么应用于类的内部成员，不能用于独立的函数

/**
 * 1. 类装饰器
 * 应用于类（class），但实际上是应用于类的构造方法。
 * 类装饰器有唯一参数，就是构造方法，可以在装饰器内部，对构造方法进行各种改造。如果类装饰器有返回值，就会替换掉原来的构造方法。
 * 类装饰器可以没有返回值，如果有返回值，就会替代所装饰的类的构造函数
 * 类装饰器的类型定义如下：
 *     type ClassDecorator = <TFunction extends Function>
 *       (target: TFunction) => TFunction | void;
 *     由定义知，类型参数 TFunction 必须是函数，实际上就是构造方法。类装饰器的返回值，要么是返回处理后的原始构造方法，要么返回一个新的构造方法
 */
const decorator1: ClassDecorator = (constructor) => {
    // 类装饰器 有且仅有一个函数类型的参数

    console.log('start decorating while compiling')

    //
    console.log('constructor  ---->  ', constructor);

    // 装饰器添加操作
    // 锁定这个类，使得它无法新增或删除静态成员和实例成员
    Object.seal(constructor);
    Object.seal(constructor.prototype);

    return constructor;
}

@decorator1 // 类的构造方法会自动作为类装饰器的实参传入
class AAA1 {
    static report = "report";
    title: string;

    constructor(title: string) {
        console.log('AAA initialization  ---->  ');
        this.title = title;
    }
}

const aaa1 = new AAA1('title')
AAA1.report = 'report2'
aaa1.title = 'title2'
console.log('AAA1.report, aaa1.title  ---->  ', AAA1.report, aaa1.title);
// TODO 测验由于装饰器作用，新增、删除成员变量无法进行操作

/**
 * 工厂函数
 * 将装饰器外包一个带参函数，这个带参函数（返回装饰器）即是一个工厂函数
 */
const factory = (info: string) => {
    //
    console.log('info  ---->  ', info);

    const classDecorator: ClassDecorator = (constructor) => {
        console.log('start decorating while compiling');

        // 装饰器添加操作

        return constructor;
    }
    return classDecorator
}

@factory('info')
class AAA2 {
}

const aaa2 = new AAA2()


// 由于 JavaScript 的类等同于构造函数的语法糖，所以装饰器通常返回一个新的类，对原有的类进行修改或扩展。
type Constructor = {
    new(...args: any[]): {}
};

function decorator3<T extends Constructor>(
    target: T
) {
    return class extends target {
        value = 123;
    };
}

@decorator3
class AAA31 {
    value = 111
}

// 等同于
// class AAA32 {}
// const _AAA32 = decorator3(AAA32) || AAA32;

console.log('.value  ---->  ', (new AAA31()).value);


/**
 * 2. 方法装饰器
 * 方法装饰器用来装饰类的方法，它的类型定义如下：
 *      type MethodDecorator = <T>(
 *        target: Object,
 *        propertyKey: string|symbol,
 *        descriptor: TypedPropertyDescriptor<T>
 *      ) => TypedPropertyDescriptor<T> | void;
 *      三个参数：
 *            target：（对于类的静态方法）类的构造函数，或者（对于类的实例方法）类的原型。
 *            propertyKey：所装饰方法的方法名，类型为string|symbol。
 *            descriptor：所装饰方法的描述对象。
 */

const enumerable = (value: boolean) => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        descriptor.enumerable = value;
    }
}

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        console.log('Hello, ' + this.greeting);
    }

    @((value: boolean) => {
        return (
            target: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) => {
            descriptor.enumerable = value;
        }
    })(false)
    greet2() {
        console.log('Hello, ' + this.greeting);
    }
}

const greeter = new Greeter('message')
greeter.greet()


// 例2
const logger = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    // console.log('target  ---->  ', target);
    // console.log('propertyKey  ---->  ', propertyKey);
    // console.log('original  ---->  ', descriptor);

    // 获取被装饰的函数
    const original = descriptor.value;

    descriptor.value = function (...args: any) {
        console.log('Before the add function is executed: ', ...args);
        const result = original.call(this, ...args);
        console.log('After the add function is executed: ', result);
        return result;
    }

}

class BBB1 {
    static a = 1

    @logger
    add(x: number, y: number) {
        console.log('executing add method ---->  ');
        return x + y;
    }

}

(new BBB1()).add(4, 5)


/**
 * 3. 属性装饰器
 * 类型定义如下:
 *     type PropertyDecorator =
 *       (
 *         target: Object,
 *         propertyKey: string|symbol
 *       ) => void;
 *     两个参数：
 *          target：（对于静态属性）类的构造函数 或者 （对于实例属性）类的原型对象（prototype）。
 *                这个参数，对于实例属性是类的原型对象，而不是实例对象（即不是this对象）。这是因为装饰器执行时，类还没有新建实例，所以实例对象不存在。
 *                由于拿不到this，所以属性装饰器无法获得实例属性的值。这也是它没有在参数里面提供属性描述对象的原因。
 *          propertyKey：所装饰属性的属性名，注意类型有可能是字符串，也有可能是 Symbol 值。
 *     属性装饰器不仅无法获得实例属性的值，也不能初始化或修改实例属性，而且属性装饰器不需要返回值，即使有也会被忽略
 */
function ValidRange(min: number, max: number) {
    // 装饰器ValidRange对属性year设立了一个上下限检查器，只要该属性赋值时，超过了上下限，就会报错

    return (target: Object, key: string) => {
        // console.log('target  ---->  ', target);
        // console.log('key  ---->  ', key);

        // 重新定义该属性的 set 方法
        // 增加对该属性的校验功能
        Object.defineProperty(target, key, {
            set: function (v: number) {
                if (v < min || v > max) {
                    throw new Error(`Not allowed value ${v}`);
                }
                console.log('set successfully ---->  ');
            }
        });
    }
}

// 输出 Installing ValidRange on year
class Student {
    @ValidRange(1920, 2020) // 上下限检查器
    year!: number;
}

const stud = new Student();
//
stud.year = 2000; // 不报错
// stud.year = 2022; // 报错 Not allowed value 2022


// 不过，如果属性装饰器设置了当前属性的存取器（getter/setter），然后在构造函数里面就可以对实例属性进行读写。
function Min(limit: number) {
    return function (
        target: Object,
        propertyKey: string
    ) {
        let value: string;

        const getter = function () {
            return value;
        };

        const setter = function (newVal: string) {
            if (newVal.length < limit) {
                throw new Error(`Your password should be bigger than ${limit}`);
            } else {
                value = newVal;
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

class User {
    username: string;

    @Min(8)
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

const u = new User('Foo', 'pasgfdhgdfs');

// 报错 Your password should be bigger than 8


/**
 * 4. 访问装饰器/存取器装饰器
 * 所谓“存取器”指的是某个属性的取值器（getter）和存值器（setter）。
 * 类型定义，与方法装饰器一致：
 */
function configurable(value: boolean) {
    // 关闭了所装饰属性（x和y）的属性描述对象的configurable键（即关闭了属性的可配置性）
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;

    #name!: string;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x;
    }

    @configurable(false)
    get y() {
        return this._y;
    }

    // TypeScript 不允许对同一个属性的存取器（getter 和 setter）使用同一个装饰器，也就是说只能装饰两个存取器里面的一个，且必须是排在前面的那一个
    // @Decorator
    set name(n: string) {
        this.#name = n;
    }

    // @Decorator // 会报错
    get name() {
        return this.#name;
    }
}


/**
 * 5. 参数装饰器
 */

