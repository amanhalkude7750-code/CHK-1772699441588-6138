import React from 'react';
import { BarChart3, TrendingUp, Target, Clock, Zap } from 'lucide-react';

const ModeAnalysis = ({ modeName, metrics, colorClass }) => {
    return (
        <div className={`bg-white border-2 ${colorClass || 'border-black'} rounded-3xl p-6 shadow-xl animate-in fade-in slide-in-from-right-8`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <BarChart3 className="text-black" />
                        Student Live Analysis
                    </h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{modeName} Interaction Metrics</p>
                </div>
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center">
                    <Zap className="text-black fill-black" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-black/5">
                        <div className="flex items-center gap-2 mb-2">
                            {m.icon}
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black">{m.value}</span>
                            <span className="text-[10px] font-bold text-gray-500">{m.unit}</span>
                        </div>
                        <div className="mt-2 h-1 w-full bg-black/5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-black transition-all duration-1000`} 
                                style={{ width: m.progress + '%', transitionDelay: `${i * 100}ms` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-black/5">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-black mb-1">AI Recommendation</p>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            {metrics[0].progress < 70 
                                ? "Learning velocity is slightly below target. Suggesting practice sessions for core gestures." 
                                : "Excellent mastery detected. Student is ready for advanced complex translation patterns."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeAnalysis;
