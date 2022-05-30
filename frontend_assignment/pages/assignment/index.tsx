import styles from "../../styles/assignment.module.css";
import { useForm } from "react-hook-form";

import { object, string, number } from 'yup';

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  address: string().nullable()
});

export default function About() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    const user = await userSchema.validate(data);
    console.log(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
        <div><label>Name: </label>
        <input {...register("name", { required: true, maxLength: 20, pattern: /^[A-Za-z \s]+$/i })} />
        {errors.name && <span>This field is invalid</span>}
        </div>
        <div>
        <label>Age: </label>
        <input type="number" {...register("age", { min: 1, max: 150 })} />
        {errors.number && <span>This field is invalid</span>}
        </div>
        <div>
        <label>Address: </label>
        <input {...register("address")} />
        </div>
        <input type="submit" />
      </form>
    </div>);
}
