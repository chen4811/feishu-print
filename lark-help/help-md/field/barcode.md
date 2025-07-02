# Barcode 条码字段
类型定义 `IBarcodeField`，使用方法示例：
```typescript
const barcodeField = await table.getField<IBarcodeField>(fieldId);
```
`条码字段`与`文本字段`的类型定义完全相同，详情可参考[文本字段](./text.md)。

## createCell
创建一个条码字段的 `Cell`，支持直接传入字符串。
```typescript
createCell: (val: BarcodeTransformVal) => Promise<ICell>;
```
### 示例
```typescript
const cell = await barcodeField.createCell('barcode');
await table.addRecord(cell);
```

## getCell
通过对应的记录 `Record` 来获取对应的 `Cell`。
```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```
### 示例
```typescript
const cell = await barcodeField.getCell(recordId);
```

## setValue
通过对应的记录 `Record` 来设置对应的值，支持直接传入字符串。
```typescript
setValue: (recordOrId: IRecordType | string, val: BarcodeTransformVal) => Promise<boolean>;
```
### 示例
```typescript
await barcodeField.setValue('r_id', 'barcode');
```

## getValue
通过 `Record` 来获取指定单元格的值。
```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenSegment[]>;
```
### 示例
```typescript
const val = await barcodeField.getValue(recordId);
```

## setOnlyMobile
设置是否仅可通过移动端扫码录入, 为 true 时表示只运行移动端扫码录入。
```typescript
setOnlyMobile: (onlyMobile: boolean) => Promise<boolean>;
```
### 示例
```typescript
await barcodeField.setOnlyMobile(true);
```

## getOnlyMobile
获取是否仅可通过移动端扫码录入, 为 true 时表示只运行移动端扫码录入。
```typescript
getOnlyMobile: () => Promise<boolean>;
```
### 示例
```typescript
await barcodeField.getOnlyMobile();
```


