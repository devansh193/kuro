export function StatusPulse() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Pulse Animation Container */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Center dot */}
        <div className="w-4 h-4 bg-green-500 rounded-full z-10"></div>

        {/* Pulse rings with custom wave animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-wave opacity-75"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-400 rounded-full animate-wave opacity-50 animation-delay-300"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-300 rounded-full animate-wave opacity-25 animation-delay-600"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-200 rounded-full animate-wave opacity-10 animation-delay-900"></div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Available for New Projects
        </h1>
      </div>
    </div>
  );
}
