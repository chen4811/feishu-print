# CalendarView 日历视图

## id
当前视图的 id

## tableId
当前视图所属的数据表 id

## getName
```typescript
getName(): Promise<string>;
```
获取视图名

## getType
获取视图类型
```typescript
getType(): Promise<ViewType.Calendar>;
```

## getMeta
```typescript
getMeta(): Promise<ICalendarViewMeta>;
```
获取日历视图元信息，其中 `ICalendarViewMeta` 的类型定义如下：

```typescript
interface ICalendarViewMeta {
    id: string;
    name: string;
    type: ViewType.Calendar;
    property: {
        filterInfo: IFilterInfo | null;
    }
}
```

## showField
```typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
```
显示字段

## hideField
```typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
```
隐藏字段

## getFieldMetaList
```typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
```
获取字段信息的列表，因为 `View` 层涉及到了 `UI` 的展示，所以此时获取的字段信息是有序的

## getVisibleRecordIdList
```typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
```
获取可见记录的 ID 列表

## getVisibleFieldIdList
```typescript
getVisibleFieldIdList(): Promise<string[]>;
```
获取可见字段的 ID 列表

## applySetting
```typescript
applySetting(): Promise<void>;
```
将设置的分组/筛选/排序等视图配置提交，同步给其他用户

## getFilterInfo
```typescript
getFilterInfo(): Promise<IFilterInfo | null>;
```
获取当前的筛选信息([IFilterInfo 定义](../view.md#ifilterinfo))

## addFilterCondition
```typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
```
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./calendar.md#applysetting) 方法)

## deleteFilterCondition
```typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
```
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./calendar.md#applysetting) 方法)

## updateFilterCondition
```typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
```
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./calendar.md#applysetting) 方法)

## setFilterConjunction
```typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
```
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:
```typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
```
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 [view.applySetting](./calendar.md#applysetting) 方法)