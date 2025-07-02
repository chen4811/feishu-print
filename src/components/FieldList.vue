<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import { Document, Plus, Edit, Calendar, Check, User, Paperclip, Link, Phone, Location, Stopwatch, Star, Opportunity, Connection, ChatDotRound, List, Coin, ScaleToOriginal, Tickets, Grid, Picture, Message, Key, DataLine, Setting, More } from '@element-plus/icons-vue';
import { bitable, FieldType } from '@lark-base-open/js-sdk';

const fieldList = ref<any[]>([]);

const props = defineProps({
  isReadonly: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['insert-field']);

const insertField = (field: any) => {
  if (props.isReadonly) {
    ElMessage({
      message: '请先打开编辑模式',
      type: 'error',
    });
    return;
  }
  emit('insert-field', field);
};

onMounted(async () => {
  try {
    const table = await bitable.base.getActiveTable();
    const view = await table.getActiveView(); // Get the active view
    const fieldMetaList = await view.getFieldMetaList(); // Get fields from the view for ordering
    fieldList.value = fieldMetaList;
    console.log('Fields loaded in FieldList.vue (ordered by view):', fieldList.value);
  } catch (error) {
    console.error('Error loading fields in FieldList.vue:', error);
    // Consider emitting an event or using a shared state for error handling
  }
});
</script>

<template>
  <el-scrollbar>
    <el-menu>
      <!--<el-menu-item v-for="field in fieldList" :key="field.id" :index="field.id" class="scrollbar-item">-->
      <el-menu-item v-for="field in fieldList" :key="field.id" class="scrollbar-item">
        <el-icon class="field-type-icon">
          <template v-if="field.type === FieldType.Attachment">
            <Picture />
          </template>
          <template v-else>
            <Edit />
          </template>
        </el-icon>
        <span @click.stop="insertField(field)">{{ field.name }}</span>
        <el-icon class="insert-icon" @click.stop="insertField(field)"><Plus /></el-icon>
      </el-menu-item>
    </el-menu>
    <div v-if="!fieldList.length" style="width: inherit;">
      <span
        style="display: flex;  justify-content: center; /* 水平居中 */  align-items: center; /* 垂直居中 */  height: 50vh; /* 确保父容器占满视口高度 */">
        <el-icon :size="20">
          <WarningFilled />
        </el-icon><br>
        正在加载字段列表或没有获取到字段...</span>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-item {
  display: flex;
  align-items: center;
  padding: 0 10px !important;
  height: 40px;
  margin: 5px 10px;
  border-radius: 4px;
  background-color: #f0f2f5;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.scrollbar-item .el-icon {
  margin-right: 5px;
}
.field-type-icon {
  font-size: 16px;
  vertical-align: middle;
}

.scrollbar-item span {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scrollbar-item:hover {
  background-color: #d9ecff;
  color: #409eff;
}
/*
.scrollbar-item.is-active {
  background-color: #d9ecff;
  color: #409eff;
}
  */
.insert-icon {
  margin-left: auto;
  visibility: hidden;
}
.scrollbar-item:hover .insert-icon {
  visibility: visible;
}
.el-menu--vertical {
  border-right: none;
}

</style>