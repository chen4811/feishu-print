# Dashboard 模块

`Dashboard` 模块主要用于仪表盘插件的开发，该模块提供了仪表盘插件**特有的**`配置`和`计算`接口。


## 仪表盘插件状态
:::tips
仪表盘插件和官方图表一样存在多个状态，你需要在插件代码中感知多个不同状态并做出相应的处理。
:::
### 配置状态
<!-- TODO 截图 -->
在配置状态下用户可以对右侧配置进行修改，插件左侧图表需要跟随右侧配置的变更实时渲染，渲染数据可通过 [getPreviewData](#getpreviewdata) 接口进行获取。

可通过判断插件 URL 中的查询参数 `isConfig` 来判断当前插件是否处在配置状态下：
```typescript

```

## getConfig

## setConfig

## getData

## getPreviewData

## 