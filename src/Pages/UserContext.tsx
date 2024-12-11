import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  age?: string;
  hobbies?: string;
  cityOfBirth?: string;
  musicGenre?: string;
  paymentMethod?: string;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: "Kiriko S.",
    email: "kiriko@example.com",
    age: "25",
    hobbies: "Leer, Programar",
    cityOfBirth: "Ciudad de México",
    musicGenre: "Rock",
    paymentMethod: "Efectivo"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
