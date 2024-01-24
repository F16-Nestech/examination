import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Title from "components/Title/Title";
import subject from "config/subject";

const StudentHome = () => {
  const tests = [
    {
      _id: "1111111111",
      test_name: "Kiểm tra Vật lý lớp 9 cuối học kỳ 1",
      subject: "Vật lý",
      description: "Vật lý học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: new Date(),
    },
    {
      _id: "1111111112",
      test_name: "Kiểm tra Toán lớp 9 cuối học kỳ 1",
      subject: "Toán",
      description: "Toán học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: new Date(),
    },
    {
      _id: "1111111113",
      test_name: "Kiểm tra Hoá học lớp 9 cuối học kỳ 1",
      subject: "Hoá học",
      description: "Hoá học học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: new Date(),
    },
    {
      _id: "1111111114",
      test_name: "Kiểm tra Hoá học lớp 9 cuối học kỳ 1",
      subject: "Hoá học",
      description: "Hoá học học kỳ 1",
      status: "doing",
      test_time_minutes: "120",
      test_start_time: new Date(),
    },
  ];
  let current_search = ["Toán", "Hoá học", "Vật lý"];
  let subjects = ["Tất cả", ...Object.values(subject)];

  const handleClickInput = () => {
    const suggestion = document.getElementById("suggestion");
    suggestion.classList.remove("hidden");
  };

  const getDateTime = (time) => {
    return new Date(time).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const onClickHandler = (event) => {
      if (
        !event.target.matches("#suggestion") &&
        !event.target.matches("#search-input")
      ) {
        const suggestion = document.getElementById("suggestion");
        if (!suggestion.classList.contains("hidden")) {
          suggestion.classList.add("hidden");
        }
      }
    };
    window.addEventListener("click", onClickHandler);
    return () => {
      window.removeEventListener("click", onClickHandler);
    };
  }, []);
  return (
    <>
      {/* Search */}
      <div className="mx-2 mt-6 flex h-12 flex-row items-center justify-center gap-2 ">
        <div className="h-12 w-72 max-w-sm rounded-full bg-gradient-to-tl from-cyan-500 via-blue-600 to-violet-700 p-1">
          <input
            id="search-input"
            placeholder="Bạn đang cần tìm gì?"
            className="h-full w-full rounded-full p-3 focus:outline-none"
            onClick={() => handleClickInput()}
          />
        </div>

        <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tl from-cyan-500 via-blue-600 to-violet-700 text-white shadow-md">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <div
          className="absolute z-40 mt-14 hidden w-full translate-y-1/2 rounded-2xl bg-white p-2 shadow-md lg:w-1/2"
          id="suggestion"
        >
          <div className="p-2 text-lg">Tìm kiếm gần đây</div>
          <div className="grid grid-cols-2">
            {current_search.map((it, idx) => {
              return (
                <div key={idx} className="col-span-1 cursor-pointer p-2">
                  {it}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* All */}
      <div>
        <Title text="Đề kiểm tra của bạn" />
        <div className="mx-2 my-6 flex flex-col justify-between gap-2 lg:flex-row">
          <div className="flex flex-row gap-2">
            <div className="flex items-center justify-center text-lg font-bold">
              Môn học:
            </div>
            <select name="subject-search" className="rounded-md py-4 shadow-md">
              {subjects.map((sb, idx) => {
                return (
                  <option value={sb} key={idx}>
                    {sb}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-1">
            <div className="cursor-pointer rounded-md border-2 border-blue-800 bg-blue-800 p-3 text-white shadow-md">
              Tất cả
            </div>
            <div className="cursor-pointer rounded-md border-2 border-blue-800 p-3 text-blue-800 shadow-md hover:bg-blue-800 hover:text-white">
              Chưa làm
            </div>
            <div className="cursor-pointer rounded-md border-2 border-blue-800 p-3 text-blue-800 shadow-md hover:bg-blue-800 hover:text-white">
              Đang làm
            </div>
            <div className="cursor-pointer rounded-md border-2 border-blue-800 p-3 text-blue-800 shadow-md hover:bg-blue-800 hover:text-white">
              Đã làm
            </div>
          </div>
        </div>
        {/* Tests */}
        <div className="bg-blue-50 pb-6 pt-4">
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4">
            {tests.map((test, idx) => {
              return (
                <div
                  className="col-span-1 m-2 rounded-lg bg-white shadow-2xl"
                  key={idx}
                >
                  <div className=" flex min-h-[130px] w-full flex-col items-center justify-center bg-blue-500">
                    <h2 className="px-2 py-4 text-center text-2xl text-white">
                      {test.test_name}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 px-1 py-4 md:px-2">
                    <p>Môn: {test.subject}</p>
                    <p>Thời gian: {test.test_time_minutes} phút</p>
                    <p>
                      Thời gian bắt đầu: {getDateTime(test.test_start_time)}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="cursor-pointer bg-blue-500 p-2 text-center text-xl text-white hover:bg-blue-800 hover:shadow-md">
                      Làm bài
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-4 text-lg">
            <div>1</div>
            <div>2</div>
            <div className="cursor-pointer rounded-md border-2 bg-blue-500 p-3 text-white hover:bg-blue-800">
              Xem tất cả
            </div>
          </div>
        </div>
      </div>

      {/* Sắp đến hạn */}
      <div>
        <Title text="Đề kiểm tra sắp đến hạn" />
        <div className="bg-blue-50 pb-6 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {tests.map((test, idx) => {
              return (
                <div
                  className="col-span-1 m-2 rounded-lg bg-white shadow-2xl"
                  key={idx}
                >
                  <div className=" flex min-h-[130px] w-full flex-col items-center justify-center bg-[#B8B102]">
                    <h2 className="px-2 py-4 text-center text-2xl text-white">
                      {test.test_name}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 px-1 py-4 md:px-2">
                    <p>Môn: {test.subject}</p>
                    <p>Thời gian: {test.test_time_minutes} phút</p>
                    <p>
                      Thời gian bắt đầu: {getDateTime(test.test_start_time)}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="cursor-pointer bg-blue-500 p-2 text-center text-xl text-white hover:bg-blue-800 hover:shadow-md">
                      Làm bài
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-4 text-lg">
            <div>1</div>
            <div>2</div>
            <div className="cursor-pointer rounded-md border-2 bg-blue-500 p-3 text-white hover:bg-blue-800">
              Xem tất cả
            </div>
          </div>
        </div>
      </div>
      {/* bỏ lỡ */}
      <div className="pb-6">
        <Title text="Đề kiểm tra bỏ lỡ" />
        <div className="bg-blue-50 pb-6 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {tests.map((test, idx) => {
              return (
                <div
                  className="col-span-1 m-2 rounded-lg bg-white shadow-2xl"
                  key={idx}
                >
                  <div className=" flex min-h-[130px] w-full flex-col items-center justify-center bg-gray-500">
                    <h2 className="px-2 py-4 text-center text-2xl text-white">
                      {test.test_name}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 px-1 py-4 md:px-2">
                    <p>Môn: {test.subject}</p>
                    <p>Thời gian: {test.test_time_minutes} phút</p>
                    <p>
                      Thời gian làm bài: {getDateTime(test.test_start_time)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex w-full flex-row items-center justify-center gap-4 text-lg">
            <div>1</div>
            <div>2</div>
            <div className="cursor-pointer rounded-md border-2 bg-blue-500 p-3 text-white hover:bg-blue-800">
              Xem tất cả
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
