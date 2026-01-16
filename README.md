# UBA Customer Validation Portal

A comprehensive digital validation platform for United Bank for Africa (UBA) that streamlines customer validation processes through automated biometric verification, document management, and workflow automation.

## 🎯 Project Overview

This demo application showcases a complete end-to-end customer validation solution featuring:

### 1. **Customer-Facing Digital Validation Portal**
- Self-service validation portal embedded in UBA's digital channels
- BVN/Account Number verification with OTP authentication
- Multiple validation request types support
- Live face capture with liveness detection
- Secure document upload and management
- Real-time request tracking

### 2. **Automated Biometric & Identity Verification**
- Real-time liveness detection
- Facial recognition against BVN records
- Government identity system integration (NIN, Passport, Driver's License, Voter's Card)
- Automatic mismatch detection and flagging

### 3. **Secure Document Collection & Management**
- End-to-end digital document submission
- Dynamic document requirements based on request type
- Format validation and completeness checks
- Encrypted storage with audit trails

### 4. **Internal CFC Agent Workbench**
- Dedicated dashboard for Customer Fulfillment Center agents
- Live queue management with SLA tracking
- Comprehensive request review interface
- Approve/Reject/Escalate actions with audit logging
- Maker-checker workflow support

### 5. **Workflow Automation & SLA Control**
- Automated request routing and assignment
- Configurable approval workflows
- SLA timers and deadline tracking
- Automated notifications to customers and agents

### 6. **Audit, Compliance & Risk Control**
- Immutable audit trails for all actions
- NDPR, GDPR, and PCI-DSS compliance support
- Complete activity logging with user attribution
- Audit-ready reporting capabilities

### 7. **Reporting, Dashboards & Operational Visibility**
- Real-time operational dashboards
- Performance metrics and KPIs
- Volume trends and approval rates
- Agent productivity analytics
- Exportable management reports

## 🚀 Features

- ✅ **Multi-step validation workflow** with progress tracking
- ✅ **Biometric verification** with facial recognition scoring
- ✅ **Document upload** with format validation
- ✅ **Real-time status tracking** for customers
- ✅ **Agent workbench** with request queue management
- ✅ **Analytics dashboard** with charts and metrics
- ✅ **SLA monitoring** with deadline alerts
- ✅ **Responsive design** optimized for all devices
- ✅ **UBA brand colors** (#d9140b) throughout the application

## 🎨 Design

The application uses UBA's official brand color:
- **Primary Red**: `#d9140b`
- **Background**: White and light gray
- **UI Elements**: Icons and accents in UBA red

## 📁 Project Structure

```
uba-customer-validation/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Navigation component
│   │   └── SharedComponents.js    # Reusable UI components
│   ├── pages/
│   │   ├── Home.js                # Landing page
│   │   ├── CustomerPortal.js      # Customer validation portal
│   │   ├── AgentWorkbench.js      # Agent dashboard
│   │   ├── Dashboard.js           # Analytics dashboard
│   │   └── TrackRequest.js        # Request tracking page
│   ├── utils/
│   │   ├── constants.js           # App constants and configs
│   │   └── mockData.js            # Demo data
│   ├── App.js                     # Main app component
│   └── index.js                   # Entry point
├── public/
└── package.json
```

## 🛠️ Technologies Used

- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Recharts** - Data visualization and charts
- **Lucide React** - Icon library
- **CSS-in-JS** - Inline styling with UBA branding

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uba-customer-validation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Key Pages

### Home Page (`/`)
- Landing page with feature showcase
- Quick access to all portals
- Statistics and benefits overview

### Customer Portal (`/portal`)
- 5-step validation workflow
- Identity verification (BVN/Account)
- OTP verification
- Document upload
- Biometric face capture
- Review and submission

### Track Request (`/track-request`)
- Request status tracking
- Timeline visualization
- Help and support information

### Agent Workbench (`/agent`)
- Request queue with filters
- Detailed request review
- Approve/Reject/Escalate actions
- Biometric score visualization
- Document verification

### Analytics Dashboard (`/dashboard`)
- Real-time metrics and KPIs
- Request volume trends
- Status distribution
- SLA compliance tracking
- Agent productivity metrics
- Recent activity log

## 📊 Demo Data

The application includes comprehensive mock data for demonstration:
- Sample validation requests
- Analytics metrics
- Request history
- Agent activities

## 🔐 Security Features

- OTP-based authentication
- Biometric verification (98.5% accuracy in demo)
- Encrypted document storage
- Audit trails for all actions
- Role-based access control
- Compliance with NDPR, GDPR, PCI-DSS

## 🎯 Request Types Supported

1. Account Reactivation
2. Address Update
3. Mandate Update
4. KYC Update
5. Account Upgrade
6. Signature Update

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🚦 Request Status Flow

1. **Pending** - New request submitted
2. **Under Review** - Assigned to agent
3. **Approved** - Validated and approved
4. **Rejected** - Failed validation
5. **Escalated** - Requires management review

## 📈 Performance Metrics

Demo metrics included:
- **Total Requests**: 1,247
- **Average Turnaround**: 18.5 hours
- **SLA Compliance**: 94.2%
- **Biometric Success Rate**: 96.8%
- **Active Agents**: 12

## 🤝 Contributing

This is a demo application for UBA. For production deployment, please contact the development team.

## 📄 License

© 2026 United Bank for Africa. All rights reserved.

## 🆘 Support

For questions or support:
- **CFC Hotline**: 0700-CALL-UBA (0700-2255-822)
- **Email**: cfc@ubagroup.com
- **Website**: www.ubagroup.com

---

**Built for United Bank for Africa** 🏦
*Streamlining customer validation with digital innovation*

