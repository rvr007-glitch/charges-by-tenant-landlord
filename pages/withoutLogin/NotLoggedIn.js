import Link from "next/link";

const NotLoggedIn = () => {
  return (
    <div>
      <div className="a-center">
        <div className="a-edit-container shadow-lg rounded p-3 bg-white">
          <div className="a-center">
            <p>Some error occured!</p>
            <p>
              Please <Link href="/auth/LandlordSignin"> SignIn </Link>
              to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
