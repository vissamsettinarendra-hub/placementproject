//my second component
//props:Properties
//Use destructuring
const Yesbar = function({name,year}){
//const name = "Narendra"
  return(
    //can write js in html
    <div>
    <h2>Welcome {name}</h2>
    <h2>Passing Year {year}</h2>
    <p>Visit Our College. Have a Nice Day!</p>
    </div> 
  )
}
export default Yesbar