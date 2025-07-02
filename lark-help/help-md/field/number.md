# Number 数字字段
类型定义 `INumberField`，使用方法示例：
```typescript
const numberField = await table.getField<INumberField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenNumber = number;
```

## createCell
创建一个数字字段的 `Cell`。

```typescript
createCell: (val: number) => Promise<ICell>;
```

#### 示例
```typescript
await numberField.createCell(123);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await numberField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: number) => Promise<boolean>;
```

#### 示例
```typescript
await numberField.setValue('r_id', 123);
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
```

#### 示例
```typescript
await numberField.getValue('r_id');
```

## setFormatter
设置数字的格式。
```typescript
setFormatter: (formatter: NumberFormatter) => Promise<IFieldRes>;
```
其中 `NumberFormatter` 的类型定义如下：
```typescript
enum NumberFormatter {
  INTEGER = '0',
  DIGITAL_ROUNDED_1 = '0.0',
  DIGITAL_ROUNDED_2 = '0.00',
  DIGITAL_ROUNDED_3 = '0.000',
  DIGITAL_ROUNDED_4 = '0.0000',
  DIGITAL_THOUSANDS = '1,000',
  DIGITAL_THOUSANDS_DECIMALS = '1,000.00',
  PERCENTAGE_ROUNDED = '0%',
  PERCENTAGE = '0.00%',
}
```

#### 示例
```typescript
await numberField.setFormatter(NumberFormatter.INTEGER);
```

## getFormatter
获取当前的数字格式。
```typescript
getFormatter: () => Promise<NumberFormatter>;
```

#### 示例
```typescript
await numberField.getFormatter();
```