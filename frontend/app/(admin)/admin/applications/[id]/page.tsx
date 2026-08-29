'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { ArrowLeft, Loader2, Download, FileText, Mail, Phone, MapPin, Link2, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [appId, setAppId] = useState<string>('');
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Removed the overflow: hidden lock because it triggers a bug in Chrome's native PDF plugin
  // which causes the PDF's internal scroll wheel listener to freeze completely.
  useEffect(() => {
    // Keep this empty or remove it.
  }, [isPdfModalOpen]);

  useEffect(() => {
    params.then(p => {
      setAppId(p.id);
      fetchApplication(p.id);
    });
  }, [params]);

  const fetchApplication = async (id: string) => {
    try {
      const res: any = await api.get(`/careers/${id}`);
      setApplication(res);
    } catch (err) {
      setError('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await api.put(`/careers/${appId}/status`, { status: newStatus });
      setApplication({ ...application, status: newStatus });
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'REVIEWING': return 'bg-amber-100 text-amber-800';
      case 'SHORTLISTED': return 'bg-purple-100 text-purple-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'HIRED': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading candidate details...</div>;
  if (error || !application) return <div className="p-8 text-red-500">{error || 'Application not found'}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/applications" className="p-2 bg-white text-slate-500 hover:text-dazz-navy rounded-full border border-slate-200 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Application Review</h1>
            <p className="text-slate-500 mt-1">
              Applied on {new Date(application.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right mr-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Status</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
          
          <select
            value={application.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-colors shadow-sm outline-none focus:border-dazz-navy disabled:opacity-50"
          >
            <option value="NEW">Set as NEW</option>
            <option value="REVIEWING">Set as REVIEWING</option>
            <option value="SHORTLISTED">Set as SHORTLISTED</option>
            <option value="REJECTED">Set as REJECTED</option>
            <option value="HIRED">Set as HIRED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Candidate Profile</h2>
            
            <div>
              <p className="text-sm font-semibold text-slate-500">Full Name</p>
              <p className="text-lg font-bold text-slate-900">{application.candidateName}</p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${application.email}`} className="flex items-center gap-3 text-slate-600 hover:text-dazz-navy transition-colors">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm font-medium">{application.email}</span>
              </a>
              <a href={`tel:${application.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-dazz-navy transition-colors">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm font-medium">{application.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <span className="text-sm font-medium">{application.location}</span>
              </div>
              
              {application.linkedInProfile && (
                <a href={application.linkedInProfile} target="_blank" className="flex items-center gap-3 text-slate-600 hover:text-[#0077b5] transition-colors">
                  <Link2 size={18} className="text-slate-400" />
                  <span className="text-sm font-medium line-clamp-1">{application.linkedInProfile}</span>
                </a>
              )}
              {application.portfolioUrl && (
                <a href={application.portfolioUrl} target="_blank" className="flex items-center gap-3 text-slate-600 hover:text-dazz-navy transition-colors">
                  <Briefcase size={18} className="text-slate-400" />
                  <span className="text-sm font-medium line-clamp-1">{application.portfolioUrl}</span>
                </a>
              )}
            </div>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-lg shadow-sm space-y-6 text-white">
            <h2 className="text-lg font-bold border-b border-slate-700 pb-3">Applied Job</h2>
            {application.jobId ? (
              <>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Title</p>
                  <p className="text-lg font-bold text-dazz-gold">{application.jobId.title?.en}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Department</p>
                    <p className="text-sm font-medium">{application.jobId.department}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm font-medium">{application.jobId.location}</p>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p className="text-lg font-bold text-dazz-gold">General Application</p>
                <p className="text-sm text-slate-300 mt-2">Candidate did not apply for a specific role.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">Resume / CV</h2>
              {application.resume?.url && (
                <a 
                  href={application.resume.url} 
                  target="_blank" 
                  download 
                  className="flex items-center gap-2 text-sm font-bold text-dazz-navy hover:text-dazz-gold transition-colors"
                >
                  <Download size={16} /> Download File
                </a>
              )}
            </div>
            
            {application.resume?.url ? (
              <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-dazz-navy/10 text-dazz-navy rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 line-clamp-1">{application.resume.url.split('/').pop() || 'Resume Document'}</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{application.resume.format || 'DOCUMENT'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {(application.resume.format === 'pdf' || application.resume.url.toLowerCase().endsWith('.pdf')) && (
                    <button
                      onClick={() => setIsPdfModalOpen(true)}
                      className="px-5 py-2.5 bg-dazz-navy text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      Open
                    </button>
                  )}
                  <a
                    href={application.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Download size={16} /> Download
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 italic">No resume file was uploaded.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Cover Letter</h2>
            {application.coverLetter ? (
              <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                {application.coverLetter}
              </div>
            ) : (
              <p className="text-slate-500 italic">No cover letter provided.</p>
            )}
          </div>
        </div>
      </div>

      {isPdfModalOpen && application.resume?.url && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-dazz-navy/10 rounded-lg">
                  <FileText size={20} className="text-dazz-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{application.candidateName}&#39;s Resume</h3>
                  <p className="text-xs text-slate-500 font-medium">{application.resume.url.split('/').pop()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={application.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Download size={16} /> Download
                </a>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-2 text-slate-500 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-300">
              <iframe
                src={application.resume.url}
                className="w-full h-full border-none"
                title="Resume PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
