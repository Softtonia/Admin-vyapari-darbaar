import React, { useState, useRef, useEffect } from 'react';
import welcomeBgImg from '../assets/welcome_banner_sketch.png';
import commMakhana from '../assets/comm_makhana.png';
import brandCrest from '../assets/brand_crest.png';
import {
  getCommodityCategoryOptions,
  getCommodityOptions,
  getCommoditySubcategoryOptions,
  getCommodityVarietyOptions,
  getCommodityGradeOptions,
  createCommodity,
  getStateOptions,
  getDistrictOptions,
  getMandiOptions,
  getExchangeOptions,
  getExchangeCommodityMappingOptions,
  getExchangeInstrumentOptions,
} from '../api/commodityService';
import './AddCommodity.css';

export default function AddCommodity({ onBack }) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('Basic Information');

  // Form State - Commodity Information matching Postman form-data
  // Fields: commodity_category_id, name, slug, code, unit, image, description, sort_order, status
  const [commodityName, setCommodityName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [code, setCode] = useState('');
  const [codeEdited, setCodeEdited] = useState(false);
  const [category, setCategory] = useState('');
  const [variety, setVariety] = useState('');
  const [unit, setUnit] = useState('QUINTAL');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('1');

  // Dependent Options Chaining (commodity_id, commodity_subcategory_id)
  const [commodityId, setCommodityId] = useState('1');
  const [commoditiesList, setCommoditiesList] = useState([]);

  // Form State - Commodity Specifications
  const [qualityGrade, setQualityGrade] = useState('');
  const [originState, setOriginState] = useState('');
  const [commonUses, setCommonUses] = useState('');
  const [harvestSeason, setHarvestSeason] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [hsnCode, setHSNCode] = useState('');
  const [minOrderQty, setMinOrderQty] = useState('');
  const [packingType, setPackingType] = useState('');

  // Form State - Commodity Image
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Form State - Current Market Price
  const [currentPrice, setCurrentPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('Quintal');
  const [mandi, setMandi] = useState('');
  const [priceDate, setPriceDate] = useState('17 Sep 2026');
  const [trend, setTrend] = useState('No Change');
  const [priceChange, setPriceChange] = useState('₹ 0.00');

  // Form State - Status & Visibility
  const [statusActive, setStatusActive] = useState(true);
  const [featuredCommodity, setFeaturedCommodity] = useState(false);
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [sendPriceAlerts, setSendPriceAlerts] = useState(false);

  // Form State - Pricing & Market Data Tab
  const [modalPrice, setModalPrice] = useState('1,250');
  const [minPrice, setMinPrice] = useState('1,080');
  const [maxPrice, setMaxPrice] = useState('1,420');
  const [pricingUnit, setPricingUnit] = useState('Quintal (100 Kg)');
  const [pricingMandi, setPricingMandi] = useState('Darbhanga (Bihar)');
  const [pricingDate, setPricingDate] = useState('17 Sep 2026');
  const [isLatestActivePrice, setIsLatestActivePrice] = useState(true);

  // Price Trend Preview
  const [trendTimeRange, setTrendTimeRange] = useState('1M');

  // Historical Price Data
  const [historicalRecords, setHistoricalRecords] = useState([
    { id: 1, date: '17 Sep 2026', mandi: 'Darbhanga', minPrice: '1,080', modalPrice: '1,250', maxPrice: '1,420' },
  ]);

  // Market Information
  const [marketTrend, setMarketTrend] = useState('Increasing');
  const [priceVolatility, setPriceVolatility] = useState('Moderate');
  const [marketSentiment, setMarketSentiment] = useState('Positive');
  const [marketFactors, setMarketFactors] = useState('Good demand in export markets. Domestic consumption stable.');

  // Exchange & Futures Data
  const [exchange, setExchange] = useState('');
  const [contractMonth, setContractMonth] = useState('');
  const [futuresPrice, setFuturesPrice] = useState('');
  const [futuresChange, setFuturesChange] = useState('');

  // External References
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [externalSources, setExternalSources] = useState([]);

  // Form State - Categorisation Tab
  const [mainCategory, setMainCategory] = useState('Cereals & Grains');
  const [subCategory, setSubCategory] = useState('');
  const [commodityGroup, setCommodityGroup] = useState('');
  const [tags, setTags] = useState(['nutritious', 'high-demand', 'export', 'rabi-crop']);
  const [tagInput, setTagInput] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('wheat');
  const [categoryColor, setCategoryColor] = useState('#026544');
  const [marketType, setMarketType] = useState('Agricultural Produce (APMC)');
  const [treeExpanded, setTreeExpanded] = useState({
    agri: true,
    cereals: true,
    millets: true,
  });

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,|,$/g, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const handleAddHistoricalRecord = () => {
    const newRecord = {
      id: Date.now(),
      date: '17 Sep 2026',
      mandi: 'Darbhanga',
      minPrice: '',
      modalPrice: '',
      maxPrice: '',
    };
    setHistoricalRecords([...historicalRecords, newRecord]);
  };

  const handleRemoveHistoricalRecord = (id) => {
    setHistoricalRecords(historicalRecords.filter((rec) => rec.id !== id));
  };

  const handleAddExternalSource = () => {
    if (!sourceName.trim()) {
      showToast('Please enter source name', 'error');
      return;
    }
    setExternalSources([...externalSources, { id: Date.now(), name: sourceName, url: sourceUrl }]);
    setSourceName('');
    setSourceUrl('');
    showToast('Source added successfully');
  };

  // Form State - Additional Details Tab
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [qualityParams, setQualityParams] = useState(['Purity', 'Moisture', 'Grain Size', 'Foreign Matter']);
  const [nutritionalBenefits, setNutritionalBenefits] = useState('');
  const [harvestSeasonDetails, setHarvestSeasonDetails] = useState('Oct - Dec');
  const [shelfLifeDetails, setShelfLifeDetails] = useState('12 months');
  const [availability, setAvailability] = useState('Year Round');
  const [storageConditions, setStorageConditions] = useState('');
  const [handlingInstructions, setHandlingInstructions] = useState('');
  const [relatedCommodities, setRelatedCommodities] = useState(['Rice', 'Maize']);
  const [relatedSearch, setRelatedSearch] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState([
    { id: 1, name: 'specification.pdf', size: '2.4 MB' },
    { id: 2, name: 'quality-report.pdf', size: '1.8 MB' },
    { id: 3, name: 'guidelines.pdf', size: '1.2 MB' },
  ]);

  const handleRemoveQualityParam = (param) => {
    setQualityParams(qualityParams.filter((p) => p !== param));
  };

  const handleRemoveRelatedComm = (comm) => {
    setRelatedCommodities(relatedCommodities.filter((c) => c !== comm));
  };

  const handleRemoveDoc = (id) => {
    setUploadedDocs(uploadedDocs.filter((d) => d.id !== id));
  };

  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Document exceeds 10 MB limit', 'error');
        return;
      }
      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      };
      setUploadedDocs([...uploadedDocs, newDoc]);
      showToast('Document uploaded successfully');
    }
  };

  // Form State - SEO & Visibility Tab
  const [seoTitle, setSeoTitle] = useState('Makhana Price Today | Makhana Mandi Rates | Vyapari Darbaar');
  const [metaDescription, setMetaDescription] = useState('Get latest Makhana prices, mandi rates, market trends and insights across India. Compare rates, analysis and connect with verified traders on Vyapari Darbaar.');
  const [urlSlug, setUrlSlug] = useState('makhana');
  const [seoKeywords, setSeoKeywords] = useState(['makhana', 'makhana price', 'fox nut', 'makhana mandi rate', 'makhana wholesale']);
  const [keywordInput, setKeywordInput] = useState('');
  const [socialTab, setSocialTab] = useState('Facebook');
  
  // Visibility Settings
  const [visibilityShowOnWebsite, setVisibilityShowOnWebsite] = useState(true);
  const [visibilityIncludeInSearch, setVisibilityIncludeInSearch] = useState(true);
  const [visibilityShowInCategory, setVisibilityShowInCategory] = useState(true);
  const [visibilityFeaturedCommodity, setVisibilityFeaturedCommodity] = useState(false);

  // Structured Data Settings
  const [schemaProduct, setSchemaProduct] = useState(true);
  const [schemaPrice, setSchemaPrice] = useState(true);
  const [schemaBreadcrumb, setSchemaBreadcrumb] = useState(true);
  const [schemaFaq, setSchemaFaq] = useState(true);

  const handleRemoveKeyword = (kw) => {
    setSeoKeywords(seoKeywords.filter((k) => k !== kw));
  };

  const handleAddKeyword = (kw) => {
    if (kw.trim() && !seoKeywords.includes(kw.trim())) {
      setSeoKeywords([...seoKeywords, kw.trim()]);
    }
    setKeywordInput('');
  };

  // API Master Data States
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [varietiesList, setVarietiesList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [mandisList, setMandisList] = useState([]);
  const [exchangesList, setExchangesList] = useState([]);
  const [exchangeInstrumentsList, setExchangeInstrumentsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load Initial Master Options on mount
  useEffect(() => {
    let isMounted = true;

    // 1. Commodity Categories
    setIsLoadingCategories(true);
    getCommodityCategoryOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setCategoriesList(list);
        }
      })
      .catch((err) => console.warn('Categories load error:', err))
      .finally(() => {
        if (isMounted) setIsLoadingCategories(false);
      });

    // 2. Initial Commodities list for options
    getCommodityOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) {
            setCommoditiesList(list);
            if (list[0]?.id) {
              setCommodityId(String(list[0].id));
            }
          }
        }
      })
      .catch((err) => console.warn('Commodities load error:', err));

    // 3. States
    getStateOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setStatesList(list);
        }
      })
      .catch((err) => console.warn('States load error:', err));

    // 4. Mandis
    getMandiOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setMandisList(list);
        }
      })
      .catch((err) => console.warn('Mandis load error:', err));

    // 5. Exchanges
    getExchangeOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setExchangesList(list);
        }
      })
      .catch((err) => console.warn('Exchanges load error:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // When Category changes, fetch commodity options for that category
  useEffect(() => {
    if (!category) return;
    let isMounted = true;
    getCommodityOptions({ commodity_category_id: category })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) {
            setCommoditiesList(list);
            setCommodityId(String(list[0].id));
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [category]);

  // Load Subcategories and Grades when commodityId changes
  // api/admin/commodity-subcategories/options?commodity_id={{commodity_id}}
  // api/admin/commodity-grades/options?commodity_id={{commodity_id}}
  useEffect(() => {
    const activeCommId = commodityId || 1;
    let isMounted = true;

    // Subcategories by commodity_id
    getCommoditySubcategoryOptions({ commodity_id: activeCommId })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          setSubcategoriesList(list);
        }
      })
      .catch((err) => console.warn('Subcategories load error:', err));

    // Grades by commodity_id
    getCommodityGradeOptions({ commodity_id: activeCommId })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          setGradesList(list);
        }
      })
      .catch((err) => console.warn('Grades load error:', err));

    // Varieties by commodity_id and current subCategory
    getCommodityVarietyOptions({
      commodity_id: activeCommId,
      commodity_subcategory_id: subCategory || undefined,
    })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          setVarietiesList(list);
        }
      })
      .catch((err) => console.warn('Varieties load error:', err));

    return () => {
      isMounted = false;
    };
  }, [commodityId]);

  // Load Varieties when subCategory changes
  // api/admin/commodity-varieties/options?commodity_id={{commodity_id}}&commodity_subcategory_id={{commodity_subcategory_id}}
  useEffect(() => {
    const activeCommId = commodityId || 1;
    let isMounted = true;

    const params = { commodity_id: activeCommId };
    if (subCategory) {
      params.commodity_subcategory_id = subCategory;
    }

    getCommodityVarietyOptions(params)
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          setVarietiesList(list);
        }
      })
      .catch((err) => console.warn('Varieties for subcategory load error:', err));

    return () => {
      isMounted = false;
    };
  }, [commodityId, subCategory]);

  // Load Mandis when Origin State changes
  useEffect(() => {
    if (!originState) return;
    const selectedStateObj = statesList.find(
      (s) => s.name === originState || String(s.id) === String(originState)
    );
    const stateId = selectedStateObj ? selectedStateObj.id : originState;
    let isMounted = true;
    getMandiOptions({ state_id: stateId })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setMandisList(list);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [originState, statesList]);

  // Load Instruments when Exchange changes
  useEffect(() => {
    if (!exchange) return;
    const selectedExObj = exchangesList.find(
      (e) => e.code === exchange || e.name === exchange || String(e.id) === String(exchange)
    );
    const exId = selectedExObj ? selectedExObj.id : exchange;
    let isMounted = true;
    getExchangeInstrumentOptions({ exchange_id: exId })
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          setExchangeInstrumentsList(list);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [exchange, exchangesList]);

  // Notification / Feedback State
  const [notification, setNotification] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast('File exceeds maximum size of 5 MB', 'error');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    showToast('Image uploaded successfully');
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
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Actions
  const handleSaveDraft = async () => {
    if (!commodityName.trim()) {
      showToast('Please enter at least a commodity name to save as draft.', 'error');
      return;
    }
    await handlePublishInternal(false);
  };

  const handlePublish = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!commodityName.trim()) {
      showToast('Please enter commodity name', 'error');
      return;
    }
    if (!category) {
      showToast('Please select a category', 'error');
      return;
    }
    if (!unit) {
      showToast('Please select a unit', 'error');
      return;
    }
    if (!description.trim()) {
      showToast('Please provide a description', 'error');
      return;
    }
    await handlePublishInternal(statusActive);
  };

  const handlePublishInternal = async (isActiveStatus = true) => {
    setIsSubmitting(true);
    try {
      const selectedCatObj = categoriesList.find(
        (c) => String(c.id) === String(category) || c.name === category
      );
      const catId = selectedCatObj ? selectedCatObj.id : category;

      const finalSlug = (
        slug ||
        commodityName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      ).trim();

      const finalCode = (
        code ||
        hsnCode ||
        commodityName.slice(0, 6)
      )
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '');

      // Build FormData for multipart request to /api/admin/commodities strictly matching Postman
      // Keys: commodity_category_id, name, slug, code, unit, image, description, sort_order, status
      const formData = new FormData();
      formData.append('commodity_category_id', catId);
      formData.append('name', commodityName.trim());
      formData.append('slug', finalSlug);
      formData.append('code', finalCode || 'COMM');
      formData.append('unit', unit ? unit.toUpperCase().replace(/\s+/g, '_') : 'QUINTAL');
      formData.append('description', description.trim());
      formData.append('sort_order', String(sortOrder || '1'));
      formData.append('status', isActiveStatus ? '1' : '0');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await createCommodity(formData);
      showToast(response?.message || `Commodity "${commodityName}" created successfully!`, 'success');

      if (onBack) {
        setTimeout(() => {
          onBack();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to create commodity:', err);
      let errMsg = err.data?.message || err.message || 'Failed to create commodity.';
      if (err.data?.errors && typeof err.data.errors === 'object') {
        const firstErr = Object.values(err.data.errors)[0];
        if (Array.isArray(firstErr)) {
          errMsg = firstErr[0];
        } else if (typeof firstErr === 'string') {
          errMsg = firstErr;
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

      {/* ====================================================================
          1. Header Section: Breadcrumb + Title & Quote Banner
          ==================================================================== */}
      <div className="add-comm-header">
        <div className="add-comm-header-left">
          {/* Back link */}
          <button
            type="button"
            className="add-comm-back-btn"
            onClick={onBack}
            title="Back to Commodities list"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Commodities</span>
          </button>

          <h1 className="add-comm-page-title">Add Commodity</h1>
          <p className="add-comm-page-subtitle">
            Add a new agricultural commodity to the platform. Provide accurate details to help traders get the right information.
          </p>
        </div>

        <div className="add-comm-header-right">
          <div className="add-comm-quote-block">
            <span className="add-comm-quote-text">
              {activeTab === 'SEO & Visibility' ? (
                <>
                  “Greater Visibility<br />
                  Better Opportunities<br />
                  for Indian Agriculture.”
                </>
              ) : activeTab === 'Additional Details' ? (
                <>
                  “Detailed Information<br />
                  Builds Trust<br />
                  in Every Trade.”
                </>
              ) : activeTab === 'Categorisation' ? (
                <>
                  “Organised Markets<br />
                  Stronger Farmers<br />
                  A Prosperous Bharat.”
                </>
              ) : activeTab === 'Pricing & Market Data' ? (
                <>
                  “Accurate Market Data<br />
                  Builds Smarter Decisions<br />
                  for a Stronger Bharat.”
                </>
              ) : (
                <>
                  “Accurate Data<br />
                  Empowers Traders<br />
                  Builds a Stronger Bharat.”
                </>
              )}
            </span>
          </div>
          <div className="add-comm-banner-sketch-wrapper">
            <img
              src={welcomeBgImg}
              alt="Indian Mandi Sketch"
              className="add-comm-banner-sketch"
            />
          </div>
          <div className="add-comm-slogan-block">
            <div className="slogan-divider-line" />
            <div className="slogan-words">
              <span>TRADE</span>
              <span>INFORM</span>
              <span>CONNECT</span>
              <span>GROW</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. Horizontal Section Tabs
          ==================================================================== */}
      <div className="add-comm-tabs-nav">
        {/* Tab 1: Basic Information */}
        <button
          type="button"
          className={`add-comm-tab-pill ${activeTab === 'Basic Information' ? 'active' : ''}`}
          onClick={() => setActiveTab('Basic Information')}
        >
          <svg className="tab-pill-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span>Basic Information</span>
        </button>

        {/* Tab 2: Pricing & Market Data */}
        <button
          type="button"
          className={`add-comm-tab-pill ${activeTab === 'Pricing & Market Data' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pricing & Market Data')}
        >
          <svg className="tab-pill-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Pricing & Market Data</span>
        </button>

        {/* Tab 3: Categorisation */}
        <button
          type="button"
          className={`add-comm-tab-pill ${activeTab === 'Categorisation' ? 'active' : ''}`}
          onClick={() => setActiveTab('Categorisation')}
        >
          <svg className="tab-pill-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Categorisation</span>
        </button>

        {/* Tab 4: Additional Details */}
        <button
          type="button"
          className={`add-comm-tab-pill ${activeTab === 'Additional Details' ? 'active' : ''}`}
          onClick={() => setActiveTab('Additional Details')}
        >
          <svg className="tab-pill-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="m9 16 2 2 4-4" />
          </svg>
          <span>Additional Details</span>
        </button>

        {/* Tab 5: SEO & Visibility */}
        <button
          type="button"
          className={`add-comm-tab-pill ${activeTab === 'SEO & Visibility' ? 'active' : ''}`}
          onClick={() => setActiveTab('SEO & Visibility')}
        >
          <svg className="tab-pill-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>SEO & Visibility</span>
        </button>
      </div>

      {/* ====================================================================
          3. Tab Content Views
          ==================================================================== */}
      {/* --------------------------------------------------------------------
          TAB 1: Basic Information View
          -------------------------------------------------------------------- */}
      {activeTab === 'Basic Information' && (
        <form onSubmit={handlePublish} className="add-comm-main-grid">
          {/* LEFT COLUMN: Commodity Information & Specifications */}
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
                  <p className="card-subheading">Enter the basic details of the commodity.</p>
                </div>
              </div>

              <div className="add-comm-card-body">
                {/* Row 1: Commodity Name & Category */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Commodity Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Wheat"
                      value={commodityName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCommodityName(val);
                        if (!slugEdited) {
                          setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                        }
                        if (!codeEdited && val) {
                          setCode(val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10));
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Category <span className="req-star">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!category ? 'is-placeholder' : ''}`}
                        value={category}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategory(val);
                          const matched = categoriesList.find((c) => String(c.id) === String(val));
                          if (matched) {
                            setMainCategory(matched.name);
                          }
                        }}
                        required
                        disabled={isLoadingCategories}
                      >
                        <option value="">{isLoadingCategories ? 'Loading Categories...' : 'Select Category'}</option>
                        {categoriesList.length > 0 ? (
                          categoriesList.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="1">Grains & Cereals</option>
                            <option value="2">Pulses</option>
                            <option value="3">Oilseeds</option>
                            <option value="4">Spices</option>
                            <option value="5">Dry Fruits & Nuts</option>
                            <option value="6">Commercial Crops</option>
                            <option value="7">Fruits & Vegetables</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 2: Commodity Code & Slug (from Postman) */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Commodity Code <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. WHEAT"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setCodeEdited(true);
                      }}
                      required
                    />
                    <span className="field-hint">e.g. WHEAT, RICE, MAIZE</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Slug <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. wheat"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                        setSlugEdited(true);
                      }}
                      required
                    />
                    <span className="field-hint">e.g. wheat, basmati-rice</span>
                  </div>
                </div>

                {/* Row 3: Subcategory & Variety (Cascading from API) */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Subcategory
                    </label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!subCategory ? 'is-placeholder' : ''}`}
                        value={subCategory}
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                          setVariety('');
                        }}
                      >
                        <option value="">Select Subcategory</option>
                        {subcategoriesList.length > 0 ? (
                          subcategoriesList.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>No subcategories found</option>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Loaded from api/admin/commodity-subcategories/options</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Variety
                    </label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!variety ? 'is-placeholder' : ''}`}
                        value={variety}
                        onChange={(e) => setVariety(e.target.value)}
                      >
                        <option value="">Select Variety</option>
                        {varietiesList.length > 0 ? (
                          varietiesList.map((v) => (
                            <option key={v.id} value={v.name || v.id}>
                              {v.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>No varieties found</option>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Loaded from api/admin/commodity-varieties/options</span>
                  </div>
                </div>

                {/* Row 4: Unit & Sort Order */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Unit <span className="req-star">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!unit ? 'is-placeholder' : ''}`}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                      >
                        <option value="QUINTAL">QUINTAL (100 Kg)</option>
                        <option value="KILOGRAM">KILOGRAM (Kg)</option>
                        <option value="METRIC_TON">METRIC TON</option>
                        <option value="BAG">BAG (50 Kg)</option>
                        <option value="PIECE">PIECE</option>
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">e.g. QUINTAL, KILOGRAM, BAG</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="1"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      min="0"
                    />
                    <span className="field-hint">Display order (default: 1)</span>
                  </div>
                </div>

                {/* Row 5: Description */}
                <div className="form-group full-width">
                  <label className="form-label">
                    Description <span className="req-star">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    maxLength={500}
                    placeholder="Provide a detailed description of the commodity, its uses, quality, and other relevant information..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <div className="textarea-footer">
                    <span className="char-counter">{description.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Commodity Specifications */}
            <div className="add-comm-card">
              <div className="add-comm-card-header">
                <div className="card-header-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="card-header-titles">
                  <h2 className="card-heading">Commodity Specifications</h2>
                  <p className="card-subheading">Add key specifications and attributes.</p>
                </div>
              </div>

              <div className="add-comm-card-body">
                {/* Row 1: Quality Grade, Origin State, Common Uses */}
                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">Quality Grade</label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!qualityGrade ? 'is-placeholder' : ''}`}
                        value={qualityGrade}
                        onChange={(e) => setQualityGrade(e.target.value)}
                      >
                        <option value="">Select Quality Grade</option>
                        {gradesList.length > 0 ? (
                          gradesList.map((g) => (
                            <option key={g.id} value={g.name || g.id}>
                              {g.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="FAQ">FAQ (Fair Average Quality)</option>
                            <option value="Grade A">Grade A</option>
                            <option value="Premium">Premium</option>
                            <option value="Super">Super</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Loaded from api/admin/commodity-grades/options</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Origin State</label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!originState ? 'is-placeholder' : ''}`}
                        value={originState}
                        onChange={(e) => setOriginState(e.target.value)}
                      >
                        <option value="">Select State</option>
                        {statesList.length > 0 ? (
                          statesList.map((st) => (
                            <option key={st.id} value={st.name}>
                              {st.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Bihar">Bihar</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Common Uses</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Food, Export, Industrial"
                      value={commonUses}
                      onChange={(e) => setCommonUses(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2: Harvest Season, Shelf Life, HSN Code */}
                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">Harvest Season</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Oct - Dec"
                      value={harvestSeason}
                      onChange={(e) => setHarvestSeason(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Shelf Life (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 12 months"
                      value={shelfLife}
                      onChange={(e) => setShelfLife(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">HSN Code (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 0714"
                      value={hsnCode}
                      onChange={(e) => setHSNCode(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 3: Minimum Order Quantity & Packing Type */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Minimum Order Quantity (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 10 Quintals"
                      value={minOrderQty}
                      onChange={(e) => setMinOrderQty(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Packing Type (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Jute Bag, PP Bag, Loose"
                      value={packingType}
                      onChange={(e) => setPackingType(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Commodity Image, Current Market Price, Status */}
          <div className="add-comm-col right-col">
            {/* Card 3: Commodity Image */}
            <div className="add-comm-card">
              <div className="add-comm-card-header">
                <div className="card-header-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="card-header-titles">
                  <h2 className="card-heading">Commodity Image</h2>
                  <p className="card-subheading">Upload a clear image of the commodity.</p>
                </div>
              </div>

              <div className="add-comm-card-body image-card-layout">
                {/* Left Box: Upload Dropzone */}
                <div
                  className={`image-dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                  />

                  {imagePreview ? (
                    <div className="dropzone-preview">
                      <img src={imagePreview} alt="Commodity Preview" className="uploaded-preview-img" />
                      <button type="button" className="btn-remove-img" onClick={removeImage} title="Remove image">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="dropzone-icon-box">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                          <path d="M12 12v9" />
                          <path d="m8 16 4-4 4 4" />
                        </svg>
                      </div>
                      <div className="dropzone-text-group">
                        <span className="dropzone-title">Drag & drop an image here</span>
                        <span className="dropzone-action">or click to browse</span>
                      </div>
                      <span className="dropzone-support-text">
                        Supports: JPG, PNG, WebP (Max 5 MB)
                      </span>
                    </>
                  )}
                </div>

                {/* Right Box: Image Guidelines */}
                <div className="image-guidelines-box">
                  <div className="guidelines-header">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                    </svg>
                    <span className="guidelines-title">Image Guidelines</span>
                  </div>

                  <ul className="guidelines-list">
                    <li>
                      <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Use clear, high-quality images</span>
                    </li>
                    <li>
                      <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Show actual product</span>
                    </li>
                    <li>
                      <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Avoid watermarks or text</span>
                    </li>
                    <li>
                      <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Recommended size: 1200 × 800 px</span>
                    </li>
                    <li>
                      <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Max file size: 5 MB</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: Current Market Price */}
            <div className="add-comm-card">
              <div className="add-comm-card-header">
                <div className="card-header-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div className="card-header-titles">
                  <h2 className="card-heading">Current Market Price</h2>
                  <p className="card-subheading">Add latest price information for this commodity.</p>
                </div>
              </div>

              <div className="add-comm-card-body">
                {/* Row 1: Current Price, Unit, Mandi */}
                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">
                      Current Price (₹) <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 1250"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <div className="select-wrapper">
                      <select
                        className="form-select"
                        value={priceUnit}
                        onChange={(e) => setPriceUnit(e.target.value)}
                      >
                        <option value="Quintal">Quintal</option>
                        <option value="Kilogram">Kilogram</option>
                        <option value="Metric Ton">Metric Ton</option>
                        <option value="Bag">Bag</option>
                        <option value="Piece">Piece</option>
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Mandi <span className="req-star">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        className={`form-select ${!mandi ? 'is-placeholder' : ''}`}
                        value={mandi}
                        onChange={(e) => setMandi(e.target.value)}
                      >
                        <option value="">Select Mandi</option>
                        {mandisList.length > 0 ? (
                          mandisList.map((m) => (
                            <option key={m.id} value={m.name}>
                              {m.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Darbhanga">Darbhanga</option>
                            <option value="Indore">Indore</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Ratlam">Ratlam</option>
                            <option value="Karnal">Karnal</option>
                            <option value="Latur">Latur</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Muzaffarpur">Muzaffarpur</option>
                            <option value="Rajkot">Rajkot</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 2: Price Date, Trend, Price Change */}
                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">
                      Price Date <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon-left">
                      <svg className="input-left-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <input
                        type="text"
                        className="form-input with-icon"
                        value={priceDate}
                        onChange={(e) => setPriceDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Trend</label>
                    <div className="select-wrapper select-with-icon">
                      <svg className="input-left-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 9 9 15 6 12 2 12" />
                      </svg>
                      <select
                        className="form-select with-icon"
                        value={trend}
                        onChange={(e) => setTrend(e.target.value)}
                      >
                        <option value="No Change">No Change</option>
                        <option value="Increasing">Increasing</option>
                        <option value="Decreasing">Decreasing</option>
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Price Change (Optional)</label>
                    <div className="input-with-badge-right">
                      <input
                        type="text"
                        className="form-input with-badge"
                        value={priceChange}
                        onChange={(e) => setPriceChange(e.target.value)}
                      />
                      <span className="input-inner-badge green">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Status & Visibility */}
            <div className="add-comm-card">
              <div className="add-comm-card-header">
                <div className="card-header-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="card-header-titles">
                  <h2 className="card-heading">Status & Visibility</h2>
                  <p className="card-subheading">Set the status and visibility for this commodity.</p>
                </div>
              </div>

              <div className="add-comm-card-body">
                <div className="toggle-grid-2x2">
                  {/* Toggle 1: Active */}
                  <div className="toggle-item" onClick={() => setStatusActive(!statusActive)}>
                    <button
                      type="button"
                      className={`switch-track ${statusActive ? 'on' : 'off'}`}
                      aria-checked={statusActive}
                      role="switch"
                    >
                      <span className="switch-thumb" />
                    </button>
                    <div className="toggle-text-block">
                      <span className="toggle-title">Active</span>
                      <span className="toggle-subtitle">Make this commodity visible on the platform</span>
                    </div>
                  </div>

                  {/* Toggle 2: Featured Commodity */}
                  <div className="toggle-item" onClick={() => setFeaturedCommodity(!featuredCommodity)}>
                    <button
                      type="button"
                      className={`switch-track ${featuredCommodity ? 'on' : 'off'}`}
                      aria-checked={featuredCommodity}
                      role="switch"
                    >
                      <span className="switch-thumb" />
                    </button>
                    <div className="toggle-text-block">
                      <span className="toggle-title">Featured Commodity</span>
                      <span className="toggle-subtitle">Highlight this commodity</span>
                    </div>
                  </div>

                  {/* Toggle 3: Show on Homepage */}
                  <div className="toggle-item" onClick={() => setShowOnHomepage(!showOnHomepage)}>
                    <button
                      type="button"
                      className={`switch-track ${showOnHomepage ? 'on' : 'off'}`}
                      aria-checked={showOnHomepage}
                      role="switch"
                    >
                      <span className="switch-thumb" />
                    </button>
                    <div className="toggle-text-block">
                      <span className="toggle-title">Show on Homepage</span>
                      <span className="toggle-subtitle">Display in featured section (if applicable)</span>
                    </div>
                  </div>

                  {/* Toggle 4: Send Price Alerts */}
                  <div className="toggle-item" onClick={() => setSendPriceAlerts(!sendPriceAlerts)}>
                    <button
                      type="button"
                      className={`switch-track ${sendPriceAlerts ? 'on' : 'off'}`}
                      aria-checked={sendPriceAlerts}
                      role="switch"
                    >
                      <span className="switch-thumb" />
                    </button>
                    <div className="toggle-text-block">
                      <span className="toggle-title">Send Price Alerts</span>
                      <span className="toggle-subtitle">Include in automated price alerts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for Basic Information */}
          <div className="add-comm-bottom-bar">
            <button
              type="button"
              className="btn-cancel"
              onClick={onBack}
            >
              Cancel
            </button>

            <div className="bottom-bar-right-actions">
              <button
                type="button"
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
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
      )}

      {/* --------------------------------------------------------------------
          TAB 2: Pricing & Market Data View (Exact Match to Screenshot)
          -------------------------------------------------------------------- */}
      {activeTab === 'Pricing & Market Data' && (
        <div className="add-comm-pricing-view">
          <div className="add-comm-pricing-grid">
            {/* LEFT COLUMN: Current Market Price, Historical Price Data, Exchange Data */}
            <div className="add-comm-col left-col">
              {/* Card 1: Current Market Price */}
              <div className="add-comm-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Current Market Price</h2>
                    <p className="card-subheading">Set the current price and market details for this commodity.</p>
                  </div>
                </div>

                <div className="add-comm-card-body">
                  {/* Row 1: Modal Price, Min Price, Max Price */}
                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">
                        Modal Price (₹) <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={modalPrice}
                        onChange={(e) => setModalPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Min Price (₹)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Max Price (₹)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row 2: Unit, Mandi, Price Date */}
                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">
                        Unit <span className="req-star">*</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={pricingUnit}
                          onChange={(e) => setPricingUnit(e.target.value)}
                        >
                          <option value="Quintal (100 Kg)">Quintal (100 Kg)</option>
                          <option value="Kilogram (1 Kg)">Kilogram (1 Kg)</option>
                          <option value="Metric Ton">Metric Ton</option>
                          <option value="Bag (50 Kg)">Bag (50 Kg)</option>
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Mandi <span className="req-star">*</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={pricingMandi}
                          onChange={(e) => setPricingMandi(e.target.value)}
                        >
                          {mandisList.length > 0 ? (
                            mandisList.map((m) => (
                              <option key={m.id} value={m.name}>
                                {m.name}
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="Darbhanga (Bihar)">Darbhanga (Bihar)</option>
                              <option value="Indore (Madhya Pradesh)">Indore (Madhya Pradesh)</option>
                              <option value="Jaipur (Rajasthan)">Jaipur (Rajasthan)</option>
                              <option value="Karnal (Haryana)">Karnal (Haryana)</option>
                              <option value="Latur (Maharashtra)">Latur (Maharashtra)</option>
                              <option value="Ujjain (Madhya Pradesh)">Ujjain (Madhya Pradesh)</option>
                              <option value="Agra (Uttar Pradesh)">Agra (Uttar Pradesh)</option>
                            </>
                          )}
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Price Date <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon-left">
                        <svg className="input-left-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <input
                          type="text"
                          className="form-input with-icon"
                          value={pricingDate}
                          onChange={(e) => setPricingDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Checkbox Set as latest/active price */}
                  <div className="pricing-active-checkbox-row">
                    <label className="checkbox-custom-label">
                      <input
                        type="checkbox"
                        checked={isLatestActivePrice}
                        onChange={(e) => setIsLatestActivePrice(e.target.checked)}
                        className="checkbox-hidden"
                      />
                      <div className={`checkbox-custom-box ${isLatestActivePrice ? 'checked' : ''}`}>
                        {isLatestActivePrice && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="checkbox-text-wrap">
                        <span className="checkbox-main-title">Set as latest/active price</span>
                        <span className="checkbox-sub-title">This will be shown as the current price on the commodity page.</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Card 3: Historical Price Data (Optional) */}
              <div className="add-comm-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Historical Price Data (Optional)</h2>
                    <p className="card-subheading">Add historical price data to show trends and analysis.</p>
                  </div>
                </div>

                <div className="add-comm-card-body">
                  <div className="historical-table-wrapper">
                    <table className="historical-data-table">
                      <thead>
                        <tr>
                          <th>Date *</th>
                          <th>Mandi *</th>
                          <th>Min Price (₹)</th>
                          <th>Modal Price (₹)</th>
                          <th>Max Price (₹)</th>
                          <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalRecords.map((rec) => (
                          <tr key={rec.id}>
                            <td>
                              <div className="input-with-icon-left table-input-wrap">
                                <svg className="input-left-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <input
                                  type="text"
                                  className="form-input with-icon table-cell-input"
                                  value={rec.date}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setHistoricalRecords(historicalRecords.map(r => r.id === rec.id ? { ...r, date: val } : r));
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="select-wrapper">
                                <select
                                  className="form-select table-cell-input"
                                  value={rec.mandi}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setHistoricalRecords(historicalRecords.map(r => r.id === rec.id ? { ...r, mandi: val } : r));
                                  }}
                                >
                                  <option value="Darbhanga">Darbhanga</option>
                                  <option value="Indore">Indore</option>
                                  <option value="Jaipur">Jaipur</option>
                                  <option value="Latur">Latur</option>
                                  <option value="Karnal">Karnal</option>
                                </select>
                                <svg className="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-input table-cell-input"
                                value={rec.minPrice}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setHistoricalRecords(historicalRecords.map(r => r.id === rec.id ? { ...r, minPrice: val } : r));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-input table-cell-input"
                                value={rec.modalPrice}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setHistoricalRecords(historicalRecords.map(r => r.id === rec.id ? { ...r, modalPrice: val } : r));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-input table-cell-input"
                                value={rec.maxPrice}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setHistoricalRecords(historicalRecords.map(r => r.id === rec.id ? { ...r, maxPrice: val } : r));
                                }}
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button
                                type="button"
                                className="btn-trash-action"
                                onClick={() => handleRemoveHistoricalRecord(rec.id)}
                                title="Delete record"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    className="btn-add-another-record"
                    onClick={handleAddHistoricalRecord}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Another Record</span>
                  </button>
                </div>
              </div>

              {/* Card 5: Exchange & Futures Data (Optional) */}
              <div className="add-comm-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 9 9 15 6 12 2 12" />
                      <line x1="17" y1="6" x2="22" y2="6" />
                      <line x1="22" y1="6" x2="22" y2="11" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Exchange & Futures Data (Optional)</h2>
                    <p className="card-subheading">Add exchange or futures market information if available.</p>
                  </div>
                </div>

                <div className="add-comm-card-body">
                  <div className="form-row-4">
                    <div className="form-group">
                      <label className="form-label">Exchange</label>
                      <div className="select-wrapper">
                        <select
                          className={`form-select ${!exchange ? 'is-placeholder' : ''}`}
                          value={exchange}
                          onChange={(e) => setExchange(e.target.value)}
                        >
                          <option value="">Select Exchange</option>
                          {exchangesList.length > 0 ? (
                            exchangesList.map((ex) => (
                              <option key={ex.id} value={ex.code || ex.name}>
                                {ex.name} ({ex.code})
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="NCDEX">NCDEX</option>
                              <option value="MCX">MCX</option>
                              <option value="BSE">BSE</option>
                              <option value="NSE">NSE</option>
                            </>
                          )}
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contract Month / Instrument</label>
                      <div className="select-wrapper">
                        <select
                          className={`form-select ${!contractMonth ? 'is-placeholder' : ''}`}
                          value={contractMonth}
                          onChange={(e) => setContractMonth(e.target.value)}
                        >
                          <option value="">Select Instrument / Month</option>
                          {exchangeInstrumentsList.length > 0 ? (
                            exchangeInstrumentsList.map((inst) => (
                              <option key={inst.id} value={inst.symbol || inst.instrument_name}>
                                {inst.instrument_name || inst.symbol}
                              </option>
                            ))
                          ) : (
                            <>
                              <option value="Oct 2026">Oct 2026</option>
                              <option value="Nov 2026">Nov 2026</option>
                              <option value="Dec 2026">Dec 2026</option>
                              <option value="Jan 2027">Jan 2027</option>
                            </>
                          )}
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Futures Price (₹)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 1,350"
                        value={futuresPrice}
                        onChange={(e) => setFuturesPrice(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Change (%)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. +2.5%"
                        value={futuresChange}
                        onChange={(e) => setFuturesChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Price Trend Preview, Market Information, External References */}
            <div className="add-comm-col right-col">
              {/* Card 2: Price Trend Preview */}
              <div className="add-comm-card">
                <div className="add-comm-card-header price-preview-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Price Trend Preview</h2>
                    <p className="card-subheading">This is a preview of how the price trend will look with the latest data.</p>
                  </div>
                  <div className="trend-range-pills">
                    {['7D', '1M', '3M', '6M', '1Y'].map((range) => (
                      <button
                        key={range}
                        type="button"
                        className={`trend-range-btn ${trendTimeRange === range ? 'active' : ''}`}
                        onClick={() => setTrendTimeRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="add-comm-card-body">
                  {/* Legend */}
                  <div className="price-chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot green" />
                      <span className="legend-label">Modal Price</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot blue" />
                      <span className="legend-label">Min Price</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot red" />
                      <span className="legend-label">Max Price</span>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="price-trend-svg-container">
                    <svg viewBox="0 0 550 200" className="price-trend-svg" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="modalGreenGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="minBlueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Y-Axis Label */}
                      <text x="-100" y="14" transform="rotate(-90)" fill="#64748b" fontSize="10" textAnchor="middle">
                        Price (₹/Quintal)
                      </text>

                      {/* Horizontal Grid lines & Y values */}
                      <line x1="50" y1="20" x2="540" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="44" y="23" fill="#94a3b8" fontSize="9.5" textAnchor="end">1,800</text>

                      <line x1="50" y1="60" x2="540" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="44" y="63" fill="#94a3b8" fontSize="9.5" textAnchor="end">1,500</text>

                      <line x1="50" y1="100" x2="540" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="44" y="103" fill="#94a3b8" fontSize="9.5" textAnchor="end">1,200</text>

                      <line x1="50" y1="140" x2="540" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="44" y="143" fill="#94a3b8" fontSize="9.5" textAnchor="end">900</text>

                      <line x1="50" y1="180" x2="540" y2="180" stroke="#f1f5f9" strokeWidth="1" />
                      <text x="44" y="183" fill="#94a3b8" fontSize="9.5" textAnchor="end">600</text>

                      {/* Area Fills */}
                      {/* Modal Green Area */}
                      <path
                        d="M 60 125 Q 95 120, 120 108 T 180 102 T 240 118 T 300 102 T 360 94 T 420 94 T 480 72 L 535 62 L 535 180 L 60 180 Z"
                        fill="url(#modalGreenGrad)"
                      />
                      {/* Min Blue Area */}
                      <path
                        d="M 60 152 Q 95 145, 120 132 T 180 130 T 240 148 T 300 135 T 360 128 T 420 124 T 480 108 L 535 96 L 535 180 L 60 180 Z"
                        fill="url(#minBlueGrad)"
                      />

                      {/* Max Price Red Line */}
                      <path
                        d="M 60 102 Q 95 98, 120 86 T 180 82 T 240 98 T 300 85 T 360 76 T 420 74 T 480 58 L 535 50"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Max Dots */}
                      {[[60,102],[120,86],[180,82],[240,98],[300,85],[360,76],[420,74],[480,58],[535,50]].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#dc2626" />
                      ))}

                      {/* Modal Price Green Line */}
                      <path
                        d="M 60 125 Q 95 120, 120 108 T 180 102 T 240 118 T 300 102 T 360 94 T 420 94 T 480 72 L 535 62"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Modal Dots */}
                      {[[60,125],[120,108],[180,102],[240,118],[300,102],[360,94],[420,94],[480,72],[535,62]].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#16a34a" />
                      ))}

                      {/* Min Price Blue Line */}
                      <path
                        d="M 60 152 Q 95 145, 120 132 T 180 130 T 240 148 T 300 135 T 360 128 T 420 124 T 480 108 L 535 96"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                      {/* Min Dots */}
                      {[[60,152],[120,132],[180,130],[240,148],[300,135],[360,128],[420,124],[480,108],[535,96]].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
                      ))}
                    </svg>

                    {/* X-axis Date Labels */}
                    <div className="price-chart-x-labels">
                      <span>18 Aug</span>
                      <span>22 Aug</span>
                      <span>26 Aug</span>
                      <span>30 Aug</span>
                      <span>3 Sep</span>
                      <span>7 Sep</span>
                      <span>11 Sep</span>
                      <span>15 Sep</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Market Information */}
              <div className="add-comm-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Market Information</h2>
                    <p className="card-subheading">Add additional market insights for this commodity.</p>
                  </div>
                </div>

                <div className="add-comm-card-body">
                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">Market Trend</label>
                      <div className="select-wrapper select-with-icon">
                        <svg className="input-left-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                        <select
                          className="form-select with-icon"
                          value={marketTrend}
                          onChange={(e) => setMarketTrend(e.target.value)}
                        >
                          <option value="Increasing">Increasing</option>
                          <option value="Decreasing">Decreasing</option>
                          <option value="Stable">Stable</option>
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Price Volatility</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={priceVolatility}
                          onChange={(e) => setPriceVolatility(e.target.value)}
                        >
                          <option value="Low">Low</option>
                          <option value="Moderate">Moderate</option>
                          <option value="High">High</option>
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Market Sentiment</label>
                      <div className="select-wrapper">
                        <select
                          className="form-select"
                          value={marketSentiment}
                          onChange={(e) => setMarketSentiment(e.target.value)}
                        >
                          <option value="Positive">Positive</option>
                          <option value="Neutral">Neutral</option>
                          <option value="Negative">Negative</option>
                        </select>
                        <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Key Market Factors (Optional)</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      maxLength={500}
                      value={marketFactors}
                      onChange={(e) => setMarketFactors(e.target.value)}
                      placeholder="Provide key factors influencing market trends..."
                    />
                    <div className="textarea-footer">
                      <span className="char-counter">{marketFactors.length}/500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: External References (Optional) */}
              <div className="add-comm-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">External References (Optional)</h2>
                    <p className="card-subheading">Add links to external sources for price verification.</p>
                  </div>
                </div>

                <div className="add-comm-card-body">
                  <div className="external-source-inputs-row">
                    <div className="form-group flex-1">
                      <label className="form-label">Source Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Agmarknet"
                        value={sourceName}
                        onChange={(e) => setSourceName(e.target.value)}
                      />
                    </div>

                    <div className="form-group flex-1">
                      <label className="form-label">Source URL</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="https://..."
                        value={sourceUrl}
                        onChange={(e) => setSourceUrl(e.target.value)}
                      />
                    </div>

                    <div className="form-group btn-add-src-wrap">
                      <label className="form-label" style={{ visibility: 'hidden' }}>Add</label>
                      <button
                        type="button"
                        className="btn-add-source"
                        onClick={handleAddExternalSource}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Source</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for Pricing & Market Data */}
          <div className="add-comm-bottom-bar">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab('Basic Information')}
            >
              ← Previous
            </button>

            <div className="bottom-bar-right-actions">
              <button
                type="button"
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                className="btn-next-step"
                onClick={() => {
                  showToast('Pricing details saved. Moving to Categorisation.');
                  setActiveTab('Categorisation');
                }}
              >
                <span>Next</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          TAB 3: Categorisation View (Exact Match to Screenshot)
          -------------------------------------------------------------------- */}
      {activeTab === 'Categorisation' && (
        <div className="add-comm-categorisation-view">
          <div className="add-comm-cat-grid">
            {/* LEFT COLUMN: Categorisation Form Card */}
            <div className="add-comm-card cat-main-card">
              <div className="add-comm-card-header">
                <div className="card-header-icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="card-header-titles">
                  <h2 className="card-heading">Categorisation</h2>
                  <p className="card-subheading">Classify the commodity to help with better search, filtering and market analysis.</p>
                </div>
              </div>

              <div className="cat-card-split-body">
                {/* Left Sub-Column */}
                <div className="cat-form-col">
                  {/* Main Category */}
                  <div className="form-group">
                    <label className="form-label">
                      Main Category <span className="req-star">*</span>
                    </label>
                    <div className="select-wrapper select-with-prefix">
                      <span className="select-prefix-icon">🍃</span>
                      <select
                        className="form-select with-prefix"
                        value={category || mainCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategory(val);
                          const matched = categoriesList.find((c) => String(c.id) === String(val));
                          setMainCategory(matched ? matched.name : val);
                        }}
                      >
                        <option value="">Select Category</option>
                        {categoriesList.length > 0 ? (
                          categoriesList.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Cereals & Grains">Cereals & Grains</option>
                            <option value="Pulses & Legumes">Pulses & Legumes</option>
                            <option value="Oilseeds">Oilseeds</option>
                            <option value="Spices">Spices</option>
                            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                            <option value="Cash Crops">Cash Crops</option>
                            <option value="Others">Others</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Choose the primary category for this commodity.</span>
                  </div>

                  {/* Sub Category */}
                  <div className="form-group">
                    <label className="form-label">
                      Sub Category <span className="req-star">*</span>
                    </label>
                    <div className="select-wrapper select-with-prefix">
                      <span className="select-prefix-icon">🌾</span>
                      <select
                        className="form-select with-prefix"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option value="">Select Sub Category</option>
                        {subcategoriesList.length > 0 ? (
                          subcategoriesList.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Millets & Alternative Grains">Millets & Alternative Grains</option>
                            <option value="Wheat & Barley">Wheat & Barley</option>
                            <option value="Rice & Paddy">Rice & Paddy</option>
                            <option value="Maize & Corn">Maize & Corn</option>
                          </>
                        )}
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Choose the subcategory under the selected category.</span>
                  </div>

                  {/* Commodity Group */}
                  <div className="form-group">
                    <label className="form-label">
                      Commodity Group (Optional)
                    </label>
                    <div className="select-wrapper select-with-prefix">
                      <svg className="input-left-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                        <path d="M7 7h.01" />
                      </svg>
                      <select
                        className={`form-select with-icon ${!commodityGroup ? 'is-placeholder' : ''}`}
                        value={commodityGroup}
                        onChange={(e) => setCommodityGroup(e.target.value)}
                      >
                        <option value="">Select Commodity Group</option>
                        <option value="Superfoods">Superfoods</option>
                        <option value="Staples">Staples</option>
                        <option value="Fodder">Fodder</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Further group similar commodities for better classification.</span>
                  </div>

                  {/* Tags */}
                  <div className="form-group">
                    <label className="form-label">Tags (Optional)</label>
                    <div className="cat-tags-input-container">
                      <div className="cat-tags-list">
                        {tags.map((tag) => (
                          <span key={tag} className="cat-tag-pill">
                            <span>{tag}</span>
                            <button
                              type="button"
                              className="btn-remove-tag"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          className="cat-tag-text-input"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder={tags.length === 0 ? "Add tag and press Enter..." : ""}
                        />
                      </div>
                      <svg className="tags-dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <span className="field-hint">Add relevant tags to improve searchability (press Enter to add).</span>
                  </div>
                </div>

                {/* Right Sub-Column */}
                <div className="cat-visual-col">
                  {/* Category Icon */}
                  <div className="form-group">
                    <label className="form-label">Category Icon</label>
                    <div className="cat-icons-grid-10">
                      {[
                        { id: 'leaf', icon: '🍃' },
                        { id: 'wheat', icon: '🌾' },
                        { id: 'corn', icon: '🌽' },
                        { id: 'seeds', icon: '🫘' },
                        { id: 'cotton', icon: '☁️' },
                        { id: 'spices', icon: '🪵' },
                        { id: 'apple', icon: '🍎' },
                        { id: 'oil', icon: '💧' },
                        { id: 'sugar', icon: '🧊' },
                        { id: 'more', icon: '🪴' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`cat-icon-tile ${categoryIcon === item.id ? 'active' : ''}`}
                          onClick={() => setCategoryIcon(item.id)}
                        >
                          <span className="cat-tile-emoji">{item.icon}</span>
                        </button>
                      ))}
                    </div>
                    <span className="field-hint">Choose an icon to represent this commodity.</span>
                  </div>

                  {/* Category Color */}
                  <div className="form-group">
                    <label className="form-label">Category Color</label>
                    <div className="cat-colors-row-8">
                      {[
                        '#026544', // Dark green
                        '#eab308', // Yellow/Gold
                        '#78350f', // Brown
                        '#dc2626', // Red
                        '#db2777', // Pink/Magenta
                        '#7c3aed', // Purple
                        '#2563eb', // Blue
                        '#94a3b8', // Gray/Slate
                      ].map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`cat-color-dot ${categoryColor === color ? 'active' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setCategoryColor(color)}
                        >
                          {categoryColor === color && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                    <span className="field-hint">Select a color for visual representation in lists and charts.</span>
                  </div>

                  {/* Market Type */}
                  <div className="form-group">
                    <label className="form-label">
                      Market Type <span className="req-star">*</span>
                    </label>
                    <div className="market-type-radio-group">
                      {[
                        { title: 'Agricultural Produce (APMC)', subtitle: 'Traded in regulated mandi markets' },
                        { title: 'Non-APMC / Private Market', subtitle: 'Traded in private / direct markets' },
                        { title: 'Both (APMC & Private)', subtitle: 'Available in both market types' },
                      ].map((opt) => {
                        const isSelected = marketType === opt.title;
                        return (
                          <div
                            key={opt.title}
                            className={`market-type-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setMarketType(opt.title)}
                          >
                            <div className={`market-radio-circle ${isSelected ? 'selected' : ''}`}>
                              {isSelected && <div className="market-radio-inner-dot" />}
                            </div>
                            <div className="market-radio-text">
                              <span className="market-radio-title">{opt.title}</span>
                              <span className="market-radio-desc">{opt.subtitle}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Tree View Preview, Info Card, Pro Tip */}
            <div className="add-comm-col cat-sidebar-col">
              {/* Card 1: Preview in Category Tree */}
              <div className="add-comm-card cat-tree-card">
                <div className="add-comm-card-header">
                  <div className="card-header-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <div className="card-header-titles">
                    <h2 className="card-heading">Preview in Category Tree</h2>
                  </div>
                </div>

                <div className="add-comm-card-body cat-tree-body">
                  <div className="tree-node root-node">
                    <div className="tree-node-row" onClick={() => setTreeExpanded({ ...treeExpanded, agri: !treeExpanded.agri })}>
                      <svg className={`tree-chevron ${treeExpanded.agri ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      <span className="tree-node-icon">🍂</span>
                      <span className="tree-node-text font-semibold">Agricultural Commodities</span>
                    </div>

                    {treeExpanded.agri && (
                      <div className="tree-children-container">
                        {/* Cereals & Grains (Expanded) */}
                        <div className="tree-node">
                          <div className="tree-node-row" onClick={() => setTreeExpanded({ ...treeExpanded, cereals: !treeExpanded.cereals })}>
                            <svg className={`tree-chevron ${treeExpanded.cereals ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                            <span className="tree-node-icon">🌾</span>
                            <span className="tree-node-text font-medium">Cereals & Grains</span>
                          </div>

                          {treeExpanded.cereals && (
                            <div className="tree-children-container">
                              {/* Millets & Alternative Grains */}
                              <div className="tree-node">
                                <div className="tree-node-row" onClick={() => setTreeExpanded({ ...treeExpanded, millets: !treeExpanded.millets })}>
                                  <svg className={`tree-chevron ${treeExpanded.millets ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                  <span className="tree-node-icon">🌾</span>
                                  <span className="tree-node-text">Millets & Alternative Grains</span>
                                </div>

                                {treeExpanded.millets && (
                                  <div className="tree-leaf-item-container">
                                    <div className="tree-leaf-active-pill">
                                      <span className="tree-leaf-tag-icon">🏷️</span>
                                      <span className="tree-leaf-name">Makhana</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Collapsed Siblings */}
                        {[
                          { name: 'Pulses & Legumes', icon: '🫘' },
                          { name: 'Oilseeds', icon: '🌻' },
                          { name: 'Spices', icon: '🌶️' },
                          { name: 'Fruits & Vegetables', icon: '🍎' },
                          { name: 'Cash Crops', icon: '🌾' },
                          { name: 'Others', icon: '🌿' },
                        ].map((sib) => (
                          <div key={sib.name} className="tree-node-row collapsed">
                            <svg className="tree-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                            <span className="tree-node-icon">{sib.icon}</span>
                            <span className="tree-node-text">{sib.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Why Categorisation is Important? */}
              <div className="cat-info-card">
                <div className="cat-info-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                  <span className="cat-info-title">Why Categorisation is Important?</span>
                </div>

                <ul className="cat-info-list">
                  <li>
                    <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Helps traders find commodities easily</span>
                  </li>
                  <li>
                    <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Enables better price comparison and analytics</span>
                  </li>
                  <li>
                    <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Improves search and filtering</span>
                  </li>
                  <li>
                    <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Useful for reports and market insights</span>
                  </li>
                  <li>
                    <svg className="guideline-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Supports export & trade matching</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Pro Tip */}
              <div className="cat-protip-card">
                <div className="cat-protip-header">
                  <span className="cat-protip-icon">🎓</span>
                  <span className="cat-protip-title">Pro Tip</span>
                </div>
                <p className="cat-protip-text">
                  Choose the most relevant category and add related tags to get better visibility on the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for Categorisation */}
          <div className="add-comm-bottom-bar">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab('Pricing & Market Data')}
            >
              ← Previous
            </button>

            <div className="bottom-bar-right-actions">
              <button
                type="button"
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                className="btn-next-step"
                onClick={() => {
                  showToast('Categorisation saved. Moving to Additional Details.');
                  setActiveTab('Additional Details');
                }}
              >
                <span>Next</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          TAB 4: Additional Details
          -------------------------------------------------------------------- */}
      {activeTab === 'Additional Details' && (
        <div className="add-comm-additional-details-view">
          <div className="add-comm-details-grid">
            {/* Left Main Card */}
            <div className="details-main-card">
              <div className="details-card-header">
                <div className="details-header-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="details-header-text">
                  <h2 className="details-main-title">Additional Details</h2>
                  <p className="details-main-subtitle">
                    Provide additional information to make the commodity listing more comprehensive and useful.
                  </p>
                </div>
              </div>

              {/* 2x3 Inner Cards Grid */}
              <div className="details-inner-cards-grid">
                {/* 1. Description & Usage */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <h3 className="subcard-title">Description &amp; Usage</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="form-group-with-counter">
                      <label className="subcard-label">
                        Short Description <span className="required-star">*</span>
                      </label>
                      <textarea
                        className="subcard-textarea short-desc-textarea"
                        placeholder="A brief summary of the commodity (max 200 characters)"
                        rows={3}
                        maxLength={200}
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                      />
                      <div className="counter-row">
                        <span className="char-counter">{shortDescription.length}/200</span>
                      </div>
                    </div>

                    <div className="form-group-with-counter">
                      <label className="subcard-label">Detailed Description</label>
                      <textarea
                        className="subcard-textarea detailed-desc-textarea"
                        placeholder="Provide detailed information about the commodity, its uses, quality, demand, etc."
                        rows={4}
                        maxLength={1000}
                        value={detailedDescription}
                        onChange={(e) => setDetailedDescription(e.target.value)}
                      />
                      <div className="counter-row">
                        <span className="char-counter">{detailedDescription.length}/1000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Nutritional & Quality Information */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                    <h3 className="subcard-title">Nutritional &amp; Quality Information</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="form-group">
                      <label className="subcard-label">Quality Parameters</label>
                      <div className="quality-params-select-box">
                        <div className="quality-chips-list">
                          {qualityParams.map((param) => (
                            <span key={param} className="quality-tag-chip">
                              <span>{param}</span>
                              <button
                                type="button"
                                className="tag-chip-remove"
                                onClick={() => handleRemoveQualityParam(param)}
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                        <span className="select-box-chevron">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </div>
                      <span className="field-hint-text">Select key quality parameters for this commodity.</span>
                    </div>

                    <div className="form-group-with-counter">
                      <label className="subcard-label">Nutritional Benefits (Optional)</label>
                      <textarea
                        className="subcard-textarea nutritional-textarea"
                        placeholder="E.g. high in protein, rich in fiber, etc."
                        rows={3}
                        maxLength={500}
                        value={nutritionalBenefits}
                        onChange={(e) => setNutritionalBenefits(e.target.value)}
                      />
                      <div className="counter-row">
                        <span className="char-counter">{nutritionalBenefits.length}/500</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Harvest & Supply Information */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <h3 className="subcard-title">Harvest &amp; Supply Information</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="harvest-shelf-row">
                      <div className="form-group flex-1">
                        <label className="subcard-label">Harvest Season</label>
                        <div className="select-with-icon-wrapper">
                          <span className="field-inner-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </span>
                          <select
                            className="subcard-select with-icon"
                            value={harvestSeasonDetails}
                            onChange={(e) => setHarvestSeasonDetails(e.target.value)}
                          >
                            <option value="Oct - Dec">Oct - Dec</option>
                            <option value="Jan - Mar">Jan - Mar</option>
                            <option value="Apr - Jun">Apr - Jun</option>
                            <option value="Jul - Sep">Jul - Sep</option>
                            <option value="Year Round">Year Round</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group flex-1">
                        <label className="subcard-label">Shelf Life (Optional)</label>
                        <div className="select-with-icon-wrapper">
                          <span className="field-inner-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            className="subcard-input with-icon"
                            value={shelfLifeDetails}
                            onChange={(e) => setShelfLifeDetails(e.target.value)}
                            placeholder="e.g. 12 months"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="subcard-label">Availability</label>
                      <div className="availability-pills-row">
                        {['Year Round', 'Seasonal', 'Limited', 'Off Season'].map((status) => (
                          <button
                            type="button"
                            key={status}
                            className={`availability-pill-btn ${availability === status ? 'active' : ''}`}
                            onClick={() => setAvailability(status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      <span className="field-hint-text">When is this commodity generally available in the market?</span>
                    </div>
                  </div>
                </div>

                {/* 4. Storage & Handling */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18" />
                      <path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" />
                      <line x1="5" y1="21" x2="5" y2="10.85" />
                      <line x1="19" y1="21" x2="19" y2="10.85" />
                      <line x1="9" y1="21" x2="9" y2="10.85" />
                      <line x1="15" y1="21" x2="15" y2="10.85" />
                    </svg>
                    <h3 className="subcard-title">Storage &amp; Handling</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="form-group-with-counter">
                      <label className="subcard-label">Storage Conditions</label>
                      <textarea
                        className="subcard-textarea"
                        placeholder="E.g. keep in dry place, cool temperature, etc."
                        rows={2}
                        maxLength={300}
                        value={storageConditions}
                        onChange={(e) => setStorageConditions(e.target.value)}
                      />
                      <div className="counter-row">
                        <span className="char-counter">{storageConditions.length}/300</span>
                      </div>
                    </div>

                    <div className="form-group-with-counter">
                      <label className="subcard-label">Handling Instructions</label>
                      <textarea
                        className="subcard-textarea"
                        placeholder="E.g. avoid moisture, use proper packaging, etc."
                        rows={2}
                        maxLength={200}
                        value={handlingInstructions}
                        onChange={(e) => setHandlingInstructions(e.target.value)}
                      />
                      <div className="counter-row">
                        <span className="char-counter">{handlingInstructions.length}/200</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Related Commodities */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <h3 className="subcard-title">Related Commodities</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="form-group">
                      <label className="subcard-label">Related Commodities (Optional)</label>
                      <div className="related-comm-search-box">
                        <input
                          type="text"
                          className="related-search-input"
                          placeholder="Search and select related commodities..."
                          value={relatedSearch}
                          onChange={(e) => setRelatedSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && relatedSearch.trim()) {
                              e.preventDefault();
                              if (!relatedCommodities.includes(relatedSearch.trim())) {
                                setRelatedCommodities([...relatedCommodities, relatedSearch.trim()]);
                              }
                              setRelatedSearch('');
                            }
                          }}
                        />
                        <span className="select-box-chevron">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </div>

                      <div className="related-chips-row">
                        {relatedCommodities.map((comm) => (
                          <span key={comm} className="related-tag-chip">
                            <span>{comm}</span>
                            <button
                              type="button"
                              className="tag-chip-remove"
                              onClick={() => handleRemoveRelatedComm(comm)}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      <span className="field-hint-text">Add related commodities for cross reference.</span>
                    </div>
                  </div>
                </div>

                {/* 6. Documents & Resources */}
                <div className="details-subcard">
                  <div className="subcard-header">
                    <svg className="subcard-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    <h3 className="subcard-title">Documents &amp; Resources</h3>
                  </div>

                  <div className="subcard-body">
                    <div className="form-group">
                      <label className="subcard-label">Upload Documents (Optional)</label>
                      <div className="docs-split-container">
                        {/* Dropzone */}
                        <div
                          className="docs-dropzone"
                          onClick={() => {
                            const docInput = document.getElementById('doc-file-upload-input');
                            if (docInput) docInput.click();
                          }}
                        >
                          <input
                            type="file"
                            id="doc-file-upload-input"
                            style={{ display: 'none' }}
                            onChange={handleDocUpload}
                            accept=".pdf,.doc,.docx"
                          />
                          <svg className="cloud-upload-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                            <path d="M12 12v9" />
                            <path d="m16 16-4-4-4 4" />
                          </svg>
                          <span className="dropzone-text-primary">Drag &amp; drop files here</span>
                          <span className="dropzone-text-link">or click to browse</span>
                          <span className="dropzone-text-caption">Supports: PDF, DOC, DOCX (Max 10 MB each)</span>
                        </div>

                        {/* Uploaded Documents List */}
                        <div className="docs-uploaded-list">
                          {uploadedDocs.map((doc) => (
                            <div key={doc.id} className="doc-item-row">
                              <div className="doc-item-left">
                                <div className="doc-pdf-badge">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                                    <path d="M14 2v6h6" fill="#fca5a5" />
                                    <rect x="5.5" y="11" width="13" height="7" rx="1.5" fill="#dc2626" />
                                    <text x="7" y="16" fill="#ffffff" fontSize="5" fontWeight="bold" fontFamily="Inter, sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div className="doc-item-info">
                                  <span className="doc-item-name">{doc.name}</span>
                                  <span className="doc-item-size">{doc.size}</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="doc-item-remove-btn"
                                onClick={() => handleRemoveDoc(doc.id)}
                                title="Remove document"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="details-sidebar-col">
              {/* 1. Preview (Summary) Card */}
              <div className="details-preview-card">
                <div className="preview-card-header">
                  <div className="preview-header-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <h3 className="preview-card-title">Preview (Summary)</h3>
                  </div>
                  <button
                    type="button"
                    className="preview-edit-link"
                    onClick={() => setActiveTab('Basic Information')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                </div>

                <div className="preview-card-content">
                  <div className="preview-item-layout">
                    <div className="preview-thumb-box">
                      <img
                        src={commMakhana}
                        alt="Makhana"
                        className="preview-commodity-thumb"
                      />
                    </div>
                    <div className="preview-commodity-meta">
                      <h4 className="preview-comm-name">Makhana</h4>
                      <p className="preview-comm-cat">Cereals &amp; Grains &gt; Millets &amp; Alternative Grains</p>
                      
                      <div className="preview-details-list">
                        <div className="preview-detail-row">
                          <svg className="preview-detail-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span className="preview-detail-label">Season:</span>
                          <span className="preview-detail-val">{harvestSeasonDetails}</span>
                        </div>

                        <div className="preview-detail-row">
                          <svg className="preview-detail-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="preview-detail-label">Shelf Life:</span>
                          <span className="preview-detail-val">{shelfLifeDetails}</span>
                        </div>

                        <div className="preview-detail-row">
                          <svg className="preview-detail-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m4.93 4.93 4.24 4.24" />
                            <path d="m14.83 9.17 4.24-4.24" />
                            <path d="m14.83 14.83 4.24 4.24" />
                            <path d="m9.17 14.83-4.24 4.24" />
                          </svg>
                          <span className="preview-detail-label">Availability:</span>
                          <span className="preview-availability-badge">{availability}</span>
                        </div>

                        <div className="preview-detail-row">
                          <svg className="preview-detail-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m2 22 1-1h3l9-9" />
                            <path d="M3 21v-3l9-9" />
                            <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 0 1 0 3l-2.8 2.8a2.1 2.1 0 0 1-3 0L12 14.6" />
                          </svg>
                          <span className="preview-detail-label">Primary Use:</span>
                          <span className="preview-detail-val">Food, Snacks, Export</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Additional Information Checklist */}
              <div className="details-checklist-card">
                <div className="checklist-card-header">
                  <span className="checklist-header-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                    </svg>
                  </span>
                  <h3 className="checklist-card-title">Additional Information Checklist</h3>
                </div>
                <div className="checklist-items-list">
                  <div className="checklist-item checked">
                    <span className="checklist-icon-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="checklist-item-text">Description added</span>
                  </div>

                  <div className="checklist-item checked">
                    <span className="checklist-icon-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="checklist-item-text">Quality parameters selected</span>
                  </div>

                  <div className="checklist-item checked">
                    <span className="checklist-icon-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="checklist-item-text">Harvest season defined</span>
                  </div>

                  <div className="checklist-item checked">
                    <span className="checklist-icon-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="checklist-item-text">Storage conditions provided</span>
                  </div>

                  <div className="checklist-item checked">
                    <span className="checklist-icon-check">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="checklist-item-text">Related commodities added</span>
                  </div>

                  <div className="checklist-item unchecked">
                    <span className="checklist-icon-square" />
                    <span className="checklist-item-text">Nutritional benefits (optional)</span>
                  </div>

                  <div className="checklist-item unchecked">
                    <span className="checklist-icon-square" />
                    <span className="checklist-item-text">Documents uploaded (optional)</span>
                  </div>
                </div>
              </div>

              {/* 3. Pro Tip Card */}
              <div className="details-protip-card">
                <div className="details-protip-header">
                  <span className="details-protip-bulb">💡</span>
                  <span className="details-protip-title">Pro Tip</span>
                </div>
                <ul className="details-protip-list">
                  <li>More detailed information helps traders make better decisions.</li>
                  <li>Add quality parameters to improve trust.</li>
                  <li>Upload documents like specifications, certificates or guidelines.</li>
                  <li>Keep the information updated for accuracy.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for Additional Details */}
          <div className="add-comm-bottom-bar">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab('Categorisation')}
            >
              ← Previous
            </button>

            <div className="bottom-bar-right-actions">
              <button
                type="button"
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                className="btn-next-step"
                onClick={() => {
                  showToast('Additional details saved. Moving to SEO & Visibility.');
                  setActiveTab('SEO & Visibility');
                }}
              >
                <span>Next</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          TAB 5: SEO & Visibility
          -------------------------------------------------------------------- */}
      {activeTab === 'SEO & Visibility' && (
        <div className="add-comm-seo-view">
          {/* Top Section: 2 Columns */}
          <div className="seo-top-grid">
            {/* Left Column: SEO Settings Card */}
            <div className="seo-settings-card">
              <div className="seo-card-header">
                <div className="seo-header-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div className="seo-header-text">
                  <h2 className="seo-card-title">SEO Settings</h2>
                  <p className="seo-card-subtitle">
                    Optimise the commodity page for search engines and improve visibility on the platform and Google.
                  </p>
                </div>
              </div>

              <div className="seo-card-body">
                {/* 1. SEO Title */}
                <div className="form-group-with-counter">
                  <label className="subcard-label">
                    SEO Title <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="subcard-input seo-text-input"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Enter SEO title..."
                  />
                  <div className="field-meta-row">
                    <span className="field-hint-text">Keep it under 60 characters. Include main keyword.</span>
                    <span className={`char-counter ${seoTitle.length > 60 ? 'counter-danger' : ''}`}>
                      {seoTitle.length}/60
                    </span>
                  </div>
                </div>

                {/* 2. Meta Description */}
                <div className="form-group-with-counter">
                  <label className="subcard-label">
                    Meta Description <span className="required-star">*</span>
                  </label>
                  <textarea
                    className="subcard-textarea meta-desc-textarea"
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Enter meta description..."
                  />
                  <div className="field-meta-row">
                    <span className="field-hint-text">Keep it under 160 characters. Write a compelling description.</span>
                    <span className={`char-counter ${metaDescription.length > 160 ? 'counter-danger' : ''}`}>
                      {metaDescription.length}/160
                    </span>
                  </div>
                </div>

                {/* 3. URL Slug */}
                <div className="form-group">
                  <label className="subcard-label">
                    URL Slug <span className="required-star">*</span>
                  </label>
                  <div className="url-slug-input-group">
                    <span className="url-slug-prefix">https://www.vyaparidarbaar.com/commodities/</span>
                    <input
                      type="text"
                      className="url-slug-input"
                      value={urlSlug}
                      onChange={(e) => setUrlSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      placeholder="commodity-name"
                    />
                  </div>
                  <span className="field-hint-text">Use lowercase letters, numbers and hyphens only.</span>
                </div>

                {/* 4. Keywords */}
                <div className="form-group">
                  <label className="subcard-label">Keywords (Focus Keywords)</label>
                  <div className="seo-keywords-box">
                    <div className="seo-keywords-list">
                      {seoKeywords.map((kw) => (
                        <span key={kw} className="seo-keyword-chip">
                          <span>{kw}</span>
                          <button
                            type="button"
                            className="tag-chip-remove"
                            onClick={() => handleRemoveKeyword(kw)}
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        className="keyword-inline-input"
                        placeholder="Add keyword..."
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddKeyword(keywordInput);
                          }
                        }}
                      />
                    </div>
                    <span className="select-box-chevron">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                  <span className="field-hint-text">Add 3-10 relevant keywords (press Enter to add).</span>
                </div>
              </div>
            </div>

            {/* Right Column: Previews */}
            <div className="seo-previews-col">
              {/* Card 1: Search Engine Preview */}
              <div className="seo-preview-card">
                <div className="seo-preview-header">
                  <div className="seo-preview-header-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <h3 className="seo-preview-title">Search Engine Preview</h3>
                  </div>
                  <div className="google-preview-tag">
                    <span className="google-logo-g">
                      <span style={{ color: '#4285F4' }}>G</span>
                      <span style={{ color: '#EA4335' }}>o</span>
                      <span style={{ color: '#FBBC05' }}>o</span>
                      <span style={{ color: '#4285F4' }}>g</span>
                      <span style={{ color: '#34A853' }}>l</span>
                      <span style={{ color: '#EA4335' }}>e</span>
                    </span>
                    <span className="google-tag-text">Preview on Google</span>
                  </div>
                </div>
                <p className="seo-preview-desc">
                  This is how your commodity may appear in Google search results.
                </p>

                {/* Google SERP Card */}
                <div className="google-serp-box">
                  <div className="serp-site-info">
                    <div className="serp-favicon">
                      <img src={brandCrest} alt="Vyapari Darbaar" />
                    </div>
                    <div className="serp-site-text">
                      <span className="serp-brand-name">Vyapari Darbaar</span>
                      <span className="serp-breadcrumbs">https://www.vyaparidarbaar.com &gt; commodities &gt; {urlSlug || 'makhana'}</span>
                    </div>
                  </div>

                  <div className="serp-main-content">
                    <div className="serp-text-col">
                      <a href="#preview" className="serp-title-link" onClick={(e) => e.preventDefault()}>
                        {seoTitle || 'Makhana Price Today | Makhana Mandi Rates | Vyapari Darbaar'}
                      </a>
                      <p className="serp-snippet-text">
                        {metaDescription || 'Get latest Makhana prices, mandi rates, market trends and insights across India. Compare rates, analysis and connect with verified traders on Vyapari Darbaar.'}
                      </p>
                    </div>

                    <div className="serp-thumb-col">
                      <img
                        src={commMakhana}
                        alt="Makhana"
                        className="serp-thumb-img"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Social Media Preview */}
              <div className="seo-preview-card">
                <div className="seo-preview-header-simple">
                  <div className="seo-preview-header-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <h3 className="seo-preview-title">Social Media Preview</h3>
                  </div>
                </div>
                <p className="seo-preview-desc">
                  This is how your commodity may look when shared on social media.
                </p>

                {/* Social Tabs */}
                <div className="social-tabs-row">
                  <button
                    type="button"
                    className={`social-tab-btn ${socialTab === 'Facebook' ? 'active' : ''}`}
                    onClick={() => setSocialTab('Facebook')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    className={`social-tab-btn ${socialTab === 'LinkedIn' ? 'active' : ''}`}
                    onClick={() => setSocialTab('LinkedIn')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>

                  <button
                    type="button"
                    className={`social-tab-btn ${socialTab === 'Twitter / X' ? 'active' : ''}`}
                    onClick={() => setSocialTab('Twitter / X')}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#0f172a">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter / X</span>
                  </button>
                </div>

                {/* Social Card Preview */}
                <div className="social-card-preview">
                  <div className="social-card-img-box">
                    <img
                      src={commMakhana}
                      alt="Makhana"
                      className="social-card-img"
                    />
                  </div>
                  <div className="social-card-content">
                    <span className="social-card-domain">VYAPARIDARBAAR.COM</span>
                    <h4 className="social-card-title">
                      {seoTitle || 'Makhana Price Today | Makhana Mandi Rates | Vyapari Darbaar'}
                    </h4>
                    <p className="social-card-desc">
                      Get latest Makhana prices, mandi rates, market trends and insights across India. Compare rates, analysis and connect with verified traders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: 3 Columns Grid */}
          <div className="seo-bottom-grid">
            {/* Card 1: Visibility Settings */}
            <div className="seo-bottom-card">
              <div className="seo-bottom-card-header">
                <div className="bottom-card-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="bottom-card-header-text">
                  <h3 className="bottom-card-title">Visibility Settings</h3>
                  <p className="bottom-card-subtitle">
                    Control where and how this commodity appears on the platform.
                  </p>
                </div>
              </div>

              <div className="toggle-items-list">
                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Show on Website</span>
                    <span className="toggle-item-desc">Make this commodity visible to all users</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${visibilityShowOnWebsite ? 'active' : ''}`}
                    onClick={() => setVisibilityShowOnWebsite(!visibilityShowOnWebsite)}
                    aria-label="Toggle Show on Website"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Include in Search</span>
                    <span className="toggle-item-desc">Allow this commodity to appear in search results</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${visibilityIncludeInSearch ? 'active' : ''}`}
                    onClick={() => setVisibilityIncludeInSearch(!visibilityIncludeInSearch)}
                    aria-label="Toggle Include in Search"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Show in Category Listing</span>
                    <span className="toggle-item-desc">Display in relevant category pages</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${visibilityShowInCategory ? 'active' : ''}`}
                    onClick={() => setVisibilityShowInCategory(!visibilityShowInCategory)}
                    aria-label="Toggle Show in Category Listing"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Featured Commodity</span>
                    <span className="toggle-item-desc">Highlight on homepage and featured sections</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${visibilityFeaturedCommodity ? 'active' : ''}`}
                    onClick={() => setVisibilityFeaturedCommodity(!visibilityFeaturedCommodity)}
                    aria-label="Toggle Featured Commodity"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Structured Data (Schema.org) */}
            <div className="seo-bottom-card">
              <div className="seo-bottom-card-header">
                <div className="bottom-card-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div className="bottom-card-header-text">
                  <h3 className="bottom-card-title">Structured Data (Schema.org)</h3>
                  <p className="bottom-card-subtitle">
                    Enable schema markup for better search engine understanding.
                  </p>
                </div>
              </div>

              <div className="toggle-items-list">
                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Enable Product Schema</span>
                    <span className="toggle-item-desc">Help search engines understand this commodity</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${schemaProduct ? 'active' : ''}`}
                    onClick={() => setSchemaProduct(!schemaProduct)}
                    aria-label="Toggle Product Schema"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Include Price Information</span>
                    <span className="toggle-item-desc">Add price and availability markup</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${schemaPrice ? 'active' : ''}`}
                    onClick={() => setSchemaPrice(!schemaPrice)}
                    aria-label="Toggle Price Information"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Include Breadcrumb Schema</span>
                    <span className="toggle-item-desc">Improve site navigation in search results</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${schemaBreadcrumb ? 'active' : ''}`}
                    onClick={() => setSchemaBreadcrumb(!schemaBreadcrumb)}
                    aria-label="Toggle Breadcrumb Schema"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="toggle-item-row">
                  <div className="toggle-item-text">
                    <span className="toggle-item-title">Enable FAQ Schema (Optional)</span>
                    <span className="toggle-item-desc">Show common questions in search results</span>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${schemaFaq ? 'active' : ''}`}
                    onClick={() => setSchemaFaq(!schemaFaq)}
                    aria-label="Toggle FAQ Schema"
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: SEO Checklist */}
            <div className="seo-bottom-card">
              <div className="seo-checklist-card-header">
                <div className="seo-checklist-header-left">
                  <span className="seo-checklist-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                    </svg>
                  </span>
                  <div className="bottom-card-header-text">
                    <h3 className="bottom-card-title">SEO Checklist</h3>
                    <p className="bottom-card-subtitle">Complete these to improve visibility.</p>
                  </div>
                </div>
                <span className="seo-checklist-score">5/6</span>
              </div>

              {/* Progress bar */}
              <div className="seo-progress-bar-track">
                <div className="seo-progress-bar-fill" style={{ width: '83.33%' }} />
              </div>

              <div className="checklist-items-list">
                <div className="checklist-item checked">
                  <span className="checklist-icon-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="checklist-item-text">SEO title added</span>
                </div>

                <div className="checklist-item checked">
                  <span className="checklist-icon-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="checklist-item-text">Meta description added</span>
                </div>

                <div className="checklist-item checked">
                  <span className="checklist-icon-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="checklist-item-text">URL slug created</span>
                </div>

                <div className="checklist-item checked">
                  <span className="checklist-icon-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="checklist-item-text">At least 3 keywords added</span>
                </div>

                <div className="checklist-item checked">
                  <span className="checklist-icon-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="checklist-item-text">Visibility settings configured</span>
                </div>

                <div className="checklist-item unchecked">
                  <span className="checklist-icon-square" />
                  <span className="checklist-item-text">Featured image uploaded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar for SEO & Visibility */}
          <div className="add-comm-bottom-bar">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab('Additional Details')}
            >
              ← Previous
            </button>

            <div className="bottom-bar-right-actions">
              <button
                type="button"
                className="btn-save-draft"
                onClick={handleSaveDraft}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
              </button>

              <button
                type="button"
                className="btn-publish-commodity"
                onClick={handlePublish}
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
        </div>
      )}
    </div>
  );
}
