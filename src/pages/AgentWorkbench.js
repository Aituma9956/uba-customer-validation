import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Card, Badge, Modal } from '../components/SharedComponents';
import { UBA_RED, UBA_GRAY, UBA_WHITE, REQUEST_STATUS } from '../utils/constants';
import { mockRequests } from '../utils/mockData';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Eye,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';

const AgentWorkbench = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const statusMap = {
      [REQUEST_STATUS.PENDING]: { color: 'warning', label: 'Pending' },
      [REQUEST_STATUS.UNDER_REVIEW]: { color: 'info', label: 'Under Review' },
      [REQUEST_STATUS.APPROVED]: { color: 'success', label: 'Approved' },
      [REQUEST_STATUS.REJECTED]: { color: 'danger', label: 'Rejected' },
      [REQUEST_STATUS.ESCALATED]: { color: 'warning', label: 'Escalated' },
    };
    const { color, label } = statusMap[status] || { color: 'default', label: status };
    return <Badge color={color}>{label}</Badge>;
  };

  const getSLAStatus = (deadline) => {
    const now = new Date();
    const hoursLeft = (deadline - now) / (1000 * 60 * 60);
    if (hoursLeft < 0) {
      return { color: '#f44336', label: 'Overdue', icon: XCircle };
    } else if (hoursLeft < 6) {
      return { color: '#ff9800', label: `${Math.floor(hoursLeft)}h left`, icon: AlertTriangle };
    } else {
      return { color: '#4caf50', label: `${Math.floor(hoursLeft)}h left`, icon: Clock };
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleAction = (type) => {
    setActionType(type);
    setShowActionModal(true);
    setShowDetailModal(false);
  };

  const handleConfirmAction = () => {
    const updatedRequests = requests.map((req) => {
      if (req.id === selectedRequest.id) {
        if (actionType === 'approve') {
          return {
            ...req,
            status: REQUEST_STATUS.APPROVED,
            approvedAt: new Date(),
            approvedBy: 'Agent John Doe',
          };
        } else if (actionType === 'reject') {
          return {
            ...req,
            status: REQUEST_STATUS.REJECTED,
            rejectedAt: new Date(),
            rejectedBy: 'Agent John Doe',
            rejectionReason,
          };
        } else if (actionType === 'escalate') {
          return {
            ...req,
            status: REQUEST_STATUS.ESCALATED,
            escalatedAt: new Date(),
            escalatedBy: 'Agent John Doe',
          };
        }
      }
      return req;
    });

    setRequests(updatedRequests);
    setShowActionModal(false);
    setSelectedRequest(null);
    setRejectionReason('');
  };

  const filteredRequests = requests
    .filter((req) => {
      if (filterStatus === 'all') return true;
      return req.status === filterStatus;
    })
    .filter((req) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        req.customerName.toLowerCase().includes(search) ||
        req.accountNumber.includes(search) ||
        req.id.toLowerCase().includes(search)
      );
    });

  const pendingCount = requests.filter((r) => r.status === REQUEST_STATUS.PENDING).length;
  const underReviewCount = requests.filter((r) => r.status === REQUEST_STATUS.UNDER_REVIEW).length;
  const approvedCount = requests.filter((r) => r.status === REQUEST_STATUS.APPROVED).length;
  const rejectedCount = requests.filter((r) => r.status === REQUEST_STATUS.REJECTED).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar userType="agent" />
      <div style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#333', marginBottom: '8px' }}>CFC Agent Workbench</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Review and process customer validation requests
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Pending</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>{pendingCount}</div>
              </div>
              <Clock size={40} color="#ff9800" />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Under Review</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>{underReviewCount}</div>
              </div>
              <Eye size={40} color="#2196f3" />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Approved</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>{approvedCount}</div>
              </div>
              <CheckCircle size={40} color="#4caf50" />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Rejected</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: UBA_RED }}>{rejectedCount}</div>
              </div>
              <XCircle size={40} color="#f44336" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <Search size={20} color="#666" />
              <input
                type="text"
                placeholder="Search by name, account number, or request ID..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="all">All Statuses</option>
                <option value={REQUEST_STATUS.PENDING}>Pending</option>
                <option value={REQUEST_STATUS.UNDER_REVIEW}>Under Review</option>
                <option value={REQUEST_STATUS.APPROVED}>Approved</option>
                <option value={REQUEST_STATUS.REJECTED}>Rejected</option>
                <option value={REQUEST_STATUS.ESCALATED}>Escalated</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Requests Table */}
        <Card title="Validation Requests Queue">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: UBA_GRAY, borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Request ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Request Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Biometric</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>SLA</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => {
                  const sla = getSLAStatus(request.slaDeadline);
                  const SLAIcon = sla.icon;
                  return (
                    <tr
                      key={request.id}
                      style={{
                        borderBottom: '1px solid #e0e0e0',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = UBA_GRAY;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td style={{ padding: '16px', fontWeight: '600', color: UBA_RED }}>{request.id}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: UBA_RED,
                              color: UBA_WHITE,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            {request.customerName.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600' }}>{request.customerName}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{request.accountNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>{request.requestType}</td>
                      <td style={{ padding: '16px' }}>{getStatusBadge(request.status)}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor:
                                request.biometricScore >= 95
                                  ? '#4caf50'
                                  : request.biometricScore >= 80
                                  ? '#ff9800'
                                  : '#f44336',
                              color: UBA_WHITE,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            {request.biometricScore}%
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <SLAIcon size={16} color={sla.color} />
                          <span style={{ color: sla.color, fontSize: '14px', fontWeight: '600' }}>
                            {sla.label}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Button variant="outline" onClick={() => handleViewDetails(request)}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Eye size={16} />
                            Review
                          </div>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredRequests.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <FileText size={48} color="#ccc" style={{ marginBottom: '16px' }} />
                <div>No requests found matching your filters</div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Request Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Request Details - ${selectedRequest?.id}`}
      >
        {selectedRequest && (
          <div>
            {/* Customer Info */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: UBA_RED }}>
                Customer Information
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>Name:</div>
                  <div>{selectedRequest.customerName}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>Account Number:</div>
                  <div>{selectedRequest.accountNumber}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>BVN:</div>
                  <div>{selectedRequest.bvn}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>ID Type:</div>
                  <div>{selectedRequest.idType}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>ID Number:</div>
                  <div>{selectedRequest.idNumber}</div>
                </div>
              </div>
            </div>

            {/* Request Info */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: UBA_RED }}>
                Request Information
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>Request Type:</div>
                  <div>{selectedRequest.requestType}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>Status:</div>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>Submitted:</div>
                  <div>{selectedRequest.submittedAt.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '150px' }}>SLA Deadline:</div>
                  <div>{selectedRequest.slaDeadline.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Biometric Verification */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: UBA_RED }}>
                Biometric Verification
              </h3>
              <div
                style={{
                  padding: '20px',
                  backgroundColor:
                    selectedRequest.biometricScore >= 95
                      ? '#e8f5e9'
                      : selectedRequest.biometricScore >= 80
                      ? '#fff3e0'
                      : '#ffebee',
                  borderRadius: '8px',
                  border: `2px solid ${
                    selectedRequest.biometricScore >= 95
                      ? '#4caf50'
                      : selectedRequest.biometricScore >= 80
                      ? '#ff9800'
                      : '#f44336'
                  }`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor:
                        selectedRequest.biometricScore >= 95
                          ? '#4caf50'
                          : selectedRequest.biometricScore >= 80
                          ? '#ff9800'
                          : '#f44336',
                      color: UBA_WHITE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                    }}
                  >
                    {selectedRequest.biometricScore}%
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>
                      {selectedRequest.biometricScore >= 95
                        ? 'Excellent Match'
                        : selectedRequest.biometricScore >= 80
                        ? 'Good Match'
                        : 'Poor Match'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Facial recognition score</div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  ✓ Liveness detection passed
                  <br />
                  ✓ Face matched against BVN records
                  <br />✓ No suspicious activity detected
                </div>
              </div>
            </div>

            {/* Documents */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: UBA_RED }}>
                Documents
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                {selectedRequest.documentsComplete ? (
                  <>
                    <CheckCircle size={20} color="#4caf50" />
                    <span style={{ color: '#4caf50', fontWeight: '600' }}>All required documents uploaded</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={20} color="#ff9800" />
                    <span style={{ color: '#ff9800', fontWeight: '600' }}>Missing documents</span>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['ID Document', 'Utility Bill', 'Proof of Address'].map((doc) => (
                  <div
                    key={doc}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: UBA_GRAY,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <FileText size={16} color={UBA_RED} />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {selectedRequest.status === REQUEST_STATUS.PENDING ||
            selectedRequest.status === REQUEST_STATUS.UNDER_REVIEW ? (
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button
                  variant="secondary"
                  onClick={() => handleAction('approve')}
                  fullWidth
                  style={{ backgroundColor: '#4caf50', color: UBA_WHITE, border: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <ThumbsUp size={20} />
                    Approve
                  </div>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleAction('reject')}
                  fullWidth
                  style={{ backgroundColor: '#f44336', color: UBA_WHITE, border: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <ThumbsDown size={20} />
                    Reject
                  </div>
                </Button>
                <Button variant="secondary" onClick={() => handleAction('escalate')} fullWidth>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <ArrowRight size={20} />
                    Escalate
                  </div>
                </Button>
              </div>
            ) : (
              <div
                style={{
                  padding: '16px',
                  backgroundColor: UBA_GRAY,
                  borderRadius: '6px',
                  textAlign: 'center',
                  color: '#666',
                }}
              >
                This request has been {selectedRequest.status}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Action Confirmation Modal */}
      <Modal
        isOpen={showActionModal}
        onClose={() => {
          setShowActionModal(false);
          setShowDetailModal(true);
        }}
        title={`Confirm ${actionType === 'approve' ? 'Approval' : actionType === 'reject' ? 'Rejection' : 'Escalation'}`}
      >
        <div>
          <p style={{ marginBottom: '20px' }}>
            Are you sure you want to{' '}
            <strong>
              {actionType === 'approve' ? 'approve' : actionType === 'reject' ? 'reject' : 'escalate'}
            </strong>{' '}
            request <strong>{selectedRequest?.id}</strong>?
          </p>

          {actionType === 'reject' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Reason for Rejection <span style={{ color: UBA_RED }}>*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>
          )}

          <div
            style={{
              padding: '16px',
              backgroundColor: '#fff3e0',
              borderRadius: '6px',
              marginBottom: '20px',
              border: '1px solid #ff9800',
            }}
          >
            <div style={{ fontSize: '14px', color: '#e65100' }}>
              <strong>Note:</strong> This action will be recorded in the audit trail and cannot be undone.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              variant="secondary"
              onClick={() => {
                setShowActionModal(false);
                setShowDetailModal(true);
              }}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              fullWidth
              disabled={actionType === 'reject' && !rejectionReason.trim()}
            >
              Confirm {actionType === 'approve' ? 'Approval' : actionType === 'reject' ? 'Rejection' : 'Escalation'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentWorkbench;
