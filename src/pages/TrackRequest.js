import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, Input, Button } from '../components/SharedComponents';
import { UBA_RED, UBA_GRAY, REQUEST_STATUS } from '../utils/constants';
import { Search, FileText, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const TrackRequest = () => {
  const [requestId, setRequestId] = useState('');
  const [requestData, setRequestData] = useState(null);

  // Mock request data
  const mockRequestData = {
    id: 'REQ-2026-001',
    customerName: 'Adewale Johnson',
    accountNumber: '1234567890',
    requestType: 'Account Reactivation',
    status: REQUEST_STATUS.UNDER_REVIEW,
    submittedAt: new Date('2026-01-13T10:30:00'),
    timeline: [
      {
        status: 'Submitted',
        timestamp: new Date('2026-01-13T10:30:00'),
        description: 'Request successfully submitted',
        completed: true,
      },
      {
        status: 'Documents Verified',
        timestamp: new Date('2026-01-13T11:15:00'),
        description: 'All documents verified and validated',
        completed: true,
      },
      {
        status: 'Biometric Verified',
        timestamp: new Date('2026-01-13T11:20:00'),
        description: 'Facial recognition completed with 98.5% match',
        completed: true,
      },
      {
        status: 'Under Review',
        timestamp: new Date('2026-01-13T14:00:00'),
        description: 'Request assigned to CFC Agent for review',
        completed: true,
      },
      {
        status: 'Pending Decision',
        timestamp: null,
        description: 'Awaiting final approval from agent',
        completed: false,
      },
    ],
  };

  const handleSearch = () => {
    if (requestId.trim()) {
      // Simulate search
      setRequestData(mockRequestData);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case REQUEST_STATUS.PENDING:
        return <Clock size={24} color="#ff9800" />;
      case REQUEST_STATUS.UNDER_REVIEW:
        return <AlertTriangle size={24} color="#2196f3" />;
      case REQUEST_STATUS.APPROVED:
        return <CheckCircle size={24} color="#4caf50" />;
      case REQUEST_STATUS.REJECTED:
        return <XCircle size={24} color="#f44336" />;
      default:
        return <FileText size={24} color="#666" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case REQUEST_STATUS.PENDING:
        return '#ff9800';
      case REQUEST_STATUS.UNDER_REVIEW:
        return '#2196f3';
      case REQUEST_STATUS.APPROVED:
        return '#4caf50';
      case REQUEST_STATUS.REJECTED:
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar userType="customer" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#333', marginBottom: '12px' }}>Track Your Request</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Enter your request ID to view the status of your validation request
          </p>
        </div>

        {/* Search Card */}
        <Card style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Request ID"
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="e.g., REQ-2026-001"
              />
            </div>
            <Button onClick={handleSearch}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} />
                Track Request
              </div>
            </Button>
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginTop: '12px' }}>
            Your request ID was sent to your registered email and phone number
          </div>
        </Card>

        {/* Request Details */}
        {requestData && (
          <>
            <Card style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ margin: 0, marginBottom: '8px', color: '#333' }}>Request Details</h2>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Submitted on {requestData.submittedAt.toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getStatusIcon(requestData.status)}
                  <div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Status</div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: getStatusColor(requestData.status),
                        textTransform: 'capitalize',
                      }}
                    >
                      {requestData.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '180px' }}>Request ID:</div>
                  <div style={{ color: UBA_RED, fontWeight: '600' }}>{requestData.id}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '180px' }}>Customer Name:</div>
                  <div>{requestData.customerName}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '180px' }}>Account Number:</div>
                  <div>{requestData.accountNumber}</div>
                </div>
                <div style={{ display: 'flex', padding: '12px', backgroundColor: UBA_GRAY, borderRadius: '6px' }}>
                  <div style={{ fontWeight: '600', minWidth: '180px' }}>Request Type:</div>
                  <div>{requestData.requestType}</div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card title="Request Timeline">
              <div style={{ position: 'relative', paddingLeft: '40px' }}>
                {requestData.timeline.map((item, index) => (
                  <div key={index} style={{ position: 'relative', paddingBottom: '30px' }}>
                    {/* Timeline line */}
                    {index < requestData.timeline.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '-28px',
                          top: '32px',
                          width: '2px',
                          height: 'calc(100% - 12px)',
                          backgroundColor: item.completed ? UBA_RED : '#e0e0e0',
                        }}
                      />
                    )}

                    {/* Timeline dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-40px',
                        top: '0',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: item.completed ? UBA_RED : '#e0e0e0',
                        border: `3px solid ${item.completed ? UBA_RED : '#e0e0e0'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.completed && (
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                          }}
                        />
                      )}
                    </div>

                    {/* Timeline content */}
                    <div
                      style={{
                        backgroundColor: item.completed ? '#fff' : UBA_GRAY,
                        padding: '16px',
                        borderRadius: '8px',
                        border: item.completed ? `1px solid ${UBA_RED}` : '1px solid #e0e0e0',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: '600',
                          fontSize: '16px',
                          marginBottom: '4px',
                          color: item.completed ? UBA_RED : '#666',
                        }}
                      >
                        {item.status}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {item.description}
                      </div>
                      {item.timestamp && (
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {item.timestamp.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Help Section */}
            <Card style={{ marginTop: '30px' }}>
              <div
                style={{
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #2196f3',
                  padding: '16px',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1565c0' }}>
                  Need Help?
                </div>
                <div style={{ fontSize: '14px', color: '#1565c0', marginBottom: '16px' }}>
                  If you have any questions about your request or need to provide additional information:
                </div>
                <div style={{ fontSize: '14px', color: '#1565c0' }}>
                  • Call our CFC hotline: 0700-CALL-UBA (0700-2255-822)
                  <br />
                  • Email: cfc@ubagroup.com
                  <br />
                  • Visit your nearest UBA branch
                  <br />• Average response time: 2-4 hours
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!requestData && (
          <Card style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FileText size={64} color="#ccc" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: '#666', marginBottom: '12px' }}>Enter your request ID to track your request</h3>
            <p style={{ color: '#999', fontSize: '14px' }}>
              Your request ID was sent to your registered email and phone number after submission
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackRequest;
