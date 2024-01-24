import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

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
    test_start_time: new Date(),
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

  const stopTime =
    test.test_start_time.getTime() + test.test_time_minutes * 60 * 1000;
  const initialMinutes = Math.floor((stopTime - Date.now()) / (1000 * 60));
  const initialSeconds = (stopTime - Date.now()) % (1000 * 60);

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleEndTest = () => {};
  const handleSave = () => {};
  const handleExit = () => {};

  let [ans, setAns] = useState(
    Array.from({ length: test.questions.length }, () => []),
  );

  const goToViolation = (e, id) => {
    e.preventDefault();
    const violation = document.getElementById(id);
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth",
    });
  };
  const mark = (idx, color) => {
    const markedQuestion = document.getElementById("mark_" + idx);
    if (markedQuestion) {
      markedQuestion.classList.remove("border-red-500");
      markedQuestion.classList.remove("border-blue-500");
      markedQuestion.classList.remove("border-gray-200");
      switch (color) {
        case "gray":
          markedQuestion.classList.add("border-gray-200");
          break;
        case "blue":
          markedQuestion.classList.add("border-blue-500");
          break;
        case "red":
          markedQuestion.classList.add("border-red-500");
          break;
        default:
          break;
      }
    }
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
                className={`col-span-1 mx-1 my-2 flex items-center justify-center rounded-md border-2 border-gray-200 ${
                  ans[idx]?.length
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-[#777777]"
                } shadow-md  hover:text-red-500`}
                key={idx}
                id={"mark_" + idx}
                onClick={(e) => goToViolation(e, "question-" + idx)}
              >
                {idx + 1}
              </button>
            );
          })}
          <div className="col-span-5 mt-4 text-red-500">
            Thời gian còn lại: {minutes} phút {seconds} giây
          </div>
        </div>
      </div>

      <div className="col-span-12 mt-6 rounded-md bg-white p-4 lg:col-span-9 lg:col-start-4 lg:mr-4">
        {test.questions.map((question, idx) => {
          return (
            <div
              className="mt-4 flex flex-col"
              key={idx}
              id={"question-" + idx}
            >
              <label>
                {
                  <div className="grid grid-cols-12">
                    <div className="col-span-10">
                      <strong>{"Câu " + (idx + 1) + ": "}</strong>
                      {question.content}
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-3">
                      <FontAwesomeIcon
                        icon={faFlag}
                        color="gray"
                        className="cursor-pointer"
                        onClick={() => mark(idx, "gray")}
                      />
                      <FontAwesomeIcon
                        icon={faFlag}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => mark(idx, "red")}
                      />
                      <FontAwesomeIcon
                        icon={faFlag}
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => mark(idx, "blue")}
                      />
                    </div>
                  </div>
                }
              </label>

              {!question.isMultiChoice ? (
                <div className="flex flex-col">
                  {question.options.map((option, id) => (
                    <label
                      key={"option_" + id}
                      className="pl-2 hover:bg-[#cecece]"
                    >
                      <input
                        type="radio"
                        name={idx}
                        value={id}
                        onChange={(event) => {
                          setAns(
                            ans.map((a, ind) => {
                              if (ind === idx) {
                                return [event.target.value];
                              } else return a;
                            }),
                          );
                        }}
                      />
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
                      <input
                        type="checkbox"
                        name={idx}
                        value={id}
                        onChange={() => {
                          const element = document.getElementsByName(idx);
                          setAns(
                            ans.map((a, ind) => {
                              if (ind === idx) {
                                let tmp = [];
                                element.forEach((el) => {
                                  if (el.checked) tmp.push(ind);
                                });
                                return tmp;
                              } else return a;
                            }),
                          );
                        }}
                      />
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
      </div>
      <div className="col-span-12 mt-4 flex w-full justify-center gap-8 ">
        <button className="min-w-[80px] rounded-md bg-green-600 p-2 text-white">
          Save
        </button>
        <button className="min-w-[80px] rounded-md bg-red-600 p-2 text-white">
          End Test
        </button>
      </div>
    </section>
  );
};

export default DoTest;
