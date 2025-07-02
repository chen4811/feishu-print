# Date 日期字段
类型定义 `IDateTimeField`，使用方法示例：
```typescript
const dateTimeField = await table.getField<IDateTimeField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenTimestamp = number; // 以毫秒为单位的 Unix 时间戳
```

## createCell
创建一个日期字段的 `Cell`。

```typescript
createCell: (val: IOpenTimestamp) => Promise<ICell>;
```

#### 示例
```typescript
await dateTimeField.createCell(Date.now());
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await dateTimeField.getCell('r_id');
```

## setValue
通过 `Record` 来设置对应单元格的值。

```typescript
setValue: (recordOrId: IRecordType | string, val: IOpenTimestamp) => Promise<boolean>;
```

#### 示例
```typescript
await dateTimeField.setValue('r_id', Date.now());
```

## getValue
通过 `Record` 来获取对应单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenTimestamp>;
```

#### 示例
```typescript
await dateTimeField.getValue('r_id');
```

## setDateFormat
设置字段日期格式。
```typescript
setDateFormat: (format: DateFormatter) => Promise<IFieldRes>;
```
其中 `DateFormatter` 的数据格式为：
```typescript
enum DateFormatter {
  DATE_YMD_WITH_SLASH = 'yyyy/MM/dd', // 2021/01/30
  DATE_TIME = 'yyyy/MM/dd HH:mm', // 2021/01/30 14:00
  DATE_TIME_WITH_HYPHEN = 'yyyy-MM-dd HH:mm', // 2021-01-30 14:00
  DATE_YMD_WITH_HYPHEN = 'yyyy-MM-dd', // 2021-01-30
  DATE_MD_WITH_HYPHEN = 'MM-dd', // 01-30
  DATE_MMDD_WITH_SLASH = 'MM/dd/yyyy', // 01/30/2021
  DATE_DDMM_WITH_SLASH = 'dd/MM/yyyy', // 30/01/2021
}
```

#### 示例
```typescript
await dateTimeField.setDateFormat(DateFormatter.DATE_TIME);
```

## getDateFormat
获取日期格式。
```typescript
getDateFormat: () => Promise<DateFormatter>;
```

#### 示例
```typescript
await dateTimeField.getDateFormat();
```
