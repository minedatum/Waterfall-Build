import React, { useRef, useState } from 'react';
import {
  FolderUp,
  RotateCcw,
  Download,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FolderSync,
  FileCheck,
  Sparkles,
  ExternalLink,
  History,
  Briefcase,
  UserCheck,
  Share2,
  Check,
  PlayCircle,
} from 'lucide-react';
import { ProjectAuditReport, UserRole } from '../types';

interface HeaderProps {
  report: ProjectAuditReport;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenAuditLogs: () => void;
  auditLogsCount: number;
  onFilesSelected: (files: FileList) => void;
  onLoadSample: () => void;
  onOpenRules: () => void;
  onOpenExport: () => void;
  onOpenScaffold: () => void;
  isUsingSample: boolean;
  folderName: string;
  onResetToCleanSlate?: () => void;
  onLoadSampleDemo?: () => void;
  waterfallRowsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  report,
  userRole,
  onRoleChange,
  onOpenAuditLogs,
  auditLogsCount,
  onFilesSelected,
  onLoadSample,
  onOpenRules,
  onOpenExport,
  onOpenScaffold,
  isUsingSample,
  folderName,
  onResetToCleanSlate,
  onLoadSampleDemo,
  waterfallRowsCount = 0,
}) => {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const filesInputRef = useRef<HTMLInputElement>(null);
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyDemoLink = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleOpenNewTab = () => {
    const url = window.location.href;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <header id="header-waterfall-auditor" className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Target Path - Hidden in Analyst view for clean leadership demo */}
        {userRole !== 'analyst' && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shrink-0 shadow-xs">
              <FolderSync className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                  eGRC Requirements Waterfall
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-stone-100 text-stone-700 border border-stone-200">
                  H:\My Drive\Waterfall
                </span>
              </div>
              <p className="text-xs text-stone-500 truncate max-w-md">
                Parallel Dual-Persona Workspace &amp; Governance Traceability
              </p>
            </div>
          </div>
        )}

        {/* Dual-Role View Segmented Toggle (View / Mode) */}
        <div className={`flex items-center ${userRole === 'analyst' ? '' : 'justify-center'}`}>
          <div
            id="role-toggle-container"
            className="inline-flex rounded-xl border border-stone-300 bg-stone-100 p-1 shadow-inner text-xs font-semibold"
          >
            <button
              type="button"
              id="role-btn-frc"
              onClick={() => onRoleChange('frc')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                userRole === 'frc'
                  ? 'bg-white text-emerald-900 font-bold shadow-xs border border-emerald-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Briefcase className={`w-3.5 h-3.5 ${userRole === 'frc' ? 'text-emerald-600' : 'text-stone-400'}`} />
              FRC Workspace
            </button>

            <button
              type="button"
              id="role-btn-analyst"
              onClick={() => onRoleChange('analyst')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                userRole === 'analyst'
                  ? 'bg-white text-blue-900 font-bold shadow-xs border border-blue-200/60'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className={`w-3.5 h-3.5 ${userRole === 'analyst' ? 'text-blue-600' : 'text-stone-400'}`} />
              Analyst Workspace
            </button>
          </div>
        </div>

        {/* Global Action Controls: Demo Link, Audit Logs & New Tab */}
        <div className="flex items-center flex-wrap gap-2 justify-end">
          {/* Share / Copy Demo Link for Leadership */}
          <button
            id="btn-copy-demo-link"
            type="button"
            onClick={handleCopyDemoLink}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors shadow-2xs"
            title="Copy prototype link to demonstrate to leadership"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Link Copied!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Demo Link
              </>
            )}
          </button>

          {/* Reset Demo back to Clean Slate (shown in FRC view) */}
          {userRole !== 'analyst' && onResetToCleanSlate && (
            <button
              id="btn-reset-clean-slate"
              type="button"
              onClick={() => {
                if (window.confirm('Reset workspace to a 100% clean slate with 0 steps and 0 progress for first-time leadership demo?')) {
                  onResetToCleanSlate();
                }
              }}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-rose-700 bg-stone-100 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 rounded-lg transition-colors shadow-2xs"
              title="Reset all steps and progress back to clean first-time use state"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-stone-500" />
              Reset Demo
            </button>
          )}

          {/* Optional Load Sample Data for demonstration (shown in FRC view) */}
          {userRole !== 'analyst' && waterfallRowsCount === 0 && onLoadSampleDemo && (
            <button
              id="btn-load-sample-demo"
              type="button"
              onClick={onLoadSampleDemo}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
              title="Quickly populate sample waterfall steps to show leadership what completed steps look like"
            >
              <PlayCircle className="w-3.5 h-3.5 mr-1 text-stone-500" />
              Load Sample Steps
            </button>
          )}

          {/* Real-time Consolidated Activity Audit Log */}
          <button
            id="btn-open-audit-logs"
            type="button"
            onClick={onOpenAuditLogs}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors shadow-xs"
            title="Open Consolidated Activity Audit Log Drawer"
          >
            <History className="w-3.5 h-3.5 mr-1.5 text-stone-700" />
            Audit Logs
            <span className="ml-1.5 bg-stone-900 text-amber-400 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
              {auditLogsCount}
            </span>
          </button>

          {/* Sync Drive scaffold button (hidden in analyst view to declutter) */}
          {userRole !== 'analyst' && (
            <button
              id="btn-scaffold-files"
              type="button"
              onClick={onOpenScaffold}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-xs bg-stone-900 hover:bg-stone-800 text-white"
              title="Scaffold deliverables or download 1-click sync batch to H:\My Drive\Waterfall"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Sync Drive
            </button>
          )}

          {isInsideIframe && (
            <button
              id="btn-open-new-tab"
              type="button"
              onClick={handleOpenNewTab}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
              title="Open app in a full window tab to enable native file system writing"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-500 mr-1" />
              New Tab
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

