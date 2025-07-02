<script setup lang="ts">
import FieldList from './components/FieldList.vue';
import Editor from './components/Editor.vue';
import { ref, type Ref, onMounted, watch } from 'vue';
import { ElMessageBox } from 'element-plus';
import { bitable } from '@lark-base-open/js-sdk';

const editorContent = ref('<p>Hello TinyMCE!</p>');
const editorRef: Ref | null = ref(null);

const selectedTemplate = ref('');
const templates = ref<{ id: string; name: string; content: string }[]>([]);

const handleNewTemplate = () => {
  // Logic to create a new template
  console.log('新增模板');
  editorContent.value = ''; // Clear editor for new template
  selectedTemplate.value = ''; // Deselect any template
  isEditable.value = true; // 切换到编辑模式
};

const handleSaveTemplate = async () => {
  // Logic to save the current template
  try {
    if (selectedTemplate.value) {
      // Update existing template
      const index = templates.value.findIndex(t => t.id === selectedTemplate.value);
      if (index !== -1) {
        templates.value[index].content = editorContent.value;
        ElMessageBox.alert('模板已成功保存。', '提示', { type: 'success' });
      }
    } else {
      // Save as new template
      const { value: templateName } = await ElMessageBox.prompt('请输入模板名称', '保存模板', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '模板名称不能为空'
      });

      if (templateName) {
        const newId = (templates.value.length + 1).toString(); // Simple ID generation
        templates.value.push({
          id: newId,
          name: templateName,
          content: editorContent.value,
        });
        selectedTemplate.value = newId; // Select the newly saved template
        ElMessageBox.alert('模板已成功保存。', '提示', { type: 'success' });
      }
    }
  } catch (error) {
    console.log('保存取消或出错:', error);
  }
};

const handleDeleteTemplate = async () => {
  if (!selectedTemplate.value) {
    ElMessageBox.alert('请先选择一个模板进行删除。', '提示', { type: 'warning' });
    return;
  }

  try {
    await ElMessageBox.confirm('确定要删除此模板吗？', '删除模板', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });

    const index = templates.value.findIndex(t => t.id === selectedTemplate.value);
    if (index !== -1) {
      templates.value.splice(index, 1);
      selectedTemplate.value = ''; // Clear selection after deletion
      editorContent.value = ''; // Clear editor content
      ElMessageBox.alert('模板已成功删除。', '提示', { type: 'success' });
    }
  } catch (error) {
    console.log('删除取消或出错:', error);
  }
};

// Watch for changes in selectedTemplate to load content
watch(selectedTemplate, (newVal) => {
  if (newVal) {
    const template = templates.value.find(t => t.id === newVal);
    if (template) {
      editorContent.value = template.content;
    }
  } else {
    editorContent.value = '';
  }
});

const handleInsertField = (field: string) => {
  if (editorRef.value) {
    editorRef.value.insertContent(field);
  }
};
const isEditable = ref(false);
const currentRowData = ref<any>(null);

onMounted(async () => {
  // Load dummy templates for demonstration
  templates.value = [
    { id: '1', name: '模板一', content: '<p>这是<b>模板一</b>的内容。</p>' },
    { id: '2', name: '模板二', content: '<p>这是<i>模板二</i>的内容。</p>' },
  ];

  // Select the first template by default if available
  if (templates.value.length > 0) {
    selectedTemplate.value = templates.value[0].id;
  }

  try {
    const table = await bitable.base.getActiveTable();
    // Get initial selection
    const selection = await bitable.base.getSelection();
    if (selection && selection.recordId) {
      const record = await table.getRecordById(selection.recordId);
      currentRowData.value = record;
    }

    // Listen for selection changes
    bitable.base.onSelectionChange(async (event) => {
      if (event.data.tableId && event.data.recordId) {
        const currentTable = await bitable.base.getTableById(event.data.tableId);
        const record = await currentTable.getRecordById(event.data.recordId);
        currentRowData.value = record;
      } else {
        currentRowData.value = null;
      }
    });
  } catch (error) {
    console.error('Error getting current row data:', error);
  }
});
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-aside>
        <FieldList @insert-field="handleInsertField" :isReadonly="!isEditable" />
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <el-select v-model="selectedTemplate" placeholder="选择模板" style="width: 120px; margin-right: 10px;" :disabled="!isEditable">
              <el-option v-for="template in templates" :key="template.id" :label="template.name" :value="template.id"></el-option>
            </el-select>
            <el-button type="success" @click="handleNewTemplate">新增</el-button>
            <el-button type="primary" @click="handleSaveTemplate" :disabled="!isEditable" style="margin-left: 10px;">保存</el-button>
            <el-button type="danger" @click="handleDeleteTemplate" :disabled="!selectedTemplate" style="margin-left: 10px;">删除</el-button>
          </div>
          <div>
            <el-switch v-model="isEditable" active-text="编辑模式" inactive-text="预览模式"></el-switch>
          </div>
        </el-header>
        <el-main>
          <Editor ref="editorRef" v-model="editorContent" :readonly="!isEditable" :recordData="currentRowData" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  
}
.el-aside {
  /*background-color: #fafafa;*/
  width: 160px;
  border-right: 1px solid #eee;
}
.el-main {
  background-color: #fafafa;
  padding: 0;
}
</style>