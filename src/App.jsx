import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import {
  Users, Calendar, DollarSign, UserCheck, Bell, BookOpen,
  FileText, Briefcase, Target, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, Home, Award, Plus,
  Search, AlertTriangle, ArrowUp, ArrowDown
} from "lucide-react";

const C = ["#6366F1","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4"];

const DATA = {
  attendance:[{day:"Sen",hadir:798,absen:49},{day:"Sel",hadir:812,absen:35},{day:"Rab",hadir:821,absen:26},{day:"Kam",hadir:801,absen:46},{day:"Jum",hadir:789,absen:58},{day:"Sab",hadir:756,absen:91}],
  finance:[{month:"Jan",pemasukan:295,pengeluaran:210},{month:"Feb",pemasukan:285,pengeluaran:198},{month:"Mar",pemasukan:310,pengeluaran:225},{month:"Apr",pemasukan:285,pengeluaran:205},{month:"Mei",pemasukan:320,pengeluaran:230},{month:"Jun",pemasukan:295,pengeluaran:195}],
  grades:[{kelas:"X-A",rata:82.4},{kelas:"X-B",rata:78.9},{kelas:"XI-A",rata:85.1},{kelas:"XI-B",rata:79.3},{kelas:"XII-A",rata:87.2},{kelas:"XII-B",rata:83.6}],
  gradeDistrib:[{range:"90-100",jumlah:142},{range:"80-89",jumlah:298},{range:"70-79",jumlah:251},{range:"60-69",jumlah:98},{range:"<60",jumlah:58}],
  students:[
    {id:"001",nama:"Ahmad Fauzi",kelas:"XII-A",jk:"L",kehadiran:97},{id:"002",nama:"Siti Nurhaliza",kelas:"XII-B",jk:"P",kehadiran:95},
    {id:"003",nama:"Budi Santoso",kelas:"XI-A",jk:"L",kehadiran:89},{id:"004",nama:"Dewi Rahayu",kelas:"XI-B",jk:"P",kehadiran:98},
    {id:"005",nama:"Rizky Pratama",kelas:"X-A",jk:"L",kehadiran:92},{id:"006",nama:"Nur Aisyah",kelas:"X-B",jk:"P",kehadiran:96},
    {id:"007",nama:"Hendra Wijaya",kelas:"XII-A",jk:"L",kehadiran:88},{id:"008",nama:"Maya Sari",kelas:"XI-A",jk:"P",kehadiran:94},
    {id:"009",nama:"Farhan Hidayat",kelas:"X-A",jk:"L",kehadiran:91},{id:"010",nama:"Lestari Wulandari",kelas:"XI-B",jk:"P",kehadiran:99},
  ],
  staff:[
    {nama:"Drs. H. Sumarno, M.Pd",jabatan:"Waka Kurikulum",bidang:"Matematika",status:"aktif"},
    {nama:"Hj. Sri Wahyuni, S.Pd",jabatan:"Waka Kesiswaan",bidang:"Bhs. Indonesia",status:"aktif"},
    {nama:"Agus Permana, S.Pd",jabatan:"Guru",bidang:"Fisika",status:"izin"},
    {nama:"Rina Kusuma, S.Pd",jabatan:"Guru BK",bidang:"BK",status:"aktif"},
    {nama:"Bambang Hartono, S.E",jabatan:"Bendahara",bidang:"Ekonomi",status:"aktif"},
    {nama:"Yuli Astuti, S.Pd",jabatan:"Guru",bidang:"Kimia",status:"aktif"},
    {nama:"Dedi Kurniawan, S.Pd",jabatan:"Guru",bidang:"Sejarah",status:"aktif"},
    {nama:"Fitri Handayani, S.Pd",jabatan:"Guru",bidang:"Biologi",status:"aktif"},
  ],
  announcements:[
    {id:1,judul:"Rapat Koordinasi Semester Genap",tanggal:"28 Apr 2026",prioritas:"tinggi",dibaca:false},
    {id:2,judul:"Jadwal UTS Kelas XII",tanggal:"25 Apr 2026",prioritas:"tinggi",dibaca:true},
    {id:3,judul:"Peringatan Hardiknas 2026",tanggal:"22 Apr 2026",prioritas:"sedang",dibaca:true},
    {id:4,judul:"Pembaruan Data Siswa",tanggal:"20 Apr 2026",prioritas:"rendah",dibaca:true},
    {id:5,judul:"Kunjungan Dinas Pendidikan",tanggal:"18 Apr 2026",prioritas:"sedang",dibaca:true},
  ],
  leaves:[
    {nama:"Agus Permana, S.Pd",jenis:"Sakit",mulai:"29 Apr",akhir:"30 Apr",status:"disetujui"},
    {nama:"Rina Kusuma, S.Pd",jenis:"Keperluan Keluarga",mulai:"1 Mei",akhir:"2 Mei",status:"menunggu"},
    {nama:"Yuli Astuti, S.Pd",jenis:"Dinas Luar",mulai:"5 Mei",akhir:"5 Mei",status:"disetujui"},
    {nama:"Dedi Kurniawan, S.Pd",jenis:"Sakit",mulai:"27 Apr",akhir:"28 Apr",status:"selesai"},
    {nama:"Fitri Handayani, S.Pd",jenis:"Cuti Tahunan",mulai:"10 Mei",akhir:"12 Mei",status:"menunggu"},
  ],
  problems:[
    {id:"M001",judul:"AC Ruang Lab Komputer Rusak",kategori:"Sarana",prioritas:"tinggi",status:"proses",tanggal:"27 Apr"},
    {id:"M002",judul:"Proyektor Kelas XI-B Tidak Berfungsi",kategori:"Peralatan",prioritas:"sedang",status:"menunggu",tanggal:"26 Apr"},
    {id:"M003",judul:"Kebocoran Atap Perpustakaan",kategori:"Bangunan",prioritas:"tinggi",status:"proses",tanggal:"24 Apr"},
    {id:"M004",judul:"Internet Lab Lambat",kategori:"IT",prioritas:"sedang",status:"selesai",tanggal:"22 Apr"},
    {id:"M005",judul:"Meja Kursi Kelas X-A Kurang",kategori:"Sarana",prioritas:"rendah",status:"menunggu",tanggal:"20 Apr"},
  ],
  tasks:[
    {id:"T001",judul:"Penyusunan Laporan Semester I",assignee:"Sumarno",deadline:"5 Mei",prioritas:"tinggi",status:"proses",progress:65},
    {id:"T002",judul:"Evaluasi Kurikulum Merdeka",assignee:"Sri Wahyuni",deadline:"10 Mei",prioritas:"tinggi",status:"proses",progress:40},
    {id:"T003",judul:"Pengadaan Buku Perpustakaan",assignee:"Bambang H.",deadline:"15 Mei",prioritas:"sedang",status:"menunggu",progress:15},
    {id:"T004",judul:"Pelatihan Guru TIK",assignee:"Agus Permana",deadline:"8 Mei",prioritas:"sedang",status:"selesai",progress:100},
    {id:"T005",judul:"Sosialisasi Program Beasiswa",assignee:"Rina Kusuma",deadline:"20 Mei",prioritas:"rendah",status:"menunggu",progress:0},
    {id:"T006",judul:"Perbaikan Ruang Lab IPA",assignee:"Bambang H.",deadline:"30 Mei",prioritas:"tinggi",status:"proses",progress:30},
  ],
  kpi:[
    {nama:"Tingkat Kelulusan",target:100,realisasi:98.5,unit:"%",trend:"naik"},
    {nama:"Rata-Rata Nilai UN",target:80,realisasi:82.3,unit:"",trend:"naik"},
    {nama:"Kehadiran Siswa",target:95,realisasi:94.2,unit:"%",trend:"turun"},
    {nama:"Kehadiran Guru",target:97,realisasi:96.8,unit:"%",trend:"naik"},
    {nama:"Kepuasan Orang Tua",target:85,realisasi:87.4,unit:"%",trend:"naik"},
    {nama:"Penyerapan Anggaran",target:95,realisasi:71.8,unit:"%",trend:"naik"},
  ],
  schedule:[
    {waktu:"07:00–07:45",mapel:"Matematika",kelas:"XII-A",guru:"Drs. H. Sumarno"},
    {waktu:"07:45–08:30",mapel:"Fisika",kelas:"XI-A",guru:"Agus Permana"},
    {waktu:"08:30–09:15",mapel:"Kimia",kelas:"XI-B",guru:"Yuli Astuti"},
    {waktu:"09:15–10:00",mapel:"Bhs. Indonesia",kelas:"X-A",guru:"Sri Wahyuni"},
    {waktu:"10:15–11:00",mapel:"Sejarah",kelas:"X-B",guru:"Dedi Kurniawan"},
  ],
  kpiTrend:[
    {month:"Nov",siswa:93.1,guru:95.8},{month:"Des",siswa:91.5,guru:94.2},
    {month:"Jan",siswa:93.8,guru:96.1},{month:"Feb",siswa:94.5,guru:97.0},
    {month:"Mar",siswa:93.9,guru:96.5},{month:"Apr",siswa:94.2,guru:96.8},
  ],
};

const NAV=[
  {id:"dashboard",label:"Dashboard",icon:Home},
  {id:"siswa",label:"Data Siswa",icon:Users},
  {id:"kehadiran",label:"Jadwal & Kehadiran",icon:Calendar},
  {id:"keuangan",label:"Keuangan Sekolah",icon:DollarSign},
  {id:"staff",label:"Data Guru & Staff",icon:UserCheck},
  {id:"pengumuman",label:"Pengumuman",icon:Bell},
  {id:"akademik",label:"Nilai & Akademik",icon:BookOpen},
  {id:"perizinan",label:"Perizinan Guru",icon:FileText},
  {id:"masalah",label:"Daftar Masalah",icon:AlertCircle},
  {id:"pekerjaan",label:"Daftar Pekerjaan",icon:Briefcase},
  {id:"kpi",label:"KPI Sekolah",icon:Target},
];

const BADGE_STYLES={
  tinggi:{bg:"#FEF2F2",color:"#DC2626",border:"#FECACA"},
  sedang:{bg:"#FFFBEB",color:"#D97706",border:"#FDE68A"},
  rendah:{bg:"#F0FDF4",color:"#16A34A",border:"#BBF7D0"},
  aktif:{bg:"#EFF6FF",color:"#2563EB",border:"#BFDBFE"},
  proses:{bg:"#EFF6FF",color:"#2563EB",border:"#BFDBFE"},
  menunggu:{bg:"#FFFBEB",color:"#D97706",border:"#FDE68A"},
  disetujui:{bg:"#F0FDF4",color:"#16A34A",border:"#BBF7D0"},
  selesai:{bg:"#F9FAFB",color:"#6B7280",border:"#E5E7EB"},
  izin:{bg:"#FFF7ED",color:"#EA580C",border:"#FDBA74"},
};

const Badge=({children,color})=>{
  const s=BADGE_STYLES[color||children?.toLowerCase()]||BADGE_STYLES.sedang;
  return <span style={{background:s.bg,color:s.color,border:`1px solid ${s.border}`,padding:"2px 8px",borderRadius:999,fontSize:11,fontWeight:600,display:"inline-block",whiteSpace:"nowrap"}}>{children}</span>;
};

const Card=({children,style})=>(
  <div style={{background:"#fff",borderRadius:12,border:"1px solid #E2E8F0",padding:"1.25rem",...style}}>{children}</div>
);

const SectionTitle=({title,sub})=>(
  <div style={{marginBottom:14}}>
    <h2 style={{fontSize:15,fontWeight:700,color:"#0F172A",margin:0}}>{title}</h2>
    {sub&&<p style={{fontSize:12,color:"#64748B",margin:"3px 0 0"}}>{sub}</p>}
  </div>
);

const StatCard=({icon:Icon,label,value,sub,color,trend})=>(
  <Card style={{display:"flex",flexDirection:"column",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{width:42,height:42,borderRadius:10,background:color+"1A",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Icon size={19} color={color}/>
      </div>
      {!!trend&&<span style={{fontSize:12,fontWeight:600,color:trend>0?"#16A34A":"#DC2626",display:"flex",alignItems:"center",gap:2}}>
        {trend>0?<ArrowUp size={12}/>:<ArrowDown size={12}/>}{Math.abs(trend)}%
      </span>}
    </div>
    <div>
      <div style={{fontSize:22,fontWeight:700,color:"#0F172A",letterSpacing:"-0.5px"}}>{value}</div>
      <div style={{fontSize:13,color:"#64748B",marginTop:1}}>{label}</div>
      {sub&&<div style={{fontSize:11,color:"#94A3B8",marginTop:3}}>{sub}</div>}
    </div>
  </Card>
);

const DataTable=({headers,rows})=>(
  <div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
      <thead>
        <tr style={{background:"#F8FAFC",borderBottom:"1px solid #E2E8F0"}}>
          {headers.map((h,i)=><th key={i} style={{padding:"9px 12px",textAlign:"left",color:"#64748B",fontWeight:600,whiteSpace:"nowrap"}}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row,i)=>(
          <tr key={i} style={{borderBottom:"1px solid #F1F5F9"}}
            onMouseEnter={e=>e.currentTarget.style.background="#F8FAFC"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {row.map((cell,j)=><td key={j} style={{padding:"9px 12px",color:"#1E293B"}}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TT={contentStyle:{borderRadius:8,border:"1px solid #E2E8F0",fontSize:12}};

function ViewDashboard(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={Users} label="Total Siswa" value="847" sub="18 kelas aktif" color="#6366F1" trend={2.4}/>
        <StatCard icon={UserCheck} label="Kehadiran Hari Ini" value="94.2%" sub="798 dari 847 siswa" color="#10B981" trend={1.1}/>
        <StatCard icon={DollarSign} label="Pendapatan Bulan Ini" value="Rp 285jt" sub="Target: Rp 300jt" color="#F59E0B" trend={-5}/>
        <StatCard icon={Award} label="Guru & Staff" value="52" sub="48 aktif · 4 izin" color="#8B5CF6"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14}}>
        <Card>
          <SectionTitle title="Kehadiran Siswa Minggu Ini"/>
          <div style={{height:210}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA.attendance} margin={{top:5,right:8,left:-18,bottom:0}}>
                <defs>
                  <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.18}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="day" tick={{fontSize:12,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false} domain={[700,860]}/>
                <Tooltip {...TT}/>
                <Area type="monotone" dataKey="hadir" stroke="#6366F1" fill="url(#gH)" strokeWidth={2.5} name="Hadir"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Distribusi Nilai"/>
          <div style={{height:210}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA.gradeDistrib} margin={{top:5,right:8,left:-24,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                <XAxis dataKey="range" tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <Tooltip {...TT}/>
                <Bar dataKey="jumlah" fill="#6366F1" radius={[4,4,0,0]} name="Jumlah Siswa"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <SectionTitle title="Pengumuman Terbaru"/>
          {DATA.announcements.slice(0,4).map(a=>(
            <div key={a.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 0",borderBottom:"1px solid #F1F5F9"}}>
              <div style={{width:6,height:6,borderRadius:99,background:a.dibaca?"#CBD5E1":"#6366F1",marginTop:5,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:a.dibaca?400:600,color:"#1E293B"}}>{a.judul}</div>
                <div style={{fontSize:11,color:"#94A3B8",marginTop:1}}>{a.tanggal}</div>
              </div>
              <Badge color={a.prioritas}>{a.prioritas}</Badge>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle title="Masalah & Pekerjaan Aktif"/>
          {[...DATA.problems.filter(p=>p.status!=="selesai").slice(0,3),...DATA.tasks.filter(t=>t.status==="proses").slice(0,2)].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 0",borderBottom:"1px solid #F1F5F9"}}>
              {"progress" in item?<Briefcase size={14} color="#6366F1"/>:<AlertCircle size={14} color="#F59E0B"/>}
              <span style={{fontSize:13,color:"#1E293B",flex:1}}>{item.judul}</span>
              <Badge color={item.prioritas}>{item.prioritas}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function ViewSiswa(){
  const [search,setSearch]=useState("");
  const filtered=DATA.students.filter(s=>s.nama.toLowerCase().includes(search.toLowerCase())||s.kelas.toLowerCase().includes(search.toLowerCase()));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={Users} label="Total Siswa" value="847" color="#6366F1"/>
        <StatCard icon={Users} label="Laki-Laki" value="431" sub="50.9%" color="#3B82F6"/>
        <StatCard icon={Users} label="Perempuan" value="416" sub="49.1%" color="#EC4899"/>
        <StatCard icon={BookOpen} label="Jumlah Kelas" value="18" sub="6 per angkatan" color="#10B981"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"3fr 1fr",gap:14}}>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <SectionTitle title="Data Siswa"/>
            <div style={{display:"flex",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:8,padding:"5px 10px"}}>
                <Search size={13} color="#94A3B8"/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari siswa..." style={{border:"none",background:"transparent",fontSize:13,color:"#1E293B",outline:"none",width:120}}/>
              </div>
              <button style={{display:"flex",alignItems:"center",gap:4,background:"#6366F1",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Tambah</button>
            </div>
          </div>
          <DataTable
            headers={["No","Nama Siswa","Kelas","JK","Kehadiran","Status"]}
            rows={filtered.map((s,i)=>[i+1,s.nama,s.kelas,s.jk==="L"?"Laki-laki":"Perempuan",
              <span style={{color:s.kehadiran>=95?"#16A34A":s.kehadiran>=85?"#D97706":"#DC2626",fontWeight:600}}>{s.kehadiran}%</span>,
              <Badge color="aktif">aktif</Badge>
            ])}
          />
        </Card>
        <Card>
          <SectionTitle title="Siswa per Kelas"/>
          <div style={{height:290}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{kelas:"X-A",siswa:36},{kelas:"X-B",siswa:34},{kelas:"XI-A",siswa:38},{kelas:"XI-B",siswa:35},{kelas:"XII-A",siswa:32},{kelas:"XII-B",siswa:30}]} layout="vertical" margin={{left:0,right:16,top:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false}/>
                <XAxis type="number" tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="kelas" tick={{fontSize:12,fill:"#64748B"}} axisLine={false} tickLine={false} width={38}/>
                <Tooltip {...TT}/>
                <Bar dataKey="siswa" fill="#6366F1" radius={[0,4,4,0]} name="Jumlah"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ViewKehadiran(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={CheckCircle} label="Hadir Hari Ini" value="798" sub="94.2%" color="#10B981"/>
        <StatCard icon={AlertCircle} label="Tidak Hadir" value="49" sub="5.8%" color="#EF4444"/>
        <StatCard icon={Clock} label="Terlambat" value="12" sub="1.4%" color="#F59E0B"/>
        <StatCard icon={Calendar} label="Hari Efektif Bulan Ini" value="18" sub="April 2026" color="#6366F1"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14}}>
        <Card>
          <SectionTitle title="Tren Kehadiran Minggu Ini"/>
          <div style={{height:230}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA.attendance} margin={{top:5,right:8,left:-18,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                <XAxis dataKey="day" tick={{fontSize:12,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <Tooltip {...TT}/>
                <Bar dataKey="hadir" fill="#10B981" radius={[4,4,0,0]} name="Hadir"/>
                <Bar dataKey="absen" fill="#FCA5A5" radius={[4,4,0,0]} name="Absen"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Jadwal Hari Ini" sub="Rabu, 29 April 2026"/>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {DATA.schedule.map((s,i)=>(
              <div key={i} style={{padding:"8px 10px",borderRadius:8,background:i===1?"#EEF2FF":"#F8FAFC",border:`1px solid ${i===1?"#C7D2FE":"#E2E8F0"}`}}>
                <div style={{fontSize:10,color:"#6366F1",fontWeight:600}}>{s.waktu}</div>
                <div style={{fontSize:13,fontWeight:600,color:"#1E293B"}}>{s.mapel} · {s.kelas}</div>
                <div style={{fontSize:11,color:"#94A3B8"}}>{s.guru}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionTitle title="Kehadiran per Kelas Hari Ini"/>
        <DataTable
          headers={["Kelas","Wali Kelas","Hadir","Absen","Izin","Sakit","% Kehadiran"]}
          rows={[
            ["X-A","Sri Wahyuni, S.Pd",34,1,0,1,<span style={{color:"#16A34A",fontWeight:600}}>94.4%</span>],
            ["X-B","Dedi Kurniawan, S.Pd",32,2,0,0,<span style={{color:"#16A34A",fontWeight:600}}>94.1%</span>],
            ["XI-A","Yuli Astuti, S.Pd",37,0,1,0,<span style={{color:"#16A34A",fontWeight:600}}>97.4%</span>],
            ["XI-B","Fitri Handayani, S.Pd",33,2,0,0,<span style={{color:"#D97706",fontWeight:600}}>94.3%</span>],
            ["XII-A","Agus Permana, S.Pd",29,2,1,0,<span style={{color:"#D97706",fontWeight:600}}>90.6%</span>],
            ["XII-B","Rina Kusuma, S.Pd",28,1,0,1,<span style={{color:"#D97706",fontWeight:600}}>93.3%</span>],
          ]}
        />
      </Card>
    </div>
  );
}

function ViewKeuangan(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={DollarSign} label="Pemasukan Bulan Ini" value="Rp 285jt" color="#10B981" trend={-5}/>
        <StatCard icon={DollarSign} label="Pengeluaran Bulan Ini" value="Rp 205jt" color="#EF4444" trend={3}/>
        <StatCard icon={TrendingUp} label="Surplus" value="Rp 80jt" sub="Margin 28%" color="#6366F1"/>
        <StatCard icon={Award} label="Realisasi Anggaran" value="71.8%" sub="Target: 95%" color="#F59E0B"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:14}}>
        <Card>
          <SectionTitle title="Pemasukan vs Pengeluaran (6 Bulan)"/>
          <div style={{height:250}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA.finance} margin={{top:5,right:8,left:-14,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:12,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}jt`}/>
                <Tooltip {...TT} formatter={v=>[`Rp ${v}jt`]}/>
                <Bar dataKey="pemasukan" fill="#10B981" radius={[4,4,0,0]} name="Pemasukan"/>
                <Bar dataKey="pengeluaran" fill="#FCA5A5" radius={[4,4,0,0]} name="Pengeluaran"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Distribusi Anggaran"/>
          <div style={{height:190}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name:"Operasional",value:35},{name:"SDM/Gaji",value:40},{name:"Sarana",value:15},{name:"Kegiatan",value:10}]} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                  {C.map((c,i)=><Cell key={i} fill={c}/>)}
                </Pie>
                <Tooltip {...TT} formatter={v=>[`${v}%`]}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:6}}>
            {["Operasional 35%","SDM/Gaji 40%","Sarana 15%","Kegiatan 10%"].map((l,i)=>(
              <span key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#64748B"}}>
                <span style={{width:8,height:8,borderRadius:2,background:C[i],display:"inline-block"}}/>
                {l}
              </span>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionTitle title="Transaksi Terbaru"/>
        <DataTable
          headers={["Tanggal","Keterangan","Kategori","Tipe","Jumlah"]}
          rows={[
            ["28 Apr","Pembayaran SPP Batch April","Pemasukan",<Badge color="disetujui">Masuk</Badge>,"Rp 142.500.000"],
            ["27 Apr","Pengadaan ATK & Bahan Ajar","Operasional",<Badge color="menunggu">Keluar</Badge>,"Rp 8.750.000"],
            ["26 Apr","Gaji Guru & Staff April","SDM",<Badge color="menunggu">Keluar</Badge>,"Rp 185.000.000"],
            ["25 Apr","Dana BOS Triwulan I","Subsidi",<Badge color="disetujui">Masuk</Badge>,"Rp 95.000.000"],
            ["24 Apr","Perbaikan Sarana Lab","Sarana",<Badge color="menunggu">Keluar</Badge>,"Rp 12.300.000"],
          ]}
        />
      </Card>
    </div>
  );
}

function ViewStaff(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={UserCheck} label="Total Guru & Staff" value="52" color="#6366F1"/>
        <StatCard icon={UserCheck} label="Guru" value="38" sub="73.1%" color="#10B981"/>
        <StatCard icon={UserCheck} label="Tenaga Kependidikan" value="14" sub="26.9%" color="#F59E0B"/>
        <StatCard icon={Award} label="Bersertifikat Pendidik" value="31" sub="81.6% dari guru" color="#8B5CF6"/>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <SectionTitle title="Data Guru & Staff"/>
          <button style={{display:"flex",alignItems:"center",gap:4,background:"#6366F1",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Tambah</button>
        </div>
        <DataTable
          headers={["Nama","Jabatan","Bidang Studi","Status"]}
          rows={DATA.staff.map(s=>[
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:"#EEF2FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#6366F1",flexShrink:0}}>
                {s.nama.split(" ")[0][0]}{s.nama.split(" ")[1]?.[0]||""}
              </div>
              <span>{s.nama}</span>
            </div>,
            s.jabatan,s.bidang,<Badge color={s.status}>{s.status}</Badge>
          ])}
        />
      </Card>
    </div>
  );
}

function ViewPengumuman(){
  const [sel,setSel]=useState(null);
  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <SectionTitle title="Daftar Pengumuman"/>
          <button style={{display:"flex",alignItems:"center",gap:4,background:"#6366F1",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Buat</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {DATA.announcements.map(a=>(
            <div key={a.id} onClick={()=>setSel(a)} style={{padding:"10px 12px",borderRadius:8,border:`1px solid ${sel?.id===a.id?"#C7D2FE":"#E2E8F0"}`,background:sel?.id===a.id?"#EEF2FF":"#fff",cursor:"pointer",transition:"all 0.15s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{width:6,height:6,borderRadius:99,background:a.dibaca?"#CBD5E1":"#6366F1",flexShrink:0,marginTop:1}}/>
                  <span style={{fontSize:13,fontWeight:a.dibaca?400:600,color:"#1E293B"}}>{a.judul}</span>
                </div>
                <Badge color={a.prioritas}>{a.prioritas}</Badge>
              </div>
              <div style={{fontSize:11,color:"#94A3B8",marginTop:3,marginLeft:14}}>{a.tanggal}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        {sel?(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <Badge color={sel.prioritas}>{sel.prioritas}</Badge>
              <span style={{fontSize:12,color:"#94A3B8"}}>{sel.tanggal}</span>
            </div>
            <h3 style={{fontSize:15,fontWeight:700,color:"#0F172A",marginBottom:12}}>{sel.judul}</h3>
            <p style={{fontSize:13,color:"#475569",lineHeight:1.8}}>
              Kepada seluruh civitas akademika SMAN 1 Bekasi, diberitahukan bahwa <strong>{sel.judul}</strong> akan segera dilaksanakan. Harap memperhatikan dan mempersiapkan diri dengan sebaik-baiknya. Kehadiran dan partisipasi aktif dari seluruh pihak sangat diharapkan demi kelancaran kegiatan ini. Informasi lebih lanjut dapat menghubungi Tata Usaha.
            </p>
            <div style={{marginTop:16,padding:"10px 12px",background:"#F8FAFC",borderRadius:8,fontSize:12,color:"#64748B"}}>
              Ditujukan kepada: <strong style={{color:"#1E293B"}}>Seluruh Guru & Staff</strong>
            </div>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,color:"#94A3B8"}}>
            <Bell size={38} strokeWidth={1.5}/>
            <p style={{marginTop:10,fontSize:13}}>Pilih pengumuman untuk melihat detail</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function ViewAkademik(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={Award} label="Rata-Rata Nilai Sekolah" value="83.1" color="#6366F1" trend={2.3}/>
        <StatCard icon={CheckCircle} label="Nilai Tertinggi" value="97.8" sub="Lestari W. – XI-B" color="#10B981"/>
        <StatCard icon={BookOpen} label="Siswa Nilai A" value="142" sub="16.8% dari total" color="#F59E0B"/>
        <StatCard icon={AlertCircle} label="Perlu Perhatian" value="58" sub="Nilai < 60" color="#EF4444"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <SectionTitle title="Rata-Rata Nilai per Kelas"/>
          <div style={{height:230}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA.grades} margin={{top:5,right:8,left:-14,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
                <XAxis dataKey="kelas" tick={{fontSize:12,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false} domain={[70,95]}/>
                <Tooltip {...TT}/>
                <Bar dataKey="rata" fill="#6366F1" radius={[4,4,0,0]} name="Rata-rata"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Distribusi Nilai Siswa"/>
          <div style={{height:230}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DATA.gradeDistrib} cx="50%" cy="50%" outerRadius={88} paddingAngle={3} dataKey="jumlah" nameKey="range">
                  {["#10B981","#6366F1","#F59E0B","#EF4444","#94A3B8"].map((c,i)=><Cell key={i} fill={c}/>)}
                </Pie>
                <Tooltip {...TT}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
            {DATA.gradeDistrib.map((d,i)=>(
              <span key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#64748B"}}>
                <span style={{width:8,height:8,borderRadius:2,background:["#10B981","#6366F1","#F59E0B","#EF4444","#94A3B8"][i],display:"inline-block"}}/>
                {d.range}
              </span>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionTitle title="Peringkat Siswa Terbaik"/>
        <DataTable
          headers={["Peringkat","Nama Siswa","Kelas","Nilai Rata-Rata","Mapel Terbaik"]}
          rows={[
            [<span style={{fontWeight:700,color:"#D97706"}}>1</span>,"Lestari Wulandari","XI-B",<span style={{fontWeight:700,color:"#16A34A"}}>97.8</span>,"Matematika"],
            [<span style={{fontWeight:600,color:"#6B7280"}}>2</span>,"Siti Nurhaliza","XII-B",<span style={{fontWeight:700,color:"#16A34A"}}>96.2</span>,"Bhs. Indonesia"],
            ["3","Dewi Rahayu","XI-B","95.1","Kimia"],
            ["4","Ahmad Fauzi","XII-A","93.7","Fisika"],
            ["5","Maya Sari","XI-A","92.4","Biologi"],
          ]}
        />
      </Card>
    </div>
  );
}

function ViewPerizinan(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={CheckCircle} label="Disetujui Bulan Ini" value="8" color="#10B981"/>
        <StatCard icon={Clock} label="Menunggu Persetujuan" value="2" color="#F59E0B"/>
        <StatCard icon={FileText} label="Total Izin Bulan Ini" value="11" color="#6366F1"/>
        <StatCard icon={AlertCircle} label="Ditolak" value="1" color="#EF4444"/>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <SectionTitle title="Daftar Perizinan Guru"/>
          <button style={{display:"flex",alignItems:"center",gap:4,background:"#6366F1",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Ajukan Izin</button>
        </div>
        <DataTable
          headers={["Nama Guru","Jenis Izin","Mulai","Selesai","Status","Aksi"]}
          rows={DATA.leaves.map(l=>[
            l.nama,l.jenis,l.mulai,l.akhir,
            <Badge color={l.status}>{l.status}</Badge>,
            l.status==="menunggu"?(
              <div style={{display:"flex",gap:6}}>
                <button style={{background:"#10B981",color:"#fff",border:"none",borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>Setujui</button>
                <button style={{background:"#EF4444",color:"#fff",border:"none",borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>Tolak</button>
              </div>
            ):<span style={{fontSize:12,color:"#94A3B8"}}>—</span>
          ])}
        />
      </Card>
    </div>
  );
}

function ViewMasalah(){
  const [search,setSearch]=useState("");
  const filtered=DATA.problems.filter(p=>p.judul.toLowerCase().includes(search.toLowerCase())||p.kategori.toLowerCase().includes(search.toLowerCase()));
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={AlertCircle} label="Masalah Aktif" value={DATA.problems.filter(p=>p.status!=="selesai").length} color="#EF4444"/>
        <StatCard icon={Clock} label="Dalam Proses" value={DATA.problems.filter(p=>p.status==="proses").length} color="#F59E0B"/>
        <StatCard icon={AlertTriangle} label="Prioritas Tinggi" value={DATA.problems.filter(p=>p.prioritas==="tinggi").length} color="#DC2626"/>
        <StatCard icon={CheckCircle} label="Selesai Bulan Ini" value={DATA.problems.filter(p=>p.status==="selesai").length} color="#10B981"/>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <SectionTitle title="Daftar Isian Masalah"/>
          <div style={{display:"flex",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:8,padding:"5px 10px"}}>
              <Search size={13} color="#94A3B8"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari masalah..." style={{border:"none",background:"transparent",fontSize:13,color:"#1E293B",outline:"none",width:130}}/>
            </div>
            <button style={{display:"flex",alignItems:"center",gap:4,background:"#EF4444",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Laporkan</button>
          </div>
        </div>
        <DataTable
          headers={["ID","Judul Masalah","Kategori","Prioritas","Status","Tanggal"]}
          rows={filtered.map(p=>[
            <span style={{fontFamily:"monospace",fontSize:12,color:"#6366F1",fontWeight:600}}>{p.id}</span>,
            p.judul,p.kategori,
            <Badge color={p.prioritas}>{p.prioritas}</Badge>,
            <Badge color={p.status}>{p.status}</Badge>,
            p.tanggal
          ])}
        />
      </Card>
    </div>
  );
}

function ViewPekerjaan(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        <StatCard icon={Briefcase} label="Total Pekerjaan" value={DATA.tasks.length} color="#6366F1"/>
        <StatCard icon={Clock} label="Dalam Proses" value={DATA.tasks.filter(t=>t.status==="proses").length} color="#F59E0B"/>
        <StatCard icon={CheckCircle} label="Selesai" value={DATA.tasks.filter(t=>t.status==="selesai").length} color="#10B981"/>
        <StatCard icon={AlertCircle} label="Belum Dimulai" value={DATA.tasks.filter(t=>t.status==="menunggu").length} color="#94A3B8"/>
      </div>
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <SectionTitle title="Daftar Isian Pekerjaan"/>
          <button style={{display:"flex",alignItems:"center",gap:4,background:"#6366F1",color:"#fff",border:"none",borderRadius:8,padding:"5px 12px",fontSize:13,cursor:"pointer"}}><Plus size={13}/> Tambah</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {DATA.tasks.map(t=>(
            <div key={t.id} style={{padding:"12px 14px",borderRadius:10,border:"1px solid #E2E8F0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontFamily:"monospace",fontSize:11,color:"#94A3B8"}}>{t.id}</span>
                  <span style={{fontSize:14,fontWeight:600,color:"#1E293B"}}>{t.judul}</span>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <Badge color={t.prioritas}>{t.prioritas}</Badge>
                  <Badge color={t.status}>{t.status}</Badge>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <div style={{display:"flex",gap:14,fontSize:12,color:"#64748B"}}>
                  <span>👤 {t.assignee}</span>
                  <span>📅 {t.deadline}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,flex:1,maxWidth:200}}>
                  <div style={{flex:1,height:6,borderRadius:99,background:"#F1F5F9",overflow:"hidden"}}>
                    <div style={{width:`${t.progress}%`,height:"100%",borderRadius:99,background:t.progress===100?"#10B981":t.progress>50?"#6366F1":"#F59E0B",transition:"width 0.5s"}}/>
                  </div>
                  <span style={{fontSize:12,color:"#64748B",minWidth:28}}>{t.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ViewKPI(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <Card>
        <SectionTitle title="Ringkasan KPI Sekolah" sub="Periode: Semester Genap 2025/2026"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
          {DATA.kpi.map((k,i)=>{
            const pct=Math.min((k.realisasi/k.target)*100,100);
            const ok=k.realisasi>=k.target;
            return(
              <div key={i} style={{padding:"14px",borderRadius:10,border:"1px solid #E2E8F0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:"#1E293B"}}>{k.nama}</div>
                    <div style={{fontSize:11,color:"#94A3B8",marginTop:2}}>Target: {k.target}{k.unit}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:22,fontWeight:700,color:ok?"#16A34A":"#DC2626",lineHeight:1}}>{k.realisasi}{k.unit}</div>
                    <div style={{display:"flex",alignItems:"center",gap:2,fontSize:11,color:k.trend==="naik"?"#16A34A":"#DC2626",marginTop:2,justifyContent:"flex-end"}}>
                      {k.trend==="naik"?<TrendingUp size={11}/>:<TrendingDown size={11}/>}
                      {k.trend==="naik"?"Naik":"Turun"}
                    </div>
                  </div>
                </div>
                <div style={{height:6,borderRadius:99,background:"#F1F5F9",overflow:"hidden"}}>
                  <div style={{width:`${pct.toFixed(0)}%`,height:"100%",borderRadius:99,background:ok?"#10B981":pct>80?"#F59E0B":"#EF4444"}}/>
                </div>
                <div style={{fontSize:11,color:"#94A3B8",marginTop:4,textAlign:"right"}}>{pct.toFixed(1)}% dari target</div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        <SectionTitle title="Tren Kehadiran 6 Bulan Terakhir"/>
        <div style={{height:210}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DATA.kpiTrend} margin={{top:5,right:8,left:-14,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
              <XAxis dataKey="month" tick={{fontSize:12,fill:"#94A3B8"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:"#94A3B8"}} axisLine={false} tickLine={false} domain={[88,100]} tickFormatter={v=>`${v}%`}/>
              <Tooltip {...TT} formatter={v=>[`${v}%`]}/>
              <Line type="monotone" dataKey="siswa" stroke="#6366F1" strokeWidth={2.5} dot={{r:4,fill:"#6366F1"}} name="Kehadiran Siswa"/>
              <Line type="monotone" dataKey="guru" stroke="#10B981" strokeWidth={2.5} dot={{r:4,fill:"#10B981"}} name="Kehadiran Guru"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{display:"flex",gap:16,marginTop:8,paddingLeft:8}}>
          {[{label:"Kehadiran Siswa",color:"#6366F1"},{label:"Kehadiran Guru",color:"#10B981"}].map((l,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#64748B"}}>
              <span style={{width:10,height:10,borderRadius:2,background:l.color,display:"inline-block"}}/>
              {l.label}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

const VIEWS={
  dashboard:{C:ViewDashboard,title:"Dashboard Overview",sub:"Selamat datang, Kepala Sekolah. Berikut ringkasan sekolah hari ini."},
  siswa:{C:ViewSiswa,title:"Data Siswa",sub:"Kelola data dan informasi seluruh siswa"},
  kehadiran:{C:ViewKehadiran,title:"Jadwal & Kehadiran",sub:"Pantau kehadiran harian dan jadwal pelajaran"},
  keuangan:{C:ViewKeuangan,title:"Keuangan Sekolah",sub:"Rekap pemasukan, pengeluaran, dan realisasi anggaran"},
  staff:{C:ViewStaff,title:"Data Guru & Staff",sub:"Kelola data seluruh guru dan tenaga kependidikan"},
  pengumuman:{C:ViewPengumuman,title:"Pengumuman",sub:"Buat dan kelola pengumuman untuk civitas akademika"},
  akademik:{C:ViewAkademik,title:"Nilai & Akademik",sub:"Pantau perkembangan akademik siswa secara menyeluruh"},
  perizinan:{C:ViewPerizinan,title:"Perizinan Guru",sub:"Kelola permohonan izin dan cuti guru"},
  masalah:{C:ViewMasalah,title:"Daftar Isian Masalah",sub:"Laporan dan tindak lanjut masalah di lingkungan sekolah"},
  pekerjaan:{C:ViewPekerjaan,title:"Daftar Isian Pekerjaan",sub:"Pantau progres tugas dan pekerjaan seluruh tim"},
  kpi:{C:ViewKPI,title:"KPI Sekolah",sub:"Key Performance Indicator semester berjalan"},
};

export default function App(){
  const [active,setActive]=useState("dashboard");
  const cur=VIEWS[active];
  const ViewComponent=cur.C;

  return(
    <div style={{display:"flex",minHeight:"100vh",background:"#F1F5F9",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif"}}>

      {/* ── Sidebar */}
      <aside style={{width:240,background:"#0F172A",display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0,zIndex:20}}>
        <div style={{padding:"18px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:9,background:"#6366F1",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <BookOpen size={17} color="#fff"/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.2}}>SMAN 1 Bekasi</div>
              <div style={{fontSize:10,color:"#475569",marginTop:1}}>Sistem Manajemen Sekolah</div>
            </div>
          </div>
        </div>

        <nav style={{flex:1,padding:"10px 8px",overflowY:"auto"}}>
          {NAV.map(item=>{
            const Icon=item.icon;
            const isActive=active===item.id;
            return(
              <button key={item.id} onClick={()=>setActive(item.id)} style={{
                display:"flex",alignItems:"center",gap:9,width:"100%",
                padding:"8px 12px",borderRadius:8,border:"none",cursor:"pointer",
                background:isActive?"rgba(99,102,241,0.15)":"transparent",
                color:isActive?"#A5B4FC":"#64748B",
                fontSize:13,fontWeight:isActive?600:400,
                marginBottom:1,textAlign:"left",transition:"all 0.15s"
              }}
              onMouseEnter={e=>{if(!isActive){e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="#94A3B8";}}}
              onMouseLeave={e=>{if(!isActive){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#64748B";}}}>
                <Icon size={15}/>
                <span style={{flex:1}}>{item.label}</span>
                {isActive&&<div style={{width:5,height:5,borderRadius:99,background:"#6366F1"}}/>}
              </button>
            );
          })}
        </nav>

        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#6366F1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",flexShrink:0}}>KS</div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#E2E8F0"}}>Drs. H. Mulyadi, M.Pd</div>
              <div style={{fontSize:10,color:"#475569"}}>Kepala Sekolah</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main */}
      <main style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <header style={{background:"#fff",borderBottom:"1px solid #E2E8F0",padding:"13px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
          <div>
            <h1 style={{fontSize:17,fontWeight:700,color:"#0F172A",margin:0}}>{cur.title}</h1>
            <p style={{fontSize:12,color:"#94A3B8",margin:"2px 0 0"}}>{cur.sub}</p>
          </div>
          <div style={{display:"flex",gap:9,alignItems:"center"}}>
            <div style={{fontSize:12,color:"#64748B",background:"#F8FAFC",border:"1px solid #E2E8F0",padding:"5px 12px",borderRadius:8}}>Rabu, 29 April 2026</div>
            <button style={{position:"relative",background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:8,padding:"6px 8px",cursor:"pointer",display:"flex"}}>
              <Bell size={15} color="#64748B"/>
              <span style={{position:"absolute",top:5,right:5,width:6,height:6,borderRadius:99,background:"#EF4444",border:"1.5px solid #fff"}}/>
            </button>
          </div>
        </header>
        <div style={{flex:1,padding:"20px 24px",overflowY:"auto"}}>
          <ViewComponent/>
        </div>
      </main>
    </div>
  );
}
