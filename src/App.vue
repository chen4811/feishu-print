<script setup lang="ts">
import FieldList from '@/components/FieldList.vue';
import Editor from '@/components/Editor.vue';
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
    { id: '1', name: '医疗设备验收单', content: `<p style="text-align: center;"><span style="font-size: 18pt; font-family: 方正小标宋简体;">医疗设备验收单</span></p> 
 <p style="text-align: right;"><span style="font-family: 仿宋;">□是/□否安装类</span></p>
<table style="border-collapse: collapse; width: 100.072%; height: 745.031px;" border="1"><colgroup><col style="width: 18.2239%;"><col style="width: 32.8652%;"><col style="width: 17.1323%;"><col style="width: 31.7761%;"></colgroup>
<tbody>
<tr style="height: 38px;">
<td><span style="font-family: 仿宋;">资产名称</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fld0l6zAu7" data-fieldname="设备名称">{$设备名称}</span></td>
<td><span style="font-family: 仿宋;">规格型号</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fld2gouIKu" data-fieldname="规格型号">{$规格型号}</span></td>
</tr>
<tr style="height: 38px;">
<td><span style="font-family: 仿宋;">注册证号</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldjM2ez5m" data-fieldname="注册证号">{$注册证号}</span></td>
<td><span style="font-family: 仿宋;">数 量</span></td>
<td>1 <span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fld9d5fXdZ" data-fieldname="单位">{$单位}</span></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">生产厂家</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="flddb8GuUz" data-fieldname="生产厂家">{$生产厂家}</span></td>
<td><span style="font-family: 仿宋;">供应商</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldu2T1J8S" data-fieldname="供应商">{$供应商}</span></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">出厂编号</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fld6BPUxvb" data-fieldname="序列号">{$序列号}</span></td>
<td><span style="font-family: 仿宋;">生产日期</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldo9bMgLl" data-fieldname="生产日期" data-fieldtype="DateTime">{$生产日期}</span></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">使用年限</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fld56DEOGB" data-fieldname="使用年限">{$使用年限}</span></td>
<td><span style="font-family: 仿宋;">放置位置</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldAnArF9M" data-fieldname="楼层">{$楼层}</span> <span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldNrfi9fz" data-fieldname="房间">{$房间}</span></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">使用科室</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldmFepucJ" data-fieldname="使用部门">{$使用部门}</span></td>
<td><span style="font-family: 仿宋;">保管人</span></td>
<td><span style="font-family: 仿宋;" class="template-field field-block" contenteditable="false" data-fieldid="fldob1qFGp" data-fieldname="保管人">{$保管人}</span></td>
</tr>
<tr style="height: 38px">
<td style="text-align: center;" colspan="4"><strong><span style="font-family: 仿宋;">附&nbsp; 件</span></strong></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">合格证</span></td>
<td>&nbsp;</td>
<td><span style="font-family: 仿宋;">说明书</span></td>
<td>&nbsp;</td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">技术资料</span></td>
<td>&nbsp;</td>
<td><span style="font-family: 仿宋;">其他附件</span></td>
<td>&nbsp;</td>
</tr>
<tr style="height: 38px">
<td style="text-align: center;" colspan="4"><strong><span style="font-family: 仿宋;">验收流程确认</span></strong></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">交付资产完好</span></td>
<td><span style="font-family: 仿宋;">□是&nbsp; □否</span></td>
<td><span style="font-family: 仿宋;">设备性能良好</span></td>
<td><span style="font-family: 仿宋;">□是&nbsp; □否</span></td>
</tr>
<tr style="height: 38px">
<td><span style="font-family: 仿宋;">主要功能正常<br></span></td>
<td><span style="font-family: 仿宋;">□是&nbsp; □否</span></td>
<td><span style="font-family: 仿宋;">操作教育完成<br></span></td>
<td><span style="font-family: 仿宋;">□是&nbsp; □否</span></td>
</tr>
<tr style="height: 55.2344px;">
<td style="vertical-align: top;" colspan="4" rowspan="4">
<p><span style="font-family: 仿宋;">使用科室（签字）： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;日期：</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 仿宋;">工程师（签字）： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;电话：</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 仿宋;">医品部（签字）：</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 仿宋;">财务部（签字）：</span></p>
</td>
</tr>
</tbody>
</table>
<p><span style="font-family: 仿宋;">注:本验收报告一式3份，医品部、财务部、所在科室各1份存档。 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2025-07-04</span></p>` },
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
            <el-select v-model="selectedTemplate" placeholder="选择模板" style="width: 120px; margin-right: 10px;" >
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