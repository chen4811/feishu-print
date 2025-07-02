# Cell 模块

`Cell` 模块可以理解为表格视图中的单元格，通过 `Cell` 模块能够**以更细的粒度操作数据表**，可以通过如下几种方式来获取 `Cell`：

1. 通过字段 `Field` 来创建一个 `Cell`
  
**新创建的 `Cell` 还未插入 `Table`**，所以在给 `Cell` 赋值时都**不会对 `Table` 中的数据产生任何影响**，此时的 `Cell` 最大的用途是用来作为 `addRecord/addRecords` 的参数，只有通过 `addRecord/addRecords` 插入数据表之后的 `Cell` 才会和数据表中的数据产生联动。

```typescript
const cell = await field.createCell(val);
````

2. 通过 `Field` 来获取一个 `Cell` 
  
**这时的 `Cell` 已经存在于数据表中，因此 `Cell` 和数据表中的数据是相互联动的**。

```typescript
const cell = await field.getCell(recordOrId)
```

3. 通过 `Record` 获取 `Cell`

同样的，**这时的 `Cell` 已经存在于数据表中，因此 `Cell` 和数据表中的数据是相互联动的**。

```typescript
const cellList = await record.getCellList();
const cell = await record.getCellByField(fieldOrId);
``` 

> 更推荐通过 `Field` 来对 `Cell` 进行操作，因为会有足够的类型提示，每一个 `Cell` 的类型定义都会有准确的补全，因此会有更好的语法提示
```typescript
const attachmentCell = await attachmentField.createCell(imageFileList);
const singleSelectCell = await singleSelectField.createCell('option1');
const recordId = await table.addRecord([attachmentCell, singleSelectCell]);
```

## setValue
设置一个单元格的值，当单元格已经插入 `Table` 后，会实时改变 `Table` 中的值

```typescript
setValue: (val: V) => Promise<void | boolean>;
```

#### 示例
```typescript
const cell = await textField.createCell('test');
cell.setValue('modify value');
```

## getValue
获取一个单元格的值，当单元格已经插入 `Table` 后，会获取 `Table` 中的值

```typescript
getValue: () => Promise<R>;
```

#### 示例
```typescript
const cell = await field.getCell(recordOrId);
const value = await cell.getValue();
```

## getFieldId
获取当前单元格所属的字段的 `id`

```typescript
getFieldId: () => string;
```

#### 示例
```typescript
const fieldId = cell.getFieldId();
```
