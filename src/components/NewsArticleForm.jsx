import React, { useState, useEffect } from 'react';
import { getAdminNewsArticleDetails, createAdminNewsArticle, updateAdminNewsArticle } from '../api/newsService';
import './NewsArticleForm.css';

const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

export default function NewsArticleForm({ articleId, onBack, categories = [], sources = [] }) {
  const isEditing = articleId && articleId !== 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'news',
    short_description: '',
    content: '',
    news_category_id: '',
    news_source_id: '',
    author_name: '',
    source_url: '',
    published_on: '',
    status: 'draft',
    is_featured: false,
    is_breaking: false,
    featured_image: null,
  });

  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getAdminNewsArticleDetails(articleId);
        const data = res?.data?.data || res?.data || res;
        
        setFormData({
          title: data.title || '',
          content_type: data.content_type || 'news',
          short_description: data.short_description || '',
          content: data.content || '',
          news_category_id: data.category?.id || data.news_category_id || '',
          news_source_id: data.source?.id || data.news_source_id || '',
          author_name: data.author_name || '',
          source_url: data.source_url || '',
          published_on: data.published_on || '',
          status: data.status || 'draft',
          is_featured: !!data.is_featured,
          is_breaking: !!data.is_breaking,
          featured_image: null, // Keep null for file input
        });
        if (data.featured_image) {
          setCurrentImageUrl(data.featured_image);
        }
      } catch (err) {
        setError(err.message || 'Failed to load article details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isEditing) {
      fetchArticle();
    }
  }, [articleId, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, featured_image: file }));
      // Optional: create local preview URL
      setCurrentImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    let payload;
    
    // If a new file is uploaded, use FormData
    if (formData.featured_image instanceof File) {
      payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (typeof value === 'boolean') {
            payload.append(key, value ? '1' : '0');
          } else {
            payload.append(key, value);
          }
        }
      });
    } else {
      payload = { ...formData };
      delete payload.featured_image;
    }

    try {
      if (isEditing) {
        await updateAdminNewsArticle(articleId, payload);
      } else {
        await createAdminNewsArticle(payload);
      }
      onBack(); // Return to list on success
    } catch (err) {
      setError(err.message || 'Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="naform-loading">Loading article data...</div>;
  }

  return (
    <div className="naform-container">
      <div className="naform-toolbar">
        <button className="naform-back-btn" onClick={onBack} type="button">
          <ArrowLeftIcon size={16} /> Back to Articles
        </button>
        <h2 className="naform-title">{isEditing ? 'Edit Article' : 'Create New Article'}</h2>
      </div>

      {error && <div className="naform-error">{error}</div>}

      <form className="naform-layout" onSubmit={handleSubmit}>
        
        {/* LEFT MAIN CONTENT */}
        <div className="naform-main-fields">
          <div className="naform-group">
            <label htmlFor="title">Article Title <span className="req">*</span></label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="Enter a compelling title..." 
            />
          </div>

          <div className="naform-group">
            <label htmlFor="short_description">Short Description / Excerpt</label>
            <textarea 
              id="short_description" 
              name="short_description" 
              value={formData.short_description} 
              onChange={handleChange} 
              rows="2" 
              placeholder="Brief summary of the article..." 
            />
          </div>

          <div className="naform-group">
            <label htmlFor="content">Content (HTML allowed) <span className="req">*</span></label>
            <textarea 
              id="content" 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              required 
              rows="15" 
              placeholder="<p>Write your article content here...</p>" 
            />
          </div>
        </div>

        {/* RIGHT SIDEBAR SETTINGS */}
        <div className="naform-sidebar">
          
          <div className="naform-card">
            <h3>Publishing Settings</h3>
            
            <div className="naform-group">
              <label htmlFor="content_type">Content Type</label>
              <select id="content_type" name="content_type" value={formData.content_type} onChange={handleChange}>
                <option value="news">News</option>
                <option value="article">Article</option>
                <option value="press_release">Press Release</option>
                <option value="report">Report</option>
              </select>
            </div>

            <div className="naform-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="naform-group">
              <label htmlFor="featured_image">Featured Image</label>
              {currentImageUrl && (
                <img src={currentImageUrl} alt="Featured Preview" className="naform-image-preview" />
              )}
              <input type="file" id="featured_image" name="featured_image" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="naform-group">
              <label htmlFor="news_category_id">Category <span className="req">*</span></label>
              <select id="news_category_id" name="news_category_id" value={formData.news_category_id} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="naform-group">
              <label htmlFor="news_source_id">Source / Commodity</label>
              <select id="news_source_id" name="news_source_id" value={formData.news_source_id} onChange={handleChange}>
                <option value="">Select Source</option>
                {sources.map(src => (
                  <option key={src.id} value={src.id}>{src.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="naform-card">
            <h3>Author & Publication</h3>
            
            <div className="naform-group">
              <label htmlFor="author_name">Author Name</label>
              <input type="text" id="author_name" name="author_name" value={formData.author_name} onChange={handleChange} placeholder="e.g. SEBI" />
            </div>

            <div className="naform-group">
              <label htmlFor="source_url">Source URL</label>
              <input type="url" id="source_url" name="source_url" value={formData.source_url} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="naform-group">
              <label htmlFor="published_on">Published On</label>
              <input type="date" id="published_on" name="published_on" value={formData.published_on} onChange={handleChange} />
            </div>
          </div>

          <div className="naform-card">
            <h3>Highlights</h3>
            
            <div className="naform-toggle">
              <label className="switch">
                <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
                <span className="slider round"></span>
              </label>
              <span>Featured Article</span>
            </div>

            <div className="naform-toggle">
              <label className="switch">
                <input type="checkbox" name="is_breaking" checked={formData.is_breaking} onChange={handleChange} />
                <span className="slider round"></span>
              </label>
              <span>Breaking News</span>
            </div>
          </div>

          <div className="naform-actions">
            <button type="button" className="btn-cancel" onClick={onBack} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-save" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Article'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
