import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getCache, setCache } from "../components/utils/cache";

// Define a generic cache type
interface GlobalCache {
  [key: string]: any;
}

// API Data Store - stores all preloaded API data
interface ApiDataStore {
  // Map data
  growthData?: { [plotName: string]: any };
  waterUptakeData?: { [plotName: string]: any };
  soilMoistureData?: { [plotName: string]: any };
  pestData?: { [plotName: string]: any };
  brixData?: { [plotName: string]: any };
  canopyVigourData?: { [plotName: string]: any };
  brixQualityData?: { [plotName: string]: any };
  
  // Dashboard data
  farmerDashboardData?: { [plotName: string]: any };
  indicesData?: { [plotName: string]: any };
  stressData?: { [plotName: string]: any };
  irrigationData?: { [plotName: string]: any };
  agroStatsData?: { [plotName: string]: any };
  
  // Fertilizer data
  fertilizerData?: { [plotName: string]: any };
  npkData?: { [plotName: string]: any };
  soilAnalysisData?: { [plotName: string]: any };
  
  // Irrigation data
  etData?: { [plotName: string]: any };
  soilMoistureTrendData?: { [plotName: string]: any };
  
  // Loading states
  isLoading?: { [endpoint: string]: boolean };
  
  // Preload status
  isPreloading?: boolean;
  preloadComplete?: boolean;
}

// Example of extensible global state (add more as needed)
interface AppState {
  weatherData?: any;
  soilAnalysis?: any;
  fieldScore?: any;
  selectedPlotName?: string | null;
  apiData: ApiDataStore;
  [key: string]: any;
}

interface AppContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  globalCache: GlobalCache;
  setGlobalCache: React.Dispatch<React.SetStateAction<GlobalCache>>;
  getCached: (key: string, maxAgeMs?: number) => any;
  setCached: (key: string, data: any) => void;
  selectedPlotName: string | null;
  setSelectedPlotName: (plotName: string | null) => void;
  
  // API Data management
  getApiData: (endpoint: string, plotName: string) => any;
  setApiData: (endpoint: string, plotName: string, data: any) => void;
  isDataLoading: (endpoint: string) => boolean;
  setDataLoading: (endpoint: string, loading: boolean) => void;
  isPreloading: () => boolean;
  setPreloading: (loading: boolean) => void;
  isPreloadComplete: () => boolean;
  setPreloadComplete: (complete: boolean) => void;
  
  // Cache management
  hasApiData: (endpoint: string, plotName: string) => boolean;
  clearApiCache: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>(() => {
    // Initialize from localStorage if available
    const savedPlot = localStorage.getItem('selectedPlot');
    
    // Try to load cached API data from localStorage (persists across refreshes)
    let cachedApiData: ApiDataStore = {
      growthData: {},
      waterUptakeData: {},
      soilMoistureData: {},
      pestData: {},
      brixData: {},
      canopyVigourData: {},
      brixQualityData: {},
      farmerDashboardData: {},
      indicesData: {},
      stressData: {},
      irrigationData: {},
      agroStatsData: {},
      fertilizerData: {},
      npkData: {},
      soilAnalysisData: {},
      etData: {},
      soilMoistureTrendData: {},
      isLoading: {},
      isPreloading: false,
      preloadComplete: false,
    };
    
    try {
      const cached = localStorage.getItem('apiDataCache');
      const cacheTimestamp = localStorage.getItem('apiDataCacheTimestamp');
      if (cached && cacheTimestamp) {
        const cacheAge = Date.now() - parseInt(cacheTimestamp, 10);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        if (cacheAge < maxAge) {
          const parsed = JSON.parse(cached);
          cachedApiData = { ...cachedApiData, ...parsed };
          console.log('✅ Loaded API data from localStorage cache');
        } else {
          console.log('⚠️ API cache expired, clearing...');
          localStorage.removeItem('apiDataCache');
          localStorage.removeItem('apiDataCacheTimestamp');
        }
      }
    } catch (error) {
      console.warn('Failed to load API data from cache:', error);
    }
    
    return {
      selectedPlotName: savedPlot || null,
      apiData: cachedApiData,
    };
  });
  const [globalCache, setGlobalCache] = useState<GlobalCache>({});

  // Helper to get from cache (context first, then localStorage)
  const getCached = useCallback((key: string, maxAgeMs?: number) => {
    if (globalCache[key]) return globalCache[key];
    return getCache(key, maxAgeMs);
  }, [globalCache]);

  // Helper to set cache (context and localStorage)
  const setCached = useCallback((key: string, data: any) => {
    setGlobalCache((prev) => ({ ...prev, [key]: data }));
    setCache(key, data);
  }, []);

  // Global plot selection handler
  const setSelectedPlotName = useCallback((plotName: string | null) => {
    setAppState((prev) => ({ ...prev, selectedPlotName: plotName }));
    if (plotName) {
      localStorage.setItem('selectedPlot', plotName);
    } else {
      localStorage.removeItem('selectedPlot');
    }
  }, []);

  // API Data management functions
  const getApiData = useCallback((endpoint: string, plotName: string) => {
    const endpointMap: { [key: string]: keyof ApiDataStore } = {
      'growth': 'growthData',
      'waterUptake': 'waterUptakeData',
      'soilMoisture': 'soilMoistureData',
      'pest': 'pestData',
      'brix': 'brixData',
      'canopyVigour': 'canopyVigourData',
      'brixQuality': 'brixQualityData',
      'indices': 'indicesData',
      'stress': 'stressData',
      'irrigation': 'irrigationData',
      'agroStats': 'agroStatsData',
      'npk': 'npkData',
      'soilAnalysis': 'soilAnalysisData',
      'et': 'etData',
      'soilMoistureTrend': 'soilMoistureTrendData',
    };
    
    const dataKey = endpointMap[endpoint];
    if (!dataKey) return null;
    
    return appState.apiData[dataKey]?.[plotName] || null;
  }, [appState.apiData]);

  const setApiData = useCallback((endpoint: string, plotName: string, data: any) => {
    const endpointMap: { [key: string]: keyof ApiDataStore } = {
      'growth': 'growthData',
      'waterUptake': 'waterUptakeData',
      'soilMoisture': 'soilMoistureData',
      'pest': 'pestData',
      'brix': 'brixData',
      'canopyVigour': 'canopyVigourData',
      'brixQuality': 'brixQualityData',
      'indices': 'indicesData',
      'stress': 'stressData',
      'irrigation': 'irrigationData',
      'agroStats': 'agroStatsData',
      'npk': 'npkData',
      'soilAnalysis': 'soilAnalysisData',
      'et': 'etData',
      'soilMoistureTrend': 'soilMoistureTrendData',
    };
    
    const dataKey = endpointMap[endpoint];
    if (!dataKey) return;
    
    setAppState((prev) => {
      const newState = {
        ...prev,
        apiData: {
          ...prev.apiData,
          [dataKey]: {
            ...prev.apiData[dataKey],
            [plotName]: data,
          },
        },
      };
      
      // Persist to localStorage for cache persistence across refreshes
      try {
        const dataToCache = {
          ...newState.apiData,
          isLoading: {}, // Don't cache loading states
          isPreloading: false,
        };
        localStorage.setItem('apiDataCache', JSON.stringify(dataToCache));
        localStorage.setItem('apiDataCacheTimestamp', Date.now().toString());
      } catch (error) {
        console.warn('Failed to cache API data:', error);
      }
      
      return newState;
    });
  }, []);

  const isDataLoading = useCallback((endpoint: string) => {
    return appState.apiData.isLoading?.[endpoint] || false;
  }, [appState.apiData.isLoading]);

  const setDataLoading = useCallback((endpoint: string, loading: boolean) => {
    setAppState((prev) => ({
      ...prev,
      apiData: {
        ...prev.apiData,
        isLoading: {
          ...prev.apiData.isLoading,
          [endpoint]: loading,
        },
      },
    }));
  }, []);

  const isPreloading = useCallback(() => {
    return appState.apiData.isPreloading || false;
  }, [appState.apiData.isPreloading]);

  const setPreloading = useCallback((loading: boolean) => {
    setAppState((prev) => ({
      ...prev,
      apiData: {
        ...prev.apiData,
        isPreloading: loading,
      },
    }));
  }, []);

  const isPreloadComplete = useCallback(() => {
    return appState.apiData.preloadComplete || false;
  }, [appState.apiData.preloadComplete]);

  const setPreloadComplete = useCallback((complete: boolean) => {
    setAppState((prev) => ({
      ...prev,
      apiData: {
        ...prev.apiData,
        preloadComplete: complete,
      },
    }));
  }, []);

  // Check if API data exists in cache
  const hasApiData = useCallback((endpoint: string, plotName: string) => {
    const data = getApiData(endpoint, plotName);
    return data !== null && data !== undefined;
  }, [getApiData]);

  // Clear API cache (used on logout)
  const clearApiCache = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      apiData: {
        growthData: {},
        waterUptakeData: {},
        soilMoistureData: {},
        pestData: {},
        brixData: {},
        canopyVigourData: {},
        brixQualityData: {},
        farmerDashboardData: {},
        indicesData: {},
        stressData: {},
        irrigationData: {},
        agroStatsData: {},
        fertilizerData: {},
        npkData: {},
        soilAnalysisData: {},
        etData: {},
        soilMoistureTrendData: {},
        isLoading: {},
        isPreloading: false,
        preloadComplete: false,
      },
    }));
    
    // Clear localStorage cache
    localStorage.removeItem('apiDataCache');
    localStorage.removeItem('apiDataCacheTimestamp');
    console.log('✅ API cache cleared');
  }, []);

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
        globalCache,
        setGlobalCache,
        getCached,
        setCached,
        selectedPlotName: appState.selectedPlotName || null,
        setSelectedPlotName,
        getApiData,
        setApiData,
        isDataLoading,
        setDataLoading,
        isPreloading,
        setPreloading,
        isPreloadComplete,
        setPreloadComplete,
        hasApiData,
        clearApiCache,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
