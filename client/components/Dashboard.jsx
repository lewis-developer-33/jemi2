import React from 'react'
import { PieChart, Pie, Sector,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const spots = [
        {
            name:"Lewis Gitonga",
            issue:"My sink broke",
            date:"03-June"
        },
        {
            name:"Lewis Gitonga",
            issue:"My sink broke",
            date:"03-June"
        },
        {
            name:"Lewis Gitonga",
            issue:"My sink broke",
            date:"03-June"
        },
        {
            name:"Lewis Gitonga",
            issue:"My sink broke",
            date:"03-June"
        },
    ]
    const userName = localStorage.getItem('name')

  return (
    <div className='flex items-center h-screen'>
        <section id='sidebar' className='bg-blue-800 text-white h-screen rounded-r-md flex flex-col pl-4 py-8 font-semibold w-[350px]'>
            <div className='text-xl'>
                Gift Apartment
                <div className=' my-2 border-2 w-full'>

                </div>
            </div>
            <div className='grid gap-4 mt-8 text-lg'>
                <a href="/dashboard">Dashboard</a>
                <a href="/apartments">Apartments</a>
                <a href="/tenants">Tenants</a>
                <a href="/">Notifications</a>
                <a href="/">Maintenance</a>
                <a href="/">Reports</a>
                <a href="/payment">Payment</a>
            </div>
        </section>
        <section className='mx-auto max-w-[4xl] '>
            <div className=' fixed top-8 right-8 flex items-center justify-center p-2 rounded-full h-10 w-10 bg-slate-900 text-white'>
                {userName[0]}
            </div>
            <main className='grid gap-5'>
                <section>
                    <div className='p-4 rounded-sm shadow-md border-2 border-blue-800 w-[700px] h-[400px]'>
                        <Chart/>
                    </div>
                    {/* <div className='p-4 rounded-sm shadow-md border-2 border-blue-800'>

                    </div> */}
                </section>
                <section className='p-4 w-[700px] rounded-sm shadow-md border-2 bg-blue-800 text-white'>
                    <div className='flex items-center gap-5 mb-8'>
                        <button className='px-4 py-2 rounded-sm border-2 border-white hover:bg-white hover:text-blue-800'>Maintenance</button>
                        <button className='px-4 py-2 rounded-sm border-2 border-white hover:bg-white hover:text-blue-800'>Notification</button>
                    </div>
                    <div className='grid gap-4 '>
                        {
                            spots.map((d,i) => {
                                const {name,issue,date} =d
                                return(
                                <div key={i} className='flex items-center  w-full font-semibold gap-20'>
                                    <div>{name}</div>
                                    <div>{issue}</div>
                                    <div>{date}</div>
                                </div>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
        </section>
    </div>
  )
}

const Chart = () => {
    const data = [
        {
          name: 'Jan',
          uv: 4000,
          kes: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          uv: 3000,
          kes: 1398,
          amt: 2210,
        },
        {
          name: 'Mar',
          uv: 2000,
          kes: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          kes: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          kes: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          uv: 2390,
          kes: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          uv: 3490,
          kes: 4300,
          amt: 2100,
        },
      ];
      
    return(
        <ResponsiveContainer width="100%" height="100%">
            <h2 className='font-semibold text-lg my-2 '>Rent over the months</h2>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="kes" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    )
}


export default Dashboard