const StudentHome = () => {
  const tests = [
    {
      _id: "1111111111",
      test_name: "Kiểm tra Vật lý lớp 9 cuối học kỳ 1",
      subject: "Vật lý",
      description: "Vật lý học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: Date.now(),
    },
    {
      _id: "1111111111",
      test_name: "Kiểm tra Toán lớp 9 cuối học kỳ 1",
      subject: "Toán",
      description: "Toán học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: Date.now(),
    },
    {
      _id: "1111111111",
      test_name: "Kiểm tra Hoá học lớp 9 cuối học kỳ 1",
      subject: "Hoá học",
      description: "Hoá học học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: Date.now(),
    },
  ];
  return (
    <>
      <div className="mx-2 mt-6 flex-row justify-between md:flex">
        <div className="mb-2 bg-blue-800 px-2 py-2 text-white md:px-4">
          <h1 className="text-lg">Đề thi của bạn</h1>
        </div>
        <div className="flex gap-1">
          <div className="cursor-pointer rounded-md border-2 border-blue-800 p-2 text-blue-800 hover:bg-blue-800 hover:text-white">
            Đến hạn hoàn thành
          </div>
          <div className="cursor-pointer rounded-md border-2 border-blue-800 p-2 text-blue-800 hover:bg-blue-800 hover:text-white">
            Đang làm
          </div>
          <div className="cursor-pointer rounded-md border-2 border-blue-800 p-2 text-blue-800 hover:bg-blue-800 hover:text-white">
            Đã làm
          </div>
          <div className="cursor-pointer rounded-md border-2 border-blue-800 p-2 text-blue-800 hover:bg-blue-800 hover:text-white">
            Tất cả
          </div>
        </div>
      </div>
      {/* Tests */}
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3">
        {tests.map((test, idx) => {
          return (
            <div className="col-span-1 m-2 bg-white shadow-2xl" key={idx}>
              <div className=" flex min-h-[130px] w-full flex-col items-center justify-center bg-blue-500">
                <h2 className="px-2 py-4 text-center text-2xl text-white">
                  {test.test_name}
                </h2>
              </div>
              <div className="flex flex-col gap-4 px-1 py-4 md:px-2">
                <p>Môn: {test.subject}</p>
                <p>Thời gian: {test.test_time_minutes} phút</p>
                <p>
                  Thời gian bắt đầu:{" "}
                  {new Date(test.test_start_time).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    hour12: false,
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button className="w-full bg-green-500 p-2 text-xl text-white">
                Làm bài
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentHome;
