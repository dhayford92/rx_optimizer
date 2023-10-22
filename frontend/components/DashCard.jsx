import Image from 'next/image'

export default function DashCard({color, title, description, icon}) {
  return (
    <div className={`h-[220px] flex flex-col justify-between border-2 bg-white rounded-md border-${color}-500`}>
        <div className='flex flex-1 flex-col justify-center items-center gap-5 p-5'>
            <Image src={icon} width={50} height={50} alt='health'/>
            <h1 className='font-semibold text-xl'>{title}</h1>
            <p className='font-medium text-md'>{description}</p>
        </div>
        <div className={`w-full h-10 flex justify-center items-center bg-${color}-500`}>
            <span>View Details Reports</span>
        </div>
    </div>
  )
}


export function DashCard2({title, spanTitle, value1, value2, value3, subtitle1, subtitle2, subtitle3}) {
  return (
    <div className='flex flex-col items-start justify-center border-2 border-gray-400 space-y-2'>
      <div className='w-full flex justify-between items-center p-4'>
        <h1 className='font-semibold text-xl'>
          {title}
        </h1>
        {spanTitle && <span className='text-gray-800'>{spanTitle}</span>}
      </div>
      
      <div className='border-2 w-full border-gray-500'/>
      <div className='flex flex-row justify-between items-center w-full p-4'>
        {subtitle1 && 
          <div className='flex flex-col text-gray-800'>
            {value1 && <span className=' font-bold text-xl'>{value1}</span>}
            {subtitle1 && <span className='font-medium text-lg'>{subtitle1}</span>}
          </div> 
        }
        {subtitle2 && 
          <div className='flex flex-col text-gray-800'>
            {value2 && <span className=' font-bold text-xl'>{value2}</span>}
            {subtitle2 && <span className='font-medium text-lg'>{subtitle2}</span>}
          </div>
        }
        {subtitle3 && 
          <div className='flex flex-col text-gray-800'>
            {value3 && <span className=' font-bold text-xl'>{value3}</span>}
            {subtitle3 && <span className='font-medium text-lg'>{subtitle3}</span>}
          </div>
        }
      </div>
    </div>
  );
}
