# Phone 电话字段
类型定义 `IPhoneField`，使用方法示例：
```typescript
const phoneField = await table.getField<IPhoneField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenPhone = string;
```


## createCell
创建一个电话字段的 `Cell`。

```typescript
createCell: (val: IOpenPhone) => Promise<ICell>;
```

#### 示例
```typescript
await phoneField.createCell(123456789);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await phoneField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值，**此处写入的字符串不会校验电话格式**。

```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenPhone) => Promise<boolean>;
```

#### 示例
```typescript
await phoneField.setValue('r_id', 123456789);
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenPhone>;
```

#### 示例
```typescript
await phoneField.getValue('r_id');
```