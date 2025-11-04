export default function DeliveryTruckIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Cargo area (dark blue) */}
      <rect x="10" y="40" width="50" height="30" fill="#04235C" />
      
      {/* Cab (light blue) */}
      <rect x="60" y="40" width="30" height="30" fill="#80BFFF" />
      
      {/* Windshield window */}
      <rect x="63" y="43" width="24" height="12" fill="#04235C" />
      
      {/* Front wheel */}
      <circle cx="30" cy="75" r="8" fill="#80BFFF" />
      
      {/* Rear wheel */}
      <circle cx="70" cy="75" r="8" fill="#80BFFF" />
    </svg>
  );
}

