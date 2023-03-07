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
		<div className="box">
		<h1 className="heading">Register Here</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
		<input type="text" placeholder="Enter name" {...register("name")} className="inputbox"/>
		<span>{errors.name?.message}</span>
		<input type="text" placeholder="Enter email" {...register("email")} className="inputbox" />
		<span>{errors.email?.message}</span>
		<input type="number" placeholder="Enter mobile number" {...register("mobile")} className="inputbox" />
		<span>{errors.mobile?.message}</span>
		<input type="password" placeholder="Enter password" {...register("password")} className="inputbox"/>
		<span>{errors.password?.message}</span>
		<input type="password" placeholder="Retype password" {...register("con_pass")} className="inputbox"/>
		<span>{errors.con_pass?.message}</span>
		<input type="submit" className="button"/>
		</form>
		</div>
		);
}