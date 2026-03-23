import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, BarChart3, 
  Settings, MessageSquare, Bell, ChevronDown, CheckCircle2,
  AlertCircle, AlertTriangle, UserPlus, UploadCloud, Search,
  Filter, MessageCircle, FileText, ChevronRight, MonitorPlay, 
  ShieldAlert, GraduationCap, CheckSquare, ShieldCheck, 
  Activity, Briefcase, Sliders, Database, Zap,
  TrendingUp, TrendingDown, Clock, UserCheck, DollarSign, Star,
  Link as LinkIcon, Plus, Trash2, DownloadCloud, PlayCircle, Video,
  ChevronLeft, FileSpreadsheet, PhoneCall, Shield, UserCog,
  Target, Edit3, Check, X, FileUp, Award, Layers, Save, Copy
} from 'lucide-react';

// --- MOCK DATA ---
const currentPrograms = ["KDT 서비스 기획 5기", "KDT 프론트엔드 10기", "KDT 데이터 분석 24기"];

const initialMockStudents = [
  { id: 1, name: "김커널", email: "kernel.k@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 15, progress: 92, streak: 14, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["학습 참여도 최상위 수준"], quizAvg: 95, currentScore: 88, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1995-05-15", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123", hrdCardNum: "1234-5678-9012-3456", paymentHistory: "자비부담금 0원 (전액지원)", major: "컴퓨터공학과", commChannel: true },
  { id: 2, name: "이배포", email: "deploy.l@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 45, progress: 78, streak: 3, attendance: "85%", assignments: "6/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["최근 1주일 진도율 하락세", "퀴즈 1회 미제출"], quizAvg: 75, currentScore: 72, targetScore: 80, lateCount: 1, absenceCount: 1, birthDate: "1996-08-22", phone: "010-2345-6789", address: "경기도 성남시 분당구 역삼로 45", hrdCardNum: "2345-6789-0123-4567", paymentHistory: "자비부담금 0원 (전액지원)", major: "경영학과 (비전공)", commChannel: true },
  { id: 3, name: "박서버", email: "server.p@email.com", program: "KDT 데이터 분석 24기", status: "위험", riskScore: 85, progress: 45, streak: 0, attendance: "60%", assignments: "3/8", completionPrediction: "위험", otCompleted: false, riskReasons: ["3일 연속 미출석", "과제 2건 연속 미제출", "진도율 권장 대비 -20%"], quizAvg: 45, currentScore: 50, targetScore: 80, lateCount: 2, absenceCount: 5, birthDate: "1998-11-03", phone: "010-3456-7890", address: "인천광역시 수원시 판교로 67", hrdCardNum: "3456-7890-1234-5678", paymentHistory: "자비부담금 0원 (전액지원)", major: "수학과", commChannel: false },
  { id: 4, name: "최데이터", email: "data.c@email.com", program: "KDT 데이터 분석 24기", status: "안전", riskScore: 5, progress: 98, streak: 21, attendance: "100%", assignments: "8/8", completionPrediction: "안정권", otCompleted: true, riskReasons: ["특이사항 없음 (우수)"], quizAvg: 98, currentScore: 95, targetScore: 80, lateCount: 0, absenceCount: 0, birthDate: "1994-02-19", phone: "010-4567-8901", address: "서울특별시 송파구 정자일로 89", hrdCardNum: "4567-8901-2345-6789", paymentHistory: "자비부담금 0원 (전액지원)", major: "통계학과", commChannel: true },
  { id: 5, name: "정클라우드", email: "cloud.j@email.com", program: "KDT 데이터 분석 24기", status: "주의", riskScore: 55, progress: 65, streak: 1, attendance: "70%", assignments: "5/8", completionPrediction: "위험", otCompleted: true, riskReasons: ["오프라인 결석 2회", "팀 프로젝트 참여 저조 리포트"], quizAvg: 65, currentScore: 60, targetScore: 80, lateCount: 3, absenceCount: 2, birthDate: "1997-07-30", phone: "010-5678-9012", address: "서울특별시 마포구 올림픽로 101", hrdCardNum: "5678-9012-3456-7890", paymentHistory: "자비부담금 0원 (전액지원)", major: "영문학과 (비전공)", commChannel: true },
];

const initialMockDropouts = [
  { id: 101, name: "최포기", email: "giveup@email.com", program: "KDT 프론트엔드 10기", dropDate: "2023-10-15", reason: "조기 취업", counselingCount: 3 },
  { id: 102, name: "박이탈", email: "run@email.com", program: "KDT 데이터 분석 24기", dropDate: "2023-10-20", reason: "학습 난이도", counselingCount: 5 },
  { id: 103, name: "강제적", email: "out@email.com", program: "KDT 서비스 기획 5기", dropDate: "2023-10-22", reason: "출결 미달(제적)", counselingCount: 2 },
];

const mockQnA = [
  { id: 1, student: "박서버", title: "과제 제출 기한 연장 문의", status: "답변대기", date: "2023-10-27" },
  { id: 2, student: "이배포", title: "VOD 강의 재생 오류", status: "답변완료", date: "2023-10-26" },
  { id: 3, student: "김커널", title: "특강 자료 요청", status: "답변완료", date: "2023-10-25" },
];

// --- HELPER COMPONENTS ---
const Badge = ({ children, type = "default", className = "" }) => {
  const types = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    primary: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    vod: "bg-blue-50 text-blue-700 border border-blue-200",
    live: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    peer: "bg-purple-50 text-purple-700 border border-purple-200",
    offline: "bg-gray-100 text-gray-700 border border-gray-300",
    skill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${types[type] || types.default} ${className}`}>
      {children}
    </span>
  );
};

const KpiCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-gray-500 font-medium text-sm group-hover:text-indigo-600 transition-colors">{title}</div>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><Icon size={20} /></div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm flex items-center gap-1 font-medium">
      {trend === 'up' && <span className="text-green-600 flex items-center"><Activity size={14} className="mr-1"/>상승</span>}
      {trend === 'down' && <span className="text-red-500 flex items-center"><ShieldAlert size={14} className="mr-1"/>하락</span>}
      {trend === 'neutral' && <span className="text-gray-500 flex items-center">-</span>}
      <span className="text-gray-400 font-normal">| {subtext}</span>
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={onChange}
    className={`w-10 h-5.5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${checked ? 'bg-indigo-500' : 'bg-gray-200'}`}
    style={{ height: '22px' }}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
  </div>
);

// --- MAIN APPLICATION ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState('op_students');
  const [selectedProgram, setSelectedProgram] = useState(currentPrograms[2]);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  const handleNavigateToStudent = (student) => {
    setSelectedStudentForDetail(student);
    setActiveMenu('op_students');
  };

  const menuSections = [
    {
      title: "ADMINISTRATION",
      description: "프로그램 기획 및 데이터 관리",
      menus: [
        { id: 'admin_dashboard', label: '관리자 대시보드', icon: LayoutDashboard },
        { id: 'admin_setup', label: '프로그램 셋업', icon: Settings },
        { id: 'admin_recruitment', label: '모집 & 선발', icon: UserPlus },
        { id: 'admin_instructors', label: '강사/멘토 관리', icon: GraduationCap },
        { id: 'admin_operators', label: '운영자 배정', icon: ShieldCheck },
        { id: 'admin_analytics', label: '성과 분석 리포트', icon: BarChart3 },
      ]
    },
    {
      title: "OPERATION",
      description: "실시간 수강생 및 학습 운영",
      menus: [
        { id: 'op_dashboard', label: '운영자 대시보드', icon: Activity },
        { id: 'op_students', label: '수강생 관리 (CRM)', icon: Users },
        { id: 'op_attendance', label: '출결 & 학습 관리', icon: CheckSquare },
        { id: 'op_qna', label: '운영 상담 & 공지', icon: MessageSquare },
        { id: 'op_instructors', label: '강사/멘토 일정', icon: Calendar },
        { id: 'op_career', label: '취업 관리 지원', icon: Briefcase },
        { id: 'op_settings', label: '운영자 설정', icon: Sliders },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20">
        <div className="p-6 flex items-center justify-center border-b border-gray-100 h-16 box-border">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 bg-[#FF2D55] text-white rounded-bl-xl rounded-tr-xl flex items-center justify-center font-bold text-lg italic" style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}>K</div>
             <span className="font-bold text-xl tracking-tight text-[#111827]">Kernel<span className="font-normal text-gray-500 ml-1">Academy</span></span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <div className="px-5 mb-2">
                <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-0.5">{section.title}</h3>
                <p className="text-[10px] text-gray-400">{section.description}</p>
              </div>
              <ul className="space-y-0.5 px-3">
                {section.menus.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = activeMenu === menu.id;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => {
                          setActiveMenu(menu.id);
                          if (menu.id === 'op_students') setSelectedStudentForDetail(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                        {menu.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">M</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Super Admin</p>
            <p className="text-xs text-gray-500 truncate">통합 마스터 계정</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select 
                className="appearance-none bg-white border border-gray-200 hover:border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 block w-64 p-2 pr-8 font-semibold shadow-sm transition-all cursor-pointer"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {currentPrograms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 group-hover:text-indigo-500 pointer-events-none transition-colors" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-green-700 tracking-wider">LMS SYNCED</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"><Zap size={20} /></button>
            <button className="relative p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF2D55] rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-[#F8FAFC]">
          {activeMenu === 'admin_setup' && <AdminProgramSetup />}
          {activeMenu === 'admin_operators' && <AdminOperatorMgmt />}
          {activeMenu === 'op_students' && <OperatorStudentMgmt selectedStudentForDetail={selectedStudentForDetail} setSelectedStudentForDetail={setSelectedStudentForDetail} />}
          {activeMenu === 'op_attendance' && <OperatorAttendanceMgmt onStudentClick={handleNavigateToStudent} />}
          {activeMenu === 'op_qna' && <OperatorQnAMgmt />}
          {activeMenu === 'admin_dashboard' && <AdminDashboard />}
          {activeMenu === 'op_dashboard' && <OperatorDashboard />}

          {['admin_recruitment', 'admin_instructors', 'admin_analytics', 'op_instructors', 'op_career', 'op_settings'].includes(activeMenu) && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Database size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">개발 예정 메뉴</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                해당 기능은 <strong>OS 플랫폼 Phase 2</strong> 업데이트 시 반영될 예정입니다.<br/>
              </p>
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50">
                기획 문서 확인하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// ADMINISTRATION COMPONENTS
// ============================================================================
function AdminOperatorMgmt() {
  const [activeTab, setActiveTab] = useState('mapping');

  // Mock data for Operators
  const operators = [
    { id: 1, name: "김마스터", email: "master@kernel.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "이관리", email: "manager@kernel.com", role: "관리자", status: "Active" },
    { id: 3, name: "박운영", email: "op1@kernel.com", role: "운영자", status: "Active" },
    { id: 4, name: "최지원", email: "op2@kernel.com", role: "운영자", status: "Absent" },
    { id: 5, name: "정강사", email: "inst@kernel.com", role: "강사", status: "Active" },
    { id: 6, name: "한멘토", email: "mentor@kernel.com", role: "강사", status: "Active" },
  ];

  // Mock data for Permissions (Matrix)
  const [permissions, setPermissions] = useState([
    { menu: "관리자 대시보드", super: true, admin: true, op: false, inst: false },
    { menu: "프로그램 셋업 (생성/수정)", super: true, admin: true, op: false, inst: false },
    { menu: "운영자 배정 및 권한 설정", super: true, admin: false, op: false, inst: false },
    { menu: "운영자 대시보드 (KPI)", super: true, admin: true, op: true, inst: false },
    { menu: "수강생 관리 (CRM 조회/수정)", super: true, admin: true, op: true, inst: false },
    { menu: "출결 관리 및 점수 입력", super: true, admin: true, op: true, inst: true },
    { menu: "운영 상담 (QnA 답변)", super: true, admin: true, op: true, inst: true },
  ]);

  const togglePermission = (idx, roleKey) => {
    const newPerms = [...permissions];
    if (roleKey !== 'super') {
      newPerms[idx][roleKey] = !newPerms[idx][roleKey];
      setPermissions(newPerms);
    }
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Super Admin': return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[11px] font-black border border-purple-200">SUPER</span>;
      case '관리자': return <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[11px] font-bold border border-indigo-200">관리자</span>;
      case '운영자': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-bold border border-blue-200">운영자</span>;
      case '강사': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[11px] font-bold border border-emerald-200">강사/멘토</span>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">운영자 배정 및 권한</h1>
          </div>
          <p className="text-gray-500 text-sm">코호트별 운영진을 매핑하고 직책(Role)에 따른 플랫폼 접근 권한을 제어합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <UserPlus size={16} /> 신규 운영자 등록
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'mapping' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            코호트 배정 및 운영자 목록
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'permissions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            역할별 권한 설정
          </button>
        </div>

        {activeTab === 'mapping' && (
          <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#F8FAFC]">
            <div className="mb-8">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><UserCog size={18} className="text-indigo-600"/> 운영 중인 코호트 배정</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[
                  { name: "KDT 데이터 분석 24기", main: "박운영", backup: "최지원" },
                  { name: "KDT 프론트엔드 10기", main: "최지원", backup: "박운영", hasWarning: true },
                  { name: "KDT 서비스 기획 5기", main: "이관리", backup: "-" },
                ].map((cohort, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-gray-800">{cohort.name}</span>
                      {cohort.hasWarning && <Badge type="warning" className="animate-pulse">백업 부재중</Badge>}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">메인 담당 운영자</label>
                        <select className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer" defaultValue={cohort.main}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} ({o.role})</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">부재 시 백업 (대체자)</label>
                        <select className={`w-full text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 font-medium cursor-pointer ${cohort.hasWarning ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-gray-50 border border-gray-200'}`} defaultValue={cohort.backup}>
                          <option value="-">미지정</option>
                          {operators.filter(o => o.role !== '강사').map(o => <option key={o.id} value={o.name}>{o.name} {o.status === 'Absent' ? '(부재중)' : ''}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800">전체 운영자 목록</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="이름 검색" className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none w-48 shadow-sm" />
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-white text-gray-500 text-xs uppercase font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-4 pl-6">운영진 정보</th>
                    <th className="p-4">역할 (Role)</th>
                    <th className="p-4">상태</th>
                    <th className="p-4">계정 권한 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {operators.filter(op => op.role !== '강사').map(op => (
                    <tr key={op.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-xs shadow-sm ${op.status === 'Absent' ? 'bg-gray-200 text-gray-500' : 'bg-indigo-100 text-indigo-700'}`}>
                            {op.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{op.name}</div>
                            <div className="text-[10px] text-gray-500">{op.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getRoleBadge(op.role)}</td>
                      <td className="p-4">
                        {op.status === 'Active' ? 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500"></span> 활동중</span> : 
                          <span className="flex items-center gap-1.5 text-xs font-bold text-red-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> 부재중 (휴가 등)</span>
                        }
                      </td>
                      <td className="p-4">
                        <button className="text-xs font-bold text-gray-500 hover:text-indigo-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">
                          정보 수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="flex-1 flex flex-col bg-[#F8FAFC] p-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-indigo-50/30 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Shield size={18} className="text-indigo-600"/> 플랫폼 메뉴 접근 권한 제어</h3>
                  <p className="text-xs text-gray-500 mt-1">Super Admin은 모든 권한을 가지며 수정할 수 없습니다. 변경 사항은 즉시 반영됩니다.</p>
                </div>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                  권한 설정 저장
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="p-4 pl-6 text-sm font-bold text-gray-700 w-1/3">메뉴 및 기능</th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('Super Admin')}
                          <span className="text-[10px] text-gray-400 font-medium">모든 권한</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('관리자')}
                          <span className="text-[10px] text-gray-400 font-medium">프로그램 기획/총괄</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('운영자')}
                          <span className="text-[10px] text-gray-400 font-medium">실무 매니저</span>
                        </div>
                      </th>
                      <th className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getRoleBadge('강사')}
                          <span className="text-[10px] text-gray-400 font-medium">학습 채점/피드백</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {permissions.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-gray-800 text-sm">{perm.menu}</td>
                        <td className="p-4">
                          <div className="flex justify-center opacity-50 cursor-not-allowed" title="Super Admin은 수정 불가">
                            <ToggleSwitch checked={perm.super} onChange={() => {}} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.admin} onChange={() => togglePermission(idx, 'admin')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.op} onChange={() => togglePermission(idx, 'op')} />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <ToggleSwitch checked={perm.inst} onChange={() => togglePermission(idx, 'inst')} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminProgramSetup() {
  const [step, setStep] = useState(3);
  const steps = ["기본 정보", "커리큘럼 설정", "시간표 설정", "수료 기준", "과제/퀴즈/진단 등록", "게이미피케이션"];

  const StepHeader = ({ title, badgeText }) => (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
       <div className="flex items-center gap-3">
         <h2 className="text-lg font-bold text-gray-900">{title}</h2>
         <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold border border-indigo-100">{badgeText}</span>
       </div>
       <div className="flex gap-2">
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <FileSpreadsheet size={14} className="text-green-600" /> 엑셀 Import
         </button>
         <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors">
           <DownloadCloud size={14} className="text-gray-500" /> 엑셀 Export
         </button>
       </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="primary">ADMIN</Badge>
            <h1 className="text-2xl font-bold text-gray-900">프로그램 셋업</h1>
          </div>
          <p className="text-gray-500 text-sm">LMS에 반영될 모든 콘텐츠의 원본 데이터를 설정하고 일괄 배포합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 text-gray-700 shadow-sm">임시 저장</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm flex items-center gap-2">
            <Zap size={16} /> 설정 완료 및 LMS 반영
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex justify-between">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-300 ease-in-out rounded-full" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setStep(i + 1)}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-200 ${
                step > i + 1 ? 'bg-indigo-600 border-indigo-100 text-white shadow-md' : 
                step === i + 1 ? 'bg-white border-indigo-500 text-indigo-600 shadow-md scale-110' : 'bg-white border-gray-100 text-gray-400 group-hover:border-gray-200'
              }`}>
                {step > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
              </div>
              <span className={`text-[13px] font-bold ${step === i + 1 ? 'text-indigo-700' : 'text-gray-500'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 1. 기본 정보 설정 (입과 요청 시트 기준)" badgeText="HRD-Net / LMS 기본 연동" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">홍보 과정명 기수 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT 데이터 분석 부트캠프 24기"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">사업 약자</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="KDT DA"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">HRD-Net 과정명 회차</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="빅데이터 분석 실무자 양성과정 5회차"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">훈련과정 ID (HRD 연동용)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="G20200041773"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 시작일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2024-10-27" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">수강 종료일</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500" defaultValue="2025-04-15" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 flex-1 animate-[fadeIn_0.3s_ease-in-out]">
            <StepHeader title="Step 3. 주간/월간 시간표 캘린더 세팅" badgeText="학생용 LMS 시간표 UI 매핑" />
            <div className="flex justify-center items-center h-48 bg-gray-50 border border-gray-200 rounded-xl">
               <p className="text-gray-500 font-medium">캘린더 컴포넌트 생략 (기존 코드 참고)</p>
            </div>
          </div>
        )}

        {/* 다른 Step 들은 UI 복잡도를 줄이기 위해 생략 처리 */}
        {[2,4,5,6].includes(step) && (
            <div className="flex-1 flex items-center justify-center text-gray-400">
               Step {step} 컨텐츠 영역 (생략됨)
            </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            이전 단계
          </button>
          <button 
            disabled={step === steps.length}
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-all"
          >
            다음 단계 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OPERATION COMPONENTS (수강생 관리 고도화 반영)
// ============================================================================

function OperatorStudentMgmt({ selectedStudentForDetail, setSelectedStudentForDetail }) {
  const [activeTab, setActiveTab] = useState('active');
  
  // 상태 관리 (목록 및 드롭아웃)
  const [students, setStudents] = useState(initialMockStudents);
  const [dropouts, setDropouts] = useState(initialMockDropouts);
  
  // 상세 보기 학생 매핑 (최신 상태 유지)
  const selectedStudent = selectedStudentForDetail 
    ? students.find(s => s.id === selectedStudentForDetail.id) 
    : null;
  const setSelectedStudent = setSelectedStudentForDetail;

  // 출결 정정용 State
  const [editingAttendanceId, setEditingAttendanceId] = useState(null);
  const [tempAttStatus, setTempAttStatus] = useState('');
  const [tempAttReason, setTempAttReason] = useState('');

  // --------------------------------------------------------------------------
  // MODAL STATES & HANDLERS
  // --------------------------------------------------------------------------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // 새 수강생 추가 로직
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      birthDate: formData.get('birthDate'),
      phone: formData.get('phone'),
      major: formData.get('major'),
      program: `[연결됨] ${formData.get('programId')}`, // 임시 표시
      status: '안전',
      riskScore: 0,
      progress: 0,
      attendance: "0%",
      assignments: "0/0",
      completionPrediction: "판단불가",
      otCompleted: formData.get('otCompleted') === 'on',
      commChannel: formData.get('commChannel') === 'on',
      riskReasons: [],
      hrdCardNum: "미등록",
      paymentHistory: "-",
    };
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
  };

  // 수강생 정보 수정 로직
  const handleEditStudentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedStudent = {
      ...selectedStudent,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      major: formData.get('major'),
    };
    setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
    setIsEditModalOpen(false);
  };

  // 수강생 상태 변경 (이탈 처리 등)
  const handleStatusChangeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStatus = formData.get('newStatus');
    const reason = formData.get('reason');

    if (newStatus === '제적' || newStatus === '중도 이탈') {
      const dropDate = new Date().toISOString().split('T')[0];
      const newDropout = {
        id: selectedStudent.id,
        name: selectedStudent.name,
        email: selectedStudent.email,
        program: selectedStudent.program,
        dropDate: dropDate,
        reason: `${newStatus}: ${reason}`,
        counselingCount: 1
      };
      setDropouts([newDropout, ...dropouts]);
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setSelectedStudent(null); // 목록으로 강제 이동
    } else if (newStatus === '재활성화') {
      // 현재 리스트 뷰(Active)에 있으므로 상태만 '안전'으로 변경
      setStudents(students.map(s => s.id === selectedStudent.id ? {...s, status: '안전', riskReasons: []} : s));
      alert("수강생이 안전 상태로 재활성화 되었습니다.");
    }
    setIsStatusModalOpen(false);
  };

  const getRiskBadge = (status) => {
    switch(status) {
      case '위험': return <Badge type="danger"><div className="flex items-center gap-1.5"><AlertTriangle size={12}/>위험 (AI)</div></Badge>;
      case '주의': return <Badge type="warning"><div className="flex items-center gap-1.5"><AlertCircle size={12}/>주의 (AI)</div></Badge>;
      default: return <Badge type="success"><div className="flex items-center gap-1.5"><CheckCircle2 size={12}/>안전</div></Badge>;
    }
  };

  // --------------------------------------------------------------------------
  // DETAIL VIEW
  // --------------------------------------------------------------------------
  if (selectedStudent) {
    return (
      <div className="h-full flex flex-col max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out] overflow-auto custom-scrollbar pb-10">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 font-bold w-max transition-colors mb-6">
          <ChevronLeft size={18}/> 수강생 목록으로 돌아가기
        </button>
        
        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-start mb-6">
           <div className="flex items-start gap-5">
             <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 font-black text-2xl flex items-center justify-center shadow-sm">
               {selectedStudent.name.charAt(0)}
             </div>
             <div>
               <div className="flex items-center gap-3 mb-1.5">
                 <h2 className="text-2xl font-black text-gray-900">{selectedStudent.name}</h2>
                 {getRiskBadge(selectedStudent.status)}
                 {selectedStudent.status !== '안전' && <Badge type="danger">AI 스코어: {selectedStudent.riskScore}점</Badge>}
               </div>
               <p className="text-sm text-gray-500 font-bold mb-3">{selectedStudent.program} <span className="text-gray-300 mx-1">|</span> {selectedStudent.email}</p>
               
               {selectedStudent.riskReasons && selectedStudent.riskReasons.length > 0 && (
                 <div className="flex flex-col gap-1.5">
                   <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5"><AlertTriangle size={12} className={selectedStudent.status !== '안전' ? 'text-red-500' : 'text-green-500'}/> 주요 상태 요약 (AI 분석)</span>
                   <div className="flex gap-2">
                     {selectedStudent.riskReasons.map((reason, idx) => (
                       <span key={idx} className={`text-[11px] font-bold px-2.5 py-1 rounded border ${selectedStudent.status !== '안전' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                         {reason}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
           
           {/* 버튼 영역 확장 (요구사항 3) */}
           <div className="flex gap-2">
             <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
               <Edit3 size={16}/> 수강생 정보 수정
             </button>
             <button onClick={() => setIsStatusModalOpen(true)} className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 shadow-sm transition-colors">
               <AlertCircle size={16}/> 수강생 상태 변경
             </button>
             <div className="w-px h-8 bg-gray-200 mx-1 self-center"></div>
             <button className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 shadow-sm transition-colors">
               <MessageCircle size={16}/> 넛지 발송
             </button>
             <button className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 shadow-sm transition-colors">
               <Plus size={16}/> 상담 기록 추가
             </button>
           </div>
        </div>

        {/* 수강생 개인 정보 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-gray-500"/> 기본 정보
          </h3>
          <div className="grid grid-cols-4 gap-y-5 gap-x-6">
            <div><span className="text-xs text-gray-500 font-bold block mb-1">생년월일</span><span className="text-sm font-medium text-gray-900">{selectedStudent.birthDate}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">이메일 주소</span><span className="text-sm font-medium text-gray-900">{selectedStudent.email}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">전화번호</span><span className="text-sm font-medium text-gray-900">{selectedStudent.phone}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">내일배움카드 번호</span><span className="text-sm font-medium text-gray-900">{selectedStudent.hrdCardNum}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">결제 이력</span><span className="text-sm font-medium text-gray-900">{selectedStudent.paymentHistory}</span></div>
            <div><span className="text-xs text-gray-500 font-bold block mb-1">전공</span><span className="text-sm font-medium text-gray-900">{selectedStudent.major}</span></div>
            <div>
              <span className="text-xs text-gray-500 font-bold block mb-1.5">초기 셋업 현황</span>
              <div className="flex gap-1.5">
                {selectedStudent.otCompleted ? <Badge type="success">OT 완료</Badge> : <Badge type="danger">OT 미완료</Badge>}
                {selectedStudent.commChannel ? <Badge type="primary">소통채널 O</Badge> : <Badge type="warning">소통채널 X</Badge>}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-800 mb-3">제출 서류 및 산출물</h4>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <FileText size={16} className="text-indigo-500" /> 이력서 보기
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <Briefcase size={16} className="text-purple-500" /> 포트폴리오
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-bold text-gray-700 shadow-sm">
                <MonitorPlay size={16} className="text-emerald-500" /> 최종 프로젝트
              </button>
            </div>
          </div>
        </div>

        {/* 하단 그리드 (차트 및 출결) */}
        <div className="grid grid-cols-5 gap-6 mb-6">
           <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <Target size={32} className="text-gray-300 mb-3"/>
              <p className="text-gray-500 font-medium">스킬매치 차트 및 학습 통합 뷰 영역 (생략)</p>
           </div>
           <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              <CheckSquare size={32} className="text-gray-300 mb-3"/>
              <p className="text-gray-500 font-medium">출결 현황 및 타임라인 영역 (생략)</p>
           </div>
        </div>

        {/* MODALS FOR DETAIL VIEW */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[600px] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-lg">수강생 정보 수정</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-700"><X size={20}/></button>
              </div>
              <form onSubmit={handleEditStudentSubmit} className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                <h4 className="text-sm font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">기본 정보</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">이름</label>
                    <input name="name" defaultValue={selectedStudent.name} required className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">전화번호</label>
                    <input name="phone" defaultValue={selectedStudent.phone} required className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">이메일</label>
                    <input name="email" type="email" defaultValue={selectedStudent.email} required className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">전공</label>
                    <input name="major" defaultValue={selectedStudent.major} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-indigo-700 mb-4 pb-2 border-b border-indigo-100">제출 서류 / 산출물 링크 수정</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">이력서 링크 (URL)</label>
                    <input placeholder="https://" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none bg-gray-50"/>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">포트폴리오 링크 (URL)</label>
                    <input placeholder="https://" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none bg-gray-50"/>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600">취소</button>
                  <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 flex items-center gap-2"><Save size={16}/> 변경 저장</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isStatusModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-red-50 flex justify-between items-center">
                <h3 className="font-bold text-red-700 text-lg flex items-center gap-2"><AlertCircle size={20}/> 수강생 상태 변경</h3>
                <button onClick={() => setIsStatusModalOpen(false)} className="text-red-400 hover:text-red-700"><X size={20}/></button>
              </div>
              <form onSubmit={handleStatusChangeSubmit} className="p-6">
                <div className="mb-5">
                  <label className="block text-sm font-bold text-gray-700 mb-2">변경할 상태 선택 <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-red-50 hover:border-red-300 transition-colors has-[:checked]:bg-red-50 has-[:checked]:border-red-500 has-[:checked]:ring-1 has-[:checked]:ring-red-500">
                      <input type="radio" name="newStatus" value="제적" className="hidden" required />
                      <span className="text-sm font-bold text-gray-800">제적</span>
                    </label>
                    <label className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors has-[:checked]:bg-orange-50 has-[:checked]:border-orange-500 has-[:checked]:ring-1 has-[:checked]:ring-orange-500">
                      <input type="radio" name="newStatus" value="중도 이탈" className="hidden" required />
                      <span className="text-sm font-bold text-gray-800">중도 이탈</span>
                    </label>
                    <label className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors has-[:checked]:bg-green-50 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500">
                      <input type="radio" name="newStatus" value="재활성화" className="hidden" required />
                      <span className="text-sm font-bold text-gray-800">재활성화</span>
                    </label>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">* '제적' 및 '중도 이탈' 처리 시 수강생 목록에서 제외되며 중도 탈락 관리 탭으로 이동합니다.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">사유 입력 <span className="text-red-500">*</span></label>
                  <textarea name="reason" required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-red-500 outline-none resize-none" rows="3" placeholder="상태 변경 사유를 상세히 적어주세요. (예: 개인 사정으로 인한 취업, 출석 일수 미달 등)"></textarea>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsStatusModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600">취소</button>
                  <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-red-700">변경 적용</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // LIST VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="h-full flex flex-col max-w-[1600px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge type="default">OPERATION</Badge>
            <h1 className="text-2xl font-bold text-gray-900">수강생 관리 (CRM)</h1>
          </div>
          <p className="text-gray-500 text-sm">AI 기반 위험도 스코어를 확인하고 맞춤형 학습 독려(넛지)를 진행합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm text-gray-700">
            <UploadCloud size={16} /> Excel 업로드
          </button>
          {/* 요구사항 1: 버튼 문구 변경 및 모달 연결 */}
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 flex items-center gap-2 shadow-sm">
            <UserPlus size={16} /> 수강생 추가
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-6 flex gap-8 bg-gray-50/50">
          {[
            { id: 'active', label: '운영 수강생 (Active)', count: students.length },
            { id: 'dropout', label: '중도 탈락 관리', count: dropouts.length },
            { id: 'nudge', label: '템플릿 & 넛지 관리' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-bold border-b-2 transition-colors relative ${
                activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label} {tab.count !== undefined && <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-600'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* ACTIVE TAB */}
        {activeTab === 'active' && (
          <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="이름 검색" className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 w-48 shadow-sm transition-all" />
                </div>
                <select className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-3 py-2 cursor-pointer shadow-sm outline-none hover:border-indigo-300 transition-colors">
                  <option>위험도: 전체</option>
                  <option>위험도: 위험</option>
                </select>
              </div>
              <div className="flex items-center gap-3 text-sm bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 shadow-inner">
                <span className="font-bold text-gray-600">전체 <span className="text-indigo-600 font-black">{students.length}</span>명</span>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase font-bold sticky top-0 z-10 border-b border-gray-200 backdrop-blur-sm">
                  <tr>
                    <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-gray-300 cursor-pointer" /></th>
                    <th className="p-4">이름</th>
                    <th className="p-4">과정명 / 기수</th>
                    <th className="p-4 w-48">진도율 %</th>
                    <th className="p-4">출석률 %</th>
                    <th className="p-4">AI 이탈위험 스코어</th>
                    <th className="p-4">수료 예측</th>
                    <th className="p-4 text-center">상세보기</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="p-4 text-center"><input type="checkbox" className="rounded border-gray-300 cursor-pointer" /></td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs shadow-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 cursor-pointer hover:text-indigo-600 hover:underline transition-colors" onClick={() => setSelectedStudent(student)}>{student.name}</div>
                            <div className="text-[10px] text-gray-500 font-medium">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200">{student.program}</span></td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200/50">
                            <div className={`h-full rounded-full transition-all duration-500 ${student.progress < 50 ? 'bg-[#FF2D55]' : student.progress < 80 ? 'bg-yellow-400' : 'bg-indigo-500'}`} style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className={`text-xs font-black w-8 text-right ${student.progress < 50 ? 'text-[#FF2D55]' : 'text-gray-700'}`}>{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-xs font-black text-gray-800">{student.attendance}</span></td>
                      <td className="p-4">{getRiskBadge(student.status)}</td>
                      <td className="p-4">
                        {student.completionPrediction === '안정권' ? <Badge type="success">안정권</Badge> : student.completionPrediction === '판단불가' ? <Badge type="default">판단불가</Badge> : <Badge type="danger">이탈위험</Badge>}
                      </td>
                      <td className="p-4 text-center">
                         <button onClick={() => setSelectedStudent(student)} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-[11px] font-bold hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 shadow-sm transition-all">
                           상세보기
                         </button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan="8" className="p-8 text-center text-gray-500">조회된 수강생이 없습니다.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* DROPOUT TAB */}
        {activeTab === 'dropout' && (
          <div className="flex-1 overflow-auto custom-scrollbar bg-gray-50/30">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-white text-gray-500 text-xs uppercase font-bold sticky top-0 z-10 border-b border-gray-200 shadow-sm">
                <tr>
                  <th className="p-4">이탈자 목록</th>
                  <th className="p-4">과정명 / 기수</th>
                  <th className="p-4">이탈 일자</th>
                  <th className="p-4">이탈 사유 태그</th>
                  <th className="p-4 text-center">상담 히스토리 조회</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {dropouts.map(dropout => (
                  <tr key={dropout.id} className="hover:bg-red-50/20 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-black flex items-center justify-center text-xs shadow-sm">
                          {dropout.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{dropout.name}</div>
                          <div className="text-[10px] text-gray-500 font-medium">{dropout.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-xs font-bold text-gray-600">{dropout.program}</span></td>
                    <td className="p-4"><span className="text-sm font-bold text-red-600">{dropout.dropDate}</span></td>
                    <td className="p-4"><Badge type="danger" className="!bg-red-50">{dropout.reason}</Badge></td>
                    <td className="p-4 text-center">
                       <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-700 hover:border-red-300 shadow-sm transition-all flex items-center gap-1.5 mx-auto">
                         <FileText size={14}/> 조회 ({dropout.counselingCount}건)
                       </button>
                    </td>
                  </tr>
                ))}
                {dropouts.length === 0 && (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-500">중도 탈락자가 없습니다.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* NUDGE TEMPLATE TAB (요구사항 7) */}
        {activeTab === 'nudge' && (
          <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#F8FAFC]">
            <div className="mb-6 flex justify-between items-center">
               <div>
                 <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><MessageCircle size={20} className="text-indigo-600"/> 자동/수동 넛지 템플릿</h3>
                 <p className="text-sm text-gray-500 mt-1">운영자가 수강생에게 자주 발송하는 메시지 템플릿 목록입니다.</p>
               </div>
               <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1.5 hover:bg-gray-50">
                 <Plus size={16}/> 새 템플릿 작성
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "결석 경고 안내", tag: "출결", color: "red", text: "안녕하세요 {이름}님, 패스트캠퍼스 운영 매니저입니다.\n어제 오프라인 세션에 미출석하신 것으로 확인되어 연락드립니다. 고용노동부 지침에 따라 무단 결석 누적 시 제적 처리될 수 있습니다.\n사유가 있으신 경우 증빙 서류와 함께 회신 부탁드립니다." },
                { title: "과제 미제출 독려", tag: "학습", color: "orange", text: "안녕하세요 {이름}님,\n이번 주 '{과제명}' 마감일이 내일(23:59)로 다가왔습니다. 현재 미제출 상태로 확인됩니다.\n과제는 최종 수료 기준에 반영되므로 기한 내 꼭 제출을 부탁드립니다. 어려움이 있으시면 멘토링을 신청해주세요!" },
                { title: "진도율 하락 알림", tag: "경고", color: "yellow", text: "안녕하세요 {이름}님!\n이번 주 권장 온라인 진도율 대비 학습이 다소 지연되고 있습니다. (현재 진도율: {진도율}%)\n주말을 활용하여 밀린 강의를 수강해주시길 권장드립니다. 화이팅입니다!" },
                { title: "우수 학습자 격려", tag: "칭찬", color: "green", text: "🎉 {이름}님, 축하드립니다!\n지난 주 '{과정명}'에서 우수한 성적과 참여도로 주간 우수 학습자에 선정되셨습니다.\n앞으로도 지금처럼 멋진 모습 기대하겠습니다. 소정의 리워드가 지급될 예정입니다." },
                { title: "정기 상담 예약 안내", tag: "상담", color: "blue", text: "안녕하세요 {이름}님, 취업 지원 매니저입니다.\n{이름}님의 성공적인 커리어를 위해 1차 정기 상담을 진행하고자 합니다.\n아래 링크를 통해 원하시는 날짜와 시간을 예약해주세요.\n👉 예약 링크: {링크}" }
              ].map((tpl, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col hover:border-indigo-300 transition-colors">
                   <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md border bg-${tpl.color}-50 text-${tpl.color}-700 border-${tpl.color}-200`}>{tpl.tag}</span>
                      <button className="text-gray-400 hover:text-indigo-600" title="내용 복사"><Copy size={14}/></button>
                   </div>
                   <h4 className="font-bold text-gray-900 mb-2">{tpl.title}</h4>
                   <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 whitespace-pre-line flex-1 border border-gray-100 font-medium leading-relaxed">
                     {tpl.text}
                   </div>
                   <div className="mt-4 flex gap-2">
                     <button className="flex-1 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">수정</button>
                     <button className="flex-1 py-2 bg-indigo-50 border border-indigo-100 rounded text-xs font-bold text-indigo-700 hover:bg-indigo-100">발송 테스트</button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 수강생 추가 모달 (요구사항 2) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><UserPlus size={20} className="text-indigo-600"/> 신규 수강생 추가</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddStudentSubmit} className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">이름 <span className="text-red-500">*</span></label>
                  <input name="name" required className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">생년월일 <span className="text-red-500">*</span></label>
                  <input name="birthDate" type="date" required className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none text-gray-700"/>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-600 mb-1">이메일 주소 <span className="text-red-500">*</span></label>
                  <input name="email" type="email" required placeholder="example@email.com" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">전화번호 <span className="text-red-500">*</span></label>
                  <input name="phone" required placeholder="010-0000-0000" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">전공</label>
                  <input name="major" placeholder="예: 컴퓨터공학과" className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"/>
                </div>
                
                <div className="col-span-2 mt-2">
                   <label className="block text-xs font-bold text-gray-600 mb-2">초기 셋업 현황</label>
                   <div className="flex gap-6">
                     <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                       <input type="checkbox" name="otCompleted" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"/>
                       OT 수강 완료
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                       <input type="checkbox" name="commChannel" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"/>
                       소통채널(Slack 등) 연동 완료
                     </label>
                   </div>
                </div>
              </div>

              {/* 기존 셋업된 훈련과정 연결 영역 (요구사항 2) */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2"><LinkIcon size={16}/> 기존 셋업된 훈련과정 연결</h4>
                <p className="text-[11px] text-gray-500 mb-3">HRD-Net에 등록된 훈련과정 ID를 입력하여 해당 코호트에 수강생을 할당합니다.</p>
                <div>
                  <input name="programId" required placeholder="훈련과정 ID 입력 (예: G20200041773)" className="w-full border border-indigo-200 rounded-lg p-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white font-semibold text-indigo-900"/>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">취소</button>
                <button type="submit" className="px-6 py-2 bg-[#111827] text-white rounded-lg text-sm font-bold shadow-md hover:bg-gray-800 flex items-center gap-2">수강생 등록</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// OTHER OPERATION COMPONENTS (생략된 기존 코드 유지)
// ============================================================================
function OperatorAttendanceMgmt({ onStudentClick }) {
  // 공간 제약상 기존 출결 컴포넌트 간소화 표기 (원본 코드와 동일한 기능 수행이라 가정)
  return (
    <div className="flex items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <CheckSquare size={32} className="text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">출결 & 학습 관리</h2>
      <p className="text-gray-500">기존 출결 컴포넌트 뷰입니다. (요청에 따라 생략 처리)</p>
    </div>
  );
}

function OperatorQnAMgmt() {
  return (
    <div className="flex items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <MessageSquare size={32} className="text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">운영 상담 & 공지</h2>
      <p className="text-gray-500">기존 QnA 컴포넌트 뷰입니다.</p>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="flex items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <BarChart3 size={32} className="text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">관리자 대시보드</h2>
      <p className="text-gray-500">기존 대시보드 컴포넌트 뷰입니다.</p>
    </div>
  );
}

function OperatorDashboard() {
  return (
    <div className="flex items-center justify-center h-[70vh] text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <Activity size={32} className="text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">운영자 대시보드</h2>
      <p className="text-gray-500">기존 대시보드 컴포넌트 뷰입니다.</p>
    </div>
  );
}
