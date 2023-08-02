"use client";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import { fetchData } from "@/utils/fetchApi";
import { Key, Suspense, useEffect, useState } from "react";

interface Item {
  id: Key | undefined;
  title: string | number | boolean | null | undefined;
}

export default function Play() {
  const [list, setlist] = useState<Item[]>([]);
  const [openModal, setopenModal] = useState(true);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    kr: true,
  });
  const [radio, setRadio] = useState<string>("Trending");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.value]: event.target.checked,
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.target.value);
  };

  const loadPage = () => {
    setopenModal(false);

    fetchData({ countries: checkboxes, trending: radio }).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          setlist((prev) => [...prev, result.value].flat());
        } else {
          console.error(
            `Error fetching from API endpoint ${index}:`,
            result.reason
          );
        }
      });
    });
  };

  // useEffect(() => {
  //    fetchData().then((results) => {
  //     results.forEach((result, index) => {
  //       if (result.status === "fulfilled") {
  //         setlist((prev) => [...prev, result.value].flat());
  //       } else {
  //         console.error(
  //           `Error fetching from API endpoint ${index}:`,
  //           result.reason
  //         );
  //       }
  //     });
  //   });
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=" text-center">Play</h1>
      {openModal && (
        <Modal>
          <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Welcome
          </h1>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Choose your settings
          </h3>
          <Form
            checkboxes={checkboxes}
            radio={radio}
            handleCheckboxChange={handleCheckboxChange}
            handleRadioChange={handleRadioChange}
          />
          <div className="flex gap-4">
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={loadPage}
            >
              Let's Play🎉
            </button>
            <a href="/">
              <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
              </button>
            </a>
          </div>
        </Modal>
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <ul>
          {list?.map(
            (title: {
              id: Key | null | undefined;
              title: string | number | boolean | null | undefined;
            }) => (
              <li key={title.id}>{title.title}</li>
            )
          )}
        </ul>
      </Suspense>
    </main>
  );
}
