export default function setSubjectColor(subject, type = '') {
  //
  const colors = {
    'AnwP-Python T2': `bg-[#FCD677]/95 hover:bg-[#FFD058]/95`,
    'AnwP-Python': `bg-[#FCD677]/95 hover:bg-[#FFD058]/95`,
    'ITT-Net': 'bg-[#89E7B5]/95 hover:bg-[#7FFDBA]/95',
    'BGP-HK': 'bg-[#89E7B5]/95 hover:bg-[#7FFDBA]/95',
    'AnwP-DBSQL': 'bg-[#FFA2AD]/95 hover:bg-[#FF8D9A]/95',
    'WS-LAT': 'bg-[#FFA2AD]/95 hover:bg-[#FF8D9A]/95',
    'BGP-MuKb': 'bg-[#9CB3D5]/95 hover:bg-[#95BFFF]/95',
    'BGP-Rewe': 'bg-[#9CB3D5]/95 hover:bg-[#95BFFF]/95',
    'BGP-Wiso': 'bg-[#FAAA86]/95 hover:bg-[#FF9D70]/95',
    'BGP-KomITIL': 'bg-[#89E7B5]/95 hover:bg-[#7FFDBA]/95',
    Praxis: 'bg-[#626569] dark:bg-accent-2',
  }

  if (type === 'LEK/Prüfung') return 'bg-rose-400 hover:bg-rose-300'

  if (!(subject in colors)) return 'bg-amber-300 hover:bg-amber-200'

  return colors[subject]
}
