import React from "react";

export function withSuspense<WCP>(Component: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <Component {...props}/>
        </React.Suspense>
    }
}