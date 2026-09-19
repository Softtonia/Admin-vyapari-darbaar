import React, { useState, useRef, useEffect } from 'react';
import welcomeBgImg from '../assets/welcome_banner_sketch.png';
import brandCrest from '../assets/brand_crest.png';
import {
  getCommodityCategoryOptions,
  createCommodity,
} from '../api/commodityService';
import './AddCommodity.css';

export default function AddCommodity({ onBack }) {
  // Form State - Exact mapping with Backend StoreCommodityRequest
  const [commodityName, setCommodityName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [unit, setUnit] = useState('QUINTAL');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [statusActive, setStatusActive] = useState(true);

  // Manual slug/code override flag
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [isManualCode, setIsManualCode] = useState(false);

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Categories Dropdown State (from /api/admin/commodity-categories/options)
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryLoadError, setCategoryLoadError] = useState(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Fetch live Category Options on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      setIsLoadingCategories(true);
      setCategoryLoadError(null);
      try {
        const res = await getCommodityCategoryOptions();
        if (isMounted && res) {
          const list = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
            ? res
            : [];
          if (list.length > 0) {
            setCategoriesList(list);
          }
        }
      } catch (err) {
        console.warn('Could not load categories from API:', err);
        if (isMounted) {
          setCategoryLoadError('Could not load categories from server.');
        }
      } finally {
        if (isMounted) setIsLoadingCategories(false);
      }
    }

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Auto generate Slug and Code when Name changes (unless manually edited)
  const handleNameChange = (val) => {
    setCommodityName(val);

    if (!isManualSlug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }

    if (!isManualCode) {
      const generatedCode = val
        .toUpperCase()
        .trim()
        .replace(/[^A-Z0-9]+/g, '_')
        .slice(0, 20);
      setCode(generatedCode);
    }
  };

  // Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast('Only JPG, PNG, or WEBP images are allowed.', 'error');
      return;
    }

    // Backend rule: max 2048 KB (2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size exceeds maximum limit of 2 MB.', 'error');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    showToast('Image uploaded successfully.', 'success');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const removeImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form Submission
  const handleSubmit = async (publishStatus = true) => {
    if (!commodityName.trim()) {
      showToast('Please enter the commodity name.', 'error');
      return;
    }

    if (!categoryId) {
      showToast('Please select a valid commodity category.', 'error');
      return;
    }

    if (!code.trim()) {
      showToast('Please provide a unique commodity code.', 'error');
      return;
    }

    if (!unit.trim()) {
      showToast('Please select a measurement unit.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const finalSlug = slug.trim()
        ? slug.trim()
        : commodityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Create FormData for multipart image upload
      const formData = new FormData();
      formData.append('commodity_category_id', categoryId);
      formData.append('name', commodityName.trim());
      formData.append('slug', finalSlug);
      formData.append('code', code.trim().toUpperCase());
      formData.append('unit', unit.trim().toUpperCase());

      if (description.trim()) {
        formData.append('description', description.trim());
      }

      formData.append('sort_order', sortOrder ? String(sortOrder) : '0');
      formData.append('status', publishStatus ? '1' : '0');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await createCommodity(formData);

      showToast(
        response?.message || `Commodity "${commodityName}" created successfully!`,
        'success'
      );

      // Return to commodities list
      if (onBack) {
        setTimeout(() => {
          onBack();
        }, 1200);
      }
    } catch (err) {
      console.error('Commodity create failed:', err);
      let errMsg = err.data?.message || err.message || 'Failed to create commodity.';

      // Check Laravel validation error bag
      if (err.data?.errors && typeof err.data.errors === 'object') {
        const errorList = Object.values(err.data.errors).flat();
        if (errorList.length > 0) {
          errMsg = errorList[0];
        }
      }

      showToast(errMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-comm-page">
      {/* Toast Notification */}
      {notification && (
        <div className={`add-comm-toast ${notification.type}`}>
          {notification.type === 'success' ? '✓ ' : '⚠ '}
          {notification.msg}
        </div>
      )}

      {/* 1. Header Section */}
      <div className="add-comm-header">
        <div className="add-comm-header-left">
          <button
            type="button"
            className="add-comm-back-btn"
            onClick={onBack}
            title="Back to Commodities list"
          >
            ← Back to Commodities
          </button>
          <h1 className="add-comm-page-title">Add Commodity</h1>
          <p className="add-comm-page-subtitle">
            Add a new agricultural commodity to the platform. Provide accurate details to help traders get the right information.
          </p>
        </div>

        <div className="add-comm-header-right">
          <div className="add-comm-quote-block">
            <span className="add-comm-quote-text">
              “Accurate Data<br />
              Empowers Traders<br />
              Builds a Stronger Bharat.”
            </span>
          </div>

          <div className="add-comm-sketch-banner">
            <img
              src={welcomeBgImg}
              alt="Indian Agricultural Market Heritage"
              className="sketch-banner-img"
            />
            <div className="sketch-banner-overlay">
              <span className="banner-tagline">TRADE • INFORM • CONNECT • GROW</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Form Grid */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(statusActive);
        }}
        className="add-comm-main-grid"
      >
        {/* LEFT COLUMN: Core Details */}
        <div className="add-comm-col left-col">
          {/* Card 1: Commodity Information */}
          <div className="add-comm-card">
            <div className="add-comm-card-header">
              <div className="card-header-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="card-header-titles">
                <h2 className="card-heading">Commodity Information</h2>
                <p className="card-subheading">Enter the core details required for this commodity.</p>
              </div>
            </div>

            <div className="add-comm-card-body">
              {/* Row 1: Commodity Name & Category */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="comm-name">
                    Commodity Name <span className="req-star">*</span>
                  </label>
                  <input
                    id="comm-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Makhana, Wheat, Soybean"
                    value={commodityName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    maxLength={150}
                    required
                    autoFocus
                  />
                  <span className="field-hint">Primary trade name recognized in mandis (max 150 chars).</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="comm-cat">
                    Category <span className="req-star">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="comm-cat"
                      className={`form-select ${!categoryId ? 'is-placeholder' : ''}`}
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                      disabled={isLoadingCategories}
                    >
                      <option value="">
                        {isLoadingCategories ? 'Loading Categories...' : 'Select Category'}
                      </option>
                      {categoriesList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {categoryLoadError ? (
                    <span className="field-hint" style={{ color: '#dc2626' }}>{categoryLoadError}</span>
                  ) : (
                    <span className="field-hint">Fetched from active categories in the master list.</span>
                  )}
                </div>
              </div>

              {/* Row 2: Commodity Code & Measurement Unit */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="comm-code">
                    Commodity Code <span className="req-star">*</span>
                  </label>
                  <input
                    id="comm-code"
                    type="text"
                    className="form-input"
                    placeholder="e.g. MAKHANA, WHEAT_LOK"
                    value={code}
                    onChange={(e) => {
                      setIsManualCode(true);
                      setCode(e.target.value.toUpperCase());
                    }}
                    maxLength={50}
                    required
                  />
                  <span className="field-hint">Unique alphanumeric code used across trading and reports.</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="comm-unit">
                    Measurement Unit <span className="req-star">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="comm-unit"
                      className={`form-select ${!unit ? 'is-placeholder' : ''}`}
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      required
                    >
                      <option value="QUINTAL">Quintal (100 Kg)</option>
                      <option value="KILOGRAM">Kilogram (Kg)</option>
                      <option value="METRIC_TON">Metric Ton (1000 Kg)</option>
                      <option value="BAG">Standard Bag (50 Kg)</option>
                      <option value="PIECE">Piece / Count</option>
                      <option value="BOX">Box / Carton</option>
                    </select>
                    <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  <span className="field-hint">Standard trading unit applied in mandi rate reporting.</span>
                </div>
              </div>

              {/* Row 3: URL Slug & Sort Order */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="comm-slug">
                    URL Slug
                  </label>
                  <input
                    id="comm-slug"
                    type="text"
                    className="form-input"
                    placeholder="e.g. makhana-darbhanga"
                    value={slug}
                    onChange={(e) => {
                      setIsManualSlug(true);
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }}
                    maxLength={180}
                  />
                  <span className="field-hint">SEO friendly URL identifier (auto-generated from name if left blank).</span>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="comm-sort">
                    Display Sort Order
                  </label>
                  <input
                    id="comm-sort"
                    type="number"
                    min="0"
                    max="65535"
                    className="form-input"
                    placeholder="1"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  />
                  <span className="field-hint">Numerical priority order for sorting listings (0 = default).</span>
                </div>
              </div>

              {/* Row 4: Description */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="comm-desc">
                  Commodity Description
                </label>
                <textarea
                  id="comm-desc"
                  className="form-textarea"
                  rows={4}
                  placeholder="Provide details about quality standards, origin regions, standard moisture content, trading practices..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <span className="field-hint">Optional descriptive notes shown to traders and market participants.</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Media & Status */}
        <div className="add-comm-col right-col">
          {/* Card 2: Commodity Image */}
          <div className="add-comm-card">
            <div className="add-comm-card-header">
              <div className="card-header-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="card-header-titles">
                <h2 className="card-heading">Commodity Image</h2>
                <p className="card-subheading">High quality crop/grain photograph (max 2 MB).</p>
              </div>
            </div>

            <div className="add-comm-card-body">
              <div
                className={`image-upload-dropzone ${isDragging ? 'is-dragging' : ''} ${imagePreview ? 'has-preview' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden-file-input"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                {imagePreview ? (
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Commodity Preview" className="uploaded-preview-img" />
                    <button
                      type="button"
                      className="btn-remove-image"
                      onClick={removeImage}
                      title="Remove image"
                    >
                      ✕
                    </button>
                    <span className="image-change-hint">Click or drag new image to replace</span>
                  </div>
                ) : (
                  <div className="dropzone-empty-state">
                    <div className="upload-icon-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="dropzone-primary-text">
                      <span className="click-to-upload">Click to upload</span> or drag and drop
                    </p>
                    <p className="dropzone-sub-text">JPG, PNG or WEBP (Max 2 MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Status & Visibility */}
          <div className="add-comm-card">
            <div className="add-comm-card-header">
              <div className="card-header-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="card-header-titles">
                <h2 className="card-heading">Status & Visibility</h2>
                <p className="card-subheading">Control live publishing status in the mandi network.</p>
              </div>
            </div>

            <div className="add-comm-card-body">
              <div className="status-toggle-row">
                <div className="status-label-group">
                  <span className="status-title">Listing Status</span>
                  <span className="status-description">
                    {statusActive
                      ? 'Active: Commodity is visible across traders, rates, and search.'
                      : 'Draft / Inactive: Hidden from public view until activated.'}
                  </span>
                </div>

                <label className="toggle-switch" htmlFor="comm-status-toggle">
                  <input
                    id="comm-status-toggle"
                    type="checkbox"
                    checked={statusActive}
                    onChange={(e) => setStatusActive(e.target.checked)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="status-badge-container">
                <span className={`status-pill ${statusActive ? 'active' : 'inactive'}`}>
                  <span className="status-dot" />
                  {statusActive ? 'Status: Active' : 'Status: Draft / Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Live Summary Preview */}
          <div className="add-comm-card preview-summary-card">
            <div className="add-comm-card-header">
              <div className="card-header-icon-box">
                <img src={brandCrest} alt="Vyapari Darbaar" style={{ width: 16, height: 16, objectFit: 'contain' }} />
              </div>
              <div className="card-header-titles">
                <h2 className="card-heading">Listing Preview</h2>
                <p className="card-subheading">How this will appear in trader mandi boards.</p>
              </div>
            </div>

            <div className="add-comm-card-body">
              <div className="commodity-mini-preview">
                <div className="mini-preview-thumb">
                  {imagePreview ? (
                    <img src={imagePreview} alt={commodityName} />
                  ) : (
                    <div className="mini-preview-placeholder">🌾</div>
                  )}
                </div>

                <div className="mini-preview-info">
                  <h4 className="mini-preview-title">{commodityName || 'Commodity Name'}</h4>
                  <p className="mini-preview-meta">
                    Code: <strong>{code || 'CODE'}</strong> • Unit: <strong>{unit}</strong>
                  </p>
                  <p className="mini-preview-category">
                    {categoriesList.find((c) => String(c.id) === String(categoryId))?.name || 'Category'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="add-comm-bottom-bar full-width-bar">
          <button
            type="button"
            className="btn-cancel"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <div className="bottom-bar-right-actions">
            <button
              type="button"
              className="btn-save-draft"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
            </button>

            <button
              type="submit"
              className="btn-publish-commodity"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>Publish Commodity</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
