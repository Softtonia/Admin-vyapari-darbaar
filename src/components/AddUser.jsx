import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import './AddUser.css';
import AddUserStep4 from './AddUserStep4';
import AddUserStep5 from './AddUserStep5';

export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [rolesList, setRolesList] = useState([]);

  // Location states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // File refs
  const profilePhotoRef = useRef(null);
  const aadhaarRef = useRef(null);
  const panRef = useRef(null);
  const passportRef = useRef(null);
  const gstRef = useRef(null);
  const businessRegRef = useRef(null);

  // File states
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    aadhaar: null,
    pan: null,
    passport: null,
    gst: null,
    businessReg: null,
  });

  const handleFileSelect = (key, ref) => {
    ref.current.click();
  };

  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFiles(prev => ({ ...prev, [key]: file }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePhoto(file);
    setProfilePhotoPreview(URL.createObjectURL(file));
  };

  const removeFile = (key) => {
    setUploadedFiles(prev => ({ ...prev, [key]: null }));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    alternate_number: '',
    dob: '',
    gender: 'Male',
    username: '',
    password: '',
    account_status: true,
    send_welcome_email: true,
    role: 'trader',
    
    // Business Information
    company_name: '',
    business_type: '',
    gstin: '',
    pan_number: '',
    year_established: '',
    business_category: '',
    no_of_employees: '',
    website: '',

    // Business Address
    address_line_1: '',
    address_line_2: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',

    // Bank Details
    account_holder_name: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    branch_name: '',

    // Additional Info
    internal_notes: '',
    business_description: '',
    
    // Subscription Plan
    subscription_plan: 'pro',
    billing_cycle: 'yearly'
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  useEffect(() => {
    apiFetch('/api/admin/roles?per_page=100')
      .then(res => {
        if (res.status && res.data) {
          const rolesData = Array.isArray(res.data) ? res.data : (res.data.data || []);
          setRolesList(rolesData);
        }
      })
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  // Fetch countries on mount
  useEffect(() => {
    apiFetch('/api/locations/countries')
      .then(res => {
        const list = res.data || res || [];
        setCountries(Array.isArray(list) ? list : []);
      })
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  // Fetch states when country changes
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setFormData(prev => ({ ...prev, country: countryId, state: '', city: '' }));
    setStates([]);
    setCities([]);
    if (!countryId) return;
    setLoadingStates(true);
    apiFetch(`/api/locations/states?country_id=${countryId}`)
      .then(res => {
        const list = res.data || res || [];
        setStates(Array.isArray(list) ? list : []);
      })
      .catch(err => console.error('Error fetching states:', err))
      .finally(() => setLoadingStates(false));
  };

  // Fetch cities when state changes
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData(prev => ({ ...prev, state: stateId, city: '' }));
    setCities([]);
    if (!stateId) return;
    setLoadingCities(true);
    apiFetch(`/api/locations/cities?state_id=${stateId}`)
      .then(res => {
        const list = res.data || res || [];
        setCities(Array.isArray(list) ? list : []);
      })
      .catch(err => console.error('Error fetching cities:', err))
      .finally(() => setLoadingCities(false));
  };

  const handleCityChange = (e) => {
    setFormData(prev => ({ ...prev, city: e.target.value }));
  };

  const [stepErrors, setStepErrors] = useState([]);

  const validateStep = (step) => {
    let errors = [];
    if (step === 1) {
      if (!formData.first_name) errors.push("The first name is required.");
      if (!formData.last_name) errors.push("The last name is required.");
      if (!formData.phone_number) errors.push("The phone number is required.");
      if (!formData.email) errors.push("The email address is required.");
    } else if (step === 2) {
      if (!formData.role) errors.push("The role is required.");
    } else if (step === 3) {
      if (!formData.company_name) errors.push("The company/business name is required.");
      if (!formData.business_type) errors.push("The business type is required.");
      if (!formData.pan_number) errors.push("The PAN number is required.");
      if (!formData.business_category) errors.push("The business category is required.");
      if (!formData.address_line_1) errors.push("The address line 1 is required.");
      if (!formData.country || isNaN(formData.country)) errors.push("The country id field must be an integer.");
      if (!formData.state || isNaN(formData.state)) errors.push("The state id field must be an integer.");
      if (!formData.city || isNaN(formData.city)) errors.push("The city id field must be an integer.");
      if (!formData.pincode) errors.push("The PIN code is required.");
      if (!formData.account_holder_name) errors.push("The account holder name is required.");
      if (!formData.bank_name) errors.push("The bank name is required.");
      if (!formData.account_number) errors.push("The account number is required.");
      if (!formData.ifsc_code) errors.push("The IFSC code is required.");
      if (!uploadedFiles.aadhaar) errors.push("Aadhaar card is required.");
      if (!uploadedFiles.pan) errors.push("PAN card is required.");
    }
    
    setStepErrors(errors);
    return errors.length === 0;
  };

  const handleNextStep = (nextStepTarget) => {
    // If navigating forward, validate current step
    if (nextStepTarget > currentStep) {
      if (!validateStep(currentStep)) return;
    }
    setStepErrors([]);
    setCurrentStep(nextStepTarget);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();

      // Personal Info
      fd.append('first_name', formData.first_name);
      if (formData.last_name) fd.append('last_name', formData.last_name);
      fd.append('email', formData.email);
      fd.append('phone_number', formData.phone_number);
      if (formData.alternate_number) fd.append('alternate_number', formData.alternate_number);
      if (formData.dob) fd.append('date_of_birth', formData.dob);
      if (formData.gender) fd.append('gender', formData.gender.toLowerCase());
      fd.append('role', formData.role);
      fd.append('status', formData.account_status ? 'active' : 'inactive');

      // Profile Photo (file)
      if (profilePhoto) fd.append('profile_photo', profilePhoto);

      // Business Info
      if (formData.company_name) fd.append('company_name', formData.company_name);
      if (formData.business_type) fd.append('business_type', formData.business_type);
      if (formData.gstin) fd.append('gstin', formData.gstin);
      if (formData.pan_number) fd.append('pan_number', formData.pan_number);
      if (formData.year_established) fd.append('year_of_establishment', formData.year_established);
      if (formData.business_category) fd.append('business_category', formData.business_category);
      if (formData.no_of_employees) fd.append('no_of_employees', formData.no_of_employees);
      if (formData.website) fd.append('website', formData.website);
      if (formData.business_description) fd.append('business_description', formData.business_description);

      // Address (using IDs as per API spec)
      if (formData.country) fd.append('country_id', formData.country);
      if (formData.state) fd.append('state_id', formData.state);
      if (formData.city) fd.append('city_id', formData.city);
      if (formData.address_line_1) fd.append('address', formData.address_line_1);
      if (formData.address_line_2) fd.append('address_line_2', formData.address_line_2);
      if (formData.pincode) fd.append('pin_code', formData.pincode);

      // Bank Details (API field names from Postman)
      if (formData.bank_name) fd.append('bank_name', formData.bank_name);
      if (formData.account_number) fd.append('bank_account_number', formData.account_number);
      if (formData.ifsc_code) fd.append('bank_ifsc_code', formData.ifsc_code);
      if (formData.account_holder_name) fd.append('bank_account_holder_name', formData.account_holder_name);
      if (formData.branch_name) fd.append('bank_branch_name', formData.branch_name);

      // Remove the direct append of KYC files to the user creation form data
      // We will upload them separately after getting the company_id

      const response = await apiFetch('/api/admin/users', {
        method: 'POST',
        body: fd,
      });
      
      if (response.status && response.data) {
        const createdUser = response.data;
        const companyId = createdUser.companies && createdUser.companies.length > 0 ? createdUser.companies[0].id : null;

        if (companyId) {
          // 1. Batch Upload KYC Documents
          const kycFiles = [];
          if (uploadedFiles.aadhaar) kycFiles.push({ type: 'aadhaar_card', file: uploadedFiles.aadhaar });
          if (uploadedFiles.pan) kycFiles.push({ type: 'pan_card', file: uploadedFiles.pan });
          if (uploadedFiles.passport) kycFiles.push({ type: 'passport_photo', file: uploadedFiles.passport });

          if (kycFiles.length > 0) {
            const kycFd = new FormData();
            kycFd.append('company_id', companyId);
            kycFiles.forEach(kf => {
              kycFd.append('document_type[]', kf.type);
              kycFd.append('files[]', kf.file);
            });
            
            try {
              await apiFetch('/api/admin/kyc/batch-upload', {
                method: 'POST',
                body: kycFd,
              });
            } catch (err) {
              console.error('KYC Upload Error:', err);
            }
          }

          // 2. Upload Business Documents
          const bizFiles = [];
          if (uploadedFiles.gst) bizFiles.push({ type: 'gst_certificate', file: uploadedFiles.gst });
          if (uploadedFiles.businessReg) bizFiles.push({ type: 'business_registration', file: uploadedFiles.businessReg });

          for (const bf of bizFiles) {
            const bizFd = new FormData();
            bizFd.append('company_id', companyId);
            bizFd.append('document_type', bf.type);
            bizFd.append('file', bf.file);

            try {
              await apiFetch('/api/admin/business-documents', {
                method: 'POST',
                body: bizFd,
              });
            } catch (err) {
              console.error('Business Doc Upload Error:', err);
            }
          }
        }

        navigate('/user-list');
      } else {
        setError(response.message || 'Failed to create user');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while creating the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      {/* Breadcrumb */}
      <div className="au-breadcrumb">
        <span className="au-breadcrumb-back" onClick={() => navigate('/')}>← Home</span>
        <span className="au-breadcrumb-sep">›</span>
        <span className="au-breadcrumb-back" onClick={() => navigate('/user-list')}>User Management</span>
        <span className="au-breadcrumb-sep">›</span>
        <span className="au-breadcrumb-current">Add User</span>
      </div>

      {/* Header */}
      <div className="au-header">
        <h1 className="au-title">Add New User</h1>
        <p className="au-subtitle">Create a new user account and assign role, subscription and verification details.</p>
      </div>

      {/* Stepper */}
      <div className="au-stepper">
        <div className={`au-step ${currentStep >= 1 ? 'active' : ''}`} onClick={() => handleNextStep(1)} style={{cursor:'pointer'}}>
          <div className="au-step-circle">1</div>
          <div className="au-step-text">
            <span className="au-step-title">Basic Information</span>
            <span className="au-step-subtitle">Personal & Contact Details</span>
          </div>
          <div className="au-step-divider"></div>
        </div>
        <div className={`au-step ${currentStep >= 2 ? 'active' : ''}`} onClick={() => handleNextStep(2)} style={{cursor:'pointer'}}>
          <div className="au-step-circle">2</div>
          <div className="au-step-text">
            <span className="au-step-title">User Type & Role</span>
            <span className="au-step-subtitle">Assign user type and permissions</span>
          </div>
          <div className="au-step-divider"></div>
        </div>
        <div className={`au-step ${currentStep >= 3 ? 'active' : ''}`} onClick={() => handleNextStep(3)} style={{cursor:'pointer'}}>
          <div className="au-step-circle">3</div>
          <div className="au-step-text">
            <span className="au-step-title">Business & KYC Details</span>
            <span className="au-step-subtitle">Company and verification info</span>
          </div>
          <div className="au-step-divider"></div>
        </div>
        <div className={`au-step ${currentStep >= 4 ? 'active' : ''}`} onClick={() => handleNextStep(4)} style={{cursor:'pointer'}}>
          <div className="au-step-circle">4</div>
          <div className="au-step-text">
            <span className="au-step-title">Subscription Plan</span>
            <span className="au-step-subtitle">Select plan and billing</span>
          </div>
          <div className="au-step-divider"></div>
        </div>
        <div className={`au-step ${currentStep >= 5 ? 'active' : ''}`} onClick={() => handleNextStep(5)} style={{ flex: '0.5', cursor:'pointer' }}>
          <div className="au-step-circle">5</div>
          <div className="au-step-text">
            <span className="au-step-title">Review & Create</span>
            <span className="au-step-subtitle">Confirm details and create user</span>
          </div>
        </div>
      </div>

      {error && <div style={{ color: '#ef4444', background: '#fef2f2', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fca5a5' }}>{error}</div>}
      
      {stepErrors.length > 0 && (
        <div style={{ color: '#ef4444', background: '#fef2f2', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fca5a5' }}>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {stepErrors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="au-grid">
          
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <>
              <div className="au-col-left">
                {/* Personal Information */}
                <div className="au-card">
              <div className="au-card-header">
                <div className="au-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className="au-card-title-wrap">
                  <h3 className="au-card-title">Personal Information</h3>
                  <p className="au-card-subtitle">Enter basic details of the user.</p>
                </div>
              </div>

              <div className="au-form-row">
                <div className="au-form-col" style={{ flex: 1.5 }}>
                  <div style={{display: 'flex', gap: '16px'}}>
                    <div style={{flex: 1}}>
                      <label className="au-label">First Name <span className="req">*</span></label>
                      <input type="text" className="au-input" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Rajesh" required />
                    </div>
                    <div style={{flex: 1}}>
                      <label className="au-label">Last Name <span className="req">*</span></label>
                      <input type="text" className="au-input" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Kumar" required />
                    </div>
                  </div>
                  
                  <label className="au-label" style={{ marginTop: '16px' }}>Date of Birth</label>
                  <input type="date" className="au-input" name="dob" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="au-form-col" style={{ flex: 1 }}>
                  <label className="au-label">Profile Photo</label>
                  <div className="au-photo-upload" onClick={() => profilePhotoRef.current.click()} style={{cursor:'pointer'}}>
                    <img src={profilePhotoPreview || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} alt="Profile" className="au-photo-preview" />
                    <div className="au-photo-drop">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      <p className="au-photo-drop-text">{profilePhoto ? profilePhoto.name : 'Click to upload'}</p>
                      <p className="au-photo-drop-sub">or drag and drop<br/>JPG, PNG (Max 2 MB)</p>
                    </div>
                  </div>
                  <input type="file" ref={profilePhotoRef} accept="image/*" style={{display:'none'}} onChange={handleProfilePhotoChange} />
                </div>
              </div>

              <div className="au-form-row" style={{ marginTop: '16px' }}>
                <div className="au-form-col">
                  <label className="au-label">Gender <span className="req">*</span></label>
                  <div className="au-radio-group">
                    <label className="au-radio-label">
                      <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} className="au-radio-input" />
                      Male
                    </label>
                    <label className="au-radio-label">
                      <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="au-radio-input" />
                      Female
                    </label>
                    <label className="au-radio-label">
                      <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} className="au-radio-input" />
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="au-card">
              <div className="au-card-header">
                <div className="au-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="au-card-title-wrap">
                  <h3 className="au-card-title">Contact Information</h3>
                  <p className="au-card-subtitle">Enter contact details for communication.</p>
                </div>
              </div>
              <div className="au-form-row">
                <div className="au-form-col">
                  <label className="au-label">Mobile Number <span className="req">*</span></label>
                  <div className="au-input-icon-wrap" style={{display:'flex'}}>
                    <select className="au-select" style={{width:'80px', borderRight:'none', borderTopRightRadius:'0', borderBottomRightRadius:'0', backgroundColor:'#f8fafc'}} defaultValue="+91">
                      <option>+91</option>
                    </select>
                    <input type="text" className="au-input" name="phone_number" value={formData.phone_number} onChange={handleChange} style={{borderTopLeftRadius:'0', borderBottomLeftRadius:'0'}} required />
                  </div>
                </div>
                <div className="au-form-col">
                  <label className="au-label">Email Address <span className="req">*</span></label>
                  <input type="email" className="au-input" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="au-form-col">
                  <label className="au-label">Alternate Number</label>
                  <input type="text" className="au-input" name="alternate_number" value={formData.alternate_number} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="au-card">
              <div className="au-card-header">
                <div className="au-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div className="au-card-title-wrap">
                  <h3 className="au-card-title">Account Settings</h3>
                  <p className="au-card-subtitle">Set login credentials and account status.</p>
                </div>
              </div>
              <div className="au-form-row">
                <div className="au-form-col">
                  <label className="au-label">Account Status</label>
                  <div className="au-toggle-wrap">
                    <label className="au-toggle">
                      <input type="checkbox" name="account_status" checked={formData.account_status} onChange={handleChange} />
                      <span className="au-toggle-slider"></span>
                    </label>
                    <span className="au-toggle-text">Active <span className="au-toggle-desc">(user can login)</span></span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </>
          )}

          {/* STEP 2: User Type & Role */}
          {currentStep === 2 && (
            <div className="au-step2-grid" style={{ gridColumn: '1 / -1' }}>
              <div className="au-col-left">
                <div className="au-card" style={{ padding: '32px' }}>
                  <div className="au-card-header" style={{ marginBottom: '32px' }}>
                    <div className="au-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">User Type & Role</h3>
                      <p className="au-card-subtitle">Select user category, role and access permissions.</p>
                    </div>
                  </div>

                  {/* 1. Select User Type */}
                  <div style={{ marginBottom: '40px' }}>
                    <div className="au-section-header">
                      <div className="au-section-num">1</div>
                      <h4 className="au-section-title">Select User Type <span className="req">*</span></h4>
                    </div>
                    <p className="au-section-subtitle">Choose the primary category for this user. This will define their default access and features.</p>
                    
                    <div className="au-role-grid" style={{ marginTop: '20px', marginLeft: '36px' }}>
                      {rolesList.map(roleItem => {
                        const isSelected = formData.role === roleItem.name;
                        // Dynamically pick icon/color based on common role names, or fallback
                        let iconSvg, iconColor;
                        if (roleItem.name.toLowerCase().includes('admin')) {
                          iconColor = '#2563eb';
                          iconSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
                        } else if (roleItem.name.toLowerCase().includes('subscriber')) {
                          iconColor = '#f59e0b';
                          iconSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
                        } else if (roleItem.name.toLowerCase().includes('advertiser')) {
                          iconColor = '#3b82f6';
                          iconSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.5 13.5c-2.5 2.5-2.5 6.5 0 9"></path></svg>;
                        } else {
                          // default Trader or others
                          iconColor = '#059669';
                          iconSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
                        }

                        return (
                          <div key={roleItem.id} className={`au-role-card ${isSelected ? 'active' : ''}`} onClick={() => setFormData({...formData, role: roleItem.name})}>
                            <div className="au-role-icon" style={{color: iconColor}}>{iconSvg}</div>
                            <h4 className="au-role-title" style={{textTransform: 'capitalize'}}>{roleItem.name}</h4>
                            <p className="au-role-desc">Select to assign {roleItem.name} role</p>
                            <input type="radio" checked={isSelected} readOnly className="au-role-radio" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* User requested to REMOVE Assign Role */}

                  {/* 2. Access Permissions */}
                  <div>
                    <div className="au-section-header">
                      <div className="au-section-num">2</div>
                      <h4 className="au-section-title">Access Permissions</h4>
                    </div>
                    <p className="au-section-subtitle">Set additional permissions for this user.</p>

                    <div className="au-perm-grid">
                      {rolesList.find(r => r.name === formData.role)?.permissions?.map((perm) => (
                        <label key={perm.id || perm.name} className="au-perm-item">
                          <input type="checkbox" className="au-perm-checkbox" checked readOnly/> {perm.name}
                        </label>
                      )) || <p style={{color: '#6b7280', fontSize: '13px', gridColumn: '1/-1'}}>No permissions found for this role.</p>}
                    </div>
                  </div>

                </div>
              </div>

              <div className="au-col-right">
                {/* Role Information Card */}
                <div className="au-card" style={{ padding: '24px' }}>
                  <div className="au-card-header" style={{ marginBottom: '16px' }}>
                    <div className="au-card-icon" style={{background: '#065f46', color: 'white', width: '28px', height: '28px', borderRadius: '50%'}}>
                      <span style={{fontWeight:'bold', fontSize:'14px'}}>i</span>
                    </div>
                    <h3 className="au-card-title">Role Information</h3>
                  </div>

                  {(() => {
                    const selectedRole = rolesList.find(r => r.name === formData.role);
                    if (!selectedRole) return null;
                    return (
                      <>
                        <div className="au-info-box">
                          <div className="au-info-box-header" style={{textTransform: 'capitalize'}}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            {selectedRole.name}
                          </div>
                          <p className="au-info-box-desc">Features and capabilities for {selectedRole.name} accounts.</p>
                        </div>

                        <h4 style={{fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0'}}>Key Features for {selectedRole.name.charAt(0).toUpperCase() + selectedRole.name.slice(1)}s</h4>
                        <ul className="au-features-list">
                          {selectedRole.permissions?.slice(0, 7).map((perm) => (
                            <li key={perm.id || perm.name} className="au-feature-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              {perm.name}
                            </li>
                          )) || <li className="au-feature-item">No specific features listed.</li>}
                        </ul>
                      </>
                    )
                  })()}

                  <div className="au-card-header" style={{ marginBottom: '16px', marginTop: '32px' }}>
                    <div className="au-card-icon" style={{background: '#2563eb', color: 'white', width: '28px', height: '28px', borderRadius: '50%'}}>
                      <span style={{fontWeight:'bold', fontSize:'14px'}}>?</span>
                    </div>
                    <h3 className="au-card-title">Quick Help</h3>
                  </div>
                  
                  <div className="au-faq-list">
                    <div className="au-faq-item">What is the difference between user types? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                    <div className="au-faq-item">Which role should I select? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                    <div className="au-faq-item">Can I change the role later? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                    <div className="au-faq-item">What permissions are included? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                    <div className="au-faq-item">How does subscription work? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Business & KYC Details */}
          {currentStep === 3 && (
            <div style={{gridColumn: '1/-1'}}>
              {/* TOP ROW */}
              <div className="au-step3-row">
                {/* Business Information */}
                <div className="au-step3-card" style={{flex: 1.6}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#e0f2fe', color: '#0369a1'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Business Information</h3>
                      <p className="au-card-subtitle">Enter company or business details for verification.</p>
                    </div>
                  </div>
                  
                  <div className="au-form-row">
                    <div className="au-form-col">
                      <label className="au-label">Company / Business Name <span className="req">*</span></label>
                      <input type="text" className="au-input" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Rajesh Agro Traders" />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">Business Type <span className="req">*</span></label>
                      <select className="au-select" name="business_type" value={formData.business_type} onChange={handleChange}>
                        <option value="">Select Business Type</option>
                        <option value="Agri Commodities Trader">Agri Commodities Trader</option>
                        <option value="Wholesaler">Wholesaler</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="au-form-row">
                    <div className="au-form-col">
                      <label className="au-label">GSTIN (Optional)</label>
                      <input type="text" className="au-input" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="10ABCDE1234F1Z5" />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">PAN Number <span className="req">*</span></label>
                      <input type="text" className="au-input" name="pan_number" value={formData.pan_number} onChange={handleChange} placeholder="ABCDE1234F" />
                    </div>
                  </div>

                  <div className="au-form-row" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                    <div className="au-form-col">
                      <label className="au-label">Year of Establishment</label>
                      <input type="date" className="au-input" name="year_established" value={formData.year_established} onChange={handleChange} />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">Business Category <span className="req">*</span></label>
                      <select className="au-select" name="business_category" value={formData.business_category} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Trader">Trader</option>
                      </select>
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">No. of Employees (Optional)</label>
                      <select className="au-select" name="no_of_employees" value={formData.no_of_employees} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="1-10">1 - 10</option>
                        <option value="11-50">11 - 50</option>
                      </select>
                    </div>
                    <div className="au-form-col" style={{gridColumn: '2 / span 2'}}>
                      <input type="url" className="au-input" name="website" value={formData.website} onChange={handleChange} placeholder="www.rajeshagrotraders.com" />
                    </div>
                  </div>
                </div>

                {/* Business Address */}
                <div className="au-step3-card" style={{flex: 1.1}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#ecfdf5', color: '#059669'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Business Address</h3>
                      <p className="au-card-subtitle">Enter registered business address.</p>
                    </div>
                  </div>

                  <div className="au-form-row">
                    <div className="au-form-col">
                      <label className="au-label">Address Line 1 <span className="req">*</span></label>
                      <input type="text" className="au-input" name="address_line_1" value={formData.address_line_1} onChange={handleChange} placeholder="Shop No. 12, Main Market" />
                    </div>
                  </div>
                  <div className="au-form-row">
                    <div className="au-form-col">
                      <label className="au-label">Address Line 2 (Optional)</label>
                      <input type="text" className="au-input" name="address_line_2" value={formData.address_line_2} onChange={handleChange} placeholder="Near Mandi Road" />
                    </div>
                  </div>

                  <div className="au-form-row" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'}}>
                    <div className="au-form-col">
                      <label className="au-label">Country <span className="req">*</span></label>
                      <select className="au-select" name="country" value={formData.country} onChange={handleCountryChange}>
                        <option value="">Select Country</option>
                        {countries.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">State <span className="req">*</span></label>
                      <select className="au-select" name="state" value={formData.state} onChange={handleStateChange} disabled={!formData.country || loadingStates}>
                        <option value="">{loadingStates ? 'Loading...' : 'Select State'}</option>
                        {states.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">City <span className="req">*</span></label>
                      <select className="au-select" name="city" value={formData.city} onChange={handleCityChange} disabled={!formData.state || loadingCities}>
                        <option value="">{loadingCities ? 'Loading...' : 'Select City'}</option>
                        {cities.map(ct => (
                          <option key={ct.id} value={ct.id}>{ct.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">PIN Code <span className="req">*</span></label>
                      <input type="text" className="au-input" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="800001" />
                    </div>
                  </div>
                </div>

                {/* Verification Progress */}
                <div className="au-step3-card" style={{flex: 0.8}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#f0fdf4', color: '#16a34a'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Verification Progress</h3>
                      <p className="au-card-subtitle">Complete all required documents.</p>
                    </div>
                  </div>
                  <ul className="au-checklist">
                    <li className="au-checklist-item done">
                      <div className="icon-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                      Business Information
                    </li>
                    <li className="au-checklist-item done">
                      <div className="icon-wrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                      Address Details
                    </li>
                    <li className="au-checklist-item pending">
                      <div className="icon-wrap"></div>
                      Identity Proof (KYC)
                    </li>
                    <li className="au-checklist-item pending">
                      <div className="icon-wrap"></div>
                      Business Proof
                    </li>
                    <li className="au-checklist-item pending">
                      <div className="icon-wrap"></div>
                      Bank Details
                    </li>
                    <li className="au-checklist-item pending">
                      <div className="icon-wrap"></div>
                      Verification Review
                    </li>
                  </ul>
                </div>
              </div>

              {/* MIDDLE ROW */}
              <div className="au-step3-row">
                {/* KYC Documents */}
                <div className="au-step3-card" style={{flex: 1.8}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#ecfdf5', color: '#10b981'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">KYC Documents (Identity Verification)</h3>
                      <p className="au-card-subtitle">Upload valid government issued identity documents.</p>
                    </div>
                  </div>
                  
                  <div className="au-upload-grid">
                    <div>
                      <label className="au-label"><span style={{color: '#f59e0b', marginRight:'4px'}}>🪪</span> Aadhaar Card <span className="req">*</span></label>
                      <div className="au-upload-box" onClick={() => aadhaarRef.current.click()}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p><span style={{color: '#3b82f6', fontWeight: 500}}>Click to upload</span> <span style={{color: '#6b7280', fontSize:'13px'}}>or drag and drop</span></p>
                        <span>JPG, PNG, PDF (Max 5 MB)</span>
                      </div>
                      <input type="file" ref={aadhaarRef} accept="image/*,.pdf" style={{display:'none'}} onChange={(e) => handleFileChange('aadhaar', e)} />
                      {uploadedFiles.aadhaar && (
                        <div className="au-file-preview">
                          <div className="au-file-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <div>{uploadedFiles.aadhaar.name}<span className="au-file-size">{formatFileSize(uploadedFiles.aadhaar.size)}</span></div>
                          </div>
                          <div className="au-file-delete" onClick={() => removeFile('aadhaar')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="au-label"><span style={{color: '#3b82f6', marginRight:'4px'}}>🪪</span> PAN Card <span className="req">*</span></label>
                      <div className="au-upload-box" onClick={() => panRef.current.click()}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p><span style={{color: '#3b82f6', fontWeight: 500}}>Click to upload</span> <span style={{color: '#6b7280', fontSize:'13px'}}>or drag and drop</span></p>
                        <span>JPG, PNG, PDF (Max 5 MB)</span>
                      </div>
                      <input type="file" ref={panRef} accept="image/*,.pdf" style={{display:'none'}} onChange={(e) => handleFileChange('pan', e)} />
                      {uploadedFiles.pan && (
                        <div className="au-file-preview">
                          <div className="au-file-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <div>{uploadedFiles.pan.name}<span className="au-file-size">{formatFileSize(uploadedFiles.pan.size)}</span></div>
                          </div>
                          <div className="au-file-delete" onClick={() => removeFile('pan')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="au-label"><span style={{color: '#6366f1', marginRight:'4px'}}>👤</span> Passport Photo (Optional)</label>
                      <div className="au-upload-box" onClick={() => passportRef.current.click()}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p><span style={{color: '#3b82f6', fontWeight: 500}}>Click to upload</span> <span style={{color: '#6b7280', fontSize:'13px'}}>or drag and drop</span></p>
                        <span>JPG, PNG, PDF (Max 5 MB)</span>
                      </div>
                      <input type="file" ref={passportRef} accept="image/*,.pdf" style={{display:'none'}} onChange={(e) => handleFileChange('passport', e)} />
                      {uploadedFiles.passport && (
                        <div className="au-file-preview">
                          <div className="au-file-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <div>{uploadedFiles.passport.name}<span className="au-file-size">{formatFileSize(uploadedFiles.passport.size)}</span></div>
                          </div>
                          <div className="au-file-delete" onClick={() => removeFile('passport')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Documents */}
                <div className="au-step3-card" style={{flex: 1.2}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#f0fdf4', color: '#16a34a'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Business Documents</h3>
                      <p className="au-card-subtitle">Upload business related documents for verification.</p>
                    </div>
                  </div>
                  
                  <div className="au-upload-grid au-upload-grid-2">
                    <div>
                      <label className="au-label">GST Certificate <span style={{fontSize:'12px', fontWeight:'400', color:'#6b7280'}}>(If applicable)</span></label>
                      <div className="au-upload-box" onClick={() => gstRef.current.click()}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p><span style={{color: '#3b82f6', fontWeight: 500}}>Click to upload</span> <span style={{color: '#6b7280', fontSize:'13px'}}>or drag and drop</span></p>
                        <span>JPG, PNG, PDF (Max 5 MB)</span>
                      </div>
                      <input type="file" ref={gstRef} accept="image/*,.pdf" style={{display:'none'}} onChange={(e) => handleFileChange('gst', e)} />
                      {uploadedFiles.gst && (
                        <div className="au-file-preview">
                          <div className="au-file-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <div>{uploadedFiles.gst.name}<span className="au-file-size">{formatFileSize(uploadedFiles.gst.size)}</span></div>
                          </div>
                          <div className="au-file-delete" onClick={() => removeFile('gst')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="au-label">Business Registration <span style={{fontSize:'12px', fontWeight:'400', color:'#6b7280'}}>(Shop Act / Trade License)</span></label>
                      <div className="au-upload-box" onClick={() => businessRegRef.current.click()}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p><span style={{color: '#3b82f6', fontWeight: 500}}>Click to upload</span> <span style={{color: '#6b7280', fontSize:'13px'}}>or drag and drop</span></p>
                        <span>JPG, PNG, PDF (Max 5 MB)</span>
                      </div>
                      <input type="file" ref={businessRegRef} accept="image/*,.pdf" style={{display:'none'}} onChange={(e) => handleFileChange('businessReg', e)} />
                      {uploadedFiles.businessReg && (
                        <div className="au-file-preview">
                          <div className="au-file-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{color:'#10b981'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            <div>{uploadedFiles.businessReg.name}<span className="au-file-size">{formatFileSize(uploadedFiles.businessReg.size)}</span></div>
                          </div>
                          <div className="au-file-delete" onClick={() => removeFile('businessReg')}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div className="au-step3-row">
                {/* Bank Account Details */}
                <div className="au-step3-card" style={{flex: 1.8}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#ecfdf5', color: '#10b981'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Bank Account Details</h3>
                      <p className="au-card-subtitle">Enter bank details for payments and refunds.</p>
                    </div>
                  </div>
                  
                  <div className="au-form-row" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px'}}>
                    <div className="au-form-col">
                      <label className="au-label">Account Holder Name <span className="req">*</span></label>
                      <input type="text" className="au-input" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} placeholder="Rajesh Kumar" />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">Bank Name <span className="req">*</span></label>
                      <select className="au-select" name="bank_name" value={formData.bank_name} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="SBI">SBI</option>
                      </select>
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">Account Number <span className="req">*</span></label>
                      <input type="text" className="au-input" name="account_number" value={formData.account_number} onChange={handleChange} placeholder="50200012345678" />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">IFSC Code <span className="req">*</span></label>
                      <input type="text" className="au-input" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} placeholder="HDFC0001234" />
                    </div>
                    <div className="au-form-col">
                      <label className="au-label">Branch Name</label>
                      <input type="text" className="au-input" name="branch_name" value={formData.branch_name} onChange={handleChange} placeholder="Patna Main Branch" />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="au-step3-card" style={{flex: 1.2}}>
                  <div className="au-card-header" style={{marginBottom: '20px'}}>
                    <div className="au-card-icon" style={{background: '#eff6ff', color: '#3b82f6'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <div className="au-card-title-wrap">
                      <h3 className="au-card-title">Additional Information</h3>
                      <p className="au-card-subtitle">Add any additional details for verification.</p>
                    </div>
                  </div>
                  
                  <div className="au-form-row">
                    <div className="au-form-col">
                      <label className="au-label">Business Description <span style={{fontSize:'12px', fontWeight:'400', color:'#6b7280'}}>(Optional)</span></label>
                      <textarea className="au-textarea" name="business_description" value={formData.business_description} onChange={handleChange} placeholder="We are involved in trading and supplying rice, wheat, pulses and other agri commodities across Bihar. Operating since 2020 with a strong supply network."></textarea>
                      <div className="au-notes-hint">{formData.business_description.length}/500</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <AddUserStep4 formData={formData} setFormData={setFormData} />
          )}

          {/* STEP 5: Review & Create */}
          {currentStep === 5 && (
            <AddUserStep5 
              formData={formData} 
              uploadedFiles={uploadedFiles} 
              profilePhoto={profilePhoto} 
              countries={countries} 
              states={states} 
              cities={cities}
              setCurrentStep={setCurrentStep}
            />
          )}

        </div>

        {/* Footer Actions */}
        <div className="au-actions">
          <button type="button" className="au-btn-cancel" onClick={() => {
            if (currentStep > 1) {
              handleNextStep(currentStep - 1);
            } else {
              navigate(-1);
            }
          }}>
            {currentStep > 1 ? '← Previous' : 'Cancel'}
          </button>
          
          {currentStep < 5 ? (
            <button type="button" className="au-btn-submit" onClick={() => handleNextStep(currentStep + 1)}>
              Next Step <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          ) : (
            <button type="submit" className="au-btn-submit" onClick={(e) => {
              if (!validateStep(currentStep)) {
                e.preventDefault();
                return;
              }
            }} disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
