# Progress 进度字段
:::warning
目前暂未支持配置进度字段相关属性。
:::
类型定义 `IProgressField`，使用方法示例：
```typescript
const progressField = await table.getField<IProgressField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenNumber = number;
```

## createCell
创建一个进度字段的 `Cell`。
```typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
```

#### 示例
```typescript
await progressField.createCell(50);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。
```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await progressField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值。
```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenNumber) => Promise<boolean>;
```

#### 示例
```typescript
await progressField.setValue('r_id', 50);
```

## getValue
通过 `Record` 来获取指定单元格的值。
```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
```

#### 示例
```typescript
await progressField.getValue('r_id');
```
