
import Featured from "./components/Features";
import Offers from "./components/Offers";
import Slider from "./components/Slider";


export default function Home() {
  return (
    <div >
      <Slider/>
      <Featured/>
      <Offers/> 
    </div>
  );
}