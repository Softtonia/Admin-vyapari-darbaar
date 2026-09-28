import React, { useState } from 'react';
import './AddUserStep4.css';

export default function AddUserStep4({ formData, setFormData }) {
  const [billingCycle, setBillingCycle] = useState('yearly');
  
  const handlePlanChange = (planId) => {
    setFormData(prev => ({ ...prev, subscription_plan: planId, billing_cycle: billingCycle }));
  };

  const handleBillingToggle = (cycle) => {
    setBillingCycle(cycle);
    setFormData(prev => ({ ...prev, billing_cycle: cycle }));
  };

  const currentPlan = formData.subscription_plan || 'pro';

  const plans = [
    {
      id: 'free', name: 'Free Plan', priceMonthly: 0, priceYearly: 0, subtitle: 'Basic access for new users',
      features: ['View basic commodity prices', 'Access general news', 'Limited mandi rates'],
      disabledFeatures: ['Trader contact details', 'Post buy/sell requirements', 'Export/Import information', 'Priority support'],
      iconColor: '#6b7280', badgeIcon: '👥'
    },
    {
      id: 'basic', name: 'Basic Plan', priceMonthly: 199, priceYearly: 1999, subtitle: 'Essential tools for traders',
      features: ['View live commodity prices', 'Access mandi rates', 'Market news & government updates', 'Post buy/sell requirements (Limited)', 'Trader contact details (Limited)'],
      disabledFeatures: ['Export/Import information', 'Basic support'],
      iconColor: '#3b82f6', badgeIcon: '👑'
    },
    {
      id: 'pro', name: 'Pro Plan', priceMonthly: 499, priceYearly: 4999, subtitle: 'Complete trading solution', isPopular: true,
      features: ['Live prices, mandi rates & trends', 'Unlimited market news', 'Post unlimited buy/sell requirements', 'Unlock trader contact details', 'Export/Import & government info', 'Advanced market analytics', 'Priority support'],
      disabledFeatures: [],
      iconColor: '#10b981', badgeIcon: '⭐'
    },
    {
      id: 'business', name: 'Business Plan', priceMonthly: 999, priceYearly: 9999, subtitle: 'For large traders & companies',
      features: ['All Pro Plan features', 'Company profile listing', 'Advertisement credits', 'Bulk contact unlocks', 'API data access (Limited)', 'Dedicated account manager', 'Priority phone & email support'],
      disabledFeatures: [],
      iconColor: '#f59e0b', badgeIcon: '🏢'
    }
  ];

  const getActivePlanDetails = () => plans.find(p => p.id === currentPlan) || plans[2];

  const activePlan = getActivePlanDetails();
  const today = new Date();
  const nextYear = new Date();
  if (billingCycle === 'yearly') {
    nextYear.setFullYear(today.getFullYear() + 1);
  } else {
    nextYear.setMonth(today.getMonth() + 1);
  }

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="au-step4-container">
      <div className="au-step4-main">
        
        {/* Header */}
        <div className="au-step4-header">
          <div className="au-step4-title-box">
            <div className="au-s4-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div>
              <h3 className="au-s4-title">Select Subscription Plan</h3>
              <p className="au-s4-subtitle">Choose a subscription plan for this user. Subscription gives access to premium content, market data, trader contacts and more.</p>
            </div>
          </div>
          <div className="au-billing-toggle-wrap">
            <div className="au-billing-toggle">
              <button type="button" className={`au-bt-btn ${billingCycle === 'monthly' ? 'active' : ''}`} onClick={() => handleBillingToggle('monthly')}>Monthly</button>
              <button type="button" className={`au-bt-btn ${billingCycle === 'yearly' ? 'active' : ''}`} onClick={() => handleBillingToggle('yearly')}>Yearly</button>
            </div>
            <span className="au-save-badge">Save 20%</span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="au-plans-grid">
          {plans.map(plan => {
            const isSelected = currentPlan === plan.id;
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            const priceStr = price === 0 ? '₹0' : '₹' + price.toLocaleString('en-IN');
            
            return (
              <div key={plan.id} className={`au-plan-card ${isSelected ? 'selected' : ''} ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <div className="au-plan-popular-badge">Most Popular</div>}
                
                <div className="au-plan-card-header">
                  <div className="au-plan-badge-icon" style={{color: plan.iconColor}}>{plan.badgeIcon}</div>
                  <h4 className="au-plan-name" style={{color: isSelected && plan.isPopular ? '#065f46' : (isSelected ? '#1e40af' : '#111827')}}>{plan.name}</h4>
                  <p className="au-plan-desc">{plan.subtitle}</p>
                </div>
                
                <div className="au-plan-price-wrap">
                  <span className="au-plan-price">{priceStr}</span>
                  <span className="au-plan-period">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>

                <ul className="au-plan-features-list">
                  {plan.features.map((feat, i) => (
                    <li key={'f-'+i} className="au-pf-item">
                      <svg className="au-pf-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {feat}
                    </li>
                  ))}
                  {plan.disabledFeatures.map((feat, i) => (
                    <li key={'df-'+i} className="au-pf-item disabled">
                      <svg className="au-pf-cross" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  type="button"
                  className={`au-plan-select-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handlePlanChange(plan.id)}
                >
                  {isSelected ? (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Selected</>
                  ) : (
                    currentPlan === 'free' && plan.id !== 'free' ? 'Select Plan' : (plan.id === 'free' ? 'Current Plan' : 'Select Plan')
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="au-step4-comparison">
          <div className="au-comp-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <h4>Plan Feature Comparison</h4>
          </div>
          
          <table className="au-comp-table">
            <thead>
              <tr>
                <th className="au-th-feat">Features</th>
                <th className="au-th-plan" style={{color:'#3b82f6'}}>Free</th>
                <th className="au-th-plan" style={{color:'#2563eb'}}>Basic</th>
                <th className="au-th-plan" style={{color:'#059669'}}>Pro</th>
                <th className="au-th-plan" style={{color:'#d97706'}}>Business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> View Commodity Prices</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> Mandi Rates</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="4"></line><line x1="8" y1="2" x2="8" y2="4"></line></svg> Market News & Updates</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg> Post Buy/Sell Requirements</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><span className="text-limited">Limited</span></td>
                <td><span className="text-unlimited">Unlimited</span></td>
                <td><span className="text-unlimited">Unlimited</span></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Trader Contact Details</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><span className="text-limited">Limited</span></td>
                <td><span className="text-unlimited">Unlimited</span></td>
                <td><span className="text-unlimited">Unlimited</span></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Export/Import Information</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Advertisement Credits</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
              <tr>
                <td><div className="td-feat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Priority Support</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="dash-icon">-</div></td>
                <td><div className="check-icon">✓</div></td>
                <td><div className="check-icon">✓</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="au-step4-sidebar">
        
        {/* Plan Details Box */}
        <div className="au-s4-sidebar-card">
          <div className="au-sb-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <div>
              <h4>Plan Details</h4>
              <p>Review selected plan information.</p>
            </div>
          </div>
          
          <div className="au-sb-active-plan">
            <div className="au-ap-icon" style={{background: activePlan.iconColor}}>
              {activePlan.badgeIcon}
            </div>
            <div className="au-ap-info">
              <div className="au-ap-name">{activePlan.name}</div>
              <div className="au-ap-price">
                ₹{billingCycle === 'yearly' ? activePlan.priceYearly.toLocaleString('en-IN') : activePlan.priceMonthly.toLocaleString('en-IN')} 
                <span className="period"> / {billingCycle === 'yearly' ? 'year' : 'month'}</span>
              </div>
            </div>
          </div>

          <div className="au-ap-meta">
            <div className="au-meta-row">
              <span className="au-meta-label">Duration</span>
              <span className="au-meta-val" style={{color: '#3b82f6'}}>{billingCycle === 'yearly' ? '12 Months' : '1 Month'}</span>
            </div>
            <div className="au-meta-row">
              <span className="au-meta-label">Validity</span>
              <span className="au-meta-val">{formatDate(today)} - {formatDate(nextYear)}</span>
            </div>
            <div className="au-meta-row" style={{borderBottom: 'none'}}>
              <span className="au-meta-label">Auto Renewal</span>
              <span className="au-meta-val" style={{display:'flex', alignItems:'center', gap:'8px'}}>
                Enabled
                <label className="au-toggle" style={{transform: 'scale(0.8)', margin:0}}>
                  <input type="checkbox" defaultChecked />
                  <span className="au-toggle-slider"></span>
                </label>
              </span>
            </div>
          </div>
        </div>

        {/* Key Benefits Box */}
        <div className="au-s4-sidebar-card">
          <div className="au-sb-header" style={{borderBottom: 'none', paddingBottom: '0'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <div>
              <h4 style={{marginTop:'2px'}}>Key Benefits</h4>
            </div>
          </div>
          
          <ul className="au-sb-benefits-list">
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Access to live commodity prices & mandi rates</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Post unlimited buy/sell requirements</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlock trader contact details</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Export/Import & government information</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Advanced market analytics</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority customer support</li>
            <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Access from web and mobile</li>
          </ul>
        </div>

        {/* Need Help Box */}
        <div className="au-s4-sidebar-card au-need-help">
          <div className="au-sb-header" style={{borderBottom: 'none'}}>
            <div className="au-help-icon">?</div>
            <h4 style={{color: '#1e40af'}}>Need Help?</h4>
          </div>
          <p>You can change or upgrade the plan later from user profile.</p>
          <button className="au-compare-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> 
            Compare All Plans <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}
