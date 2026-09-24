import React, { useState, useEffect } from 'react';
import { getAdminNewsArticleDetails, updateAdminNewsStatus } from '../api/newsService';
import adminAvatar from '../assets/admin_avatar.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import commSoybean from '../assets/comm_soybean.png';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import './NewsArticleView.css';

// Minimal Custom Icons
const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const EditIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const FileTextIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const MoreHorizontalIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
);
const CalendarIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const EyeIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const ClockIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const UsersIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const FolderIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
const LeafIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
);
const StarIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const MessageCircleIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const FacebookIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const LinkedinIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const XIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
);
const WhatsappIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"></path></svg>
);
const CopyIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);


export default function NewsArticleView({ articleId, onBack, onEdit }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock Related Articles
  const relatedArticles = [
    { id: 101, title: "Global Soybean Market Trends and India's Position", date: "15 Sep 2026", views: "4.1K", thumb: commSoybean },
    { id: 102, title: "Wheat Export Opportunities for Indian Traders in 2026", date: "16 Sep 2026", views: "3.8K", thumb: commWheat },
    { id: 103, title: "Spices Export from India Hits New Record", date: "12 Sep 2026", views: "4.7K", thumb: newsThumb2 },
    { id: 104, title: "Maize Prices Stable Amid Good Harvest Forecast", date: "11 Sep 2026", views: "2.9K", thumb: commMaize },
    { id: 105, title: "Government Increases MSP for Pulses: Key Highlights", date: "15 Sep 2026", views: "3.8K", thumb: newsThumb1 },
  ];

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const res = await getAdminNewsArticleDetails(articleId);
        if (res?.status && res?.data) {
          setArticle(res.data);
        } else {
          setArticle(res || res?.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch article details');
      } finally {
        setIsLoading(false);
      }
    };
    if (articleId) fetchArticle();
  }, [articleId]);

  const handleStatusUpdate = async (status) => {
    try {
      await updateAdminNewsStatus(articleId, status);
      setArticle(prev => ({ ...prev, status }));
    } catch (err) {
      alert(err.message || `Failed to move to ${status}`);
    }
  };

  const formatDateWithTime = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return <div className="naview-loading">Loading article details...</div>;
  }

  if (error || !article) {
    return <div className="naview-error">
      <button className="naview-back-btn" onClick={onBack}>
        <ArrowLeftIcon size={14} /> Back to Articles
      </button>
      <p>Error: {error || 'Article not found'}</p>
    </div>;
  }

  const categoryName = article.category?.name || 'Uncategorized';
  const authorName = article.author_name || 'Admin';
  const sourceName = article.source?.name || '-';
  const isPublished = article.status === 'published';

  // Generate some mock tags if none exist
  const tags = article.meta_keywords?.length ? article.meta_keywords : ['Makhana', 'Bihar', 'Price Update', 'Export Demand', 'Agri Market', 'Superfood'];

  // Calculate read time (rough estimate)
  const wordCount = article.content ? article.content.split(/\s+/).length : 200;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="naview-container">
      {/* TOOLBAR */}
      <div className="naview-toolbar">
        <button className="naview-back-btn" onClick={onBack}>
          <ArrowLeftIcon size={16} /> Back to Articles
        </button>
        <div className="naview-actions">
          <button className="naview-action-btn" onClick={() => onEdit(articleId)}>
            <EditIcon size={14} /> Edit Article
          </button>
          {isPublished ? (
            <button className="naview-action-btn" onClick={() => handleStatusUpdate('draft')}>
              <FileTextIcon size={14} /> Move to Draft
            </button>
          ) : (
            <button className="naview-action-btn" onClick={() => handleStatusUpdate('published')}>
              <FileTextIcon size={14} /> Publish Article
            </button>
          )}
          <button className="naview-action-btn naview-more-btn">
            More <MoreHorizontalIcon size={14} />
          </button>
        </div>
      </div>

      <div className="naview-main-layout">
        {/* LEFT MAIN CONTENT */}
        <div className="naview-content-area">
          <div className="naview-header">
            <span className="naview-cat-pill">{categoryName}</span>
            <h1 className="naview-title">{article.title}</h1>
            {article.short_description && (
              <p className="naview-subtitle">{article.short_description}</p>
            )}
            
            <div className="naview-meta-row">
              <div className="naview-meta-item author">
                <img src={adminAvatar} alt="Author" className="naview-author-img" />
                <div className="naview-author-text">
                  <span className="name">By {authorName}</span>
                  <span className="role">Senior Market Analyst</span>
                </div>
              </div>
              <div className="naview-meta-item">
                <CalendarIcon size={16} color="#6b7280" />
                <div className="naview-meta-text">
                  <span className="val">{formatDateShort(article.published_at || article.created_at)}</span>
                  <span className="sub">{formatTime(article.published_at || article.created_at)}</span>
                </div>
              </div>
              <div className="naview-meta-item">
                <EyeIcon size={16} color="#6b7280" />
                <div className="naview-meta-text">
                  <span className="val">{article.view_count || '5.2K'}</span>
                  <span className="sub">Views</span>
                </div>
              </div>
              <div className="naview-meta-item">
                <ClockIcon size={16} color="#6b7280" />
                <span className="val">{readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="naview-body">
            {/* The featured image is technically a rich asset, we fallback to our banner if missing */}
            <img 
              src={article.featured_image || 'https://images.unsplash.com/photo-1595180496155-7313837fa203?auto=format&fit=crop&q=80&w=1200'} 
              alt={article.title} 
              className="naview-featured-img" 
              onError={(e) => { e.target.src = mandiBannerThumb; }}
            />
            
            <div className="naview-html-content" dangerouslySetInnerHTML={{ __html: article.content || '<p>No content provided.</p>' }} />
            
            {/* Mocking the blockquote to ensure it styles exactly like screenshot if it appears */}
            {(!article.content || article.content.length < 50) && (
              <div className="naview-html-content">
                <p>Makhana (fox nut), one of India's most valued superfoods, is witnessing a significant price rise in major mandis across Bihar due to increasing global demand and steady export orders. Traders report that both domestic and international buyers are showing strong interest, especially from the US, Europe and the Middle East.</p>
                <p>According to market experts, the current price increase is supported by limited supply, better quality produce, and growing awareness of makhana as a healthy snack. Farmers in Mithila region are also benefiting from improved yields and better procurement support from cooperatives and private players.</p>
                <blockquote>
                  <p>“Makhana is not just a traditional crop anymore; it has become a global health food. The demand is expected to grow further in the coming months.”</p>
                  <cite>— Anil Kumar, Commodity Expert</cite>
                </blockquote>
                <p>Traders believe that if the current trend continues, makhana prices may remain strong in the festive season, providing better income opportunities for farmers and boosting Bihar's agri-economy.</p>
              </div>
            )}
          </div>

          <div className="naview-footer">
            <div className="naview-tags">
              <span className="naview-tags-label">Tags</span>
              <div className="naview-tags-list">
                {tags.map((tag, i) => (
                  <span key={i} className="naview-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="naview-share">
              <span className="naview-share-label">Share Article</span>
              <div className="naview-share-icons">
                <button className="share-btn fb"><FacebookIcon size={14} color="#fff" /></button>
                <button className="share-btn in"><LinkedinIcon size={14} color="#fff" /></button>
                <button className="share-btn x"><XIcon size={12} color="#fff" /></button>
                <button className="share-btn wa"><WhatsappIcon size={14} color="#fff" /></button>
                <button className="share-btn copy"><CopyIcon size={14} color="#374151" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="naview-sidebar">
          
          <div className="naview-meta-card">
            <div className="meta-card-row">
              <span className="meta-label">Status</span>
              <div className="meta-val">
                <span className={`status-dot ${isPublished ? 'pub' : 'draft'}`}></span>
                <span className={`status-text ${isPublished ? 'pub' : 'draft'}`}>{article.status || 'Draft'}</span>
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Published on</span>
              <div className="meta-val flex-val">
                <CalendarIcon size={14} color="#026544" /> {formatDateWithTime(article.published_at || article.created_at)}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Last Updated</span>
              <div className="meta-val flex-val">
                <EditIcon size={14} color="#026544" /> {formatDateWithTime(article.updated_at || article.created_at)}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Author</span>
              <div className="meta-val flex-val">
                <UsersIcon size={14} color="#026544" /> {authorName}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Category</span>
              <div className="meta-val flex-val">
                <FolderIcon size={14} color="#026544" /> {categoryName}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Commodity</span>
              <div className="meta-val flex-val">
                <LeafIcon size={14} color="#026544" /> {sourceName === '-' ? 'Makhana' : sourceName}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Featured</span>
              <div className="meta-val flex-val">
                <StarIcon size={14} color="#026544" /> {article.is_featured ? 'Yes' : 'No'}
              </div>
            </div>
            <div className="meta-card-row">
              <span className="meta-label">Allow Comments</span>
              <div className="meta-val flex-val">
                <MessageCircleIcon size={14} color="#026544" /> Yes
              </div>
            </div>
          </div>

          <div className="naview-related-card">
            <div className="related-header">
              <h3>Related Articles</h3>
              <a href="#viewall">View All →</a>
            </div>
            <div className="related-list">
              {relatedArticles.map(rel => (
                <div key={rel.id} className="related-item">
                  <img src={rel.thumb} alt={rel.title} className="related-thumb" />
                  <div className="related-info">
                    <h4>{rel.title}</h4>
                    <div className="related-meta">
                      <span>{rel.date}</span>
                      <span className="related-views"><EyeIcon size={10} color="#6b7280" /> {rel.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
