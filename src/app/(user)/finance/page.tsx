"use client";

import React, { useState} from 'react'

interface ReportInfo {
label: string,
link: string
}

const page = () => {
    const reports: ReportInfo[] = [
        { label: '2020-2021', link: 'https://drive.google.com/file/d/1uro2u9VKLvezqUz9FekK6zm81wX96lCB/preview' },
        { label: '2021-2022', link: 'https://drive.google.com/file/d/1uro2u9VKLvezqUz9FekK6zm81wX96lCB/preview' },
        { label: '2022-2023', link: 'https://drive.google.com/file/d/1aFFMZAwqHLHuLusUXQTaHmnqbpqASJ4Z/preview' },
        { label: '2023-2024', link: 'https://drive.google.com/file/d/1uro2u9VKLvezqUz9FekK6zm81wX96lCB/preview' },
      ];
      const [selectBtn, setSelectBtn] = useState<ReportInfo | null>(reports[reports.length - 1] || null);
      
    return (
    <div className="flex min-h-screen flex-col">
      <main className="mt-20 flex-grow px-4 md:px-20">
        <h1 className="my-10 text-center text-4xl font-bold text-primary">Financial Reports</h1>
        <p className="py-6 text-lg text-center">View past financial reports here.</p>
     
        <div className='flex flex-wrap justify-center items-center'>
        {reports.map((report, index) => (
          
            <button className={`shadow-lg btn  btn-secondary text-primary mx-4  ${selectBtn?.label === report.label ? 'btn' : ' bg-[#f1f5f9] border-none'} `}
             onClick={() => setSelectBtn(report)}>
              {report.label}
            </button>
        ))}
        </div>
     {selectBtn && (
        <div>
        <p className='my-6 text-center text-2xl font-bold text-secondary'>{selectBtn.label} Report</p>
        <div className="max-w-xl mx-auto TRANSFORM- relative w-full justify-center overflow-hidden rounded-md border-2 border-base-300  bg-base-100">
            <iframe
              width="100%"
              height="600px"
              src={selectBtn.link}
              allowFullScreen
            />
        </div>
    </div>
      )}  
         
      </main>

    </div>
  )
}

export default page