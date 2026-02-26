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
    { id: '1', name: '医疗设备验收单', content: `<p class="MsoNormal" align="center"><span style="font-family: 方正小标宋简体; font-size: 18pt;">医疗设备验收单</span></p>
<table style="border-collapse: collapse; width: 99.9865%; height: 650.469px;" border="1"><colgroup><col style="width: 13.9467%;"><col style="width: 35.9825%;"><col style="width: 13.9467%;"><col style="width: 35.9825%;"></colgroup>
<tbody>
<tr style="height: 50.0625px;">
<td class="et3" style="width: 34.5pt; line-height: 1.5;" width="46" height="24"><span style="font-family: 宋体;">资产名称</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fld0l6zAu7" style="font-family: 宋体;" data-fieldname="设备名称">{$设备名称}</span></td>
<td class="et3" style="width: 34.5pt; line-height: 1.5;" width="46" height="24"><span style="font-family: 宋体;">出厂编号</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fld6BPUxvb" style="font-family: 宋体;" data-fieldname="序列号/出厂编号">{$序列号/出厂编号}</span></td>
</tr>
<tr style="height: 50.0625px;">
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">规格型号</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fld2gouIKu" style="font-family: 宋体;" data-fieldname="规格型号">{$规格型号}</span></td>
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">注册证号</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldjM2ez5m" style="font-family: 宋体;" data-fieldname="注册证号">{$注册证号}</span></td>
</tr>
<tr style="height: 50.0625px;">
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">生产厂家</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="flddb8GuUz" style="font-family: 宋体;" data-fieldname="生产厂家">{$生产厂家}</span></td>
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">生产日期</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldo9bMgLl" style="font-family: 宋体;" data-fieldname="生产日期" data-fieldtype="DateTime">{$生产日期}</span></td>
</tr>
<tr style="height: 50.0625px;">
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">使用年限</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fld56DEOGB" style="font-family: 宋体;" data-fieldname="使用年限">{$使用年限}</span></td>
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">供 应 商</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldu2T1J8S" style="font-family: 宋体;" data-fieldname="供应商">{$供应商}</span></td>
</tr>
<tr style="height: 50.0625px;">
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">数<span style="mso-spacerun: yes;">&nbsp;</span><span class="font2"><span style="mso-spacerun: yes;">&nbsp;</span></span><span class="font2">量</span></span></td>
<td style="line-height: 1.5;"><span style="font-family: 宋体;">1套</span></td>
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">放置位置</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldAnArF9M" style="font-family: 宋体;" data-fieldname="楼层">{$楼层}</span><span style="font-family: 宋体;">-</span><span class="template-field field-block" contenteditable="false" data-fieldid="fldNrfi9fz" style="font-family: 宋体;" data-fieldname="房间">{$房间}</span></td>
</tr>
<tr style="height: 50.0625px;">
<td class="et4" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">使用科室</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldmFepucJ" style="font-family: 宋体;" data-fieldname="使用部门">{$使用部门}</span></td>
<td class="et5" style="line-height: 1.5;" height="24"><span style="font-family: 宋体;">保 管 人</span></td>
<td style="line-height: 1.5;"><span class="template-field field-block" contenteditable="false" data-fieldid="fldob1qFGp" style="font-family: 宋体;" data-fieldname="保管人">{$保管人}</span></td>
</tr>
<tr style="height: 46.0938px;">
<td style="line-height: 1.5;" rowspan="2">
<p class="MsoNormal"><span style="font-family: 宋体;"><strong>出厂资料</strong></span></p>
</td>
<td style="line-height: 1.5;" colspan="3"><span style="font-family: 宋体;">装箱单<span style="font-family: 宋体;">□</span>&nbsp; &nbsp; 合格证<span style="font-family: 宋体;">□</span>&nbsp; &nbsp; 说明书<span style="font-family: 宋体;">□</span> &nbsp;</span></td>
</tr>
<tr style="height: 46.0938px;">
<td style="line-height: 1.5;" colspan="3"><span style="font-family: 宋体;">附件说明：</span></td>
</tr>
<tr style="height: 211.781px;">
<td style="line-height: 1.5;">
<p class="MsoNormal"><span style="font-family: 宋体;"><strong>验收记录</strong></span></p>
</td>
<td style="line-height: 2;" colspan="3"><span style="font-family: 宋体;">1、外观是否完好：是<span style="font-family: 宋体;">□</span> &nbsp; 否<span style="font-family: 宋体;">□</span></span><br><span style="font-family: 宋体;">2、规格型号是否相符：是□ &nbsp; 否<span style="font-family: 宋体;">□</span></span><br><span style="font-family: 宋体;">3、配件数量是否一致：是<span style="font-family: 宋体;">□</span> &nbsp; 否<span style="font-family: 宋体;">□</span></span><br><span style="font-family: 宋体;">4、参数配置是否一致：是<span style="font-family: 宋体;">□</span> &nbsp; 否<span style="font-family: 宋体;">□</span></span><br><span style="font-family: 宋体;">5、整机现在是否运行正常：是<span style="font-family: 宋体;">□</span> &nbsp; 否<span style="font-family: 宋体;">□</span></span><br><span style="font-family: 宋体;">6、操作教育是否完成：是<span style="font-family: 宋体;">□</span> &nbsp; 否<span style="font-family: 宋体;">□</span></span></td>
</tr>
<tr style="height: 46.125px;">
<td style="line-height: 1.5;"><span style="font-family: 宋体;"><strong>验收结论</strong></span></td>
<td style="line-height: 1.5;"><span style="font-family: 宋体;">合格<span style="font-family: 宋体;">□</span>&nbsp; &nbsp; 不合格<span style="font-family: 宋体;">□</span></span></td>
<td style="line-height: 1.5;"><span style="font-family: 宋体;"><strong>待解诀问题</strong></span></td>
<td style="line-height: 1.5;"><span style="font-family: 宋体;">有<span style="font-family: 宋体;">□</span>(附后) &nbsp; &nbsp; &nbsp;无<span style="font-family: 宋体;">□</span></span></td>
</tr>
</tbody>
</table>
<table style="border-collapse: collapse; width: 99.9865%;" border="1"><colgroup><col style="width: 24.9646%;"><col style="width: 24.9646%;"><col style="width: 24.9646%;"><col style="width: 24.9646%;"></colgroup>
<tbody>
<tr>
<td style="text-align: center;" valign="top" nowrap="nowrap" width="160">
<p><span style="font-family: 宋体;">采购</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
<td style="text-align: center;" valign="top" nowrap="nowrap" width="160">
<p><span style="font-family: 宋体;">使用科室负责人</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
<td style="text-align: center;" valign="top" nowrap="nowrap" width="160">
<p><span style="font-family: 宋体;">设备管理员</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
<td style="text-align: center;" valign="top" nowrap="nowrap" width="160">
<p><span style="font-family: 宋体;">安装工程师</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p class="MsoNormal" align="right">&nbsp;</p>
<p class="MsoNormal" align="right">&nbsp;</p>
<p class="MsoNormal" align="right"><span style="font-family: 宋体;"><span style="font-family: 宋体;">&nbsp;安装日期：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日</span> &nbsp; &nbsp;</span></p>` },
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
