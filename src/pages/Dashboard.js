import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/SharedComponents';
import { UBA_RED, UBA_GRAY, UBA_WHITE } from '../utils/constants';
import { mockAnalytics } from '../utils/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
} from 'lucide-react';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('7days');

  const stats = [
    {
      label: 'Total Requests',
      value: mockAnalytics.totalRequests,
      icon: FileText,
      color: '#2196f3',
      change: '+12%',
    },
    {
      label: 'Pending Requests',
      value: mockAnalytics.pendingRequests,
      icon: Clock,
      color: '#ff9800',
      change: '-5%',
    },
    {
      label: 'Approved Requests',
      value: mockAnalytics.approvedRequests,
      icon: CheckCircle,
      color: '#4caf50',
      change: '+8%',
    },
    {
      label: 'Rejected Requests',
      value: mockAnalytics.rejectedRequests,
      icon: XCircle,
      color: '#f44336',
      change: '-3%',
    },
  ];

  const metrics = [
    {
      label: 'Avg. Turnaround Time',
      value: `${mockAnalytics.averageTurnaroundTime} hrs`,
      icon: TrendingUp,
      color: UBA_RED,
    },
    {
      label: 'SLA Compliance',
      value: `${mockAnalytics.slaCompliance}%`,
      icon: CheckCircle,
      color: '#4caf50',
    },
    {
      label: 'Biometric Success Rate',
      value: `${mockAnalytics.biometricSuccessRate}%`,
      icon: Users,
      color: '#2196f3',
    },
    {
      label: 'Active Agents',
      value: mockAnalytics.activeAgents,
      icon: Users,
      color: '#ff9800',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar userType="manager" />
      <div style={{ padding: '30px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#333', marginBottom: '8px' }}>Analytics Dashboard</h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Real-time operational visibility and performance metrics
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: UBA_RED,
                color: UBA_WHITE,
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                      {stat.value.toLocaleString()}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: stat.change.startsWith('+') ? '#4caf50' : '#f44336',
                        fontWeight: '600',
                      }}
                    >
                      {stat.change} from last period
                    </div>
                  </div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={32} color={stat.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: `${metric.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color={metric.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{metric.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{metric.value}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Daily Volume Chart */}
          <Card title="Request Volume Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.dailyVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="requests" stroke={UBA_RED} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card title="Request Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.requestsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockAnalytics.requestsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Request Types */}
          <Card title="Requests by Type">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.requestsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={UBA_RED} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* SLA Performance */}
          <Card title="SLA Performance Indicators">
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>Within SLA</span>
                  <span style={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {mockAnalytics.slaCompliance}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${mockAnalytics.slaCompliance}%`,
                      height: '100%',
                      backgroundColor: '#4caf50',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>Biometric Success</span>
                  <span style={{ fontWeight: 'bold', color: '#2196f3' }}>
                    {mockAnalytics.biometricSuccessRate}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${mockAnalytics.biometricSuccessRate}%`,
                      height: '100%',
                      backgroundColor: '#2196f3',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>Document Completeness</span>
                  <span style={{ fontWeight: 'bold', color: '#ff9800' }}>91.2%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '91.2%',
                      height: '100%',
                      backgroundColor: '#ff9800',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>Agent Productivity</span>
                  <span style={{ fontWeight: 'bold', color: UBA_RED }}>87.5%</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '87.5%',
                      height: '100%',
                      backgroundColor: UBA_RED,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card title="Recent Activity Log">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: UBA_GRAY, borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Timestamp</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Request ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Action</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Agent</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: '2 mins ago',
                    id: 'REQ-2026-005',
                    customer: 'Oluwaseun Adeyemi',
                    action: 'Rejected',
                    agent: 'Mary Johnson',
                    status: 'rejected',
                  },
                  {
                    time: '15 mins ago',
                    id: 'REQ-2026-004',
                    customer: 'Blessing Eze',
                    action: 'Approved',
                    agent: 'Jane Smith',
                    status: 'approved',
                  },
                  {
                    time: '1 hour ago',
                    id: 'REQ-2026-003',
                    customer: 'Ibrahim Musa',
                    action: 'Submitted',
                    agent: 'System',
                    status: 'pending',
                  },
                  {
                    time: '2 hours ago',
                    id: 'REQ-2026-002',
                    customer: 'Chioma Okafor',
                    action: 'Under Review',
                    agent: 'John Doe',
                    status: 'under_review',
                  },
                  {
                    time: '3 hours ago',
                    id: 'REQ-2026-001',
                    customer: 'Adewale Johnson',
                    action: 'Submitted',
                    agent: 'System',
                    status: 'pending',
                  },
                ].map((activity, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <td style={{ padding: '16px', color: '#666' }}>{activity.time}</td>
                    <td style={{ padding: '16px', fontWeight: '600', color: UBA_RED }}>{activity.id}</td>
                    <td style={{ padding: '16px' }}>{activity.customer}</td>
                    <td style={{ padding: '16px' }}>{activity.action}</td>
                    <td style={{ padding: '16px' }}>{activity.agent}</td>
                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor:
                            activity.status === 'approved'
                              ? '#e8f5e9'
                              : activity.status === 'rejected'
                              ? '#ffebee'
                              : activity.status === 'under_review'
                              ? '#e3f2fd'
                              : '#fff3e0',
                          color:
                            activity.status === 'approved'
                              ? '#4caf50'
                              : activity.status === 'rejected'
                              ? '#f44336'
                              : activity.status === 'under_review'
                              ? '#2196f3'
                              : '#ff9800',
                        }}
                      >
                        {activity.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alerts & Notifications */}
        <div style={{ marginTop: '20px' }}>
          <Card title="System Alerts & Workflow Automation">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#fff3e0',
                  borderLeft: `4px solid #ff9800`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                }}
              >
                <AlertTriangle size={20} color="#ff9800" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    🔔 3 requests approaching SLA deadline - Auto-escalation scheduled
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    REQ-2026-001, REQ-2026-008, REQ-2026-012 will be automatically escalated in 2 hours if not processed.
                    Notifications sent to agents and supervisors.
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#e8f5e9',
                  borderLeft: `4px solid #4caf50`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                }}
              >
                <CheckCircle size={20} color="#4caf50" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    ✅ Automated request routing active - All agents available
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    12 agents online. New requests automatically assigned based on workload balancing.
                    Current average: 13 requests per agent. System is optimizing assignment paths.
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#e3f2fd',
                  borderLeft: `4px solid #2196f3`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                }}
              >
                <TrendingUp size={20} color="#2196f3" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    📊 Workflow automation performing optimally - Volume spike detected
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Request volume is 15% higher than usual. System has automatically adjusted approval paths and
                    sent SMS notifications to 45 customers about their request status. Maker-checker workflow active for high-value requests.
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f3e5f5',
                  borderLeft: `4px solid #9c27b0`,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                }}
              >
                <Clock size={20} color="#9c27b0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    ⚡ SLA timers active - 24 requests being monitored
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Automated SLA tracking active for all pending requests. System will auto-escalate requests that
                    breach SLA timers. Email and SMS notifications configured for all stakeholders.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Workflow Automation Info */}
        <Card style={{ marginTop: '20px' }}>
          <div
            style={{
              backgroundColor: '#e8f5e9',
              border: '1px solid #4caf50',
              padding: '20px',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
              <CheckCircle size={32} color="#4caf50" />
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#2e7d32' }}>
                  Workflow Automation & SLA Control - The System Moves the Work
                </div>
                <div style={{ fontSize: '14px', color: '#2e7d32', lineHeight: '1.6' }}>
                  <strong>Automated processes in action:</strong>
                  <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                    <li>✓ <strong>Intelligent Request Routing:</strong> New requests automatically assigned to available agents based on workload</li>
                    <li>✓ <strong>SLA Timer Monitoring:</strong> Real-time tracking of all SLA deadlines with auto-escalation</li>
                    <li>✓ <strong>Approval Path Configuration:</strong> Configurable workflows for different request types</li>
                    <li>✓ <strong>Auto-Escalation Rules:</strong> Requests automatically escalated when SLA threshold reached</li>
                    <li>✓ <strong>Notification Engine:</strong> Automated SMS/Email to customers and agents at every stage</li>
                    <li>✓ <strong>Maker-Checker Enforcement:</strong> Dual approval required for high-risk requests</li>
                    <li>✓ <strong>Load Balancing:</strong> System distributes work evenly across available agents</li>
                    <li>✓ People don't chase work — the system moves it automatically</li>
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

export default Dashboard;
