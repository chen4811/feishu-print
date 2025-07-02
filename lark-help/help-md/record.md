# Record 模块
::: warning 
更推荐开发者们从 [`Field(字段)`](field.md) 字段角度来考虑对数据的增删改查
:::
在 `Table` 中，可以通过 `getRecordList` 接口获取到 `RecordList`(Record 记录的一个数组集合，其中有当前 table 下所有的记录），`RecordList` 是可以遍历使用的，使用方式如下（不推荐，会有性能相关问题）:
```typescript
const recordList = await table.getRecordList();
for (const record of recordList) {
  const cell = await record.getCellByField(fieldId);
  const val = await cell.getValue();
}
```
`cell` 可以简单类比为表格中的单元格，其中有对应的值(关于 [`Cell`](cell.md))
```typescript
const record = await recordList.getRecordById(recordId);
```
不过，还是更推荐开发者在对数据进行增删改查时，从 [`Field(字段)`](field.md) 来考虑

## getCellList
获取当前记录中所有的 `Cell`(关于 [`Cell`](cell.md))

```typescript
getCellList: () => Promise<ICell[]>;
```

#### 示例
```typescript
const recordList = await table.getRecordList();
const cellList = await recordList[0].getCellList();
```

## getCellByField
通过 Field 来获取 `Cell`(关于 [`Cell`](cell.md))

```typescript
getCellByField: (fieldOrId: IField | string) => Promise<ICell>;
```

#### 示例
```typescript
const recordList = await table.getRecordList();
const textField = await table.getField('多行文本');
const cell = await recordList[0].getCellByField(textField);
```