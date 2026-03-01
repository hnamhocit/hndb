import AddDataSourceDialog from './AddDataSourceDialog'
import DataSources from './DataSources'

const Sidebar = () => {
	return (
		<div className='shrink-0 w-92 border-r overflow-y-scroll'>
			<div className='h-12 border-b p-4 flex items-center justify-between'>
				<div className='text-xl font-bold'>Connections</div>

				<AddDataSourceDialog />
			</div>

			<DataSources />
		</div>
	)
}

export default Sidebar
