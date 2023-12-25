import React from "react";
import { Link } from "react-router-dom";

const DoTest = () => {
  const option_choice = [...Array(26)].map((_, i) =>
    String.fromCharCode(i + 65),
  );
  const test = {
    _id: "1111111111",
    test_name: "Kiểm tra Vật lý lớp 8 cuối học kỳ 1",
    subject: "Vật lý",
    description: "Vật lý học kỳ 1",
    status: "doing",
    test_time_minutes: "120",
    test_start_time: Date.now(),
    questions: [
      {
        content: "Chuyển động cơ học là:",
        isMultiChoice: true,
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
      {
        content: "Chuyển động cơ học là:",
        options: [
          "sự thay đổi khoảng cách theo không gian của vật so với vật khác",
          "sự thay đổi phương chiều của vật",
          "sự thay đổi vị trí của vật theo thời gian so với vật khác",
          "sự thay đổi hình dạng của vật so với vật khác",
        ],
      },
    ],
  };

  const handleEndTest = () => {};
  const handleSave = () => {};
  const handleExit = () => {};
  const ans = [];
  const goToViolation = (e, id) => {
    e.preventDefault();
    const violation = document.getElementById(id);
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <section className="grid grid-cols-12 pb-12 pt-6">
      <div className="col-span-12 flex w-full flex-col items-center justify-center">
        <div className="px-4 text-center text-2xl font-bold">
          {test.test_name}
        </div>
        <div>Thời gian: {test.test_time_minutes} phút</div>
      </div>
      <div className="col-span-3 hidden px-6 pt-20 lg:fixed lg:block lg:w-64 xl:w-80">
        <div className="grid grid-cols-5 rounded-md bg-white p-2">
          <div className="col-span-5 ml-2 mt-2 text-xl">Bảng câu hỏi:</div>
          {test.questions.map((q, idx) => {
            return (
              <button
                className="col-span-1 mx-1 my-2 grid rounded-md border-2 border-[#f2f3f7] bg-[#f2f3f7] text-center text-[#777777] hover:border-green-600"
                key={idx}
                onClick={(e) => goToViolation(e, "question-" + idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <form className="col-span-12 mt-6 rounded-md bg-white p-4 lg:col-span-9 lg:col-start-4 lg:mr-4">
        {test.questions.map((question, idx) => {
          return (
            <div
              className="mt-4 flex flex-col"
              key={idx}
              id={"question-" + idx}
            >
              <label>
                {
                  <>
                    <strong>{"Câu " + (idx + 1) + ": "}</strong>
                    {question.content}
                  </>
                }
              </label>
              {!question.isMultiChoice ? (
                <div className="flex flex-col">
                  {question.options.map((option, id) => (
                    <label
                      key={"option_" + id}
                      className="pl-2 hover:bg-[#cecece]"
                    >
                      <input type="radio" name={idx} value={id} />
                      <span className="ml-2">
                        {option_choice[id] + ". " + option}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  {question.options.map((option, id) => (
                    <label
                      key={"option_" + id}
                      className="pl-2 hover:bg-[#cecece]"
                    >
                      <input type="checkbox" name={idx} value={id} />
                      <span className="ml-2">
                        {option_choice[id] + ". " + option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </form>
      <div className="col-span-12 mt-4 flex w-full justify-center gap-8 ">
        <button className="min-w-[80px] rounded-md bg-green-600 p-2 text-white">
          Save
        </button>
        <button className="min-w-[80px] rounded-md bg-red-600 p-2 text-white">
          End Test
        </button>
        <Link
          to="/"
          className="min-w-[80px] rounded-md bg-yellow-600 p-2 text-center text-white"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default DoTest;
