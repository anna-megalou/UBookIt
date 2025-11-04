export default function BookstoreIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Main building body */}
      <rect x="20" y="40" width="60" height="50" fill="#80BFFF" stroke="#04235C" strokeWidth="2" />
      
      {/* Roof with wavy/scalloped bottom */}
      <path
        d="M 10 40 Q 15 35, 20 40 Q 25 35, 30 40 Q 35 35, 40 40 Q 45 35, 50 40 Q 55 35, 60 40 Q 65 35, 70 40 Q 75 35, 80 40 Q 85 35, 90 40 L 90 20 L 10 20 Z"
        fill="#04235C"
        stroke="#04235C"
        strokeWidth="2"
      />
      
      {/* Window with book icon */}
      <rect x="25" y="45" width="20" height="20" fill="#04235C" rx="2" />
      {/* Book icon inside window */}
      <path
        d="M 30 50 L 40 50 L 40 60 L 30 60 Z"
        fill="#80BFFF"
      />
      <line x1="35" y1="50" x2="35" y2="60" stroke="#04235C" strokeWidth="1.5" />
      <line x1="30" y1="55" x2="40" y2="55" stroke="#04235C" strokeWidth="1" />
      
      {/* Door */}
      <rect x="55" y="65" width="20" height="25" fill="#80BFFF" stroke="#04235C" strokeWidth="2" rx="2" />
      <line x1="73" y1="70" x2="73" y2="90" stroke="#04235C" strokeWidth="1.5" />
    </svg>
  );
}

