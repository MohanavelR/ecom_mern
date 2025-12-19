import { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import NotAvailable from '../../components/common/NotAvailable'
import { useDispatch, useSelector } from 'react-redux';
import AdminOrder from '../admin-view/AdminOrderView';
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';
import { resetOrderDetails, useGetOrderDetails } from '../../store/order-slice';

const AccountTap = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { addressList, isLoading } = useSelector(state => state.address)
  const { orderList, isLoading: orderLoading } = useSelector(state => state.order)
  const [addressFormOpen, setaddressFormOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editAddress, seteditAddress] = useState(null)
  const dispatch = useDispatch()
  const [openDetailOfOrder, setOpenDetailOfOrder] = useState(false)
  const detailOfOrderCancel = () => {
    setOpenDetailOfOrder(!openDetailOfOrder)
    dispatch(resetOrderDetails())
  }
  const OpenDetailOrderMethod = (orderId) => {
    if (orderId) {
      dispatch(useGetOrderDetails(orderId)).then((data) => {
        if (data?.payload?.isSuccess) {
          setOpenDetailOfOrder(!openDetailOfOrder)
        }
      })
    }
  }


  function editFormOpen(edAddress) {
    setEditMode(true)
    seteditAddress(edAddress)
    setaddressFormOpen(true)
  }

  return (
    <>
      {/* Full-width banner image */}
      {
        addressFormOpen &&
        <div className='fixed flex justify-center items-center z-[901] bg-black/70  inset-0 '>
          <AddressForm setEditMode={setEditMode} editAddress={editAddress} seteditAddress={seteditAddress} editMode={editMode} addressFormOpen={addressFormOpen} setaddressFormOpen={setaddressFormOpen} />
        </div>
      }
      <div className="mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab navigation */}
          <div className="flex border-b space-x-7 border-gray-200">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex py-4 px-6 text-center font-medium  ${activeTab === 'orders'
                  ? 'text-blue-600 bg-gray-200  border-x rounded-t-lg border-t border-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={` py-4 px-6 text-center font-medium  ${activeTab === 'address'
                  ? 'text-blue-600 bg-gray-200  border-x rounded-t-lg border-t border-gray-300'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Address
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'orders' ? (

              <div>
                <OrderCard orderList={orderList} OpenDetailOrderMethod={OpenDetailOrderMethod} />
                {
                  openDetailOfOrder &&
                  <OrderDetail detailOfOrderCancel={detailOfOrderCancel} />
                }

              </div>

            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Addresses</h2>
                {
                  isLoading ? <div className='w-full flex justify-center '>
                    <div className='loader'></div>
                  </div> :
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                      {
                        (addressList && addressList.length) ?
                          addressList.map((address, index) => (
                            <AddressCard editFormOpen={editFormOpen} key={index} address={address} />
                          ))
                          : <NotAvailable />
                      }
                    </div>
                }

                {
                  (addressList && addressList.length >= 3) ? <p className='text-red-400'>You can only add up to 3 addresses.</p> :
                    <button onClick={() => setaddressFormOpen(!addressFormOpen)} className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add New Address
                    </button>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTap;