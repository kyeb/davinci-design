import * as React from "react";

const { useEffect } = React;

const Page = (props: { title: string; children: React.ReactElement }) => {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
};

export { Page };
