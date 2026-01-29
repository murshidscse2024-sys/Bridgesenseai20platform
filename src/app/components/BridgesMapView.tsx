import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_BRIDGES } from '@/app/utils/mockData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  Info, 
  ChevronRight, 
  Activity,
  Layers,
  Navigation
} from 'lucide-react';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Creator
const createCustomIcon = (status: string) => {
  const color = status === 'healthy' ? '#10B981' : 
                status === 'monitor' ? '#F59E0B' :
                status === 'caution' ? '#F97316' : '#DC2626';
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

interface BridgesMapViewProps {
  onBridgeClick: (id: string) => void;
}

export function BridgesMapView({ onBridgeClick }: BridgesMapViewProps) {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // Center of India
  const [zoom, setZoom] = useState(5);

  const filteredBridges = activeStatus === 'all' 
    ? MOCK_BRIDGES 
    : MOCK_BRIDGES.filter(b => b.status === activeStatus);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Map Controls Overlay */}
      <div className="flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <StatusTab label="All" count={MOCK_BRIDGES.length} active={activeStatus === 'all'} onClick={() => setActiveStatus('all')} />
          <StatusTab label="Critical" count={MOCK_BRIDGES.filter(b=>b.status==='critical').length} color="bg-red-500" active={activeStatus === 'critical'} onClick={() => setActiveStatus('critical')} />
          <StatusTab label="Caution" count={MOCK_BRIDGES.filter(b=>b.status==='caution').length} color="bg-orange-500" active={activeStatus === 'caution'} onClick={() => setActiveStatus('caution')} />
          <StatusTab label="Monitor" count={MOCK_BRIDGES.filter(b=>b.status==='monitor').length} color="bg-amber-500" active={activeStatus === 'monitor'} onClick={() => setActiveStatus('monitor')} />
          <StatusTab label="Healthy" count={MOCK_BRIDGES.filter(b=>b.status==='healthy').length} color="bg-emerald-500" active={activeStatus === 'healthy'} onClick={() => setActiveStatus('healthy')} />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            <Layers size={16} className="text-gray-500" />
            Layer Control
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1E40AF] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all">
            <Navigation size={16} />
            My Location
          </button>
        </div>
      </div>

      {/* Actual Map */}
      <div className="flex-1 rounded-[32px] overflow-hidden border border-gray-200 shadow-inner relative z-10">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {filteredBridges.map((bridge) => (
            <React.Fragment key={bridge.id}>
              <Marker 
                position={[bridge.latitude, bridge.longitude]}
                icon={createCustomIcon(bridge.status)}
              >
                <Popup className="custom-popup">
                  <div className="p-3 w-64">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{bridge.name}</h4>
                        <p className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">{bridge.district}, {bridge.state}</p>
                      </div>
                      <div className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                        bridge.status === 'healthy' ? 'bg-emerald-100 text-emerald-700' :
                        bridge.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {bridge.shi}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-2 rounded-xl">
                        <p className="text-[8px] text-gray-400 font-bold uppercase">Confidence</p>
                        <p className="text-xs font-bold text-gray-700">{(bridge.confidence * 100).toFixed(0)}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl">
                        <p className="text-[8px] text-gray-400 font-bold uppercase">Contributors</p>
                        <p className="text-xs font-bold text-gray-700">{bridge.contributionCount.toLocaleString()}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => onBridgeClick(bridge.id)}
                      className="w-full bg-[#1E40AF] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
                    >
                      View Full Assessment
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </Popup>
              </Marker>
              
              {/* Geofence Visualization (only for some in demo) */}
              {(bridge.id === 'b1' || bridge.id === 'b5') && (
                <Circle 
                  center={[bridge.latitude, bridge.longitude]} 
                  radius={200}
                  pathOptions={{ 
                    color: bridge.status === 'critical' ? '#EF4444' : '#1E40AF', 
                    fillOpacity: 0.1,
                    weight: 1,
                    dashArray: '5, 5'
                  }}
                />
              )}
            </React.Fragment>
          ))}
          
          <MapResizer />
        </MapContainer>

        {/* Floating Map Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl z-[1000] space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Health Legend</p>
          <LegendItem color="bg-emerald-500" label="80-100 (Safe)" />
          <LegendItem color="bg-amber-500" label="60-79 (Monitor)" />
          <LegendItem color="bg-orange-500" label="40-59 (Caution)" />
          <LegendItem color="bg-red-500" label="0-39 (Danger)" />
        </div>
      </div>
    </div>
  );
}

function StatusTab({ label, count, color, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
        active ? 'bg-[#1E40AF] text-white shadow-md shadow-blue-200' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      {color && <div className={`w-2 h-2 rounded-full ${color}`}></div>}
      {label}
      <span className={`px-1.5 py-0.5 rounded-lg text-[10px] ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
        {count}
      </span>
    </button>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </div>
  );
}

// Helper to invalidate size when container changes
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }, [map]);
  return null;
}
