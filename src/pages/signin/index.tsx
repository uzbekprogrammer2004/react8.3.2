import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { Formik ,Form, Field, ErrorMessage} from "formik"
import { useState } from "react"
import { SignIn } from "@auth-interface"
import { signInValidationSchema } from "@validation"
import { ForgotPassword } from "@modals"
import {auth} from "@service"
import { ToastContainer } from "react-toastify"
import Notification from "../../utils/notification"
import { setDataToCookie } from "@data-service"
import { useNavigate } from "react-router-dom"
const Index = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [modal,setModal] = useState(false)
  const initialValues:SignIn = {
    email: "",
    password: ""
  }
  const navigate = useNavigate()
  const handleSubmit =async(values:SignIn)=>{
    try{
      const response = await auth.sign_in(values)
      if(response.status === 200){
        navigate("/main")
        setDataToCookie("id", response?.data.id)
        setDataToCookie("token",response?.data.access_token)
        Notification({title: "Muvaffaqiyatli yakunlandi", type: 'success'})
      }
    }catch(error){
      console.log(error)
      Notification({title: "Xatolik mavjud", type: 'error'})
    }
  }
  return (
    <>
    <ToastContainer/>
    <ForgotPassword open={modal} handleClose={()=>setModal(false)}/>
     <div className="h-screen flex items-center justify-center flex-col gap-8 p-5">
        <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
       Login
        </h1>
        <div className="max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p className='mb-3 cursor-pointer hover:text-blue' onClick={()=>setModal(true)}>Parolni unutdingizmi ?</p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Tizimga kirish"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default Index
