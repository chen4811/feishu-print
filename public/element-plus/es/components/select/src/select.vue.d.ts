declare const _default: import("vue").DefineComponent<{
    ariaLabel: StringConstructor;
    emptyValues: ArrayConstructor;
    valueOnClear: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor, BooleanConstructor, FunctionConstructor], unknown, unknown, undefined, boolean>;
    name: StringConstructor;
    id: StringConstructor;
    modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | ((new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]))[], unknown, unknown, undefined, boolean>;
    autocomplete: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    automaticDropdown: BooleanConstructor;
    size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus").PopperEffect))[], unknown, unknown, string, boolean>;
    disabled: BooleanConstructor;
    clearable: BooleanConstructor;
    filterable: BooleanConstructor;
    allowCreate: BooleanConstructor;
    loading: BooleanConstructor;
    popperClass: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("element-plus").Options>) | (() => Partial<import("element-plus").Options>) | ((new (...args: any[]) => Partial<import("element-plus").Options>) | (() => Partial<import("element-plus").Options>))[], unknown, unknown, () => Partial<import("element-plus").Options>, boolean>;
    remote: BooleanConstructor;
    loadingText: StringConstructor;
    noMatchText: StringConstructor;
    noDataText: StringConstructor;
    remoteMethod: FunctionConstructor;
    filterMethod: FunctionConstructor;
    multiple: BooleanConstructor;
    multipleLimit: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    placeholder: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    defaultFirstOption: BooleanConstructor;
    reserveKeyword: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    valueKey: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    collapseTags: BooleanConstructor;
    collapseTagsTooltip: BooleanConstructor;
    maxCollapseTags: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    persistent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    clearIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    fitInputWidth: BooleanConstructor;
    suffixIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tagType: {
        default: string;
        type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown>>;
        required: false;
        validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tagEffect: {
        default: string;
        type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>>;
        required: false;
        validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    remoteShowSuffix: BooleanConstructor;
    showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement))[], import("element-plus").Placement, unknown, string, boolean>;
    fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").Placement[]) | (() => import("element-plus").Placement[]) | ((new (...args: any[]) => import("element-plus").Placement[]) | (() => import("element-plus").Placement[]))[], unknown, unknown, string[], boolean>;
    tabindex: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
    appendTo: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>) | ((new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    modelValue: import("vue").ComputedRef<string | number | boolean | any[] | Record<string, any> | undefined>;
    selectedLabel: import("vue").ComputedRef<string | string[]>;
    calculatorRef: import("vue").ShallowRef<HTMLElement | undefined>;
    inputStyle: import("vue").ComputedRef<{
        minWidth: string;
    }>;
    inputId: import("vue").Ref<string | undefined>;
    contentId: import("vue").Ref<string>;
    nsSelect: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string) => string;
        m: (modifier?: string) => string;
        be: (blockSuffix?: string, element?: string) => string;
        em: (element?: string, modifier?: string) => string;
        bm: (blockSuffix?: string, modifier?: string) => string;
        bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
    };
    nsInput: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string) => string;
        m: (modifier?: string) => string;
        be: (blockSuffix?: string, element?: string) => string;
        em: (element?: string, modifier?: string) => string;
        bm: (blockSuffix?: string, modifier?: string) => string;
        bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
    };
    states: {
        inputValue: string;
        options: Map<import("./type").OptionValue, import("./type").OptionPublicInstance>;
        cachedOptions: Map<import("./type").OptionValue, import("./type").OptionPublicInstance>;
        optionValues: import("./type").OptionValue[];
        selected: {
            value: import("./type").OptionValue;
            currentLabel: import("./type").OptionPublicInstance["currentLabel"];
            isDisabled?: import("./type").OptionPublicInstance["isDisabled"] | undefined;
        }[];
        hoveringIndex: number;
        inputHovering: boolean;
        selectionWidth: number;
        collapseItemWidth: number;
        previousQuery: string | null;
        selectedLabel: string;
        menuVisibleOnFocus: boolean;
        isBeforeHide: boolean;
    };
    isFocused: import("vue").Ref<boolean>;
    expanded: import("vue").Ref<boolean>;
    optionsArray: import("vue").ComputedRef<import("./type").OptionPublicInstance[]>;
    hoverOption: import("vue").Ref<any>;
    selectSize: import("vue").ComputedRef<"" | "small" | "default" | "large">;
    filteredOptionsCount: import("vue").ComputedRef<number>;
    updateTooltip: () => void;
    updateTagTooltip: () => void;
    debouncedOnInputChange: import("lodash").DebouncedFunc<() => void>;
    onInput: (event: Event) => void;
    deletePrevTag: (e: KeyboardEvent) => void;
    deleteTag: (event: MouseEvent, tag: import("./type").OptionPublicInstance | import("./type").SelectStates["selected"][0]) => void;
    deleteSelected: (event: Event) => void;
    handleOptionSelect: (option: import("./type").OptionPublicInstance) => void;
    scrollToOption: (option: import("./type").OptionPublicInstance | import("./type").OptionPublicInstance[] | import("./type").SelectStates["selected"]) => void;
    hasModelValue: import("vue").ComputedRef<boolean>;
    shouldShowPlaceholder: import("vue").ComputedRef<boolean>;
    currentPlaceholder: import("vue").ComputedRef<string>;
    mouseEnterEventName: import("vue").ComputedRef<"mouseenter" | null>;
    needStatusIcon: import("vue").ComputedRef<boolean>;
    showClose: import("vue").ComputedRef<boolean>;
    iconComponent: import("vue").ComputedRef<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown> | undefined>;
    iconReverse: import("vue").ComputedRef<string>;
    validateState: import("vue").ComputedRef<"" | "error" | "success" | "validating">;
    validateIcon: import("vue").ComputedRef<"" | import("vue").Component>;
    showNewOption: import("vue").ComputedRef<boolean>;
    updateOptions: () => void;
    collapseTagSize: import("vue").ComputedRef<"default" | "small">;
    setSelected: () => void;
    selectDisabled: import("vue").ComputedRef<boolean | undefined>;
    emptyText: import("vue").ComputedRef<string | null>;
    handleCompositionStart: (event: CompositionEvent) => void;
    handleCompositionUpdate: (event: CompositionEvent) => void;
    handleCompositionEnd: (event: CompositionEvent) => void;
    onOptionCreate: (vm: import("./type").OptionPublicInstance) => void;
    onOptionDestroy: (key: import("./type").OptionValue, vm: import("./type").OptionPublicInstance) => void;
    handleMenuEnter: () => void;
    focus: () => void;
    blur: () => void;
    handleClearClick: (event: Event) => void;
    handleClickOutside: (event: Event) => void;
    handleEsc: () => void;
    toggleMenu: () => void;
    selectOption: () => void;
    getValueKey: (item: import("./type").OptionPublicInstance | import("./type").SelectStates["selected"][0]) => any;
    navigateOptions: (direction: "prev" | "next") => void;
    dropdownMenuVisible: import("vue").WritableComputedRef<boolean>;
    showTagList: import("vue").ComputedRef<{
        value: import("./type").OptionValue;
        currentLabel: import("./type").OptionPublicInstance["currentLabel"];
        isDisabled?: import("./type").OptionPublicInstance["isDisabled"] | undefined;
    }[]>;
    collapseTagList: import("vue").ComputedRef<{
        value: import("./type").OptionValue;
        currentLabel: import("./type").OptionPublicInstance["currentLabel"];
        isDisabled?: import("./type").OptionPublicInstance["isDisabled"] | undefined;
    }[]>;
    popupScroll: (data: {
        scrollTop: number;
        scrollLeft: number;
    }) => void;
    tagStyle: import("vue").ComputedRef<{
        maxWidth: string;
    }>;
    collapseTagStyle: import("vue").ComputedRef<{
        maxWidth: string;
    }>;
    popperRef: import("vue").ComputedRef<HTMLElement | undefined>;
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
    tooltipRef: import("vue").Ref<import("element-plus/es/components/tooltip").TooltipInstance | undefined>;
    tagTooltipRef: import("vue").Ref<import("element-plus/es/components/tooltip").TooltipInstance | undefined>;
    prefixRef: import("vue").Ref<HTMLElement | undefined>;
    suffixRef: import("vue").Ref<HTMLElement | undefined>;
    selectRef: import("vue").Ref<HTMLElement | undefined>;
    wrapperRef: import("vue").ShallowRef<HTMLElement | undefined>;
    selectionRef: import("vue").Ref<HTMLElement | undefined>;
    scrollbarRef: import("vue").Ref<import("element-plus/es/components/scrollbar").ScrollbarInstance | undefined>;
    menuRef: import("vue").Ref<HTMLElement | undefined>;
    tagMenuRef: import("vue").Ref<HTMLElement | undefined>;
    collapseItemRef: import("vue").Ref<HTMLElement | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clear" | "update:modelValue" | "change" | "blur" | "focus" | "visible-change" | "remove-tag" | "popup-scroll")[], "clear" | "update:modelValue" | "change" | "blur" | "focus" | "visible-change" | "remove-tag" | "popup-scroll", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    ariaLabel: StringConstructor;
    emptyValues: ArrayConstructor;
    valueOnClear: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor, BooleanConstructor, FunctionConstructor], unknown, unknown, undefined, boolean>;
    name: StringConstructor;
    id: StringConstructor;
    modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | ((new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]))[], unknown, unknown, undefined, boolean>;
    autocomplete: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    automaticDropdown: BooleanConstructor;
    size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => import("element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus").PopperEffect))[], unknown, unknown, string, boolean>;
    disabled: BooleanConstructor;
    clearable: BooleanConstructor;
    filterable: BooleanConstructor;
    allowCreate: BooleanConstructor;
    loading: BooleanConstructor;
    popperClass: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<import("element-plus").Options>) | (() => Partial<import("element-plus").Options>) | ((new (...args: any[]) => Partial<import("element-plus").Options>) | (() => Partial<import("element-plus").Options>))[], unknown, unknown, () => Partial<import("element-plus").Options>, boolean>;
    remote: BooleanConstructor;
    loadingText: StringConstructor;
    noMatchText: StringConstructor;
    noDataText: StringConstructor;
    remoteMethod: FunctionConstructor;
    filterMethod: FunctionConstructor;
    multiple: BooleanConstructor;
    multipleLimit: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    placeholder: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    defaultFirstOption: BooleanConstructor;
    reserveKeyword: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    valueKey: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    collapseTags: BooleanConstructor;
    collapseTagsTooltip: BooleanConstructor;
    maxCollapseTags: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    persistent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    clearIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    fitInputWidth: BooleanConstructor;
    suffixIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tagType: {
        default: string;
        type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown>>;
        required: false;
        validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    tagEffect: {
        default: string;
        type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>>;
        required: false;
        validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    remoteShowSuffix: BooleanConstructor;
    showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement))[], import("element-plus").Placement, unknown, string, boolean>;
    fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus").Placement[]) | (() => import("element-plus").Placement[]) | ((new (...args: any[]) => import("element-plus").Placement[]) | (() => import("element-plus").Placement[]))[], unknown, unknown, string[], boolean>;
    tabindex: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
    appendTo: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>) | ((new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onVisible-change"?: ((...args: any[]) => any) | undefined;
    "onRemove-tag"?: ((...args: any[]) => any) | undefined;
    "onPopup-scroll"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    offset: number;
    multiple: boolean;
    loading: boolean;
    modelValue: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | ((new (...args: any[]) => string | number | boolean | Record<string, any> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]) | (() => import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown> | import("element-plus/es/utils").EpPropMergeType<(ObjectConstructor | NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown>[]))[], unknown, unknown>;
    placement: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement) | ((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => import("element-plus").Placement))[], import("element-plus").Placement, unknown>;
    effect: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus").PopperEffect))[], unknown, unknown>;
    tabindex: import("element-plus/es/utils").EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>;
    valueOnClear: import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor, BooleanConstructor, FunctionConstructor], unknown, unknown>;
    autocomplete: string;
    validateEvent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    clearable: boolean;
    fallbackPlacements: import("element-plus").Placement[];
    popperOptions: Partial<import("element-plus").Options>;
    popperClass: string;
    teleported: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    persistent: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    showArrow: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    valueKey: string;
    fitInputWidth: boolean;
    filterable: boolean;
    collapseTags: boolean;
    maxCollapseTags: number;
    collapseTagsTooltip: boolean;
    tagType: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown>;
    tagEffect: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "dark" | "light" | "plain", unknown>;
    automaticDropdown: boolean;
    allowCreate: boolean;
    remote: boolean;
    multipleLimit: number;
    defaultFirstOption: boolean;
    reserveKeyword: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    remoteShowSuffix: boolean;
}>;
export default _default;
