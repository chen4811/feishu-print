# Currency 货币字段
类型定义 `ICurrencyField`，使用方法示例：
```typescript
const currencyField = await table.getField<ICurrencyField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenNumber = number;
```

## createCell
通过传入数值来创建对应的 `Cell`。

```typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
```

#### 示例 
```typescript
await currencyField.createCell('100'); 
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例 
```typescript
await currencyField.getCell(recordId); 
```

## setValue
通过 `Record` 来设置指定单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: number) => Promise<boolean>;
```

#### 示例 
```typescript
await currencyField.setValue(recordId, '1000'); 
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<number>;
```

#### 示例 
```typescript
await currencyField.getValue(recordId); 
```

## setDecimalDigits
设置货币精度，**精度取值范围** `0~4`。

```typescript
setDecimalDigits: (decimalDigits: number) => Promise<IFieldRes>;
```

#### 示例 
```typescript
await currencyField.setDecimalDigits(4); // 0～4
```

## getDecimalDigits
获取货币精度。

```typescript
getDecimalDigits: () => Promise<number>;
```

#### 示例 
```typescript
await currencyField.getDecimalDigits(); // 0～4
```

## setCurrencyCode
设置货币类型。

```typescript
setCurrencyCode: (currencyCode: CurrencyCode) => Promise<IFieldRes>;
```

其中 `CurrencyCode` 的类型定义如下：
```typescript
enum CurrencyCode {
  CNY = 'CNY',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  AED = 'AED',
  AUD = 'AUD',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  HKD = 'HKD',
  INR = 'INR',
  IDR = 'IDR',
  JPY = 'JPY',
  KRW = 'KRW',
  MOP = 'MOP',
  MXN = 'MXN',
  MYR = 'MYR',
  PHP = 'PHP',
  PLN = 'PLN',
  RUB = 'RUB',
  SGD = 'SGD',
  THB = 'THB',
  TRY = 'TRY',
  TWD = 'TWD',
  VND = 'VND',
}
```

#### 示例 
```typescript
await currencyField.setCurrencyCode(CurrencyCode.CNY);
```

## getCurrencyCode
获取货币类型。

```typescript
getCurrencyCode: () => Promise<CurrencyCode>;
```

#### 示例 
```typescript
await currencyField.getCurrencyCode();
```

