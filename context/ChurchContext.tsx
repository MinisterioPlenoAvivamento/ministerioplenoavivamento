import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChurchData } from '../types';
import { INITIAL_DATA } from '../constants';

interface ChurchContextType {
  data: ChurchData;
  updateData: (newData: Partial<ChurchData>) => boolean;
  resetData: () => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

// Helper to ensure every item in a list has an ID
const sanitizeList = (list: any[]) => {
  if (!Array.isArray(list)) return [];
  return list.filter(item => item !== null && typeof item === 'object').map(item => ({
    ...item,
    id: item.id ? String(item.id) : Math.random().toString(36).substr(2, 9) // Ensure ID is string
  }));
};

export const ChurchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<ChurchData>(() => {
    const savedData = localStorage.getItem('churchData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        
        // Version Check & Migration
        if ((parsed.version || 0) < INITIAL_DATA.version) {
           console.log("Migrating data to version", INITIAL_DATA.version);
           parsed.general.heroVideo = parsed.general.heroVideo || INITIAL_DATA.general.heroVideo;
           // If they haven't set a custom hero image, update to the new Lion image
           if (!parsed.general.heroImage || parsed.general.heroImage.includes("unsplash")) {
              parsed.general.heroImage = INITIAL_DATA.general.heroImage;
           }
           parsed.version = INITIAL_DATA.version;
        }

        // Smart Merge with Sanitization
        return {
          ...INITIAL_DATA,
          ...parsed,
          general: { ...INITIAL_DATA.general, ...(parsed.general || {}) },
          contact: { ...INITIAL_DATA.contact, ...(parsed.contact || {}) },
          social: { ...INITIAL_DATA.social, ...(parsed.social || {}) },
          bank: { ...INITIAL_DATA.bank, ...(parsed.bank || {}) },
          multimedia: { 
            ...INITIAL_DATA.multimedia, 
            ...(parsed.multimedia || {}),
          },
          sermons: sanitizeList(parsed.sermons || INITIAL_DATA.sermons),
        };
      } catch (e) {
        console.error('Failed to parse saved data', e);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const updateData = (newData: Partial<ChurchData>) => {
    try {
      // 1. Merge Data State
      const updatedData = {
        ...data,
        ...newData,
      };

      // 2. Serialize
      const serialized = JSON.stringify(updatedData);

      // 3. Save to LocalStorage
      localStorage.setItem('churchData', serialized);
      
      // 4. Update React State
      setData(updatedData);
      
      console.log("Saved successfully at:", new Date().toISOString());
      return true;
    } catch (error) {
      console.error("CRITICAL SAVE ERROR:", error);
      return false; // Return failure to UI
    }
  };

  const resetData = () => {
    try {
      localStorage.removeItem('churchData');
      setData(INITIAL_DATA);
    } catch (e) {
      console.error("Reset error", e);
    }
  };

  return (
    <ChurchContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurchData = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurchData must be used within a ChurchProvider');
  }
  return context;
};