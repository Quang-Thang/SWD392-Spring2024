import { Button } from '@mui/material'
import { FaSync } from 'react-icons/fa'
import { OverviewSales } from './Graph/LineChart'
import { UserRoles } from './Graph/PieChart'

export default function GraphDashboard({linegraph, piegraph}) {
  return (
    <div className='grid gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className="bg-white shadow-sm p-6 border rounded-lg col-span-2">
            <div className='flex justify-between gap-4  space-y-8'>
                <h2 className="text-slate-700 text-2xl font-bold">
                    Sales
                </h2>
                <Button
                  color="inherit"
                  size="small"
                  startIcon={(
                    <FaSync />
                  )}
                >
                  Sync
                </Button>
            </div>
            <OverviewSales
              chartSeries={linegraph}
              sx={{ height: '100%' }}
            />
        </div>
        <div className="bg-white shadow-sm p-6 border rounded-lg col-span-1 space-y-8">
            <h2 className="text-slate-700 text-2xl font-bold">
                User Roles
            </h2>
            <UserRoles
              chartSeries={piegraph}
              labels={['Customer', 'Staff', 'Admin']}
              sx={{ height: '100%' }}
            />
        </div>
    </div>
  )
}
