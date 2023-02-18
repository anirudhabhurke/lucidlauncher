import React, {createContext, useContext, useState} from 'react';

const AppsListHelper = createContext<ReturnType>(null);

export const useAppsListHelper = function (): ReturnType {
  return useContext<ReturnType>(AppsListHelper);
};

export default React.memo((props: any) => {
  const [appsList, setAppsList] = useState<TAppsList[]>(defaultArray);

  return <AppsListHelper.Provider value={{appsList, setAppsList}} {...props} />;
});

const defaultArray: TAppsList[] = [];

export interface TAppsList {
  packageName: string;
  appName: string;
}

interface ReturnType {
  appsList: TAppsList[];
  setAppsList: React.Dispatch<React.SetStateAction<TAppsList[]>>;
}
