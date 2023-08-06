import React from "react";

export function InputButtons() {
    return (
        <div
            style={{
                justifyContent: "space-between",
                display: "flex",
                marginBlockEnd: "40px",
            }}
        >
            <input className="submit" type="submit" value="Inregistrare" />
        </div>
    );
}