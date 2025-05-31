import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addressImage from '../assets/add_address_image.svg';
import { useAppcontext } from '../context/Appcontext';

const AddAddress = () => {
  const navigate=useNavigate()
  const {axios,user} = useAppcontext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', {
        address: formData,
        userId: "56356780912188177127",  
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full max-w-7xl">
        
        {/* Form Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-700 mb-12">
            Add Shipping <span className="text-green-600">Address</span>
          </h2>
          <form onSubmit={onSubmitHandler} className="space-y-8 text-lg text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="input-lg"
                required
                minLength={2}
                maxLength={30}
                value={formData.firstName}
                onChange={onChangeHandler}
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="input-lg"
                required
                minLength={2}
                maxLength={30}
                value={formData.lastName}
                onChange={onChangeHandler}
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className="input-lg w-full"
              required
              value={formData.email}
              onChange={onChangeHandler}
            />
            <input
              name="street"
              type="text"
              placeholder="Street"
              className="input-lg w-full"
              required
              minLength={5}
              maxLength={100}
              value={formData.street}
              onChange={onChangeHandler}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="city"
                type="text"
                placeholder="City"
                className="input-lg"
                required
                minLength={2}
                maxLength={50}
                value={formData.city}
                onChange={onChangeHandler}
              />
              <input
                name="state"
                type="text"
                placeholder="State"
                className="input-lg"
                required
                minLength={2}
                maxLength={50}
                value={formData.state}
                onChange={onChangeHandler}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="zip"
                type="text"
                placeholder="Zip code"
                className="input-lg"
                required
                pattern="\d{4,10}"
                title="Zip code should be 4-10 digits"
                value={formData.zip}
                onChange={onChangeHandler}
              />
              <input
                name="country"
                type="text"
                placeholder="Country"
                className="input-lg"
                required
                minLength={2}
                maxLength={50}
                value={formData.country}
                onChange={onChangeHandler}
              />
            </div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              className="input-lg w-full"
              required
              pattern="[\d+ -]{7,15}"
              title="Phone number should be 7-15 characters and can include digits, +, - or spaces"
              value={formData.phone}
              onChange={onChangeHandler}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-green-700 transition"
            >
              SAVE ADDRESS
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img src={addressImage} alt="Add Address" className="w-full max-w-lg" />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
