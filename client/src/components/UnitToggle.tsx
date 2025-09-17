export interface UnitSystemToggle {
    unit: 'us' | 'metric'
    onToggle: (newUnit: 'us' | 'metric') => void
}

export default function UnitToggle({ unit, onToggle }: UnitSystemToggle) {
    const isMetric = unit === 'metric'

    return (
        <div
            onClick={() => onToggle(isMetric ? 'us' : 'metric')}
            className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors
            ${isMetric ? 'bg-custom-button' : 'bg-custom-usa-metric-toggle'}`}
        >
            <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full 
                shadow transition-transform duration-300 
                ${isMetric ? 'translate-x-6' : 'translate-x-0'}`}
            />
            <span className='absolute -left-10 top-0 text-sm font-medium text-custom-usa-metric-toggle'>
                US
            </span>
            <span className='absolute -right-14 top-0 text-sm font-medium text-custom-button'>
                Metric
            </span>
        </div>
    )
}