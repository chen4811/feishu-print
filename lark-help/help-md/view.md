# View 模块

视图 `View` 是数据表 `Table` 的呈现方式（例如字段的展示顺序/记录的显示或隐藏等），一个数据表至少有一个视图，可能有多个视图，每个视图都有唯一标识 viewId，viewId 在一个多维表格中唯一。

::: tip
注意此处与 Table 模块的差异，在 View 模块获取字段/记录的顺序都是**有序**的。
:::

`View` 模块可以在 `Table` 层通过 `getViewById` 的方式获取

```typescript
const view = await table.getViewById(viewId);
```

View 可以通过下图在得知其在页面中是负责 UI 展示的，因此很多与 UI 展示形式相关的 API 都存在于 View 层，例如筛选/分组/排序等
![](../../image/view/module-name.png)

## 不同类型的视图
目前支持以下 6 种不同类型的视图，不同类型的视图可用能力存在差异：

- [GridView](./view/grid.md)：表格视图
- [KanbanView](./view/kanban.md)：看板视图
- [FormView](./view/form.md)：表单视图
- [GalleryView](./view/gallery.md)：画册视图
- [GanttView](./view/gantt.md)：甘特视图
- [CalendarView](./view/calendar.md)：日历视图

## View 基础能力

视图中最基础的能力包括`筛选`、`排序`和`分组`，下面将简介其用法，相关 API 定义在具体类型的模块中，如 [GridView](./view/grid.md)。

### 筛选
视图根据筛选条件过滤出数据表中符合条件的记录，主要由 `FilterInfoCondition 过滤条件` 和 `FilterConjunction 生效条件` 两部分信息组成

```typescript
interface IFilterInfo {
  conjunction: FilterConjunction;
  conditions: FilterInfoCondition[];
}
```

#### FilterInfoCondition

`FilterInfoCondition` 代表过滤条件，每个 Condition 由`字段` + `过滤操作符` + `匹配值`三个基本元素组成。

![](../../image/view/filter-conditions.png)

```typescript
interface FilterInfoCondition {
  fieldId: string; // field 唯一标识
  conditionId?: string; // condition 唯一标识，新增时可不传入
  value: FieldValue;  // 字段匹配值
  operator: FilterOperation; // 匹配操作符
}
```

#### FilterConjunction

`FilterConjunction` 代表过滤条件的生效条件，`FilterConjunction.And` 代表符合所有过滤条件，`FilterConjunction.Or` 代表符合任一过滤条件：

```typescript
enum FilterConjunction {
  And = 'and',
  Or = 'or'
}
```

![](../../image/view/filter-conjunction.png)

不同的字段可匹配的过滤操作符和匹配值不同，具体类型如下：

|              | IFilterAttachmentCondition                            | IFilterCheckboxCondition | IFilterAutoNumberCondition                                                                                                                                                                                              | IFilterDateTimeCondition                                                                                                        | IFilterCreatedTimeCondition                                                                                                     | IFilterModifiedTimeCondition                                                                                                     | IFilterUserCondition | IFilterCreatedUserCondition | IFilterModifiedUserCondition | IFilterDuplexLinkCondition | IFilterSingleLinkCondition | IFilterFormulaCondition | IFilterGroupChatCondition | IFilterLocationCondition | IFilterLookupCondition | IFilterMultiSelectCondition  | IFilterSingleSelectCondition                                                                                                                                   | IFilterPhoneCondition | IFilterTextCondition | IFilterNumberCondition                                                                                                                                                                                                 | IFilterUrlCondition  | IFilterCurrencyCondition                                                                                                                                                                                               | IFilterBarcodeCondition | IFilterProgressCondition                                                                                                                                                                                               | IFilterRatingCondition                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------- | ---------------------------- | -------------------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ | ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **operator** | `FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `FilterOperator.Is`      | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.IsGreater \| FilterOperator.IsGreaterEqual \| FilterOperator.IsLess \| FilterOperator.IsLessEqual \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty;` | `FilterOperator.Is \| FilterOperator.IsGreater \| FilterOperator.IsLess \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `FilterOperator.Is \| FilterOperator.IsGreater \| FilterOperator.IsLess \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `FilterOperator.Is  \| FilterOperator.IsGreater \| FilterOperator.IsLess \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `BaseFilterOperator` | `BaseFilterOperator`        | `BaseFilterOperator`         | `BaseFilterOperator`       | `BaseFilterOperator`       | `FilterOperator`        | `BaseFilterOperator`      | `BaseFilterOperator`     | `FilterOperator`       | `BaseFilterOperator`         | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.Contains \| FilterOperator.DoesNotContain \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `BaseFilterOperator`  | `BaseFilterOperator` | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.IsGreater \| FilterOperator.IsGreaterEqual \| FilterOperator.IsLess \| FilterOperator.IsLessEqual \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `BaseFilterOperator` | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.IsGreater \| FilterOperator.IsGreaterEqual \| FilterOperator.IsLess \| FilterOperator.IsLessEqual \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `BaseFilterOperator`    | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.IsGreater \| FilterOperator.IsGreaterEqual \| FilterOperator.IsLess \| FilterOperator.IsLessEqual \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` | `FilterOperator.Is \| FilterOperator.IsNot \| FilterOperator.IsGreater \| FilterOperator.IsGreaterEqual \| FilterOperator.IsLess \| FilterOperator.IsLessEqual \| FilterOperator.IsEmpty \| FilterOperator.IsNotEmpty` |
| **value**    | `null `                                               | `boolean \| null`        | `number \| null`                                                                                                                                                                                                        | `IFilterDateTimeValue = number \| FilterDuration  \| null`                                                                      | `number \| FilterDuration \| null`                                                                                              | `number \| FilterDuration \| null`                                                                                               | `string[] \| null`   | `string[] \| null`          | `string[] \| null`           | `string[] \| null`         | `string[] \| null`         | `IFilterAll`            | `string[] \| null`        | `string \| null`         | `IFilterAll`           | `string[] \| null \| string` | `string[] \| string`                                                                                                                                           | `string \| null`      | `string \| null`     | `number \| null`                                                                                                                                                                                                       | `string \| null`     | `number \| null`                                                                                                                                                                                                       | `string \| null`        | `number \| null`                                                                                                                                                                                                       | `number \| null`                                                                                                                                                                                                       |

`FilterOperator` 定义如下：

```typescript
enum FilterOperator {
  /** 等于 */
  Is = 'is',
  /** 不等于 */
  IsNot = 'isNot',
  /** 包含 */
  Contains = 'contains',
  /** 不包含 */
  DoesNotContain = 'doesNotContain',
  /** 为空 */
  IsEmpty = 'isEmpty',
  /** 不为空 */
  IsNotEmpty = 'isNotEmpty',
  /** 大于 */
  IsGreater = 'isGreater',
  /** 大于或等于 */
  IsGreaterEqual = 'isGreaterEqual',
  /** 小于 */
  IsLess = 'isLess',
  /** 小于或等于 */
  IsLessEqual = 'isLessEqual'
}
```

`FilterDuration` 定义如下

```typescript
enum FilterDuration {
  /** 今天 */
  Today = "Today",
  /** 明天 */
  Tomorrow = "Tomorrow",
  /** 昨天 */
  Yesterday = "Yesterday",
  /** 过去7天 */
  TheLastWeek = "TheLastWeek",
  /** 未来7天 */
  TheNextWeek = "TheNextWeek",
  /** 过去30天 */
  TheLastMonth = "TheLastMonth",
  /** 未来30天 */
  TheNextMonth = "TheNextMonth",
  /** 本周 */
  CurrentWeek = "CurrentWeek",
  /** 上周 */
  LastWeek = "LastWeek",
  /** 本月 */
  CurrentMonth = "CurrentMonth",
  /** 上个月 */
  LastMonth = "LastMonth"
}
```

`BaseFilterOperator` 定义如下：

```typescript
type BaseFilterOperator =
  FilterOperator.Is
  | FilterOperator.IsNot
  | FilterOperator.Contains
  | FilterOperator.DoesNotContain
  | FilterOperator.IsEmpty
  | FilterOperator.IsNotEmpty;
```

### 排序
视图按照一定的规则将数据表中的记录进行排序，一条排序规则由 `字段ID` + `顺序` 组成：
![](../../image/view/view-sort.png)


```typescript
interface ISortInfo {
  fieldId: string;
  /** false: 正序 A -> Z;  true: 倒序 Z -> A */
  desc: boolean;
}
```

### 分组
视图按照一定的规则将数据表中的记录进行分组，一条分组规则由 `字段ID` + `顺序` 组成：
![](../../image/view/view-group.png)


```typescript
interface IGroupInfo {
  fieldId: string;
  /** false: 正序 A -> Z;  true: 倒序 Z -> A */
  desc: boolean;
}
```

### 同步配置
::: warning
View 模块中分组/筛选/排序等能力，在调用写入 API 之后如果**希望保存或者同步给其他用户**需要调用 `applySetting` 方法
:::

![](../../image/view/view-applysetting.png)

### 分享
SDK 支持开启/关闭指定视图分享，并获取处在开启状态视图的分享链接。

#### enableSharing
开启视图分享。

```typescript
enableSharing: () => Promise<boolean>;
```

#### enableSharing
关闭视图分享。

```typescript
disableSharing: () => Promise<boolean>;
```

#### getSharingStatus
获取当前视图分享状态。

```typescript
getSharingStatus: () => Promise<SharingStatus>;

enum SharingStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}
```

#### getSharingStatus
获取当前视图分享链接。

:::warning
获取分享链接的前置条件是视图分享状态是开启的。
:::

```typescript
getShareLink(): Promise<string>;
```