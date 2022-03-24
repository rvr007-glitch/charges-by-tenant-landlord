import LandingPageCard from "./LandingPageCard";
import Heading from "./Heading";
import HorizontalLine from "./HorizontalLine";
import Link from "next/link";

const LandLordSite = ({ siteDetails, userDetails, refreshData }) => {
  //console.log(siteDetails);
  return (
    <>
      <Heading head="Created Sites" />
      <HorizontalLine />
      {siteDetails.length == 0 ? (
        <strong className="shadow-lg p-5 mt-5">
          No sites created,{" "}
          <Link href="/createSite/CreateSiteForm">Create</Link> new sites here.
        </strong>
      ) : (
        siteDetails.map((site, index) => {
          return (
            <LandingPageCard
              _id={site._id}
              owner={site.alias_name}
              alias_name={site.alias_name}
              rent={site.rent}
              siteStatus={site.status}
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
              refreshData={refreshData}
            />
          );
        })
      )}
    </>
  );
};

export default LandLordSite;
