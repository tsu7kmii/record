import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

/**
 * 再読み込みに対応したログイン情報保持するコンテキストプロバイダー
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} UserContext.Providerを返す
 */
export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState(() => {
    // 初期化時にlocalStorageからデータを読み込む
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
    // userDataが変更されたときにlocalStorageを更新
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};