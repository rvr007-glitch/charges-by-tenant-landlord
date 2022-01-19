import Image from "next/image";
import DifferentCharges from "../../public/images/DifferentCharges.png";
import Header1 from "../components/Header1";
import Taskbar from "../components/Taskbar";
import NameLabel from "../components/NameLabel";
export default function different_charges() {
  return (
    <>
      <div className="p_heading">
        <Taskbar />
        <div className="p_right">
          <Header1 header="GENERATE CHARGES OF DIFERENT ENTITIES" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />

          <div className="charges">
            <NameLabel label="Electricity" />
            <NameLabel label="Water" />
            <NameLabel label="Gas Connection" />
            <NameLabel label="Others" />

            <div className="btn2">
              <button className="p_btn2">GENERATE</button>
            </div>
          </div>
        </div>

        <div className="dc">
          <Image src={DifferentCharges} alt="dc" />
        </div>
      </div>
    </>
  );
}
