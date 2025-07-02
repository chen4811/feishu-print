# Checkbox 复选框字段
类型定义 `ICheckBoxField`，使用方法示例：
```typescript
const checkboxField = await table.getField<ICheckBoxField>(fieldId);
```
其中字段值的类型定义为：
```typescript
export type IOpenCheckbox = boolean;
```

## createCell
创建一个复选框字段的 `Cell`。
```typescript
createCell: (val: IOpenCheckbox) => Promise<ICell>;
```
### 示例
```typescript
const cell = await checkBoxField.createCell(false);
await table.addRecord(cell);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。
```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```
### 示例
```typescript
const cell = await checkBoxField.getCell(recordId);
```

## setValue
通过 `Record` 来设置指定单元格的值。
```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenCheckbox) => Promise<boolean>;
```
### 示例
```typescript
await checkBoxField.setValue(recordId, false);
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenCheckbox>;
```
### 示例
```typescript
await checkBoxField.getValue(recordId);
```