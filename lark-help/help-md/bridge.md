# Bridge 模块

`Bridge` 模块主要提供了一些通用能力的 API，例如（获取当前语言信息/获取当前多维表格主题信息等),
获取方式为：
```typescript
const bridge = bitable.bridge;
```

## setData
通过指定 `key` 存储当前插件自定义数据，该自定义数据在`同一文档`的`同一插件`下是共享的。

```typescript
setData<T>(key: string, data: T): Promise<boolean>;
```

#### 示例
```typescript
await bitable.bridge.setData('test_key1', 'hello world');
await bitable.bridge.setData('test_key2', 1);
await bitable.bridge.setData('test_key3', { key: 'value' });
```

## getData
通过指定 `key` 获取当前插件自定义数据。

```typescript
getData<T>(key: string): Promise<T>;
```

#### 示例
```typescript
await bitable.bridge.getData('test_key1') // 'hello world'
await bitable.bridge.getData('test_key2') // 1
await bitable.bridge.getData('test_key3') // { key: 'value' }
```

## onDataChange
监听数据存储变化，任意存储 `key` 的变化都会触发回调。

```typescript
onDataChange(callback: (ev: IEventCbCtx)) => void
```

#### 示例
```typescript
bridge.onDataChange((event) => {
  console.log('data change', event.data);
})

bridge.setData('test_key', 233);
```

## getBitableUrl
生成多维表格链接。

```typescript
getBitableUrl(options: GetBitableUrlOptions): Promise<string>;
```

其中 `GetBitableUrlOptions` 的类型参数定义为：
```typescript
type GetBitableUrlOptions = {
  tableId: string,
  viewId: string,
  // recordId 为空时打开表格，不为空时打开卡片
  recordId?: string,
  fieldId?: string,
}
```

#### 示例
```typescript
const res = await bitable.bridge.getBitableUrl({
  tableId: 'tblkrAjKK1wEP4Nf',
  viewId: 'vewboZNrq3',
  fieldId: 'fldfd2ITyJ',
});
// 'https://bytedance.feishu.cn/base/QtTUxxxx?field=fldfd2ITyJ&table=tblkrAjKK1wEP4Nf&view=vewboZNrq3'
```

## getUserId
获取当前用户 ID。

:::danger
不建议使用，请替换成 [getBaseUserId](#getbaseuserid) 接口。
:::

```typescript
getUserId(): Promise<string>;
```

#### 示例
```typescript
const res = await bitable.bridge.getUserId();
```

## getBaseUserId
获取当前用户 id，该用户标识在`不同插件点位（侧边栏、连接器等）中均唯一`。

:::warning
该接口返回的用户 ID 与飞书开放平台的 OpenUserId 并不通用，请勿将其作为全平台的唯一 id。
:::

```typescript
getBaseUserId(): Promise<string>;
```

#### 示例
```typescript
const res = await bitable.bridge.getBaseUserId();
```

## getTheme
获取当前主题。

```typescript
getTheme(): Promise<ThemeModeType>;
```

其中 `ThemeModeType` 类型定义如下：
```typescript
enum ThemeModeType {
  LIGHT = "LIGHT",
  DARK = "DARK"
}
```

#### 示例
```typescript
const theme = await bitable.bridge.getTheme();
// 'LIGHT'
```

## onThemeChange
监听主题变化。

```typescript
onThemeChange(callback: (ev: IEventCbCtx<ThemeModeCtx>) => void): () => void;
```

#### 示例
```typescript
const theme = await bitable.bridge.onThemeChange((event) => {
  console.log('theme change', event.data.theme);
});
```

## getLocale
获取地区设置。

```typescript
getLocale(): Promise<Locale>;
```

其中 `Local` 的类型定义如下:
```typescript
type Locale = 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'ja-JP' | 'fr-FR' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ko-KR' | 'pt-BR' | 'ru-RU' | 'th-TH' | 'vi-VN' | 'de-DE' | 'es-ES';
```

#### 示例
```typescript
const locale = await bitable.bridge.getLocale();
// 'zh-CN'
```

## getLanguage
获取当前的语言信息。

```typescript
getLanguage(): Promise<Language>;
```

其中 `Language` 的类型定义如下：
```typescript
type Language = 'zh' | 'zh-TW' | 'zh-HK' | 'en' | 'ja' | 'fr' | 'hi' | 'id' | 'it' | 'ko' | 'pt' | 'ru' | 'th' | 'vi' | 'de' | 'es';
```

#### 示例
```typescript
const language = await bitable.bridge.getLanguage();
// 'zh'
```

## getTenantKey
获取当前租户 `Id`。

```typescript
getTenantKey(): Promise<string>;
```

#### 示例
```typescript
await bitable.bridge.getTenantKey();
```

## getEnv
获取当前的环境信息。

```typescript
getEnv(): Promise<Env>;
```

其中 Env 的类型定义如下：
```typescript
type Product = 'lark' | 'feishu';
interface Env {
  product: Product;
}
```

#### 示例
```typescript
const env = await bitable.bridge.getEnv();
// { product: 'feishu' }
```

## getInstanceId
获取当前的插件的实例 `id`，每个插件的实例 `id` 全局唯一。

```typescript
getInstanceId(): Promise<string>;
```

#### 示例
```typescript
const instanceId = await bitable.bridge.getInstanceId();
```

## navigateToExtension
跳转至指定 id 对应的插件，需经过用户授权确认，用户拒绝授权或跳转失败时返回 false。

```typescript
navigateToExtension(extensionId: string): Promise<boolean>;
```

#### 示例
```typescript
await bitable.bridge.navigateToExtension('xxx_id');
```