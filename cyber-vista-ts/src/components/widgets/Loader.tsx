const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-40">
      <div className="flex justify-center items-center h-20 w-20 animate-spin">
        <div className="spinner spinner-blue block m-auto w-full h-full border-2 border-blue-200 rounded-full border-t-blue-600"></div>
      </div>
    </div>
  );
};

export default Loader;
