const UnauthedUserView = () => {
  return (
    <section>
      <p className="font-bold ">Please Login In or SignUp to use the service</p>
      <div className="flex flex-col gap-1 w-[100px]">
        <button className="authButton">Log In</button>
        <button className="authButton">Sign Up</button>
      </div>
    </section>
  );
};

export default UnauthedUserView;
