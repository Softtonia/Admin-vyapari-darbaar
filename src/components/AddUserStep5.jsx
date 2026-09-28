import React, { useState } from 'react';
import './AddUserStep5.css';

export default function AddUserStep5({ formData, uploadedFiles, profilePhoto, countries, states, cities, setCurrentStep }) {
  const [confirmed, setConfirmed] = useState(false);

  const getCountryName = (id) => {
    if (!id) return '';
    const c = countries?.find(x => String(x.id) === String(id));
    return c ? c.name : id;
  };

  const getStateName = (id) => {
    if (!id) return '';
    const s = states?.find(x => String(x.id) === String(id));
    return s ? s.name : id;
  };

  const getCityName = (id) => {
    if (!id) return '';
    const c = cities?.find(x => String(x.id) === String(id));
    return c ? c.name : id;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const renderDocBox = (title, file, iconColor) => {
    if (!file) return null;
    return (
      <div className="au-s5-doc-box">
        <div className="doc-icon-wrap" style={{ color: iconColor }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
        </div>
        <div className="doc-info-wrap">
          <span className="doc-title">{title}</span>
          <span className="doc-meta">{file.name} • {formatFileSize(file.size)}</span>
        </div>
        <div className="doc-check">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
        </div>
      </div>
    );
  };

  return (
    <div className="au-step5-container">
      <div className="au-step5-main">
        {/* Header */}
        <div className="au-step5-header">
          <div className="au-step5-title-box">
            <div className="au-s5-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div>
              <h3 className="au-s5-title">Review User Details</h3>
              <p className="au-s5-subtitle">Please review all the information below before creating the user account.</p>
            </div>
          </div>
          <button type="button" className="au-btn-edit" onClick={() => setCurrentStep(1)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Details
          </button>
        </div>

        <div className="au-s5-grid">
          {/* Personal Information */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <h4>Personal Information</h4>
            </div>
            <div className="au-s5-card-body" style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
              <div className="au-s5-avatar">
                {profilePhoto ? (
                  <img src={URL.createObjectURL(profilePhoto)} alt="Profile" />
                ) : (
                  <div className="au-s5-avatar-placeholder">👤</div>
                )}
              </div>
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">Full Name</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.first_name} {formData.last_name}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Date of Birth</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.dob || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Gender</td>
                    <td className="sep">:</td>
                    <td className="val" style={{textTransform:'capitalize'}}>{formData.gender || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Information */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <h4>Contact Information</h4>
            </div>
            <div className="au-s5-card-body">
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">Mobile Number</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.phone_number || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Email Address</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.email || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Alternate Number</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.alternate_number || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* User Type & Role */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <h4>User Type & Role</h4>
            </div>
            <div className="au-s5-card-body">
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">User Type</td>
                    <td className="sep">:</td>
                    <td className="val" style={{textTransform:'capitalize'}}>{formData.role || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Role</td>
                    <td className="sep">:</td>
                    <td className="val" style={{color:'#3b82f6'}}>Individual {formData.role}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Access Permissions</td>
                    <td className="sep">:</td>
                    <td className="val">Standard Modules Selected</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Information */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              <h4>Business Information</h4>
            </div>
            <div className="au-s5-card-body">
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">Company Name</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.company_name || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Business Type</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.business_type || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">GSTIN</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.gstin || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">PAN Number</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.pan_number || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Year of Establishment</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.year_established || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Website</td>
                    <td className="sep">:</td>
                    <td className="val" style={{color:'#3b82f6'}}>{formData.website || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Address */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <h4>Business Address</h4>
            </div>
            <div className="au-s5-card-body">
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">Address Line 1</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.address_line_1 || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Address Line 2</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.address_line_2 || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">City</td>
                    <td className="sep">:</td>
                    <td className="val">{getCityName(formData.city) || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">State</td>
                    <td className="sep">:</td>
                    <td className="val">{getStateName(formData.state) || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Country</td>
                    <td className="sep">:</td>
                    <td className="val">{getCountryName(formData.country) || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">PIN Code</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.pincode || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="au-s5-card">
            <div className="au-s5-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <h4>Bank Account Details</h4>
            </div>
            <div className="au-s5-card-body">
              <table className="au-s5-table">
                <tbody>
                  <tr>
                    <td className="lbl">Account Holder</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.account_holder_name || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Bank Name</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.bank_name || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Account Number</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.account_number || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">IFSC Code</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.ifsc_code || '-'}</td>
                  </tr>
                  <tr>
                    <td className="lbl">Branch</td>
                    <td className="sep">:</td>
                    <td className="val">{formData.branch_name || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* KYC Documents */}
        <div className="au-s5-card au-s5-full">
          <div className="au-s5-card-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h4>KYC Documents</h4>
          </div>
          <div className="au-s5-card-body" style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
            {renderDocBox("Aadhaar Card", uploadedFiles.aadhaar, "#ef4444")}
            {renderDocBox("PAN Card", uploadedFiles.pan, "#3b82f6")}
            {renderDocBox("Passport Photo", uploadedFiles.passport, "#6366f1")}
            {renderDocBox("GST Certificate", uploadedFiles.gst, "#f59e0b")}
            {renderDocBox("Business Registration", uploadedFiles.businessReg, "#10b981")}
            {!uploadedFiles.aadhaar && !uploadedFiles.pan && !uploadedFiles.passport && !uploadedFiles.gst && !uploadedFiles.businessReg && (
              <span style={{color: '#6b7280', fontSize: '14px'}}>No documents uploaded.</span>
            )}
          </div>
        </div>

      </div>

      <div className="au-step5-sidebar">
        
        {/* Subscription Plan Outline */}
        <div className="au-s5-sb-card">
          <div className="au-s5-sb-header">
            <span style={{fontSize:'20px'}}>👑</span>
            <h4>Subscription Plan</h4>
          </div>
          
          <div className="au-s5-plan-highlight">
            <div className="au-ph-left">
              <div className="au-ph-icon" style={{background: formData.subscription_plan === 'free' ? '#6b7280' : formData.subscription_plan === 'basic' ? '#3b82f6' : formData.subscription_plan === 'business' ? '#f59e0b' : '#10b981'}}>
                {formData.subscription_plan === 'free' ? '👥' : formData.subscription_plan === 'basic' ? '👑' : formData.subscription_plan === 'business' ? '🏢' : '⭐'}
              </div>
              <div className="au-ph-text">
                <span className="au-ph-name" style={{textTransform:'capitalize'}}>{formData.subscription_plan || 'Pro'} Plan</span>
                <span className="au-ph-price">
                  {formData.subscription_plan === 'free' ? '₹0' : formData.subscription_plan === 'basic' ? (formData.billing_cycle === 'monthly' ? '₹199' : '₹1,999') : formData.subscription_plan === 'business' ? (formData.billing_cycle === 'monthly' ? '₹999' : '₹9,999') : (formData.billing_cycle === 'monthly' ? '₹499' : '₹4,999')}
                  <small> / {formData.billing_cycle || 'year'}</small>
                </span>
              </div>
            </div>
            <span className="au-ph-badge">Selected</span>
          </div>

          <table className="au-s5-table au-s5-sb-table">
            <tbody>
              <tr>
                <td className="lbl">Duration</td>
                <td className="val right" style={{color:'#3b82f6'}}>{formData.billing_cycle === 'monthly' ? '1 Month' : '12 Months'}</td>
              </tr>
              <tr>
                <td className="lbl">Validity</td>
                <td className="val right">From Today</td>
              </tr>
              <tr>
                <td className="lbl">Auto Renewal</td>
                <td className="val right" style={{display:'flex', justifyContent:'flex-end', alignItems:'center', gap:'8px'}}>
                  Enabled
                  <label className="au-toggle" style={{transform: 'scale(0.7)', margin:0}}>
                    <input type="checkbox" defaultChecked />
                    <span className="au-toggle-slider"></span>
                  </label>
                </td>
              </tr>
              <tr>
                <td className="lbl">Payment Method</td>
                <td className="val right">Online Payment</td>
              </tr>
              <tr>
                <td className="lbl">Payment Status</td>
                <td className="val right">
                  <span className="badge-pending">Pending</span>
                  <div style={{fontSize:'10px', color:'#6b7280', marginTop:'4px'}}>(Will be activated after payment)</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification Summary */}
        <div className="au-s5-sb-card">
          <div className="au-s5-sb-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h4>Verification Summary</h4>
          </div>
          
          <ul className="au-s5-vs-list">
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                Personal Information
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                Contact Information
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                User Type & Role
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                Business Information
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                Address Details
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                KYC Documents
              </div>
              <span className="vs-badge success">Completed</span>
            </li>
            <li>
              <div className="vs-left">
                <div className="vs-check pending"><div style={{width:'6px', height:'6px', background:'#f59e0b', borderRadius:'50%'}}></div></div>
                Subscription Plan
              </div>
              <span className="vs-badge warning">Pending Payment</span>
            </li>
          </ul>
        </div>

        <div className="au-s5-confirm">
          <label className="au-checkbox-lbl" style={{alignItems:'flex-start'}}>
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
            <span>I confirm that all the information provided is correct and complete.</span>
          </label>
        </div>

      </div>
    </div>
  );
}
