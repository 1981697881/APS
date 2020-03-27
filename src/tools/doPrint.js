import { getLodop } from '@/tools/LodopFuncs'

const PrintAccount = (qrTitle, codetype, url, code) => {
  let qrAccount = `${url}/#/?type=${codetype}&code=${code}`
  // 调用打印对象
  LODOP = getLodop()
  //序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '成品_自有产品标签');
  LODOP.SET_PRINT_PAGESIZE(1, '95mm', '65mm', '');
/*  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
  LODOP.SET_PRINT_STYLEA(2, 'AngleOfPageInside', 180);*/
  LODOP.SET_PRINT_STYLE('FontSize', 16);
  LODOP.ADD_PRINT_TEXT('1mm', '25mm', '50mm', '10mm', '石材调专用底漆');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13mm', '17mm', '50mm', '10mm', 'SDQ-B05209');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
  LODOP.ADD_PRINT_BARCODE('11mm', '75mm', '13mm', '13mm', 'QRCode', qrAccount)
  LODOP.SET_PRINT_STYLE('FontSize', 10);
  LODOP.ADD_PRINT_TEXT('22mm', '17mm', '29mm', '10mm', 'HG/T 4343-2012');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('26mm', '17mm', '29mm', '10mm', 'GB 24408-2009');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.SET_PRINT_STYLE('FontSize', 12);
  LODOP.ADD_PRINT_TEXT('23mm', '65mm', '30mm', '10mm', '不稀释');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '17mm', '29mm', '10mm', '2020-1-16');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '64mm', '30mm', '10mm', '01200116020');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('42mm', '17mm', '29mm', '10mm', ' 12个月');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('42mm', '65mm', '30mm', '10mm', ' 9kg');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.SET_PRINT_STYLE('FontSize', 10);
  LODOP.ADD_PRINT_TEXT('52mm', '17mm', '46mm', '10mm', '产地:上海');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('57mm', '17mm', '46mm', '10mm', ' 料号:610251.B009649P18');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

  // LODOP.ADD_PRINT_TEXT(159, 11, 163, 42, qrAccount)
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
}
const PrintTwo = (qrTitle, codetype, url, code) => {
  let qrAccount = `${url}/#/?type=${codetype}&code=${code}`
  // 调用打印对象
  LODOP = getLodop()
  //序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
  //表格线
  LODOP.ADD_PRINT_LINE("3mm", "2mm", "3mm", "96mm", 0, 1);
  //上横线
  LODOP.ADD_PRINT_LINE("3mm", "2mm", "67mm", "2mm", 0, 1);
  // 最左竖线
  LODOP.ADD_PRINT_LINE("3mm", "96mm", "67mm", "96mm", 0, 1);
  // 最右竖线
  LODOP.ADD_PRINT_LINE("67mm", "2mm", "67mm", "96mm", 0, 1);
  // 下横线
  LODOP.SET_PRINT_STYLE('FontSize', 14);
  LODOP.ADD_PRINT_TEXT('10mm', '2mm', '19mm', '10mm', '旧料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('10mm', '21mm', '45mm', '10mm', 'SDQ-B05209');
  LODOP.ADD_PRINT_BARCODE('6mm', '75mm', '21mm', '21mm', 'QRCode', qrAccount)
  LODOP.ADD_PRINT_TEXT('30mm', '2mm', '19mm', '10mm', '生产');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('36mm', '2mm', '19mm', '10mm', '日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '20mm', '30mm', '10mm', '2020-01-16');
  LODOP.ADD_PRINT_TEXT('33mm', '48.3mm', '19mm', '10mm', '批号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '67.3mm', '32mm', '10mm', '01200116021');


  LODOP.ADD_PRINT_TEXT('54mm', '2mm', '19mm', '10mm', '料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.SET_PRINT_STYLE('FontSize', 8);
  LODOP.ADD_PRINT_TEXT('56mm', '20mm', '30mm', '10mm', '650972.0000000P18');
  LODOP.SET_PRINT_STYLE('FontSize', 14);
  /*LODOP.ADD_PRINT_TEXT('53mm', '48.3mm', '19mm', '10mm', '净含量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);*/
  LODOP.ADD_PRINT_TEXT('51mm', '48.3mm', '19mm', '10mm', '每箱');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('57mm', '48.3mm', '19mm', '10mm', '数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.SET_PRINT_STYLE('FontSize', 16);
  LODOP.ADD_PRINT_TEXT('53mm', '65.3mm', '30mm', '10mm', ' 18kg');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  //第一行横线
  LODOP.ADD_PRINT_LINE("24.3mm", "2mm", "24.3mm", "96mm", 0, 1);
  //第二行横线
  LODOP.ADD_PRINT_LINE("45.6mm", "2mm", "45.6mm", "96mm", 0, 1);
  //中间第一竖线
  LODOP.ADD_PRINT_LINE("3mm", "19mm", "67mm", "19mm", 0, 1);
  //中间第二竖线
  LODOP.ADD_PRINT_LINE("24.3mm", "47.5mm", "67mm", "47.5mm", 0, 1);
  //中间第三竖线
  LODOP.ADD_PRINT_LINE("24.3mm", "66.5mm", "67mm", "66.5mm", 0, 1);
  // 最右竖线
}
const PrintThree = (qrTitle, codetype, url, code) => {
  let qrAccount = `${url}/#/?type=${codetype}&code=${code}`
  // 调用打印对象
  LODOP = getLodop()
  //序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
  //表格线
  LODOP.ADD_PRINT_LINE("3mm", "2mm", "3mm", "96mm", 0, 1);
  //上横线
  LODOP.ADD_PRINT_LINE("3mm", "2mm", "67mm", "2mm", 0, 1);
  // 最左竖线
  LODOP.ADD_PRINT_LINE("3mm", "96mm", "67mm", "96mm", 0, 1);
  // 最右竖线
  LODOP.ADD_PRINT_LINE("67mm", "2mm", "67mm", "96mm", 0, 1);
  // 下横线
  LODOP.ADD_PRINT_BARCODE('20mm', '63mm', '34mm', '34mm', 'QRCode', qrAccount)
  LODOP.SET_PRINT_STYLE('FontSize', 14);
  LODOP.ADD_PRINT_TEXT('7mm', '2mm', '24mm', '10mm', '旧料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('7mm', '26mm', '37mm', '10mm', 'SYL18G5C');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('20mm', '2mm', '24mm', '10mm', '料  号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('20mm', '26mm', '37mm', '10mm', '303YS2180501');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '2mm', '24mm', '10mm', '批  号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('33mm', '26mm', '37mm', '10mm', '01200116022');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('46mm', '2mm', '24mm', '10mm', '重  量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('46mm', '26mm', '37mm', '10mm', '18KG');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('59mm', '2mm', '24mm', '10mm', '入库日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('59mm', '26mm', '37mm', '10mm', '2020-01-16');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  //第一行横线
  LODOP.ADD_PRINT_LINE("15.8mm", "2mm", "15.8mm", "62.8mm", 0, 1);
  //第二行横线
  LODOP.ADD_PRINT_LINE("28.6mm", "2mm", "28.6mm", "62.8mm", 0, 1);
  //第三行横线
  LODOP.ADD_PRINT_LINE("41.4mm", "2mm", "41.4mm", "62.8mm", 0, 1);
  //第四行横线
  LODOP.ADD_PRINT_LINE("54.2mm", "2mm", "54.2mm", "62.8mm", 0, 1);
  //中间第一竖线
  LODOP.ADD_PRINT_LINE("3mm", "25.2mm", "67mm", "25.2mm", 0, 1);
  //中间第二竖线
  LODOP.ADD_PRINT_LINE("3mm", "62.8mm", "67mm", "62.8mm", 0, 1);
}
export { PrintAccount, PrintTwo, PrintThree }
