# 基础能力

字段模块上的一些`基础能力`，如获取字段 `id`、`类型`和`元信息`等，不同类型的字段会在此基础上拓展个性化的 API，可以点击具体类型的字段模块进行查看。

## id
当前字段的 id

## tableId
当前字段所属的数据表 id

## getName
```typescript
getName(): Promise<string>;
```
获取字段名

## getType
```typescript
getType(): Promise<FieldType>;
```
获取字段类型，目前我们已支持了多种字段类型，以下是目前支持的字段类型 `FieldType` 枚举值：

```typescript
export enum FieldType {
  Text = 1, // 多行文本
  Number = 2, // 数字
  SingleSelect = 3, // 单选
  MultiSelect = 4, // 多选
  DateTime = 5, // 日期
  Checkbox = 7, // 复选框
  User = 11, // 人员
  Phone = 13, // 电话
  Url = 15, // 超链接
  Attachment = 17, // 附件
  SingleLink = 18, // 单向关联
  Lookup = 19, // 查找引用
  Formula = 20, // 公式
  DuplexLink = 21, // 双向关联
  Location = 22, // 地理位置
  GroupChat = 23, // 群聊
  CreatedTime = 1001, // 创建时间
  ModifiedTime = 1002, // 修改时间
  CreatedUser = 1003, // 创建人
  ModifiedUser = 1004, // 修改人
  AutoNumber = 1005, // 自动编号
  Barcode = 99001, // 二维码
  Progress = 99002, // 进度条
  Currency = 99003, // 货币
  Rating = 99004, // 评分
  Email = 99005 // 邮箱
}
```

## getMeta
```typescript
getMeta(): Promise<IFieldMeta>;
```
获取字段元信息，不同字段的元信息不同，具体类型定义可点击相应字段模块查看。

## getFieldValueList
```typescript
getFieldValueList(): Promise<IFieldValue[]>;
```
获取当前字段一整列的值，不同字段的字段值不同，具体类型定义可点击相应字段模块查看。