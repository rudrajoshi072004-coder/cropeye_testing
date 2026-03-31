import React, { useEffect, useState } from 'react';
import { getUserData } from '../utils/auth';
import { getCurrentUser } from '../api';
import axios from 'axios';
import {
  Leaf, Droplets, Sun, TrendingUp, MessageCircle,
  Phone, BarChart2, MapPin, ChevronDown, Activity,
} from 'lucide-react';

// Base URL for farmer home page API
const BASE_URL = "https://cropeye-grapes-admin-production.up.railway.app";

interface FarmerHomeGridProps {
  onMenuClick: (menu: string) => void;
}

interface FarmerStats {
  ndvi: number;
  areaAcres: number;
  healthPct: number;
  cropStatus: string;
  lastVisit: string;
  projectionAcres: number;
  canopyYield: number;
  smartAreaActive: boolean;
  soilMoisture: number;
  temperature: number;
}

const DEFAULT_STATS: FarmerStats = {
  ndvi: 0.59,
  areaAcres: 0.87,
  healthPct: 19.4,
  cropStatus: 'Growing',
  lastVisit: '0.87',
  projectionAcres: 0.87,
  canopyYield: 17.2,
  smartAreaActive: true,
  soilMoisture: 85,
  temperature: 19.0,
};

const FarmerHomeGrid: React.FC<FarmerHomeGridProps> = ({ onMenuClick }) => {
  const userData = getUserData();
  const firstName = userData?.first_name || userData?.username || 'Farmer';
  const [stats] = useState<FarmerStats>(DEFAULT_STATS);
  const [fieldOfficerName, setFieldOfficerName] = useState('Field Officer');

  useEffect(() => {
    const loadOfficer = async () => {
      try {
        const res = await getCurrentUser();
        const contact = res.data?.field_officer_name || res.data?.assigned_officer;
        if (contact) setFieldOfficerName(contact);
      } catch {
        // silent
      }
    };
    loadOfficer();
  }, []);

  const STATUS_COLOR: Record<string, { bg: string; text: string; dot: string }> = {
    Growing: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    Dormant: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    Harvesting: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  };
  const statusStyle = STATUS_COLOR[stats.cropStatus] ?? STATUS_COLOR['Growing'];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)' }}>
      {/* Welcome Header */}
      <div className="px-4 sm:px-6 pt-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome, <span className="text-green-600">{firstName}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Your grape farm at a glance</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMenuClick('Map')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff' }}
            >
              <Leaf size={14} />
              Smart Area
            </button>
            <button
              onClick={() => onMenuClick('FarmerDashboard')}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-all"
            >
              All Plots
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Tiles */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* NDVI */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">NDVI Score</span>
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                <Activity size={14} className="text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.ndvi.toFixed(2)}</div>
            <div className="text-xs text-green-600 mt-1 font-medium">Healthy Range</div>
          </div>

          {/* Area */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Total Area</span>
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin size={14} className="text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.areaAcres}</div>
            <div className="text-xs text-blue-500 mt-1 font-medium">Acres</div>
          </div>

          {/* Health */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Crop Health</span>
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                <BarChart2 size={14} className="text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.healthPct}%</div>
            <div className="text-xs text-purple-500 mt-1 font-medium">Optimal</div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Crop Status</span>
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                <Leaf size={14} className="text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
              <span className={`text-base font-bold ${statusStyle.text}`}>{stats.cropStatus}</span>
            </div>
            <div className={`text-xs mt-1 font-medium ${statusStyle.text} opacity-70`}>Active Season</div>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="px-4 sm:px-6 pb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Grape Field Projection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #16a34a 0%, #166534 100%)' }}
          >
            <div>
              <p className="text-green-100 text-xs font-medium">Grape Field Projection</p>
              <p className="text-white text-lg font-bold mt-0.5">
                Last Visit: {stats.lastVisit} Acres
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-1 mb-3">
              {[60, 75, 55, 80, 70, 85, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h * 0.8}px`,
                    background: i === 5
                      ? 'linear-gradient(to top, #16a34a, #4ade80)'
                      : 'linear-gradient(to top, #bbf7d0, #d1fae5)',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
              <span>Fri</span><span className="text-green-600 font-semibold">Sat</span><span>Sun</span>
            </div>
            <button
              onClick={() => onMenuClick('Map')}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              View Field Map
            </button>
          </div>
        </div>

        {/* Grape Canopy Yield */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 pt-5 pb-2">
            <p className="text-xs font-medium text-gray-500 mb-1">Grape Canopy Yield</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-800">{stats.canopyYield}</span>
              <span className="text-lg font-semibold text-gray-400">t/ha</span>
            </div>
          </div>
          {/* Yield Gauge */}
          <div className="px-5 py-3">
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${Math.min((stats.canopyYield / 25) * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #4ade80, #16a34a)',
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span><span>Target: 25 t/ha</span>
            </div>
          </div>
          {/* Soil & Temp */}
          <div className="px-5 pb-5 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <Droplets size={16} className="text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-blue-700">{stats.soilMoisture}%</div>
              <div className="text-xs text-blue-400">Soil Moisture</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <Sun size={16} className="text-orange-500 mx-auto mb-1" />
              <div className="text-xl font-bold text-orange-700">{stats.temperature}°C</div>
              <div className="text-xs text-orange-400">Temperature</div>
            </div>
          </div>
        </div>

        {/* Expert Consultation + Quick Actions */}
        <div className="flex flex-col gap-4">
          {/* Talk to Field Officer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-xs text-gray-400 font-medium mb-3">Expert Consultation</p>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
              >
                {fieldOfficerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{fieldOfficerName}</p>
                <p className="text-xs text-gray-400">Your Field Officer</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onMenuClick('Contactuser')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
              >
                <MessageCircle size={15} />
                Message
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
              >
                <Phone size={15} />
                Call
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-xs text-gray-400 font-medium mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'My Tasks', icon: '📋', action: 'Tasklist', colors: 'from-purple-400 to-purple-600' },
                { label: 'Irrigation', icon: '💧', action: 'Irrigation', colors: 'from-blue-400 to-blue-600' },
                { label: 'Fertilizer', icon: '🌱', action: 'Fertilizer', colors: 'from-green-400 to-green-600' },
                { label: 'Pest & Disease', icon: '🔬', action: 'Pest & Disease', colors: 'from-red-400 to-red-600' },
              ].map((qa) => (
                <button
                  key={qa.action}
                  onClick={() => onMenuClick(qa.action)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl text-white bg-gradient-to-br ${qa.colors} hover:opacity-90 transition-all`}
                >
                  <span className="text-xl mb-1">{qa.icon}</span>
                  <span className="text-xs font-semibold">{qa.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerHomeGrid;
