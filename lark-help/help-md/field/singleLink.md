# SingleLink 单向关联字段

类型定义 `ISingleLinkField`，使用方法示例：
```typescript
const singleLinkField = await table.getField<ISingleLinkField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenLink = {
  recordIds: string[]; // 被关联的记录 id 列表
  text: string; // 被关联记录的文本汇总值，用 , 连接
  tableId: string; // 被关联表的 id
};
```
## createCell
创建一个双向关联字段的 `Cell`。

```typescript
createCell: (val: Partial<IOpenLink>) => Promise<ICell>;
```

#### 示例
```typescript
await singleLinkField.createCell({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await singleLinkField.getCell('r_id');
```

## setValue
通过 `Record` 来设置对应单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenLink) => Promise<boolean>;
```

#### 示例
```typescript
await singleLinkField.setValue({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenLink>;
```

#### 示例
```typescript
await singleLinkField.getValue('r_id');
```

## setTableId
设置关联的数据表 `Table`。

```typescript
setTableId: (tableId: string) => Promise<IFieldRes>;
```

#### 示例
```typescript
await singleLinkField.setTableId('t_id');
```

## getTableId
获取关联的数据表 `id`。

```typescript
getTableId: () => Promise<string>;
```

#### 示例
```typescript
await singleLinkField.getTableId();
```

## setMultiple
设置是否允许关联多条记录。

```typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
```

#### 示例
```typescript
await singleLinkField.setMultiple(true);
```

## getMultiple
获取是否允许关联多条记录。

```typescript
getMultiple: () => Promise<boolean>;
```

#### 示例
```typescript
await singleLinkField.getMultiple();
```