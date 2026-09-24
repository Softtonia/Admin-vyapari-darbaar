import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminNewsImportRunDetail } from '../api/newsService';
import './NewsManageCategories.css';

const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const RefreshIcon = ({ size = 14, color = "currentColor", spinning = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={spinning ? 'spin' : ''}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);

export default function NewsImportRunDetail({ onBack }) {
  const { runId } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDetail = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await getAdminNewsImportRunDetail(runId);
      setDetail(res?.data || res);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to load run details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (runId) {
      fetchDetail();
    }
  }, [runId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/news-imports');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-GB', { 
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  const getStatusPill = (status) => {
    const s = typeof status === 'string' ? status.toLowerCase() : '';
    if (s === 'completed' || s === 'success') return <span className="cat-status active"><span className="dot"></span> {status}</span>;
    if (s === 'failed' || s === 'error') return <span className="cat-status inactive" style={{color: '#991b1b', background: '#fef2f2'}}><span className="dot" style={{background: '#ef4444'}}></span> {status}</span>;
    if (s === 'pending' || s === 'processing') return <span className="cat-status" style={{color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500'}}><span className="dot" style={{background: '#f59e0b', width:'6px', height:'6px', display:'inline-block', borderRadius:'50%', marginRight:'4px'}}></span> {status}</span>;
    return <span>{status || 'Unknown'}</span>;
  };

  if (isLoading) {
    return (
      <div className="cat-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <RefreshIcon size={32} spinning={true} color="#9ca3af" />
        <span style={{ marginLeft: '12px', color: '#6b7280' }}>Loading details...</span>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="cat-container">
        <div className="cat-header">
          <button className="cat-back-btn" onClick={handleBack}>
            <ArrowLeftIcon size={14} /> Back to Imports
          </button>
          <h2>Error</h2>
        </div>
        <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>{errorMsg}</div>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="cat-container">
      {/* HEADER */}
      <div className="cat-header">
        <button className="cat-back-btn" onClick={handleBack}>
          <ArrowLeftIcon size={14} /> Back to Import Runs
        </button>
        <div className="cat-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div className="cat-title-text">
            <h1>Import Run #{detail.id}</h1>
            <p>Detailed breakdown of this automated data fetching execution.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={fetchDetail}
              style={{ background: '#f3f4f6', border: '1px solid #d1d5db', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', color: '#4b5563' }}
            >
              <RefreshIcon size={14} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="cat-main-layout" style={{ gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* STATS OVERVIEW CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>Status</div>
            <div style={{ marginTop: '8px' }}>{getStatusPill(detail.status)}</div>
          </div>
          
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>Items Received</div>
            <div style={{ marginTop: '4px', fontSize: '24px', fontWeight: '700', color: '#111827' }}>{detail.items_received ?? '-'}</div>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', textTransform: 'uppercase' }}>Items Imported</div>
            <div style={{ marginTop: '4px', fontSize: '24px', fontWeight: '700', color: '#059669' }}>{detail.items_imported ?? '-'}</div>
          </div>

          <div style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600', textTransform: 'uppercase' }}>Items Skipped</div>
            <div style={{ marginTop: '4px', fontSize: '24px', fontWeight: '700', color: '#6b7280' }}>{detail.items_skipped ?? '-'}</div>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: '#991b1b', fontWeight: '600', textTransform: 'uppercase' }}>Items Failed</div>
            <div style={{ marginTop: '4px', fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{detail.items_failed ?? '-'}</div>
          </div>
        </div>

        {/* METADATA SECTION */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#111827' }}>Execution Context</h3>
          </div>
          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>SOURCE</div>
              <div style={{ color: '#111827', fontWeight: '500' }}>
                {detail.source && typeof detail.source === 'object' ? `${detail.source.name} (${detail.source.code})` : (detail.source ? String(detail.source).toUpperCase() : 'Unknown Source')}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>CATEGORY APPLIED</div>
              <div style={{ color: '#111827' }}>
                {detail.category && typeof detail.category === 'object' ? detail.category.name : '-'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>TRIGGERED BY</div>
              <div style={{ color: '#111827' }}>
                {detail.triggered_by_admin ? `${detail.triggered_by_admin.name} (${detail.triggered_by_admin.email})` : (detail.triggered_by || 'System Scheduler')}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>STARTED AT</div>
              <div style={{ color: '#111827' }}>{formatDate(detail.created_at || detail.started_at)}</div>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>COMPLETED AT</div>
              <div style={{ color: '#111827' }}>{formatDate(detail.completed_at || detail.finished_at)}</div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>FEED URL</div>
              <div style={{ color: '#2563eb', wordBreak: 'break-all' }}>
                <a href={detail.feed_url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {detail.feed_url || 'N/A'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ERROR LOGS */}
        {detail.error_summary && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', background: '#fef2f2', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#991b1b' }}>Error Summary</h3>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ background: '#111827', color: '#f87171', padding: '16px', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '400px', overflowY: 'auto' }}>
                {typeof detail.error_summary === 'string' 
                  ? detail.error_summary 
                  : Array.isArray(detail.error_summary)
                    ? detail.error_summary.join('\n')
                    : JSON.stringify(detail.error_summary, null, 2)}
              </div>
            </div>
          </div>
        )}

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
