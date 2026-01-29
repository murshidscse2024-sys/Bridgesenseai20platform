export interface Bridge {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  district: string;
  state: string;
  status: 'healthy' | 'monitor' | 'caution' | 'critical';
  shi: number; // 0-100
  lastUpdated: string;
  constructionYear: number;
  type: string;
  frequency: number; // Hz
  baselineFrequency: number;
  amplitude: number; // g
  baselineAmplitude: number;
  confidence: number; // 0-1
  contributionCount: number;
}

export interface Alert {
  id: string;
  bridgeId: string;
  bridgeName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  message: string;
  timestamp: string;
  status: 'pending' | 'acknowledged' | 'resolved';
  shiAtTime: number;
  blockchainHash?: string;
}

export interface Inspection {
  id: string;
  bridgeId: string;
  inspector: string;
  date: string;
  findings: 'confirmed' | 'false_positive';
  damageTypes: string[];
  severity: 'minor' | 'major' | 'critical';
  notes: string;
  status: 'completed' | 'in_progress';
}

export const MOCK_BRIDGES: Bridge[] = [
  {
    id: 'b1',
    name: 'Howrah Bridge',
    latitude: 22.5851,
    longitude: 88.3468,
    district: 'Kolkata',
    state: 'West Bengal',
    status: 'healthy',
    shi: 94.2,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    constructionYear: 1943,
    type: 'Suspension-type Cantilever',
    frequency: 4.5,
    baselineFrequency: 4.5,
    amplitude: 0.002,
    baselineAmplitude: 0.002,
    confidence: 0.98,
    contributionCount: 12450
  },
  {
    id: 'b2',
    name: 'Pamban Bridge',
    latitude: 9.2819,
    longitude: 79.2131,
    district: 'Ramanathapuram',
    state: 'Tamil Nadu',
    status: 'caution',
    shi: 58.5,
    lastUpdated: new Date(Date.now() - 7200000).toISOString(),
    constructionYear: 1914,
    type: 'Cantilever',
    frequency: 3.8,
    baselineFrequency: 4.2,
    amplitude: 0.015,
    baselineAmplitude: 0.005,
    confidence: 0.92,
    contributionCount: 3200
  },
  {
    id: 'b3',
    name: 'Vidyasagar Setu',
    latitude: 22.5583,
    longitude: 88.3242,
    district: 'Kolkata',
    state: 'West Bengal',
    status: 'monitor',
    shi: 78.1,
    lastUpdated: new Date(Date.now() - 10800000).toISOString(),
    constructionYear: 1992,
    type: 'Cable-stayed',
    frequency: 4.1,
    baselineFrequency: 4.3,
    amplitude: 0.008,
    baselineAmplitude: 0.005,
    confidence: 0.95,
    contributionCount: 8900
  },
  {
    id: 'b4',
    name: 'Bandra-Worli Sea Link',
    latitude: 19.0365,
    longitude: 72.8172,
    district: 'Mumbai',
    state: 'Maharashtra',
    status: 'healthy',
    shi: 98.4,
    lastUpdated: new Date(Date.now() - 1800000).toISOString(),
    constructionYear: 2009,
    type: 'Cable-stayed',
    frequency: 4.6,
    baselineFrequency: 4.6,
    amplitude: 0.003,
    baselineAmplitude: 0.003,
    confidence: 0.99,
    contributionCount: 45000
  },
  {
    id: 'b5',
    name: 'Atal Setu',
    latitude: 15.4989,
    longitude: 73.8344,
    district: 'Panaji',
    state: 'Goa',
    status: 'critical',
    shi: 32.7,
    lastUpdated: new Date(Date.now() - 900000).toISOString(),
    constructionYear: 2019,
    type: 'Cable-stayed',
    frequency: 2.1,
    baselineFrequency: 4.0,
    amplitude: 0.045,
    baselineAmplitude: 0.010,
    confidence: 0.89,
    contributionCount: 1500
  },
  // Adding more dummy bridges to make it look substantial
  ...Array.from({ length: 45 }).map((_, i) => {
    const statuses: Bridge['status'][] = ['healthy', 'healthy', 'monitor', 'caution'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const shi = status === 'healthy' ? 85 + Math.random() * 15 : 
                status === 'monitor' ? 65 + Math.random() * 15 :
                status === 'caution' ? 45 + Math.random() * 15 : 20 + Math.random() * 20;
    
    return {
      id: `gen-${i}`,
      name: `Bridge NH-${10 + i}`,
      latitude: 12 + Math.random() * 15,
      longitude: 72 + Math.random() * 15,
      district: 'Various',
      state: 'Various',
      status,
      shi,
      lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      constructionYear: 1970 + Math.floor(Math.random() * 50),
      type: 'Beam',
      frequency: 4.0 + (Math.random() - 0.5),
      baselineFrequency: 4.0,
      amplitude: 0.005 + Math.random() * 0.01,
      baselineAmplitude: 0.005,
      confidence: 0.8 + Math.random() * 0.2,
      contributionCount: Math.floor(Math.random() * 5000)
    };
  })
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    bridgeId: 'b5',
    bridgeName: 'Atal Setu',
    severity: 'CRITICAL',
    message: 'SHI score dropped below 40 threshold. Immediate inspection required.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending',
    shiAtTime: 32.7,
    blockchainHash: '0x742d...f9a2'
  },
  {
    id: 'a2',
    bridgeId: 'b2',
    bridgeName: 'Pamban Bridge',
    severity: 'HIGH',
    message: 'Significant deviation in resonance frequency detected.',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: 'acknowledged',
    shiAtTime: 58.5,
    blockchainHash: '0x1a3b...c5e4'
  },
  {
    id: 'a3',
    bridgeId: 'b3',
    bridgeName: 'Vidyasagar Setu',
    severity: 'MEDIUM',
    message: 'Gradual decline in SHI over 30 days.',
    timestamp: new Date(Date.now() - 432000000).toISOString(),
    status: 'resolved',
    shiAtTime: 78.1
  }
];
