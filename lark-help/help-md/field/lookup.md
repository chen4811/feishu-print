# Lookup 查找引用字段
::: danger
`Lookup` 查找引用字段**不支持手动往单元格写入值**。
:::

类型定义 `ILookupField`，使用方法示例：
```typescript
const lookupField = await table.getField<ILookupField>(fieldId);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await lookupField.getCell('r_id');
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenFormulaCellValue>;
```

#### 示例
```typescript
await lookupField.getValue('r_id');
```
