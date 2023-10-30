# 断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

主要有两种表现形式

- 尖括号语法

  ```typescript
  let unsure : any = 'this is a string';
  let strlength : number = (<string>unsure).length;
  ```

- as 语法

  ```typescript
  let unsure : any = 'this is a string';
  let strlength : number = (unsure as string).length;
  ```

  
