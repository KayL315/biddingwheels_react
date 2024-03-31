export const ErrorAlert : React.FC<{msg:string}> = (props)=>{
  return(
    <div className="alert alert-danger w-75 m-3" role="alert">
      {props.msg}
    </div>
  )
}