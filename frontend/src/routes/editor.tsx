import * as React from "react";
import { STLViewer } from "../components/STLViewer";
import stl from "../static/coffee-machine.stl";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

const { useState } = React;
const GET_PROJECT_QUERY = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      name
    }
  }
`;

const GET_UPLOAD_URL_QUERY = gql`
  query GetUploadUrl {
    uploadInfo: s3UploadUrl {
      url
      key
    }
  }
`;

const GENERATE_MODEL_FROM_IMAGE = gql`
  mutation GenerateModelFromImage($key: String!) {
    generateModelFromImage(s3Key: $key) {
      url
    }
  }
`;

const UploadForm = ({ upload, setCurrentStl }) => {
  const [reportSuccessfulUpload] = useMutation(GENERATE_MODEL_FROM_IMAGE);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = upload.url;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        const { data: modelData } = await reportSuccessfulUpload({
          variables: { key: upload.key },
        });
        setCurrentStl(modelData.generateModelFromImage.url);
      } else {
        console.error("File upload failed", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <label
        className="rounded bg-maroon-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-maroon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-500 cursor-pointer"
        htmlFor="file"
      >
        Upload an image
      </label>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};
const ChatBar = ({ data, chat, s3data, setCurrentStl }) => {
  return (
    <div className="p-3 flex flex-col justify-between h-full">
      <div className="flex flex-col justify-between h-5/6">
        <div className="text-lg">
          <div>Project - {data.project && data.project.name}</div>
          <div className="text-base">
            <h2>Chat</h2>
          </div>
          <div className="text-xs">
            <p>imagine some chat logs here</p>
            <p>...</p>
            <p>blah blah blah</p>
          </div>
        </div>
        <div>
          <label
            htmlFor="chat"
            className="block text-sm font-medium leading-6 "
          >
            Chat with Davinci
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="chat"
              id="chat"
              className="block rounded-md border-0 px-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={chat}
              onChange={() =>
                alert(
                  "Chat functionality is not implemented yet - come back later!"
                )
              }
            />
            {/* TODO: get shortcut working */}
            {/* <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </div> */}
          </div>
          <div className="mt-2">
            {s3data && (
              <UploadForm
                upload={s3data.uploadInfo}
                setCurrentStl={setCurrentStl}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <a
          href="https://davincidesign3d.com/#contact-us"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-maroon-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-maroon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-500"
        >
          Feedback?
        </a>
      </div>
    </div>
  );
};

const Editor = () => {
  const { projectId } = useParams();
  const [chat, setChat] = useState("");
  const [currentStl, setCurrentStl] = useState(stl);
  const { data, loading, error } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId },
  });

  const { data: s3data } = useQuery(GET_UPLOAD_URL_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="flex h-full">
      <div className="w-1/6">
        <ChatBar
          data={data}
          chat={chat}
          s3data={s3data}
          setCurrentStl={setCurrentStl}
        />
      </div>
      <div className="w-5/6">
        <STLViewer url={currentStl} />
      </div>
    </div>
  );
};

export { Editor };
