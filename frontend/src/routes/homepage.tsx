import * as React from "react";
import * as classes from "../styles/homepage.module.scss";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const LIST_PROJECTS_QUERY = gql`
  query ListProjects {
    projects {
      id
      name
    }
  }
`;

const ProjectsTable = () => {
  const { data, loading, error } = useQuery(LIST_PROJECTS_QUERY);
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className=" py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-white">
                  Projects
                </h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-maroon-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-maroon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-500"
                >
                  Add project
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {data.projects.map((project) => (
                        <tr key={project.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {project.name}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              className="rounded bg-maroon-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-maroon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-500"
                              onClick={() =>
                                navigate(`/projects/${project.id}/edit`)
                              }
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <ProjectsTable />
    </div>
  );
};

export { Homepage };
