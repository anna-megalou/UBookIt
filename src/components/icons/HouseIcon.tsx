export default function HouseIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Main house body (light blue) */}
      <rect x="25" y="50" width="50" height="40" rx="4" fill="#80BFFF" />
      
      {/* Roof (dark blue) */}
      <path
        d="M 10 50 L 50 20 L 90 50 L 90 90 L 10 90 Z"
        fill="#04235C"
      />
      
      {/* Window (dark blue) */}
      <rect x="35" y="60" width="12" height="12" rx="2" fill="#04235C" />
      
      {/* Door (dark blue) */}
      <rect x="65" y="60" width="12" height="30" rx="2" fill="#04235C" />
      
      {/* Chimney (dark blue) */}
      <rect x="82" y="30" width="8" height="20" rx="2" fill="#04235C" />
    </svg>
  );
}

