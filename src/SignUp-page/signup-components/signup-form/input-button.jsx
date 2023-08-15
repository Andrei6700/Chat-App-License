import React from "react";

export function InputButtons({ onSubmit }) {
  return (
    <div className="d-grid gap-2">
      <button className="btn btn-primary" type="button" onClick={onSubmit}>
        Sign up
      </button>
    </div>
  );
}
