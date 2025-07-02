# API 引导
> 推荐先从 [快速入门](../start/core) 开始阅读

根据[快速入门](../start/core)中的知识，大家应该对多维表格的模型有了一个初步的了解，这篇文章，帮助大家简单强化理解一下这个模型，便于插件的设计以及 API 的查询。

`bitable`，是所有 API 的统一入口，不同的功能模块均会挂载至该统一入口。

## Base 模块

绝大部分的 API 调用方法都是从 `base` 调用的，因为对多维表格进行增删改查的 API 都位于 `base` 下，大部分 Case 如下所示：

```typescript
import { bitable } from '@lark-base-open/js-sdk';

const table = await bitable.base.getActiveTable();
```

`getActiveTable` 的作用是来获取当前页面已经选择的 `table`，在 `base` 上还有很多接口可以用来获取 `table`，可以在 `Base` 模块的[文档](./base)内查看。

## Table 模块与 Field 模块
获取到 `table` 之后，就可以做很多数据相关的增删改查操作。

推荐开发者从 `field(字段)` 的角度来对数据进行增删改差，因为数据每一个单元格内的数据是由其所属的字段类型决定的，因此在通过字段来实现增删改查的时候，会给予更多的类型提示，下面是一个例子：

```typescript
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.createCell(file);
await table.addRecord(attachmentCell);
```
在这个例子中，我们通过 `fieldId` 来获取了一个 `attachmentField(附件字段)`，在获取这个字段的时候，我们传入了一个很重要的东西 `IAttachemntField`，这是一个类型参数，告诉 ts 我们获取的是一个附件字段，
因此在后续调用 `attachmentField.createCell(file)` 的时候，我们是可以获得足够的类型提示的，告诉我们可以通过直接传入一个 `File / File[] / FileList` 来构造出一个附件单元格。

然后我们调用 `table.addRecord(attachmentCell)` 方法，将这个单元格插入到了表格之中（添加了一条记录），`table.addRecord` 方法还支持传入 `Cell[]` 参数，从而创建出一条更为完整的数据。

除此之外，`IAttachmentField(附件字段)` 还有一些便于开发者使用的 API：
```typescript
const attachmentUrls = await attachmentField.getAttachmentUrls(recordId)
```
因为附件字段中存储的并不是真正的 URL，所以在获取真正的 URL 时，需要多步，但是从字段本身的角度去考虑，我们在实现这个 API 的时候，就可以把这些工作放在字段自身的方法里实现，
所以还是非常推荐用户对数据的增删改查以及字段属性的设置可以从字段角度去考量。

除了 `IAttachmentField(附件字段)` 以外，我们还细化了很多字段，可以从 [字段引导](field.md) 阅读更多资料，Table 模块也有更多的 API 方法来供给开发者使用。

## Cell 模块
在上文中，通过 `attachmentField.creatCell` 方法构造出来的 `Cell` 也是一个非常重要的模块，在进行插入数据的操作时，我们推荐开发者通过 `Field` 来构造 `Cell`，来插入数据，
当一个 `Cell` 被成功插入到 `Table` 中去后，它会与一条数据进行关联，此时进行 `getValue/setValue` 时，都会与实时性的数据产生关联，按照上述的流程可以这样来改变对应单元格的值：
```typescript
await attachmentCell.setValue(newFile)
```
在 `setValue` 顺利执行之后，表格中对应单元格的值会发生改变，更多的 API 用法可以查看对应[文档](cell.md)。

## Record 模块
Record 模块主要用来存储**行数据**，API 可以查看对应[文档](record.md)。

## UI 模块
UI 模块提供与用户交互相关的能力，如切换数据表、切换视图等，详细 API 可查看[UI 模块文档](ui.md)。

## Bridge 模块
Bridge 模块提供了一些通用能力，如获取用户 id，获取当前环境信息等，详细 API 可查看 [Bridge 模块文档](bridge.md)。