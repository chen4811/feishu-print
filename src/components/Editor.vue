<template>
  <div class="custom-editor-container">
    <textarea :id="editorId"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import tinymce, { RawEditorOptions } from 'tinymce';
import dayjs from 'dayjs';

const formatTimestamp = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY/MM/DD');
};

// Import TinyMCE theme and icons
import 'tinymce/themes/silver';
import 'tinymce/icons/default';


const props = defineProps({
  recordData: {
    type: Object,
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
let editorInstance: any | null = null;
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
  font_css: '/myFont.css',
  plugins: [
    'autosave', 'charmap', 'fullscreen', 'image', 'insertdatetime', 'lists', 'code',
    'nonbreaking', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace',
    'table', 'visualblocks', 'visualchars', 'exportpdf', 'code'
  ].join(' '),
  toolbar: [
    'undo redo paperSizeButton fontfamily fontsize bold italic underline strikethrough align lineheight table fullscreen preview print',
    'quickimage pagebreak insertdatetime exportpdf'
  ].join(' '),
  font_family_formats: '微软雅黑=微软雅黑;方正小标宋简体=方正小标宋简体;宋体=宋体;仿宋=仿宋;黑体=黑体;楷体=楷体;Arial=Arial;sans-serif=Sans-serif;Times New Roman=Times New Roman;', 
  setup: (editor: any) => {
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
        'A4': { width: '793.733px', height: '1050.6px' },
        'A5': { width: '559.333px', height: '741px' },
      };

      const size = pageSizeMap[value];
      if (size) {
        const tinymceElement = editor.getDoc().getElementById('tinymce');
        if (tinymceElement) {
          tinymceElement.style.width = size.width;
          tinymceElement.style.height = size.height;
          tinymceElement.style.margin = 'auto'; // 居中显示
          tinymceElement.style.boxShadow = '0 0 4px rgba(0,0,0,.15)'; // 添加阴影
          tinymceElement.style.backgroundColor = '#fff'; // 白色背景
          tinymceElement.style.padding = '20mm'; // 模拟页边距
          tinymceElement.style.boxSizing = 'border-box'; // 边框盒模型
          paperSize.value = value; // 更新纸张大小显示
        }
      }
    });

    editor.ui.registry.addMenuButton('paperSizeButton', {
  text: paperSize.value, // 动态显示当前纸张大小
  tooltip: '纸张大小设置',
  fetch: (callback: any) => {
    const items = [
      { type: 'menuitem', text: 'A4', onAction: () => editor.execCommand('mceSetPageSize', false, 'A4') },
      { type: 'menuitem', text: 'A5', onAction: () => editor.execCommand('mceSetPageSize', false, 'A5') },
      
      // 添加更多的选项...
    ];
    callback(items);
  }
});
  }
};

//编辑器高度随窗口变化
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
      }, 0); // 使用 setTimeout 确保在下一个事件循环中执行
      // 监听窗口大小变化
      window.onresize = () => {
        if (editorInstance) {
          const editorContainer = editorInstance.getContainer();
          if (editorContainer) {
            // 获取父容器的高度，这里假设父容器是body或者其他可以充满屏幕的元素
            // 实际应用中可能需要更精确的计算，例如减去头部、底部等固定元素的高度
            const parentHeight = window.innerHeight;
            // 假设编辑器上方有其他元素，例如 Element Plus 的 el-header，其默认高度为 60px
            const offsetHeight = 60; 
            const newHeight = parentHeight - offsetHeight;
            editorContainer.style.height = `${newHeight}px`;
          }
        }
      };
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
});

watch(() => props.modelValue, (newValue) => {
  if (editorInstance && editorInstance.getContent() !== newValue) {
    editorInstance.setContent(newValue);
  }
});

const applyIframeStyles = () => {
    if (!editorInstance) return;

    const iframe = editorInstance.iframeElement;
    if (!iframe) return;

    const tinymceElement = iframe.contentDocument.getElementById('tinymce');
    if (!tinymceElement) return;

    console.log('applyIframeStyles called. props.readonly:', props.readonly);

    const setStyles = (readOnly: boolean) => {
      const pointerEvents = readOnly ? "none" : "auto";
      const userSelect = readOnly ? "none" : "text";
      const cursor = readOnly ? "default" : "text";

      tinymceElement.style.pointerEvents = pointerEvents;
      tinymceElement.style.userSelect = userSelect;
      tinymceElement.style.cursor = cursor;
      tinymceElement.style.webkitUserSelect = userSelect;
      tinymceElement.style.MozUserSelect = userSelect;
      tinymceElement.style.msUserSelect = userSelect;
      tinymceElement.style.KhtmlUserSelect = userSelect;
    };

    setStyles(props.readonly);
  };

  const toggleEditorMode = () => {
    if (editorInstance) {
      editorInstance.mode.set(props.readonly ? "readonly" : "design"); // 根据 readonly 属性设置模式
      // Add a small delay to allow the editor mode to fully transition
      applyIframeStyles();
    }
  };



  watch(() => props.readonly, (newVal) => {
    toggleEditorMode();
  });

const originalContent = ref(''); // Store original content before preview

const getFieldValue = (fieldCell: any): string => {
  if (Array.isArray(fieldCell)) {
    return fieldCell.filter(item => item !== null && item !== undefined).map(item => (typeof item === 'object' && item !== null) ? (item.text || item.name || '') : String(item || '')).join(', ');
  } else if (typeof fieldCell === 'object' && fieldCell !== null) {
    // Check if it's an image field with a 'url' property
    if ('url' in fieldCell && typeof (fieldCell as any).url === 'string') {
      return `<img src="${(fieldCell as any).url}" style="max-width: 100%; height: auto;" />`;
    } else if ('text' in fieldCell) {
      return (fieldCell as any).text;
    }
  } else if (typeof fieldCell === 'number' && String(fieldCell).length === 13) { // Assuming 13-digit timestamp
    return formatTimestamp(fieldCell);
  }
  return String(fieldCell || '');
};

const renderPreview = () => {
  if (!editorInstance || !props.recordData) return;

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
    const fieldName = element.getAttribute('data-fieldname'); // Fallback to fieldName if ID is not enough
    let value = '';

    if (props.recordData.fields) {
      if (fieldId && props.recordData.fields[fieldId]) {
        value = getFieldValue(props.recordData.fields[fieldId]);
      } else if (fieldName && props.recordData.fields[fieldName]) {
        value = getFieldValue(props.recordData.fields[fieldName]);
      } else {
        // If fieldId is not found, try to find by fieldName as a fallback
        const fieldEntry = Object.entries(props.recordData.fields).find(([key, val]: [string, any]) => {
          if (val === null || val === undefined) {
            return false;
          }
          return val.name === fieldName || key === fieldName;
        });
        if (fieldEntry) {
          value = getFieldValue(fieldEntry[1]);
        } else {
          value = ''; // Display empty if no data
        }
      }
    }
    element.innerHTML = value;
  });

  editorInstance.setContent(doc.body.innerHTML);
};

watch(() => props.readonly, (newVal) => {
  if (editorInstance) {
    if (newVal) { // Entering readonly (preview) mode
      originalContent.value = editorInstance.getContent(); // Save current content
      renderPreview();
      editorInstance.mode.set('readonly');
    } else { // Exiting readonly (entering design) mode
      if (originalContent.value) {
        editorInstance.setContent(originalContent.value); // Restore original content
      }
      editorInstance.mode.set('design');
    }
  }
});

watch(() => props.recordData, (newData) => {
  if (props.readonly && editorInstance && newData) {
    // If in preview mode and recordData changes, re-render preview
    renderPreview();
  }
}, { deep: true });

import { FieldType } from '@lark-base-open/js-sdk';

const insertContent = (field: any) => {
  if (editorInstance) {
    let contentToInsert = '';
    if (field.type === FieldType.Attachment) {
      // For attachment type, insert an image tag if it's an image, otherwise just the name
      // Assuming field.value might contain an array of attachments, or a single attachment object
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