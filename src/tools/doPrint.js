import {getLodop} from '@/tools/LodopFuncs'

const PrintAccount = (qrTitle, codetype, url, code) => {
  let qrAccount = `${url}/#/?type=${codetype}&code=${code}`
  // 调用打印对象
  LODOP = getLodop()
  // 序号
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
  // 序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '100*70标签');
  LODOP.SET_PRINT_PAGESIZE(1, '100mm', '70mm', '');
  //表格线
  LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
  //上横线
  LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
  // 最左竖线
  LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
  // 最右竖线
  LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
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
  LODOP.ADD_PRINT_LINE('24.3mm', '2mm', '24.3mm', '96mm', 0, 1);
  //第二行横线
  LODOP.ADD_PRINT_LINE('45.6mm', '2mm', '45.6mm', '96mm', 0, 1);
  //中间第一竖线
  LODOP.ADD_PRINT_LINE('3mm', '19mm', '67mm', '19mm', 0, 1);
  //中间第二竖线
  LODOP.ADD_PRINT_LINE('24.3mm', '47.5mm', '67mm', '47.5mm', 0, 1);
  //中间第三竖线
  LODOP.ADD_PRINT_LINE('24.3mm', '66.5mm', '67mm', '66.5mm', 0, 1);
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
  LODOP.ADD_PRINT_LINE('3mm', '2mm', '3mm', '96mm', 0, 1);
  //上横线
  LODOP.ADD_PRINT_LINE('3mm', '2mm', '67mm', '2mm', 0, 1);
  // 最左竖线
  LODOP.ADD_PRINT_LINE('3mm', '96mm', '67mm', '96mm', 0, 1);
  // 最右竖线
  LODOP.ADD_PRINT_LINE('67mm', '2mm', '67mm', '96mm', 0, 1);
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
  LODOP.ADD_PRINT_LINE('15.8mm', '2mm', '15.8mm', '62.8mm', 0, 1);
  //第二行横线
  LODOP.ADD_PRINT_LINE('28.6mm', '2mm', '28.6mm', '62.8mm', 0, 1);
  //第三行横线
  LODOP.ADD_PRINT_LINE('41.4mm', '2mm', '41.4mm', '62.8mm', 0, 1);
  //第四行横线
  LODOP.ADD_PRINT_LINE('54.2mm', '2mm', '54.2mm', '62.8mm', 0, 1);
  //中间第一竖线
  LODOP.ADD_PRINT_LINE('3mm', '25.2mm', '67mm', '25.2mm', 0, 1);
  //中间第二竖线
  LODOP.ADD_PRINT_LINE('3mm', '62.8mm', '67mm', '62.8mm', 0, 1);
}
const PrintSchedule = (data, codetype, url, code) => {
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        //全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }

  let fenyeSize = 0;
  let num = 2
  LODOP.SET_PRINT_PAGESIZE(2, '297mm', '210mm', "");//一开始用的是像素，后来都改成用mm为单位
  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
  LODOP.SET_PRINT_STYLEA(0, 'AngleOfPageInside', 90);
  //动态列表信息
  let trheight = 9;//用于每个竖线距离上面的固定长度
  let thHeight = 11;//用于每行距离上面的固定长度47.98
  let newHeight = 0;//用于动态增加一行的长度
  let lastSize = 0;//分页前的那个下标
  let lastheght = 2;
  let size = 10;
  let extendSize = 0;
  let table_hegth = (size + 1) * 25;
  let fonsize = 4;

  //标题等
  LODOP.ADD_PRINT_TEXT('4.15mm', '1mm', '11mm', '5.37mm', '序号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '10mm', '25mm', '5.37mm', '订单日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '35mm', '25mm', '5.37mm', '订单号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '60mm', '25mm', '5.37mm', '排产单号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '85mm', '30mm', '5.37mm', '项目名称');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '115mm', '20mm', '5.37mm', '色号/旧料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '135mm', '9mm', '5.37mm', '订单数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '144mm', '9mm', '5.37mm', '计划数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '153mm', '9mm', '5.37mm', '完工数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '162mm', '20mm', '5.37mm', '计划日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '182mm', '18mm', '5.37mm', '产品分类');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('1.55mm', '200mm', '9mm', '5.37mm', '生产设备');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '209mm', '25mm', '5.37mm', '生产类型');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '233mm', '16mm', '5.37mm', '生产状态');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('4.15mm', '248mm', '20mm', '5.37mm', '备注');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  //表格线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '268.55mm', 0, 1);// 最上条标题横线
  LODOP.ADD_PRINT_LINE('9.31mm', '1mm', '9.31mm', '268.55mm', 0, 1);// 标题下横线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '9.11mm', '1mm', 0, 1);// 最左竖线
  //添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
  LODOP.ADD_PRINT_LINE('1mm', '10mm', '9.11mm', '10mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '35mm', '9.11mm', '35mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '60mm', '9.11mm', '60mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '85mm', '9.11mm', '85mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '115mm', '9.11mm', '115mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '135mm', '9.11mm', '135mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '144mm', '9.11mm', '144mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '153mm', '9.11mm', '153mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '162mm', '9.11mm', '162mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '182mm', '9.11mm', '182mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '200mm', '9.11mm', '200mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '209mm', '9.11mm', '209mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '234mm', '9.11mm', '234mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '248mm', '9.11mm', '248mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '268mm', '9.11mm', '268mm', 0, 1);
  for (let k = 0; k < data.length; k++) {
    let allProductNumber = 0;
    let aaa = '1234567890';
    let bbb = '1234567890';
    let ccc = '1234567';
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    let SizeTmpt = parseInt(getByteLen(aaa) / 35);
    if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(bbb) / 16);
    }
    if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(ccc) / 17);
    }
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '25mm', '12mm', data[k].soDate);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '35mm', '25mm', '12mm', data[k].soNum);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '25mm', '12mm', data[k].taskNum);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '85mm', '30mm', '12mm', data[k].soName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '115mm', '21mm', '12mm', data[k].color);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '135mm', '9mm', '12mm', data[k].odPrNum);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '144mm', '9mm', '12mm', data[k].allocatedNum);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '153mm', '9mm', '12mm', data[k].productionQuantity);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '162mm', '20mm', '12mm', data[k].productionDate);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '182mm', '18mm', '12mm', '123');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '200mm', '9mm', '12mm', data[k].plName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '209mm', '25mm', '12mm', data[k].productionType);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '234mm', '16mm', '12mm', data[k].allocatedStatus);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '248mm', '20mm', '12mm', data[k].remark);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

    extendSize += SizeTmpt;
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    if (k == lastSize + 1 && k != 1) {
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', 0, 1);//每条数据后加一横线
    }

    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 5.37 + 'mm', '1mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 5.37 + 'mm', '10mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '35mm', trheight + newHeight + 5.37 + 'mm', '35mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 5.37 + 'mm', '60mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '85mm', trheight + newHeight + 5.37 + 'mm', '85mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '115mm', trheight + newHeight + 5.37 + 'mm', '115mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '135mm', trheight + newHeight + 5.37 + 'mm', '135mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '144mm', trheight + newHeight + 5.37 + 'mm', '144mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '153mm', trheight + newHeight + 5.37 + 'mm', '153mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '162mm', trheight + newHeight + 5.37 + 'mm', '162mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '182mm', trheight + newHeight + 5.37 + 'mm', '182mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 5.37 + 'mm', '200mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '209mm', trheight + newHeight + 5.37 + 'mm', '209mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '234mm', trheight + newHeight + 5.37 + 'mm', '234mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '248mm', trheight + newHeight + 5.37 + 'mm', '248mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '268mm', trheight + newHeight + 5.37 + 'mm', '268mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 'mm', '1mm', trheight + newHeight + 5.57 + 'mm', '268mm', 0, 1);//每条数据后加一横线
    if ((trheight + newHeight + 5.57) % fenyeSize <= fenyeSize && (trheight + 5.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
      LODOP.NewPage();
      thHeight = 0.67;
      lastSize = k;
      trheight = 0;
      extendSize = 0;
    }
    table_hegth = trheight + newHeight + 5.57;
    // 最下显示订单信息
    let moneyWeight = 0;
    if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
      LODOP.NewPage();
      lastheght = 0;
      table_hegth = 0;
    }
  }
}
const PrintSemi = (data, codetype, url, code) => {
  console.log(data)
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        //全角
        len += 2;
      } else {
        len += 1;
      }

    }
    return len;
  }

  let fenyeSize = 0;
  let num = 2
  LODOP.SET_PRINT_PAGESIZE(1, '210mm', '297mm', 'A4');//一开始用的是像素，后来都改成用mm为单位
  //动态列表信息
  let trheight = 13.5;//用于每个竖线距离上面的固定长度
  let thHeight = 15;//用于每行距离上面的固定长度47.98
  let newHeight = 0;//用于动态增加一行的长度
  let lastSize = 0;//分页前的那个下标
  let lastheght = 2;
  let size = 10;
  let extendSize = 0;
  let table_hegth = (size + 1) * 25;
  let fonsize = 4;

  //标题等
  LODOP.ADD_PRINT_TEXT('6.15mm', '1mm', '11mm', '5.37mm', '序号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('3.15mm', '10mm', '50mm', '5.37mm', '计划日期');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('9.15mm', '10mm', '50mm', '5.37mm', '生产设备');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('3.15mm', '60mm', '140mm', '5.37mm', data[0].productionDate0);
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('9.15mm', '60mm', '40mm', '5.37mm', '旧料号');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('9.15mm', '100mm', '20mm', '5.37mm', '数量');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('9.15mm', '120mm', '40mm', '5.37mm', '生产状态');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('9.15mm', '160mm', '40mm', '5.37mm', '任务警示');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

  // 表格线
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '1mm', '201.55mm', 0, 1);// 最上条标题横线
  LODOP.ADD_PRINT_LINE('7.31mm', '10mm', '7.31mm', '201.55mm', 0, 1);// 标题下横线1
  LODOP.ADD_PRINT_LINE('13.62mm', '1mm', '13.62mm', '201.55mm', 0, 1);// 标题下横线2
  LODOP.ADD_PRINT_LINE('1mm', '1mm', '13.62mm', '1mm', 0, 1);// 最左竖线
  // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
  LODOP.ADD_PRINT_LINE('1mm', '10mm', '13.11mm', '10mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '60mm', '13.11mm', '60mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '100mm', '13.11mm', '100mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '120mm', '13.11mm', '120mm', 0, 1);
  LODOP.ADD_PRINT_LINE('8mm', '160mm', '13.11mm', '160mm', 0, 1);
  LODOP.ADD_PRINT_LINE('1mm', '201mm', '13.22mm', '201mm', 0, 1);
  for (let k = 0; k < data.length; k++) {
    let allProductNumber = 0;
    let aaa = '1234567890';
    let bbb = '1234567890';
    let ccc = '1234567';
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    let SizeTmpt = parseInt(getByteLen(aaa) / 35);
    if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(bbb) / 16);
    }
    if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(ccc) / 17);
    }
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '11mm', '9mm', parseInt(1 + k));
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '10mm', '50mm', '12mm', data[k].plName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '60mm', '40mm', '12mm', data[k].oldCode0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '100mm', '20mm', '12mm', data[k].allocatedNum0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '120mm', '40mm', '12mm', data[k].allocatedStatus0);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '160mm', '40mm', '12mm', '');
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);

    extendSize += SizeTmpt;
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize;
    if (k == lastSize + 1 && k != 1) {
      LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight - SizeTmpt * fonsize + 'mm', '201mm', 0, 1);//每条数据后加一横线
    }

    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 5.37 + 'mm', '1mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '10mm', trheight + newHeight + 5.37 + 'mm', '10mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '60mm', trheight + newHeight + 5.37 + 'mm', '60mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '100mm', trheight + newHeight + 5.37 + 'mm', '100mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '120mm', trheight + newHeight + 5.37 + 'mm', '120mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '160mm', trheight + newHeight + 5.37 + 'mm', '160mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '201mm', trheight + newHeight + 5.37 + 'mm', '201mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 'mm', '1mm', trheight + newHeight + 5.57 + 'mm', '201mm', 0, 1);//每条数据后加一横线
    if ((trheight + newHeight + 5.57) % fenyeSize <= fenyeSize && (trheight + 5.57 + newHeight) % fenyeSize >= (fenyeSize - 15)) {
      LODOP.NewPage();
      thHeight = 0.67;
      lastSize = k;
      trheight = 0;
      extendSize = 0;
    }
    table_hegth = trheight + newHeight + 5.57;
    // 最下显示订单信息
    let moneyWeight = 0;
    if ((lastheght + table_hegth + 5) % fenyeSize <= fenyeSize && (lastheght + table_hegth + 5) % fenyeSize >= (fenyeSize - 6)) {
      LODOP.NewPage();
      lastheght = 0;
      table_hegth = 0;
    }
  }
}
export {PrintAccount, PrintTwo, PrintThree, PrintSchedule, PrintSemi}
