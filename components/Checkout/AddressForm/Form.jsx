import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"; 

import InputField from './InputField'
import { Button } from '../../Common';
import useCheckout from '../../../hooks/useCheckout';
import FormWrapper from '../Wrapper';

const schema = yup.object().shape({
   firstName: yup.string().required('First Name is required'),
   lastName: yup.string().required('Last Name is required'),
   email: yup.string().email('Invalid email').required('Email is required'),
   address: yup.string().required('Address is required'),
   phone: yup.string().length(11, 'Phone number must contain 11 digits'),
   city: yup.string().required('City is required')
});

export default function Form({ defaultValues }) {
   const { register, errors, handleSubmit } = useForm({ 
      mode: 'onBlur', 
      resolver: yupResolver(schema),
      defaultValues: defaultValues
   });
   const { onSetUserDetail } = useCheckout();

   const onSubmit = (data) => {
      onSetUserDetail(data);
   }

   return (
      <FormWrapper>
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
            <InputField errors={errors} name="firstName" ref={register} label="First Name" placeholder="First Name" />
            <InputField errors={errors} name="lastName" ref={register} label="Last Name" placeholder="Last Name" />
            <InputField errors={errors} name="email" ref={register} label="Email" placeholder="Email" />
            <InputField errors={errors} name="address" ref={register} label="Address" placeholder="Address" />
            <InputField errors={errors} name="phone" type="number" ref={register} label="Phone" placeholder="Phone" />
            <InputField errors={errors} name="city" ref={register} label="City" placeholder="City" />
            <Button label="Checkout" type="submit" className="my-3" />
            <Button label="Reset" type="reset" variant="secondary" className="bg-gray-200" />
         </form>
      </FormWrapper>
   )
}
