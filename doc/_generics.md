# 泛型（Generics）

指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。



## 一、泛型三处应用

#### 泛型函数

```typescript
// 方式一：不限制类型写法，无法指定函数参数的类型
function getValue(value: any): ant {
	return value;
}

// 方式二：限制类型写法,需要两个函数
function getString(value: string): string {
	return value;
}

function getNumber(value: number): number {
	return value;
}

// 方式三：泛型函数，函数参数类型不确定，依实际传入而定
function getValue<T>(value: T): T {
	return value;
}

getValue<string>("hello");  // 实际传入的参数类型是string
getValue<number>(100);

```



#### 泛型接口

```typescript
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```



```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

```



#### 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

```typescript
export class HelloClass<T> {
    protected data: T[];
    constructor(config: T[]) {
        this.data = config;
    }

    async getValue(index: number): Promise<T> {
        return this.data[index];
    }
}

const hello = new HelloClass<string>();
await hello.getValue(1)
```



## 二、泛型约束

指对泛型参数的范围进行约束 就是说虽然类型可以被当做参数传递 但是传递的类型不能是随意的想传什么就传什么 通过泛型约束可以限制能够传递的类型的范围

示例如下（**泛型约束的为基本数据类型**）：

```typescript
// 限制类型 T 的范围  就是说  T  的类型要么是字符串要么是数值  其他的是不可以的
class StringOrNumberArray<T extends string | number> {
	constructor(public collection: T[]) {}
	get(index: number): T {
		return this.collection[index];
	}
}

new StringOrNumberArray<string>(["a", "b"])
new StringOrNumberArray<number>([100, 200])

// 类型  boolean  不满足约束  string | number
// new StringOrNumberArray<boolean>([true, false]);

```

```typescript
function echo<T extends string | number>(value: T): T {
	return value;
}

echo<string>("hello")
echo<number>(100)
echo<boolean>(true)

```

```typescript
class Person {
	constructor(public name: string) {}
	
}

class Custom extends Person {}
function echo<T extends Person>(value: T): T {
	return value;
}

echo<Person>(new Person("张三"))；
echo<Custom>(new Custom("李四"));

```



**当泛型约束的为class**

```ty
class Person {
	constructor(public name: string) {}	
}

class Custom extends Person {}
function echo<T extends Person>(value: T): T {
	return value;
}

echo<Person>(new Person("张三"))；
echo<Custom>(new Custom("李四"));

```



**当泛型约束的为interface**

```typescript
interface Printable {
	print(): void;
}

function echo<T extends Printable>(target: T) {
	target.print()
}

class Car {
	print() {}
}

class Hourse {
	print() {}
}

echo<Car>(new Car());
echo<Hourse>(new Hourse());
```



注意：在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

```typescript
// 错误示例
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}
// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

```typescript
// 正确示例
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```



#### 泛型参数的默认类型

```typescript
function createArray<T = string>(length: number, value: T): Array<T> {}
```



#### 继承泛型类

```typescript
export class Store<T> {
    protected _object: T[];

    add(obj: T) {
        this._object.push(obj);
    }
}

export interface Product {
    name: string;
    price: number;
}

// 继承 泛型类
class CompressibleStore1<T> extends Store<T> {}
const compressibleStore = new CompressibleStore1<Product>();
compressibleStore.add({ name: 'apple', price: 1 });

// 继承 类 （传入类型的基类就是普通的类了）
class CompressibleStore2 extends Store<Product> {}
const compressibleStore2 = new CompressibleStore2();
compressibleStore2.add({ name: 'apple', price: 1 });


```



