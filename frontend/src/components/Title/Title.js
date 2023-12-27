const Title = (props) => {
  return (
    <div className="mt-6 h-10 border-b-2 border-blue-800">
      <h2 className="after:contents-[''] before:contents-[''] relative float-left rounded-t-md bg-blue-800 px-4 font-bold uppercase leading-10 text-white before:absolute before:bottom-0 before:right-0 before:-mr-3 before:h-9 before:w-4 before:skew-x-[14deg] before:rounded-tr-md before:bg-blue-300 after:absolute after:right-0 after:top-0 after:-mr-2 after:h-10 after:w-5 after:skew-x-[22deg] after:rounded-tr-md after:bg-blue-800 after:leading-10">
        {props.text}
      </h2>
    </div>
  );
};

export default Title;
