import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deepcopy } from '../../utils/deepCopy';
import { useAddAddress, useEditAddress, useFetchAddresses } from '../../store/shop/address-slice';
import { MessageContaxt } from '../../context/message_context';
const initialData = {
  address: '',
  city: '',
  pincode: '',
  phone: '',
  notes: '',
}
const addressErrors = {
  address: { isRequired: false },
  city: { isRequired: false },
  pincode: { isRequired: false, invalid: false },
  phone: { isRequired: false, invalid: false },
  notes: { isRequired: false }
};

const AddressForm = ({ addressFormOpen, setaddressFormOpen, editAddress, seteditAddress, editMode, setEditMode }) => {
  const dispatch = useDispatch();
  const { setIsSuccess, setMessage, setMessageDisplay } = useContext(MessageContaxt);
  const { user } = useSelector(state => state.auth)
  const [formData, setFormData] = useState(deepcopy(initialData));
  const [fieldErrors, setFieldErrors] = useState(deepcopy(addressErrors));
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (editMode) {
      setFormData(editAddress || deepcopy(initialData))
    }
  }, [editAddress])

 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let hasError = false;
    const errors = deepcopy(addressErrors);

    if (!formData.address.trim()) {
      errors.address.isRequired = true;
      hasError = true;
    }

    if (!formData.city.trim()) {
      errors.city.isRequired = true;
      hasError = true;
    }

    if (!formData.pincode.trim()) {
      errors.pincode.isRequired = true;
      hasError = true;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode.invalid = true;
      hasError = true;
    }

    if (!formData.phone.trim()) {
      errors.phone.isRequired = true;
      hasError = true;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone.invalid = true;
      hasError = true;
    }

    if (!formData.notes.trim()) {
      errors.notes.isRequired = true;
      hasError = true;
    }
    if (!hasError) {
      (editMode ? dispatch(useEditAddress({ userId: user.id, addressId: formData?._id, formData })) :
        dispatch(useAddAddress({ ...formData, userId: user.id }))).then((data) => {
          if (data?.payload?.isSuccess) {
            setMessageDisplay(true);
            setaddressFormOpen(false)
            setMessage(data.payload.message);
            dispatch(useFetchAddresses(user.id))
            setEditMode(false)
            seteditAddress(null)
            setIsSuccess(true);
            setFormData(deepcopy(initialData));
          } else {
            setMessageDisplay(true);
            setMessage(data.payload.message || 'Something went wrong');
            setIsSuccess(false);
          }
          setIsLoading(false);
        });
    }
    setFieldErrors({ ...errors });
    setIsLoading(false);
    setTimeout(() => setFieldErrors(deepcopy(addressErrors)), 3000);
    return;
  };

  return (
    <div className="bg-white  shadow-2xl w-full max-w-2xl h-[90vh]  overflow-y-scroll ">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{editMode ? "Edit Address" : "Add Address"}</h1>
            <p className="text-gray-600">Please fill in your address details below</p>
          </div>
          <button onClick={() => {
            setaddressFormOpen(false)
            setEditMode(false)
            seteditAddress(null)
            setFormData(deepcopy(initialData))
          }
          } className=" bg-black hover:bg-black/60 h-10 hover-duration text-white  rounded-full p-2 shadow-lg  transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="space-y-6">
          {/* Address */}
          <div>
            <label htmlFor="address" className="authform-label">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className="authform-input resize-none"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {fieldErrors.address.isRequired && <p className="text-red-700 text-xs">Address is required</p>}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="authform-label">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="authform-input"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            {fieldErrors.city.isRequired && <p className="text-red-700 text-xs">City is required</p>}
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="authform-label">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              maxLength="6"
              className="authform-input"
              placeholder="Enter 6-digit pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
            {fieldErrors.pincode.isRequired && <p className="text-red-700 text-xs">Pincode is required</p>}
            {fieldErrors.pincode.invalid && <p className="text-red-700 text-xs">Invalid pincode format</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="authform-label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              maxLength="10"
              className="authform-input"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {fieldErrors.phone.isRequired && <p className="text-red-700 text-xs">Phone number is required</p>}
            {fieldErrors.phone.invalid && <p className="text-red-700 text-xs">Invalid phone number format</p>}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="authform-label">
              Additional Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="2"
              className="authform-input resize-none"
              placeholder="e.g. Deliver after 6PM"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            {fieldErrors.notes.isRequired && <p className="text-red-700 text-xs">Notes are required</p>}          </div>

          {/* Submit */}
          <div>
            <button onClick={handleSubmit} type="submit" className="authform-btn" disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : editMode ? "Update Address" : "save address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
