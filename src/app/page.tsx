'use client';

import React, { useState } from 'react';
import { Upload, BarChart3, List, PieChart, TrendingUp, AlertCircle } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// 더미 데이터 (대시보드용)
const DUMMY_STATS = [
  { name: '식비', value: 450000, color: '#3b82f6' },
  { name: '카페', value: 85000, color: '#60a5fa' },
  { name: '쇼핑', value: 120000, color: '#93c5fd' },
  { name: '교통', value: 55000, color: '#bfdbfe' },
  { name: '구독', value: 42000, color: '#2563eb' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard'>('upload');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        const data = await res.json();
        setResults(data.transactions || []);
      } catch (err) {
        alert('분석에 실패했습니다.');
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b p-4 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">한달정산</h1>
        <button className="text-gray-400"><AlertCircle className="w-5 h-5" /></button>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {activeTab === 'upload' ? (
          <>
            {/* 메인 배너 */}
            <section className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">이번 달 정산, <br/>스크린샷 한 장으로.</h2>
                <p className="opacity-80 text-sm">카드 명세서나 입출금 내역을 올려보세요.</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                <Upload className="w-32 h-32" />
              </div>
            </section>

            {/* 업로드 섹션 */}
            <section className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-full">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="font-medium">이미지 업로드</p>
                <p className="text-xs text-gray-400">명세서 스크린샷을 선택하세요</p>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="file-upload"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold cursor-pointer hover:bg-blue-700 shadow-md transition"
              >
                파일 선택하기
              </label>
            </section>

            {/* 분석 중 상태 */}
            {analyzing && (
              <div className="text-center py-10 bg-white rounded-2xl border">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">AI가 명세서를 정밀 분석 중입니다...</p>
                <p className="text-xs text-gray-400 mt-1">잠시만 기다려주세요.</p>
              </div>
            )}

            {/* 결과 리스트 */}
            {results && (
              <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-bold text-lg flex items-center gap-2 px-1">
                  <List className="w-5 h-5 text-blue-600" /> 분석 결과 ({results.length}건)
                </h3>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  {results.map((item, idx) => (
                    <div key={idx} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50 transition">
                      <div>
                        <p className="font-semibold text-gray-800">{item.store_name}</p>
                        <p className="text-xs text-gray-400">{item.date} · {item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{item.amount.toLocaleString()}원</p>
                        {item.is_subscription && (
                          <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold border border-red-100">구독</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert('데이터베이스 연동이 필요합니다.')}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition"
                >
                  내 가계부에 저장하기
                </button>
              </section>
            )}
          </>
        ) : (
          /* 대시보드 뷰 */
          <div className="space-y-6 animate-in fade-in duration-500">
            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-gray-500 text-sm font-medium mb-1">이번 달 총 지출</h3>
              <p className="text-3xl font-extrabold">752,000원</p>
              <div className="flex items-center gap-1 text-red-500 text-xs mt-2 font-bold">
                <TrendingUp className="w-3 h-3" /> 지난달 대비 12% 증가
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" /> 카테고리별 지출
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={DUMMY_STATS}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {DUMMY_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {DUMMY_STATS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-gray-600">{item.name}</span>
                    <span className="text-xs font-bold ml-auto">{item.value.toLocaleString()}원</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="font-bold mb-4 text-orange-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> 점검 필요 지출 (구독)
              </h3>
              <div className="space-y-3">
                {[
                  { name: '넷플릭스', price: '17,000원', date: '매달 15일' },
                  { name: '유튜브 프리미엄', price: '14,900원', date: '매달 22일' }
                ].map((sub, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-bold text-sm">{sub.name}</p>
                      <p className="text-[10px] text-orange-400">{sub.date} 결제</p>
                    </div>
                    <p className="font-bold text-orange-600">{sub.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* 하단 탭 바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t flex justify-around p-4 shadow-2xl">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`flex flex-col items-center transition ${activeTab === 'upload' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Upload className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">업로드</span>
        </button>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center transition ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] mt-1 font-bold">대시보드</span>
        </button>
      </nav>
    </main>
  );
}
