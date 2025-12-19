
import { brandOptions, catogoryOptions, sortOptions } from '../../utils/inputObjects'

const ProductFilter = ({ fillterOpen, handleFilter, handlesort, setFilterOpen, filters, setFilters, sort, setSort }) => {
    return (
        <>
            {/* <!-- Fixed Filter Panel on the Right --> */}
            <div className={`w-64 bg-white shadow-lg p-5 transform md:translate-x-0 hover-duration h-screen ${fillterOpen ? " translate-x-0" : " translate-x-full"} right-0 md:left-0 z-[100] fixed md:sticky top-12 overflow-y-auto`}>
                {/* <!-- Filter Title --> */}
                <div className='border-b border-gray-300 w-full mb-4 flex justify-between '>
                    <h3 className="text-lg font-bold text-gray-800   pb-2">Filters</h3>
                    <button onClick={() => setFilterOpen(!fillterOpen)} className='text-white md:hidden hover-duration hover:bg-cyan-700 h-7  bg-black text-xs px-3 py-0.5 rounded-lg font-bold'>Close</button>
                </div>
                {/* <!-- Sort Options --> */}
                <div className="mb-6  ">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Sort By</h4>
                    <div className="space-y-2">
                        {sortOptions.map((value) => (
                            <label key={value.value} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    checked={sort === value.value}
                                    onChange={() => handlesort(value.value)}
                                    name="sort"
                                    className="mr-2 text-blue-600"
                                />
                                {value.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* <!-- Category Options --> */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                    <div className="space-y-2">
                        {
                            catogoryOptions.map((value, index) => (
                                <label key={index} className="flex items-center text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                    <input type="checkbox" checked={ filters?.['category']?.includes(value.value) || false} onChange={() => handleFilter("category", value.value)} className="mr-2 text-blue-600" />
                                    {value.label}
                                </label>
                            ))
                        }
                    </div>
                </div>

                {/* <!-- Brand Options --> */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Brand</h4>
                    <div className="space-y-2">
                        {
                            brandOptions.map((value, index) => (
                                <label key={index} className="flex items-center text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                    <input type="checkbox" checked={filters?.['brand']?.includes(value.value) || false} onChange={() => handleFilter("brand", value.value)} className="mr-2 text-blue-600" />
                                    {value.label}
                                </label>
                            ))
                        }
                    </div>
                </div>

                {/* <!-- Apply Button --> */}
                {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                    Apply Filters
                </button>

            
                <button className="w-full mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition">
                    Reset Filters
                </button> */}
            </div>

        </>
    )
}

export default ProductFilter
