import React, { createContext, useState } from 'react';

const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  
  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyProvider, CompanyContext };
