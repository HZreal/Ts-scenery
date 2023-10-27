/**
 * @author huang
 * @date 2023-10-27
 */
class DemoClass {
    a!: number // ! 表示该变量会在构造函数之外的地方被初始化，否则会报错

    // b: number // 报错：Property 'b' has no initializer and is not definitely assigned in the constructor.

}
new DemoClass()