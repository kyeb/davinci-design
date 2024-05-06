import * as React from "react";
import * as classes from "../styles/editor.module.scss";
import { STLViewer } from "../components/viewer";
import { Chat } from "../components/chat";
import stl from "../static/coffee-machine.stl";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_PROJECT_QUERY = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      name
    }
  }
`;

const Editor = () => {
  const { projectId } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT_QUERY, {
    variables: { projectId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className={classes.editor}>
      <div>
        <Chat project={data.project} />
      </div>
      <div className={classes.viewer}>
        <STLViewer url={stl} />
      </div>
    </div>
  );
};

export { Editor };
