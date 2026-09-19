import React, { useState, useEffect } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commChana from '../assets/comm_chana.png';
import commRice from '../assets/comm_rice.png';
import commSoybean from '../assets/comm_soybean.png';
import commCotton from '../assets/comm_cotton.png';
import commTur from '../assets/comm_tur.png';
import commSugar from '../assets/comm_sugar.png';
import commOnion from '../assets/comm_onion.jpg';
import commPotato from '../assets/comm_potato.jpg';
import commTomato from '../assets/comm_tomato.jpg';
import commRedChilli from '../assets/comm_red_chilli.jpg';
import commCoriander from '../assets/comm_coriander.jpg';
import welcomeBgImg from '../assets/welcome_banner_sketch.png';
import {
  getCommodities,
  getCommodityCategoryOptions,
  getStateOptions,
  getMandiOptions,
  deleteCommodity,
  updateCommodityStatus,
} from '../api/commodityService';
import { API_BASE_URL } from '../api/config';
import './AllCommodities.css';

export default function AllCommodities({ onNavigateToAdd, onBackToPrices }) {
  // Search & Filter state
  const [searchCommodity, setSearchCommodity] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stateFilter, setStateFilter] = useState('All States');
  const [mandiFilter, setMandiFilter] = useState('All Mandis');
  const [priceTrendFilter, setPriceTrendFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest Updated');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('20 / page');

  // Exact 15 commodities from the design screenshot
  const commoditiesList = [
    {
      id: 1,
      name: 'Makhana',
      image: commMakhana,
      category: 'Dry Fruits',
      variety: 'Premium',
      unit: 'Quintal',
      price: '1,250',
      change: '↑ 2.4%',
      trend: 'up',
      mandi: 'Darbhanga',
      state: 'Bihar',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:20 AM',
      sparklinePoints: '0,14 10,8 20,11 30,6 40,9 50,4 60,7',
    },
    {
      id: 2,
      name: 'Wheat',
      image: commWheat,
      category: 'Cereals',
      variety: 'Lokwan',
      unit: 'Quintal',
      price: '2,350',
      change: '↑ 1.8%',
      trend: 'up',
      mandi: 'Indore',
      state: 'Madhya Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:18 AM',
      sparklinePoints: '0,15 10,12 20,8 30,10 40,6 50,8 60,5',
    },
    {
      id: 3,
      name: 'Rice',
      image: commRice,
      category: 'Cereals',
      variety: 'Basmati',
      unit: 'Quintal',
      price: '3,120',
      change: '↓ 0.6%',
      trend: 'down',
      mandi: 'Karnal',
      state: 'Haryana',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:17 AM',
      sparklinePoints: '0,5 10,8 20,6 30,11 40,9 50,13 60,11',
    },
    {
      id: 4,
      name: 'Maize',
      image: commMaize,
      category: 'Cereals',
      variety: 'Hybrid',
      unit: 'Quintal',
      price: '2,180',
      change: '↑ 1.2%',
      trend: 'up',
      mandi: 'Ratlam',
      state: 'Madhya Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:16 AM',
      sparklinePoints: '0,13 10,10 20,12 30,8 40,9 50,6 60,7',
    },
    {
      id: 5,
      name: 'Mustard',
      image: commMustard,
      category: 'Oilseeds',
      variety: 'Yellow',
      unit: 'Quintal',
      price: '5,420',
      change: '↑ 3.1%',
      trend: 'up',
      mandi: 'Jaipur',
      state: 'Rajasthan',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:15 AM',
      sparklinePoints: '0,14 10,11 20,7 30,9 40,5 50,6 60,4',
    },
    {
      id: 6,
      name: 'Chana',
      image: commChana,
      category: 'Pulses',
      variety: 'Desi',
      unit: 'Quintal',
      price: '5,120',
      change: '↓ 0.4%',
      trend: 'down',
      mandi: 'Latur',
      state: 'Maharashtra',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:14 AM',
      sparklinePoints: '0,6 10,7 20,10 30,9 40,12 50,14 60,12',
    },
    {
      id: 7,
      name: 'Soybean',
      image: commSoybean,
      category: 'Oilseeds',
      variety: 'Bold',
      unit: 'Quintal',
      price: '4,320',
      change: '↑ 1.0%',
      trend: 'up',
      mandi: 'Ujjain',
      state: 'Madhya Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:13 AM',
      sparklinePoints: '0,13 10,10 20,11 30,7 40,9 50,6 60,7',
    },
    {
      id: 8,
      name: 'Cotton',
      image: commCotton,
      category: 'Fibers',
      variety: 'Shankar-6',
      unit: 'Candy',
      price: '6,380',
      change: '↓ 1.8%',
      trend: 'down',
      mandi: 'Rajkot',
      state: 'Gujarat',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:12 AM',
      sparklinePoints: '0,7 10,6 20,10 30,8 40,12 50,11 60,13',
    },
    {
      id: 9,
      name: 'Turmeric',
      image: commTur,
      category: 'Spices',
      variety: 'Salem',
      unit: 'Quintal',
      price: '8,120',
      change: '↓ 2.6%',
      trend: 'down',
      mandi: 'Erode',
      state: 'Tamil Nadu',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:11 AM',
      sparklinePoints: '0,5 10,9 20,7 30,12 40,10 50,14 60,12',
    },
    {
      id: 10,
      name: 'Sugar',
      image: commSugar,
      category: 'Sugars',
      variety: 'S-30',
      unit: 'Quintal',
      price: '3,420',
      change: '↓ 1.4%',
      trend: 'down',
      mandi: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:10 AM',
      sparklinePoints: '0,6 10,8 20,7 30,11 40,10 50,13 60,11',
    },
    {
      id: 11,
      name: 'Onion',
      image: commOnion,
      category: 'Vegetables',
      variety: 'Red',
      unit: 'Quintal',
      price: '1,820',
      change: '↑ 4.2%',
      trend: 'up',
      mandi: 'Lasalgaon',
      state: 'Maharashtra',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:09 AM',
      sparklinePoints: '0,15 10,11 20,8 30,10 40,6 50,5 60,4',
    },
    {
      id: 12,
      name: 'Potato',
      image: commPotato,
      category: 'Vegetables',
      variety: 'Chipsona',
      unit: 'Quintal',
      price: '1,560',
      change: '↑ 1.9%',
      trend: 'up',
      mandi: 'Agra',
      state: 'Uttar Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:08 AM',
      sparklinePoints: '0,13 10,12 20,9 30,10 40,7 50,6 60,5',
    },
    {
      id: 13,
      name: 'Tomato',
      image: commTomato,
      category: 'Vegetables',
      variety: 'Local',
      unit: 'Quintal',
      price: '2,040',
      change: '↓ 3.5%',
      trend: 'down',
      mandi: 'Kolar',
      state: 'Karnataka',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:07 AM',
      sparklinePoints: '0,5 10,7 20,8 30,12 40,11 50,15 60,13',
    },
    {
      id: 14,
      name: 'Red Chilli',
      image: commRedChilli,
      category: 'Spices',
      variety: 'Teja',
      unit: 'Quintal',
      price: '14,200',
      change: '↑ 2.1%',
      trend: 'up',
      mandi: 'Guntur',
      state: 'Andhra Pradesh',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:06 AM',
      sparklinePoints: '0,14 10,11 20,8 30,9 40,6 50,7 60,4',
    },
    {
      id: 15,
      name: 'Coriander',
      image: commCoriander,
      category: 'Spices',
      variety: 'Badami',
      unit: 'Quintal',
      price: '6,780',
      change: '↑ 0.8%',
      trend: 'up',
      mandi: 'Kota',
      state: 'Rajasthan',
      updatedDate: '17 Sep 2026',
      updatedTime: '10:05 AM',
      sparklinePoints: '0,12 10,11 20,9 30,10 40,7 50,8 60,6',
    },
  ];

  // API Data States
  const [liveCommodities, setLiveCommodities] = useState([]);
  const [hasLoadedApi, setHasLoadedApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [mandisOptions, setMandisOptions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const refetchCommodities = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Helper to extract list from any API structure (paginated or plain array)
  function extractCommoditiesList(res) {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (res.data && Array.isArray(res.data.items)) return res.data.items;
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    if (res.data && Array.isArray(res.data.commodities)) return res.data.commodities;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.commodities)) return res.commodities;
    if (res.commodities && Array.isArray(res.commodities.data)) return res.commodities.data;
    return [];
  }

  // Helper to get image URL with full storage domain if needed
  function getCommodityImageUrl(img) {
    if (!img) return commWheat;
    if (typeof img !== 'string') return commWheat;
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
      return img;
    }
    const cleanPath = img.replace(/^\/?storage\//, '').replace(/^\//, '');
    return `${API_BASE_URL}/storage/${cleanPath}`;
  }

  // Load Categories, States, and Mandis Options on mount
  useEffect(() => {
    getCommodityCategoryOptions()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        if (list.length > 0) setCategoriesOptions(list);
      })
      .catch(() => {});

    getStateOptions()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        if (list.length > 0) setStatesOptions(list);
      })
      .catch(() => {});

    getMandiOptions()
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        if (list.length > 0) setMandisOptions(list);
      })
      .catch(() => {});
  }, []);

  // Fetch Stored Commodities from API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const parsedPageSize = parseInt(pageSize, 10) || 20;
    const params = {
      page: currentPage || 1,
      per_page: parsedPageSize,
      status: 1,
      sort_by: 'sort_order',
      sort_order: 'asc',
      search: searchCommodity.trim() || undefined,
    };
    if (categoryFilter && categoryFilter !== 'All Categories') {
      const matched = categoriesOptions.find(
        (c) => c.name === categoryFilter || String(c.id) === String(categoryFilter)
      );
      if (matched) {
        params.commodity_category_id = matched.id;
      } else if (!isNaN(Number(categoryFilter))) {
        params.commodity_category_id = categoryFilter;
      }
    }

    getCommodities(params)
      .then((res) => {
        if (isMounted && res) {
          const list = extractCommoditiesList(res);
          setLiveCommodities(list);
          const total =
            res?.data?.pagination?.total ??
            res?.meta?.total ??
            res?.data?.total ??
            res?.pagination?.total ??
            res?.total ??
            list.length;
          setTotalCount(total);
          setHasLoadedApi(true);
        }
      })
      .catch((err) => {
        console.warn('Failed to load commodities from API:', err);
        if (isMounted) setHasLoadedApi(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, pageSize, searchCommodity, categoryFilter, categoriesOptions, refreshTrigger]);

  // Action: Delete Commodity
  const handleDeleteCommodity = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete commodity "${name}"?`)) {
      return;
    }
    try {
      await deleteCommodity(id);
      showToast(`Commodity "${name}" deleted successfully!`, 'success');
      refetchCommodities();
    } catch (err) {
      showToast(err.message || 'Failed to delete commodity', 'error');
    }
  };

  // Action: Toggle Status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = !currentStatus;
      await updateCommodityStatus(id, nextStatus ? 1 : 0);
      showToast(`Status updated to ${nextStatus ? 'Active' : 'Inactive'}`, 'success');
      refetchCommodities();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  // Map display data: When API has loaded, prioritize stored commodities
  const displayCommodities = hasLoadedApi
    ? liveCommodities.map((c, idx) => ({
        id: c.id || idx + 1,
        name: c.name || 'Unnamed Commodity',
        code: c.code || '',
        slug: c.slug || '',
        image: getCommodityImageUrl(c.image_url || c.image),
        category:
          c.commodity_category?.name ||
          c.category?.name ||
          c.category_name ||
          (typeof c.category === 'string' ? c.category : '') ||
          categoriesOptions.find((cat) => String(cat.id) === String(c.commodity_category_id))?.name ||
          'General',
        variety:
          c.commodity_variety?.name ||
          c.variety?.name ||
          (typeof c.variety === 'string' ? c.variety : '') ||
          'Standard',
        unit: c.unit || 'QUINTAL',
        price:
          c.price || c.current_price || c.modal_price
            ? `₹${Number(c.price || c.current_price || c.modal_price).toLocaleString('en-IN')}`
            : '₹—',
        change: c.price_change || c.change || '0.0%',
        trend: c.trend === 'down' ? 'down' : 'up',
        mandi: c.mandi?.name || c.mandi_name || '—',
        state: c.state?.name || c.state_name || '—',
        updatedDate: c.updated_at
          ? new Date(c.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : 'Today',
        updatedTime: c.updated_at
          ? new Date(c.updated_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : '',
        sparklinePoints: c.sparkline || '0,14 10,11 20,8 30,9 40,6 50,7 60,4',
        status: c.status === 1 || c.status === true || c.status === '1',
        raw: c,
      }))
    : commoditiesList;

  // Filter and sort commodities
  const filteredCommodities = displayCommodities.filter((c) => {
    if (stateFilter && stateFilter !== 'All States' && c.state !== stateFilter) {
      return false;
    }
    if (mandiFilter && mandiFilter !== 'All Mandis' && c.mandi !== mandiFilter) {
      return false;
    }
    if (priceTrendFilter && priceTrendFilter !== 'All') {
      if (priceTrendFilter === 'Rising (↑)' && c.trend !== 'up') return false;
      if (priceTrendFilter === 'Falling (↓)' && c.trend !== 'down') return false;
    }
    return true;
  });

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCommodities.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Filter reset
  const handleResetFilters = () => {
    setSearchCommodity('');
    setCategoryFilter('All Categories');
    setStateFilter('All States');
    setMandiFilter('All Mandis');
    setPriceTrendFilter('All');
    setSortBy('Latest Updated');
  };

  return (
    <div className="comm-all-page">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`comm-toast-banner ${toast.type}`}>
          <span>{toast.msg}</span>
          <button type="button" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* ====================================================================
          1. Header Section: Title & Quote Banner
          ==================================================================== */}
      <div className="comm-all-header">
        <div className="comm-all-header-left">
          {onBackToPrices && (
            <button
              type="button"
              className="comm-all-back-link"
              onClick={onBackToPrices}
              title="Back to Commodity Prices Dashboard"
            >
              ← Back to Commodity Prices
            </button>
          )}
          <h1 className="comm-all-page-title">All Commodities</h1>
          <p className="comm-all-page-subtitle">
            Explore real-time and historical prices of agricultural commodities across India.
          </p>
        </div>

        <div className="comm-all-header-right">
          <div className="comm-all-quote-block">
            <span className="comm-all-quote-text">
              “Better Price<br />
              Better Opportunities<br />
              for a Stronger Bharat.”
            </span>
          </div>
          <div className="comm-all-banner-sketch-wrapper">
            <img
              src={welcomeBgImg}
              alt="Indian Mandi Sketch"
              className="comm-all-banner-sketch"
            />
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. KPI Stats Cards Row + Add Commodity CTA
          ==================================================================== */}
      <div className="comm-kpi-bar-row">
        <div className="comm-kpi-cards-grid">
          {/* Card 1: Total Commodities */}
          <div className="comm-kpi-stat-card">
            <div className="comm-kpi-icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div className="comm-kpi-data">
              <span className="comm-kpi-label">Total Commodities</span>
              <span className="comm-kpi-val">{totalCount || (hasLoadedApi ? liveCommodities.length : 120)}</span>
              <span className="comm-kpi-trend green">↑ 8% <small>vs last month</small></span>
            </div>
          </div>

          {/* Card 2: Active Mandis */}
          <div className="comm-kpi-stat-card">
            <div className="comm-kpi-icon-box orange">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="comm-kpi-data">
              <span className="comm-kpi-label">Active Mandis</span>
              <span className="comm-kpi-val">320</span>
              <span className="comm-kpi-trend green">↑ 5% <small>vs last month</small></span>
            </div>
          </div>

          {/* Card 3: Price Updates (Today) */}
          <div className="comm-kpi-stat-card">
            <div className="comm-kpi-icon-box blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="comm-kpi-data">
              <span className="comm-kpi-label">Price Updates (Today)</span>
              <span className="comm-kpi-val">1,248</span>
              <span className="comm-kpi-trend green">↑ 12% <small>vs yesterday</small></span>
            </div>
          </div>

          {/* Card 4: Tracked by Users */}
          <div className="comm-kpi-stat-card">
            <div className="comm-kpi-icon-box red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="comm-kpi-data">
              <span className="comm-kpi-label">Tracked by Users</span>
              <span className="comm-kpi-val">25,000+</span>
              <span className="comm-kpi-trend green">↑ 18% <small>vs last month</small></span>
            </div>
          </div>
        </div>

        {/* Action Button: Add Commodity */}
        <button
          type="button"
          className="btn-add-comm-cta"
          onClick={onNavigateToAdd}
          title="Add a new commodity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Commodity</span>
        </button>
      </div>

      {/* ====================================================================
          3. Filter Toolbar
          ==================================================================== */}
      <div className="comm-filter-toolbar">
        {/* Search Commodity */}
        <div className="filter-group search-group">
          <label className="filter-label">Search Commodity</label>
          <div className="filter-input-wrapper">
            <svg className="filter-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="filter-text-input"
              placeholder="Enter commodity name..."
              value={searchCommodity}
              onChange={(e) => setSearchCommodity(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {categoriesOptions.length > 0 ? (
                categoriesOptions.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <>
                  <option>Dry Fruits</option>
                  <option>Cereals</option>
                  <option>Oilseeds</option>
                  <option>Pulses</option>
                  <option>Spices</option>
                  <option>Fibers</option>
                  <option>Sugars</option>
                  <option>Vegetables</option>
                </>
              )}
            </select>
            <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* State */}
        <div className="filter-group">
          <label className="filter-label">State</label>
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="All States">All States</option>
              {statesOptions.length > 0 ? (
                statesOptions.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))
              ) : (
                <>
                  <option>Bihar</option>
                  <option>Madhya Pradesh</option>
                  <option>Haryana</option>
                  <option>Rajasthan</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                  <option>Tamil Nadu</option>
                  <option>Uttar Pradesh</option>
                  <option>Karnataka</option>
                  <option>Andhra Pradesh</option>
                </>
              )}
            </select>
            <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Mandi */}
        <div className="filter-group">
          <label className="filter-label">Mandi</label>
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={mandiFilter}
              onChange={(e) => setMandiFilter(e.target.value)}
            >
              <option value="All Mandis">All Mandis</option>
              {mandisOptions.length > 0 ? (
                mandisOptions.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))
              ) : (
                <>
                  <option>Darbhanga</option>
                  <option>Indore</option>
                  <option>Karnal</option>
                  <option>Ratlam</option>
                  <option>Jaipur</option>
                  <option>Latur</option>
                  <option>Ujjain</option>
                  <option>Rajkot</option>
                  <option>Erode</option>
                  <option>Muzaffarnagar</option>
                  <option>Lasalgaon</option>
                  <option>Agra</option>
                  <option>Kolar</option>
                  <option>Guntur</option>
                  <option>Kota</option>
                </>
              )}
            </select>
            <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Price Trend */}
        <div className="filter-group">
          <label className="filter-label">Price Trend</label>
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={priceTrendFilter}
              onChange={(e) => setPriceTrendFilter(e.target.value)}
            >
              <option>All</option>
              <option>Increasing</option>
              <option>Decreasing</option>
              <option>Stable</option>
            </select>
            <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <div className="filter-select-wrapper">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Latest Updated</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Commodity Name</option>
            </select>
            <svg className="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div className="filter-buttons-group">
          <button type="button" className="btn-filter-apply">
            Apply Filters
          </button>
          <button
            type="button"
            className="btn-filter-reset"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* ====================================================================
          4. Commodities Table Card
          ==================================================================== */}
      <div className="comm-table-card">
        {/* Table Top Header */}
        <div className="comm-table-header-row">
          <h2 className="comm-table-title">
            Commodities ({totalCount || (hasLoadedApi ? liveCommodities.length : filteredCommodities.length)})
          </h2>
          <div className="comm-table-actions-right">
            <button type="button" className="btn-table-action" title="Export">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export</span>
            </button>

            <button type="button" className="btn-table-action" title="Bulk Update">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Bulk Update</span>
            </button>

            <button type="button" className="btn-table-action" title="Manage Categories">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Manage Categories</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="comm-table-container">
          <table className="comm-main-table">
            <thead>
              <tr>
                <th style={{ width: '28px' }}>
                  <input
                    type="checkbox"
                    className="comm-checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredCommodities.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ width: '32px' }}>#</th>
                <th>Commodity</th>
                <th>Category</th>
                <th>Variety</th>
                <th>Unit</th>
                <th style={{ width: '80px' }}>Status</th>
                <th>Latest Price (₹)</th>
                <th>Change</th>
                <th>Mandi ▾</th>
                <th>State</th>
                <th>Last Updated</th>
                <th style={{ width: '70px' }}>Trend (7D)</th>
                <th style={{ width: '40px' }}>Trend</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="15" style={{ textAlign: 'center', padding: '48px 16px', color: '#64748b' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      <svg className="comm-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" strokeLinecap="round" />
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>Loading commodities from database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCommodities.length === 0 ? (
                <tr>
                  <td colSpan="15" style={{ textAlign: 'center', padding: '52px 16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>No Stored Commodities Found</span>
                      <span style={{ fontSize: '13px', color: '#64748b', maxWidth: '420px' }}>
                        No commodities match your filter criteria or none have been added to the database yet.
                      </span>
                      <button
                        type="button"
                        className="btn-add-comm-cta"
                        onClick={onNavigateToAdd}
                        style={{ marginTop: '8px' }}
                      >
                        + Add First Commodity
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCommodities.map((c) => (
                  <tr key={c.id} className={selectedIds.includes(c.id) ? 'row-selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="comm-checkbox"
                        checked={selectedIds.includes(c.id)}
                        onChange={() => handleSelectRow(c.id)}
                      />
                    </td>
                    <td className="cell-id">{c.id}</td>
                    <td className="cell-commodity">
                      <img src={c.image} alt={c.name} className="comm-product-thumb" />
                      <span className="comm-product-name">{c.name}</span>
                    </td>
                    <td className="cell-category">{c.category}</td>
                    <td className="cell-variety">{c.variety}</td>
                    <td className="cell-unit">{c.unit}</td>
                    <td className="cell-status">
                      <button
                        type="button"
                        className={`comm-status-badge ${c.status ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleStatus(c.id, c.status)}
                        title="Click to toggle status"
                      >
                        <span className="status-dot" />
                        {c.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="cell-price">{c.price}</td>
                    <td className="cell-change">
                      <span className={`change-badge ${c.trend}`}>
                        {c.change}
                      </span>
                    </td>
                    <td className="cell-mandi">{c.mandi}</td>
                    <td className="cell-state">{c.state}</td>
                    <td className="cell-updated">
                      <div className="updated-meta">
                        <span className="updated-date">{c.updatedDate}</span>
                        <span className="updated-time">{c.updatedTime}</span>
                      </div>
                    </td>
                    <td className="cell-sparkline">
                      <svg width="60" height="18" className="sparkline-svg">
                        <polyline
                          fill="none"
                          stroke={c.trend === 'up' ? '#10b981' : '#ef4444'}
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparklinePoints}
                        />
                      </svg>
                    </td>
                    <td className="cell-trend-icon">
                      {c.trend === 'up' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                          <polyline points="17 18 23 18 23 12" />
                        </svg>
                      )}
                    </td>
                    <td className="cell-action">
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className="btn-action-view"
                          title="View details"
                          onClick={() => showToast(`Commodity: ${c.name} (Code: ${c.code || 'N/A'}, Unit: ${c.unit})`, 'info')}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn-action-delete"
                          title={`Delete ${c.name}`}
                          onClick={() => handleDeleteCommodity(c.id, c.name)}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Row */}
        <div className="comm-table-pagination">
          <div className="pagination-info">
            Showing {filteredCommodities.length > 0 ? (currentPage - 1) * (parseInt(pageSize, 10) || 15) + 1 : 0} to{' '}
            {Math.min(currentPage * (parseInt(pageSize, 10) || 15), totalCount || filteredCommodities.length)} of{' '}
            {totalCount || filteredCommodities.length} commodities
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="page-nav-btn prev"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>
            <button type="button" className="page-number-btn active">
              {currentPage}
            </button>
            <button
              type="button"
              className="page-nav-btn next"
              disabled={currentPage >= Math.max(1, Math.ceil((totalCount || filteredCommodities.length) / (parseInt(pageSize, 10) || 20)))}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              ›
            </button>

            {/* Page size dropdown */}
            <div className="page-size-wrapper">
              <select
                className="page-size-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="20 / page">20 / page</option>
                <option value="15 / page">15 / page</option>
                <option value="30 / page">30 / page</option>
                <option value="50 / page">50 / page</option>
              </select>
              <svg className="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          5. Bottom Feature Highlights (4 Cards)
          ==================================================================== */}
      <div className="comm-feature-highlights-grid">
        {/* Feature 1: Real-time Mandi Prices */}
        <div className="feature-highlight-card">
          <div className="feature-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="feature-meta">
            <span className="feature-title">Real-time Mandi Prices</span>
            <span className="feature-subtitle">Updated from verified sources</span>
          </div>
        </div>

        {/* Feature 2: Multiple Commodities */}
        <div className="feature-highlight-card">
          <div className="feature-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <div className="feature-meta">
            <span className="feature-title">Multiple Commodities</span>
            <span className="feature-subtitle">120+ agri commodities</span>
          </div>
        </div>

        {/* Feature 3: Pan India Coverage */}
        <div className="feature-highlight-card">
          <div className="feature-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="feature-meta">
            <span className="feature-title">Pan India Coverage</span>
            <span className="feature-subtitle">320+ mandis across India</span>
          </div>
        </div>

        {/* Feature 4: Historical Data */}
        <div className="feature-highlight-card">
          <div className="feature-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="feature-meta">
            <span className="feature-title">Historical Data</span>
            <span className="feature-subtitle">View past trends and analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
