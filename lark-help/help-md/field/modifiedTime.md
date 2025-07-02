# ModifiedTime 更新时间字段
::: danger
`ModifiedTime` 更新时间字段**不支持手动往单元格写入值**。
:::
类型定义 `IModifiedTimeField`，使用方法示例：
```typescript
const modifiedTimeField = await table.getField<IModifiedTimeField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenTimestamp = number;
```

## getValue
获取指定单元格的更新时间。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenTimestamp>;
```

#### 示例
```typescript
await modifiedTimeField.getValue('r_id');
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await modifiedTimeField.getCell('r_id');
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
await modifiedTimeField.setDateFormat(DateFormatter.DATE_TIME);
```

## getDateFormat
获取日期格式。
```typescript
getDateFormat: () => Promise<DateFormatter>;
```

#### 示例
```typescript
await modifiedTimeField.getDateFormat();
```