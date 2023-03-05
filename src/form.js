import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const Form=()=>{
	const onSubmit=(data)=>{
		console.log(data);
	}
	const schema=yup.object().shape({
		name:yup.string().required("UserName is Required!"),
		email:yup.string().email("Please enter valid email-id").required("Email is Required!"),
		mobile:yup.number().integer().max(10,"Please enter valid mobile number").required("Mobile Number is Required!"),
		password:yup.string().min(4,"Password must be between 4 and 20 characters").max(20).required("Password is Required!"),
		con_pass:yup.string().oneOf([yup.ref("password"),null],"Password does not match").required("Confirm Password is required!")
	});
	const{register,handleSubmit,watch,formState:{errors}}=useForm({
		resolver:yupResolver(schema)
	});
	//console.log(watch("name"));
	return(
		<form onSubmit={handleSubmit(onSubmit)}>
		<input type="text" placeholder="Enter name" {...register("name")}/><br/>
		<p>{errors.name?.message}</p>
		<input type="text" placeholder="Enter email" {...register("email")} /><br/>
		<p>{errors.email?.message}</p>
		<input type="number" placeholder="Enter mobile number" {...register("mobile")} /><br/>
		<p>{errors.mobile?.message}</p>
		<input type="password" placeholder="Enter password" {...register("password")}/><br/>
		<p>{errors.password?.message}</p>
		<input type="password" placeholder="Retype password" {...register("con_pass")}/><br/>
		<p>{errors.con_pass?.message}</p>
		<input type="submit"/>
		</form>
		);
}