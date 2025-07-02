# Email 邮箱字段
类型定义 `IEmailField`，使用方法示例：
```typescript
const emailField = await table.getField<IEmailField>(fieldId);
```
其中字段值的类型定义为：
```typescript
type IOpenEmail = string;
```

## createCell
创建一个邮箱字段的 `Cell`，**此处写入的字符串需要满足邮箱格式**。

```typescript
createCell: (val: string) => Promise<ICell>;
```

#### 示例
```typescript
await emailField.createCell('test@gmail.com');
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await emailField.getCell('r_id');
```

## setValue
通过 `Record` 来设置指定单元格的值，**此处写入的字符串需要满足邮箱格式**。

```typescript
setValue: (recordOrId: IRecordType | string, val: string) => Promise<boolean>;
```

#### 示例
```typescript
await emailField.setValue('r_id', 'test@gmail.com');
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenEmail>;
```

#### 示例
```typescript
await emailField.getValue('r_id');
```
