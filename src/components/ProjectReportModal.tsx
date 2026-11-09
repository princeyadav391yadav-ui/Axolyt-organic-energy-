import React, { useState } from 'react';
import {
  FileText,
  Download,
  GraduationCap,
  X,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  User,
  Building2,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProjectReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectReportModal: React.FC<ProjectReportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chapters' | 'student'>('overview');

  if (!isOpen) return null;

  const pdfUrl = '/reports/AXOLYT_ORGANIC_ENERGY_Project_Report.pdf';
  const docxUrl = '/reports/AXOLYT_ORGANIC_ENERGY_Project_Report.docx';

  const chapters = [
    { num: 'Prelim', title: 'Cover Page, Certificate, Declaration & Acknowledgement', pages: 'Pages 1–4' },
    { num: 'Prelim', title: 'Abstract, Table of Contents & List of Figures/Tables', pages: 'Pages 5–7' },
    { num: 'Ch. 1', title: 'Introduction & Project Overview', pages: 'Page 8' },
    { num: 'Ch. 2', title: 'Problem Statement, Objectives & Feasibility Study', pages: 'Page 9' },
    { num: 'Ch. 3', title: 'Scope of the Project & Target User Personas', pages: 'Page 10' },
    { num: 'Ch. 4', title: 'Hardware & Software Requirements (Tables 4.1 & 4.2)', pages: 'Page 11' },
    { num: 'Ch. 5', title: 'Technologies Used — Frontend (React 19, TS, Tailwind v4, Motion)', pages: 'Page 12' },
    { num: 'Ch. 5 (Cont.)', title: 'Cloud Persistence (Firebase Firestore) & Web Audio Ambiance', pages: 'Page 13' },
    { num: 'Ch. 6', title: 'System Analysis & Software Requirements Specification (SRS)', pages: 'Page 14' },
    { num: 'Ch. 7', title: 'System Architecture & 3-Tier Component Design', pages: 'Page 15' },
    { num: 'Ch. 8', title: 'Database Design & Firestore NoSQL Collections Schema', pages: 'Page 16' },
    { num: 'Ch. 8 (Cont.)', title: 'Cloud Security Rules & Role-Based Access Control (RBAC)', pages: 'Page 17' },
    { num: 'Ch. 9', title: 'Data Flow Diagrams (Level 0 Context & Level 1 DFD)', pages: 'Page 18' },
    { num: 'Ch. 9 (Cont.)', title: 'Use Case Specification Matrix & Gated Checkout Sequence', pages: 'Page 19' },
    { num: 'Ch. 10', title: 'Website Modules & Core Features Breakdown (Part 1)', pages: 'Page 20' },
    { num: 'Ch. 10 (Cont.)', title: 'Cold-Chain 5-Stage Tracker & Admin Command Center', pages: 'Page 21' },
    { num: 'Ch. 11', title: 'Implementation & Actual Screenshots (Hero & Ingredients)', pages: 'Page 22' },
    { num: 'Ch. 11 (Cont.)', title: 'Admin Security Portal & Mobile User Screenshots', pages: 'Page 23' },
    { num: 'Ch. 12', title: 'Software Testing Methodology & Bug Resolution', pages: 'Page 24' },
    { num: 'Ch. 12 (Cont.)', title: 'Comprehensive Software Test Cases Matrix (TC-01 to TC-12)', pages: 'Page 25' },
    { num: 'Ch. 13', title: 'Platform Advantages & Technical Limitations', pages: 'Page 26' },
    { num: 'Ch. 14', title: 'Future Scope & Planned Engineering Enhancements', pages: 'Page 27' },
    { num: 'Ch. 15', title: 'Conclusion & Academic Learnings', pages: 'Page 28' },
    { num: 'End', title: 'References & Bibliography (Standards, Texts, HSBTE)', pages: 'Page 29' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#07160d] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <GraduationCap className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  College Project Report
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  29 Pages A4 · Verified
                </span>
              </div>
              <p className="text-xs text-emerald-200/70">
                Ch. Bansi Lal Polytechnic, Bhiwani · Diploma in Computer Engineering
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-500/20 px-6 bg-black/20 gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-emerald-200/60 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Report Overview &amp; Download</span>
          </button>
          <button
            onClick={() => setActiveTab('chapters')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'chapters'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-emerald-200/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Table of Contents (29 Pages)</span>
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'student'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-emerald-200/60 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Candidate &amp; College Details</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-emerald-100/90 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Highlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-emerald-900/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Major Project Submission (Session 2026–2027)
                  </span>
                  <span className="text-xs font-mono text-emerald-300/80">
                    A4 Size · 29 Pages Total
                  </span>
                </div>
                <h4 className="text-xl font-bold font-display text-white">
                  AXOLYT ORGANIC ENERGY
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
                  A comprehensive, academic diploma engineering project report detailing the full system architecture, React 19 frontend design, Google Cloud Firestore database modeling, hardened security rules, gated checkout flow, and live 5-stage cold-chain logistics tracking.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                    <div className="text-base font-bold text-emerald-400">29</div>
                    <div className="text-[11px] text-emerald-200/60">A4 Pages</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                    <div className="text-base font-bold text-emerald-400">15</div>
                    <div className="text-[11px] text-emerald-200/60">Chapters</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                    <div className="text-base font-bold text-emerald-400">10</div>
                    <div className="text-[11px] text-emerald-200/60">Figures &amp; Screens</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                    <div className="text-base font-bold text-emerald-400">12 / 12</div>
                    <div className="text-[11px] text-emerald-200/60">Test Cases Passed</div>
                  </div>
                </div>
              </div>

              {/* Download Buttons Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PDF Card */}
                <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-400/50 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <FileText className="w-5 h-5" />
                      <span>Formal Academic Report (PDF)</span>
                    </div>
                    <p className="text-xs text-emerald-200/70 leading-relaxed">
                      Complete 29-page print-ready PDF formatted with double border cover, supervisor &amp; examiner signature blocks, embedded screenshots, and running headers/footers.
                    </p>
                    <div className="text-[11px] font-mono text-emerald-400">
                      • Strictly 29 Pages (A4) · Ready to Submit
                    </div>
                  </div>
                  <a
                    href={pdfUrl}
                    download="AXOLYT_ORGANIC_ENERGY_Project_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Report (29 Pages)</span>
                  </a>
                </div>

                {/* DOCX Card */}
                <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-400/50 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                      <FileText className="w-5 h-5" />
                      <span>Editable Document (DOCX)</span>
                    </div>
                    <p className="text-xs text-emerald-200/70 leading-relaxed">
                      Editable Microsoft Word (.docx) file containing all chapters, data flow diagrams, system analysis, hardware tables, and full test cases.
                    </p>
                    <div className="text-[11px] font-mono text-emerald-400">
                      • Microsoft Word Compatible · Fully Editable
                    </div>
                  </div>
                  <a
                    href={docxUrl}
                    download="AXOLYT_ORGANIC_ENERGY_Project_Report.docx"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download DOCX Document</span>
                  </a>
                </div>
              </div>

              {/* Verified Features Checklist */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2 text-xs">
                <div className="font-bold text-emerald-300">
                  Verification &amp; Academic Compliance Highlights:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-200/80">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Strict 25–30 page limit met (Exactly 29 Pages)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Actual app screenshots embedded (Figures 11.1–11.5)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Accurate student &amp; guide credentials verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>12 Functional &amp; Security test cases matrix</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-mono pb-2 border-b border-emerald-500/20">
                <span>CHAPTER / SECTION TITLE</span>
                <span>PAGE NO.</span>
              </div>
              <div className="space-y-1.5">
                {chapters.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-black/20 hover:bg-emerald-950/40 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-16 font-mono font-bold text-emerald-400 shrink-0">
                        {c.num}
                      </span>
                      <span className="text-emerald-100 font-medium">
                        {c.title}
                      </span>
                    </div>
                    <span className="font-mono text-emerald-300/80 shrink-0">
                      {c.pages}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'student' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20 space-y-3">
                <h5 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Academic Affiliation &amp; Institutional Registry
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-emerald-200/60 block">College Name:</span>
                    <span className="font-bold text-white text-sm">Ch. Bansi Lal Polytechnic, Bhiwani</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Department:</span>
                    <span className="font-bold text-emerald-300 text-sm">Department of Computer Engineering</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Affiliation:</span>
                    <span className="font-medium text-white">Haryana State Board of Technical Education (HSBTE)</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Academic Session:</span>
                    <span className="font-bold text-emerald-400">2026–2027</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20 space-y-2 text-xs">
                  <h5 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    Student / Candidate Details
                  </h5>
                  <div>
                    <span className="text-emerald-200/60 block">Full Name:</span>
                    <span className="font-bold text-white text-base">Prince Kumar</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Roll Number:</span>
                    <span className="font-mono font-bold text-emerald-300 text-sm">240790825012</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Course &amp; Semester:</span>
                    <span className="text-white">Diploma in Computer Engineering (Final Year / 6th Sem)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/20 space-y-2 text-xs">
                  <h5 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    Project Supervisor / Guide
                  </h5>
                  <div>
                    <span className="text-emerald-200/60 block">Submitted To:</span>
                    <span className="font-bold text-white text-base">Ms. Pratibha Dhaiya</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Designation:</span>
                    <span className="text-emerald-300">Lecturer &amp; Project Guide</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/60 block">Department:</span>
                    <span className="text-white">Department of Computer Engineering</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-emerald-500/20 bg-black/40">
          <div className="flex items-center gap-2 text-xs text-emerald-200/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready for college examination &amp; viva submission</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
