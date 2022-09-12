/* eslint-disable @typescript-eslint/no-explicit-any */
// import DAY from "dayjs";

// const showDate = (n?: number) => {
//   if (!n) return "";
//   return DAY(n * 1000).format("YYYY-MM-DD");
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (item: any[]) => {
  /** 打開新視窗，並且準備列印 */
  const printWindow = window.open("", "", "height=800,width=800");
  printer(printWindow, item);
  printWindow?.print();
};

const style =
  '<style type="text/css">\
  @page {\n\
    size: A4 landscape;\n\
    margin: 0px;\n\
  }\n\
  table { border-collapse: collapse; border-spacing: 0px; margin-bottom: 0 }\n\
  .table,.table th, .table td { padding: 5px; border: 1px solid black; }\n\
  .table { border-top: 1px solid #333333; width: 100% }\n\
  th, .nw { white-space: nowrap }\n\
  tfoot, .text-end { text-align: right; } \n\
  .text-center { text-align: center; } \n\
  </style>';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function printer(printWindow: Window | null, item: any[]) {
  if (!printWindow) return;
  printWindow.document.write("<html><head><title>繳款單</title></head><body>");
  printWindow.document.write(style);

  printWindow.document.write(
    '<h2 style="text-align: center; padding: 1.5rem 0 0.5rem">繳款單</h2>'
  );
  const data = item[0] || {};

  printWindow.document.write(
    '<table style="position: absolute; right: .5rem; top: 1rem"><tbody>'
  );
  printWindow.document.write(
    `<tr><th class="text-end">繳款日期: </th><td style="padding-left: 0.5rem; vertical-align: bottom;"> ${data.p37_pfs_payment_date}</td></tr>`
  );
  printWindow.document.write(
    `<tr><th class="text-end">部門: </th><td style="padding-left: 0.5rem; vertical-align: bottom;"> ${data.dep}</td></tr>`
  );
  printWindow.document.write(
    `<tr><th class="text-end">員工: </th><td style="padding-left: 0.5rem; vertical-align: bottom;"> ${
      data.p9_hmr_serial_number + " - " + data.p9_hmr_name
    }</td></tr>`
  );
  printWindow.document.write("</tbody></table>");

  setTable(item);
  printWindow.document.write(
    '<table class="table"><tbody>\
    <tr><td colspan="2" style="height: 4rem">備註：</td></tr>\
    <tr><td class="text-center" style="width: 50%">會 計</td><td class="text-center">繳 款 人</td></tr>\
    <tr><td style="height: 4rem"></td><td></td></tr>\
    </tbody></table>'
  );

  printWindow.document.write("</body></html>");
  printWindow.document.write(
    "<span>◎若有折讓，須上EIP企業資訊 申請單填寫</span>"
  );
  printWindow.document.write(
    '<span class="text-end" style="padding-top: 0.5rem; float: right;"><small>FD-201603-001-1</small></span>'
  );

  printWindow.document.close();
  printWindow.print();

  /** 產生繳款單 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setTable(items: any[]) {
    if (!printWindow) return;

    printWindow.document.write('<table class="table">');
    printWindow.document.write(
      "<thead><tr>\
    <th>客戶名稱</th>\
    <th>客戶編號</th>\
    <th>銷貨單號</th>\
    <th>現金</th>\
    <th>支票</th>\
    <th>支票號碼</th>\
    <tr></thead>"
    );

    printWindow.document.write("<tbody>");

    printWindow.document.write("</tbody>");

    printWindow.document.write("<tfoot>");
    printWindow.document.write(
      '<tr><td class="text-end" colspan="3">總計</td>'
    );
    printWindow.document.write(`<td class="text-end">9</td>`);
    printWindow.document.write(`<td class="text-end">9</td>`);
    printWindow.document.write("<td></td></tr>");
    printWindow.document.write("</tfoot>");
    printWindow.document.write("</table>");
  }
}
