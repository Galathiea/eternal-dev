import React from 'react';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Your theme provider logic here
    return <div>{children}</div>;
};

export { ThemeProvider };