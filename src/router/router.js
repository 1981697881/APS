export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  'basic': () => import('@/layout'),
  'framework': () => import('@/views/basic/framework'),
  'material': () => import('@/views/basic/material'),
  'clerk': () => import('@/views/basic/clerk'),
  'supplier': () => import('@/views/basic/supplier'),
  'inventory': () => import('@/views/basic/inventory'),
  'resources': () => import('@/views/basic/resources'),
  'regulation': () => import('@/views/basic/regulation'),
  'barcode': () => import('@/views/basic/barcode'),

  'prepare': () => import('@/views/production/prepare'),
  'scheduling': () => import('@/views/production/scheduling'),
  'sboard': () => import('@/views/production/sboard'),
  'efficiency': () => import('@/views/production/efficiency'),

  'procurement': () => import('@/views/warehouse/procurement'),
  'recipients': () => import('@/views/warehouse/recipients'),
  'movingframe': () => import('@/views/warehouse/movingframe'),
  'adjust': () => import('@/views/warehouse/adjust'),
  'storageBin': () => import('@/views/warehouse/storageBin'),
  'libraryStatistics': () => import('@/views/warehouse/libraryStatistics'),
  'outboundStatistics': () => import('@/views/warehouse/outboundStatistics'),
  'laborMonitoring': () => import('@/views/warehouse/laborMonitoring'),
  'deliveryOrderBoard': () => import('@/views/warehouse/deliveryOrderBoard'),
  'shipmentBoard': () => import('@/views/warehouse/shipmentBoard'),
  'receivingBoard': () => import('@/views/warehouse/receivingBoard'),
  'locationBoard': () => import('@/views/warehouse/locationBoard'),

  'sales': () => import('@/views/aftermarket/sales'),
  'shipping': () => import('@/views/aftermarket/shipping'),
  'inVoorraad': () => import('@/views/aftermarket/inVoorraad'),
  'auftragslage': () => import('@/views/aftermarket/auftragslage'),

  'shift': () => import('@/views/attendance/shift'),
  'arrange': () => import('@/views/attendance/arrange'),
  'salary': () => import('@/views/attendance/salary'),

  'users': () => import('@/views/system/users'),
  'journal': () => import('@/views/system/journal'),
  'notice': () => import('@/views/system/notice'),
  'board': () => import('@/views/system/board'),
}
