import { useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const Message = searchParams.get('Message') || 'Ocorreu um erro';
    console.log(Message);
  return (<h1>{Message}</h1>);
}
