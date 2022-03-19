import { createContext, Dispatch, SetStateAction, useState } from 'react';

// The original utilitybar state
const utilityState: UtilityState = {
  toggleFolders: true,
  deleteNote: false,
  toggleNewNote: true,
  toggleNewFolder: false,
  searchInput: '',
};

// Create new context for the utilitybar to pass to other components
export const UtilityContext = createContext<
  [UtilityState, Dispatch<SetStateAction<UtilityState>>] | null
>(null);

// this is the context provider that wraps all of the components that will have access to UtilityContext
export const UtilityProvider = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  const [utilities, setUtilities] = useState<UtilityState>(utilityState);
  return (
    <UtilityContext.Provider value={[utilities, setUtilities]}>{children}</UtilityContext.Provider>
  );
};
