import * as React from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const { useState } = React;

const GET_UPLOAD_URL_QUERY = gql`
  mutation GetUploadUrl {
    createS3UploadUrl {
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

const UploadForm = ({ data }) => {
  const [reportSuccessfulUpload] = useMutation(GENERATE_MODEL_FROM_IMAGE);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = data.createS3UploadUrl.url;
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
          variables: { key: data.createS3UploadUrl.key },
        });
        const modelUrl = modelData.generateModelFromImage.url;
        console.log(modelUrl);
      } else {
        console.error("File upload failed", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <label
        className="rounded bg-maroon-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-maroon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-500"
        htmlFor="file"
      >
        Upload an image
      </label>
      <input
        type="file"
        name="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
    </>
  );
};

const Chat = ({ project }) => {
  const [chat, setChat] = useState("");

  const [getUploadUrl, { data }] = useMutation(GET_UPLOAD_URL_QUERY);

  React.useEffect(() => {
    getUploadUrl();
  }, []);

  return (
    <div>
      <div>Project - {project && project.name}</div>
      <br />
      <br />
      <div>
        <h2>Chat</h2>
      </div>
      <br />
      <div>
        <p>imagine some chat logs here</p>
        <p>...</p>
        <p>blah blah blah</p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium leading-6 "
        >
          Chat with Davinci
        </label>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
      <br />
      {data && <UploadForm data={data} />}
    </div>
  );
};

export { Chat };
