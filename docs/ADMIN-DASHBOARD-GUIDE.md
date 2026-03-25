# Admin Dashboard - Complete Guide
**Last Updated:** March 21, 2026
**Version:** 1.0
**Access URL:** `/admin/dashboard`

---

## 🎯 Overview

The MSMEVault.in Admin Dashboard is a comprehensive management system for controlling all aspects of the platform. It provides full CRUD (Create, Read, Update, Delete) operations for:

- ✅ **Loans** (22+ MSME loan providers)
- ✅ **Schemes** (62+ government schemes)
- ✅ **Consultants** (CA/business consultant directory)
- ✅ **Leads** (User enquiries and submissions)
- ✅ **Blog** (Content management)
- ✅ **Settings** (Platform configuration)

---

## 🔐 Access & Authentication

### Login Credentials
- **URL:** `http://localhost:3001/admin/login`
- **Default Credentials:** (Configure in environment)

### Authentication Flow
1. Visit `/admin/login`
2. Enter credentials
3. Token stored in `localStorage` as `admin_token`
4. Redirects to `/admin/dashboard`
5. All admin pages protected by auth check

### Logout
- Click "Logout" button in header
- Token removed from localStorage
- Redirects to `/admin/login`

---

## 📊 Dashboard Overview

### Main Features
1. **Statistics Cards** - Real-time metrics
2. **Recent Activity** - Latest leads and enquiries
3. **Quick Actions** - Fast access to all sections
4. **Alerts** - Expiring listings notifications

### Statistics Displayed
| Metric | Description | Updates |
|--------|-------------|---------|
| **Total Leads** | All user submissions | Real-time |
| **Total Schemes** | Government schemes count | Real-time |
| **Premium Listings** | Paid consultant listings | Real-time |
| **Subscribers** | Newsletter subscribers | Real-time |

---

## 💰 Loans Management (`/admin/loans`)

### Features
✅ View all 22+ MSME loan providers
✅ Search by provider name, loan name, or type
✅ Add new loan providers
✅ Edit existing loans
✅ Delete loans
✅ Mark loans as Sponsored/Featured

### Loan Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Provider Name** | Text | ✅ | Lender name (e.g., HDFC Bank) |
| **Slug** | Text | ✅ | URL-friendly identifier (auto-formatted) |
| **Loan Product Name** | Text | ✅ | Full product name |
| **Type** | Select | ✅ | business/mudra/collateral-free/govt |
| **Min Amount** | Number | ✅ | Minimum loan amount (₹) |
| **Max Amount** | Number | ✅ | Maximum loan amount (₹) |
| **Min Interest Rate** | Number | ✅ | Minimum interest rate (%) |
| **Max Interest Rate** | Number | ✅ | Maximum interest rate (%) |
| **Tenure** | Text | ✅ | Loan tenure (e.g., "12-60 months") |
| **Eligibility** | Textarea | ❌ | Eligibility criteria |
| **Documents** | Textarea | ❌ | Required docs (one per line) |
| **Features** | Textarea | ❌ | Key features (one per line) |
| **Affiliate URL** | URL | ❌ | Apply/affiliate link |
| **Is Sponsored** | Checkbox | ❌ | Mark as featured |

### How to Add a Loan

1. **Click "Add Loan"** button
2. **Fill Required Fields:**
   - Provider Name: `ICICI Bank`
   - Slug: `icici-bank-msme-loan` (auto-formatted)
   - Loan Product Name: `ICICI Bank MSME Loan`
   - Type: Select `business`
   - Min Amount: `500000` (₹5 lakh)
   - Max Amount: `30000000` (₹3 crore)
   - Min Interest Rate: `9`
   - Max Interest Rate: `17`
   - Tenure: `12-84 months`

3. **Add Optional Details:**
   - Eligibility: `Age 28-65 years, Business 3+ years...`
   - Documents (one per line):
     ```
     PAN Card
     Aadhar Card
     Business Registration
     GST Returns
     Bank Statements (last 12 months)
     ```
   - Features (one per line):
     ```
     Collateral-free loans up to ₹5 crore
     Quick approval process
     Flexible repayment options
     ```
   - Affiliate URL: `https://www.icicibank.com/sme/loans`

4. **Mark as Sponsored** (if paid placement)
5. **Click "Save Loan"**

### How to Edit a Loan

1. Find loan in table
2. Click **Edit** icon (pencil)
3. Modal opens with current data
4. Modify fields as needed
5. Click **Save Loan**

### How to Delete a Loan

1. Find loan in table
2. Click **Delete** icon (trash)
3. Confirm deletion
4. Loan removed permanently

### Search & Filter

- **Search:** Type provider name, loan name, or type
- **Results Update:** Instantly as you type
- **Clear Search:** Delete search text

---

## 📋 Schemes Management (`/admin/schemes`)

### Features
✅ View all 62+ government schemes
✅ Add new schemes
✅ Edit existing schemes
✅ Mark schemes as active/inactive
✅ Feature schemes on homepage

### Scheme Fields
- Name, Slug, Description
- Type (Central/State)
- State (if state scheme)
- Sector (Manufacturing, Services, Trading, etc.)
- Min/Max Amount
- Eligibility criteria
- Required documents
- Benefits
- Apply URL
- Active status
- Featured status

### Managing Schemes
Same CRUD operations as Loans (Add, Edit, Delete)

---

## 👥 Consultants Management (`/admin/consultants`)

### Features
✅ View all consultants
✅ Add new consultants
✅ Edit consultant profiles
✅ Manage pricing tiers
✅ Track expiring listings

### Consultant Fields
- Name, Firm Name
- Designation
- City, State
- Services offered
- Contact details
- Experience
- Rating
- Tier (Free/Standard/Premium/Featured)
- Payment status
- Verification status

---

## 📝 Leads Management (`/admin/leads`)

### Features
✅ View all user submissions
✅ Export leads to CSV
✅ Update lead status
✅ View lead details
✅ Track source pages

### Lead Statuses
- **New** - Just submitted
- **Contacted** - Reached out to user
- **Qualified** - Genuine lead
- **Converted** - Became customer
- **Rejected** - Not qualified

### Lead Information
- Name, Phone, Email
- City, Requirement
- Source Page
- Submission Date
- Status

---

## 📰 Blog Management (`/admin/blog`)

### Features
✅ Create blog posts
✅ Edit existing posts
✅ Delete posts
✅ SEO optimization
✅ Publish/draft status

### Blog Post Fields
- Title, Slug
- Content (rich text)
- Excerpt
- Featured image
- Author
- Categories/Tags
- SEO meta title/description
- Published status
- Published date

---

## ⚙️ Settings (`/admin/settings`)

### Features
✅ Site configuration
✅ Contact information
✅ Social media links
✅ SEO defaults
✅ Email settings

---

## 🔧 API Endpoints Reference

### Loans API

#### GET `/api/admin/loans`
**Purpose:** Fetch all loans
**Response:**
```json
[
  {
    "id": "clxyz123",
    "slug": "hdfc-bank-msme-loan",
    "provider": "HDFC Bank",
    "minAmount": 500000,
    "maxAmount": 5000000,
    "interestRateMin": 10.75,
    "interestRateMax": 22.5,
    ...
  }
]
```

#### POST `/api/admin/loans`
**Purpose:** Create new loan
**Body:**
```json
{
  "slug": "new-bank-loan",
  "name": "New Bank MSME Loan",
  "provider": "New Bank",
  "type": "business",
  "minAmount": 100000,
  "maxAmount": 10000000,
  "interestRateMin": 12,
  "interestRateMax": 18,
  "tenure": "12-60 months",
  "documents": ["PAN", "Aadhar"],
  "features": ["Collateral-free"],
  "isSponsored": false
}
```

#### PUT `/api/admin/loans/[id]`
**Purpose:** Update existing loan
**Body:** Same as POST (all fields optional)

#### DELETE `/api/admin/loans/[id]`
**Purpose:** Delete loan
**Response:**
```json
{
  "success": true,
  "message": "Loan deleted successfully"
}
```

---

## 💡 Best Practices

### Data Management
1. **Always Verify Before Deleting** - Deletions are permanent
2. **Use Slugs Consistently** - lowercase-with-hyphens
3. **Keep Interest Rates Updated** - Review monthly
4. **Verify Affiliate Links** - Test before saving
5. **Use Sponsored Wisely** - Only for paid placements

### Content Guidelines
1. **Eligibility:** Be specific and clear
2. **Documents:** One per line, concise
3. **Features:** Highlight key benefits
4. **Affiliate URLs:** Always use HTTPS
5. **Descriptions:** Keep under 200 words

### Performance
1. **Bulk Operations:** Avoid deleting multiple items rapidly
2. **Search:** Use search to find items quickly
3. **Refresh Data:** Dashboard auto-refreshes every 60 seconds
4. **API Calls:** Be mindful of rate limits

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "Module not found" error
**Solution:**
- Files may still be compiling
- Wait 5-10 seconds
- Refresh page

#### 2. Can't save loan
**Possible causes:**
- Missing required fields (provider, slug, name)
- Duplicate slug
- Invalid data types

**Solution:**
- Check all required fields are filled
- Ensure slug is unique
- Verify numbers are entered correctly

#### 3. Slugalready exists
**Solution:**
- Change the slug to something unique
- Use format: `provider-name-loan-type`
- Example: `hdfc-business-loan-2`

#### 4. Search not working
**Solution:**
- Clear search field
- Refresh page
- Check console for errors

#### 5. Can't access admin
**Solution:**
- Check if logged in
- Verify token in localStorage
- Re-login if needed

---

## 📱 Mobile Usage

The admin panel is **fully responsive** and works on:
- ✅ Desktop (recommended)
- ✅ Tablet
- ✅ Mobile (limited features)

**Best Experience:** Desktop with 1200px+ width

---

## 🎯 Quick Start Checklist

### First Time Setup
- [ ] Login to `/admin/login`
- [ ] View dashboard overview
- [ ] Click on "Loans" quick action
- [ ] Browse existing loans
- [ ] Try searching for "HDFC"
- [ ] Click "Add Loan" to see form
- [ ] Fill sample data (don't save)
- [ ] Click "Cancel" to close
- [ ] Try editing an existing loan
- [ ] Familiarize with all fields
- [ ] Logout and re-login to test auth

### Daily Tasks
- [ ] Check dashboard for new leads
- [ ] Review expiring listings alert
- [ ] Respond to new consultant enquiries
- [ ] Update loan rates if needed
- [ ] Monitor site statistics

### Weekly Tasks
- [ ] Review all loan data for accuracy
- [ ] Update scheme information
- [ ] Export and follow up with leads
- [ ] Check for duplicate entries
- [ ] Verify affiliate URLs still work

### Monthly Tasks
- [ ] Full audit of all loans (verify rates)
- [ ] Review and update scheme eligibility
- [ ] Renew expiring consultant listings
- [ ] Analyze conversion rates
- [ ] Update blog content

---

## 🔐 Security Notes

### Important
- ⚠️ Never share admin credentials
- ⚠️ Always logout on shared computers
- ⚠️ Use HTTPS in production
- ⚠️ Keep backup of database
- ⚠️ Regular security audits

### Token Management
- Tokens stored in localStorage
- Auto-logout if token expires
- Re-login required after 7 days
- Secure token generation on server

---

## 📊 Analytics & Metrics

### Available Metrics
1. **Total Leads** - Lifetime submissions
2. **New Leads Today** - Last 24 hours
3. **Total Schemes** - All schemes count
4. **Active Schemes** - Currently active
5. **Premium Listings** - Paid consultants
6. **Expiring Listings** - Expiring within 7 days
7. **Total Subscribers** - Newsletter sign-ups
8. **Conversion Rate** - Lead to customer %

### Tracking
- Real-time updates every 60 seconds
- Manual refresh available
- Historical data (coming soon)

---

## 🎓 Video Tutorials (Coming Soon)

1. Getting Started with Admin Panel
2. How to Add a New Loan Provider
3. Managing Government Schemes
4. Handling User Leads Effectively
5. Consultant Listing Management

---

## 📞 Support

### Need Help?
- **Documentation:** This file
- **Technical Issues:** Check browser console
- **Data Questions:** Refer to audit reports
- **Feature Requests:** Submit via GitHub

### Contact
- Email: admin@msmevault.in
- Emergency: +91 98765 43210

---

## ✅ Admin Panel Status

**Status:** ✅ **FULLY FUNCTIONAL**

### What's Working
- ✅ Authentication system
- ✅ Dashboard with live stats
- ✅ Loans CRUD (Complete)
- ✅ Schemes CRUD (Existing)
- ✅ Consultants CRUD (Existing)
- ✅ Leads viewer (Existing)
- ✅ Blog management (Existing)
- ✅ Settings management (Existing)

### Capabilities
- **Total Control:** Full CRUD for all entities
- **Search:** Instant filtering across all pages
- **Real-time:** Live data updates
- **Responsive:** Works on all devices
- **Secure:** Token-based authentication

---

**Admin Dashboard Guide v1.0**
**Last Updated:** March 21, 2026
**Platform:** MSMEVault.in
**Status:** Production Ready

---

*This guide covers all aspects of the admin dashboard. For user-facing features, see the main documentation.*
