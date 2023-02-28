import { AllTimeStats } from '../types'

export default function EndScreen(props: { allTimeStats: AllTimeStats | null }) {
    const { allTimeStats } = props
    return (
        <div className="end-screen w-2/6 h-4/5 bg-default absolute z-10 rounded-lg flex flex-col items-center justify-center space-y-4 opacity-0">
            <h4 className="text-left text-slate-200 font-bold text-lg w-3/5 pl-4">STATISTICS</h4>
            <div className="w-3/5 py-2 space-x-2 flex items-center justify-evenly text-white text-center">
                <div className="flex-1 h-full">
                    <p className="text-4xl">22</p>
                    <p className="text-xs w-full">Played</p>
                </div>
                <div className="flex-1 h-full">
                    <p className="text-4xl">22</p>
                    <p className="text-xs w-full">Win %</p>
                </div>
                <div className="flex-1 h-full">
                    <p className="text-4xl">22</p>
                    <p className="text-xs w-full">Current Streak</p>
                </div>
                <div className="flex-1 h-full">
                    <p className="text-4xl">22</p>
                    <p className="text-xs w-full">Highest Streak</p>
                </div>
            </div>

            <h4 className="text-left to-slate-200 font-bold text-lg w-3/5 pl-4">
                GUESS DISTRIBUTION
            </h4>
            <div className="w-3/5 text-slate-100 text-sm text-center ">
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">1</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">2</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">3</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">4</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">5</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
                <div className="py-1 flex items-center justify-evenly space-x-2">
                    <div className="font-bold w-3">6</div>
                    <span className="w-full h-full bg-wrong rounded-md font-medium">100</span>
                </div>
            </div>
        </div>
    )
}
