import React from "react";

export const InputButtons = () => {

  return (
    <div className="d-grid gap-2">
      <button className="btn btn-primary" disabled={loading}>
        Sign up
      </button>
      {loading && "Uploading and compressing the image please wait..."}
      {err && <span>Something went wrong</span>}
    </div>
  );
};
