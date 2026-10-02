import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Hash,
  UserCheck,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import { ProjectDetails, UserRole } from '../types';

interface IssueDetailsSetupProps {
  onSubmit: (details: ProjectDetails) => void;
}

export const IssueDetailsSetup: React.FC<IssueDetailsSetupProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProjectDetails>({
    coeNumber: '',
    egrcNumber: '',
    issueTitle: '',
    issueDescription: '',
    frcName: '',
    analystName: '',
    waterfallName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const sampleValues: ProjectDetails = {
    issueTitle: 'Card Lending Overlimit Interest Recalibration & Regulatory Reporting',
    issueDescription:
      'Remediation and historical recalculation of account balances and regulatory reporting discrepancies across overlimit consumer credit portfolios.',
    coeNumber: 'COE-2026-0891',
    egrcNumber: 'eGRC-REQ-4421',
    frcName: 'Sarah Jenkins',
    analystName: 'Alex Morgan',
    waterfallName: 'Q3 Card Portfolio Remediation Waterfall',
  };

  const handleAutofill = () => {
    setFormData(sampleValues);
    setErrors({});
  };

  const handleClear = () => {
    setFormData({
      coeNumber: '',
      egrcNumber: '',
      issueTitle: '',
      issueDescription: '',
      frcName: '',
      analystName: '',
      waterfallName: '',
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.issueTitle.trim()) {
      newErrors.issueTitle = 'Issue Title is required';
    }
    if (!formData.coeNumber.trim()) {
      newErrors.coeNumber = 'COE# is required';
    }
    if (!formData.egrcNumber.trim()) {
      newErrors.egrcNumber = 'eGRC# is required';
    }
    if (!formData.frcName.trim()) {
      newErrors.frcName = 'FRC Name is required';
    }
    if (!formData.analystName.trim()) {
      newErrors.analystName = 'Analyst Name is required';
    }
    if (!formData.waterfallName.trim()) {
      newErrors.waterfallName = 'Waterfall Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden animate-in fade-in duration-200">
        {/* Banner Header */}
        <div className="bg-stone-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Live Demo Setup
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Enter Issue Details
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                Start your live walkthrough with a clean slate. Enter the issue title, description, and governance identifiers below. Once submitted, all details will be reflected at the top of the workspace and you will be directed to the FRC / Analyst view.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Helper Actions Bar */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-500 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            All fields start blank. Type in your demo values or use quick autofill.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs"
              title="Autofill sample banking portfolio details for rehearsal"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Autofill Sample Data</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-100 transition-colors shadow-2xs"
              title="Clear all fields"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* 1. Issue Title */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Issue Title <span className="text-rose-500">*</span>
              </span>
              {errors.issueTitle && (
                <span className="text-rose-600 text-[11px] font-normal flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.issueTitle}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="e.g. Card Lending Overlimit Interest Recalibration & Regulatory Reporting"
              value={formData.issueTitle}
              onChange={(e) => {
                setFormData({ ...formData, issueTitle: e.target.value });
                if (errors.issueTitle) setErrors({ ...errors, issueTitle: '' });
              }}
              className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold ${
                errors.issueTitle
                  ? 'border-rose-300 bg-rose-50/30'
                  : 'border-stone-300 bg-white text-stone-900 focus:border-blue-500'
              }`}
            />
            <p className="text-[11px] text-stone-500 mt-1">
              The high-level portfolio remediation issue or regulatory finding.
            </p>
          </div>

          {/* 2. Issue Description */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-400" />
              Issue Description
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Remediation and historical recalculation of account balances and regulatory reporting discrepancies across overlimit consumer credit portfolios."
              value={formData.issueDescription || ''}
              onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs text-stone-800 leading-relaxed"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Detailed narrative of root cause, affected accounts, and remediation scope.
            </p>
          </div>

          {/* 3. COE# and eGRC# */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-blue-600" />
                  COE# <span className="text-rose-500">*</span>
                </span>
                {errors.coeNumber && (
                  <span className="text-rose-600 text-[11px] font-normal">{errors.coeNumber}</span>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. COE-2026-0891"
                value={formData.coeNumber}
                onChange={(e) => {
                  setFormData({ ...formData, coeNumber: e.target.value });
                  if (errors.coeNumber) setErrors({ ...errors, coeNumber: '' });
                }}
                className={`w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono focus:ring-2 focus:ring-blue-500 shadow-2xs font-bold ${
                  errors.coeNumber
                    ? 'border-rose-300 bg-rose-50/30 text-rose-900'
                    : 'border-stone-300 bg-white text-blue-800 focus:border-blue-500'
                }`}
              />
              <p className="text-[11px] text-stone-500 mt-1">Center of Excellence tracking identifier.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  eGRC# <span className="text-rose-500">*</span>
                </span>
                {errors.egrcNumber && (
                  <span className="text-rose-600 text-[11px] font-normal">{errors.egrcNumber}</span>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. eGRC-REQ-4421"
                value={formData.egrcNumber}
                onChange={(e) => {
                  setFormData({ ...formData, egrcNumber: e.target.value });
                  if (errors.egrcNumber) setErrors({ ...errors, egrcNumber: '' });
                }}
                className={`w-full text-xs px-3.5 py-2.5 border rounded-xl font-mono focus:ring-2 focus:ring-blue-500 shadow-2xs font-bold ${
                  errors.egrcNumber
                    ? 'border-rose-300 bg-rose-50/30 text-rose-900'
                    : 'border-stone-300 bg-white text-indigo-800 focus:border-blue-500'
                }`}
              />
              <p className="text-[11px] text-stone-500 mt-1">Enterprise GRC ticket or intake number.</p>
            </div>
          </div>

          {/* 4. FRC Name and Analyst Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  FRC Name <span className="text-rose-500">*</span>
                </span>
                {errors.frcName && (
                  <span className="text-rose-600 text-[11px] font-normal">{errors.frcName}</span>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={formData.frcName}
                onChange={(e) => {
                  setFormData({ ...formData, frcName: e.target.value });
                  if (errors.frcName) setErrors({ ...errors, frcName: '' });
                }}
                className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold ${
                  errors.frcName
                    ? 'border-rose-300 bg-rose-50/30 text-rose-900'
                    : 'border-stone-300 bg-white text-emerald-800 focus:border-blue-500'
                }`}
              />
              <p className="text-[11px] text-stone-500 mt-1">
                First-line Requirements Champion / Business Owner.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                  Analyst Name <span className="text-rose-500">*</span>
                </span>
                {errors.analystName && (
                  <span className="text-rose-600 text-[11px] font-normal">{errors.analystName}</span>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.analystName}
                onChange={(e) => {
                  setFormData({ ...formData, analystName: e.target.value });
                  if (errors.analystName) setErrors({ ...errors, analystName: '' });
                }}
                className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold ${
                  errors.analystName
                    ? 'border-rose-300 bg-rose-50/30 text-rose-900'
                    : 'border-stone-300 bg-white text-sky-800 focus:border-blue-500'
                }`}
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Quantitative Analytics Lead / Data Modeler.
              </p>
            </div>
          </div>

          {/* 5. Waterfall Name */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                Initial Waterfall Name <span className="text-rose-500">*</span>
              </span>
              {errors.waterfallName && (
                <span className="text-rose-600 text-[11px] font-normal">{errors.waterfallName}</span>
              )}
            </label>
            <input
              type="text"
              placeholder="e.g. Q3 Card Portfolio Remediation Waterfall"
              value={formData.waterfallName}
              onChange={(e) => {
                setFormData({ ...formData, waterfallName: e.target.value });
                if (errors.waterfallName) setErrors({ ...errors, waterfallName: '' });
              }}
              className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-2xs font-semibold ${
                errors.waterfallName
                  ? 'border-rose-300 bg-rose-50/30 text-rose-900'
                  : 'border-stone-300 bg-white text-purple-800 focus:border-blue-500'
              }`}
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Name of the initial waterfall scope and export sheet tab.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-stone-500">
              <span>Once submitted, all details will appear in the </span>
              <strong className="text-stone-800">Issue Details</strong>
              <span> card and open the FRC / Analyst workspace.</span>
            </div>

            <button
              type="submit"
              id="btn-submit-issue-details"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
