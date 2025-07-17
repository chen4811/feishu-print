<template>
  <div class="custom-editor-container">
    <textarea :id="editorId"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, type PropType } from 'vue';
import { Editor, RawEditorOptions } from 'tinymce';
import dayjs from 'dayjs';

const formatTimestamp = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY/MM/DD');
};

// Import TinyMCE theme and icons
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

const props = defineProps({
  recordData: {
    type: Object as PropType<Record<string, any> | null>,
    default: null
  },
  modelValue: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `tinymce-editor-${Math.random().toString(36).substring(7)}`
  },
  options: {
    type: Object as PropType<Partial<RawEditorOptions>>,
    default: () => ({})
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const editorId = ref(props.id);
let editorInstance: Editor | null = null;
const paperSize = ref('A4'); // 默认纸张大小为A4

const defaultConfig = {
  language: 'zh_CN',  // 语言设置为中文
  skin: 'mrchen',
  content_css: 'mrchen',
  content_style: `
    .template-field { user-select: all; display: inline-block; margin: 0 2px;}
    .field-block {padding:2px 5px; box-shadow: 0 0 0 1px #36a1ff78; border-radius: 2px; background-color: #e0e9ff;}
  `,
  ui_mode: 'combined',
  menubar: false, // 隐藏菜单栏
  toolbar_mode: 'floating' as 'floating', // 工具栏换行模式
  font_size_input_default_unit: "pt",
  statusbar: false, // 隐藏状态栏
  image_uploadtab: false,
  image_upload_url: '/upload',
  quickbars_image_toolbar: 'alignleft aligncenter alignright | imageoptions',
  font_css: './src/assets/myFont.css',
  plugins: [
    'autosave', 'charmap', 'fullscreen', 'image', 'insertdatetime', 'lists', 'code',
    'nonbreaking', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace',
    'table', 'visualblocks', 'visualchars', 'exportpdf', 'code'
  ].join(' '),
  toolbar: [
    'undo redo paperSizeButton fontfamily fontsize bold italic underline strikethrough align lineheight table fullscreen preview print',
    'quickimage pagebreak code insertdatetime exportpdf'
  ].join(' '),
  font_family_formats: '微软雅黑=微软雅黑;方正小标宋简体=方正小标宋简体;宋体=宋体;仿宋=仿宋;黑体=黑体;楷体=楷体;Arial=Arial;sans-serif=Sans-serif;Times New Roman=Times New Roman;', 
  setup: (editor: Editor) => {
    editor.on('BeforeSetContent', function(e: any) {
      // Ensure template fields are correctly marked as non-editable
      if (e.content.includes('class="template-field"')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.content, 'text/html');
        const fieldElements = doc.querySelectorAll('.template-field');
        fieldElements.forEach(element => {
          element.setAttribute('contenteditable', 'false');
          element.setAttribute('data-mce-contenteditable', 'false');
        });
        e.content = doc.body.innerHTML;
      }
    });
    
    editor.on('PastePreProcess', function(e: any) {
      // Ensure pasted template fields are correctly marked as non-editable
      if (e.content.includes('class="template-field"')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.content, 'text/html');
        const fieldElements = doc.querySelectorAll('.template-field');
        fieldElements.forEach(element => {
          element.setAttribute('contenteditable', 'false');
          element.setAttribute('data-mce-contenteditable', 'false');
        });
        e.content = doc.body.innerHTML;
      }
    });
    
    editor.on('change input undo redo', () => {
      if (editorInstance) {
        emit('update:modelValue', editorInstance.getContent());
      }
    });
    
    editor.addCommand('mceSetPageSize', (ui: any, value: string) => {
      const pageSizeMap: { [key: string]: { width: string; height: string } } = {
        'A4': { width: '210mm', height: '297mm' },
        'A5': { width: '148mm', height: '210mm' },
      };

      const size = pageSizeMap[value];
      if (size) {
        const tinymceElement = editor.getDoc().getElementById('tinymce');
        if (tinymceElement) {
          tinymceElement.style.width = size.width;
          tinymceElement.style.height = size.height;
          tinymceElement.style.margin = 'auto'; // 居中显示
          tinymceElement.style.backgroundColor = '#fff'; // 白色背景
          tinymceElement.style.padding = '20mm'; // 模拟页边距
          tinymceElement.style.boxSizing = 'border-box'; // 边框盒模型
          paperSize.value = value; // 更新纸张大小显示
        }
      }
    });

    const paperSizeText = computed(() => paperSize.value);

    editor.ui.registry.addMenuButton('paperSizeButton', {
      text: paperSizeText.value,
      tooltip: '纸张大小设置',
      fetch: (callback: any) => {
        const items = [
          { type: 'menuitem', text: 'A4', onAction: () => editor.execCommand('mceSetPageSize', false, 'A4') },
          { type: 'menuitem', text: 'A5', onAction: () => editor.execCommand('mceSetPageSize', false, 'A5') },
        ];
        callback(items);
      }
    });
  }
};

// 编辑器高度随窗口变化
const handleResize = () => {
  if (editorInstance) {
    const editorContainer = editorInstance.getContainer();
    if (editorContainer) {
      const parentHeight = window.innerHeight;
      const offsetHeight = 60; // 顶部元素高度
      const newHeight = parentHeight - offsetHeight;
      editorContainer.style.height = `${newHeight}px`;
    }
  }
};

onMounted(() => {
  tinymce.init({
    api_key: '1yiqgiknc2aknys03ekamqwx94v2gja6wvpjbt1q21m3zkkw',
    selector: `#${editorId.value}`,
    ...defaultConfig,
    ...props.options,
    readonly: props.readonly,
  }).then(editors => {
    if (editors.length > 0) {
      editorInstance = editors[0];
      editorInstance.setContent(props.modelValue);
      // 默认设置为A4纸张大小
      editorInstance.execCommand('mceSetPageSize', false, 'A4');
      
      // 确保在编辑器完全初始化并渲染后执行
      setTimeout(() => {
        toggleEditorMode();
      }, 0);
      
      // 监听窗口大小变化
      window.addEventListener('resize', handleResize);
      // 首次加载时也调整高度
      window.dispatchEvent(new Event('resize'));
    }
  });
});

onUnmounted(() => {
  if (editorInstance) {
    editorInstance.destroy();
    editorInstance = null;
  }
  window.removeEventListener('resize', handleResize);
});

watch(() => props.modelValue, (newValue) => {
  if (editorInstance && editorInstance.getContent() !== newValue) {
    editorInstance.setContent(newValue);
  }
}, { immediate: true });

const applyIframeStyles = () => {
  if (!editorInstance) return;

  const iframe = editorInstance.iframeElement;
  if (!iframe) return;

  const onIframeLoad = () => {
    const tinymceElement = iframe.contentDocument.getElementById('tinymce');
    if (!tinymceElement) return;

    console.log('applyIframeStyles called. props.readonly:', props.readonly);

    // 只在只读模式下应用限制样式
    if (props.readonly) {
      tinymceElement.style.pointerEvents = "none";
      tinymceElement.style.userSelect = "none";
      tinymceElement.style.cursor = "default";
    } else {
      // 在编辑模式下恢复默认样式
      tinymceElement.style.pointerEvents = "auto";
      tinymceElement.style.userSelect = "text";
      tinymceElement.style.cursor = "text";
    }
    
    // 保留其他用户选择相关的样式，但只在只读模式下应用
    tinymceElement.style.webkitUserSelect = props.readonly ? "none" : "text";
    tinymceElement.style.MozUserSelect = props.readonly ? "none" : "text";
    tinymceElement.style.msUserSelect = props.readonly ? "none" : "text";
    tinymceElement.style.KhtmlUserSelect = props.readonly ? "none" : "text";
  };

  if (iframe.contentDocument.readyState === 'complete') {
    onIframeLoad();
  } else {
    iframe.addEventListener('load', onIframeLoad);
  }
};


const toggleEditorMode = () => {
  if (editorInstance) {
    editorInstance.mode.set(props.readonly ? "readonly" : "design");
    applyIframeStyles();
  }
};

const originalContent = ref(''); // Store original content before preview

const getFieldValue = (fieldCell: any): string => {
  if (Array.isArray(fieldCell)) {
    return fieldCell
      .filter(item => item !== null && item !== undefined)
      .map(item => 
        typeof item === 'object' && item !== null 
          ? (item.text || item.name || '') 
          : String(item || '')
      )
      .join(', ');
  } else if (typeof fieldCell === 'object' && fieldCell !== null) {
    if ('url' in fieldCell && typeof (fieldCell as any).url === 'string') {
      return `<img src="${(fieldCell as any).url}" style="max-width: 100%; height: auto;" />`;
    } else if ('text' in fieldCell) {
      return (fieldCell as any).text;
    }
  } else if (typeof fieldCell === 'number' && String(fieldCell).length === 13) {
    return formatTimestamp(fieldCell);
  }
  return String(fieldCell || '');
};

const renderPreview = () => {
  if (!editorInstance || !props.recordData || !props.recordData.fields) return;

  let content = editorInstance.getContent();
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const fieldElements = doc.querySelectorAll('.template-field');

  // Remove field-block class in preview mode
  fieldElements.forEach(element => {
    element.classList.remove('field-block');
  });

  fieldElements.forEach(element => {
    const fieldId = element.getAttribute('data-fieldid');
    const fieldName = element.getAttribute('data-fieldname');
    let value = '';

    if (props.recordData.fields) {
      if (fieldId && props.recordData.fields[fieldId]) {
        value = getFieldValue(props.recordData.fields[fieldId]);
      } else if (fieldName && props.recordData.fields[fieldName]) {
        value = getFieldValue(props.recordData.fields[fieldName]);
      } else {
        const fieldEntry = Object.entries(props.recordData.fields).find(([key, val]) => {
          if (val === null || val === undefined) {
            return false;
          }
          return val.name === fieldName || key === fieldName;
        });
        if (fieldEntry) {
          value = getFieldValue(fieldEntry[1]);
        }
      }
    }
    element.innerHTML = value;
  });

  editorInstance.setContent(doc.body.innerHTML);
};

// 修改 readonly 模式切换逻辑
watch(() => props.readonly, (newVal) => {
  if (editorInstance) {
    if (newVal) { // 进入只读模式
      originalContent.value = editorInstance.getContent();
      renderPreview();
      editorInstance.mode.set('readonly');
    } else { // 进入编辑模式
      if (originalContent.value) {
        editorInstance.setContent(originalContent.value);
      }
      editorInstance.mode.set('design');
      
      // 确保编辑器内容可编辑
      setTimeout(() => {
        const iframe = editorInstance.iframeElement;
        if (iframe && iframe.contentDocument) {
          const body = iframe.contentDocument.body;
          if (body) {
            body.contentEditable = "true";
          }
        }
      }, 100);
    }
    
    // 应用样式
    applyIframeStyles();
  }
}, { immediate: true });

watch(() => props.recordData, (newData) => {
  if (props.readonly && editorInstance && newData) {
    renderPreview();
  }
}, { deep: true, immediate: true });

import { FieldType } from '@lark-base-open/js-sdk';

const insertContent = (field: any) => {
  if (editorInstance) {
    let contentToInsert = '';
    if (field.type === FieldType.Attachment) {
      if (field.value && Array.isArray(field.value) && field.value.length > 0) {
        const firstAttachment = field.value[0];
        if (firstAttachment.url) {
          contentToInsert = `<img src="${firstAttachment.url}" style="max-width: 100%; height: auto;" />`;
        } else {
          contentToInsert = `<span class="template-field field-block" contenteditable="false" data-mce-contenteditable="false" data-fieldid="${field.id}" data-fieldname="${field.name}">{$${field.name}}</span>`;
        }
      } else if (field.value && field.value.url) {
        contentToInsert = `<img src="${field.value.url}" style="max-width: 100%; height: auto;" />`;
      } else {
        contentToInsert = `<span class="template-field field-block" contenteditable="false" data-mce-contenteditable="false" data-fieldid="${field.id}" data-fieldname="${field.name}">{$${field.name}}</span>`;
      }
    } else if (field.type === FieldType.DateTime) {
      contentToInsert = `<span class="template-field field-block" contenteditable="false" data-mce-contenteditable="false" data-fieldid="${field.id}" data-fieldname="${field.name}" data-fieldtype="DateTime">{$${field.name}}</span>`;
    } else {
      contentToInsert = `<span class="template-field field-block" contenteditable="false" data-mce-contenteditable="false" data-fieldid="${field.id}" data-fieldname="${field.name}">{$${field.name}}</span>`;
    }
    editorInstance.execCommand('mceInsertContent', false, contentToInsert);
  }
};

defineExpose({
  insertContent
});
</script>  