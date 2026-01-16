import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../components/SharedComponents';
import { UBA_RED, UBA_WHITE, UBA_GRAY, REQUEST_STATUS } from '../utils/constants';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  FileText,
  Eye,
  Shield,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

const SupervisorView = () => {
  // Mock escalated requests data
  const [escalatedRequests, setEscalatedRequests] = useState([
    {
      id: 'REQ-2026-005',
      customerName: 'Michael Johnson',
      requestType: 'Account Reactivation',
      escalatedBy: 'Sarah Williams (Agent)',
      escalatedAt: '2026-01-15 09:30:00',
      escalationReason: 'Biometric score borderline - 82% match',
      originalStatus: 'Under Review',
      biometricScore: 82,
      slaStatus: 'warning', // overdue, warning, good
      timeRemaining: '4 hours',
      priority: 'high',
      documents: ['National ID', 'Utility Bill', 'Bank Statement'],
      agentNotes: 'Customer provided all required documents. Biometric match is 82% which is just below our 85% threshold. Face appears slightly different due to weight loss. Recommend supervisor review.',
      customerPhone: '+234 803 456 7890',
      accountNumber: '0012345678'
    },
    {
      id: 'REQ-2026-008',
      customerName: 'Blessing Okafor',
      requestType: 'BVN Update',
      escalatedBy: 'John Smith (Agent)',
      escalatedAt: '2026-01-15 11:15:00',
      escalationReason: 'High-risk transaction - Large account value',
      originalStatus: 'Pending Approval',
      biometricScore: 96,
      slaStatus: 'good',
      timeRemaining: '18 hours',
      priority: 'critical',
      documents: ['BVN Card', 'International Passport', 'CAC Document'],
      agentNotes: 'High-value corporate account. Customer requesting BVN update for new business registration. All documents verified. Biometric match excellent at 96%. Escalated per policy for accounts over ₦50M.',
      customerPhone: '+234 805 123 4567',
      accountNumber: '0098765432'
    },
    {
      id: 'REQ-2026-012',
      customerName: 'Ibrahim Yusuf',
      requestType: 'Mandate Updates',
      escalatedBy: 'David Chen (Agent)',
      escalatedAt: '2026-01-15 13:45:00',
      escalationReason: 'Conflicting information - Signature mismatch',
      originalStatus: 'Under Review',
      biometricScore: 91,
      slaStatus: 'overdue',
      timeRemaining: 'Overdue by 2 hours',
      priority: 'urgent',
      documents: ['Signature Card', 'Valid ID', 'Board Resolution'],
      agentNotes: 'Corporate account mandate update. Biometric is good at 91% but signature on new mandate card appears different from records. Customer claims signature evolved over 10 years. Requires supervisor verification.',
      customerPhone: '+234 807 890 1234',
      accountNumber: '0056789012'
    },
    {
      id: 'REQ-2026-017',
      customerName: 'Chinwe Adebayo',
      requestType: 'Card Reissuance',
      escalatedBy: 'Sarah Williams (Agent)',
      escalatedAt: '2026-01-15 14:20:00',
      escalationReason: 'Suspicious activity - Multiple failed attempts',
      originalStatus: 'Flagged',
      biometricScore: 76,
      slaStatus: 'warning',
      timeRemaining: '6 hours',
      priority: 'high',
      documents: ['National ID', 'Police Report'],
      agentNotes: 'Customer reported card stolen. However, there were 3 failed biometric attempts before this request. Current biometric match is only 76%. Possible fraud attempt. Recommend fraud team review.',
      customerPhone: '+234 809 234 5678',
      accountNumber: '0034567890'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideAction, setOverrideAction] = useState(''); // 'approve' or 'reject'
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideNotes, setOverrideNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Recent audit log entries (subset for supervisor view)
  const recentAuditLog = [
    {
      id: 'AUD-2026-089',
      timestamp: '2026-01-15 14:50:15',
      action: 'Override Approval',
      user: 'Patricia Okonkwo',
      role: 'Supervisor',
      requestId: 'REQ-2026-003',
      customer: 'Ada Nwosu',
      details: 'Supervisor approved escalated case despite borderline biometric score (83%)',
      ipAddress: '197.211.58.55',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'AUD-2026-088',
      timestamp: '2026-01-15 14:35:42',
      action: 'Override Rejection',
      user: 'Patricia Okonkwo',
      role: 'Supervisor',
      requestId: 'REQ-2026-007',
      customer: 'Emeka Obi',
      details: 'Supervisor rejected escalated case due to fraud indicators',
      ipAddress: '197.211.58.55',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'AUD-2026-087',
      timestamp: '2026-01-15 13:20:18',
      action: 'Case Review',
      user: 'Patricia Okonkwo',
      role: 'Supervisor',
      requestId: 'REQ-2026-012',
      customer: 'Ibrahim Yusuf',
      details: 'Supervisor accessed escalated case details for review',
      ipAddress: '197.211.58.55',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'AUD-2026-086',
      timestamp: '2026-01-15 12:45:33',
      action: 'Request Escalated',
      user: 'John Smith',
      role: 'CFC Agent',
      requestId: 'REQ-2026-008',
      customer: 'Blessing Okafor',
      details: 'Agent escalated high-value account request to supervisor',
      ipAddress: '197.211.58.41',
      location: 'Lagos, Nigeria'
    },
    {
      id: 'AUD-2026-085',
      timestamp: '2026-01-15 11:30:05',
      action: 'Override Approval',
      user: 'Patricia Okonkwo',
      role: 'Supervisor',
      requestId: 'REQ-2026-002',
      customer: 'Folake Ajayi',
      details: 'Supervisor approved case with additional documentation requirement',
      ipAddress: '197.211.58.55',
      location: 'Lagos, Nigeria'
    }
  ];

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleOverride = (request, action) => {
    setSelectedRequest(request);
    setOverrideAction(action);
    setShowOverrideModal(true);
    setOverrideReason('');
    setOverrideNotes('');
  };

  const confirmOverride = () => {
    // Update request status
    setEscalatedRequests(
      escalatedRequests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, originalStatus: overrideAction === 'approve' ? 'Approved' : 'Rejected' }
          : req
      )
    );

    // In production, this would send to backend and create audit log entry
    alert(
      `✅ Override ${overrideAction === 'approve' ? 'Approval' : 'Rejection'} confirmed!\n\n` +
      `Request: ${selectedRequest.id}\n` +
      `Customer: ${selectedRequest.customerName}\n` +
      `Reason: ${overrideReason}\n` +
      `Notes: ${overrideNotes}\n\n` +
      `This decision has been logged in the audit trail.`
    );

    setShowOverrideModal(false);
    setSelectedRequest(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#d32f2f';
      case 'urgent':
        return '#f57c00';
      case 'high':
        return '#ffa726';
      default:
        return '#666';
    }
  };

  const getSlaColor = (status) => {
    switch (status) {
      case 'overdue':
        return '#d32f2f';
      case 'warning':
        return '#ff9800';
      case 'good':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const getBiometricColor = (score) => {
    if (score >= 95) return '#4caf50';
    if (score >= 85) return '#8bc34a';
    if (score >= 75) return '#ff9800';
    return '#f44336';
  };

  const filteredRequests = escalatedRequests.filter((req) => {
    const matchesSearch =
      req.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.escalationReason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = filterPriority === 'all' || req.priority === filterPriority;

    return matchesSearch && matchesPriority;
  });

  const stats = {
    totalEscalated: escalatedRequests.length,
    critical: escalatedRequests.filter((r) => r.priority === 'critical').length,
    overdue: escalatedRequests.filter((r) => r.slaStatus === 'overdue').length,
    avgBiometric: (
      escalatedRequests.reduce((sum, r) => sum + r.biometricScore, 0) / escalatedRequests.length
    ).toFixed(1)
  };

  return (
    <div style={{ padding: '24px', backgroundColor: UBA_GRAY, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Shield size={32} color={UBA_RED} />
          <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>Supervisor Control Panel</h1>
        </div>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Review escalated cases, override decisions, and monitor audit activity
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#fff3e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={28} color="#ff9800" />
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>
                {stats.totalEscalated}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Total Escalated</div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#ffebee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={28} color="#d32f2f" />
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>
                {stats.critical}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Critical Priority</div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#fce4ec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={28} color="#c2185b" />
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>{stats.overdue}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Overdue SLA</div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={28} color="#4caf50" />
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#333' }}>
                {stats.avgBiometric}%
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg Biometric Score</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by customer name, request ID, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
            }}
          />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: UBA_WHITE,
            }}
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
          </select>
        </div>
      </Card>

      {/* Escalated Cases List */}
      <Card title="Escalated Cases Requiring Review">
        {filteredRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            <AlertTriangle size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
            <div>No escalated cases found</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  padding: '20px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '8px',
                  border: `2px solid ${getPriorityColor(request.priority)}`,
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{request.id}</h3>
                      <Badge color={getPriorityColor(request.priority)}>
                        {request.priority.toUpperCase()}
                      </Badge>
                      <Badge color={getSlaColor(request.slaStatus)}>
                        {request.timeRemaining}
                      </Badge>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#555', marginBottom: '4px' }}>
                      {request.customerName}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{request.requestType}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: getBiometricColor(request.biometricScore),
                      }}
                    >
                      {request.biometricScore}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Biometric Score</div>
                  </div>
                </div>

                {/* Escalation Info */}
                <div
                  style={{
                    backgroundColor: '#fff3e0',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    marginBottom: '16px',
                    borderLeft: '4px solid #ff9800',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <AlertTriangle size={18} color="#ff9800" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontWeight: '600', color: '#e65100', marginBottom: '4px' }}>
                        Escalation Reason:
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {request.escalationReason}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        Escalated by {request.escalatedBy} on {request.escalatedAt}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Notes */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#555', fontSize: '14px' }}>
                    Agent Notes:
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      padding: '12px',
                      backgroundColor: UBA_WHITE,
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    {request.agentNotes}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button onClick={() => handleViewDetails(request)}>
                    <Eye size={16} style={{ marginRight: '6px' }} />
                    View Full Details
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleOverride(request, 'approve')}
                    style={{ backgroundColor: '#4caf50' }}
                  >
                    <CheckCircle size={16} style={{ marginRight: '6px' }} />
                    Override & Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleOverride(request, 'reject')}
                    style={{ backgroundColor: '#f44336' }}
                  >
                    <XCircle size={16} style={{ marginRight: '6px' }} />
                    Override & Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Audit Activity */}
      <Card title="Recent Supervisor Activity - Audit Log" style={{ marginTop: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: UBA_GRAY }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  Timestamp
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  Action
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  User
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  Request
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  Details
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#555' }}>
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {recentAuditLog.map((entry, index) => (
                <tr
                  key={entry.id}
                  style={{
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: index % 2 === 0 ? UBA_WHITE : UBA_GRAY,
                  }}
                >
                  <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>
                    {entry.timestamp}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Badge
                      color={
                        entry.action.includes('Approval')
                          ? '#4caf50'
                          : entry.action.includes('Rejection')
                          ? '#f44336'
                          : '#2196f3'
                      }
                    >
                      {entry.action}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#333' }}>
                    <div style={{ fontWeight: '600' }}>{entry.user}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{entry.role}</div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px', color: UBA_RED, fontWeight: '600' }}>
                    {entry.requestId}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>{entry.details}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} />
                      {entry.location}
                    </div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                      {entry.ipAddress}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = '/audit')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FileText size={16} />
            View Complete Audit Log
          </Button>
        </div>
      </Card>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title={`Request Details - ${selectedRequest.id}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Customer Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Name</div>
                  <div style={{ fontWeight: '600' }}>{selectedRequest.customerName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Account Number</div>
                  <div style={{ fontWeight: '600' }}>{selectedRequest.accountNumber}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Phone</div>
                  <div style={{ fontWeight: '600' }}>{selectedRequest.customerPhone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Request Type</div>
                  <div style={{ fontWeight: '600' }}>{selectedRequest.requestType}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Biometric Verification</h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '6px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    color: getBiometricColor(selectedRequest.biometricScore),
                  }}
                >
                  {selectedRequest.biometricScore}%
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Face Match Confidence</div>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Submitted Documents</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedRequest.documents.map((doc, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '12px',
                      backgroundColor: UBA_GRAY,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FileText size={16} color={UBA_RED} />
                    <span style={{ fontWeight: '500' }}>{doc}</span>
                    <Badge color="#4caf50" style={{ marginLeft: 'auto' }}>
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Escalation Details</h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#fff3e0',
                  borderRadius: '6px',
                  borderLeft: '4px solid #ff9800',
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#e65100' }}>Reason: </span>
                  {selectedRequest.escalationReason}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#e65100' }}>Escalated By: </span>
                  {selectedRequest.escalatedBy}
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#e65100' }}>Escalated At: </span>
                  {selectedRequest.escalatedAt}
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Agent Notes</h4>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '6px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#666',
                }}
              >
                {selectedRequest.agentNotes}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Override Modal */}
      {showOverrideModal && selectedRequest && (
        <Modal
          isOpen={showOverrideModal}
          onClose={() => setShowOverrideModal(false)}
          title={`Supervisor Override - ${overrideAction === 'approve' ? 'Approve' : 'Reject'}`}
        >
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              You are about to override the escalated decision for request{' '}
              <strong>{selectedRequest.id}</strong> - <strong>{selectedRequest.customerName}</strong>
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Override Reason *
              </label>
              <select
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >
                <option value="">Select a reason...</option>
                {overrideAction === 'approve' ? (
                  <>
                    <option value="Additional verification completed">
                      Additional verification completed
                    </option>
                    <option value="Customer identity confirmed through alternate means">
                      Customer identity confirmed through alternate means
                    </option>
                    <option value="Acceptable explanation for discrepancy">
                      Acceptable explanation for discrepancy
                    </option>
                    <option value="Risk assessment acceptable">Risk assessment acceptable</option>
                    <option value="Business relationship justifies approval">
                      Business relationship justifies approval
                    </option>
                  </>
                ) : (
                  <>
                    <option value="Fraud indicators detected">Fraud indicators detected</option>
                    <option value="Unable to verify customer identity">
                      Unable to verify customer identity
                    </option>
                    <option value="Inconsistent information">Inconsistent information</option>
                    <option value="High risk assessment">High risk assessment</option>
                    <option value="Policy violation">Policy violation</option>
                  </>
                )}
                <option value="other">Other (specify in notes)</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                Additional Notes *
              </label>
              <textarea
                value={overrideNotes}
                onChange={(e) => setOverrideNotes(e.target.value)}
                placeholder="Provide detailed justification for this override decision..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div
              style={{
                padding: '12px 16px',
                backgroundColor: overrideAction === 'approve' ? '#e8f5e9' : '#ffebee',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#666',
                marginBottom: '20px',
              }}
            >
              <strong>Note:</strong> This supervisor override will be permanently logged in the audit trail
              with your name, timestamp, IP address, and reason.
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setShowOverrideModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmOverride}
                disabled={!overrideReason || !overrideNotes}
                style={{
                  backgroundColor:
                    !overrideReason || !overrideNotes
                      ? '#ccc'
                      : overrideAction === 'approve'
                      ? '#4caf50'
                      : '#f44336',
                  cursor: !overrideReason || !overrideNotes ? 'not-allowed' : 'pointer',
                }}
              >
                {overrideAction === 'approve' ? (
                  <>
                    <CheckCircle size={16} style={{ marginRight: '6px' }} />
                    Confirm Approval
                  </>
                ) : (
                  <>
                    <XCircle size={16} style={{ marginRight: '6px' }} />
                    Confirm Rejection
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SupervisorView;
