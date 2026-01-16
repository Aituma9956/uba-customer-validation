import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, Button } from '../components/SharedComponents';
import { UBA_RED, UBA_GRAY } from '../utils/constants';
import { Shield, Download, Filter, Search, Clock, User, MapPin, FileText } from 'lucide-react';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  // Comprehensive audit trail data
  const auditTrail = [
    {
      id: 'AUD-2026-0156',
      timestamp: new Date('2026-01-15T14:23:15'),
      action: 'Request Approved',
      user: 'Agent Jane Smith',
      userId: 'AGT-001',
      requestId: 'REQ-2026-004',
      customer: 'Blessing Eze',
      ipAddress: '10.21.45.123',
      location: 'Lagos, Nigeria',
      device: 'Windows 10 - Chrome 120',
      changes: {
        from: 'Under Review',
        to: 'Approved',
      },
      compliance: ['NDPR', 'Internal Policy'],
      reason: 'All verification checks passed',
    },
    {
      id: 'AUD-2026-0155',
      timestamp: new Date('2026-01-15T14:15:42'),
      action: 'Request Rejected',
      user: 'Agent Mary Johnson',
      userId: 'AGT-003',
      requestId: 'REQ-2026-005',
      customer: 'Oluwaseun Adeyemi',
      ipAddress: '10.21.45.128',
      location: 'Abuja, Nigeria',
      device: 'Windows 11 - Edge 120',
      changes: {
        from: 'Under Review',
        to: 'Rejected',
      },
      compliance: ['NDPR', 'KYC Policy'],
      reason: 'Biometric verification failed - face mismatch detected',
    },
    {
      id: 'AUD-2026-0154',
      timestamp: new Date('2026-01-15T14:00:28'),
      action: 'Request Assigned',
      user: 'System Automated',
      userId: 'SYS-AUTO',
      requestId: 'REQ-2026-002',
      customer: 'Chioma Okafor',
      ipAddress: '10.21.1.1',
      location: 'System',
      device: 'Automation Service',
      changes: {
        from: 'Pending',
        to: 'Under Review',
      },
      compliance: ['Internal Policy'],
      reason: 'Auto-assigned based on agent availability',
    },
    {
      id: 'AUD-2026-0153',
      timestamp: new Date('2026-01-15T13:45:17'),
      action: 'Document Uploaded',
      user: 'Customer Portal',
      userId: 'CUST-789',
      requestId: 'REQ-2026-003',
      customer: 'Ibrahim Musa',
      ipAddress: '102.89.2.145',
      location: 'Port Harcourt, Nigeria',
      device: 'Android - Chrome Mobile',
      changes: {
        documents: ['NIN Card', 'Utility Bill', 'Proof of Address'],
      },
      compliance: ['NDPR', 'GDPR', 'Data Protection'],
      reason: 'Customer uploaded required documents',
    },
    {
      id: 'AUD-2026-0152',
      timestamp: new Date('2026-01-15T13:30:52'),
      action: 'Biometric Verification',
      user: 'Biometric System',
      userId: 'SYS-BIO',
      requestId: 'REQ-2026-001',
      customer: 'Adewale Johnson',
      ipAddress: '10.21.5.10',
      location: 'System',
      device: 'Biometric Service',
      changes: {
        biometricScore: '98.5%',
        status: 'Passed',
      },
      compliance: ['NDPR', 'Biometric Policy'],
      reason: 'Facial recognition completed successfully',
    },
    {
      id: 'AUD-2026-0151',
      timestamp: new Date('2026-01-15T13:15:33'),
      action: 'Request Submitted',
      user: 'Customer Portal',
      userId: 'CUST-456',
      requestId: 'REQ-2026-001',
      customer: 'Adewale Johnson',
      ipAddress: '102.89.10.78',
      location: 'Lagos, Nigeria',
      device: 'Windows 10 - Chrome 120',
      changes: {
        requestType: 'Account Reactivation',
        status: 'Pending',
      },
      compliance: ['NDPR', 'KYC Policy'],
      reason: 'New validation request initiated by customer',
    },
    {
      id: 'AUD-2026-0150',
      timestamp: new Date('2026-01-15T12:45:19'),
      action: 'Report Generated',
      user: 'Manager Admin User',
      userId: 'MGR-001',
      requestId: 'N/A',
      customer: 'N/A',
      ipAddress: '10.21.45.100',
      location: 'Lagos, Nigeria',
      device: 'Windows 11 - Chrome 120',
      changes: {
        reportType: 'Monthly Performance Report',
        period: 'December 2025',
      },
      compliance: ['Internal Policy', 'Audit'],
      reason: 'Monthly compliance report generated',
    },
    {
      id: 'AUD-2026-0149',
      timestamp: new Date('2026-01-15T12:30:45'),
      action: 'Access Granted',
      user: 'Agent John Doe',
      userId: 'AGT-002',
      requestId: 'N/A',
      customer: 'N/A',
      ipAddress: '10.21.45.125',
      location: 'Lagos, Nigeria',
      device: 'Windows 10 - Chrome 120',
      changes: {
        action: 'Login',
        status: 'Success',
      },
      compliance: ['Access Control Policy'],
      reason: 'Agent logged into system',
    },
  ];

  const filteredAudit = auditTrail
    .filter((entry) => {
      if (filterAction !== 'all' && !entry.action.toLowerCase().includes(filterAction.toLowerCase()))
        return false;
      if (filterUser !== 'all' && !entry.user.toLowerCase().includes(filterUser.toLowerCase()))
        return false;
      if (searchTerm && !JSON.stringify(entry).toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      return true;
    });

  const handleExportAudit = () => {
    alert('Exporting audit trail to CSV format...\n\nAudit report will be downloaded with:\n- All entries with timestamps\n- User attribution\n- IP addresses and locations\n- Compliance tags\n- Complete change history');
  };

  const handleExportCompliance = () => {
    alert('Generating compliance report...\n\nReport includes:\n- NDPR compliance summary\n- GDPR data processing log\n- PCI-DSS security measures\n- UBA policy adherence\n- Risk assessment summary');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar userType="manager" />
      <div style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Shield size={32} color={UBA_RED} />
            <h1 style={{ color: '#333', margin: 0 }}>Audit Trail & Compliance</h1>
          </div>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Immutable audit log - Every action is tracked, timestamped, and compliance-ready
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Audit Entries</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>2,547</div>
              </div>
              <FileText size={40} color={UBA_RED} />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Today's Actions</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>156</div>
              </div>
              <Clock size={40} color="#2196f3" />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Active Users</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>24</div>
              </div>
              <User size={40} color="#4caf50" />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Compliance Score</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>98.5%</div>
              </div>
              <Shield size={40} color="#4caf50" />
            </div>
          </Card>
        </div>

        {/* Compliance Standards */}
        <Card style={{ marginBottom: '30px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: UBA_RED }}>
            Compliance & Regulatory Standards
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { name: 'NDPR', status: 'Compliant', color: '#4caf50' },
              { name: 'GDPR', status: 'Compliant', color: '#4caf50' },
              { name: 'PCI-DSS', status: 'Compliant', color: '#4caf50' },
              { name: 'UBA Policy', status: 'Compliant', color: '#4caf50' },
            ].map((standard) => (
              <div
                key={standard.name}
                style={{
                  padding: '20px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `2px solid ${standard.color}`,
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {standard.name}
                </div>
                <div style={{ fontSize: '14px', color: standard.color, fontWeight: '600' }}>
                  ✓ {standard.status}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters and Search */}
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
              <Search size={20} color="#666" />
              <input
                type="text"
                placeholder="Search audit trail (user, action, request ID, customer)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Filter size={20} color="#666" />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Actions</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="submitted">Submitted</option>
                <option value="uploaded">Uploaded</option>
              </select>

              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="all">All Users</option>
                <option value="agent">Agents</option>
                <option value="customer">Customers</option>
                <option value="system">System</option>
              </select>

              <Button onClick={handleExportAudit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={18} />
                  Export Audit
                </div>
              </Button>

              <Button variant="secondary" onClick={handleExportCompliance}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} />
                  Compliance Report
                </div>
              </Button>
            </div>
          </div>
        </Card>

        {/* Audit Trail Table */}
        <Card title={`Audit Trail (${filteredAudit.length} entries)`}>
          <div style={{ overflowX: 'auto' }}>
            {filteredAudit.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: '20px',
                  marginBottom: '16px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '8px',
                  borderLeft: `4px solid ${UBA_RED}`,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                  {/* Column 1: Action & User */}
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: UBA_RED, marginBottom: '8px' }}>
                      {entry.action}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                      Audit ID: {entry.id}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <User size={16} color="#666" />
                      <span style={{ fontSize: '14px' }}>
                        <strong>{entry.user}</strong> ({entry.userId})
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="#666" />
                      <span style={{ fontSize: '14px' }}>{entry.timestamp.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Column 2: Request & Customer */}
                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>Request:</strong> {entry.requestId}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>Customer:</strong> {entry.customer}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>Device:</strong> {entry.device}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} color="#666" />
                      <span style={{ fontSize: '14px' }}>{entry.location}</span>
                    </div>
                  </div>

                  {/* Column 3: Compliance & IP */}
                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>IP Address:</strong> {entry.ipAddress}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>Compliance:</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {entry.compliance.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            borderRadius: '4px',
                            fontSize: '12px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Changes Section */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                    <strong>Changes Made:</strong>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', fontFamily: 'monospace' }}>
                    {JSON.stringify(entry.changes, null, 2)}
                  </div>
                </div>

                {/* Reason */}
                <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                  <strong>Reason:</strong> {entry.reason}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Info */}
        <Card style={{ marginTop: '30px' }}>
          <div
            style={{
              backgroundColor: '#e3f2fd',
              border: '1px solid #2196f3',
              padding: '20px',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
              <Shield size={32} color="#2196f3" />
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1565c0' }}>
                  Audit Trail Guarantee
                </div>
                <div style={{ fontSize: '14px', color: '#1565c0', lineHeight: '1.6' }}>
                  <strong>Every action is logged and immutable:</strong>
                  <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                    <li>✓ Who performed the action (user ID and name)</li>
                    <li>✓ When it was performed (timestamp with millisecond precision)</li>
                    <li>✓ From where (IP address, location, device)</li>
                    <li>✓ What changed (complete before/after state)</li>
                    <li>✓ Why (reason and business justification)</li>
                    <li>✓ Compliance tags (NDPR, GDPR, PCI-DSS, UBA policies)</li>
                    <li>✓ No gaps, no disputes, no regulatory exposure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuditLog;
