import React, { useEffect, useState } from "react";
import "./App.css";
import useApiAgent from "./hooks/useApiAgent";

interface Product {
    product: {
        id: string;
        title: string;
        description: string;
        price: number;
    };
}

function App() {
    const requests = useApiAgent();
    const [item, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const product = await requests.get<Product>("/speech");
                console.log("product", product);
                setProduct(product);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [requests]);

    return (
        <>
            <span>test</span>
            <div className="text-lg text-red-400">{item?.product.title}</div>
        </>
    );
}

export default App;
