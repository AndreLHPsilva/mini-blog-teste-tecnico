import { useContext, createContext, useState } from "react";
import Notiflix from "notiflix";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  const Success = (values) => {
    setSuccess(values);
  };

  const Error = (values) => {
    setError(values);
  };

  const Warning = (values) => {
    setWarning(values);
  };

  const WaitToDisappear = async (time) => {
    await new Promise((resolve) => setTimeout(resolve, time));

    return
  }

  return (
    <NotificationContext.Provider value={{ Error, Success, Warning, WaitToDisappear }}>
      {success && Notiflix.Notify.success(success, { timeout: 1500 })}
      {success && setSuccess()}

      {error &&
        Notiflix.Notify.failure(error, { timeout: 1700, pauseOnHover: true })}
      {error && setError()}

      {warning &&
        Notiflix.Notify.info(warning, { timeout: 1700, pauseOnHover: true })}
      {warning && setWarning()}

      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
