import { useHistory } from "react-router-dom";

const Backbutton = () => {
  
  let history = useHistory();

  return (
    <div className="backbutton" onClick={() => history.goBack()}></div>
  )
}

export default Backbutton;

