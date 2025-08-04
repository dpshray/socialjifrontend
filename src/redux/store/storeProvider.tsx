'use client';
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store/store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
