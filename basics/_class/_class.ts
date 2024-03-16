/**
 * @author huang
 * @date 2023-10-27
 */
class DemoClass {
  static a: number; // 静态属性，无需初始化

  // b: number // 报错：Property 'b' has no initializer and is not definitely assigned in the constructor.

  c!: number; // ! 表示该变量会在构造函数之外的地方被初始化，否则会报错
}

DemoClass.a = 2;
console.log("  ---->  ", DemoClass.a);

const demoObj = new DemoClass();
// TODO 待考究
const customSetter = () => {};
Object.defineProperty(DemoClass, "c", { set(v: any) {} });
demoObj.c = 1; // 实际是调用类该属性的 set 方法
const b = demoObj.c; // 实际是调用类该属性的 get 方法
