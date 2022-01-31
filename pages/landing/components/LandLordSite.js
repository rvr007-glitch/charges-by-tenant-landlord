import LandingPageCard from "./LandingPageCard";
import Heading from "./Heading";
import HorizontalLine from "./HorizontalLine";

const LandLordSite = ({ siteDetails, userDetails }) => {
  //console.log(siteDetails);
  return (
    <>
      <Heading head="Created Sites" />
      <HorizontalLine />
      {siteDetails.map((site, index) => {
        return (
          <LandingPageCard
            _id={site._id}
            owner={site.alias_name}
            alias_name={site.alias_name}
            rent={site.rent}
            siteStatus = {site.status}
            site={site}
            address={`${site.address.first_line}, ${site.address.landmark}, ${site.address.city}, ${site.address.state}, ${site.address.country}, P.O: ${site.address.pincode}`}
            cclass="blue"
            class1="btn-warning"
            text1="Details"
            class2="btn-warning a-margin-left"
            text2="History"
            class3="btn-success px-2"
            text3="Generate Charges"
            key={index}
          />
        );
      })}
      {/* <LandingPageCard
        owner="Vivek Khan"
        rent="15000/-"
        address="Flat no. 108, Lakshmipuram Society"
        cclass="blue"
        class1="btn-warning"
        text1="Details"
        class2="btn-warning a-margin-left"
        text2="History"
        class3="btn-success px-2"
        text3="Paid"
      />
      <LandingPageCard
        owner="Vivek Khan"
        rent="15000/-"
        address="Flat no. 108, Lakshmipuram Society"
        cclass="blue"
        class1="btn-warning"
        text1="Details"
        class2="btn-warning a-margin-left"
        text2="History"
        class3="btn-success px-2"
        text3="Paid"
      />
      <LandingPageCard
        owner="Vivek Khan"
        rent="15000/-"
        address="Flat no. 108, Lakshmipuram Society"
        cclass="blue"
        class1="btn-warning"
        text1="Details"
        class2="btn-warning a-margin-left"
        text2="History"
        class3="btn-success px-2"
        text3="Paid"
      />
      <LandingPageCard
        owner="Vivek Khan"
        rent="15000/-"
        address="Flat no. 108, Lakshmipuram Society"
        cclass="blue"
        class1="btn-warning"
        text1="Details"
        class2="btn-warning a-margin-left"
        text2="History"
        class3="btn-success px-2"
        text3="Paid"
      /> */}
    </>
  );
};

export default LandLordSite;
