import { ReactElement } from 'react';
import { Root } from 'react-dom/client';
import { SelectProps, InputProps, InputNumberProps, RadioGroupProps } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { TypeOpen } from 'antd/es/message/interface';
import { Locale as Locale$1 } from 'antd/es/locale';

/**
 * @description blockit通信的包的数据结构
 */
/**
 * 字段值计算状态
 */
declare enum ValueStatus {
    /** 计算中 */
    CALCULATING = "calculating",
    /** 计算完成 */
    COMPLETED = "completed"
}
interface ISelfCalculationValue<T = null> {
    value: T;
    status: ValueStatus;
}
type Formula = string;
type Sort = string;
declare enum IOpenSegmentType$1 {
    Text = "text",
    Url = "url",
    Mention = "mention"
}
declare enum OpenMentionTypeMap$1 {
    User = 0,
    Doc = 1,
    Folder = 2,
    Sheet = 3,
    SheetDoc = 4,
    Chat = 5,
    Bitable = 8,
    Mindnote = 11,
    Box = 12,
    Slide = 15,
    Wiki = 16,
    Docx = 22,
    Slides = 30,
    Bitable_Ind = 108
}
/** mention 类型，区分不同类型的飞书云文档或者飞书用户 */
type OpenMentionType$1 = keyof typeof OpenMentionTypeMap$1;
/** 普通文本 */
type IOpenTextSegment$1 = {
    type: IOpenSegmentType$1.Text;
    text: string;
};
/** 链接 */
type IOpenUrlSegment$1 = {
    type: IOpenSegmentType$1.Url;
    text: string;
    link: string;
};
/** 多行文本中「飞书云文档链接」或「@飞书成员」的类型 */
interface IOpenMentionSegment$1 {
    type: IOpenSegmentType$1.Mention;
    mentionType: OpenMentionType$1;
    text: string;
    token: string;
}
/** 多行文本中「@飞书成员」的类型 */
interface IOpenUserMentionSegment extends IOpenMentionSegment$1 {
    mentionType: 'User';
    name: string;
    enName?: string;
    /** 用户 id */
    id: string;
    /** @deprecated */
    en_name?: string;
}
/** 多行文本中「飞书云文档链接」的类型 */
interface IOpenDocumentMentionSegment$1 extends IOpenMentionSegment$1 {
    mentionType: Exclude<OpenMentionType$1, 'User'>;
    link: string;
}
/** 「多行文本」字段单元格类型 */
type IOpenSegment = IOpenTextSegment$1 | IOpenUrlSegment$1 | IOpenUserMentionSegment | IOpenDocumentMentionSegment$1;
/** 「单向关联」/「双向关联」字段单元格类型 */
type IOpenLink = {
    text: string;
    /** 暂时只支持 "text" */
    type: string;
    recordIds: string[];
    tableId: string;
    /** @deprecated */
    record_ids: string[];
    /** @deprecated */
    table_id: string;
};
/** 「单选」字段单元格类型 */
type IOpenSingleSelect = {
    id: string;
    text: string;
};
/** 「多选」字段单元格类型 */
type IOpenMultiSelect = IOpenSingleSelect[];
/** 「人员」 / 「创建人」 / 「修改人」字段单元格类型 */
type IOpenUser = {
    id: string;
    name?: string;
    enName?: string;
    email?: string;
    /** @deprecated */
    en_name?: string;
};
/** 「地理位置」字段单元格类型 */
type IOpenLocation = {
    address: string;
    adname: string;
    cityname: string;
    /** 简短地址 */
    name: string;
    /** 省 */
    pname: string;
    /** 完整地址 */
    fullAddress: string;
    /** "number,number" */
    location: string;
    /** @deprecated */
    full_address: string;
};
/** 「附件」字段单元格类型（多值） */
type IOpenAttachment = {
    name: string;
    size: number;
    type: string;
    token: string;
    timeStamp: number;
};
/** 「日期」/「修改时间」/「创建时间」字段单元格类型，毫秒时间戳 */
type IOpenTimestamp = number;
/** 「数字」字段单元格类型 */
type IOpenNumber = number;
/** 「复选框」字段单元格类型 */
type IOpenCheckbox = boolean;
/** 「自动编号」字段单元格类型 */
type IOpenAutoNumber = ISelfCalculationValue<string>;
/** 「电话号码」字段单元格类型 */
type IOpenPhone = string;
/** 「群字段」字段单元格类型 */
type IOpenGroupChat = {
    id: string;
    name: string;
    avatarUrl: string;
    enName?: string;
    linkToken?: string;
    /** @deprecated */
    en_name?: string;
};
/** 字段单值 */
type IOpenSingleCellValue = IOpenSingleSelect | IOpenUser | IOpenTimestamp | IOpenNumber | IOpenCheckbox | IOpenAutoNumber | IOpenPhone | IOpenLocation | IOpenAttachment | IOpenSegment | IOpenUrlSegment$1 | IOpenGroupChat | IOpenLink;
type IOpenFormulaProxyCellValue = IOpenSingleCellValue[] | null;
type IOpenFormulaFuncCellValue = IOpenSegment[] | number[] | number | string;
/** 公式字段出值结果 */
type IOpenFormulaCellValue = IOpenFormulaProxyCellValue | IOpenFormulaFuncCellValue;
/** 单元格联合类型，使用时建议使用 checkers 断言这个类型的数据 */
type IOpenCellValue = null | IOpenSingleSelect | IOpenMultiSelect | IOpenUser[] | IOpenTimestamp | IOpenNumber | IOpenCheckbox | IOpenAutoNumber | IOpenPhone | IOpenLocation | IOpenAttachment[] | IOpenSegment[] | IOpenUrlSegment$1[] | IOpenLink | IOpenGroupChat[] | IOpenFormulaCellValue;

interface IEventCbCtx<DataType = unknown> {
    data: DataType;
}
declare enum WidgetBaseEvent {
    TableAdd = "TableAdd",
    TableDelete = "TableDelete",
    SelectionChange = "SelectionChange",
    PermissionChange = "PermissionChange",
    UploadStatusChange = "UploadStatusChange"
}
declare enum WidgetFieldEvent {
}
declare enum WidgetTableEvent {
    FieldAdd = "FieldAdd",
    FieldDelete = "FieldDelete",
    FieldModify = "FieldModify",
    RecordAdd = "RecordAdd",
    RecordModify = "RecordModify",
    RecordDelete = "RecordDelete"
}
declare enum BridgeEvent {
    DataChange = "DataChange",
    ThemeChange = "ThemeChange"
}

interface Selection {
    baseId: string | null;
    tableId: string | null;
    viewId: string | null;
    fieldId: string | null;
    recordId: string | null;
}

/**
 * copy from bitable-sdk
 */
declare enum FieldType$1 {
    NotSupport = 0,
    Text = 1,
    Number = 2,
    SingleSelect = 3,
    MultiSelect = 4,
    DateTime = 5,
    Checkbox = 7,
    User = 11,
    Phone = 13,
    Url = 15,
    Attachment = 17,
    SingleLink = 18,
    Lookup = 19,
    Formula = 20,
    DuplexLink = 21,
    Location = 22,
    GroupChat = 23,
    Denied = 403,
    /**
     * 引用类型字段，前后端约定用10xx公共前缀开头
     */
    CreatedTime = 1001,
    ModifiedTime = 1002,
    CreatedUser = 1003,
    ModifiedUser = 1004,
    AutoNumber = 1005,
    Barcode = 99001,
    Progress = 99002,
    Currency = 99003,
    Rating = 99004,
    Email = 99005
}
declare enum ViewType$1 {
    NotSupport = 0,
    Grid = 1,
    Kanban = 2,
    Form = 3,
    Gallery = 4,
    Gantt = 5,
    Hierarchy = 6,
    Calendar = 7,
    WidgetView = 100
}
declare enum UploadFileTaskStatus {
    Pending = 1,
    Inflight = 2,
    Success = 3,
    Error = 4,
    Paused = 5
}
type IUploadFileTaskItem = {
    uploadedSize: number;
    name: string;
    status: UploadFileTaskStatus;
    progress: number;
    uuid: string;
    token?: string;
    size: number;
    file: File;
};
type IUploadFileTask = {
    list: Array<IUploadFileTaskItem>;
};
type IUploadEventData = {
    data: {
        id: string;
        tasks: IUploadFileTask;
    };
};
type Locale = 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'ja-JP' | 'fr-FR' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ko-KR' | 'pt-BR' | 'ru-RU' | 'th-TH' | 'vi-VN' | 'de-DE' | 'es-ES';
type Language = 'zh' | 'zh-TW' | 'zh-HK' | 'en' | 'ja' | 'fr' | 'hi' | 'id' | 'it' | 'ko' | 'pt' | 'ru' | 'th' | 'vi' | 'de' | 'es';
/** 定位字段输入方式 **/
declare enum ELocationInputType$1 {
    ONLY_MOBILE = "ONLY_MOBILE",
    NOT_LIMIT = "NOT_LIMIT"
}
declare enum NumberFormatter$1 {
    INTEGER = "0",
    DIGITAL_ROUNDED_1 = "0.0",
    DIGITAL_ROUNDED_2 = "0.00",
    DIGITAL_ROUNDED_3 = "0.000",
    DIGITAL_ROUNDED_4 = "0.0000",
    DIGITAL_THOUSANDS = "1,000",
    DIGITAL_THOUSANDS_DECIMALS = "1,000.00",
    PERCENTAGE_ROUNDED = "0%",
    PERCENTAGE = "0.00%"
}
declare enum CurrencyFormatter {
    CYN_ROUNDED = "\u00A5#,##0",
    CYN = "\u00A5#,##0.00",
    DOLLAR_ROUNDED = "$#,##0",
    DOLLAR = "$#,##0.00"
}
declare enum DateFormatter$1 {
    DATE_YMD_WITH_SLASH = "yyyy/MM/dd",
    DATE_TIME = "yyyy/MM/dd HH:mm",
    DATE_TIME_WITH_HYPHEN = "yyyy-MM-dd HH:mm",
    DATE_YMD_WITH_HYPHEN = "yyyy-MM-dd",
    DATE_MD_WITH_HYPHEN = "MM-dd",
    DATE_MMDD_WITH_SLASH = "MM/dd/yyyy",
    DATE_DDMM_WITH_SLASH = "dd/MM/yyyy"
}
declare enum CurrencyCode$1 {
    CNY = "CNY",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    AED = "AED",
    AUD = "AUD",
    BRL = "BRL",
    CAD = "CAD",
    CHF = "CHF",
    HKD = "HKD",
    INR = "INR",
    IDR = "IDR",
    JPY = "JPY",
    KRW = "KRW",
    MOP = "MOP",
    MXN = "MXN",
    MYR = "MYR",
    PHP = "PHP",
    PLN = "PLN",
    RUB = "RUB",
    SGD = "SGD",
    THB = "THB",
    TRY = "TRY",
    TWD = "TWD",
    VND = "VND"
}
declare enum RatingIconType$1 {
    STAR = "star",
    HEART = "heart",
    THUMBSUP = "thumbsup",
    FIRE = "fire",
    SMILE = "smile",
    LIGHTNING = "lightning",
    FLOWER = "flower",
    NUMBER = "number"
}

declare abstract class ApiModule<C extends unknown[]> {
    context: C;
    /** 直接返回 string，不能引用 this，这里会被 register 从 prototype 上调用 */
    abstract getModuleName(): string;
    /**
     * @deprecated
     * 绑定 ApiModule 实例上下文并返回新实例
     *
     * @param context
     * @returns
     */
    withContext(context: C): this;
    /**
     * 获取 ApiModule 上下文
     * @returns
     */
    getContext(): C;
}

type BridgeModuleContext = never[];
declare enum ThemeModeType {
    LIGHT = "LIGHT",
    DARK = "DARK"
}
type ThemeModeCtx = {
    theme: ThemeModeType;
};
type HostMeta = {
    origin: string;
};
type Product = 'lark' | 'feishu';
interface Env {
    product: Product;
}
type GetBitableUrlOptions = Pick<Required<Selection>, 'tableId' | 'viewId'> & Pick<Selection, 'recordId' | 'fieldId'>;
interface ICommonBridgeMessageModule {
    /** 读取持久化数据 */
    getData(): Promise<unknown>;
    /**
     * 写入持久化数据
     * @param data 可序列化的数据
     */
    setData(data: Record<string, unknown>): Promise<void>;
    /**
     * 生成 bitable 链接
     * @param options tableId, viewId 必选，recordId 可选。recordId 为空时打开表格，不为空时打开卡片。
     */
    getBitableUrl(options: GetBitableUrlOptions): Promise<string>;
    getUserId(): Promise<string>;
    getTheme(): Promise<ThemeModeType>;
    getLocale(): Promise<Locale>;
    getLanguage(): Promise<Language>;
    getTenantKey(): Promise<string>;
    getEnv(): Promise<Env>;
    getInstanceId(): Promise<string>;
}
interface ICommonBridgeApplicationModule {
    onThemeChange(callback: (ev: IEventCbCtx<ThemeModeCtx>) => void): () => void;
    registerBridgeEvent(event: BridgeEvent): Promise<void>;
    unregisterBridgeEvent(event: BridgeEvent): Promise<void>;
}
type ICommonBridge = ICommonBridgeMessageModule & ICommonBridgeApplicationModule;

declare enum PermissionEntity {
    Base = "Base",
    Table = "Table",
    Record = "Record",
    Field = "Field",
    Cell = "Cell"
}
declare enum OperationType {
    Visible = "visible",
    Editable = "editable",
    Addable = "addable",
    Deletable = "deletable",
    Copyable = "copyable",
    Movable = "movable",
    Printable = "printable",
    Manageable = "manageable",
    Submittable = "submittable"
}
type BaseOperation = OperationType.Editable | OperationType.Manageable | OperationType.Copyable | OperationType.Printable;
type TableOperation = OperationType.Addable | OperationType.Deletable | OperationType.Editable | OperationType.Visible | OperationType.Movable | OperationType.Copyable;
type RecordOperation = TableOperation;
type FieldOperation = TableOperation | OperationType.Submittable;
type CellOperation = TableOperation;
interface BasePermissionParams {
    entity: PermissionEntity.Base;
    type: BaseOperation;
}
interface TablePermissionParams {
    entity: PermissionEntity.Table;
    param: {
        tableId?: string;
    };
    type: TableOperation;
}
interface RecordPermissionParams {
    entity: PermissionEntity.Record;
    param: {
        tableId: string;
        recordId?: string;
    };
    type: RecordOperation;
}
interface FieldPermissionParams {
    entity: PermissionEntity.Field;
    param: {
        tableId: string;
        fieldId?: string;
    };
    type: FieldOperation;
}
interface CellPermissionParams {
    entity: PermissionEntity.Cell;
    param: {
        tableId: string;
        recordId?: string;
        fieldId?: string;
    };
    type: CellOperation;
}
type GetPermissionParams = BasePermissionParams | TablePermissionParams | RecordPermissionParams | FieldPermissionParams | CellPermissionParams;

type ITextFieldProperty$1 = null;
interface ITextFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Text;
    property: ITextFieldProperty$1;
}
interface ITextFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Text;
    property?: ITextFieldProperty$1;
}
interface IDocumentMentionConfig {
    /** 传入的url为feishu文档类型将会被自动解析 */
    type: IOpenSegmentType$1.Mention;
    link: string;
    text?: string;
}
type IFilterTextValue$1 = string | null;
interface IFilterTextCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterTextValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Text;
}
type TextFieldTransformVal = string | IOpenSegment | IOpenSegment[];
type ITextField = IField<TextFieldTransformVal, IOpenSegment[], IOpenSegment[]>;

type IBaseFieldDescription$1 = {
    content: null | (IOpenTextSegment$1 | IOpenUrlSegment$1 | IOpenDocumentMentionSegment$1)[];
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc?: boolean;
};
type IFieldDescDocumentMentionConfig = IDocumentMentionConfig;
type IFieldDescriptionContent = null | string | (IOpenTextSegment$1 | IOpenUrlSegment$1 | IFieldDescDocumentMentionConfig)[];

interface IBaseFieldMeta$1 {
    id: string;
    type: FieldType$1;
    name: string;
    isPrimary: boolean;
    description: IBaseFieldDescription$1;
}
/** 修改/设置字段属性 */
interface IBaseFieldConfig {
    name?: string;
    description?: {
        content?: IFieldDescriptionContent;
        /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
        disableSyncToFormDesc?: boolean;
    };
}

interface IRecordType {
    id: string;
    getCellList: () => Promise<ICell[]>;
    getCellByField: (fieldOrId: IField | string) => Promise<ICell>;
}
interface IRecordList {
    getRecordById(recordId: string): IRecordType;
    [Symbol.iterator](): Generator<IRecordType>;
}

type ICellTransformVal = TextFieldTransformVal | AttachmentTransformVal | CreateTimeTransformVal | CreateUserTransformVal | GroupFieldTransformVal | LocationTransformVal | LookupTransformVal | PhoneFieldTransformVal | AutonumberTransformVal | CheckBoxTransformVal | BarcodeTransformVal | CurrencyTransformVal | NumberFieldTransformVal | MultiSelectTransformVal | ModifiedUserTransformVal | ModifiedTimeTransformVal | DuplexLinkTransformVal | FormulaTransformVal | ProgressFieldTransformVal | RatingTransformVal | UrlTransformVal | UserFieldTransformVal | DateTransformVal;
interface ICell<V extends ICellTransformVal = any, R extends IOpenCellValue = any> {
    editable: boolean;
    setValue: (val: V) => Promise<void | boolean>;
    getValue: () => Promise<R>;
    getFieldId: () => string;
    mountRecord: (record: IRecordType) => void;
}

/** [tableId, fieldId] */
type FieldContext = [string, string];
interface IFieldValue {
    record_id: string;
    value: IOpenCellValue;
}
interface IUndefinedFieldValue {
    record_id: undefined;
    value: undefined;
}
interface IFieldMessageModule {
    /** 获取字段名 */
    getName(): Promise<string>;
    /** 获取字段类型 */
    getType(): Promise<FieldType$1>;
    /** 获取公式代理列类型 */
    getProxyType(): Promise<FieldType$1 | void>;
    /** 获取 cellValue 并转化为 string 格式 */
    getCellString(recordId: string): Promise<string>;
    /** 获取当前 field meta 信息 */
    getMeta(): Promise<IFieldMeta$1>;
    /**
     * 获取整列 cellValue
     * @param filter Bitable Foumula
     * @param sort Bitable Foumula
     */
    getFieldValueList(filter?: Formula, sort?: Sort): Promise<(IFieldValue | IUndefinedFieldValue)[]>;
    /**
     * 注册 field 事件，注册后 host 将会向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    registerFieldEvent(event: WidgetFieldEvent): Promise<void>;
    /**
     * 取消注册 field 事件，取消注册后 host 将停止向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    unregisterFieldEvent(event: WidgetFieldEvent): Promise<void>;
}
interface IFieldApplicationModule<V extends ICellTransformVal = any, R extends IOpenCellValue = any, TV extends R | Promise<R> = any> {
    id: string;
    tableId: string;
    transform: (val: V) => TV;
    createCell: (val: V) => Promise<ICell<V, R>>;
    getCell: (recordOrId: IRecordType | string) => Promise<ICell<V, R>>;
    getEditable: () => boolean;
    setValue: (recordOrId: IRecordType | string, val: V) => Promise<boolean>;
    getValue: (recordOrId: IRecordType | string) => Promise<R>;
}
type IField<V extends ICellTransformVal = any, R extends IOpenCellValue = any, TV extends R | Promise<R> = any> = IFieldMessageModule & IFieldApplicationModule<V, R, TV>;

type IAutoNumberFieldProperty$1 = null;
interface IAutoNumberFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.AutoNumber;
    property: IAutoNumberFieldProperty$1;
}
interface IAutoNumberFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.AutoNumber;
    property?: IAutoNumberFieldProperty$1;
}
type IFilterAutoNumberValue$1 = number | null;
interface IFilterAutoNumberCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterAutoNumberValue$1;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.IsGreater | FilterOperator$1.IsGreaterEqual | FilterOperator$1.IsLess | FilterOperator$1.IsLessEqual | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.AutoNumber;
}
type AutonumberTransformVal = number | IOpenAutoNumber;
interface IAutonumberField extends IField<AutonumberTransformVal, IOpenAutoNumber, IOpenAutoNumber> {
}

interface IBarCodeFieldProperty$1 {
    onlyMobile: boolean;
}
interface IBarcodeFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Barcode;
    property: IBarCodeFieldProperty$1;
}
interface IBarCodeFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Barcode;
    property?: Partial<IBarCodeFieldProperty$1>;
}
interface IFilterBarcodeCondition$1 extends IFilterBaseCondition$1 {
    value: string | null;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Barcode;
}
type BarcodeTransformVal = string | IOpenTextSegment$1[] | IOpenTextSegment$1;
interface IBarcodeField extends IField<BarcodeTransformVal, IOpenTextSegment$1[], IOpenTextSegment$1[]> {
    setOnlyMobile: (onlyMobile: boolean) => Promise<IFieldRes>;
    getOnlyMobile: () => Promise<boolean>;
}

interface IButtonFieldProperty$1 {
    color: number;
    title: string;
}
interface IButtonUserFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1;
    property: IButtonFieldProperty$1;
}
interface IButtonFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Barcode;
    property?: Partial<IButtonFieldProperty$1>;
}

type ICheckboxFieldProperty$1 = null;
interface ICheckboxFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Checkbox;
    property: ICheckboxFieldProperty$1;
}
interface ICheckboxFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Checkbox;
    property?: ICheckboxFieldProperty$1;
}
type IFilterCheckboxValue$1 = boolean | null;
interface IFilterCheckboxCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterCheckboxValue$1;
    operator: FilterOperator$1.Is;
    fieldType?: FieldType$1.Checkbox;
}
type CheckBoxTransformVal = IOpenCheckbox;
type ICheckBoxField = IField<CheckBoxTransformVal, IOpenCheckbox, IOpenCheckbox>;

interface ICommonLinkFieldProperty$1 {
    tableId: string;
    multiple: boolean;
}

type ISingleLinkFieldProperty$1 = ICommonLinkFieldProperty$1;
interface ISingleLinkFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.SingleLink;
    property: ISingleLinkFieldProperty$1;
}
interface ISingleLinkFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.SingleLink;
    property: {
        tableId: string;
        multiple?: boolean;
    };
}
type IFilterLinkValue$1 = string[] | null;
interface IFilterSingleLinkCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterLinkValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.SingleLink;
}
type SingleLinkFieldTransformVal = IOpenLink;
interface ISingleLinkField extends IField<SingleLinkFieldTransformVal, IOpenLink, IOpenLink> {
    setTableId: (tableId: string) => Promise<IFieldRes>;
    getTableId: () => Promise<string>;
    setMultiple: (multiple: boolean) => Promise<IFieldRes>;
    getMultiple: () => Promise<boolean>;
}

type IDuplexLinkFieldProperty$1 = ICommonLinkFieldProperty$1;
interface IDuplexLinkFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.DuplexLink;
    property: IDuplexLinkFieldProperty$1;
}
interface IDuplexLinkFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.DuplexLink;
    property: {
        tableId: string;
        multiple?: boolean;
    };
}
interface IFilterDuplexLinkCondition$1 extends IFilterBaseCondition$1 {
    value: string[] | null;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.DuplexLink;
}
type DuplexLinkTransformVal = IOpenLink;
interface IDuplexLinkField extends IField<DuplexLinkTransformVal, IOpenLink, IOpenLink> {
    setTableId: (tableId: string) => Promise<IFieldRes>;
    getTableId: () => Promise<string>;
    setMultiple: (multiple: boolean) => Promise<IFieldRes>;
    getMultiple: () => Promise<boolean>;
}

declare enum SelectOptionsType$1 {
    STATIC = 0,
    DYNAMIC = 1
}
interface ISelectFieldOption$1 {
    id: string;
    name: string;
    color: number;
}
interface ICommonSelectFieldProperty$1 {
    options: ISelectFieldOption$1[];
    optionsType: SelectOptionsType$1;
}
interface ISingleSelectFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.SingleSelect;
    property: ICommonSelectFieldProperty$1;
}
interface IMultiSelectFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.MultiSelect;
    property: ICommonSelectFieldProperty$1;
}
interface ISelectFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.SingleSelect | FieldType$1.MultiSelect;
    property?: {
        options: Partial<ISelectFieldOption$1>[];
        optionsType?: SelectOptionsType$1;
    };
}
type IFilterSelectValue$1 = string[] | null | string;
interface IFilterMultiSelectCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterSelectValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.MultiSelect;
}
type IFilterSingleSelectCondition$1 = ({
    value: string;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot;
    fieldType: FieldType$1.SingleSelect;
} | {
    value: string[] | string;
    operator: FilterOperator$1.Contains | FilterOperator$1.DoesNotContain | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.SingleSelect;
}) & IFilterBaseCondition$1;
type SingleSelectTransformVal = string | IOpenSingleSelect;
type OptionConfig = {
    name?: string;
    color?: number;
};
interface ISelectField<V extends MultiSelectTransformVal | SingleSelectTransformVal, R extends IOpenMultiSelect | IOpenSingleSelect, TV extends Promise<R>> extends IField<V, R, TV> {
    addOption: (name: string, color?: number) => Promise<IFieldRes>;
    addOptions: (optionList: {
        name: string;
        color?: number;
    }[]) => Promise<IFieldRes>;
    getOptions: () => Promise<ISelectFieldOption$1[]>;
    deleteOption: (idOrName: string) => Promise<IFieldRes>;
    setOption: (nameOrId: string, config: OptionConfig) => Promise<IFieldRes>;
    setOptionsType: (type: SelectOptionsType$1) => Promise<IFieldRes>;
    getOptionsType: () => Promise<SelectOptionsType$1>;
}
interface ISingleSelectField extends ISelectField<SingleSelectTransformVal, IOpenSingleSelect, Promise<IOpenSingleSelect>> {
}
type MultiSelectTransformVal = string[] | string | IOpenMultiSelect | IOpenSingleSelect;
interface IMultiSelectField extends ISelectField<MultiSelectTransformVal, IOpenMultiSelect, Promise<IOpenMultiSelect>> {
}

interface ICommonTimeFieldProperty$1 {
    dateFormat: DateFormatter$1;
    displayTimeZone: boolean;
}
interface ITimeField<V extends DateTransformVal | CreateTimeTransformVal | ModifiedTimeTransformVal> extends IField<V, IOpenTimestamp, IOpenTimestamp> {
    setDateFormat: (format: DateFormatter$1) => Promise<IFieldRes>;
    getDateFormat: () => Promise<DateFormatter$1>;
    setDisplayTimeZone: (display: boolean) => Promise<IFieldRes>;
    getDisplayTimeZone: () => Promise<boolean>;
}

interface IDateTimeFieldProperty$1 extends ICommonTimeFieldProperty$1 {
    autoFill: boolean;
}
interface IDateTimeFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.DateTime;
    property: IDateTimeFieldProperty$1;
}
interface IDateTimeFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.DateTime;
    property?: Partial<IDateTimeFieldProperty$1>;
}
declare enum FilterDuration$1 {
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
type IFilterDateTimeValue$1 = number | FilterDuration$1 | null;
interface IFilterDateTimeCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterDateTimeValue$1;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator$1.Is | FilterOperator$1.IsGreater | FilterOperator$1.IsLess | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.DateTime;
}
type DateTransformVal = IOpenTimestamp;
interface IDateTimeField extends ITimeField<DateTransformVal> {
}

interface ICurrencyFieldProperty$1 {
    decimalDigits: number;
    currencyCode: CurrencyCode$1;
}
interface ICurrencyFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Currency;
    property: ICurrencyFieldProperty$1;
}
interface ICurrencyFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Currency;
    property?: Partial<ICurrencyFieldProperty$1>;
}
type IFilterCurrencyValue$1 = number | null;
interface IFilterCurrencyCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterCurrencyValue$1;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.IsGreater | FilterOperator$1.IsGreaterEqual | FilterOperator$1.IsLess | FilterOperator$1.IsLessEqual | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.Currency;
}
type CurrencyTransformVal = number;
interface ICurrencyField extends IField<CurrencyTransformVal, number, number> {
    setDecimalDigits: (decimalDigits: number) => Promise<IFieldRes>;
    getDecimalDigits: () => Promise<number>;
    setCurrencyCode: (currencyCode: CurrencyCode$1) => Promise<IFieldRes>;
    getCurrencyCode: () => Promise<CurrencyCode$1>;
}

type IFormulaFieldProperty$1 = null;
interface IFormulaFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Formula;
    property: IFormulaFieldProperty$1;
}
interface IFormulaFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Formula;
    property?: Partial<IFormulaFieldProperty$1>;
}
interface IFilterFormulaCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterAll$1;
    operator: FilterOperator$1;
    fieldType?: FieldType$1.Formula;
}
type FormulaTransformVal = IOpenFormulaCellValue;
type IFormulaField = IField<ICellTransformVal, IOpenCellValue, IOpenCellValue>;

interface IGroupChatFieldProperty$1 {
    multiple: boolean;
}
interface IGroupChatFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.GroupChat;
    property: IGroupChatFieldProperty$1;
}
interface IGroupChatFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.GroupChat;
    property?: Partial<IGroupChatFieldProperty$1>;
}
/** 使用group的id数组作为过滤条件 */
type IFilterGroupValue$1 = string[] | null;
interface IFilterGroupChatCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterGroupValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.GroupChat;
}
type GroupFieldTransformVal = IOpenGroupChat[];
interface IGroupField extends IField<GroupFieldTransformVal, IOpenGroupChat[], IOpenGroupChat[]> {
    setMultiple: (multiple: boolean) => Promise<IFieldRes>;
    getMultiple: () => Promise<boolean>;
}

interface ILocationFieldProperty$1 {
    inputType: ELocationInputType$1;
}
interface ILocationFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Location;
    property: ILocationFieldProperty$1;
}
interface ILocationFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Location;
    property?: Partial<ILocationFieldProperty$1>;
}
type IFilterLocationValue$1 = string | null;
interface IFilterLocationCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterLocationValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Location;
}
type LocationTransformVal = IOpenLocation;
interface ILocationField extends IField<LocationTransformVal, IOpenLocation, IOpenLocation> {
    setInputType: (inputType: ELocationInputType$1) => Promise<IFieldRes>;
    getInputType: () => Promise<ELocationInputType$1>;
}

interface ILookupFieldProperty$1 {
    /**引用字段 id */
    refFieldId: string;
    /**引用字段所在数据表 id */
    refTableId: string;
}
interface ILookupFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Lookup;
    property: ILookupFieldProperty$1;
}
interface ILookupFieldConfigValue extends IBaseFieldConfig {
    type: FieldType$1.Lookup;
    property?: Partial<ILookupFieldProperty$1>;
}
interface IFilterLookupCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterAll$1;
    operator: FilterOperator$1;
    fieldType?: FieldType$1.Lookup;
}
type LookupTransformVal = IOpenFormulaCellValue;
type ILookupField = IField<LookupTransformVal, IOpenFormulaCellValue, IOpenFormulaCellValue>;

type ICreatedTimeFieldProperty$1 = ICommonTimeFieldProperty$1;
interface ICreatedTimeFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.CreatedTime;
    property: ICreatedTimeFieldProperty$1;
}
interface ICreatedTimeFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.CreatedTime;
    property?: Partial<ICreatedTimeFieldProperty$1>;
}
type IFilterCreatedTimeValue$1 = number | FilterDuration$1 | null;
interface IFilterCreatedTimeCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterCreatedTimeValue$1;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator$1.Is | FilterOperator$1.IsGreater | FilterOperator$1.IsLess | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.CreatedTime;
}
type CreateTimeTransformVal = null | undefined;
interface ICreateTimeField extends ITimeField<CreateTimeTransformVal> {
}

type IModifiedTimeFieldProperty$1 = ICommonTimeFieldProperty$1;
interface IModifiedTimeFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.ModifiedTime;
    property: IModifiedTimeFieldProperty$1;
}
interface IModifiedTimeFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.ModifiedTime;
    property?: Partial<IModifiedTimeFieldProperty$1>;
}
type IFilterModifiedTimeValue$1 = number | FilterDuration$1 | null;
interface IFilterModifiedTimeCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterModifiedTimeValue$1;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator$1.Is | FilterOperator$1.IsGreater | FilterOperator$1.IsLess | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.ModifiedTime;
}
type ModifiedTimeTransformVal = null;
interface IModifiedTimeField extends ITimeField<ModifiedTimeTransformVal> {
}

type ICreatedUserFieldProperty$1 = null;
interface ICreatedUserFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.CreatedUser;
    property: ICreatedUserFieldProperty$1;
}
interface ICreatedUserFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.CreatedUser;
    property?: Partial<ICreatedUserFieldProperty$1>;
}
/** 使用 userId */
type IFilterCreatedUserValue$1 = string[] | null;
interface IFilterCreatedUserCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterCreatedUserValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.CreatedUser;
}
type CreateUserTransformVal = null;
interface ICreateUserField extends IField<CreateUserTransformVal, IOpenUser[], IOpenUser[]> {
}

type IModifiedUserFieldProperty$1 = null;
interface IModifiedUserFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.ModifiedUser;
    property: IModifiedUserFieldProperty$1;
}
interface IModifiedUserFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.ModifiedUser;
    property?: Partial<IModifiedUserFieldProperty$1>;
}
/** 使用 userId */
type IFilterModifiedUserValue$1 = string[] | null;
interface IFilterModifiedUserCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterModifiedUserValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.ModifiedUser;
}
type ModifiedUserTransformVal = null;
interface IModifiedUserField extends IField<ModifiedUserTransformVal, IOpenUser[], IOpenUser[]> {
    getMultiple: () => Promise<null>;
}

interface INumberFieldProperty$1 {
    formatter: NumberFormatter$1;
}
interface INumberFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Number;
    property: INumberFieldProperty$1;
}
interface INumberFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Number;
    property?: Partial<INumberFieldProperty$1>;
}
type IFilterNumberValue$1 = number | null;
interface IFilterNumberCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterNumberValue$1;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.IsGreater | FilterOperator$1.IsGreaterEqual | FilterOperator$1.IsLess | FilterOperator$1.IsLessEqual | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.Number;
}
type NumberFieldTransformVal = IOpenNumber;
interface INumberField extends IField<NumberFieldTransformVal, IOpenNumber, IOpenNumber> {
    setFormatter: (formatter: NumberFormatter$1) => Promise<IFieldRes>;
    getFormatter: () => Promise<NumberFormatter$1>;
}

type IPhoneFieldProperty$1 = null;
interface IPhoneFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Phone;
    property: IPhoneFieldProperty$1;
}
interface IPhoneFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Phone;
    property?: Partial<IPhoneFieldProperty$1>;
}
type IFilterPhoneValue$1 = string | null;
interface IFilterPhoneCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterPhoneValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Phone;
}
type PhoneFieldTransformVal = number | IOpenPhone;
type IPhoneField = IField<PhoneFieldTransformVal, IOpenPhone, IOpenPhone>;

type IProgressFieldProperty$1 = null;
interface IProgressFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Progress;
    property: IProgressFieldProperty$1;
}
interface IProgressFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Progress;
    property?: Partial<IProgressFieldProperty$1>;
}
type IFilterProgressValue$1 = number | null;
interface IFilterProgressCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterProgressValue$1;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.IsGreater | FilterOperator$1.IsGreaterEqual | FilterOperator$1.IsLess | FilterOperator$1.IsLessEqual | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.Progress;
}
type ProgressFieldTransformVal = IOpenNumber;
type IProgressField = IField<ProgressFieldTransformVal, IOpenNumber, IOpenNumber>;

type IRatingMinVal$1 = 0 | 1;
interface IRatingFieldProperty$1 {
    min: IRatingMinVal$1;
    max: number;
    rating: {
        icon: RatingIconType$1;
    };
}
interface IRatingFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Rating;
    property: IRatingFieldProperty$1;
}
interface IRatingFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Rating;
    property?: Partial<IRatingFieldProperty$1>;
}
type IFilterRatingValue$1 = number | null;
interface IFilterRatingCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterRatingValue$1;
    operator: FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.IsGreater | FilterOperator$1.IsGreaterEqual | FilterOperator$1.IsLess | FilterOperator$1.IsLessEqual | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
    fieldType?: FieldType$1.Rating;
}
type RatingTransformVal = IOpenNumber;
interface IRatingField extends IField<RatingTransformVal, IOpenNumber, IOpenNumber> {
    getMin: () => Promise<IRatingMinVal$1>;
    setMin: (min: IRatingMinVal$1) => Promise<IFieldRes>;
    getMax: () => Promise<number>;
    setMax: (max: number) => Promise<IFieldRes>;
    getRatingIcon: () => Promise<RatingIconType$1>;
    setRatingIcon: (icon: RatingIconType$1) => Promise<IFieldRes>;
}

type IUrlFieldProperty$1 = null;
interface IUrlFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Url;
    property: IUrlFieldProperty$1;
}
interface IUrlFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Url;
    property?: IUrlFieldProperty$1;
}
type IFilterUrlValue$1 = string | null;
interface IFilterUrlCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterUrlValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Url;
}
type UrlTransformVal = string | IOpenUrlSegment$1 | IOpenUrlSegment$1[];
type IUrlField = IField<UrlTransformVal, IOpenUrlSegment$1[], IOpenUrlSegment$1[]>;

interface IUserFieldProperty$1 {
    multiple: boolean;
}
interface IUserFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.User;
    property: IUserFieldProperty$1;
}
interface IUserFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.User;
    property?: Partial<IUserFieldProperty$1>;
}
type IFilterUserValue$1 = string[] | null;
interface IFilterUserCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterUserValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.User;
}
type UserFieldTransformVal = IOpenUser | IOpenUser[];
interface IUserField extends IField<UserFieldTransformVal, IOpenUser[], IOpenUser[]> {
    getMultiple: () => Promise<boolean>;
    setMultiple: (multiple: boolean) => Promise<IFieldRes>;
}

type INotSupportField = IField<null, null, null>;

type IEmailFieldProperty$1 = null;
interface IEmailFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Email;
    property: IEmailFieldProperty$1;
}
interface IEmailFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Email;
    property?: IEmailFieldProperty$1;
}
type IFilterEmailValue$1 = string | null;
interface IFilterEmailCondition$1 extends IFilterBaseCondition$1 {
    value: IFilterEmailValue$1;
    operator: BaseFilterOperator$1;
    fieldType?: FieldType$1.Email;
}
type IEmailField = IField<string, string, string>;

type IFilterAll$1 = IFilterTextValue$1 | IFilterUrlValue$1 | IFilterCheckboxValue$1 | IFilterUserValue$1 | IFilterModifiedUserValue$1 | IFilterCreatedUserValue$1 | IFilterDateTimeValue$1 | IFilterCreatedTimeValue$1 | IFilterModifiedTimeValue$1 | IFilterLinkValue$1 | IFilterSelectValue$1 | IFilterAutoNumberValue$1 | IFilterPhoneValue$1 | IFilterLocationValue$1 | IFilterGroupValue$1 | IFilterNumberValue$1 | IFilterEmailValue$1 | null;
type FilterInfoCondition$1 = IFilterAttachmentCondition$1 | IFilterCheckboxCondition$1 | IFilterAutoNumberCondition$1 | IFilterDateTimeCondition$1 | IFilterCreatedTimeCondition$1 | IFilterModifiedTimeCondition$1 | IFilterUserCondition$1 | IFilterCreatedUserCondition$1 | IFilterModifiedUserCondition$1 | IFilterDuplexLinkCondition$1 | IFilterSingleLinkCondition$1 | IFilterFormulaCondition$1 | IFilterGroupChatCondition$1 | IFilterLocationCondition$1 | IFilterLookupCondition$1 | IFilterMultiSelectCondition$1 | IFilterSingleSelectCondition$1 | IFilterPhoneCondition$1 | IFilterTextCondition$1 | IFilterNumberCondition$1 | IFilterUrlCondition$1 | IFilterCurrencyCondition$1 | IFilterBarcodeCondition$1 | IFilterProgressCondition$1 | IFilterEmailCondition$1 | IFilterRatingCondition$1;
declare enum FilterOperator$1 {
    /** 等于 */
    Is = "is",
    /** 不等于 */
    IsNot = "isNot",
    /** 包含 */
    Contains = "contains",
    /** 不包含 */
    DoesNotContain = "doesNotContain",
    /** 为空 */
    IsEmpty = "isEmpty",
    /** 不为空 */
    IsNotEmpty = "isNotEmpty",
    /** 大于 */
    IsGreater = "isGreater",
    /** 大于或等于 */
    IsGreaterEqual = "isGreaterEqual",
    /** 小于 */
    IsLess = "isLess",
    /** 小于或等于 */
    IsLessEqual = "isLessEqual"
}
declare enum FilterConjunction$1 {
    And = "and",
    Or = "or"
}
type BaseFilterOperator$1 = FilterOperator$1.Is | FilterOperator$1.IsNot | FilterOperator$1.Contains | FilterOperator$1.DoesNotContain | FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
interface IFilterBaseCondition$1 {
    fieldId: string;
    conditionId?: string;
}
interface IFilterInfo$1 {
    conjunction: FilterConjunction$1;
    conditions: FilterInfoCondition$1[];
}
declare enum SetFilterType$1 {
    AddCondition = "AddCondition",
    DeleteCondition = "DeleteCondition",
    UpdateCondition = "UpdateCondition",
    SetConjunction = "SetConjunction"
}
type IAddFilterConditionParams$1 = FilterInfoCondition$1 | FilterInfoCondition$1[];
type IDeleteFilterConditionParams$1 = string;
type IUpdateFilterConditionParams$1 = FilterInfoCondition$1 | FilterInfoCondition$1[];
type ISetFilterConjunctionParams$1 = FilterConjunction$1;
type ISetFilterParams$1 = IAddFilterConditionParams$1 | IDeleteFilterConditionParams$1 | IUpdateFilterConditionParams$1 | ISetFilterConjunctionParams$1;
interface IViewFilterMessage$1 {
    getFilterInfo(): Promise<IFilterInfo$1 | null>;
    setFilter(type: SetFilterType$1, params: ISetFilterParams$1): Promise<boolean>;
}
interface IViewFilterApplication$1 {
    addFilterCondition: (param: IAddFilterConditionParams$1) => Promise<boolean>;
    deleteFilterCondition: (conditionId: string) => Promise<boolean>;
    updateFilterCondition: (param: IUpdateFilterConditionParams$1) => Promise<boolean>;
    setFilterConjunction: (conjunction: FilterConjunction$1) => Promise<boolean>;
}

interface IAttachmentFieldProperty$1 {
    onlyMobile: boolean;
}
interface IAttachmentFieldMeta$1 extends IBaseFieldMeta$1 {
    type: FieldType$1.Attachment;
    property: IAttachmentFieldProperty$1;
}
interface IAttachmentFieldConfig extends IBaseFieldConfig {
    type: FieldType$1.Attachment;
    property?: Partial<IAttachmentFieldProperty$1>;
}
interface IFilterAttachmentCondition$1 extends IFilterBaseCondition$1 {
    fieldType?: FieldType$1.Attachment;
    value?: null;
    operator: FilterOperator$1.IsEmpty | FilterOperator$1.IsNotEmpty;
}
type AttachmentTransformVal = File | File[] | FileList | IOpenAttachment | IOpenAttachment[];
interface IAttachmentField extends IField<AttachmentTransformVal, IOpenAttachment[], Promise<IOpenAttachment[]>> {
    getAttachmentUrls: (recordOrId: IRecordType | string) => Promise<string[]>;
    setOnlyMobile: (onlyMobile: boolean) => Promise<IFieldRes>;
    getOnlyMobile: () => Promise<boolean>;
}

type IFieldMeta$1 = IAttachmentFieldMeta$1 | IAutoNumberFieldMeta$1 | IBarcodeFieldMeta$1 | IButtonUserFieldMeta$1 | ICheckboxFieldMeta$1 | ISingleLinkFieldMeta$1 | ISingleSelectFieldMeta$1 | IMultiSelectFieldMeta$1 | IDuplexLinkFieldMeta$1 | IDateTimeFieldMeta$1 | ICurrencyFieldMeta$1 | IFormulaFieldMeta$1 | IGroupChatFieldMeta$1 | ILocationFieldMeta$1 | ILookupFieldMeta$1 | ICreatedTimeFieldMeta$1 | IModifiedTimeFieldMeta$1 | ICreatedUserFieldMeta$1 | IModifiedUserFieldMeta$1 | INumberFieldMeta$1 | IPhoneFieldMeta$1 | IProgressFieldMeta$1 | IRatingFieldMeta$1 | ITextFieldMeta$1 | IUrlFieldMeta$1 | IUserFieldMeta$1 | IEmailFieldMeta$1;
type IFieldProperty = IAttachmentFieldProperty$1 | IAutoNumberFieldProperty$1 | IBarCodeFieldProperty$1 | IButtonFieldProperty$1 | ICheckboxFieldProperty$1 | ISingleLinkFieldProperty$1 | ICommonSelectFieldProperty$1 | IDuplexLinkFieldProperty$1 | IDateTimeFieldProperty$1 | ICurrencyFieldProperty$1 | IFormulaFieldProperty$1 | IGroupChatFieldProperty$1 | ILocationFieldProperty$1 | ILookupFieldProperty$1 | ICreatedTimeFieldProperty$1 | IModifiedTimeFieldProperty$1 | ICreatedUserFieldProperty$1 | IModifiedUserFieldProperty$1 | INumberFieldProperty$1 | IPhoneFieldProperty$1 | IProgressFieldProperty$1 | IRatingFieldProperty$1 | ITextFieldProperty$1 | IUrlFieldProperty$1 | IUserFieldProperty$1 | IEmailFieldProperty$1;
type IFieldConfig = IAttachmentFieldConfig | IAutoNumberFieldConfig | IBarCodeFieldConfig | IBarCodeFieldConfig | IButtonFieldConfig | ICheckboxFieldConfig | ISingleLinkFieldConfig | ISelectFieldConfig | IDuplexLinkFieldConfig | IDateTimeFieldConfig | ICurrencyFieldConfig | IFormulaFieldConfig | IGroupChatFieldConfig | ILocationFieldConfig | ILookupFieldConfigValue | ICreatedTimeFieldConfig | IModifiedTimeFieldConfig | ICreatedUserFieldConfig | IModifiedUserFieldConfig | INumberFieldConfig | IPhoneFieldConfig | IProgressFieldConfig | IRatingFieldConfig | ITextFieldConfig | IUrlFieldConfig | IUserFieldConfig | IEmailFieldConfig;
type IAddFieldConfig = IFieldConfig;
type ISetFieldConfig = Partial<IFieldConfig>;
type FieldId = string;
type IFieldRes = FieldId;

type IRecordValue = {
    fields: {
        [fieldId: string]: IOpenCellValue;
    };
};
interface IRecord {
    recordId: string;
    fields: {
        [fieldId: string]: IOpenCellValue;
    };
}
type RecordId$1 = string;
type IRecordRes = RecordId$1;
interface IGetRecordsParams {
    pageSize?: number;
    pageToken?: RecordId$1;
    filter?: string;
    sort?: string;
    viewId?: string;
}
interface IGetRecordsResponse {
    total: number;
    hasMore: boolean;
    records: IRecord[];
    pageToken?: string;
}

interface ISortInfo$1 {
    fieldId: string;
    /** false: 正序 A -> Z;  true: 倒序 Z -> A */
    desc: boolean;
}
interface IViewSortMessage$1 {
    getSortInfo(): Promise<ISortInfo$1[]>;
    setSortInfo(sortInfo: ISortInfo$1[]): Promise<boolean>;
    setAutoSort(param: boolean): Promise<boolean>;
}
interface IViewSortApplication$1 {
    addSort: (param: ISortInfo$1 | ISortInfo$1[]) => Promise<boolean>;
    deleteSort: (param: ISortInfo$1 | string) => Promise<boolean>;
    updateSort: (param: ISortInfo$1) => Promise<boolean>;
}

type IGroupInfo$1 = ISortInfo$1;
interface IViewGroupMessage$1 {
    getGroupInfo(): Promise<IGroupInfo$1[]>;
    setGroupInfo(groupInfo: IGroupInfo$1[]): Promise<boolean>;
}
interface IViewGroupApplication$1 {
    addGroup: (param: IGroupInfo$1 | IGroupInfo$1[]) => Promise<boolean>;
    deleteGroup: (param: string | IGroupInfo$1) => Promise<boolean>;
    updateGroup: (param: IGroupInfo$1) => Promise<boolean>;
}

type IBaseViewProperty$1 = object;
interface IBaseViewMeta$1 {
    id: string;
    name: string;
    type: ViewType$1;
    property: IBaseViewProperty$1;
}
/** 表格视图配置 */
interface IGridViewProperty$1 extends IBaseViewProperty$1 {
    hierarchyConfig: {
        fieldId: string | undefined;
    };
    filterInfo: IFilterInfo$1 | null;
    sortInfo: ISortInfo$1[];
    groupInfo: IGroupInfo$1[];
}
/** 看板视图层级配置 */
interface IKanbanViewProperty$1 extends IBaseViewProperty$1 {
    filterInfo: IFilterInfo$1 | null;
    sortInfo: ISortInfo$1[];
}
/** 表单视图层级配置 */
type IFormViewProperty$1 = IBaseViewProperty$1;
/** 画册视图层级配置 */
interface IGalleryViewProperty$1 extends IBaseViewProperty$1 {
    sortInfo: ISortInfo$1[];
    filterInfo: IFilterInfo$1 | null;
}
/** 甘特视图层级配置 */
interface IGanttViewProperty$1 extends IBaseViewProperty$1 {
    filterInfo: IFilterInfo$1 | null;
    sortInfo: ISortInfo$1[];
    groupInfo: IGroupInfo$1[];
}
/** 层级视图层级配置 */
type IHierarchyViewProperty$1 = IBaseViewProperty$1;
/** 日历视图层级配置 */
interface ICalendarViewProperty$1 extends IBaseViewProperty$1 {
    filterInfo: IFilterInfo$1 | null;
}
/** 插件视图层级配置 */
type IWidgetViewProperty$1 = IBaseViewProperty$1;
interface IGridViewMeta$1 extends IBaseViewMeta$1 {
    property: IGridViewProperty$1;
}
interface IKanbanViewMeta$1 extends IBaseViewMeta$1 {
    property: IKanbanViewProperty$1;
}
interface IFormViewMeta$1 extends IBaseViewMeta$1 {
    property: IFormViewProperty$1;
}
interface IGalleryViewMeta$1 extends IBaseViewMeta$1 {
    property: IGalleryViewProperty$1;
}
interface IGanttViewMeta$1 extends IBaseViewMeta$1 {
    property: IGanttViewProperty$1;
}
interface IHierarchyViewMeta$1 extends IBaseViewMeta$1 {
    property: IHierarchyViewProperty$1;
}
interface ICalendarViewMeta$1 extends IBaseViewMeta$1 {
    property: ICalendarViewProperty$1;
}
interface IWidgetViewMeta$1 extends IBaseViewMeta$1 {
    property: IWidgetViewProperty$1;
}
type IViewMeta$1 = IGridViewMeta$1 | IKanbanViewMeta$1 | IFormViewMeta$1 | IGalleryViewMeta$1 | IGanttViewMeta$1 | IHierarchyViewMeta$1 | ICalendarViewMeta$1 | IWidgetViewMeta$1;

interface ICalendarViewMessageModule$1 extends IViewMessageModule$1, IViewFilterMessage$1 {
}
interface ICalendarViewApplicationModule$1 extends IViewApplicationModule$1, IViewFilterApplication$1 {
}
type ICalendarView$1 = ICalendarViewMessageModule$1 & ICalendarViewApplicationModule$1;

interface IGalleryViewMessageModule$1 extends IViewMessageModule$1, IViewFilterMessage$1, IViewSortMessage$1 {
}
interface IGalleryViewApplicationModule$1 extends IViewApplicationModule$1, IViewFilterApplication$1, IViewSortApplication$1 {
}
type IGalleryView$1 = IGalleryViewMessageModule$1 & IGalleryViewApplicationModule$1;

interface IGridViewMessageModule$1 extends IViewMessageModule$1, IViewSortMessage$1, IViewGroupMessage$1, IViewFilterMessage$1 {
    /** 获取指定记录的子记录 id 列表, undefined 则表示该记录无子记录 */
    getChildRecordIdList(parentRecordId: string): Promise<RecordId$1[] | undefined>;
    getFieldWidth(fieldId: string): Promise<number>;
    setFieldWidth(fieldId: string, width: number): Promise<boolean>;
    setRowHeight(rowHeight: RowHeightLevel$1): Promise<boolean>;
}
interface IGridViewApplicationModule$1 extends IViewApplicationModule$1, IViewSortApplication$1, IViewGroupApplication$1, IViewFilterApplication$1 {
    hideField: (fieldId: string | string[]) => Promise<boolean>;
    showField: (fieldId: string | string[]) => Promise<boolean>;
}
type IGridView$1 = IGridViewMessageModule$1 & IGridViewApplicationModule$1;

interface IKanbanViewMessageModule$1 extends IViewMessageModule$1, IViewSortMessage$1, IViewFilterMessage$1 {
}
interface IKanbanViewApplicationModule$1 extends IViewApplicationModule$1, IViewSortApplication$1, IViewFilterApplication$1 {
}
type IKanbanView$1 = IKanbanViewApplicationModule$1 & IKanbanViewMessageModule$1;

interface IFormViewMessageModule$1 extends IViewMessageModule$1 {
}
interface IFormViewApplicationModule$1 extends IViewApplicationModule$1 {
}
type IFormView$1 = IFormViewMessageModule$1 & IFormViewApplicationModule$1;

interface IGanttViewMessageModule$1 extends IViewMessageModule$1, IViewGroupMessage$1, IViewFilterMessage$1, IViewSortMessage$1 {
}
interface IGanttViewApplicationModule$1 extends IViewApplicationModule$1, IViewGroupApplication$1, IViewFilterApplication$1, IViewSortApplication$1 {
}
type IGanttView$1 = IGanttViewMessageModule$1 & IGanttViewApplicationModule$1;

type ViewId = string;
interface IAddViewConfig {
    name?: string;
    type: ViewType$1;
}
interface IAddViewResult {
    viewId: string;
    index: number;
}
interface ISetViewConfig {
    name?: string;
}

declare enum RowHeightLevel$1 {
    Short = 1,
    Medium = 2,
    Tall = 3,
    ExtraTall = 4
}
declare enum SharingStatus$1 {
    Enabled = "Enabled",
    Disabled = "Disabled"
}
interface ISharingMeta {
    status: SharingStatus$1;
    shareLink: string;
}
/** [tableId, viewId] */
type ViewContext = [string, string];
interface IViewMessageModule$1 {
    /** 获取字段名 */
    getName(): Promise<string>;
    /** 获取视图类型 */
    getType(): Promise<ViewType$1>;
    /** 获取视图元数据 */
    getMeta(): Promise<IViewMeta$1>;
    /** 获取字段列表（有序） */
    getFieldMetaList(): Promise<IFieldMeta$1[]>;
    /** 获取记录 ID 列表 */
    getVisibleRecordIdList(filterInfo?: IFilterInfo$1, sortInfo?: ISortInfo$1[]): Promise<(string | undefined)[]>;
    /** 获取可见字段 ID 列表 */
    getVisibleFieldIdList(): Promise<string[]>;
    applySetting(): Promise<void>;
    setFieldVisibility(fieldId: string | string[], hidden: boolean): Promise<boolean>;
    toggleViewSharing(flag: boolean): Promise<boolean>;
}
interface IViewApplicationModule$1 {
    id: string;
    tableId: string;
    hideField: (fieldId: string | string[]) => Promise<boolean>;
    showField: (fieldId: string | string[]) => Promise<boolean>;
    enableSharing: () => Promise<boolean>;
    disableSharing: () => Promise<boolean>;
    getShareLink(): Promise<string>;
    getSharingStatus(): Promise<SharingStatus$1>;
}
type IView = IViewMessageModule$1 & IViewApplicationModule$1;

/** [tableId] */
type TableContext = [string];
interface ITableMessageModule {
    /** 获取表名 */
    getName(): Promise<string>;
    /** 获取 Meta 信息 */
    getMeta(): Promise<ITableMeta>;
    /** 添加字段 */
    addField(fieldConfig: IAddFieldConfig): Promise<IFieldRes>;
    /** 删除字段 */
    deleteField(fieldId: string): Promise<boolean>;
    /** 修改字段 */
    setField(fieldId: string, fieldConfig: ISetFieldConfig): Promise<IFieldRes>;
    /** 获取某个 field 元信息 */
    getFieldMetaById(fieldId: string): Promise<IFieldMeta$1>;
    /** 获取所有 field 元信息 */
    getFieldMetaList(): Promise<IFieldMeta$1[]>;
    /** 字段是否存在 */
    isFieldExist(fieldId: string): Promise<boolean>;
    /** 添加视图（目前支持设置视图 name） */
    addView(config: IAddViewConfig): Promise<IAddViewResult>;
    /** 设置视图（目前支持设置视图 name） */
    setView(viewId: string, config: ISetViewConfig): Promise<ViewId>;
    /** 删除视图 */
    deleteView(viewId: string): Promise<boolean>;
    /** 获取某个视图元信息 */
    getViewMetaById(viewId: string): Promise<IViewMeta$1>;
    /** 获取所有 视图 元信息 */
    getViewMetaList(): Promise<IViewMeta$1[]>;
    /** 视图是否存在 */
    isViewExist(viewId: string): Promise<boolean>;
    /** 通过 recordId 获取指定记录 */
    getRecordById(recordId: string): Promise<IRecordValue>;
    /**
     * 批量获取 record，单次上限 5000 条
     * @param param
     *  - @property pageSize: 获取数量，默认 500，最大不得超过 5000
     *  - @property pageToken: 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果
     *  - @property filter: 过滤条件
     *  - @property sort: 排序条件
     *  - @property viewId: 获取指定视图的 record，当传入 filter/sort 时，该属性会被忽略
     */
    getRecords(param: IGetRecordsParams): Promise<IGetRecordsResponse>;
    /**
     * 获取记录分享链接
     * @param recordId string
     */
    getRecordShareLink(recordId: string): Promise<string>;
    /**
     * 获取表中所有记录 Id
     * @param filter 过滤条件
     * @param sort 排序条件
     * @returns
     */
    getRecordIdList(filter?: Formula, sort?: Sort): Promise<string[]>;
    /**
     * 获取单元格值
     * @param fieldId
     * @param recordId
     */
    getCellValue(fieldId: string, recordId: string): Promise<IOpenCellValue>;
    /**
     * 设置单元格的值
     * @param fieldId
     * @param recordId
     * @param cellValue
     */
    setCellValue<T extends IOpenCellValue = IOpenCellValue>(fieldId: string, recordId: string, cellValue: T): Promise<boolean>;
    /**
     * 获取 attachment 的 url
     * @param token
     * @param fieldId
     * @param recordId
     */
    getAttachmentUrl(token: string, fieldId?: string, recordId?: string): Promise<string>;
    /**
     * 批量获取指定单元格中的附件 url，通过 fieldId 和 recordId 指定附件所在的单元格
     * @param tokens
     * @param fieldId
     * @param recordId
     */
    getCellAttachmentUrls(tokens: string[], fieldId: string, recordId: string): Promise<string[]>;
    /**
     * 增加一条记录
     * @param recordValue
     */
    addRecord(recordValue?: IRecordValue): Promise<IRecordRes>;
    /**
     * 增加多条记录，单次上限 5000 条
     * @param recordValueList
     */
    addRecords(recordValueList?: IRecordValue[]): Promise<IRecordRes[]>;
    /**
     * 修改一条记录
     * @param recordId
     * @param recordValue
     */
    setRecord(recordId: string, recordValue?: IRecordValue): Promise<IRecordRes>;
    /**
     * 修改多条记录，单次上限 5000 条
     * @param records
     */
    setRecords(records?: IRecord[]): Promise<IRecordRes[]>;
    /**
     * 删除一条记录
     * @param recordId
     */
    deleteRecord(recordId: string): Promise<boolean>;
    /**
     * 删除多条记录，单次上限 5000 条
     * @param recordIdList
     */
    deleteRecords(recordIdList: string[]): Promise<boolean>;
    /**
     * 获取 cellValue 并转化为 string 格式
     */
    getCellString(fieldId: string, recordId: string): Promise<string>;
    /**
     * 通过字段名获取字段 id
     * @param name
     */
    getFieldIdByName(name: string): Promise<string>;
    /**
     * 注册 table 事件，注册后 host 将会向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    registerTableEvent(event: WidgetTableEvent): Promise<void>;
    /**
     * 取消注册 table 事件，取消注册后 host 将停止向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    unregisterTableEvent(event: WidgetTableEvent): Promise<void>;
}
interface ITableApplicationModule {
    id: string;
    /** 获取字段列表 */
    getFieldList: <T extends IField>() => Promise<T[]>;
    /**
     * @deprecated The method will be removed, use getFieldMetaList instead!
     */
    getFieldIdList(): Promise<string[]>;
    /**
     * 根据字段 id 获取字段
     * @param fieldId
     */
    getFieldById: <T extends IField>(id: string) => Promise<T>;
    /**
     * 根据字段名称获取字段
     * @param name
     */
    getFieldByName: <T extends IField>(name: string) => Promise<T>;
    /**
     * 监听 Field 添加事件
     * @param callback 回调函数
     */
    onFieldAdd(callback: (ev: IEventCbCtx) => void): () => void;
    /**
     * 监听 Field 删除事件
     * @param callback 回调函数
     */
    onFieldDelete(callback: (ev: IEventCbCtx) => void): () => void;
    /**
     * 监听 Field 修改事件
     * @param callback 回调函数
     */
    onFieldModify(callback: (ev: IEventCbCtx) => void): () => void;
    /**
     * 监听 Record 添加事件
     * @param callback 回调函数
     */
    onRecordAdd(callback: (ev: IEventCbCtx<[recordId: string]>) => void): () => void;
    /**
     * 监听 Record 删除事件
     * @param callback 回调函数
     */
    onRecordDelete(callback: (ev: IEventCbCtx<[recordId: string]>) => void): () => void;
    /**
     * 监听 Record 修改事件
     * @param callback 回调函数
     */
    onRecordModify(callback: (ev: IEventCbCtx<{
        recordId: string;
        fieldIds: string[];
    }>) => void): () => void;
    /**
     * 根据字段 id 获取视图
     * @param viewId
     */
    getViewById: (id: string) => Promise<IView>;
    getViewList: () => Promise<IView[]>;
    getActiveView: () => Promise<IView>;
    getFieldListByType: <T extends IField>(type: FieldType$1) => Promise<T[]>;
    getFieldMetaListByType: <T extends IFieldMeta$1>(type: FieldType$1) => Promise<T[]>;
    getRecordList: (filter?: Formula, sort?: Sort) => Promise<IRecordList>;
    getField: <T extends IField>(idOrName: string) => Promise<T>;
    addRecord: (recordVale?: IRecordValue | ICell | ICell[]) => Promise<IRecordRes>;
    addRecords: (record?: IRecordValue[] | ICell[] | Array<ICell[]>) => Promise<IRecordRes[]>;
    addRecordByCell: (cells: ICell[]) => Promise<IRecordRes>;
    addRecordsByCell: (cells: Array<ICell[]>) => Promise<IRecordRes[]>;
    deleteField: (fieldOrId: string | IField) => Promise<boolean>;
}
type ITable = ITableMessageModule & ITableApplicationModule;

type BaseContext = never[];
interface ITableMeta {
    id: string;
    name: string;
    isSync: boolean;
}
interface IAddTableResult {
    tableId: string;
    index: number;
}
interface IAddTableConfig {
    name: string;
    fields: IFieldConfig[];
}
interface ISetTableConfig {
    name: string;
}
type TableId = string;
interface IBaseMessageModule {
    addTable(config: IAddTableConfig): Promise<IAddTableResult>;
    setTable(tableId: string, config: ISetTableConfig): Promise<TableId>;
    deleteTable(tableId: string): Promise<boolean>;
    /** 读取当前 table id, field id(仅 itemview 会返回), recordId(仅 itemview 会返回) */
    getSelection(): Promise<Selection>;
    /** 获取指定数据表元信息 */
    getTableMetaById(tableId: string): Promise<ITableMeta>;
    /** 获取当前 base 下所有表元信息 */
    getTableMetaList(): Promise<ITableMeta[]>;
    /**
     * 获取 Base、Table、Field、Record、Cell 等不同实体的权限
     */
    getPermission(params: GetPermissionParams): Promise<boolean>;
    /**
     * @deprecated 请使用 getPermission 方法
     * 获取当前 base 的权限信息
     * @param type 权限类型，目前支持管理/编辑/复制/打印权限的判断
     */
    getBasePermission(type: BaseOperation): Promise<boolean>;
    /**
     * 是否在编辑模式
     */
    isEditable(): Promise<boolean>;
    /**
     * @deprecated 推荐使用 batchUploadFile 方法
     * 上传文件，返回上传任务的 taskId
     * @param file
     * @return taskId
     */
    uploadFile(file: File | FileList): Promise<string>;
    /**
     * 批量上传文件，按序返回每个文件对应的 fileToken 列表
     * @param {(File[] | FileList)} files
     * @return {Promise<string[]>} fileTokens
     */
    batchUploadFile(file: File[] | FileList): Promise<string[]>;
    /**
     * 当前表是否存在
     */
    isTableExist(tableId: string): Promise<boolean>;
    /**
     * 通过表名获取表 id
     * @param name
     */
    getTableIdByName(name: string): Promise<string>;
    /**
     * 注册 base 事件，注册后 host 将会向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    registerBaseEvent(event: WidgetBaseEvent): Promise<void>;
    /**
     * 取消注册 base 事件，取消注册后 host 将停止向 client 转发相关事件
     *
     * client 对任何一个事件最多有一个监听
     */
    unregisterBaseEvent(event: WidgetBaseEvent): Promise<void>;
}
interface IBaseApplicationModule {
    /** 获取指定数据表，可传 id 或 name */
    getTable: (idOrName: string) => Promise<ITable>;
    getActiveTable: () => Promise<ITable>;
    /** 获取当前 base 下所有表 */
    getTableList: () => Promise<ITable[]>;
    /**
     * 通过表 id 获取表
     * @param tableId
     */
    getTableById: (id: string) => Promise<ITable>;
    /**
     * 通过表名获取表
     * @param name
     */
    getTableByName: (name: string) => Promise<ITable>;
    /**
     * 监听 Table 添加事件
     * @param callback 回调函数
     */
    onTableAdd(callback: (e: IEventCbCtx) => void): () => void;
    /**
     * 监听 Table 删除事件
     * @param callback 回调函数
     */
    onTableDelete(callback: (e: IEventCbCtx) => void): () => void;
    /**
     * 监听选中改变事件
     * @param callback 回调函数，参数为当前选中的 base/table/field/record ID 集合
     */
    onSelectionChange(callback: (e: IEventCbCtx<Selection>) => void): () => void;
    /**
     * 监听权限变化
     * @param callback 回调函数
     */
    onPermissionChange(callback: () => void): () => void;
    /**
     * 监听上传文件的状态变化
     * @param callback
     */
    onUploadStatusChange(callback: (data: IUploadEventData) => void): () => void;
}
type IBase = IBaseMessageModule & IBaseApplicationModule;

/**
 * 私有 API 模块
 */
interface IPrivateMessageModule {
    /**
     * 设置 client 版本
     * @param version
     */
    setClientVersion(version: string): Promise<void>;
}

interface ISelectOptionColor {
    /** 颜色方案id，可用范围为0 - 54 */
    id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54;
    /** 同css 16进制颜色值，选项的背景色
     * @example '#ff0000' 纯红色
     */
    bgColor: string;
    /** 同css 16进制颜色值，文字的颜色
     * @example '#ff0000' 纯红色
     */
    textColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标的颜色
     * @example '#ff0000' 纯红色
     */
    iconColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标hover时候的颜色
     * @example '#ff0000' 纯红色
     */
    iconAltColor: string;
}
type BlockId = TableId;
declare enum ToastType {
    info = "info",
    success = "success",
    warning = "warning",
    error = "error",
    loading = "loading"
}
type ShowToastOptions = {
    toastType?: ToastType;
    message: string;
};
interface ICommonUIMessageModule {
    getSelectOptionColorInfoList(): Promise<ISelectOptionColor[]>;
    switchBlock(blockId: BlockId): Promise<boolean>;
    switchToView(tableId: string, viewId: string): Promise<boolean>;
    showToast(options: ShowToastOptions): Promise<boolean>;
    selectRecordIdList(tableId: string, viewId: string): Promise<string[]>;
}
interface ICommonUIApplicationModule {
    switchToTable(tableId: TableId): Promise<boolean>;
}
type ICommonUI = ICommonUIMessageModule & ICommonUIApplicationModule;

/**
 * 调试接口的时候可能看到 c 和 p 比较迷惑，这里主要是为了节省传输开销
 * 在 10000 行 getCellValue 测试中，使用短名称优化可以提高 2% 的性能
 */
interface TransferType {
    /**
     * 指 context，为了节省传输开销所以用 c 简写
     *
     * 推荐使用数组，暂时为了风格统一强制指定为数组
     */
    c: unknown[];
    /**
     * 指 params ，为了节省传输开销所以用 p 简写，参数会被直接 apply 给 host 上的函数
     */
    p: unknown[];
}

declare const baseEventPrefix = "BaseEvent";
declare const tableEventPrefix = "TableEvent";
declare const fieldEventPrefix = "FieldEvent";
declare const bridgeEventPrefix = "BridgeEvent";
declare const getBaseEventKey: (eventName: WidgetBaseEvent) => string;
declare const getTableEventKey: (tableId: string, eventName: WidgetTableEvent) => string;
declare const getFieldEventKey: (tableId: string, fieldId: string, eventName: WidgetFieldEvent) => string;
declare const getBridgeEventKey: (eventName: BridgeEvent) => string;

declare function createApiKey(moduleName: string, methodName: string): string;
declare function createCompatibleApiKey(moduleName: string, methodName: string): string;
declare function getNeedTransformApiKeyMap(): {
    WidgetBase_getBasePermission: string;
    WidgetBase_registerBaseEvent: string;
    WidgetBase_getSelection: string;
    WidgetBase_isTableExist: string;
    WidgetTable_getCellValue: string;
    WidgetBase_getTableMetaList: string;
    WidgetTable_getName: string;
    WidgetTable_isFieldExist: string;
    WidgetField_getName: string;
    WidgetTable_isViewExist: string;
    WidgetView_getName: string;
    WidgetBase_getTableIdByName: string;
    WidgetBase_isEditable: string;
    WidgetBase_unregisterBaseEvent: string;
    WidgetBase_uploadFile: string;
    WidgetTable_getFieldMetaById: string;
    WidgetTable_getFieldMetaList: string;
    WidgetTable_getViewMetaById: string;
    WidgetTable_getViewMetaList: string;
    WidgetTable_getFieldIdByName: string;
    WidgetTable_getRecordIdList: string;
    WidgetTable_setCellValue: string;
    WidgetTable_addRecord: string;
    WidgetTable_setRecord: string;
    WidgetTable_deleteRecord: string;
    WidgetTable_registerTableEvent: string;
    WidgetTable_unregisterTableEvent: string;
    WidgetTable_getAttachmentUrl: string;
    WidgetField_getType: string;
    WidgetField_getMeta: string;
    WidgetField_getProxyType: string;
    WidgetField_getFieldValueList: string;
    WidgetField_registerFieldEvent: string;
    WidgetField_unregisterFieldEvent: string;
    WidgetView_getType: string;
    WidgetView_getFieldMetaList: string;
    WidgetView_getVisibleRecordIdList: string;
    WidgetBase_getTableList: string;
    WidgetBase_getTableById: string;
    WidgetBase_onTableAdd: string;
    WidgetBase_onTableDelete: string;
    WidgetBase_onSelectionChange: string;
    WidgetBase_onUploadStatusChange: string;
    WidgetTable_getFieldList: string;
    WidgetTable_getFieldById: string;
    WidgetTable_getViewById: string;
    WidgetTable_onFieldAdd: string;
    WidgetTable_onFieldDelete: string;
    WidgetTable_onFieldModify: string;
    WidgetTable_onRecordModify: string;
    WidgetTable_getCellAttachmentUrls: string;
};

declare function isUsers(value: unknown): value is IOpenUser[];
declare function isLocation(value: unknown): value is IOpenLocation;
declare function isAttachment(value: unknown): value is IOpenAttachment;
declare function isAttachments(value: unknown): value is IOpenAttachment[];
declare function isTimestamp(value: unknown): value is IOpenTimestamp;
declare function isCheckbox(value: unknown): value is IOpenCheckbox;
declare function isPhone(value: unknown): value is IOpenPhone;
declare function isAutoNumber(value: unknown): value is IOpenAutoNumber;
declare function isNumber(value: unknown): value is IOpenNumber;
declare function isSingleSelect(value: unknown): value is IOpenSingleSelect;
declare function isMultiSelect(value: unknown): value is IOpenMultiSelect;
declare function isEmpty(value: unknown): value is null;
declare function isSegmentItem(value: unknown): value is IOpenSegment;
declare function isSegments(value: unknown): value is IOpenSegment[];
declare function isLink(value: unknown): value is IOpenLink;
declare function isGroupChat(value: unknown): value is IOpenGroupChat;
declare function isGroupChats(value: unknown): value is IOpenGroupChat[];

declare const cell_checkers_isUsers: typeof isUsers;
declare const cell_checkers_isLocation: typeof isLocation;
declare const cell_checkers_isAttachment: typeof isAttachment;
declare const cell_checkers_isAttachments: typeof isAttachments;
declare const cell_checkers_isTimestamp: typeof isTimestamp;
declare const cell_checkers_isCheckbox: typeof isCheckbox;
declare const cell_checkers_isPhone: typeof isPhone;
declare const cell_checkers_isAutoNumber: typeof isAutoNumber;
declare const cell_checkers_isNumber: typeof isNumber;
declare const cell_checkers_isSingleSelect: typeof isSingleSelect;
declare const cell_checkers_isMultiSelect: typeof isMultiSelect;
declare const cell_checkers_isEmpty: typeof isEmpty;
declare const cell_checkers_isSegmentItem: typeof isSegmentItem;
declare const cell_checkers_isSegments: typeof isSegments;
declare const cell_checkers_isLink: typeof isLink;
declare const cell_checkers_isGroupChat: typeof isGroupChat;
declare const cell_checkers_isGroupChats: typeof isGroupChats;
declare namespace cell_checkers {
  export {
    cell_checkers_isUsers as isUsers,
    cell_checkers_isLocation as isLocation,
    cell_checkers_isAttachment as isAttachment,
    cell_checkers_isAttachments as isAttachments,
    cell_checkers_isTimestamp as isTimestamp,
    cell_checkers_isCheckbox as isCheckbox,
    cell_checkers_isPhone as isPhone,
    cell_checkers_isAutoNumber as isAutoNumber,
    cell_checkers_isNumber as isNumber,
    cell_checkers_isSingleSelect as isSingleSelect,
    cell_checkers_isMultiSelect as isMultiSelect,
    cell_checkers_isEmpty as isEmpty,
    cell_checkers_isSegmentItem as isSegmentItem,
    cell_checkers_isSegments as isSegments,
    cell_checkers_isLink as isLink,
    cell_checkers_isGroupChat as isGroupChat,
    cell_checkers_isGroupChats as isGroupChats,
  };
}

/************************
 * Bitable 高位域（ab）码 *
 ************************/
declare const UnknownScopeCode = 0;
/**
 * 核心域点位
 * 10：未知
 */
declare const CoreScopeCode: {
    readonly Unknown: 10;
    readonly Base: 11;
    readonly Table: 12;
    readonly Field: 13;
    readonly Record: 14;
    readonly View: 15;
    readonly Cell: 16;
};
/**
 * 开放域点位
 * 80-89：FaaS 点位
 * 90-98：Widget 点位
 * 99：未知点位
 */
declare const OpenScopeCode: {
    readonly Action: 89;
    readonly ViewWidget: 96;
    readonly ItemWidget: 97;
    readonly Widget: 98;
    readonly Unknown: 99;
};
type ValueOf<T> = T[keyof T];
type CoreScopeCodeType = ValueOf<typeof CoreScopeCode>;
type OpenScopeCodeType = ValueOf<typeof OpenScopeCode>;
type ErrorScopeCodeType = typeof UnknownScopeCode | CoreScopeCodeType | OpenScopeCodeType;
/************************
 * Bitable 低位域（xyz）码 *
 ************************/
/**
 * Bitable 核心域通用错误
 */
declare const CoreCommonDetailCode: {
    /** 不支持的类型 **/
    readonly UnSupportedType: 991;
    /** 参数错误 */
    readonly ParameterException: 992;
    /** 超出下限 */
    readonly LowerLimitExceeded: 993;
    /** 超出上限 */
    readonly UpperLimitExceeded: 994;
    /** 命名重复 */
    readonly NameRepeated: 995;
    /** 不支持的操作，常见于对旧版本操作 */
    readonly NotSupported: 996;
    /** 权限拒绝 */
    readonly PermissionDenied: 997;
    /** 不存在 */
    readonly NotFound: 998;
    /** 未知错误 */
    readonly Unknown: 999;
};
/**
 * Bitable 开放域通用错误码
 */
declare const OpenCommonDetailCode: {
    /** Host 未注册 API */
    readonly HostNotRegistered: 997;
    /** 不存在 */
    readonly NotFound: 998;
    /** 未知错误 */
    readonly Unknown: 999;
};
/**
 * Bitable 低位（xyz）详情错误码
 */
declare const DetailCode: {
    readonly 11: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
    };
    readonly 12: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
        /** 数据表未加载完毕 */
        readonly NotLoaded: 1;
        readonly LastTableDeleteForbidden: 2;
    };
    readonly 13: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
        /** 字段类型不匹配 */
        readonly NotMatch: 1;
        readonly LocationInfoException: 20;
    };
    readonly 14: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
        /** 单次记录操作超出 5000 条记录上限 */
        readonly SingleRecordOperationLimitExceeded: 1;
    };
    readonly 16: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
    };
    readonly 15: {
        /** 不支持的类型 **/
        readonly UnSupportedType: 991;
        /** 参数错误 */
        readonly ParameterException: 992;
        /** 超出下限 */
        readonly LowerLimitExceeded: 993;
        /** 超出上限 */
        readonly UpperLimitExceeded: 994;
        /** 命名重复 */
        readonly NameRepeated: 995;
        /** 不支持的操作，常见于对旧版本操作 */
        readonly NotSupported: 996;
        /** 权限拒绝 */
        readonly PermissionDenied: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
        readonly LastViewDeleteForbidden: 1;
        readonly FilterInfoError: 2;
    };
    readonly 97: {
        /** Host 未注册 API */
        readonly HostNotRegistered: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
    };
    readonly 89: {
        /** Host 未注册 API */
        readonly HostNotRegistered: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
    };
    readonly 96: {
        /** Host 未注册 API */
        readonly HostNotRegistered: 997;
        /** 不存在 */
        readonly NotFound: 998;
        /** 未知错误 */
        readonly Unknown: 999;
    };
};
/**
 * 自定义错误信息
 */
declare const DetailMessage: {
    [scopeCode in ErrorScopeCodeType]?: {
        [detailCode: number]: string;
    };
};
/** 错误码 */
declare enum OpenErrorCode {
    /** table */
    TableNotLoadedError = 10212001,
    LastTableDeleteForbiddenError = 10212002,
    TableParamExceptionError = 10212992,
    TableNameRepeatedError = 10212995,
    TablePermissionDeniedError = 10212997,
    TableNotFoundError = 10212998,
    TableUnknownError = 10212999,
    /** field */
    FieldTypeUnSupportedError = 10213991,
    FieldNameRepeatedError = 10213995,
    FieldPermissionDeniedError = 10213997,
    FieldNotFoundError = 10213998,
    FieldUnknownError = 10213999,
    /** record */
    SingleRecordOperationLimitExceeded = 10214001,
    RecordPermissionDeniedError = 10214997,
    RecordNotFoundError = 10214998,
    RecordUnknownError = 10214999,
    /** view */
    LastViewDeleteForbiddenError = 10215001,
    ViewTypeUnSupportedError = 10215991,
    ViewNameRepeatedError = 10215995,
    ViewPermissionDeniedError = 10215997,
    ViewNotFoundError = 10215998,
    ViewUnknownError = 10215999,
    /** cell */
    CellPermissionDeniedError = 10216997,
    CellUnknownError = 10216999
}

declare const BitableTransferableErrorSign = "bte";
interface TransferableError {
    e: typeof BitableTransferableErrorSign;
    /**
     * @deprecated
     */
    msg: string;
    code: number;
    message: string;
}

declare class OpenError extends Error {
    readonly code: number;
    constructor(scopeCode: ErrorScopeCodeType, detailCode: number, message?: string);
    toJSON(): TransferableError;
}

/**
 * 表不存在
 */
declare class TableNotFoundError extends OpenError {
    constructor();
}
/**
 * 表未加载完毕
 */
declare class TableNotLoadedError extends OpenError {
    constructor();
}
/**
 * 表相关操作无权限
 */
declare class TablePermissionDeniedError extends OpenError {
    constructor();
}
/**
 * 表名字重复
 */
declare class TableNameRepeatedError extends OpenError {
    constructor();
}
/**
 * 表相关操作参数异常错误
 */
declare class TableParamExceptionError extends OpenError {
    constructor();
}
/**
 * 设置数据表未知错误
 */
declare class SetTableUnknownError extends OpenError {
    constructor();
}
/**
 * 添加数据表未知错误
 */
declare class AddTableUnknownError extends OpenError {
    constructor();
}
/**
 * 删除数据表未知错误
 */
declare class DeleteTableUnknownError extends OpenError {
    constructor();
}
/**
 * 最后一张数据表禁止删除错误
 */
declare class LastTableDeleteForbiddenError extends OpenError {
    constructor();
}

/**
 * 字段不存在
 */
declare class FieldNotFoundError extends OpenError {
    constructor();
}
declare class FieldPermissionDeniedError extends OpenError {
    constructor();
}
declare class SetFieldUnknownError extends OpenError {
    constructor();
}
declare class AddFieldUnknownError extends OpenError {
    constructor();
}
declare class DeleteFieldUnknownError extends OpenError {
    constructor();
}
/**
 * 字段名字重复
 */
declare class FieldNameRepeatedError extends OpenError {
    constructor();
}
/**
 * 不支持的字段类型
 */
declare class UnSupportedFieldTypeError extends OpenError {
    constructor();
}
/**
 * 地理位置字段位置信息（经纬度）错误
 */
declare class LocationInfoError extends OpenError {
    constructor();
}

/** record error */
/**
 * 记录不存在
 */
declare class RecordNotFoundError extends OpenError {
    constructor();
}
/**
 * 记录相关操作无权限
 */
declare class RecordPermissionDeniedError extends OpenError {
    constructor();
}
declare class SetRecordUnknownError extends OpenError {
    constructor();
}
declare class AddRecordUnknownError extends OpenError {
    constructor();
}
declare class DeleteRecordUnknownError extends OpenError {
    constructor();
}
declare class SingleRecordOperationLimitExceededError extends OpenError {
    constructor();
}

/** view error */
/**
 * 视图不存在
 */
declare class ViewNotFoundError extends OpenError {
    constructor();
}
/**
 * 视图相关操作无权限
 */
declare class ViewPermissionDeniedError extends OpenError {
    constructor();
}
/**
 * 视图名字重复
 */
declare class ViewNameRepeatedError extends OpenError {
    constructor();
}
/**
 * 添加视图未知错误
 */
declare class AddViewUnknownError extends OpenError {
    constructor();
}
/**
 * 设置视图未知错误
 */
declare class SetViewUnknownError extends OpenError {
    constructor();
}
/**
 * 删除视图未知错误
 */
declare class DeleteViewUnknownError extends OpenError {
    constructor();
}
/**
 * 不支持的视图类型
 */
declare class UnSupportedViewTypeError extends OpenError {
    constructor();
}
/**
 * 最后一个视图禁止删除
 */
declare class LastViewDeleteForbiddenError extends OpenError {
    constructor();
}
/**
 * 视图筛选参数错误:operator，value和 fieldId不符
 */
declare class FilterInfoError extends OpenError {
    constructor({ fieldId, operator, value }: {
        fieldId: string;
        operator: string;
        value: unknown;
    });
}
declare class ViewMissingMethodError extends OpenError {
    constructor();
}

/**
 * 单元格无相关操作权限
 */
declare class CellPermissionDeniedError extends OpenError {
    constructor();
}
declare class SetCellUnknownError extends OpenError {
    constructor();
}

interface IBridgeMessageModule extends ICommonBridgeMessageModule {
    getPersonalBaseToken: () => Promise<string>;
}
type IBridgeApplicationModule = ICommonBridgeApplicationModule;
type IBridge = IBridgeMessageModule & IBridgeApplicationModule;

declare enum HostContainerSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
interface IUIMessageModule extends ICommonUIMessageModule {
    /** 关闭当前插件的宿主容器 */
    closeHostContainer(): Promise<boolean>;
    /** 设置当前插件宿主容器大小 **/
    setHostContainerSize(size: HostContainerSize): Promise<boolean>;
}
type IUIApplicationModule = ICommonUIApplicationModule;
type IUI = IUIMessageModule & IUIApplicationModule;

declare enum IOpenSegmentType {
    Text = "text",
    Url = "url",
    Mention = "mention"
}
declare enum OpenMentionTypeMap {
    User = 0,
    Doc = 1,
    Folder = 2,
    Sheet = 3,
    SheetDoc = 4,
    Chat = 5,
    Bitable = 8,
    Mindnote = 11,
    Box = 12,
    Slide = 15,
    Wiki = 16,
    Docx = 22,
    Slides = 30,
    Bitable_Ind = 108
}
/** mention 类型，区分不同类型的飞书云文档或者飞书用户 */
type OpenMentionType = keyof typeof OpenMentionTypeMap;
/** 普通文本 */
type IOpenTextSegment = {
    type: IOpenSegmentType.Text;
    text: string;
};
/** 链接 */
type IOpenUrlSegment = {
    type: IOpenSegmentType.Url;
    text: string;
    link: string;
};
/** 多行文本中「飞书云文档链接」或「@飞书成员」的类型 */
interface IOpenMentionSegment {
    type: IOpenSegmentType.Mention;
    mentionType: OpenMentionType;
    text: string;
    token: string;
}
/** 多行文本中「飞书云文档链接」的类型 */
interface IOpenDocumentMentionSegment extends IOpenMentionSegment {
    mentionType: Exclude<OpenMentionType, 'User'>;
    link: string;
}

/**
 * copy from bitable-sdk
 */
declare enum FieldType {
    NotSupport = 0,
    Text = 1,
    Number = 2,
    SingleSelect = 3,
    MultiSelect = 4,
    DateTime = 5,
    Checkbox = 7,
    User = 11,
    Phone = 13,
    Url = 15,
    Attachment = 17,
    SingleLink = 18,
    Lookup = 19,
    Formula = 20,
    DuplexLink = 21,
    Location = 22,
    GroupChat = 23,
    Denied = 403,
    /**
     * 引用类型字段，前后端约定用10xx公共前缀开头
     */
    CreatedTime = 1001,
    ModifiedTime = 1002,
    CreatedUser = 1003,
    ModifiedUser = 1004,
    AutoNumber = 1005,
    Barcode = 99001,
    Progress = 99002,
    Currency = 99003,
    Rating = 99004,
    Email = 99005
}
declare enum ViewType {
    NotSupport = 0,
    Grid = 1,
    Kanban = 2,
    Form = 3,
    Gallery = 4,
    Gantt = 5,
    Hierarchy = 6,
    Calendar = 7,
    WidgetView = 100
}
/** 定位字段输入方式 **/
declare enum ELocationInputType {
    ONLY_MOBILE = "ONLY_MOBILE",
    NOT_LIMIT = "NOT_LIMIT"
}
declare enum NumberFormatter {
    INTEGER = "0",
    DIGITAL_ROUNDED_1 = "0.0",
    DIGITAL_ROUNDED_2 = "0.00",
    DIGITAL_ROUNDED_3 = "0.000",
    DIGITAL_ROUNDED_4 = "0.0000",
    DIGITAL_THOUSANDS = "1,000",
    DIGITAL_THOUSANDS_DECIMALS = "1,000.00",
    PERCENTAGE_ROUNDED = "0%",
    PERCENTAGE = "0.00%"
}
declare enum DateFormatter {
    DATE_YMD_WITH_SLASH = "yyyy/MM/dd",
    DATE_TIME = "yyyy/MM/dd HH:mm",
    DATE_TIME_WITH_HYPHEN = "yyyy-MM-dd HH:mm",
    DATE_YMD_WITH_HYPHEN = "yyyy-MM-dd",
    DATE_MD_WITH_HYPHEN = "MM-dd",
    DATE_MMDD_WITH_SLASH = "MM/dd/yyyy",
    DATE_DDMM_WITH_SLASH = "dd/MM/yyyy"
}
declare enum CurrencyCode {
    CNY = "CNY",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    AED = "AED",
    AUD = "AUD",
    BRL = "BRL",
    CAD = "CAD",
    CHF = "CHF",
    HKD = "HKD",
    INR = "INR",
    IDR = "IDR",
    JPY = "JPY",
    KRW = "KRW",
    MOP = "MOP",
    MXN = "MXN",
    MYR = "MYR",
    PHP = "PHP",
    PLN = "PLN",
    RUB = "RUB",
    SGD = "SGD",
    THB = "THB",
    TRY = "TRY",
    TWD = "TWD",
    VND = "VND"
}
declare enum RatingIconType {
    STAR = "star",
    HEART = "heart",
    THUMBSUP = "thumbsup",
    FIRE = "fire",
    SMILE = "smile",
    LIGHTNING = "lightning",
    FLOWER = "flower",
    NUMBER = "number"
}

type ITextFieldProperty = null;
interface ITextFieldMeta extends IBaseFieldMeta {
    type: FieldType.Text;
    property: ITextFieldProperty;
}
type IFilterTextValue = string | null;
interface IFilterTextCondition extends IFilterBaseCondition {
    value: IFilterTextValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Text;
}

type IBaseFieldDescription = {
    content: null | (IOpenTextSegment | IOpenUrlSegment | IOpenDocumentMentionSegment)[];
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc?: boolean;
};

interface IBaseFieldMeta {
    id: string;
    type: FieldType;
    name: string;
    isPrimary: boolean;
    description: IBaseFieldDescription;
}

type IAutoNumberFieldProperty = null;
interface IAutoNumberFieldMeta extends IBaseFieldMeta {
    type: FieldType.AutoNumber;
    property: IAutoNumberFieldProperty;
}
type IFilterAutoNumberValue = number | null;
interface IFilterAutoNumberCondition extends IFilterBaseCondition {
    value: IFilterAutoNumberValue;
    operator: FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.AutoNumber;
}

interface IBarCodeFieldProperty {
    onlyMobile: boolean;
}
interface IBarcodeFieldMeta extends IBaseFieldMeta {
    type: FieldType.Barcode;
    property: IBarCodeFieldProperty;
}
interface IFilterBarcodeCondition extends IFilterBaseCondition {
    value: string | null;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Barcode;
}

interface IButtonFieldProperty {
    color: number;
    title: string;
}
interface IButtonUserFieldMeta extends IBaseFieldMeta {
    type: FieldType;
    property: IButtonFieldProperty;
}

type ICheckboxFieldProperty = null;
interface ICheckboxFieldMeta extends IBaseFieldMeta {
    type: FieldType.Checkbox;
    property: ICheckboxFieldProperty;
}
type IFilterCheckboxValue = boolean | null;
interface IFilterCheckboxCondition extends IFilterBaseCondition {
    value: IFilterCheckboxValue;
    operator: FilterOperator.Is;
    fieldType?: FieldType.Checkbox;
}

interface ICommonLinkFieldProperty {
    tableId: string;
    multiple: boolean;
}

type ISingleLinkFieldProperty = ICommonLinkFieldProperty;
interface ISingleLinkFieldMeta extends IBaseFieldMeta {
    type: FieldType.SingleLink;
    property: ISingleLinkFieldProperty;
}
type IFilterLinkValue = string[] | null;
interface IFilterSingleLinkCondition extends IFilterBaseCondition {
    value: IFilterLinkValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.SingleLink;
}

type IDuplexLinkFieldProperty = ICommonLinkFieldProperty;
interface IDuplexLinkFieldMeta extends IBaseFieldMeta {
    type: FieldType.DuplexLink;
    property: IDuplexLinkFieldProperty;
}
interface IFilterDuplexLinkCondition extends IFilterBaseCondition {
    value: string[] | null;
    operator: BaseFilterOperator;
    fieldType?: FieldType.DuplexLink;
}

declare enum SelectOptionsType {
    STATIC = 0,
    DYNAMIC = 1
}
interface ISelectFieldOption {
    id: string;
    name: string;
    color: number;
}
interface ICommonSelectFieldProperty {
    options: ISelectFieldOption[];
    optionsType: SelectOptionsType;
}
interface ISingleSelectFieldMeta extends IBaseFieldMeta {
    type: FieldType.SingleSelect;
    property: ICommonSelectFieldProperty;
}
interface IMultiSelectFieldMeta extends IBaseFieldMeta {
    type: FieldType.MultiSelect;
    property: ICommonSelectFieldProperty;
}
type IFilterSelectValue = string[] | null | string;
interface IFilterMultiSelectCondition extends IFilterBaseCondition {
    value: IFilterSelectValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.MultiSelect;
}
type IFilterSingleSelectCondition = ({
    value: string;
    operator: FilterOperator.Is | FilterOperator.IsNot;
    fieldType: FieldType.SingleSelect;
} | {
    value: string[] | string;
    operator: FilterOperator.Contains | FilterOperator.DoesNotContain | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.SingleSelect;
}) & IFilterBaseCondition;

interface ICommonTimeFieldProperty {
    dateFormat: DateFormatter;
    displayTimeZone: boolean;
}

interface IDateTimeFieldProperty extends ICommonTimeFieldProperty {
    autoFill: boolean;
}
interface IDateTimeFieldMeta extends IBaseFieldMeta {
    type: FieldType.DateTime;
    property: IDateTimeFieldProperty;
}
declare enum FilterDuration {
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
type IFilterDateTimeValue = number | FilterDuration | null;
interface IFilterDateTimeCondition extends IFilterBaseCondition {
    value: IFilterDateTimeValue;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.DateTime;
}

interface ICurrencyFieldProperty {
    decimalDigits: number;
    currencyCode: CurrencyCode;
}
interface ICurrencyFieldMeta extends IBaseFieldMeta {
    type: FieldType.Currency;
    property: ICurrencyFieldProperty;
}
type IFilterCurrencyValue = number | null;
interface IFilterCurrencyCondition extends IFilterBaseCondition {
    value: IFilterCurrencyValue;
    operator: FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.Currency;
}

type IFormulaFieldProperty = null;
interface IFormulaFieldMeta extends IBaseFieldMeta {
    type: FieldType.Formula;
    property: IFormulaFieldProperty;
}
interface IFilterFormulaCondition extends IFilterBaseCondition {
    value: IFilterAll;
    operator: FilterOperator;
    fieldType?: FieldType.Formula;
}

interface IGroupChatFieldProperty {
    multiple: boolean;
}
interface IGroupChatFieldMeta extends IBaseFieldMeta {
    type: FieldType.GroupChat;
    property: IGroupChatFieldProperty;
}
/** 使用group的id数组作为过滤条件 */
type IFilterGroupValue = string[] | null;
interface IFilterGroupChatCondition extends IFilterBaseCondition {
    value: IFilterGroupValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.GroupChat;
}

interface ILocationFieldProperty {
    inputType: ELocationInputType;
}
interface ILocationFieldMeta extends IBaseFieldMeta {
    type: FieldType.Location;
    property: ILocationFieldProperty;
}
type IFilterLocationValue = string | null;
interface IFilterLocationCondition extends IFilterBaseCondition {
    value: IFilterLocationValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Location;
}

interface ILookupFieldProperty {
    /**引用字段 id */
    refFieldId: string;
    /**引用字段所在数据表 id */
    refTableId: string;
}
interface ILookupFieldMeta extends IBaseFieldMeta {
    type: FieldType.Lookup;
    property: ILookupFieldProperty;
}
interface IFilterLookupCondition extends IFilterBaseCondition {
    value: IFilterAll;
    operator: FilterOperator;
    fieldType?: FieldType.Lookup;
}

type ICreatedTimeFieldProperty = ICommonTimeFieldProperty;
interface ICreatedTimeFieldMeta extends IBaseFieldMeta {
    type: FieldType.CreatedTime;
    property: ICreatedTimeFieldProperty;
}
type IFilterCreatedTimeValue = number | FilterDuration | null;
interface IFilterCreatedTimeCondition extends IFilterBaseCondition {
    value: IFilterCreatedTimeValue;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.CreatedTime;
}

type IModifiedTimeFieldProperty = ICommonTimeFieldProperty;
interface IModifiedTimeFieldMeta extends IBaseFieldMeta {
    type: FieldType.ModifiedTime;
    property: IModifiedTimeFieldProperty;
}
type IFilterModifiedTimeValue = number | FilterDuration | null;
interface IFilterModifiedTimeCondition extends IFilterBaseCondition {
    value: IFilterModifiedTimeValue;
    /** IsGreater:晚于; isLess:早于 */
    operator: FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.ModifiedTime;
}

type ICreatedUserFieldProperty = null;
interface ICreatedUserFieldMeta extends IBaseFieldMeta {
    type: FieldType.CreatedUser;
    property: ICreatedUserFieldProperty;
}
/** 使用 userId */
type IFilterCreatedUserValue = string[] | null;
interface IFilterCreatedUserCondition extends IFilterBaseCondition {
    value: IFilterCreatedUserValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.CreatedUser;
}

type IModifiedUserFieldProperty = null;
interface IModifiedUserFieldMeta extends IBaseFieldMeta {
    type: FieldType.ModifiedUser;
    property: IModifiedUserFieldProperty;
}
/** 使用 userId */
type IFilterModifiedUserValue = string[] | null;
interface IFilterModifiedUserCondition extends IFilterBaseCondition {
    value: IFilterModifiedUserValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.ModifiedUser;
}

interface INumberFieldProperty {
    formatter: NumberFormatter;
}
interface INumberFieldMeta extends IBaseFieldMeta {
    type: FieldType.Number;
    property: INumberFieldProperty;
}
type IFilterNumberValue = number | null;
interface IFilterNumberCondition extends IFilterBaseCondition {
    value: IFilterNumberValue;
    operator: FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.Number;
}

type IPhoneFieldProperty = null;
interface IPhoneFieldMeta extends IBaseFieldMeta {
    type: FieldType.Phone;
    property: IPhoneFieldProperty;
}
type IFilterPhoneValue = string | null;
interface IFilterPhoneCondition extends IFilterBaseCondition {
    value: IFilterPhoneValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Phone;
}

type IProgressFieldProperty = null;
interface IProgressFieldMeta extends IBaseFieldMeta {
    type: FieldType.Progress;
    property: IProgressFieldProperty;
}
type IFilterProgressValue = number | null;
interface IFilterProgressCondition extends IFilterBaseCondition {
    value: IFilterProgressValue;
    operator: FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.Progress;
}

type IRatingMinVal = 0 | 1;
interface IRatingFieldProperty {
    min: IRatingMinVal;
    max: number;
    rating: {
        icon: RatingIconType;
    };
}
interface IRatingFieldMeta extends IBaseFieldMeta {
    type: FieldType.Rating;
    property: IRatingFieldProperty;
}
type IFilterRatingValue = number | null;
interface IFilterRatingCondition extends IFilterBaseCondition {
    value: IFilterRatingValue;
    operator: FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
    fieldType?: FieldType.Rating;
}

type IUrlFieldProperty = null;
interface IUrlFieldMeta extends IBaseFieldMeta {
    type: FieldType.Url;
    property: IUrlFieldProperty;
}
type IFilterUrlValue = string | null;
interface IFilterUrlCondition extends IFilterBaseCondition {
    value: IFilterUrlValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Url;
}

interface IUserFieldProperty {
    multiple: boolean;
}
interface IUserFieldMeta extends IBaseFieldMeta {
    type: FieldType.User;
    property: IUserFieldProperty;
}
type IFilterUserValue = string[] | null;
interface IFilterUserCondition extends IFilterBaseCondition {
    value: IFilterUserValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.User;
}

type IEmailFieldProperty = null;
interface IEmailFieldMeta extends IBaseFieldMeta {
    type: FieldType.Email;
    property: IEmailFieldProperty;
}
type IFilterEmailValue = string | null;
interface IFilterEmailCondition extends IFilterBaseCondition {
    value: IFilterEmailValue;
    operator: BaseFilterOperator;
    fieldType?: FieldType.Email;
}

type IFilterAll = IFilterTextValue | IFilterUrlValue | IFilterCheckboxValue | IFilterUserValue | IFilterModifiedUserValue | IFilterCreatedUserValue | IFilterDateTimeValue | IFilterCreatedTimeValue | IFilterModifiedTimeValue | IFilterLinkValue | IFilterSelectValue | IFilterAutoNumberValue | IFilterPhoneValue | IFilterLocationValue | IFilterGroupValue | IFilterNumberValue | IFilterEmailValue | null;
type FilterInfoCondition = IFilterAttachmentCondition | IFilterCheckboxCondition | IFilterAutoNumberCondition | IFilterDateTimeCondition | IFilterCreatedTimeCondition | IFilterModifiedTimeCondition | IFilterUserCondition | IFilterCreatedUserCondition | IFilterModifiedUserCondition | IFilterDuplexLinkCondition | IFilterSingleLinkCondition | IFilterFormulaCondition | IFilterGroupChatCondition | IFilterLocationCondition | IFilterLookupCondition | IFilterMultiSelectCondition | IFilterSingleSelectCondition | IFilterPhoneCondition | IFilterTextCondition | IFilterNumberCondition | IFilterUrlCondition | IFilterCurrencyCondition | IFilterBarcodeCondition | IFilterProgressCondition | IFilterEmailCondition | IFilterRatingCondition;
declare enum FilterOperator {
    /** 等于 */
    Is = "is",
    /** 不等于 */
    IsNot = "isNot",
    /** 包含 */
    Contains = "contains",
    /** 不包含 */
    DoesNotContain = "doesNotContain",
    /** 为空 */
    IsEmpty = "isEmpty",
    /** 不为空 */
    IsNotEmpty = "isNotEmpty",
    /** 大于 */
    IsGreater = "isGreater",
    /** 大于或等于 */
    IsGreaterEqual = "isGreaterEqual",
    /** 小于 */
    IsLess = "isLess",
    /** 小于或等于 */
    IsLessEqual = "isLessEqual"
}
declare enum FilterConjunction {
    And = "and",
    Or = "or"
}
type BaseFilterOperator = FilterOperator.Is | FilterOperator.IsNot | FilterOperator.Contains | FilterOperator.DoesNotContain | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
interface IFilterBaseCondition {
    fieldId: string;
    conditionId?: string;
}
interface IFilterInfo {
    conjunction: FilterConjunction;
    conditions: FilterInfoCondition[];
}
declare enum SetFilterType {
    AddCondition = "AddCondition",
    DeleteCondition = "DeleteCondition",
    UpdateCondition = "UpdateCondition",
    SetConjunction = "SetConjunction"
}
type IAddFilterConditionParams = FilterInfoCondition | FilterInfoCondition[];
type IDeleteFilterConditionParams = string;
type IUpdateFilterConditionParams = FilterInfoCondition | FilterInfoCondition[];
type ISetFilterConjunctionParams = FilterConjunction;
type ISetFilterParams = IAddFilterConditionParams | IDeleteFilterConditionParams | IUpdateFilterConditionParams | ISetFilterConjunctionParams;
interface IViewFilterMessage {
    getFilterInfo(): Promise<IFilterInfo | null>;
    setFilter(type: SetFilterType, params: ISetFilterParams): Promise<boolean>;
}
interface IViewFilterApplication {
    addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
    deleteFilterCondition: (conditionId: string) => Promise<boolean>;
    updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
    setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
}

interface IAttachmentFieldProperty {
    onlyMobile: boolean;
}
interface IAttachmentFieldMeta extends IBaseFieldMeta {
    type: FieldType.Attachment;
    property: IAttachmentFieldProperty;
}
interface IFilterAttachmentCondition extends IFilterBaseCondition {
    fieldType?: FieldType.Attachment;
    value?: null;
    operator: FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;
}

type IFieldMeta = IAttachmentFieldMeta | IAutoNumberFieldMeta | IBarcodeFieldMeta | IButtonUserFieldMeta | ICheckboxFieldMeta | ISingleLinkFieldMeta | ISingleSelectFieldMeta | IMultiSelectFieldMeta | IDuplexLinkFieldMeta | IDateTimeFieldMeta | ICurrencyFieldMeta | IFormulaFieldMeta | IGroupChatFieldMeta | ILocationFieldMeta | ILookupFieldMeta | ICreatedTimeFieldMeta | IModifiedTimeFieldMeta | ICreatedUserFieldMeta | IModifiedUserFieldMeta | INumberFieldMeta | IPhoneFieldMeta | IProgressFieldMeta | IRatingFieldMeta | ITextFieldMeta | IUrlFieldMeta | IUserFieldMeta | IEmailFieldMeta;
type RecordId = string;

interface ISortInfo {
    fieldId: string;
    /** false: 正序 A -> Z;  true: 倒序 Z -> A */
    desc: boolean;
}
interface IViewSortMessage {
    getSortInfo(): Promise<ISortInfo[]>;
    setSortInfo(sortInfo: ISortInfo[]): Promise<boolean>;
    setAutoSort(param: boolean): Promise<boolean>;
}
interface IViewSortApplication {
    addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
    deleteSort: (param: ISortInfo | string) => Promise<boolean>;
    updateSort: (param: ISortInfo) => Promise<boolean>;
}

type IGroupInfo = ISortInfo;
interface IViewGroupMessage {
    getGroupInfo(): Promise<IGroupInfo[]>;
    setGroupInfo(groupInfo: IGroupInfo[]): Promise<boolean>;
}
interface IViewGroupApplication {
    addGroup: (param: IGroupInfo | IGroupInfo[]) => Promise<boolean>;
    deleteGroup: (param: string | IGroupInfo) => Promise<boolean>;
    updateGroup: (param: IGroupInfo) => Promise<boolean>;
}

type IBaseViewProperty = object;
interface IBaseViewMeta {
    id: string;
    name: string;
    type: ViewType;
    property: IBaseViewProperty;
}
/** 表格视图配置 */
interface IGridViewProperty extends IBaseViewProperty {
    hierarchyConfig: {
        fieldId: string | undefined;
    };
    filterInfo: IFilterInfo | null;
    sortInfo: ISortInfo[];
    groupInfo: IGroupInfo[];
}
/** 看板视图层级配置 */
interface IKanbanViewProperty extends IBaseViewProperty {
    filterInfo: IFilterInfo | null;
    sortInfo: ISortInfo[];
}
/** 表单视图层级配置 */
type IFormViewProperty = IBaseViewProperty;
/** 画册视图层级配置 */
interface IGalleryViewProperty extends IBaseViewProperty {
    sortInfo: ISortInfo[];
    filterInfo: IFilterInfo | null;
}
/** 甘特视图层级配置 */
interface IGanttViewProperty extends IBaseViewProperty {
    filterInfo: IFilterInfo | null;
    sortInfo: ISortInfo[];
    groupInfo: IGroupInfo[];
}
/** 层级视图层级配置 */
type IHierarchyViewProperty = IBaseViewProperty;
/** 日历视图层级配置 */
interface ICalendarViewProperty extends IBaseViewProperty {
    filterInfo: IFilterInfo | null;
}
/** 插件视图层级配置 */
type IWidgetViewProperty = IBaseViewProperty;
interface IGridViewMeta extends IBaseViewMeta {
    property: IGridViewProperty;
}
interface IKanbanViewMeta extends IBaseViewMeta {
    property: IKanbanViewProperty;
}
interface IFormViewMeta extends IBaseViewMeta {
    property: IFormViewProperty;
}
interface IGalleryViewMeta extends IBaseViewMeta {
    property: IGalleryViewProperty;
}
interface IGanttViewMeta extends IBaseViewMeta {
    property: IGanttViewProperty;
}
interface IHierarchyViewMeta extends IBaseViewMeta {
    property: IHierarchyViewProperty;
}
interface ICalendarViewMeta extends IBaseViewMeta {
    property: ICalendarViewProperty;
}
interface IWidgetViewMeta extends IBaseViewMeta {
    property: IWidgetViewProperty;
}
type IViewMeta = IGridViewMeta | IKanbanViewMeta | IFormViewMeta | IGalleryViewMeta | IGanttViewMeta | IHierarchyViewMeta | ICalendarViewMeta | IWidgetViewMeta;

interface ICalendarViewMessageModule extends IViewMessageModule, IViewFilterMessage {
}
interface ICalendarViewApplicationModule extends IViewApplicationModule, IViewFilterApplication {
}
type ICalendarView = ICalendarViewMessageModule & ICalendarViewApplicationModule;

interface IGalleryViewMessageModule extends IViewMessageModule, IViewFilterMessage, IViewSortMessage {
}
interface IGalleryViewApplicationModule extends IViewApplicationModule, IViewFilterApplication, IViewSortApplication {
}
type IGalleryView = IGalleryViewMessageModule & IGalleryViewApplicationModule;

interface IGridViewMessageModule extends IViewMessageModule, IViewSortMessage, IViewGroupMessage, IViewFilterMessage {
    /** 获取指定记录的子记录 id 列表, undefined 则表示该记录无子记录 */
    getChildRecordIdList(parentRecordId: string): Promise<RecordId[] | undefined>;
    getFieldWidth(fieldId: string): Promise<number>;
    setFieldWidth(fieldId: string, width: number): Promise<boolean>;
    setRowHeight(rowHeight: RowHeightLevel): Promise<boolean>;
}
interface IGridViewApplicationModule extends IViewApplicationModule, IViewSortApplication, IViewGroupApplication, IViewFilterApplication {
    hideField: (fieldId: string | string[]) => Promise<boolean>;
    showField: (fieldId: string | string[]) => Promise<boolean>;
}
type IGridView = IGridViewMessageModule & IGridViewApplicationModule;

interface IKanbanViewMessageModule extends IViewMessageModule, IViewSortMessage, IViewFilterMessage {
}
interface IKanbanViewApplicationModule extends IViewApplicationModule, IViewSortApplication, IViewFilterApplication {
}
type IKanbanView = IKanbanViewApplicationModule & IKanbanViewMessageModule;

interface IFormViewMessageModule extends IViewMessageModule {
}
interface IFormViewApplicationModule extends IViewApplicationModule {
}
type IFormView = IFormViewMessageModule & IFormViewApplicationModule;

interface IGanttViewMessageModule extends IViewMessageModule, IViewGroupMessage, IViewFilterMessage, IViewSortMessage {
}
interface IGanttViewApplicationModule extends IViewApplicationModule, IViewGroupApplication, IViewFilterApplication, IViewSortApplication {
}
type IGanttView = IGanttViewMessageModule & IGanttViewApplicationModule;

declare enum RowHeightLevel {
    Short = 1,
    Medium = 2,
    Tall = 3,
    ExtraTall = 4
}
declare enum SharingStatus {
    Enabled = "Enabled",
    Disabled = "Disabled"
}
interface IViewMessageModule {
    /** 获取字段名 */
    getName(): Promise<string>;
    /** 获取视图类型 */
    getType(): Promise<ViewType>;
    /** 获取视图元数据 */
    getMeta(): Promise<IViewMeta>;
    /** 获取字段列表（有序） */
    getFieldMetaList(): Promise<IFieldMeta[]>;
    /** 获取记录 ID 列表 */
    getVisibleRecordIdList(filterInfo?: IFilterInfo, sortInfo?: ISortInfo[]): Promise<(string | undefined)[]>;
    /** 获取可见字段 ID 列表 */
    getVisibleFieldIdList(): Promise<string[]>;
    applySetting(): Promise<void>;
    setFieldVisibility(fieldId: string | string[], hidden: boolean): Promise<boolean>;
    toggleViewSharing(flag: boolean): Promise<boolean>;
}
interface IViewApplicationModule {
    id: string;
    tableId: string;
    hideField: (fieldId: string | string[]) => Promise<boolean>;
    showField: (fieldId: string | string[]) => Promise<boolean>;
    enableSharing: () => Promise<boolean>;
    disableSharing: () => Promise<boolean>;
    getShareLink(): Promise<string>;
    getSharingStatus(): Promise<SharingStatus>;
}

declare function isGridView(view: unknown): view is IGridView;
declare function isCalendarView(view: unknown): view is ICalendarView;
declare function isKabanView(view: unknown): view is IKanbanView;
declare function isGalleryView(view: unknown): view is IGalleryView;
declare function isGanttView(view: unknown): view is IGanttView;
declare function isFormView(view: unknown): view is IFormView;

declare const view_checker_isCalendarView: typeof isCalendarView;
declare const view_checker_isFormView: typeof isFormView;
declare const view_checker_isGalleryView: typeof isGalleryView;
declare const view_checker_isGanttView: typeof isGanttView;
declare const view_checker_isGridView: typeof isGridView;
declare const view_checker_isKabanView: typeof isKabanView;
declare namespace view_checker {
  export {
    view_checker_isCalendarView as isCalendarView,
    view_checker_isFormView as isFormView,
    view_checker_isGalleryView as isGalleryView,
    view_checker_isGanttView as isGanttView,
    view_checker_isGridView as isGridView,
    view_checker_isKabanView as isKabanView,
  };
}

interface MessageType {
    info: TypeOpen;
    success: TypeOpen;
    error: TypeOpen;
    warning: TypeOpen;
    loading: TypeOpen;
}
interface BaseFormItemOption {
    label: string;
    [key: string]: unknown;
}
interface BaseFormItem {
    type: string;
    id: string;
    option: BaseFormItemOption;
}
type TableSelectFormItemOption = BaseFormItemOption & Omit<SelectProps, 'mode'>;
interface TableSelectFormItem extends BaseFormItem {
    type: 'table';
    option: TableSelectFormItemOption;
}
interface DependencyTableFormItemOption extends BaseFormItemOption {
    sourceTable: string;
}
interface FieldSelectFormItemFilterOption extends DependencyTableFormItemOption {
    filterByTypes?: any[];
    filter?: (fieldMeta: any) => boolean;
    mode?: 'multiple';
    multiple?: boolean;
}
type FieldSelectFormItemOption = FieldSelectFormItemFilterOption & Omit<SelectProps, 'options'>;
interface FieldSelectFormItem extends BaseFormItem {
    type: 'field';
    option: FieldSelectFormItemOption;
}
interface ViewSelectFormItemFilterOption extends DependencyTableFormItemOption {
    filterByTypes?: any[];
    filter?: (viewMeta: any) => boolean;
    mode?: 'multiple';
    multiple?: boolean;
}
type ViewSelectFormItemOption = ViewSelectFormItemFilterOption & Omit<SelectProps, 'options'>;
interface ViewSelectFormItem extends BaseFormItem {
    type: 'view';
    option: ViewSelectFormItemOption;
}
type InputFormItemOption = BaseFormItemOption & InputProps;
interface InputFormItem extends BaseFormItem {
    type: 'input';
    option: InputFormItemOption;
}
type InputNumberFormItemOption = BaseFormItemOption & InputNumberProps;
interface InputNumberFormItem extends BaseFormItem {
    type: 'inputNumber';
    option: InputNumberFormItemOption;
}
interface TextAreaProps {
    placeholder?: string;
    defaultValue?: string;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    allowClear?: boolean | {
        clearIcon?: React.ReactNode;
    };
    maxLength?: number;
}
type TextAreaFormItemOption = BaseFormItemOption & TextAreaProps;
interface TextAreaFormItem extends BaseFormItem {
    type: 'textArea';
    option: TextAreaFormItemOption;
}
type CheckboxGroupFormItemOption = BaseFormItemOption & CheckboxGroupProps;
interface CheckboxGroupFormItem extends BaseFormItem {
    type: 'checkboxGroup';
    option: CheckboxGroupFormItemOption;
}
type SelectFormItemOption = BaseFormItemOption & SelectProps & {
    multiple?: boolean;
    tags?: boolean;
};
interface SelectFormItem extends BaseFormItem {
    type: 'select';
    option: SelectFormItemOption;
}
type RadioFormItemOption = BaseFormItemOption & RadioGroupProps;
interface RadioFormItem extends BaseFormItem {
    type: 'radio';
    option: RadioFormItemOption;
}
type FormItem = TableSelectFormItem | FieldSelectFormItem | ViewSelectFormItem | InputFormItem | InputNumberFormItem | TextAreaFormItem | CheckboxGroupFormItem | SelectFormItem | RadioFormItem;
interface FormInstance {
    tableSelect: (id: string, option: TableSelectFormItemOption) => TableSelectFormItem;
    fieldSelect: (id: string, option: FieldSelectFormItemOption) => FieldSelectFormItem;
    viewSelect: (id: string, option: ViewSelectFormItemOption) => ViewSelectFormItem;
    input: (id: string, option: InputFormItemOption) => InputFormItem;
    inputNumber: (id: string, option: InputNumberFormItemOption) => InputNumberFormItem;
    textArea: (id: string, option: TextAreaFormItemOption) => TextAreaFormItem;
    checkboxGroup: (id: string, option: CheckboxGroupFormItemOption) => CheckboxGroupFormItem;
    select: (id: string, option: SelectFormItemOption) => SelectFormItem;
    radio: (id: string, option: RadioFormItemOption) => RadioFormItem;
}

interface Translation {
    i18n: {
        language: string;
    };
}
interface UIBuilderOptions {
    bitable: any;
    callback: (uiBuilder: UIBuilder, translation: any) => void;
    translation: Translation;
}
declare class UIBuilder {
    static instance: UIBuilder;
    /**
     * @deprecated `UIBuilder.getInstance` will be remove, use `new UIBuilder` instead!
     */
    static getInstance(rootSelector: string, options: UIBuilderOptions): UIBuilder;
    get message(): MessageType;
    protected loadingRoot?: Root;
    protected rootElement?: Element;
    protected app?: Element;
    protected appElement: Root;
    protected container?: Element;
    private formItemMap;
    options: UIBuilderOptions;
    constructor(rootElement: Element, options: UIBuilderOptions);
    init(runUIBuilder: (uiBuilder: UIBuilder, translation: any) => void): Promise<void>;
    /**
     * @deprecated use `uiBuilder.unmount` instead!
     */
    umount: () => void;
    unmount: () => void;
    addComponent(component: ReactElement): void;
    clear: () => void;
    showLoading(message: string): void;
    hideLoading(): void;
    text(source: string): void;
    markdown(source: string): void;
    private clearAfter;
    form(formBuilder: (form: FormInstance) => {
        formItems: FormItem[];
        buttons: (string | {
            key: any;
            label: string;
        })[];
    }, callback: (args: {
        key: string;
        values: {
            [key: string]: unknown;
        };
    }) => void): void;
    getLocale(locale: string): Locale$1;
    buttonsSync(label: string, buttons: (string | {
        key: any;
        label: string;
    })[]): Promise<unknown>;
    buttons(label: string, buttons: (string | {
        key: any;
        label: string;
    })[], callback: (key: any) => void): void;
    reload(): void;
}

declare class BitableApp {
    /** bitable base */
    readonly base: IBase;
    /** open platform api */
    readonly bridge: IBridge;
    /** ui */
    readonly ui: IUI;
}

declare const bitable: BitableApp;

export { AddFieldUnknownError, AddRecordUnknownError, AddTableUnknownError, AddViewUnknownError, ApiModule, AttachmentTransformVal, AutonumberTransformVal, BarcodeTransformVal, BaseContext, BaseFilterOperator$1 as BaseFilterOperator, BaseOperation, BasePermissionParams, BitableTransferableErrorSign, BlockId, BridgeEvent, BridgeModuleContext, CellOperation, CellPermissionDeniedError, CellPermissionParams, CheckBoxTransformVal, CoreCommonDetailCode, CoreScopeCode, CoreScopeCodeType, CreateTimeTransformVal, CreateUserTransformVal, CurrencyCode$1 as CurrencyCode, CurrencyFormatter, CurrencyTransformVal, DateFormatter$1 as DateFormatter, DateTransformVal, DeleteFieldUnknownError, DeleteRecordUnknownError, DeleteTableUnknownError, DeleteViewUnknownError, DetailCode, DetailMessage, DuplexLinkTransformVal, ELocationInputType$1 as ELocationInputType, Env, ErrorScopeCodeType, FieldContext, FieldId, FieldNameRepeatedError, FieldNotFoundError, FieldOperation, FieldPermissionDeniedError, FieldPermissionParams, FieldType$1 as FieldType, FilterConjunction$1 as FilterConjunction, FilterDuration$1 as FilterDuration, FilterInfoCondition$1 as FilterInfoCondition, FilterInfoError, FilterOperator$1 as FilterOperator, Formula, FormulaTransformVal, GetBitableUrlOptions, GetPermissionParams, GroupFieldTransformVal, HostContainerSize, HostMeta, IAddFieldConfig, IAddFilterConditionParams$1 as IAddFilterConditionParams, IAddTableConfig, IAddTableResult, IAddViewConfig, IAddViewResult, IAttachmentField, IAttachmentFieldConfig, IAttachmentFieldMeta$1 as IAttachmentFieldMeta, IAttachmentFieldProperty$1 as IAttachmentFieldProperty, IAutoNumberFieldConfig, IAutoNumberFieldMeta$1 as IAutoNumberFieldMeta, IAutoNumberFieldProperty$1 as IAutoNumberFieldProperty, IAutonumberField, IBarCodeFieldConfig, IBarCodeFieldProperty$1 as IBarCodeFieldProperty, IBarcodeField, IBarcodeFieldMeta$1 as IBarcodeFieldMeta, IBase, IBaseApplicationModule, IBaseFieldDescription$1 as IBaseFieldDescription, IBaseMessageModule, IBaseViewMeta$1 as IBaseViewMeta, IBaseViewProperty$1 as IBaseViewProperty, IBridge, IBridgeApplicationModule, IBridgeMessageModule, IButtonFieldConfig, IButtonFieldProperty$1 as IButtonFieldProperty, IButtonUserFieldMeta$1 as IButtonUserFieldMeta, ICalendarView$1 as ICalendarView, ICalendarViewApplicationModule$1 as ICalendarViewApplicationModule, ICalendarViewMessageModule$1 as ICalendarViewMessageModule, ICalendarViewMeta$1 as ICalendarViewMeta, ICalendarViewProperty$1 as ICalendarViewProperty, ICell, ICellTransformVal, ICheckBoxField, ICheckboxFieldConfig, ICheckboxFieldMeta$1 as ICheckboxFieldMeta, ICheckboxFieldProperty$1 as ICheckboxFieldProperty, ICommonBridge, ICommonBridgeApplicationModule, ICommonBridgeMessageModule, ICommonLinkFieldProperty$1 as ICommonLinkFieldProperty, ICommonSelectFieldProperty$1 as ICommonSelectFieldProperty, ICommonTimeFieldProperty$1 as ICommonTimeFieldProperty, ICommonUI, ICommonUIApplicationModule, ICommonUIMessageModule, ICreateTimeField, ICreateUserField, ICreatedTimeFieldConfig, ICreatedTimeFieldMeta$1 as ICreatedTimeFieldMeta, ICreatedTimeFieldProperty$1 as ICreatedTimeFieldProperty, ICreatedUserFieldConfig, ICreatedUserFieldMeta$1 as ICreatedUserFieldMeta, ICreatedUserFieldProperty$1 as ICreatedUserFieldProperty, ICurrencyField, ICurrencyFieldConfig, ICurrencyFieldMeta$1 as ICurrencyFieldMeta, ICurrencyFieldProperty$1 as ICurrencyFieldProperty, IDateTimeField, IDateTimeFieldConfig, IDateTimeFieldMeta$1 as IDateTimeFieldMeta, IDateTimeFieldProperty$1 as IDateTimeFieldProperty, IDeleteFilterConditionParams$1 as IDeleteFilterConditionParams, IDocumentMentionConfig, IDuplexLinkField, IDuplexLinkFieldConfig, IDuplexLinkFieldMeta$1 as IDuplexLinkFieldMeta, IDuplexLinkFieldProperty$1 as IDuplexLinkFieldProperty, IEmailField, IEmailFieldConfig, IEmailFieldMeta$1 as IEmailFieldMeta, IEmailFieldProperty$1 as IEmailFieldProperty, IEventCbCtx, IField, IFieldApplicationModule, IFieldConfig, IFieldDescriptionContent, IFieldMessageModule, IFieldMeta$1 as IFieldMeta, IFieldProperty, IFieldRes, IFilterAll$1 as IFilterAll, IFilterAttachmentCondition$1 as IFilterAttachmentCondition, IFilterAutoNumberCondition$1 as IFilterAutoNumberCondition, IFilterAutoNumberValue$1 as IFilterAutoNumberValue, IFilterBarcodeCondition$1 as IFilterBarcodeCondition, IFilterBaseCondition$1 as IFilterBaseCondition, IFilterCheckboxCondition$1 as IFilterCheckboxCondition, IFilterCheckboxValue$1 as IFilterCheckboxValue, IFilterCreatedTimeCondition$1 as IFilterCreatedTimeCondition, IFilterCreatedTimeValue$1 as IFilterCreatedTimeValue, IFilterCreatedUserCondition$1 as IFilterCreatedUserCondition, IFilterCreatedUserValue$1 as IFilterCreatedUserValue, IFilterCurrencyCondition$1 as IFilterCurrencyCondition, IFilterCurrencyValue$1 as IFilterCurrencyValue, IFilterDateTimeCondition$1 as IFilterDateTimeCondition, IFilterDateTimeValue$1 as IFilterDateTimeValue, IFilterDuplexLinkCondition$1 as IFilterDuplexLinkCondition, IFilterEmailCondition$1 as IFilterEmailCondition, IFilterEmailValue$1 as IFilterEmailValue, IFilterFormulaCondition$1 as IFilterFormulaCondition, IFilterGroupChatCondition$1 as IFilterGroupChatCondition, IFilterGroupValue$1 as IFilterGroupValue, IFilterInfo$1 as IFilterInfo, IFilterLinkValue$1 as IFilterLinkValue, IFilterLocationCondition$1 as IFilterLocationCondition, IFilterLocationValue$1 as IFilterLocationValue, IFilterLookupCondition$1 as IFilterLookupCondition, IFilterModifiedTimeCondition$1 as IFilterModifiedTimeCondition, IFilterModifiedTimeValue$1 as IFilterModifiedTimeValue, IFilterModifiedUserCondition$1 as IFilterModifiedUserCondition, IFilterModifiedUserValue$1 as IFilterModifiedUserValue, IFilterMultiSelectCondition$1 as IFilterMultiSelectCondition, IFilterNumberCondition$1 as IFilterNumberCondition, IFilterNumberValue$1 as IFilterNumberValue, IFilterPhoneCondition$1 as IFilterPhoneCondition, IFilterPhoneValue$1 as IFilterPhoneValue, IFilterProgressCondition$1 as IFilterProgressCondition, IFilterProgressValue$1 as IFilterProgressValue, IFilterRatingCondition$1 as IFilterRatingCondition, IFilterRatingValue$1 as IFilterRatingValue, IFilterSelectValue$1 as IFilterSelectValue, IFilterSingleLinkCondition$1 as IFilterSingleLinkCondition, IFilterSingleSelectCondition$1 as IFilterSingleSelectCondition, IFilterTextCondition$1 as IFilterTextCondition, IFilterTextValue$1 as IFilterTextValue, IFilterUrlCondition$1 as IFilterUrlCondition, IFilterUrlValue$1 as IFilterUrlValue, IFilterUserCondition$1 as IFilterUserCondition, IFilterUserValue$1 as IFilterUserValue, IFormView$1 as IFormView, IFormViewApplicationModule$1 as IFormViewApplicationModule, IFormViewMessageModule$1 as IFormViewMessageModule, IFormViewMeta$1 as IFormViewMeta, IFormViewProperty$1 as IFormViewProperty, IFormulaField, IFormulaFieldConfig, IFormulaFieldMeta$1 as IFormulaFieldMeta, IFormulaFieldProperty$1 as IFormulaFieldProperty, IGalleryView$1 as IGalleryView, IGalleryViewApplicationModule$1 as IGalleryViewApplicationModule, IGalleryViewMessageModule$1 as IGalleryViewMessageModule, IGalleryViewMeta$1 as IGalleryViewMeta, IGalleryViewProperty$1 as IGalleryViewProperty, IGanttView$1 as IGanttView, IGanttViewApplicationModule$1 as IGanttViewApplicationModule, IGanttViewMessageModule$1 as IGanttViewMessageModule, IGanttViewMeta$1 as IGanttViewMeta, IGanttViewProperty$1 as IGanttViewProperty, IGetRecordsParams, IGetRecordsResponse, IGridView$1 as IGridView, IGridViewApplicationModule$1 as IGridViewApplicationModule, IGridViewMessageModule$1 as IGridViewMessageModule, IGridViewMeta$1 as IGridViewMeta, IGridViewProperty$1 as IGridViewProperty, IGroupChatFieldConfig, IGroupChatFieldMeta$1 as IGroupChatFieldMeta, IGroupChatFieldProperty$1 as IGroupChatFieldProperty, IGroupField, IGroupInfo$1 as IGroupInfo, IHierarchyViewMeta$1 as IHierarchyViewMeta, IHierarchyViewProperty$1 as IHierarchyViewProperty, IKanbanView$1 as IKanbanView, IKanbanViewApplicationModule$1 as IKanbanViewApplicationModule, IKanbanViewMessageModule$1 as IKanbanViewMessageModule, IKanbanViewMeta$1 as IKanbanViewMeta, IKanbanViewProperty$1 as IKanbanViewProperty, ILocationField, ILocationFieldConfig, ILocationFieldMeta$1 as ILocationFieldMeta, ILocationFieldProperty$1 as ILocationFieldProperty, ILookupField, ILookupFieldConfigValue, ILookupFieldMeta$1 as ILookupFieldMeta, ILookupFieldProperty$1 as ILookupFieldProperty, IModifiedTimeField, IModifiedTimeFieldConfig, IModifiedTimeFieldMeta$1 as IModifiedTimeFieldMeta, IModifiedTimeFieldProperty$1 as IModifiedTimeFieldProperty, IModifiedUserField, IModifiedUserFieldConfig, IModifiedUserFieldMeta$1 as IModifiedUserFieldMeta, IModifiedUserFieldProperty$1 as IModifiedUserFieldProperty, IMultiSelectField, IMultiSelectFieldMeta$1 as IMultiSelectFieldMeta, INotSupportField, INumberField, INumberFieldConfig, INumberFieldMeta$1 as INumberFieldMeta, INumberFieldProperty$1 as INumberFieldProperty, IOpenAttachment, IOpenAutoNumber, IOpenCellValue, IOpenCheckbox, IOpenDocumentMentionSegment$1 as IOpenDocumentMentionSegment, IOpenFormulaCellValue, IOpenFormulaFuncCellValue, IOpenFormulaProxyCellValue, IOpenGroupChat, IOpenLink, IOpenLocation, IOpenMentionSegment$1 as IOpenMentionSegment, IOpenMultiSelect, IOpenNumber, IOpenPhone, IOpenSegment, IOpenSegmentType$1 as IOpenSegmentType, IOpenSingleCellValue, IOpenSingleSelect, IOpenTextSegment$1 as IOpenTextSegment, IOpenTimestamp, IOpenUrlSegment$1 as IOpenUrlSegment, IOpenUser, IOpenUserMentionSegment, IPhoneField, IPhoneFieldConfig, IPhoneFieldMeta$1 as IPhoneFieldMeta, IPhoneFieldProperty$1 as IPhoneFieldProperty, IPrivateMessageModule, IProgressField, IProgressFieldConfig, IProgressFieldMeta$1 as IProgressFieldMeta, IProgressFieldProperty$1 as IProgressFieldProperty, IRatingField, IRatingFieldConfig, IRatingFieldMeta$1 as IRatingFieldMeta, IRatingFieldProperty$1 as IRatingFieldProperty, IRatingMinVal$1 as IRatingMinVal, IRecord, IRecordList, IRecordRes, IRecordType, IRecordValue, ISelectField, ISelectFieldConfig, ISelectFieldOption$1 as ISelectFieldOption, ISelectOptionColor, ISelfCalculationValue, ISetFieldConfig, ISetFilterConjunctionParams$1 as ISetFilterConjunctionParams, ISetFilterParams$1 as ISetFilterParams, ISetTableConfig, ISetViewConfig, ISharingMeta, ISingleLinkField, ISingleLinkFieldConfig, ISingleLinkFieldMeta$1 as ISingleLinkFieldMeta, ISingleLinkFieldProperty$1 as ISingleLinkFieldProperty, ISingleSelectField, ISingleSelectFieldMeta$1 as ISingleSelectFieldMeta, ISortInfo$1 as ISortInfo, ITable, ITableApplicationModule, ITableMessageModule, ITableMeta, ITextField, ITextFieldConfig, ITextFieldMeta$1 as ITextFieldMeta, ITextFieldProperty$1 as ITextFieldProperty, ITimeField, IUI, IUIApplicationModule, IUIMessageModule, IUpdateFilterConditionParams$1 as IUpdateFilterConditionParams, IUploadEventData, IUploadFileTask, IUploadFileTaskItem, IUrlField, IUrlFieldConfig, IUrlFieldMeta$1 as IUrlFieldMeta, IUrlFieldProperty$1 as IUrlFieldProperty, IUserField, IUserFieldConfig, IUserFieldMeta$1 as IUserFieldMeta, IUserFieldProperty$1 as IUserFieldProperty, IView, IViewApplicationModule$1 as IViewApplicationModule, IViewFilterApplication$1 as IViewFilterApplication, IViewFilterMessage$1 as IViewFilterMessage, IViewGroupApplication$1 as IViewGroupApplication, IViewGroupMessage$1 as IViewGroupMessage, IViewMessageModule$1 as IViewMessageModule, IViewMeta$1 as IViewMeta, IViewSortApplication$1 as IViewSortApplication, IViewSortMessage$1 as IViewSortMessage, IWidgetViewMeta$1 as IWidgetViewMeta, IWidgetViewProperty$1 as IWidgetViewProperty, Language, LastTableDeleteForbiddenError, LastViewDeleteForbiddenError, Locale, LocationInfoError, LocationTransformVal, LookupTransformVal, ModifiedTimeTransformVal, ModifiedUserTransformVal, MultiSelectTransformVal, NumberFieldTransformVal, NumberFormatter$1 as NumberFormatter, OpenCommonDetailCode, OpenError, OpenErrorCode, OpenMentionType$1 as OpenMentionType, OpenMentionTypeMap$1 as OpenMentionTypeMap, OpenScopeCode, OpenScopeCodeType, OperationType, OptionConfig, PermissionEntity, PhoneFieldTransformVal, Product, ProgressFieldTransformVal, RatingIconType$1 as RatingIconType, RatingTransformVal, RecordId$1 as RecordId, RecordNotFoundError, RecordOperation, RecordPermissionDeniedError, RecordPermissionParams, RowHeightLevel$1 as RowHeightLevel, SelectOptionsType$1 as SelectOptionsType, Selection, SetCellUnknownError, SetFieldUnknownError, SetFilterType$1 as SetFilterType, SetRecordUnknownError, SetTableUnknownError, SetViewUnknownError, SharingStatus$1 as SharingStatus, ShowToastOptions, SingleLinkFieldTransformVal, SingleRecordOperationLimitExceededError, SingleSelectTransformVal, Sort, TableContext, TableId, TableNameRepeatedError, TableNotFoundError, TableNotLoadedError, TableOperation, TableParamExceptionError, TablePermissionDeniedError, TablePermissionParams, TextFieldTransformVal, ThemeModeCtx, ThemeModeType, ToastType, TransferType, TransferableError, UIBuilder, UnSupportedFieldTypeError, UnSupportedViewTypeError, UnknownScopeCode, UploadFileTaskStatus, UrlTransformVal, UserFieldTransformVal, ValueStatus, ViewContext, ViewId, ViewMissingMethodError, ViewNameRepeatedError, ViewNotFoundError, ViewPermissionDeniedError, ViewType$1 as ViewType, WidgetBaseEvent, WidgetFieldEvent, WidgetTableEvent, baseEventPrefix, bitable, bridgeEventPrefix, cell_checkers as checkers, createApiKey, createCompatibleApiKey, fieldEventPrefix, getBaseEventKey, getBridgeEventKey, getFieldEventKey, getNeedTransformApiKeyMap, getTableEventKey, tableEventPrefix, view_checker as viewCheckers };
