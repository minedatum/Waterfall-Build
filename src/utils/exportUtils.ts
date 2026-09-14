import { WaterfallRow, AuditLogEntry } from '../types';
import { formatDateDisplay, formatDateTimeDisplay } from './workingDays';

// Trigger browser download of a file
function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Convert data to CSV format
export function exportWaterfallToCsv(rows: WaterfallRow[], fileName = 'Waterfall_Rows.csv') {
  const headers = [
    'Step #',
    'WFID#',
    'Step Rationale',
    'Business Requirements',
    'Dataset Location',
    'Exclude Count Case Level',
    'Include Count Case Level',
    'Unique Level Count',
    'Optional Notes',
    'Start Date',
    'End Date',
    'Days Count',
    'Status',
    'Rule Reference',
    'Assigned Analyst',
    'FRC Owner',
  ];

  const lines = rows.map((r) => [
    r.stepNumber,
    `"${r.id}"`,
    `"${(r.rationale || '').replace(/"/g, '""')}"`,
    `"${(r.businessRequirements || '').replace(/"/g, '""')}"`,
    `"${(r.datasetLocation || '').replace(/"/g, '""')}"`,
    r.excludeCount,
    r.includeCaseCount,
    r.includeUniqueAccountCount,
    `"${(r.notes || '').replace(/"/g, '""')}"`,
    r.startDate,
    r.endDate,
    r.workingDays,
    `"${r.status}"`,
    `"${r.ruleReference || ''}"`,
    `"${r.assignedAnalyst || ''}"`,
    `"${r.frcOwner || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...lines.map((l) => l.join(','))].join('\r\n');
  downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
}

// Export formatted Excel table (.xls)
export function exportWaterfallToExcel(rows: WaterfallRow[], fileName = 'Waterfall_Rows.xls') {
  const tableRows = rows
    .map(
      (r) => `
    <tr>
      <td style="font-family:monospace; font-weight:bold; text-align:center;">${r.id}</td>
      <td>${escapeHtml(r.rationale)}</td>
      <td>${escapeHtml(r.businessRequirements || '')}</td>
      <td style="font-family:monospace; font-size:10pt;">${escapeHtml(r.datasetLocation || '')}</td>
      <td style="text-align:right; font-weight:bold; color:#be123c;">${r.excludeCount.toLocaleString()}</td>
      <td style="text-align:right; font-weight:bold; color:#047857;">${r.includeCaseCount.toLocaleString()}</td>
      <td style="text-align:right; font-weight:bold;">${r.includeUniqueAccountCount.toLocaleString()}</td>
      <td>${escapeHtml(r.notes || '')}</td>
      <td style="text-align:center; font-weight:bold; color:#1d4ed8;">${r.workingDays}</td>
      <td style="text-align:center; background-color:${getStatusColor(r.status)};">${r.status.toUpperCase()}</td>
      <td style="font-family:monospace;">${r.ruleReference}</td>
    </tr>`
    )
    .join('');

  const excelXml = `
  <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if gte mso 9]>
    <xml>
      <x:ExcelWorkbook>
        <x:ExcelWorksheets>
          <x:ExcelWorksheet>
            <x:Name>eGRC Waterfall Steps</x:Name>
            <x:WorksheetOptions>
              <x:DisplayGridlines/>
            </x:WorksheetOptions>
          </x:ExcelWorksheet>
        </x:ExcelWorksheets>
      </x:ExcelWorkbook>
    </xml>
    <![endif]-->
    <style>
      body { font-family: Calibri, Arial, sans-serif; }
      th { background-color: #1e293b; color: #ffffff; padding: 8px; border: 1px solid #cbd5e1; }
      td { padding: 6px; border: 1px solid #e2e8f0; font-size: 11pt; }
    </style>
  </head>
  <body>
    <h2>eGRC Requirements Waterfall - Population Scoping & Analytics</h2>
    <p>Export Date: ${new Date().toLocaleString()} | Target Drive: H:\\My Drive\\Waterfall</p>
    <table>
      <thead>
        <tr>
          <th>Step</th>
          <th>ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Rule Ref</th>
          <th>Status</th>
          <th>Step Rationale</th>
          <th>Exclude Count</th>
          <th>Include Cases</th>
          <th>Unique Accounts</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Working Days</th>
          <th>Assigned Analyst</th>
          <th>FRC Owner</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  </body>
  </html>`;

  downloadFile(excelXml, fileName, 'application/vnd.ms-excel');
}

// Export Audit Logs to CSV
export function exportAuditLogsToCsv(logs: AuditLogEntry[], fileName = 'Audit_Activity_Log.csv') {
  const headers = ['Log ID', 'Timestamp', 'User', 'Role', 'Action', 'Target Row', 'Details'];
  const lines = logs.map((l) => [
    `"${l.id}"`,
    `"${l.timestamp}"`,
    `"${l.user}"`,
    `"${l.role}"`,
    `"${l.action.replace(/"/g, '""')}"`,
    `"${l.rowId || ''}"`,
    `"${(l.details || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...lines.map((l) => l.join(','))].join('\r\n');
  downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
}

// Export Audit Logs to Excel
export function exportAuditLogsToExcel(logs: AuditLogEntry[], fileName = 'Audit_Activity_Log.xls') {
  const tableRows = logs
    .map(
      (l) => `
    <tr>
      <td style="font-family:monospace;">${l.id}</td>
      <td>${formatDateTimeDisplay(l.timestamp)}</td>
      <td style="font-weight:bold;">${escapeHtml(l.user)}</td>
      <td style="background-color:${l.role === 'FRC Owner' ? '#f0fdf4' : '#eff6ff'}; font-weight:bold;">${l.role}</td>
      <td style="font-weight:bold;">${escapeHtml(l.action)}</td>
      <td style="font-family:monospace; text-align:center;">${l.rowId || '—'}</td>
      <td>${escapeHtml(l.details)}</td>
    </tr>`
    )
    .join('');

  const excelXml = `
  <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if gte mso 9]>
    <xml>
      <x:ExcelWorkbook>
        <x:ExcelWorksheets>
          <x:ExcelWorksheet>
            <x:Name>Activity Audit Log</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
          </x:ExcelWorksheet>
        </x:ExcelWorksheets>
      </x:ExcelWorkbook>
    </xml>
    <![endif]-->
    <style>
      body { font-family: Calibri, Arial, sans-serif; }
      th { background-color: #0f172a; color: #ffffff; padding: 8px; border: 1px solid #334155; }
      td { padding: 6px; border: 1px solid #e2e8f0; font-size: 11pt; }
    </style>
  </head>
  <body>
    <h2>Consolidated Activity Audit Log - eGRC Requirements</h2>
    <p>Export Date: ${new Date().toLocaleString()} | Target Drive: H:\\My Drive\\Waterfall</p>
    <table>
      <thead>
        <tr>
          <th>Log ID</th>
          <th>Timestamp</th>
          <th>User</th>
          <th>Role</th>
          <th>Action</th>
          <th>Target Row</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  </body>
  </html>`;

  downloadFile(excelXml, fileName, 'application/vnd.ms-excel');
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'signed_off':
      return '#dcfce7'; // green-100
    case 'in_analysis':
      return '#fef3c7'; // amber-100
    case 'ready_for_review':
      return '#e0e7ff'; // indigo-100
    case 'submitted':
      return '#dbeafe'; // blue-100
    default:
      return '#f1f5f9'; // slate-100
  }
}
