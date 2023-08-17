import React from "react";

export default SignUpButton = () => {
  return (
    <div>
      <button disabled={loading}>Sign up</button>
      {loading && "Uploading and compressing the image please wait..."}
      {err && <span>Something went wrong</span>}
    </div>
  );
};
