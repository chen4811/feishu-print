# Formula 公式字段
::: danger
`Formula` 公式字段**不支持手动往单元格写入值**。
:::

类型定义 `IFormulaField`，使用方法示例：
```typescript
const formulaField = await table.getField<IFormulaField>(fieldId);
```

## getCell
通过对应的 `Record` 来获取对应的 `Cell`。

```typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
```

#### 示例
```typescript
await formulaField.getCell('r_id');
```

## getValue
通过 `Record` 来获取指定单元格的值。

```typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenFormulaCellValue>;
```

#### 示例
```typescript
await formulaField.getValue('r_id');
```

## setFormula
设置公式表达式，设置成功将返回该字段的 id。

::: tip
公式的详细用法可查看 [公式字段概述](https://www.feishu.cn/hc/zh-CN/articles/360049067853-%E5%A4%9A%E7%BB%B4%E8%A1%A8%E6%A0%BC%E5%85%AC%E5%BC%8F%E5%AD%97%E6%AE%B5%E6%A6%82%E8%BF%B0)。
:::

```typescript
setFormula: (formula: string) => Promise<string>;
```

#### 示例
```typescript
await formulaField.setFormula("多行文本"); // 公式列的值等于多行文本列
await formulaField.setFormula("截止日期-开始日期"); // 计算截止日期和开始日期之间的天数
await formulaField.setFormula('单价*销量'); // 计算单价字段和销量字段的乘积
await formulaField.setFormula('[销售统计].FILTER(CurrentValue.[成员] = [成员]).[销售额].SUM()'); // 在数据表 [销售额汇总] 中，计算 [成员] 字段下，每个员工的销售总额（从数据表 [销售统计] 中跨表引用销售数据） 
```