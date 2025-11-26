export interface UnitSystemToggle {
    unit: 'us' | 'metric'
    onToggle: (newUnit: 'us' | 'metric') => void
}

export default function UnitToggle({ unit, onToggle }: UnitSystemToggle) {
    const isMetric = unit === 'metric'

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-custom-usa-metric-toggle">US</span>

            {/* Toggle */}
            <div
                onClick={() => onToggle(isMetric ? 'us' : 'metric')}
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors
          ${isMetric ? 'bg-custom-button' : 'bg-custom-usa-metric-toggle'}`}
            >
                <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300`}
                    style={{ transform: isMetric ? 'translateX(130%)' : 'translateX(0%)' }}
                />
            </div>
            <span className="text-sm font-medium text-custom-button">Metric</span>
        </div>
    )
}