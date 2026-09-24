import React, { useState, useEffect } from 'react';
import { 
  getAdminNewsImportRuns, 
  triggerAdminNewsImport 
} from '../api/newsService';
import { useNavigate } from 'react-router-dom';
import './NewsManageCategories.css';

// Minimal Custom Icons
const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const RefreshIcon = ({ size = 14, color = "currentColor", spinning = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={spinning ? 'spin' : ''}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);
const DownloadIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 40, color: 'red'}}><h1>Something went wrong.</h1><pre>{this.state.error?.toString()}</pre></div>;
    }
    return this.props.children;
  }
}

export default function NewsImportRunsWrapper(props) {
  return (
    <ErrorBoundary>
      <NewsImportRuns {...props} />
    </ErrorBoundary>
  );
}

function NewsImportRuns({ onBack }) {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTriggering, setIsTriggering] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  // Pagination (assuming standard meta structure if available)
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const perPage = 15;

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: '' }), 4000);
  };

  const fetchRuns = async (pageNum = page) => {
    try {
      setIsLoading(true);
      const res = await getAdminNewsImportRuns({ page: pageNum, per_page: perPage });
      const payload = res?.data?.items || res?.data?.data || res?.data || res || [];
      const validRuns = Array.isArray(payload) ? payload : [];
      setRuns(validRuns);
      
      const newMeta = res?.data?.meta || res?.data?.pagination || res?.meta || { current_page: pageNum, last_page: 1, total: validRuns.length || 0 };
      setMeta(newMeta);
      setPage(newMeta.current_page || 1);
    } catch (err) {
      console.error('Failed to load import runs', err);
      showToast(err.message || 'Failed to load import runs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, [page]);

  const handleTrigger = async (source) => {
    setIsTriggering(true);
    try {
      const res = await triggerAdminNewsImport(source);
      showToast(res.message || `${source.toUpperCase()} import queued successfully!`);
      // Refresh list to show the new pending run
      fetchRuns(1);
    } catch (err) {
      showToast(err.message || `Failed to trigger ${source} import`, 'error');
    } finally {
      setIsTriggering(false);
    }
  };

  const handleViewDetail = (runId) => {
    navigate(`/news-imports/${runId}`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-GB', { 
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusPill = (status) => {
    const s = typeof status === 'string' ? status.toLowerCase() : '';
    if (s === 'completed' || s === 'success') return <span className="cat-status active"><span className="dot"></span> {status}</span>;
    if (s === 'failed' || s === 'error') return <span className="cat-status inactive" style={{color: '#991b1b', background: '#fef2f2'}}><span className="dot" style={{background: '#ef4444'}}></span> {status}</span>;
    if (s === 'pending' || s === 'processing') return <span className="cat-status" style={{color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500'}}><span className="dot" style={{background: '#f59e0b', width:'6px', height:'6px', display:'inline-block', borderRadius:'50%', marginRight:'4px'}}></span> {status}</span>;
    return <span>{status || 'Unknown'}</span>;
  };

  return (
    <div className="cat-container">
      {/* TOAST NOTIFICATION */}
      {toastMsg.text && (
        <div className={`cat-toast ${toastMsg.type}`}>
          <div className="cat-toast-icon">
            {toastMsg.type === 'error' ? '⚠' : '✓'}
          </div>
          <span>{toastMsg.text}</span>
        </div>
      )}
      
      {/* HEADER */}
      <div className="cat-header">
        <button className="cat-back-btn" onClick={onBack}>
          <ArrowLeftIcon size={14} /> Back to News & Articles
        </button>
        <div className="cat-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div className="cat-title-text">
            <h1>Automated News Imports</h1>
            <p>Trigger and monitor automated data scraping runs from official sources like PIB and SEBI.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="cform-btn-save" 
              style={{ background: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => handleTrigger('pib')}
              disabled={isTriggering}
            >
              <DownloadIcon size={16} /> Import PIB News
            </button>
            <button 
              className="cform-btn-save" 
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => handleTrigger('sebi')}
              disabled={isTriggering}
            >
              <DownloadIcon size={16} /> Import SEBI Updates
            </button>
          </div>
        </div>
      </div>

      <div className="cat-main-layout" style={{ gridTemplateColumns: '1fr' }}>
        
        {/* FULL WIDTH TABLE */}
        <div className="cat-left-col">
          <div className="cat-table-toolbar">
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Import Run History</h3>
            <button 
              onClick={() => fetchRuns(page)} 
              style={{ background: '#f3f4f6', border: '1px solid #d1d5db', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#4b5563' }}
              disabled={isLoading}
            >
              <RefreshIcon size={14} spinning={isLoading} /> Refresh Log
            </button>
          </div>

          <div className="cat-table-wrapper">
            <table className="cat-table">
              <thead>
                <tr>
                  <th width="5%">Run ID</th>
                  <th width="15%">Source</th>
                  <th width="15%">Status</th>
                  <th width="15%">Items Imported</th>
                  <th width="15%">Errors</th>
                  <th width="15%">Started At</th>
                  <th width="10%">Completed At</th>
                  <th width="10%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="8" style={{textAlign:'center', padding:'40px'}}>Loading import runs...</td></tr>
                ) : runs.length === 0 ? (
                  <tr><td colSpan="8" style={{textAlign:'center', padding:'40px'}}>No import runs found.</td></tr>
                ) : (
                  runs.map((run) => (
                    <tr key={run.id || run.run_id}>
                      <td><strong>#{run.id || run.run_id}</strong></td>
                      <td style={{ fontWeight: '600', color: '#4b5563' }}>
                        {run.source && typeof run.source === 'object' ? (run.source.name || run.source.code) : (run.source ? String(run.source).toUpperCase() : '-')}
                      </td>
                      <td>{getStatusPill(run.status)}</td>
                      <td><strong style={{ color: '#059669' }}>{run.items_imported !== undefined ? run.items_imported : '-'}</strong></td>
                      <td><strong style={{ color: run.items_failed > 0 ? '#dc2626' : '#9ca3af' }}>{run.items_failed !== undefined ? run.items_failed : '-'}</strong></td>
                      <td>{formatDate(run.created_at || run.started_at)}</td>
                      <td>{formatDate(run.finished_at || run.completed_at)}</td>
                      <td>
                        <button 
                          onClick={() => handleViewDetail(run.id || run.run_id)}
                          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
                        >
                          View Log
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {meta.last_page > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderTop: '1px solid #e5e7eb', background: '#fff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                Showing page {meta.current_page} of {meta.last_page} ({meta.total} total)
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button 
                  style={{ padding: '6px 12px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '6px', cursor: meta.current_page === 1 ? 'not-allowed' : 'pointer', opacity: meta.current_page === 1 ? 0.5 : 1 }}
                  disabled={meta.current_page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                <button 
                  style={{ padding: '6px 12px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '6px', cursor: meta.current_page === meta.last_page ? 'not-allowed' : 'pointer', opacity: meta.current_page === meta.last_page ? 0.5 : 1 }}
                  disabled={meta.current_page === meta.last_page}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
