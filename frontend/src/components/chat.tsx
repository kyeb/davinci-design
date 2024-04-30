import * as React from "react";
import * as classes from "../styles/chat.module.scss";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const { useState } = React;

const getUploadUrlQuery = gql`
  mutation GetUploadUrl {
    createS3UploadUrl {
      url
    }
  }
`;

const UploadForm = ({ data }) => {
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = data.createS3UploadUrl.url;
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("key", data.createS3UploadUrl.key);
    // formData.append("AWSAccessKeyId", data.createS3UploadUrl.awsAccessKeyId);
    // formData.append("policy", data.createS3UploadUrl.policy);
    // formData.append("signature", data.createS3UploadUrl.signature);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {/* <input type="hidden" name="key" value={data.createS3UploadUrl.key} />
      <input
        type="hidden"
        name="AWSAccessKeyId"
        value={data.createS3UploadUrl.awsAccessKeyId}
      />
      <input
        type="hidden"
        name="policy"
        value={data.createS3UploadUrl.policy}
      />
      <input
        type="hidden"
        name="signature"
        value={data.createS3UploadUrl.signature}
      /> */}
      <label htmlFor="file" className="ui button">
        Select image
      </label>
      <input
        type="file"
        name="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      {/* <label htmlFor="submit" className="ui button">
        Upload it
      </label>
      <input
        type="submit"
        name="submit"
        id="submit"
        style={{ display: "none" }}
      /> */}
    </>
  );
};

const Chat = () => {
  const [chat, setChat] = useState("");

  const [getUploadUrl, { data }] = useMutation(getUploadUrlQuery);

  React.useEffect(() => {
    getUploadUrl();
  }, []);

  return (
    <div className={classes.container}>
      <h2>Chat</h2>
      <div>
        <p>imagine some chat logs here</p>
        <p>...</p>
        <p>blah blah blah</p>
      </div>
      {data && <UploadForm data={data} />}
      <div></div>
      <div className={classes.chatInput}>
        <div className={"ui icon input " + classes.chatInputTextbox}>
          <input
            type="text"
            placeholder="Ask Davinci something..."
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <i className="paper plane outline icon large" />
        </div>
      </div>
    </div>
  );
};

export { Chat };
