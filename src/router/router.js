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
  'storageLocation': () => import('@/views/basic/storageLocation'),

  'productionPlan': () => import('@/views/production'),
  'scheduling': () => import('@/views/production/scheduling'),
  'semiScheduling': () => import('@/views/production/semiScheduling'),
  'mcjScheduling': () => import('@/views/production/mcjScheduling'),
  'mcjSemiScheduling': () => import('@/views/production/mcjSemiScheduling'),
  'statistical': () => import('@/views/production'),
  'finishedEta': () => import('@/views/production/finishedEta'),
  'semiEta': () => import('@/views/production/semiEta'),
  'colorStatistical': () => import('@/views/production/colorStatistical'),
  'mcjSemi': () => import('@/views/production/mcjSemi'),
  'mcjEfficiency': () => import('@/views/production/mcjEfficiency'),
  'mcjFilling': () => import('@/views/production/mcjFilling'),
  'mcjPackaging': () => import('@/views/production/mcjPackaging'),
  'laborHourStatistical': () => import('@/views/production/laborHourStatistical'),
  'onTimeStatistical': () => import('@/views/production/onTimeStatistical'),
  'spectaculars': () => import('@/views/production'),
  'automaticBoard': () => import('@/views/production/automaticBoard'),
  'manualBoard': () => import('@/views/production/manualBoard'),
  'PCKBoard': () => import('@/views/production/PCKBoard'),
  'mcjBoard': () => import('@/views/production/mcjBoard'),
  'baseBoard': () => import('@/views/production/baseBoard'),
  'colorStoneBoard': () => import('@/views/production/colorStoneBoard'),
  'mcjBaseBoard': () => import('@/views/production/mcjBaseBoard'),
  'mcjPaletteBoard': () => import('@/views/production/mcjPaletteBoard'),
  'mcjFillingBoard': () => import('@/views/production/mcjFillingBoard'),
  'sboard': () => import('@/views/production/sboard'),
  'efficiency': () => import('@/views/production/efficiency'),
  'salesPlanning': () => import('@/views/production/salesPlanning'),
  'safetyStock': () => import('@/views/production/safetyStock'),

  'procurement': () => import('@/views/warehouse/procurement'),
  'recipients': () => import('@/views/warehouse/recipients'),
  'logisticsQuery': () => import('@/views/production'),
  'logisticsStatistical': () => import('@/views/warehouse'),
  'logisticsBoard': () => import('@/views/warehouse'),
  'logisticsPlan': () => import('@/views/warehouse'),
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
  'homework': () => import('@/views/warehouse/homework'),
  'monthly': () => import('@/views/warehouse/monthly'),

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
