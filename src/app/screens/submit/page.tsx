// SchoolForm.js
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '@/app/globals.css';
import { RefObject , useState } from 'react';
import Link from 'next/link';

const SchoolForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [image, setImage] = useState(null);


  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const formData = new FormData();

  async function woosalSubmit(data: any) {
    try {
      // Create a FormData object to send the image
      if (image!==null) {
        formData.append('image', image);
        console.log('Image is not null');
        console.log("formdata is", formData.get('image'));
        console.log("formdata is", typeof(formData));

      } else {
        // Handle the case where image is null
        console.error('Image is null');
      }  
      // Send the image to the server using fetch
      const response = await fetch( 'api/img' , {
        method: 'POST',
        body: formData,
      });
      console.log('sent response');
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      // Assuming the server responds with the image URL
      const responseData = await response.json();
      const imageUrl = responseData.imageUrl;
  
      // Now you can save the imageUrl along with other form data to the database
      console.log('Form tha Data:', { ...data, imageUrl });
      const ddata = { ...data, imageUrl };
      console.log('Form finalee Data:', ddata);

      const sl = await fetch('api/crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ddata),
      });
      if (!sl.ok) {
        throw new Error('Failed to upload image');
      }
  
      // Reset the form
      reset();
    } catch (error) {
      console.error('Error uploading image:', (error as Error).message);
    }
  }
  
  return (
   

    <div>
    <form onSubmit={handleSubmit(woosalSubmit)}>

    <div className="mb-8">
      <Link href="screens/retrieve">retrieve</Link>

        {/* id */}
        <label
          htmlFor="id"
          className={`block font-bold text-sm mb-2 ${
            errors.id ? "text-red-400" : "text-purple-400"
          }`}
        >
          id
        </label>
        <input
          type="text"
          id="id"
          placeholder="enter your id"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.id
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('id')}        />
        {errors.id && (
          <p className="text-red-500 text-sm mt-2">
            A valid id is required.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="name"
          className={`block font-bold text-sm mb-2 ${
            errors.name ? "text-red-400" : "text-purple-400"
          }`}
        >
          name
        </label>
        <input
          type="text"
          id="name"
          placeholder="enter your name"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.name
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('name')}          />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">
            A valid name is required.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="address"
          className={`block font-bold text-sm mb-2 ${
            errors.address ? "text-red-400" : "text-purple-400"
          }`}
        >
          address
        </label>
        <input
          type="text"
          id="address"
          placeholder="enter adsress"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.address
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('address')}     />
        {errors.address && (
          <p className="text-red-500 text-sm mt-2">
            A valid address is required.
          </p>
        )}
      </div>
      <div className="mb-8">
        <label
          htmlFor="city"
          className={`block font-bold text-sm mb-2 ${
            errors.city ? "text-red-400" : "text-purple-400"
          }`}
        >
          city
        </label>
        <input
          type="text"
          id="city"
          placeholder="enter city"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.city
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('city')}        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-2">
            A valid city is required.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="state"
          className={`block font-bold text-sm mb-2 ${
            errors.state ? "text-red-400" : "text-purple-400"
          }`}
        >
          State
        </label>
        <input
          type="text"
          id="state"
          placeholder="enter state"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.state
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('state')}        />
        {errors.state && (
          <p className="text-red-500 text-sm mt-2">
            A valid state is required.
          </p>
        )}
      </div>


      <div className="mb-8">
        <label
          htmlFor="contact"
          className={`block font-bold text-sm mb-2 ${
            errors.contact ? "text-red-400" : "text-purple-400"
          }`}
        >
          contact
        </label>
        <input
          type="number"
          id="contact"
          placeholder="enter contact"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.contact
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('contact')}        />
        {errors.contact && (
          <p className="text-red-500 text-sm mt-2">
            A valid contact is required.
          </p>
        )}
      </div>
      


           {/* Image upload field */}
        <div className="mb-8">
          <label
            htmlFor="image"
            className={`block font-bold text-sm mb-2 ${
              errors.image ? "text-red-400" : "text-purple-400"
            }`}
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" // Specify accepted file types (images in this case)
            onChange={handleImageChange}
            className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
              errors.image
                ? "text-red-300 border-red-400"
                : "text-purple-200 border-purple-400"
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">
              Please upload a valid image.
            </p>
          )}
        </div>




      <div className="mb-8">
        <label
          htmlFor="email"
          className={`block font-bold text-sm mb-2 ${
            errors.email ? "text-red-400" : "text-purple-400"
          }`}
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="hey@chrisoncode.io"
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.email
              ? "text-red-300 border-red-400"
              : "text-purple-200 border-purple-400"
          }`}
          {...register('email')}        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">
            A valid email is required.
          </p>
        )}
      </div>

      

      <button className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm">
        Submit
      </button>
    </form>
  </div>
    
     
  );
};

export default SchoolForm;
