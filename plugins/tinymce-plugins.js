import html2pdf from "html2pdf.js";

// export function registerButtons(editor, getPrintSettings) {
//   editor.ui.registry.addButton("exportPDF", {
//     icon: "export-pdf",
//     tooltip: "导出PDF",
//     context: "mode:readonly",
//     onAction() {
//       if (this.isEdited) {
//         this.showNotification(editor, "请先套用模板才能导出 PDF！", "warning");
//         return;
//       }

//       const pdfName = prompt("请输入想要导出 PDF 文件名", "sample.pdf");

//       const content = editor.getContent();
//       const printSettings = getPrintSettings();

//       html2pdf()
//         .from(content)
//         .set({
//           margin: [
//             printSettings.marginTop,
//             printSettings.marginRight,
//             printSettings.marginBottom,
//             printSettings.marginLeft,
//           ],
//           filename: pdfName,
//           html2canvas: { scale: 2 },
//           jsPDF: {
//             orientation: printSettings.orientation,
//             unit: "mm",
//             format: "a4",
//           },
//         })
//         .save()
//         .then(() => {
//           this.showNotification(editor, "PDF 导出成功！", "success");
//         });
//     },
//   });
// }

tinymce.PluginManager.add('exportpdf', (editor, url) => {
  // 注册自定义按钮（如 newprint/exportpdf）
  editor.ui.registry.addButton('exportpdf', {
    text: '',
    icon: 'export-pdf',
    tooltip: '导出PDF',
    onAction: () => {
      // 注意：这里需要获取到 printSettings 的方式，可能需要通过 editor 的 settings 或其他方式传递
      // 暂时使用一个 placeholder
      const printSettings = editor.getParam('printSettings', {}); // 假设 printSettings 通过参数传递

      const pdfName = prompt("请输入想要导出 PDF 文件名", "sample.pdf");

      const content = editor.getContent();

      html2pdf()
        .from(content)
        .set({
          margin: [
            printSettings.marginTop || 10,
            printSettings.marginRight || 10,
            printSettings.marginBottom || 10,
            printSettings.marginLeft || 10,
          ],
          filename: pdfName,
          html2canvas: { scale: 2 },
          jsPDF: {
            orientation: printSettings.orientation || 'portrait',
            unit: "mm",
            format: "a4",
          },
        })
        .save();
    }
  });

  return { // 返回插件信息
    getMetadata: () => ({
      name: 'Export PDF plugin',
      url: 'http://example.com/exportpdf-plugin'
    })
  };
});
